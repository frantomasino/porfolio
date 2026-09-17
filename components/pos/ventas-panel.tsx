"use client"

import { ChevronLeft, ChevronRight, Copy, FileSpreadsheet } from "lucide-react"
import { useMemo, useState } from "react"
import { TicketScreen } from "@/components/pos/ticket-screen"
import { Button } from "@/components/ui/button"
import {
  addDays,
  dateKeyInBA,
  formatDayLong,
  formatDayShort,
  formatPeriodLabel,
  formatTimeBA,
  periodRange,
  type PeriodMode,
} from "@/lib/dates"
import { formatARS, formatTicketNumber } from "@/lib/money"
import {
  categoryLabel,
  modeQtyLabel,
  periodCsv,
  productQtyLabel,
  salesInRange,
  saleToCartLines,
  summarizePeriod,
  type StoredSale,
} from "@/lib/sales"
import { qtyLabel } from "@/lib/cart"
import { cn } from "@/lib/utils"

const PERIODS: { id: PeriodMode; label: string }[] = [
  { id: "hoy", label: "Hoy" },
  { id: "dia", label: "Día" },
  { id: "semana", label: "Semana" },
  { id: "mes", label: "Mes" },
  { id: "anio", label: "Año" },
]

export function VentasPanel({ sales, onBack }: { sales: StoredSale[]; onBack: () => void }) {
  const today = dateKeyInBA()
  const [mode, setMode] = useState<PeriodMode>("hoy")
  const [selectedDate, setSelectedDate] = useState(today)
  const [openDay, setOpenDay] = useState<string | null>(null)
  const [reprint, setReprint] = useState<StoredSale | null>(null)
  const [copied, setCopied] = useState(false)

  const rangeDate = mode === "hoy" ? today : selectedDate
  const range = periodRange(mode, rangeDate)
  const periodSales = useMemo(
    () => salesInRange(sales, range.start, range.end),
    [sales, range.start, range.end],
  )
  const summary = useMemo(() => summarizePeriod(periodSales), [periodSales])
  const dayTickets = openDay
    ? salesInRange(sales, openDay, openDay).slice().reverse()
    : []

  function selectMode(next: PeriodMode) {
    setMode(next)
    setOpenDay(null)
    if (next === "hoy") setSelectedDate(today)
  }

  function shiftPeriod(direction: -1 | 1) {
    setOpenDay(null)
    if (mode === "hoy") {
      setMode("dia")
      setSelectedDate(addDays(today, direction))
      return
    }
    if (mode === "dia") {
      setSelectedDate(addDays(selectedDate, direction))
      return
    }
    if (mode === "semana") {
      setSelectedDate(addDays(selectedDate, direction * 7))
      return
    }
    if (mode === "mes") {
      const [year, month] = selectedDate.split("-").map(Number)
      const next = new Date(Date.UTC(year, month - 1 + direction, 1))
      setSelectedDate(next.toISOString().slice(0, 10))
      return
    }
    const year = Number(selectedDate.slice(0, 4)) + direction
    setSelectedDate(`${year}-01-01`)
  }

  async function copyCsv() {
    const csv = periodCsv(periodSales)
    try {
      await navigator.clipboard.writeText(csv)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt("Copiá el CSV:", csv)
    }
  }

  if (reprint) {
    return (
      <TicketScreen
        ticketNumber={reprint.number}
        issuedAt={new Date(reprint.issuedAt)}
        lines={saleToCartLines(reprint)}
        backLabel="Volver a ventas"
        showNewSale={false}
        onBack={() => setReprint(null)}
      />
    )
  }

  if (openDay) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-4 py-4">
        <div className="mb-4 flex items-center gap-2">
          <Button type="button" variant="outline" onClick={() => setOpenDay(null)}>
            <ChevronLeft />
            Período
          </Button>
        </div>
        <h1 className="font-display text-2xl font-semibold capitalize">{formatDayLong(openDay)}</h1>
        <p className="text-sm text-muted-foreground">
          {dayTickets.length} ticket{dayTickets.length === 1 ? "" : "s"} · {formatARS(summary.days.find((d) => d.dateKey === openDay)?.total ?? summarizePeriod(dayTickets).total)}
        </p>
        {dayTickets.length === 0 ? (
          <p className="mt-10 text-center text-muted-foreground">No hay tickets este día.</p>
        ) : (
          <ul className="mt-4 space-y-3 pb-10">
            {dayTickets.map((sale) => (
              <li key={sale.id}>
                <button
                  type="button"
                  onClick={() => setReprint(sale)}
                  className="w-full rounded-2xl border bg-card p-4 text-left shadow-sm transition active:scale-[0.99]"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-display text-lg font-semibold">
                      Ticket {formatTicketNumber(sale.number)}
                    </p>
                    <p className="text-lg font-semibold">{formatARS(sale.total)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatTimeBA(sale.issuedAt)}</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {sale.lines.map((line, index) => (
                      <li key={`${sale.id}-${index}`} className="flex justify-between gap-2">
                        <span className="min-w-0 truncate">
                          {line.name}{" "}
                          <span className="text-muted-foreground">
                            {qtyLabel({
                              id: "",
                              productId: line.productId,
                              name: line.name,
                              pricingMode: line.pricingMode,
                              qty: line.qty,
                              unitPrice: line.unitPrice,
                            })}
                          </span>
                        </span>
                        <span className="shrink-0">{formatARS(line.lineTotal)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs font-medium text-primary">Reabrir / imprimir</p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-4 py-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Ventas</h1>
          <p className="text-sm text-muted-foreground">
            {formatPeriodLabel(mode, range.start, range.end)}
          </p>
        </div>
        <Button type="button" variant="outline" onClick={onBack}>
          Volver a la caja
        </Button>
      </div>

      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        {PERIODS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => selectMode(item.id)}
            className={cn(
              "h-12 shrink-0 rounded-full px-4 text-sm font-semibold transition",
              mode === item.id
                ? "bg-primary text-primary-foreground shadow"
                : "bg-card text-foreground ring-1 ring-border hover:bg-muted",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Button type="button" size="icon" variant="outline" className="size-11" onClick={() => shiftPeriod(-1)} aria-label="Período anterior">
          <ChevronLeft />
        </Button>
        <label className="min-w-0 flex-1">
          <span className="sr-only">Elegir fecha</span>
          <input
            type="date"
            lang="es-AR"
            value={rangeDate}
            onChange={(event) => {
              const value = event.target.value
              if (!value) return
              setSelectedDate(value)
              setOpenDay(null)
              if (mode === "hoy") setMode("dia")
            }}
            className="h-11 w-full rounded-xl border border-input bg-card px-3 text-base"
          />
        </label>
        <Button type="button" size="icon" variant="outline" className="size-11" onClick={() => shiftPeriod(1)} aria-label="Período siguiente">
          <ChevronRight />
        </Button>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        <Kpi label="Ventas" value={String(summary.ticketCount)} />
        <Kpi label="Total" value={formatARS(summary.total)} />
        <Kpi label="Promedio" value={summary.ticketCount ? formatARS(summary.average) : "—"} />
      </div>

      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Productos</h2>
          <Button type="button" variant="ghost" size="sm" onClick={copyCsv} disabled={periodSales.length === 0}>
            {copied ? <Copy /> : <FileSpreadsheet />}
            {copied ? "CSV copiado" : "Copiar CSV"}
          </Button>
        </div>
        {summary.products.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
            No hay ventas en este período. Los tickets emitidos en la caja aparecen acá, en este dispositivo.
          </div>
        ) : (
          <ul className="space-y-2">
            {summary.products.map((row) => (
              <li key={row.productId} className="rounded-2xl border bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium leading-snug">{row.name}</p>
                    <p className="text-xs text-muted-foreground">{categoryLabel(row.category)}</p>
                  </div>
                  <p className="shrink-0 font-semibold">{formatARS(row.money)}</p>
                </div>
                <p className="mt-2 text-sm font-medium text-primary">{productQtyLabel(row)}</p>
                {row.modes.length > 1 ? (
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {row.modes.map((modeRow) => (
                      <li key={modeRow.pricingMode} className="flex justify-between gap-2">
                        <span>
                          {modeRow.pricingMode === "frozen-half"
                            ? "½ kg"
                            : modeRow.pricingMode === "frozen-kg"
                              ? "1 kg / a medida"
                              : modeRow.pricingMode}
                          {" · "}
                          {modeQtyLabel(modeRow)}
                        </span>
                        <span>{formatARS(modeRow.money)}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="pb-10">
        <h2 className="mb-2 font-display text-lg font-semibold">Días</h2>
        {summary.days.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todavía no hay días con tickets en este recorte.</p>
        ) : (
          <ul className="space-y-2">
            {summary.days.map((day) => (
              <li key={day.dateKey}>
                <button
                  type="button"
                  onClick={() => setOpenDay(day.dateKey)}
                  className="flex w-full items-center justify-between gap-3 rounded-2xl border bg-card p-4 text-left shadow-sm transition active:scale-[0.99]"
                >
                  <span>
                    <span className="block font-medium capitalize">{formatDayShort(day.dateKey)}</span>
                    <span className="text-sm text-muted-foreground">
                      {day.ticketCount} ticket{day.ticketCount === 1 ? "" : "s"}
                    </span>
                  </span>
                  <span className="font-semibold">{formatARS(day.total)}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-card p-3 text-center">
      <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="font-display mt-1 text-lg leading-tight font-semibold sm:text-xl">{value}</p>
    </div>
  )
}
