'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

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
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
      <form onSubmit={handleSubmit(handleFormSubmit as any)} className="space-y-6"> {/* eslint-disable-line @typescript-eslint/no-explicit-any */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* City Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🌍 Destinasi
            </label>
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                {...register('city')}
                type="text"
                placeholder="Jakarta, Bali, Yogyakarta..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              />
            </div>
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{(errors.city as any).message}</p>
            )}
          </div>

          {/* Check-in Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📅 Check-in
            </label>
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                {...register('checkIn')}
                type="date"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              />
            </div>
            {errors.checkIn && (
              <p className="text-red-500 text-xs mt-1">{(errors.checkIn as any).message}</p>
            )}
          </div>

          {/* Check-out Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📅 Check-out
            </label>
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                {...register('checkOut')}
                type="date"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              />
            </div>
            {errors.checkOut && (
              <p className="text-red-500 text-xs mt-1">{(errors.checkOut as any).message}</p>
            )}
          </div>

          {/* Guests Counter */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              👥 Tamu
            </label>
            <div className="flex items-center border-2 border-gray-200 rounded-2xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-300">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="px-4 py-4 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="px-4 py-4 border-x border-gray-200 font-semibold text-gray-800 min-w-[60px] text-center">{guests}</span>
              <button
                type="button"
                onClick={() => setGuests(guests + 1)}
                className="px-4 py-4 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Cari Penginapan Terbaik
          </button>
        </div>
      </form>
    </div>
  )
}