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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-400/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <main className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg animate-pulse-slow">
              ✨ Platform Sewa Penginapan Terpercaya
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-glow">
                Temukan Penginapan
              </span>
              <br />
              <span className="text-gray-800">Impian Anda</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Jelajahi destinasi terbaik dengan harga terbaik. 
              <span className="font-semibold text-purple-600">Booking sekarang</span> dan nikmati pengalaman tak terlupakan!
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-5xl mx-auto mb-20 animate-slide-up">
            <SearchForm onSubmit={handleSearch} />
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-strong transition-all duration-500 hover:scale-105 animate-slide-in-left">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:animate-bounce-gentle shadow-glow">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pencarian Cerdas</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-powered search yang membantu Anda menemukan penginapan perfect berdasarkan preferensi dan budget
              </p>
            </div>

            <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-strong transition-all duration-500 hover:scale-105 animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:animate-bounce-gentle shadow-glow" style={{animationDelay: '0.2s'}}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Harga Dinamis</h3>
              <p className="text-gray-600 leading-relaxed">
                Harga real-time yang selalu update. Dapatkan penawaran terbaik dengan sistem pricing yang transparan
              </p>
            </div>

            <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-strong transition-all duration-500 hover:scale-105 animate-slide-in-right">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:animate-bounce-gentle shadow-glow-purple" style={{animationDelay: '0.4s'}}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Booking Aman</h3>
              <p className="text-gray-600 leading-relaxed">
                Transaksi 100% aman dengan enkripsi end-to-end dan garansi uang kembali jika tidak sesuai
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-slide-up">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Penginapan</div>
            </div>
            <div className="text-center animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600">Pengguna</div>
            </div>
            <div className="text-center animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-gray-600">Kota</div>
            </div>
            <div className="text-center animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">4.9★</div>
              <div className="text-gray-600">Rating</div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  )
}