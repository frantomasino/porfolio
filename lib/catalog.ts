export type CategoryId = "pollo" | "congelados" | "ofertas" | "huevos"

export type SellMode = "fresh-kg" | "frozen" | "pack" | "unit"

export type Product = {
  id: string
  name: string
  category: CategoryId
  sellMode: SellMode
  pricePerKg: number | null
  priceHalfKg: number | null
  priceKg: number | null
  unitPrice: number | null
  packSizeLabel?: string
  unitLabel?: string
}

export type PriceFields = Pick<
  Product,
  "pricePerKg" | "priceHalfKg" | "priceKg" | "unitPrice"
>

export const CATEGORIES: { id: CategoryId; label: string; hint: string }[] = [
  { id: "pollo", label: "Pollo", hint: "Precio x kg" },
  { id: "congelados", label: "Congelados", hint: "1/2 kg y 1 kg" },
  { id: "ofertas", label: "Ofertas", hint: "Packs" },
  { id: "huevos", label: "Huevos", hint: "Maple" },
]

export const SEED_CATALOG: Product[] = [
  {
    id: "pollo-entero",
    name: "Pollo entero",
    category: "pollo",
    sellMode: "fresh-kg",
    pricePerKg: 6000,
    priceHalfKg: null,
    priceKg: null,
    unitPrice: null,
  },
  {
    id: "pollo-trozado",
    name: "Pollo trozado",
    category: "pollo",
    sellMode: "fresh-kg",
    pricePerKg: 6500,
    priceHalfKg: null,
    priceKg: null,
    unitPrice: null,
  },
  {
    id: "suprema",
    name: "Suprema",
    category: "pollo",
    sellMode: "fresh-kg",
    pricePerKg: 11400,
    priceHalfKg: null,
    priceKg: null,
    unitPrice: null,
  },
  {
    id: "pechuga-con-hueso",
    name: "Pechuga con hueso",
    category: "pollo",
    sellMode: "fresh-kg",
    pricePerKg: 10300,
    priceHalfKg: null,
    priceKg: null,
    unitPrice: null,
  },
  {
    id: "alitas",
    name: "Alitas",
    category: "pollo",
    sellMode: "fresh-kg",
    pricePerKg: 2000,
    priceHalfKg: null,
    priceKg: null,
    unitPrice: null,
  },
  {
    id: "milanesa-de-pollo",
    name: "Milanesa de pollo",
    category: "pollo",
    sellMode: "fresh-kg",
    pricePerKg: 8500,
    priceHalfKg: null,
    priceKg: null,
    unitPrice: null,
  },
  {
    id: "pata-y-muslo",
    name: "Pata y muslo",
    category: "pollo",
    sellMode: "fresh-kg",
    pricePerKg: 4500,
    priceHalfKg: null,
    priceKg: null,
    unitPrice: null,
  },
  {
    id: "papas-baston",
    name: "Papas bastón",
    category: "congelados",
    sellMode: "frozen",
    pricePerKg: null,
    priceHalfKg: 3500,
    priceKg: 6700,
    unitPrice: null,
  },
  {
    id: "papas-noisette",
    name: "Papas noisette",
    category: "congelados",
    sellMode: "frozen",
    pricePerKg: null,
    priceHalfKg: 5700,
    priceKg: 10950,
    unitPrice: null,
  },
  {
    id: "papas-carita",
    name: "Papas carita",
    category: "congelados",
    sellMode: "frozen",
    pricePerKg: null,
    priceHalfKg: 5000,
    priceKg: 9800,
    unitPrice: null,
  },
  {
    id: "nuggets-crocantes",
    name: "Nuggets crocantes",
    category: "congelados",
    sellMode: "frozen",
    pricePerKg: null,
    priceHalfKg: 5700,
    priceKg: 10900,
    unitPrice: null,
  },
  {
    id: "bocaditos-muzza-calabaza",
    name: "Bocaditos muzza y calabaza",
    category: "congelados",
    sellMode: "frozen",
    pricePerKg: null,
    priceHalfKg: 4000,
    priceKg: 7900,
    unitPrice: null,
  },
  {
    id: "bocaditos-espinaca",
    name: "Bocaditos espinaca",
    category: "congelados",
    sellMode: "frozen",
    pricePerKg: null,
    priceHalfKg: 4400,
    priceKg: 7900,
    unitPrice: null,
  },
  {
    id: "ricosaurios",
    name: "Ricosaurios",
    category: "congelados",
    sellMode: "frozen",
    pricePerKg: null,
    priceHalfKg: null,
    priceKg: null,
    unitPrice: null,
  },
  {
    id: "bastoncito-muzza",
    name: "Bastoncito de muzza",
    category: "congelados",
    sellMode: "frozen",
    pricePerKg: null,
    priceHalfKg: 6500,
    priceKg: 12900,
    unitPrice: null,
  },
  {
    id: "merluza-rebozada",
    name: "Merluza rebozada",
    category: "congelados",
    sellMode: "frozen",
    pricePerKg: null,
    priceHalfKg: 6500,
    priceKg: 12900,
    unitPrice: null,
  },
  {
    id: "patitas-rebozadas",
    name: "Patitas rebozadas",
    category: "congelados",
    sellMode: "frozen",
    pricePerKg: null,
    priceHalfKg: 4400,
    priceKg: 8000,
    unitPrice: null,
  },
  {
    id: "oferta-pata-muslo-3kg",
    name: "Pata y muslo x 3 kg",
    category: "ofertas",
    sellMode: "pack",
    pricePerKg: null,
    priceHalfKg: null,
    priceKg: null,
    unitPrice: 12500,
    packSizeLabel: "pack 3 kg",
  },
  {
    id: "oferta-alitas-3kg",
    name: "Alitas x 3 kg",
    category: "ofertas",
    sellMode: "pack",
    pricePerKg: null,
    priceHalfKg: null,
    priceKg: null,
    unitPrice: 5700,
    packSizeLabel: "pack 3 kg",
  },
  {
    id: "oferta-milanesa-2kg",
    name: "Milanesa de pollo x 2 kg",
    category: "ofertas",
    sellMode: "pack",
    pricePerKg: null,
    priceHalfKg: null,
    priceKg: null,
    unitPrice: 16000,
    packSizeLabel: "pack 2 kg",
  },
  {
    id: "maple",
    name: "Maple",
    category: "huevos",
    sellMode: "unit",
    pricePerKg: null,
    priceHalfKg: null,
    priceKg: null,
    unitPrice: 6000,
    unitLabel: "maple",
  },
]

export function mergeCatalog(overrides: Record<string, Partial<PriceFields>>): Product[] {
  return SEED_CATALOG.map((product) => {
    const override = overrides[product.id]
    if (!override) return product
    return {
      ...product,
      pricePerKg: override.pricePerKg !== undefined ? override.pricePerKg : product.pricePerKg,
      priceHalfKg: override.priceHalfKg !== undefined ? override.priceHalfKg : product.priceHalfKg,
      priceKg: override.priceKg !== undefined ? override.priceKg : product.priceKg,
      unitPrice: override.unitPrice !== undefined ? override.unitPrice : product.unitPrice,
    }
  })
}

export function pricesFromCatalog(products: Product[]): Record<string, PriceFields> {
  return Object.fromEntries(
    products.map((product) => [
      product.id,
      {
        pricePerKg: product.pricePerKg,
        priceHalfKg: product.priceHalfKg,
        priceKg: product.priceKg,
        unitPrice: product.unitPrice,
      },
    ]),
  )
}

export function isSellable(product: Product): boolean {
  if (product.sellMode === "fresh-kg") return product.pricePerKg != null
  if (product.sellMode === "frozen") return product.priceHalfKg != null || product.priceKg != null
  return product.unitPrice != null
}
