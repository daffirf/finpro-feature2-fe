'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { searchSchema } from '@/lib/validation'
import { useState } from 'react'

interface SearchFormProps {
  onSubmit: (data: {
    city: string
    checkIn: string
    checkOut: string
    guests: number
  }) => void
}

export function SearchForm({ onSubmit }: SearchFormProps) {
  const [guests, setGuests] = useState(2)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(searchSchema)
  })

  const handleFormSubmit = (data: { city: string; checkIn: string; checkOut: string }) => {
    onSubmit({
      ...data,
      guests
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid md:grid-cols-4 gap-4">
          {/* City Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destinasi
            </label>
            <input
              {...register('city')}
              type="text"
              placeholder="Cth: Jakarta, Bali"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* Check-in Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in
            </label>
            <input
              {...register('checkIn')}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.checkIn && (
              <p className="text-red-500 text-xs mt-1">{errors.checkIn.message}</p>
            )}
          </div>

          {/* Check-out Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out
            </label>
            <input
              {...register('checkOut')}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.checkOut && (
              <p className="text-red-500 text-xs mt-1">{errors.checkOut.message}</p>
            )}
          </div>

          {/* Guests Counter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tamu
            </label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="px-3 py-2 text-gray-600 hover:text-gray-800"
              >
                -
              </button>
              <span className="px-3 py-2 border-x border-gray-300">{guests}</span>
              <button
                type="button"
                onClick={() => setGuests(guests + 1)}
                className="px-3 py-2 text-gray-600 hover:text-gray-800"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Cari Penginapan
          </button>
        </div>
      </form>
    </div>
  )
}