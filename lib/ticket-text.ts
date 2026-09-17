import { cartTotal, qtyLabel, unitPriceLabel, type CartLine } from "@/lib/cart"
import { formatARS, formatDateTimeAR, formatTicketNumber } from "@/lib/money"
import { SHOP } from "@/lib/shop"

export function buildTicketText(ticketNumber: number, issuedAt: Date, lines: CartLine[]): string {
  const { date, time } = formatDateTimeAR(issuedAt)
  const total = cartTotal(lines)
  const itemLines = lines.map((line) => {
    const left = `${line.name}  ${qtyLabel(line)}`
    const right = formatARS(line.qty * line.unitPrice)
    return `${left}\n  ${unitPriceLabel(line)}   ${right}`
  })

  return [
    `${SHOP.name} — ${SHOP.tagline}`,
    `Ticket Nº ${formatTicketNumber(ticketNumber)}`,
    `${date}  ${time}`,
    "------------------------------",
    ...itemLines,
    "------------------------------",
    `TOTAL  ${formatARS(total)}`,
    "",
    `WhatsApp pedidos: ${SHOP.whatsappDisplay}`,
    `Envíos sin cargo: ${SHOP.deliveryZones}`,
    SHOP.disclaimer,
  ].join("\n")
}
