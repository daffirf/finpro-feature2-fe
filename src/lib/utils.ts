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

// Category types and utilities
export type PropertyCategory = 'villa' | 'house' | 'apartment' | 'guest_house'

export const categoryConfig = {
  villa: {
    label: 'Villa',
    icon: 'Waves', // Lucide icon name
    color: 'bg-teal-100 text-teal-800',
    description: 'Luxury beachfront and hillside villas'
  },
  house: {
    label: 'House',
    icon: 'Home', // Lucide icon name
    color: 'bg-blue-100 text-blue-800',
    description: 'Comfortable houses for families'
  },
  apartment: {
    label: 'Apartment',
    icon: 'Building2', // Lucide icon name
    color: 'bg-purple-100 text-purple-800',
    description: 'Modern city apartments'
  },
  guest_house: {
    label: 'Guest House',
    icon: 'Hotel', // Lucide icon name
    color: 'bg-green-100 text-green-800',
    description: 'Cozy guest houses'
  }
}

export function getCategoryLabel(category: PropertyCategory): string {
  return categoryConfig[category]?.label || category
}

export function getCategoryIcon(category: PropertyCategory): string {
  return categoryConfig[category]?.icon || 'Home'
}

export function getCategoryColor(category: PropertyCategory): string {
  return categoryConfig[category]?.color || 'bg-gray-100 text-gray-800'
}