'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchHero() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    const params = new URLSearchParams()
    if (formData.city) params.set('city', formData.city)
    if (formData.checkIn) params.set('checkIn', formData.checkIn)
    if (formData.checkOut) params.set('checkOut', formData.checkOut)
    if (formData.guests) params.set('guests', formData.guests.toString())
    
    router.push(`/search?${params.toString()}`)
  }

  return (
    <section className="relative bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-700 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Temukan Tempat Menginap Sempurna
          </h1>
          <p className="text-xl md:text-2xl text-teal-50 max-w-2xl mx-auto">
            Villa, rumah, apartemen, atau guest house - semua ada di sini
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📍 Destinasi
                </label>
                <input
                  type="text"
                  placeholder="Kota tujuan"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                />
              </div>

              {/* Check-in */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📅 Check-in
                </label>
                <input
                  type="date"
                  value={formData.checkIn}
                  onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                />
              </div>

              {/* Check-out */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📅 Check-out
                </label>
                <input
                  type="date"
                  value={formData.checkOut}
                  onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                  min={formData.checkIn || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                />
              </div>

              {/* Guests */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  👥 Tamu
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Cari Properti</span>
            </button>

            {/* Popular Cities */}
            <div className="mt-4 flex items-center gap-2 flex-wrap justify-center">
              <span className="text-sm font-medium text-gray-600">Populer:</span>
              {['Bali', 'Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya'].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setFormData({...formData, city})
                    const params = new URLSearchParams()
                    params.set('city', city)
                    router.push(`/search?${params.toString()}`)
                  }}
                  className="px-4 py-1.5 bg-gray-100 hover:bg-teal-50 text-gray-700 hover:text-teal-700 rounded-full text-sm font-medium transition-colors duration-200 border border-gray-200 hover:border-teal-300"
                >
                  {city}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { icon: '🏖️', label: 'Villa Premium', count: '100+' },
            { icon: '🏠', label: 'Rumah Nyaman', count: '200+' },
            { icon: '🏢', label: 'Apartemen Modern', count: '150+' },
            { icon: '🏡', label: 'Guest House', count: '80+' }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.count}</div>
              <div className="text-teal-100 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

