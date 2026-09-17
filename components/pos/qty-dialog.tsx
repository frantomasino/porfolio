"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { FrozenPriceNote } from "@/components/pos/product-grid"
import type { PricingMode } from "@/lib/cart"
import type { Product } from "@/lib/catalog"
import { formatARS, parseDecimal } from "@/lib/money"

const FRESH_PRESETS = [0.5, 1, 1.5, 2]
const PACK_PRESETS = [1, 2, 3, 4, 5]

export function QtyDialog({
  product,
  open,
  onOpenChange,
  onAdd,
}: {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (product: Product, mode: PricingMode, qty: number) => void
}) {
  const [custom, setCustom] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setCustom("")
      setError(null)
    }
  }, [open, product?.id])

  if (!product) return null

  function add(mode: PricingMode, qty: number) {
    onAdd(product!, mode, qty)
    onOpenChange(false)
  }

  function addCustom() {
    const qty = parseDecimal(custom)
    if (qty == null) {
      setError("Ingresá una cantidad válida.")
      return
    }
    if (product!.sellMode === "fresh-kg") {
      add("fresh-kg", qty)
      return
    }
    if (product!.sellMode === "frozen") {
      if (product!.priceKg == null) {
        setError("Este producto no tiene precio por kilo.")
        return
      }
      add("frozen-kg", qty)
      return
    }
    if (!Number.isInteger(qty)) {
      setError("La cantidad tiene que ser un número entero.")
      return
    }
    add(product!.sellMode === "pack" ? "pack" : "unit", qty)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{product.name}</DialogTitle>
          <DialogDescription>
            {product.sellMode === "fresh-kg" && "Elegí los kilos que se lleva el cliente."}
            {product.sellMode === "frozen" && "½ kg y 1 kg se cobran al precio de lista."}
            {product.sellMode === "pack" && "Cantidad de packs."}
            {product.sellMode === "unit" && "Cantidad de maples."}
          </DialogDescription>
        </DialogHeader>

        {product.sellMode === "fresh-kg" ? (
          <div className="grid grid-cols-2 gap-2">
            {FRESH_PRESETS.map((kg) => (
              <Button
                key={kg}
                type="button"
                size="lg"
                className="h-16 text-base"
                disabled={product.pricePerKg == null}
                onClick={() => add("fresh-kg", kg)}
              >
                <span className="flex flex-col">
                  <span>{kg === 0.5 ? "1/2 kg" : `${kg.toLocaleString("es-AR")} kg`}</span>
                  {product.pricePerKg != null ? (
                    <span className="text-xs font-normal opacity-80">
                      {formatARS(kg * product.pricePerKg)}
                    </span>
                  ) : null}
                </span>
              </Button>
            ))}
          </div>
        ) : null}

        {product.sellMode === "frozen" ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                size="lg"
                className="h-20 text-base"
                disabled={product.priceHalfKg == null}
                onClick={() => add("frozen-half", 1)}
              >
                <span className="flex flex-col">
                  <span>1/2 kg</span>
                  {product.priceHalfKg != null ? (
                    <span className="text-xs font-normal opacity-80">{formatARS(product.priceHalfKg)}</span>
                  ) : (
                    <span className="text-xs font-normal opacity-80">Sin precio</span>
                  )}
                </span>
              </Button>
              <Button
                type="button"
                size="lg"
                className="h-20 text-base"
                disabled={product.priceKg == null}
                onClick={() => add("frozen-kg", 1)}
              >
                <span className="flex flex-col">
                  <span>1 kg</span>
                  {product.priceKg != null ? (
                    <span className="text-xs font-normal opacity-80">{formatARS(product.priceKg)}</span>
                  ) : (
                    <span className="text-xs font-normal opacity-80">Sin precio</span>
                  )}
                </span>
              </Button>
            </div>
            <FrozenPriceNote product={product} />
          </div>
        ) : null}

        {product.sellMode === "pack" || product.sellMode === "unit" ? (
          <div className="grid grid-cols-5 gap-2">
            {PACK_PRESETS.map((n) => (
              <Button
                key={n}
                type="button"
                size="lg"
                className="h-14 text-lg"
                disabled={product.unitPrice == null}
                onClick={() => add(product.sellMode === "pack" ? "pack" : "unit", n)}
              >
                {n}
              </Button>
            ))}
          </div>
        ) : null}

        <div className="space-y-2 border-t pt-4">
          <p className="text-sm font-medium">
            {product.sellMode === "pack" || product.sellMode === "unit" ? "Otra cantidad" : "Kilos a medida"}
          </p>
          {product.sellMode === "frozen" ? (
            <p className="text-xs text-muted-foreground">
              El kilo a medida se cobra con el precio de 1 kg
              {product.priceKg != null ? ` (${formatARS(product.priceKg)} / kg)` : ""}.
            </p>
          ) : null}
          <div className="flex gap-2">
            <Input
              inputMode="decimal"
              placeholder={product.sellMode === "fresh-kg" || product.sellMode === "frozen" ? "Ej: 0,750" : "Ej: 6"}
              value={custom}
              onChange={(event) => {
                setCustom(event.target.value)
                setError(null)
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") addCustom()
              }}
              className="h-12 bg-background text-base"
            />
            <Button type="button" size="lg" className="h-12 px-5" onClick={addCustom}>
              Agregar
            </Button>
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
