"use client"

import { Settings2, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { CartPanel } from "@/components/pos/cart-panel"
import { Logo } from "@/components/pos/logo"
import { ProductGrid } from "@/components/pos/product-grid"
import { QtyDialog } from "@/components/pos/qty-dialog"
import { SettingsPanel } from "@/components/pos/settings-panel"
import { TicketScreen } from "@/components/pos/ticket-screen"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CATEGORIES, isSellable, type CategoryId, type Product } from "@/lib/catalog"
import { formatARS, formatTicketNumber } from "@/lib/money"
import { usePos } from "@/hooks/use-pos"
import { cn } from "@/lib/utils"

export function PosApp() {
  const pos = usePos()
  const [category, setCategory] = useState<CategoryId>("pollo")
  const [selected, setSelected] = useState<Product | null>(null)
  const [qtyOpen, setQtyOpen] = useState(false)
  const [mobileCart, setMobileCart] = useState(false)
  const [confirmNew, setConfirmNew] = useState(false)

  function selectProduct(product: Product) {
    if (!isSellable(product)) return
    setSelected(product)
    setQtyOpen(true)
  }

  function requestNewSale() {
    if (pos.lines.length === 0 && !pos.issued) {
      pos.newSale()
      setMobileCart(false)
      return
    }
    setConfirmNew(true)
  }

  if (!pos.hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background text-muted-foreground">
        Abriendo caja…
      </div>
    )
  }

  if (pos.view === "ticket") {
    return (
      <TicketScreen
        ticketNumber={pos.ticketNumber}
        issuedAt={pos.ticketDate}
        lines={pos.ticketLines}
        onBack={() => pos.setView("caja")}
        onNewSale={requestNewSale}
      />
    )
  }

  if (pos.view === "precios") {
    return (
      <SettingsPanel
        products={pos.products}
        onUpdate={pos.updateProductPrices}
        onRestore={pos.restoreFlyerPrices}
        onBack={() => pos.setView("caja")}
      />
    )
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-30 flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground shadow-md">
        <Logo />
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden rounded-full bg-black/15 px-3 py-1 text-xs font-semibold tracking-wide uppercase sm:inline">
            Caja · Ticket {formatTicketNumber(pos.ticketNumber)}
          </span>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="size-11 bg-[#f6ede0] text-primary hover:bg-white"
            aria-label="Precios"
            onClick={() => pos.setView("precios")}
          >
            <Settings2 />
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <main className="min-w-0 flex-1 px-4 py-4 pb-28 lg:pb-4">
          <p className="mb-3 text-sm text-muted-foreground sm:hidden">
            Caja · Ticket {formatTicketNumber(pos.ticketNumber)}
          </p>
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                className={cn(
                  "h-12 shrink-0 rounded-full px-4 text-sm font-semibold transition",
                  category === item.id
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-card text-foreground ring-1 ring-border hover:bg-muted",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <ProductGrid products={pos.products} category={category} onSelect={selectProduct} />
        </main>

        <CartPanel
          className="hidden w-[22rem] shrink-0 border-l lg:flex xl:w-[26rem]"
          lines={pos.lines}
          total={pos.total}
          onQty={pos.updateQty}
          onRemove={pos.removeItem}
          onEmit={() => {
            pos.emitTicket()
            setMobileCart(false)
          }}
          onNewSale={requestNewSale}
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-card p-3 shadow-[0_-8px_24px_rgba(60,20,16,0.12)] lg:hidden">
        <Button type="button" size="lg" className="h-14 w-full justify-between px-4 text-base" onClick={() => setMobileCart(true)}>
          <span className="inline-flex items-center gap-2">
            <ShoppingBag />
            Ver pedido
          </span>
          <span className="font-display text-xl">{formatARS(pos.total)}</span>
        </Button>
      </div>

      {mobileCart ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Cerrar pedido"
            onClick={() => setMobileCart(false)}
          />
          <div className="absolute inset-x-0 bottom-0 h-[85dvh] overflow-hidden rounded-t-3xl border-t shadow-2xl">
            <CartPanel
              className="h-full"
              lines={pos.lines}
              total={pos.total}
              onQty={pos.updateQty}
              onRemove={pos.removeItem}
              onEmit={() => {
                pos.emitTicket()
                setMobileCart(false)
              }}
              onNewSale={requestNewSale}
            />
          </div>
        </div>
      ) : null}

      <QtyDialog
        product={selected}
        open={qtyOpen}
        onOpenChange={setQtyOpen}
        onAdd={pos.addItem}
      />

      <AlertDialog open={confirmNew} onOpenChange={setConfirmNew}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Nueva venta?</AlertDialogTitle>
            <AlertDialogDescription>
              Se limpia el pedido actual. Si ya emitiste el ticket, el próximo número avanza.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Seguir con este</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                pos.newSale()
                setMobileCart(false)
              }}
            >
              Nueva venta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
