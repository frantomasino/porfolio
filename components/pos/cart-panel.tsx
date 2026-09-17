"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { lineTotal, qtyLabel, qtyStep, unitPriceLabel, type CartLine } from "@/lib/cart"
import { formatARS } from "@/lib/money"
import { cn } from "@/lib/utils"

export function CartPanel({
  lines,
  total,
  onQty,
  onRemove,
  onEmit,
  onNewSale,
  className,
}: {
  lines: CartLine[]
  total: number
  onQty: (lineId: string, qty: number) => void
  onRemove: (lineId: string) => void
  onEmit: () => void
  onNewSale: () => void
  className?: string
}) {
  return (
    <aside className={cn("flex h-full min-h-0 flex-col bg-card", className)}>
      <div className="border-b px-4 py-3">
        <h2 className="font-display text-xl font-semibold">Pedido</h2>
        <p className="text-sm text-muted-foreground">
          {lines.length === 0 ? "Todavía no hay ítems" : `${lines.length} ítem${lines.length === 1 ? "" : "s"}`}
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        {lines.length === 0 ? (
          <p className="px-2 py-8 text-center text-sm text-muted-foreground">
            Tocá un producto a la izquierda para armar el ticket.
          </p>
        ) : (
          <ul className="space-y-2">
            {lines.map((line) => (
              <li key={line.id} className="rounded-xl border bg-background/70 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium leading-snug">{line.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {qtyLabel(line)} · {unitPriceLabel(line)}
                    </p>
                  </div>
                  <p className="shrink-0 font-semibold">{formatARS(lineTotal(line))}</p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="size-10"
                    aria-label="Restar"
                    onClick={() => onQty(line.id, line.qty - qtyStep(line.pricingMode))}
                  >
                    <Minus />
                  </Button>
                  <span className="min-w-14 text-center text-sm font-medium">{qtyLabel(line)}</span>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="size-10"
                    aria-label="Sumar"
                    onClick={() => onQty(line.id, line.qty + qtyStep(line.pricingMode))}
                  >
                    <Plus />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="ml-auto size-10 text-destructive hover:text-destructive"
                    aria-label="Quitar"
                    onClick={() => onRemove(line.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t bg-card p-4">
        <div className="mb-3 flex items-end justify-between">
          <span className="text-sm font-medium text-muted-foreground">Total</span>
          <span className="font-display text-3xl font-semibold tracking-tight">{formatARS(total)}</span>
        </div>
        <Button
          type="button"
          size="lg"
          className="h-14 w-full text-base"
          disabled={lines.length === 0}
          onClick={onEmit}
        >
          Emitir ticket
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="mt-1 w-full"
          disabled={lines.length === 0}
          onClick={onNewSale}
        >
          Nueva venta
        </Button>
      </div>
    </aside>
  )
}
