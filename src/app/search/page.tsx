'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PropertyCard } from '@/components/PropertyCard'
import { SearchFilters } from '@/components/SearchFilters'

interface Property {
  id: string
  name: string
  description: string
  address: string
  city: string
  basePrice: number
  images: string[]
  amenities: string[]
  rooms: {
    id: string
    name: string
    capacity: number
    basePrice: number
  }[]
  reviews: {
    rating: number
  }[]
  _count: {
    reviews: number
  }
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    sortBy: 'price_asc',
    minPrice: '',
    maxPrice: '',
    amenities: [] as string[]
  })

  const searchData = {
    city: searchParams.get('city') || '',
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    guests: parseInt(searchParams.get('guests') || '1')
  }

  useEffect(() => {
    fetchProperties()
  }, [searchParams, filters])

  const fetchProperties = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        city: searchData.city,
        checkIn: searchData.checkIn,
        checkOut: searchData.checkOut,
        guests: searchData.guests.toString(),
        sortBy: filters.sortBy,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        amenities: filters.amenities.join(',')
      })

      const response = await fetch(`/api/properties/search?${params}`)
      const data = await response.json()

      if (response.ok) {
        setProperties(data.properties)
      } else {
        setError(data.error || 'Gagal memuat properti')
      }
    } catch {
      setError('Terjadi kesalahan server')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (newFilters: Partial<{ sortBy: string; minPrice: string; maxPrice: string; amenities: string[] }>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Hasil Pencarian untuk {searchData.city}
          </h1>
          <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold">Check-in:</span> {new Date(searchData.checkIn).toLocaleDateString('id-ID')}
            </div>
            <div>
              <span className="font-semibold">Check-out:</span> {new Date(searchData.checkOut).toLocaleDateString('id-ID')}
            </div>
            <div>
              <span className="font-semibold">Durasi:</span> {Math.ceil((new Date(searchData.checkOut).getTime() - new Date(searchData.checkIn).getTime()) / (1000 * 60 * 60 * 24))} malam
            </div>
            <div>
              <span className="font-semibold">Tamu:</span> {searchData.guests} orang
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada properti ditemukan</h3>
                <p className="text-gray-600">Coba ubah kriteria pencarian Anda</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    Menampilkan {properties.length} properti
                  </p>
                </div>
                
                <div className="grid gap-6">
                  {properties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      searchData={searchData}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
