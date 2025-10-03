import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Halaman Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-8">
            Maaf, halaman yang Anda cari tidak ditemukan. 
            Mungkin halaman tersebut telah dipindahkan atau dihapus.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Kembali ke Beranda
            </Link>
            
            <div>
              <Link
                href="/search"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Cari Penginapan
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

