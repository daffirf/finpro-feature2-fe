'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PropertyCard } from '@/components/PropertyCard'
import { SearchFilters } from '@/components/SearchFilters'
import { PropertySearchResult, PropertySearchResponse, PropertyCategory, SortOption } from '@/types/property'
import { searchProperties, logApiMode } from '@/lib/mockApi'

interface Filters {
  category?: PropertyCategory | ''
  sortBy: string
  minPrice: string
  maxPrice: string
  amenities: string[]
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState<PropertySearchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })
  const [filters, setFilters] = useState<Filters>({
    category: (searchParams.get('category') as PropertyCategory) || '',
    sortBy: 'newest',
    minPrice: '',
    maxPrice: '',
    amenities: []
  })

  const searchData = {
    city: searchParams.get('city') || '',
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    guests: parseInt(searchParams.get('guests') || '1')
  }

  useEffect(() => {
    logApiMode() // Log API mode on mount
    fetchProperties()
  }, [searchParams, filters])

  const fetchProperties = async () => {
    setIsLoading(true)
    setError('')
    try {
      const params = {
        page: 1,
        limit: 10,
        city: searchData.city || undefined,
        checkIn: searchData.checkIn || undefined,
        checkOut: searchData.checkOut || undefined,
        guests: searchData.guests || undefined,
        category: filters.category || undefined,
        sortBy: (filters.sortBy as SortOption) || undefined,
        minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
      }

      const response = await searchProperties(params)

      setProperties(response.data)
      setMeta(response.meta)
    } catch (err: any) {
      console.error('Error fetching properties:', err)
      setError(err.message || 'Gagal memuat properti')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {searchData.city ? `Hasil Pencarian di ${searchData.city}` : 'Hasil Pencarian'}
          </h1>
          {(searchData.checkIn || searchData.checkOut || searchData.guests) && (
            <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
              {searchData.checkIn && (
                <div>
                  <span className="font-semibold">Check-in:</span>{' '}
                  {new Date(searchData.checkIn).toLocaleDateString('id-ID')}
                </div>
              )}
              {searchData.checkOut && (
                <div>
                  <span className="font-semibold">Check-out:</span>{' '}
                  {new Date(searchData.checkOut).toLocaleDateString('id-ID')}
                </div>
              )}
              {searchData.checkIn && searchData.checkOut && (
                <div>
                  <span className="font-semibold">Durasi:</span>{' '}
                  {Math.ceil(
                    (new Date(searchData.checkOut).getTime() - new Date(searchData.checkIn).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{' '}
                  malam
                </div>
              )}
              {searchData.guests && (
                <div>
                  <span className="font-semibold">Tamu:</span> {searchData.guests} orang
                </div>
              )}
            </div>
          )}
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
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Mencari properti...</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada properti ditemukan</h3>
                <p className="text-gray-600 mb-4">Coba ubah kriteria pencarian Anda</p>
                <button
                  onClick={() => {
                    setFilters({
                      category: '',
                      sortBy: 'newest',
                      minPrice: '',
                      maxPrice: '',
                      amenities: []
                    })
                  }}
                  className="text-teal-600 hover:text-teal-700 font-semibold"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    Menampilkan <span className="font-semibold">{properties.length}</span> dari{' '}
                    <span className="font-semibold">{meta.total}</span> properti
                  </p>
                  {meta.totalPages > 1 && (
                    <p className="text-sm text-gray-500">
                      Halaman {meta.page} dari {meta.totalPages}
                    </p>
                  )}
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

                {/* Pagination */}
                {meta.totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-8">
                    <button
                      disabled={!meta.hasPrev}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Sebelumnya
                    </button>
                    <div className="flex space-x-1">
                      {[...Array(meta.totalPages)].map((_, i) => (
                        <button
                          key={i}
                          className={`px-4 py-2 rounded-lg ${
                            meta.page === i + 1
                              ? 'bg-teal-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      disabled={!meta.hasNext}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Selanjutnya
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
