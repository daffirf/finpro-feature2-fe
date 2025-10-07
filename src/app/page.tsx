'use client'

import { useState } from 'react'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Temukan Penginapan
            <span className="text-blue-600 block">Terbaik untuk Anda</span>
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Bandingkan harga penginapan berdasarkan tanggal dan dapatkan penawaran terbaik 
            untuk liburan Anda
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto">
          <SearchForm onSubmit={handleSearch} />
        </div>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Pencarian Mudah</h3>
            <p className="text-gray-600">
              Cari penginapan berdasarkan destinasi, tanggal, dan jumlah tamu dengan mudah
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Perbandingan Harga</h3>
            <p className="text-gray-600">
              Lihat perbandingan harga pada tanggal yang berbeda untuk mendapatkan penawaran terbaik
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Harga Dinamis</h3>
            <p className="text-gray-600">
              Harga berubah otomatis berdasarkan hari libur dan tanggal tertentu
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
