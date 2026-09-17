import { formatARS, formatKg, roundARS } from "@/lib/money"
import type { Product } from "@/lib/catalog"

export type PricingMode = "fresh-kg" | "frozen-half" | "frozen-kg" | "pack" | "unit"

export type CartLine = {
  id: string
  productId: string
  name: string
  pricingMode: PricingMode
  qty: number
  unitPrice: number
}

export type IssuedTicket = {
  number: number
  issuedAt: string
  lines: CartLine[]
  total: number
}

export function lineTotal(line: CartLine): number {
  return roundARS(line.qty * line.unitPrice)
}

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + lineTotal(line), 0)
}

export function mergeKey(productId: string, mode: PricingMode): string {
  return `${productId}:${mode}`
}

export function resolveUnitPrice(product: Product, mode: PricingMode): number | null {
  if (mode === "fresh-kg") return product.pricePerKg
  if (mode === "frozen-half") return product.priceHalfKg
  if (mode === "frozen-kg") return product.priceKg
  return product.unitPrice
}

export function roundQty(qty: number, mode: PricingMode): number {
  if (mode === "frozen-half" || mode === "pack" || mode === "unit") {
    return Math.max(0, Math.round(qty))
  }
  return Math.max(0, Math.round(qty * 1000) / 1000)
}

export function qtyStep(mode: PricingMode): number {
  if (mode === "fresh-kg" || mode === "frozen-kg") return 0.5
  return 1
}

export function addOrMergeLine(
  lines: CartLine[],
  product: Product,
  mode: PricingMode,
  qty: number,
): CartLine[] {
  const unitPrice = resolveUnitPrice(product, mode)
  const nextQty = roundQty(qty, mode)
  if (unitPrice == null || nextQty <= 0) return lines

  const key = mergeKey(product.id, mode)
  const existing = lines.find((line) => mergeKey(line.productId, line.pricingMode) === key)
  if (existing) {
    return lines.map((line) =>
      line.id === existing.id
        ? { ...line, qty: roundQty(line.qty + nextQty, mode), unitPrice, name: product.name }
        : line,
    )
  }

  return [
    ...lines,
    {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${product.id}-${mode}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      pricingMode: mode,
      qty: nextQty,
      unitPrice,
    },
  ]
}

export function setLineQty(lines: CartLine[], lineId: string, qty: number): CartLine[] {
  return lines.flatMap((line) => {
    if (line.id !== lineId) return [line]
    const next = roundQty(qty, line.pricingMode)
    if (next <= 0) return []
    return [{ ...line, qty: next }]
  })
}

export function removeLine(lines: CartLine[], lineId: string): CartLine[] {
  return lines.filter((line) => line.id !== lineId)
}

export function repriceLines(lines: CartLine[], products: Product[]): CartLine[] {
  return lines.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId)
    if (!product) return []
    const unitPrice = resolveUnitPrice(product, line.pricingMode)
    if (unitPrice == null) return []
    return [{ ...line, name: product.name, unitPrice }]
  })
}

export function qtyLabel(line: CartLine): string {
  if (line.pricingMode === "frozen-half") {
    return line.qty === 1 ? "1/2 kg" : `${line.qty} × 1/2 kg`
  }
  if (line.pricingMode === "pack") {
    return line.qty === 1 ? "1 pack" : `${line.qty} packs`
  }
  if (line.pricingMode === "unit") {
    return line.qty === 1 ? "1 maple" : `${line.qty} maples`
  }
  return formatKg(line.qty)
}

export function unitPriceLabel(line: CartLine): string {
  if (line.pricingMode === "frozen-half") return `${formatARS(line.unitPrice)} c/u`
  if (line.pricingMode === "pack") return `${formatARS(line.unitPrice)} / pack`
  if (line.pricingMode === "unit") return `${formatARS(line.unitPrice)} / maple`
  return `${formatARS(line.unitPrice)} / kg`
}
