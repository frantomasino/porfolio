export function roundARS(amount: number): number {
  return Math.round(amount)
}

export function formatARS(amount: number): string {
  const value = roundARS(amount)
  const formatted = new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
  return `$ ${formatted}`
}

export function formatKg(kg: number): string {
  if (Math.abs(kg - 0.5) < 1e-9) return "1/2 kg"
  return `${kg.toLocaleString("es-AR", { maximumFractionDigits: 3 })} kg`
}

export function formatTicketNumber(n: number): string {
  return String(n).padStart(4, "0")
}

export function parseDecimal(raw: string): number | null {
  const normalized = raw.trim().replace(/\s/g, "").replace(",", ".")
  if (!normalized) return null
  const value = Number(normalized)
  if (!Number.isFinite(value) || value <= 0) return null
  return Math.round(value * 1000) / 1000
}

export function parsePesos(raw: string): number | null {
  const normalized = raw.trim().replace(/\s/g, "").replace(/\./g, "").replace(",", ".")
  if (!normalized) return null
  const value = Number(normalized)
  if (!Number.isFinite(value) || value < 0) return null
  return roundARS(value)
}

export function formatDateTimeAR(date: Date): { date: string; time: string } {
  return {
    date: new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "America/Argentina/Buenos_Aires",
    }).format(date),
    time: new Intl.DateTimeFormat("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Argentina/Buenos_Aires",
    }).format(date),
  }
}
