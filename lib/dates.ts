export const TIMEZONE = "America/Argentina/Buenos_Aires"

export type PeriodMode = "hoy" | "dia" | "semana" | "mes" | "anio"

export function dateKeyInBA(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date)
}

export function addDays(dateKey: string, days: number): string {
  const [year, month, day] = dateKey.split("-").map(Number)
  const utc = new Date(Date.UTC(year, month - 1, day + days))
  return utc.toISOString().slice(0, 10)
}

/** Monday = 0 … Sunday = 6, for a YYYY-MM-DD calendar date. */
export function weekdayMon0(dateKey: string): number {
  const [year, month, day] = dateKey.split("-").map(Number)
  const utc = new Date(Date.UTC(year, month - 1, day, 12))
  return (utc.getUTCDay() + 6) % 7
}

export function monthLastDay(dateKey: string): string {
  const [year, month] = dateKey.split("-").map(Number)
  const utc = new Date(Date.UTC(year, month, 0))
  return utc.toISOString().slice(0, 10)
}

export function periodRange(
  mode: PeriodMode,
  selectedDateKey: string,
): { start: string; end: string } {
  if (mode === "hoy" || mode === "dia") {
    return { start: selectedDateKey, end: selectedDateKey }
  }
  if (mode === "semana") {
    const start = addDays(selectedDateKey, -weekdayMon0(selectedDateKey))
    return { start, end: addDays(start, 6) }
  }
  if (mode === "mes") {
    const start = `${selectedDateKey.slice(0, 7)}-01`
    return { start, end: monthLastDay(selectedDateKey) }
  }
  const year = selectedDateKey.slice(0, 4)
  return { start: `${year}-01-01`, end: `${year}-12-31` }
}

export function inRange(dateKey: string, start: string, end: string): boolean {
  return dateKey >= start && dateKey <= end
}

export function formatDayLong(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number)
  const utc = new Date(Date.UTC(year, month - 1, day, 12))
  return new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(utc)
}

export function formatDayShort(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number)
  const utc = new Date(Date.UTC(year, month - 1, day, 12))
  return new Intl.DateTimeFormat("es-AR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    timeZone: "UTC",
  }).format(utc)
}

export function formatMonthYear(dateKey: string): string {
  const [year, month] = dateKey.split("-").map(Number)
  const utc = new Date(Date.UTC(year, month - 1, 1, 12))
  return new Intl.DateTimeFormat("es-AR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(utc)
}

export function formatPeriodLabel(mode: PeriodMode, start: string, end: string): string {
  if (mode === "hoy") return `Hoy · ${formatDayLong(start)}`
  if (mode === "dia") return formatDayLong(start)
  if (mode === "semana") return `${formatDayShort(start)} – ${formatDayShort(end)}`
  if (mode === "mes") return formatMonthYear(start)
  return start.slice(0, 4)
}

export function formatTimeBA(iso: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso))
}

export function listDays(start: string, end: string): string[] {
  const days: string[] = []
  let cursor = start
  while (cursor <= end) {
    days.push(cursor)
    cursor = addDays(cursor, 1)
  }
  return days
}
