import { useCallback } from 'react'

interface UseDateFormatterOptions {
  locale?: string
  options?: Intl.DateTimeFormatOptions
}

export function useDateFormatter({
  locale = 'id-ID',
  options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }
}: UseDateFormatterOptions = {}) {
  const formatDate = useCallback((dateString: string): string => {
    return new Date(dateString).toLocaleDateString(locale, options)
  }, [locale, options])

  return { formatDate }
}

