'use client'

import { useRouter } from 'next/navigation'
import { SearchForm } from '@/components/SearchForm'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Home() {
  const router = useRouter()

  const handleSearch = (searchData: {
    city: string
    checkIn: string
    checkOut: string
    guests: number
  }) => {
    const params = new URLSearchParams({
      city: searchData.city,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      guests: searchData.guests.toString()
    })
    
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sewa Penginapan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Temukan penginapan terbaik dengan harga terbaik
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto mb-16">
          <SearchForm onSubmit={handleSearch} />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pencarian Mudah</h3>
            <p className="text-gray-600 text-sm">
              Cari penginapan berdasarkan lokasi dan tanggal
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Harga Terbaik</h3>
            <p className="text-gray-600 text-sm">
              Dapatkan harga terbaik tanpa biaya tersembunyi
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pembayaran Aman</h3>
            <p className="text-gray-600 text-sm">
              Transaksi aman dengan konfirmasi terpercaya
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}