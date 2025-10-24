'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PropertyCard } from '@/components/PropertyCard'
import { SearchFilters } from '@/components/SearchFilters'
import { PropertySearchResult, PropertySearchResponse, PropertyCategory, SortOption } from '@/types/property'
import { searchProperties, logApiMode } from '@/lib/mockApi'
import { Search, MapPin, Home, Bed } from 'lucide-react'

interface Filters {
  category?: PropertyCategory | ''
  sortBy: string
  minPrice: string
  maxPrice: string
  amenities: string[]
  roomCapacity?: string
  roomMinPrice?: string
  roomMaxPrice?: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [properties, setProperties] = useState<PropertySearchResult[]>([])
  const [allProperties, setAllProperties] = useState<PropertySearchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
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
    amenities: [],
    roomCapacity: '',
    roomMinPrice: '',
    roomMaxPrice: ''
  })

  const searchData = {
    city: searchParams.get('city') || '',
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    guests: parseInt(searchParams.get('guests') || '1')
  }

  // Popular cities for autocomplete
  const popularCities = [
    'Jakarta', 'Bali', 'Yogyakarta', 'Bandung', 'Surabaya',
    'Medan', 'Semarang', 'Makassar', 'Lombok', 'Malang'
  ]

  useEffect(() => {
    logApiMode() // Log API mode on mount
    setSearchQuery(searchData.city)
    fetchProperties()
  }, [searchParams, filters])

  const fetchProperties = async () => {
    setIsLoading(true)
    setError('')
    try {
      const params = {
        page: 1,
        limit: 100, // Fetch more for better autocomplete
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
      
      // Store all properties for autocomplete
      setAllProperties(response.data)
      
      // Filter by search query (property name, city, or room)
      let filteredProperties = response.data
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filteredProperties = filteredProperties.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.city.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query) ||
          p.rooms.some(r => r.name.toLowerCase().includes(query))
        )
      }

      // Filter by room capacity
      if (filters.roomCapacity) {
        const capacity = parseInt(filters.roomCapacity)
        filteredProperties = filteredProperties.filter(p =>
          p.rooms.some(r => r.capacity >= capacity)
        )
      }

      // Filter by room price
      if (filters.roomMinPrice || filters.roomMaxPrice) {
        filteredProperties = filteredProperties.filter(p =>
          p.rooms.some(r => {
            const price = r.basePrice
            const minOk = !filters.roomMinPrice || price >= parseInt(filters.roomMinPrice)
            const maxOk = !filters.roomMaxPrice || price <= parseInt(filters.roomMaxPrice)
            return minOk && maxOk
          })
        )
      }

      setProperties(filteredProperties)
      setMeta({
        ...response.meta,
        total: filteredProperties.length,
        totalPages: Math.ceil(filteredProperties.length / (response.meta.limit || 10))
      })
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

  const handleQuickSearch = (query: string, isPropertyName: boolean = false) => {
    setSearchQuery(query)
    setShowSuggestions(false)
    
    if (isPropertyName) {
      // If searching by property name, just update the search query state
      // The filter will happen automatically via useEffect
      fetchProperties()
    } else {
      // If searching by city, update URL
      const params = new URLSearchParams(window.location.search)
      params.set('city', query)
      router.push(`/search?${params.toString()}`)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Check if it's a property name or city
      const matchedProperty = allProperties.find(p => 
        p.name.toLowerCase() === searchQuery.toLowerCase()
      )
      if (matchedProperty) {
        handleQuickSearch(searchQuery, true)
      } else {
        handleQuickSearch(searchQuery, false)
      }
    }
  }

  // Get filtered suggestions for cities
  const filteredCitySuggestions = popularCities.filter(city =>
    searchQuery && 
    city.toLowerCase().includes(searchQuery.toLowerCase()) &&
    city.toLowerCase() !== searchQuery.toLowerCase()
  ).slice(0, 5)

  // Get filtered suggestions for property names
  const filteredPropertySuggestions = allProperties.filter(property =>
    searchQuery &&
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    property.name.toLowerCase() !== searchQuery.toLowerCase()
  ).slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Advanced Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Search className="w-6 h-6 text-teal-600" />
              {searchQuery 
                ? `Hasil Pencarian: "${searchQuery}"` 
                : searchData.city 
                  ? `Hasil Pencarian di ${searchData.city}` 
                  : 'Cari Hotel/Properti & Room'}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Cari berdasarkan <span className="font-semibold">nama hotel/properti</span>, <span className="font-semibold">lokasi/kota</span>, atau <span className="font-semibold">tipe room</span>
            </p>
          </div>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Cari nama hotel/properti atau kota tujuan... (contoh: Luxury Beach Villa, Bali)"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                />
                
                {/* Autocomplete Suggestions */}
                {showSuggestions && searchQuery && (filteredPropertySuggestions.length > 0 || filteredCitySuggestions.length > 0) && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                    <div className="p-2">
                      {/* Property Name Suggestions */}
                      {filteredPropertySuggestions.length > 0 && (
                        <div className="mb-2">
                          <p className="text-xs font-semibold text-teal-600 px-3 py-2 flex items-center gap-1">
                            <Home className="w-3 h-3" />
                            NAMA HOTEL/PROPERTI
                          </p>
                          {filteredPropertySuggestions.map((property) => (
                            <button
                              key={property.id}
                              type="button"
                              onClick={() => handleQuickSearch(property.name, true)}
                              className="w-full text-left px-3 py-2 hover:bg-teal-50 rounded-lg transition-colors"
                            >
                              <div className="flex items-start gap-2">
                                <Home className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-gray-900 truncate">
                                    {property.name}
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      {property.city}
                                    </span>
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-teal-600 font-medium">
                                      Mulai Rp {property.minPrice.toLocaleString('id-ID')}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* City Suggestions */}
                      {filteredCitySuggestions.length > 0 && (
                        <div>
                          {filteredPropertySuggestions.length > 0 && (
                            <div className="border-t border-gray-100 my-2"></div>
                          )}
                          <p className="text-xs font-semibold text-gray-500 px-3 py-2 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            LOKASI POPULER
                          </p>
                          {filteredCitySuggestions.map((city) => (
                            <button
                              key={city}
                              type="button"
                              onClick={() => handleQuickSearch(city, false)}
                              className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg flex items-center gap-2 text-gray-700 transition-colors"
                            >
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">{city}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Cari
              </button>
            </div>
          </form>

          {/* Quick Stats */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {searchData.checkIn && (
              <div className="flex items-center gap-1 text-gray-600">
                <span className="font-semibold">Check-in:</span>
                {new Date(searchData.checkIn).toLocaleDateString('id-ID')}
              </div>
            )}
            {searchData.checkOut && (
              <div className="flex items-center gap-1 text-gray-600">
                <span className="font-semibold">Check-out:</span>
                {new Date(searchData.checkOut).toLocaleDateString('id-ID')}
              </div>
            )}
            {searchData.checkIn && searchData.checkOut && (
              <div className="flex items-center gap-1 text-gray-600">
                <span className="font-semibold">Durasi:</span>
                {Math.ceil(
                  (new Date(searchData.checkOut).getTime() - new Date(searchData.checkIn).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{' '}
                malam
              </div>
            )}
            {searchData.guests && (
              <div className="flex items-center gap-1 text-gray-600">
                <span className="font-semibold">Tamu:</span> {searchData.guests} orang
              </div>
            )}
          </div>

          {/* Quick Search Buttons */}
          {!searchQuery && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                💡 TIP: Ketik nama hotel (contoh: "Luxury Beach Villa") atau pilih destinasi:
              </p>
              <div className="flex flex-wrap gap-2">
                {popularCities.slice(0, 6).map((city) => (
                  <button
                    key={city}
                    onClick={() => handleQuickSearch(city, false)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-teal-100 hover:text-teal-700 text-gray-700 rounded-full text-sm font-medium transition-all hover:scale-105"
                  >
                    <MapPin className="w-3 h-3 inline mr-1" />
                    {city}
                  </button>
                ))}
              </div>
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
                {/* Search Results Header */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-gray-900 font-semibold">
                        Ditemukan <span className="text-teal-600">{properties.length}</span> properti
                      </p>
                      {searchQuery && (
                        <div className="flex items-center gap-2 mt-1">
                          {allProperties.find(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())) ? (
                            <div className="inline-flex items-center gap-1 text-sm">
                              <Home className="w-3 h-3 text-teal-600" />
                              <span className="text-gray-600">
                                Pencarian hotel: <span className="font-semibold text-teal-700">"{searchQuery}"</span>
                              </span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1 text-sm">
                              <MapPin className="w-3 h-3 text-blue-600" />
                              <span className="text-gray-600">
                                Pencarian lokasi: <span className="font-semibold text-blue-700">"{searchQuery}"</span>
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Active Filters Tags */}
                    {(filters.category || filters.roomCapacity || filters.roomMinPrice || filters.roomMaxPrice) && (
                      <div className="flex flex-wrap gap-2">
                        {filters.category && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                            <Home className="w-3 h-3" />
                            {filters.category}
                          </span>
                        )}
                        {filters.roomCapacity && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                            <Bed className="w-3 h-3" />
                            {filters.roomCapacity}+ orang
                          </span>
                        )}
                        {(filters.roomMinPrice || filters.roomMaxPrice) && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            💰 Room: Rp {filters.roomMinPrice || '0'} - {filters.roomMaxPrice || '∞'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid gap-6">
                  {properties.map((property) => {
                    // Check if property or rooms match search query
                    const matchedRooms = property.rooms.filter(room =>
                      room.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    const hasMatchedRooms = matchedRooms.length > 0
                    
                    return (
                      <div key={property.id} className="relative">
                        {hasMatchedRooms && (
                          <div className="absolute -top-2 -right-2 z-10">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold shadow-lg">
                              ⭐ Cocok dengan pencarian
                            </span>
                          </div>
                        )}
                        <PropertyCard
                          property={property}
                          searchData={searchData}
                        />
                        {hasMatchedRooms && (
                          <div className="mt-2 ml-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                            <p className="text-sm font-semibold text-yellow-900 mb-1">
                              Room yang cocok:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {matchedRooms.map((room) => (
                                <span key={room.id} className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-yellow-300 text-yellow-800 rounded text-xs">
                                  <Bed className="w-3 h-3" />
                                  {room.name} - {room.capacity} orang - Rp {room.basePrice.toLocaleString('id-ID')}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
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
