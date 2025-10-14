import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, locale: string = "id-ID", currency: string = "IDR"): string {
  if (!Number.isFinite(amount)) return "Rp 0";
  return new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: 0 }).format(amount)
}

export function formatDateTime(date: string | number | Date, locale: string = "id-ID"): string {
  const d = new Date(date)
  if (isNaN(d.getTime())) return "-"
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "2-digit", day: "2-digit" }).format(d)
}

export function formatDate(date: string | number | Date, locale: string = "id-ID"): string {
  const d = new Date(date)
  if (isNaN(d.getTime())) return "-"
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "2-digit", day: "2-digit" }).format(d)
}

export function calculateDaysBetween(start: string | Date, end: string | Date): number {
  const s = new Date(start)
  const e = new Date(end)
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return 0
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.max(0, Math.ceil((e.getTime() - s.getTime()) / msPerDay))
}
