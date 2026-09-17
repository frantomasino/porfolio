"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CATEGORIES, type PriceFields, type Product } from "@/lib/catalog"
import { parsePesos } from "@/lib/money"

function PriceField({
  label,
  value,
  onChange,
}: {
  label: string
  value: number | null
  onChange: (value: number | null) => void
}) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <Input
        inputMode="numeric"
        placeholder="Sin precio"
        className="h-11 bg-background"
        defaultValue={value ?? ""}
        key={`${label}-${value ?? "empty"}`}
        onBlur={(event) => {
          const raw = event.target.value
          if (!raw.trim()) {
            onChange(null)
            event.target.value = ""
            return
          }
          const parsed = parsePesos(raw)
          if (parsed == null) {
            event.target.value = value != null ? String(value) : ""
            return
          }
          onChange(parsed)
          event.target.value = String(parsed)
        }}
      />
    </label>
  )
}

export function SettingsPanel({
  products,
  onUpdate,
  onRestore,
  onBack,
}: {
  products: Product[]
  onUpdate: (productId: string, fields: Partial<PriceFields>) => void
  onRestore: () => void
  onBack: () => void
}) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-4 py-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Precios</h1>
          <p className="text-sm text-muted-foreground">
            Se guardan en este dispositivo. Vaciar un campo deja el ítem sin precio (no se vende).
          </p>
        </div>
        <Button type="button" variant="outline" onClick={onBack}>
          Volver a la caja
        </Button>
      </div>

      <div className="mb-4 rounded-xl border bg-card p-3 text-sm text-muted-foreground">
        <Label className="text-foreground">Lista del volante</Label>
        <p className="mt-1">
          Si se equivocan, pueden restaurar los precios originales del catálogo P&P.
        </p>
        <Button type="button" variant="secondary" className="mt-3" onClick={onRestore}>
          Restaurar precios del volante
        </Button>
      </div>

      <div className="space-y-8 pb-10">
        {CATEGORIES.map((category) => (
          <section key={category.id}>
            <h2 className="font-display text-lg font-semibold">
              {category.label}{" "}
              <span className="text-sm font-normal text-muted-foreground">· {category.hint}</span>
            </h2>
            <ul className="mt-3 space-y-3">
              {products
                .filter((product) => product.category === category.id)
                .map((product) => (
                  <li key={product.id} className="rounded-xl border bg-card p-3">
                    <p className="mb-3 font-medium">{product.name}</p>
                    {product.sellMode === "fresh-kg" ? (
                      <PriceField
                        label="Precio x kg"
                        value={product.pricePerKg}
                        onChange={(pricePerKg) => onUpdate(product.id, { pricePerKg })}
                      />
                    ) : null}
                    {product.sellMode === "frozen" ? (
                      <div className="grid grid-cols-2 gap-3">
                        <PriceField
                          label="1/2 kg"
                          value={product.priceHalfKg}
                          onChange={(priceHalfKg) => onUpdate(product.id, { priceHalfKg })}
                        />
                        <PriceField
                          label="1 kg"
                          value={product.priceKg}
                          onChange={(priceKg) => onUpdate(product.id, { priceKg })}
                        />
                      </div>
                    ) : null}
                    {product.sellMode === "pack" ? (
                      <PriceField
                        label={`Precio del pack${product.packSizeLabel ? ` (${product.packSizeLabel})` : ""}`}
                        value={product.unitPrice}
                        onChange={(unitPrice) => onUpdate(product.id, { unitPrice })}
                      />
                    ) : null}
                    {product.sellMode === "unit" ? (
                      <PriceField
                        label="Precio por maple"
                        value={product.unitPrice}
                        onChange={(unitPrice) => onUpdate(product.id, { unitPrice })}
                      />
                    ) : null}
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
