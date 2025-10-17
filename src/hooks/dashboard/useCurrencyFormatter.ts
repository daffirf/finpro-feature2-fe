import { useCallback } from 'react'

interface UseCurrencyFormatterOptions {
  locale?: string
  currency?: string
  minimumFractionDigits?: number
}

export function useCurrencyFormatter({
  locale = 'id-ID',
  currency = 'IDR',
  minimumFractionDigits = 0
}: UseCurrencyFormatterOptions = {}) {
  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits
    }).format(amount)
  }, [locale, currency, minimumFractionDigits])

  return { formatCurrency }
}

