'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPropertySchema } from '@/lib/validation'

interface PropertyFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export function PropertyForm({ onSuccess, onCancel }: PropertyFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(createPropertySchema)
  })

  const watchedAmenities = watch('amenities') || []

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
    'Room Service',
    'TV',
    'Kulkas',
    'Dapur',
    'Balkon',
    'Teras'
  ]

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/tenant/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (response.ok) {
        onSuccess()
      } else {
        setError(result.error || 'Gagal menambahkan properti')
      }
    } catch (error) {
      setError('Terjadi kesalahan server')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAmenityToggle = (amenity: string) => {
    const currentAmenities = watchedAmenities
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a: string) => a !== amenity)
      : [...currentAmenities, amenity]
    
    register('amenities').onChange({ target: { value: newAmenities } })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Tambah Properti</h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Properti *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Masukkan nama properti"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga Dasar (per malam) *
                </label>
                <input
                  {...register('basePrice', { valueAsNumber: true })}
                  type="number"
                  placeholder="Masukkan harga dasar"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.basePrice && (
                  <p className="mt-1 text-sm text-red-600">{errors.basePrice.message as string}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi *
              </label>
              <textarea
                {...register('description')}
                rows={4}
                placeholder="Deskripsikan properti Anda"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message as string}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat *
                </label>
                <input
                  {...register('address')}
                  type="text"
                  placeholder="Masukkan alamat lengkap"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kota *
                </label>
                <input
                  {...register('city')}
                  type="text"
                  placeholder="Masukkan kota"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city.message as string}</p>
                )}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Fasilitas
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenitiesOptions.map((amenity) => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={watchedAmenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Menyimpan...' : 'Simpan Properti'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
