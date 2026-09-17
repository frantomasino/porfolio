"use client"

import { Check, Copy, Printer, Share2 } from "lucide-react"
import { useState } from "react"
import { Logo } from "@/components/pos/logo"
import { Button } from "@/components/ui/button"
import { cartTotal, qtyLabel, type CartLine } from "@/lib/cart"
import { formatARS, formatDateTimeAR, formatTicketNumber } from "@/lib/money"
import { SHOP } from "@/lib/shop"
import { buildTicketText } from "@/lib/ticket-text"

export function TicketScreen({
  ticketNumber,
  issuedAt,
  lines,
  onBack,
  onNewSale,
}: {
  ticketNumber: number
  issuedAt: Date
  lines: CartLine[]
  onBack: () => void
  onNewSale: () => void
}) {
  const [copied, setCopied] = useState(false)
  const { date, time } = formatDateTimeAR(issuedAt)
  const total = cartTotal(lines)
  const text = buildTicketText(ticketNumber, issuedAt, lines)

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt("Copiá el ticket:", text)
    }
  }

  async function shareText() {
    if (navigator.share) {
      try {
        await navigator.share({ title: `Ticket P&P Nº ${formatTicketNumber(ticketNumber)}`, text })
        return
      } catch {
        /* user cancelled or share failed — fall through to copy */
      }
    }
    await copyText()
  }

  return (
    <div className="ticket-screen flex min-h-dvh flex-col bg-[#2a0f10] text-[#f6ede0]">
      <div className="no-print flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
        <Button type="button" variant="ghost" className="text-[#f6ede0]" onClick={onBack}>
          Volver a la caja
        </Button>
        <p className="text-sm font-medium">Ticket listo</p>
        <Button type="button" variant="ghost" className="text-[#f6ede0]" onClick={onNewSale}>
          Nueva venta
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div
          id="ticket-receipt"
          className="ticket-receipt mx-auto w-[80mm] max-w-full bg-[#fffaf2] px-3 py-4 text-[#1a1210] shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
        >
          <header className="text-center">
            <div className="mx-auto flex justify-center text-[#7a1515]">
              <Logo variant="mark" className="justify-center" />
            </div>
            <p className="mt-1 font-display text-2xl font-bold tracking-wide">{SHOP.name}</p>
            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase">{SHOP.tagline}</p>
          </header>

          <div className="ticket-rule my-3" />

          <p className="text-center font-mono text-[13px] font-bold">
            TICKET Nº {formatTicketNumber(ticketNumber)}
          </p>
          <p className="text-center font-mono text-[12px]">
            {date} · {time}
          </p>

          <div className="ticket-rule my-3" />

          <table className="w-full border-collapse font-mono text-[12px]">
            <tbody>
              {lines.map((line) => (
                <tr key={line.id} className="align-top">
                  <td className="py-1.5 pr-2">
                    <div className="font-semibold leading-tight">{line.name}</div>
                    <div className="text-[11px] opacity-80">{qtyLabel(line)}</div>
                  </td>
                  <td className="py-1.5 text-right whitespace-nowrap">{formatARS(line.qty * line.unitPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="ticket-rule my-3" />

          <div className="flex items-baseline justify-between font-mono">
            <span className="text-sm font-bold">TOTAL</span>
            <span className="text-xl font-bold">{formatARS(total)}</span>
          </div>

          <div className="ticket-rule my-3" />

          <footer className="space-y-1 text-center font-mono text-[11px] leading-snug">
            <p>WhatsApp pedidos</p>
            <p className="text-sm font-bold">{SHOP.whatsappDisplay}</p>
            <p className="pt-1">Envíos sin cargo</p>
            <p>{SHOP.deliveryZones}</p>
            <p className="pt-2 text-[10px] italic">{SHOP.disclaimer}</p>
            <p className="pt-3 text-[10px] tracking-[0.3em]">••• GRACIAS •••</p>
          </footer>
        </div>
      </div>

      <div className="no-print grid grid-cols-3 gap-2 border-t border-white/10 p-4">
        <Button type="button" size="lg" className="h-14" onClick={() => window.print()}>
          <Printer />
          Imprimir
        </Button>
        <Button type="button" size="lg" variant="secondary" className="h-14" onClick={shareText}>
          <Share2 />
          Compartir
        </Button>
        <Button type="button" size="lg" variant="secondary" className="h-14" onClick={copyText}>
          {copied ? <Check /> : <Copy />}
          {copied ? "Copiado" : "Copiar"}
        </Button>
      </div>
    </div>
  )
}
