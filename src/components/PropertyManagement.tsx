'use client'

import { useState, useEffect } from 'react'
import { formatCurrency } from '@/lib/utils'

interface Property {
  id: string
  name: string
  address: string
  city: string
  basePrice: number
  isActive: boolean
  images: string[]
  _count: {
    rooms: number
    bookings: number
  }
}

export function PropertyManagement() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/tenant/properties')
      const data = await response.json()
      
      if (response.ok) {
        setProperties(data.properties)
      } else {
        setError(data.error || 'Gagal memuat properti')
      }
    } catch (error) {
      setError('Terjadi kesalahan server')
    } finally {
      setIsLoading(false)
    }
  }

  const togglePropertyStatus = async (propertyId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/tenant/properties/${propertyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !isActive })
      })

      if (response.ok) {
        fetchProperties() // Refresh data
      }
    } catch (error) {
      console.error('Error toggling property status:', error)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Kelola Properti</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Tambah Properti
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada properti</h3>
          <p className="text-gray-600 mb-4">Mulai dengan menambahkan properti pertama Anda</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Tambah Properti Pertama
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{property.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      property.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {property.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-2">{property.address}, {property.city}</p>
                  <p className="text-lg font-semibold text-gray-900 mb-4">
                    {formatCurrency(property.basePrice)}/malam
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <span>{property._count.rooms} kamar</span>
                    <span>{property._count.bookings} pemesanan</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePropertyStatus(property.id, property.isActive)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      property.isActive
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {property.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                  
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200">
                    Edit
                  </button>
                  
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200">
                    Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

