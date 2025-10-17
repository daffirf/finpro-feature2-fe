'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'Ada masalah dengan konfigurasi server.'
      case 'AccessDenied':
        return 'Akses ditolak. Silakan coba lagi.'
      case 'Verification':
        return 'Token tidak valid atau sudah kedaluwarsa.'
      case 'Default':
        return 'Terjadi kesalahan saat autentikasi.'
      default:
        return 'Terjadi kesalahan yang tidak diketahui.'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Autentikasi Gagal</h1>
            <p className="text-gray-600 mb-6">
              {getErrorMessage(error)}
            </p>
            <div className="space-y-3">
              <Link
                href="/auth/login"
                className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Coba Lagi
              </Link>
              <Link
                href="/"
                className="block w-full text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
