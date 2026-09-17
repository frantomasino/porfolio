"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { addOrMergeLine, cartTotal, repriceLines, removeLine, setLineQty, type CartLine, type IssuedTicket, type PricingMode } from "@/lib/cart"
import { mergeCatalog, pricesFromCatalog, SEED_CATALOG, type PriceFields, type Product } from "@/lib/catalog"
import {
  loadCart,
  loadIssuedTicket,
  loadNextTicket,
  loadPriceOverrides,
  saveCart,
  saveIssuedTicket,
  saveNextTicket,
  savePriceOverrides,
} from "@/lib/storage"

export type View = "caja" | "ticket" | "precios"

export function usePos() {
  const [hydrated, setHydrated] = useState(false)
  const [products, setProducts] = useState<Product[]>(SEED_CATALOG)
  const [lines, setLines] = useState<CartLine[]>([])
  const [nextTicket, setNextTicket] = useState(1)
  const [issued, setIssued] = useState<IssuedTicket | null>(null)
  const [view, setView] = useState<View>("caja")

  useEffect(() => {
    const catalog = mergeCatalog(loadPriceOverrides())
    const cart = repriceLines(loadCart(), catalog)
    setProducts(catalog)
    setLines(cart)
    setNextTicket(loadNextTicket())
    setIssued(loadIssuedTicket())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveCart(lines)
  }, [hydrated, lines])

  useEffect(() => {
    if (!hydrated) return
    savePriceOverrides(pricesFromCatalog(products))
  }, [hydrated, products])

  useEffect(() => {
    if (!hydrated) return
    saveNextTicket(nextTicket)
  }, [hydrated, nextTicket])

  useEffect(() => {
    if (!hydrated) return
    saveIssuedTicket(issued)
  }, [hydrated, issued])

  const total = useMemo(() => cartTotal(lines), [lines])
  const ticketNumber = issued?.number ?? nextTicket
  const ticketLines = issued?.lines ?? lines
  const ticketTotal = issued ? issued.total : total
  const ticketDate = issued ? new Date(issued.issuedAt) : new Date()

  const addItem = useCallback((product: Product, mode: PricingMode, qty: number) => {
    setLines((current) => addOrMergeLine(current, product, mode, qty))
    setIssued(null)
  }, [])

  const updateQty = useCallback((lineId: string, qty: number) => {
    setLines((current) => setLineQty(current, lineId, qty))
    setIssued(null)
  }, [])

  const removeItem = useCallback((lineId: string) => {
    setLines((current) => removeLine(current, lineId))
    setIssued(null)
  }, [])

  const emitTicket = useCallback(() => {
    if (lines.length === 0) return
    const snapshot: IssuedTicket = {
      number: issued?.number ?? nextTicket,
      issuedAt: new Date().toISOString(),
      lines,
      total,
    }
    setIssued(snapshot)
    setView("ticket")
  }, [issued, lines, nextTicket, total])

  const newSale = useCallback(() => {
    if (issued) {
      setNextTicket(issued.number + 1)
    }
    setLines([])
    setIssued(null)
    setView("caja")
  }, [issued])

  const updateProductPrices = useCallback((productId: string, fields: Partial<PriceFields>) => {
    setProducts((current) => {
      const next = current.map((product) =>
        product.id === productId ? { ...product, ...fields } : product,
      )
      setLines((cart) => repriceLines(cart, next))
      return next
    })
  }, [])

  const restoreFlyerPrices = useCallback(() => {
    setProducts(SEED_CATALOG)
    setLines((cart) => repriceLines(cart, SEED_CATALOG))
  }, [])

  return {
    hydrated,
    products,
    lines,
    total,
    view,
    setView,
    ticketNumber,
    ticketLines,
    ticketTotal,
    ticketDate,
    issued,
    addItem,
    updateQty,
    removeItem,
    emitTicket,
    newSale,
    updateProductPrices,
    restoreFlyerPrices,
  }
}
