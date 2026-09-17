"use client"

import { formatARS } from "@/lib/money"
import { isSellable, type CategoryId, type Product } from "@/lib/catalog"
import { cn } from "@/lib/utils"

function pricePreview(product: Product): string {
  if (product.sellMode === "fresh-kg" && product.pricePerKg != null) {
    return `${formatARS(product.pricePerKg)} / kg`
  }
  if (product.sellMode === "frozen") {
    const parts: string[] = []
    if (product.priceHalfKg != null) parts.push(`${formatARS(product.priceHalfKg)} ½ kg`)
    if (product.priceKg != null) parts.push(`${formatARS(product.priceKg)} kg`)
    return parts.join(" · ")
  }
  if (product.unitPrice != null) {
    if (product.sellMode === "pack") return formatARS(product.unitPrice)
    return `${formatARS(product.unitPrice)} / maple`
  }
  return "Sin precio"
}

export function ProductGrid({
  products,
  category,
  onSelect,
}: {
  products: Product[]
  category: CategoryId
  onSelect: (product: Product) => void
}) {
  const items = products.filter((product) => product.category === category)

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
      {items.map((product) => {
        const sellable = isSellable(product)
        return (
          <button
            key={product.id}
            type="button"
            disabled={!sellable}
            onClick={() => onSelect(product)}
            className={cn(
              "min-h-[7.5rem] rounded-2xl border px-3 py-3 text-left shadow-sm transition active:scale-[0.98]",
              sellable
                ? "border-border/80 bg-card hover:border-primary/40 hover:bg-primary/5"
                : "cursor-not-allowed border-dashed bg-muted/40 opacity-70",
            )}
          >
            <p className="font-display text-[1.05rem] leading-snug font-semibold text-foreground">
              {product.name}
            </p>
            {product.packSizeLabel ? (
              <p className="mt-1 text-xs text-muted-foreground">{product.packSizeLabel}</p>
            ) : null}
            <p className={cn("mt-3 text-sm font-semibold", sellable ? "text-primary" : "text-muted-foreground")}>
              {pricePreview(product)}
            </p>
            {product.sellMode === "fresh-kg" && sellable ? (
              <p className="mt-1 text-[11px] text-muted-foreground">Toque para ½ kg, 1 kg o kilos</p>
            ) : null}
            {product.sellMode === "frozen" && sellable ? (
              <p className="mt-1 text-[11px] text-muted-foreground">Toque para ½ kg o 1 kg</p>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

export function FrozenPriceNote({ product }: { product: Product }) {
  if (product.priceHalfKg == null || product.priceKg == null) return null
  const naiveHalf = product.priceKg / 2
  if (Math.abs(naiveHalf - product.priceHalfKg) < 1) return null
  return (
    <p className="text-xs text-muted-foreground">
      El ½ kg se cobra a lista ({formatARS(product.priceHalfKg)}), no la mitad del kilo (
      {formatARS(naiveHalf)}).
    </p>
  )
}
