'use client'

import { useState } from 'react'
import { PropertyCategory, categoryConfig } from '@/lib/utils'

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

interface SearchFiltersProps {
  filters: Filters
  onFilterChange: (filters: Partial<Filters>) => void
}

const amenitiesOptions = [
  'WiFi',
  'AC',
  'Parkir',
  'Kolam Renang',
  'Gym',
  'Restoran',
  'Spa',
  'Laundry',
  'Concierge',
  'Room Service'
]

const sortOptions = [
  { value: 'price_asc', label: 'Harga Terendah' },
  { value: 'price_desc', label: 'Harga Tertinggi' },
  { value: 'rating_desc', label: 'Rating Tertinggi' },
  { value: 'newest', label: 'Terbaru' },
  { value: 'name_asc', label: 'Nama A-Z' }
]

const categoryOptions = [
  { value: '', label: 'Semua Kategori' },
  { value: 'villa', label: '🏖️ Villa' },
  { value: 'house', label: '🏠 House' },
  { value: 'apartment', label: '🏢 Apartment' },
  { value: 'guest_house', label: '🏡 Guest House' }
]

export function SearchFilters({ filters, onFilterChange }: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity]
    
    onFilterChange({ amenities: newAmenities })
  }

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
    onFilterChange({ [field]: value })
  }

  const clearFilters = () => {
    onFilterChange({
      category: '',
      sortBy: 'price_asc',
      minPrice: '',
      maxPrice: '',
      amenities: [],
      roomCapacity: '',
      roomMinPrice: '',
      roomMaxPrice: ''
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filter</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <svg
            className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipe Properti
            </label>
            <select
              value={filters.category || ''}
              onChange={(e) => onFilterChange({ category: e.target.value as PropertyCategory | '' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Urutkan berdasarkan
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Rentang Harga Properti
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Min</label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Max</label>
                <input
                  type="number"
                  placeholder="∞"
                  value={filters.maxPrice}
                  onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>
          
          {/* Room Filters Section */}
          <div className="bg-teal-50 p-4 rounded-lg mb-4">
            <h4 className="text-sm font-semibold text-teal-900 mb-3 flex items-center gap-2">
              🛏️ Filter Room
            </h4>
            
            {/* Room Capacity */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kapasitas Minimum
              </label>
              <select
                value={filters.roomCapacity || ''}
                onChange={(e) => onFilterChange({ roomCapacity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              >
                <option value="">Semua Kapasitas</option>
                <option value="1">1+ orang</option>
                <option value="2">2+ orang</option>
                <option value="3">3+ orang</option>
                <option value="4">4+ orang</option>
                <option value="5">5+ orang</option>
              </select>
            </div>

            {/* Room Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga Room per Malam
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Min</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.roomMinPrice || ''}
                    onChange={(e) => onFilterChange({ roomMinPrice: e.target.value })}
                    className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Max</label>
                  <input
                    type="number"
                    placeholder="∞"
                    value={filters.roomMaxPrice || ''}
                    onChange={(e) => onFilterChange({ roomMaxPrice: e.target.value })}
                    className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Fasilitas
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {amenitiesOptions.map((amenity) => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="mr-3 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Hapus Semua Filter
          </button>
        </div>
      )}
    </div>
  )
}

