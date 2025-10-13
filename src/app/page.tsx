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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-6">
        {/* Hero Section */}
        <div className="text-center pt-12 pb-8 md:pt-20 md:pb-12">
          <div className="inline-block mb-4 px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
            Platform Sewa Penginapan Terpercaya
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Temukan Penginapan{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Impian Anda
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Bandingkan harga, temukan penawaran terbaik, dan pesan penginapan favorit Anda dengan mudah
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-5xl mx-auto mb-16 md:mb-24">
          <SearchForm onSubmit={handleSearch} />
        </div>

        {/* Features Section */}
        <div className="pb-16 md:pb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Mengapa Memilih PropertyRent?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Platform yang dirancang untuk memberikan pengalaman terbaik dalam mencari dan memesan penginapan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pencarian Mudah</h3>
              <p className="text-gray-600 leading-relaxed">
                Temukan penginapan berdasarkan lokasi, tanggal, dan jumlah tamu dengan filter yang lengkap
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Harga Transparan</h3>
              <p className="text-gray-600 leading-relaxed">
                Bandingkan harga dari berbagai tanggal dan dapatkan penawaran terbaik tanpa biaya tersembunyi
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pembayaran Aman</h3>
              <p className="text-gray-600 leading-relaxed">
                Transaksi terjamin aman dengan sistem konfirmasi pembayaran yang terpercaya
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
