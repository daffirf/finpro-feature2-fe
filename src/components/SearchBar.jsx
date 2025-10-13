'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SearchBar() {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  })
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({
      city: searchData.destination,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      guests: searchData.guests.toString()
    })
    router.push(`/search?${params.toString()}`)
  }

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="max-w-4xl mx-auto -mt-8 relative z-10">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Destination */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Destinasi
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Jakarta, Bali, Yogyakarta..."
                  value={searchData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Check-in */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Check-in
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => handleInputChange('checkIn', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Check-out
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) => handleInputChange('checkOut', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Tamu
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setSearchData(prev => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                  className="px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-4 py-3 border-x border-gray-300 font-medium text-gray-900 min-w-[60px] text-center">
                  {searchData.guests}
                </span>
                <button
                  type="button"
                  onClick={() => setSearchData(prev => ({ ...prev, guests: prev.guests + 1 }))}
                  className="px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Cari Penginapan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
