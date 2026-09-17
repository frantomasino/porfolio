import { mergeCatalog, pricesFromCatalog, SEED_CATALOG, type PriceFields } from "@/lib/catalog"
import type { CartLine, IssuedTicket } from "@/lib/cart"

const PREFIX = "pp-pos-v1"

export const STORAGE_KEYS = {
  prices: `${PREFIX}-prices`,
  nextTicket: `${PREFIX}-next-ticket`,
  cart: `${PREFIX}-cart`,
  issued: `${PREFIX}-issued`,
} as const

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function writeJson(key: string, value: unknown) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function loadPriceOverrides(): Record<string, Partial<PriceFields>> {
  const stored = readJson<Record<string, Partial<PriceFields>>>(STORAGE_KEYS.prices)
  return stored ?? pricesFromCatalog(SEED_CATALOG)
}

export function savePriceOverrides(overrides: Record<string, Partial<PriceFields>>) {
  writeJson(STORAGE_KEYS.prices, overrides)
}

export function loadCatalog() {
  return mergeCatalog(loadPriceOverrides())
}

export function loadNextTicket(): number {
  const stored = readJson<number>(STORAGE_KEYS.nextTicket)
  if (typeof stored === "number" && Number.isInteger(stored) && stored > 0) return stored
  return 1
}

export function saveNextTicket(n: number) {
  writeJson(STORAGE_KEYS.nextTicket, n)
}

export function loadCart(): CartLine[] {
  const stored = readJson<CartLine[]>(STORAGE_KEYS.cart)
  return Array.isArray(stored) ? stored : []
}

export function saveCart(lines: CartLine[]) {
  writeJson(STORAGE_KEYS.cart, lines)
}

export function loadIssuedTicket(): IssuedTicket | null {
  return readJson<IssuedTicket>(STORAGE_KEYS.issued)
}

export function saveIssuedTicket(ticket: IssuedTicket | null) {
  if (!ticket) {
    window.localStorage.removeItem(STORAGE_KEYS.issued)
    return
  }
  writeJson(STORAGE_KEYS.issued, ticket)
}
