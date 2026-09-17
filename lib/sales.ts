import { lineTotal, type CartLine, type IssuedTicket, type PricingMode } from "@/lib/cart"
import type { CategoryId, Product } from "@/lib/catalog"
import { dateKeyInBA, inRange, TIMEZONE } from "@/lib/dates"
import { formatKg, roundARS } from "@/lib/money"

/** v1 local snapshot, column-friendly for a later Google Sheets sync. */
export const SALES_SCHEMA_VERSION = 1 as const

export type StoredSaleLine = {
  productId: string
  name: string
  category: CategoryId | "otros"
  pricingMode: PricingMode
  qty: number
  unitPrice: number
  lineTotal: number
}

export type StoredSale = {
  schemaVersion: typeof SALES_SCHEMA_VERSION
  id: string
  number: number
  issuedAt: string
  timezone: typeof TIMEZONE
  localDate: string
  total: number
  lines: StoredSaleLine[]
}

export type ProductSaleMode = {
  pricingMode: PricingMode
  qty: number
  money: number
}

export type ProductSaleRow = {
  productId: string
  name: string
  category: CategoryId | "otros"
  money: number
  modes: ProductSaleMode[]
}

export type DayRollup = {
  dateKey: string
  ticketCount: number
  total: number
}

export type PeriodSummary = {
  ticketCount: number
  total: number
  average: number
  products: ProductSaleRow[]
  days: DayRollup[]
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID()
  return `sale-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function toStoredSale(ticket: IssuedTicket, products: Product[]): StoredSale {
  return {
    schemaVersion: SALES_SCHEMA_VERSION,
    id: newId(),
    number: ticket.number,
    issuedAt: ticket.issuedAt,
    timezone: TIMEZONE,
    localDate: dateKeyInBA(new Date(ticket.issuedAt)),
    total: ticket.total,
    lines: ticket.lines.map((line) => {
      const product = products.find((item) => item.id === line.productId)
      return {
        productId: line.productId,
        name: line.name,
        category: product?.category ?? "otros",
        pricingMode: line.pricingMode,
        qty: line.qty,
        unitPrice: line.unitPrice,
        lineTotal: lineTotal(line),
      }
    }),
  }
}

export function saleToCartLines(sale: StoredSale): CartLine[] {
  return sale.lines.map((line, index) => ({
    id: `${sale.id}-line-${index}`,
    productId: line.productId,
    name: line.name,
    pricingMode: line.pricingMode,
    qty: line.qty,
    unitPrice: line.unitPrice,
  }))
}

export function upsertSale(sales: StoredSale[], sale: StoredSale): StoredSale[] {
  const existing = sales.find((item) => item.number === sale.number)
  if (!existing) return [...sales, sale]
  return sales.map((item) =>
    item.number === sale.number ? { ...sale, id: item.id } : item,
  )
}

export function salesInRange(sales: StoredSale[], start: string, end: string): StoredSale[] {
  return sales
    .filter((sale) => inRange(sale.localDate, start, end))
    .sort((a, b) => a.issuedAt.localeCompare(b.issuedAt) || a.number - b.number)
}

function qtyLabelForMode(mode: PricingMode, qty: number): string {
  if (mode === "frozen-half") return qty === 1 ? "1/2 kg" : `${qty} × 1/2 kg`
  if (mode === "pack") return qty === 1 ? "1 pack" : `${qty} packs`
  if (mode === "unit") return qty === 1 ? "1 maple" : `${qty} maples`
  return formatKg(qty)
}

export function modeQtyLabel(mode: ProductSaleMode): string {
  return qtyLabelForMode(mode.pricingMode, mode.qty)
}

export function productQtyLabel(row: ProductSaleRow): string {
  if (row.modes.length === 1) return modeQtyLabel(row.modes[0])
  const frozen = row.modes.filter(
    (mode) => mode.pricingMode === "frozen-half" || mode.pricingMode === "frozen-kg",
  )
  if (frozen.length === row.modes.length) {
    const kg = frozen.reduce((sum, mode) => {
      if (mode.pricingMode === "frozen-half") return sum + mode.qty * 0.5
      return sum + mode.qty
    }, 0)
    return formatKg(kg)
  }
  return row.modes.map((mode) => modeQtyLabel(mode)).join(" · ")
}

export function summarizePeriod(sales: StoredSale[]): PeriodSummary {
  const ticketCount = sales.length
  const total = roundARS(sales.reduce((sum, sale) => sum + sale.total, 0))
  const average = ticketCount === 0 ? 0 : roundARS(total / ticketCount)

  const productMap = new Map<
    string,
    { name: string; category: CategoryId | "otros"; modes: Map<PricingMode, ProductSaleMode> }
  >()

  for (const sale of sales) {
    for (const line of sale.lines) {
      const current = productMap.get(line.productId) ?? {
        name: line.name,
        category: line.category,
        modes: new Map(),
      }
      current.name = line.name
      const mode = current.modes.get(line.pricingMode) ?? {
        pricingMode: line.pricingMode,
        qty: 0,
        money: 0,
      }
      mode.qty += line.qty
      mode.money += line.lineTotal
      current.modes.set(line.pricingMode, mode)
      productMap.set(line.productId, current)
    }
  }

  const products: ProductSaleRow[] = [...productMap.entries()]
    .map(([productId, value]) => ({
      productId,
      name: value.name,
      category: value.category,
      money: roundARS([...value.modes.values()].reduce((sum, mode) => sum + mode.money, 0)),
      modes: [...value.modes.values()].map((mode) => ({
        ...mode,
        money: roundARS(mode.money),
      })),
    }))
    .sort((a, b) => b.money - a.money || a.name.localeCompare(b.name, "es"))

  const dayMap = new Map<string, DayRollup>()
  for (const sale of sales) {
    const current = dayMap.get(sale.localDate) ?? {
      dateKey: sale.localDate,
      ticketCount: 0,
      total: 0,
    }
    current.ticketCount += 1
    current.total += sale.total
    dayMap.set(sale.localDate, current)
  }

  const days = [...dayMap.values()]
    .map((day) => ({ ...day, total: roundARS(day.total) }))
    .sort((a, b) => b.dateKey.localeCompare(a.dateKey))

  return { ticketCount, total, average, products, days }
}

export function periodCsv(sales: StoredSale[]): string {
  const header = [
    "fecha_local",
    "hora_local",
    "ticket",
    "producto",
    "categoria",
    "modo",
    "cantidad",
    "precio_unitario",
    "total_linea",
    "total_ticket",
    "id",
    "emitido_iso",
  ]
  const rows = sales.flatMap((sale) =>
    sale.lines.map((line) =>
      [
        sale.localDate,
        formatTimeForCsv(sale.issuedAt),
        sale.number,
        csvEscape(line.name),
        line.category,
        line.pricingMode,
        String(line.qty).replace(".", ","),
        line.unitPrice,
        line.lineTotal,
        sale.total,
        sale.id,
        sale.issuedAt,
      ].join(";"),
    ),
  )
  return [header.join(";"), ...rows].join("\n")
}

function formatTimeForCsv(iso: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(iso))
}

function csvEscape(value: string): string {
  if (/[;"\n]/.test(value)) return `"${value.replaceAll('"', '""')}"`
  return value
}

export function categoryLabel(category: CategoryId | "otros"): string {
  if (category === "pollo") return "Pollo"
  if (category === "congelados") return "Congelados"
  if (category === "ofertas") return "Ofertas"
  if (category === "huevos") return "Huevos"
  return "Otros"
}
