'use client'

import { useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ErrorMessage } from '@/components/ErrorMessage'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <ErrorMessage
            message="Terjadi kesalahan yang tidak terduga. Silakan coba lagi atau hubungi support jika masalah berlanjut."
            onRetry={reset}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}

