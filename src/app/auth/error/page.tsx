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
        return 'Ada masalah dengan konfigurasi server. Pastikan environment variables sudah diatur dengan benar.'
      case 'AccessDenied':
        return 'Akses ditolak. Silakan coba lagi.'
      case 'Verification':
        return 'Token tidak valid atau sudah kedaluwarsa.'
      case 'OAuthSignin':
        return 'Gagal memulai proses sign in dengan Google. Periksa konfigurasi OAuth.'
      case 'OAuthCallback':
        return 'Gagal menyelesaikan proses sign in dengan Google. Periksa callback URL.'
      case 'OAuthCreateAccount':
        return 'Gagal membuat akun baru dengan Google.'
      case 'EmailCreateAccount':
        return 'Gagal membuat akun dengan email.'
      case 'Callback':
        return 'Gagal berkomunikasi dengan backend. Pastikan backend server berjalan di http://localhost:8000'
      case 'Default':
        return 'Terjadi kesalahan saat autentikasi. Silakan coba lagi atau hubungi administrator.'
      default:
        return error ? `Error: ${error}` : 'Terjadi kesalahan yang tidak diketahui.'
    }
  }
  
  const getErrorDetails = () => {
    if (!error) return null
    
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left">
        <p className="text-xs font-semibold text-gray-500 mb-2">Detail Error:</p>
        <p className="text-sm text-gray-700 font-mono break-all">{error}</p>
        {error === 'Callback' && (
          <div className="mt-3 text-xs text-gray-600">
            <p className="font-semibold mb-1">Langkah troubleshooting:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Pastikan backend server berjalan di http://localhost:8000</li>
              <li>Periksa NEXT_PUBLIC_API_URL di file .env</li>
              <li>Periksa console browser untuk error lebih detail</li>
              <li>Pastikan CORS sudah dikonfigurasi dengan benar di backend</li>
            </ul>
          </div>
        )}
      </div>
    )
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
            <p className="text-gray-600 mb-4">
              {getErrorMessage(error)}
            </p>
            {getErrorDetails()}
            <div className="space-y-3 mt-6">
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
