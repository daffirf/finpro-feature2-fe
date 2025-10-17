'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema } from '@/lib/validation'
import { formatCurrency, calculateDaysBetween } from '@/lib/utils'

interface BookingFormProps {
  propertyId: string
  roomId: string
  searchData: {
    city: string
    checkIn: string
    checkOut: string
    guests: number
  }
}

export function BookingForm({ propertyId, roomId, searchData }: BookingFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)
  const [roomPrice, setRoomPrice] = useState(0)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<{
    propertyId: string
    roomId: string
    checkIn: string
    checkOut: string
    guests: number
    notes?: string
  }>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      propertyId,
      roomId,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      guests: searchData.guests
    }
  })

  const watchedData = watch()

  // Calculate total price when form data changes
  useEffect(() => {
    if (roomPrice > 0 && watchedData.checkIn && watchedData.checkOut) {
      const nights = calculateDaysBetween(watchedData.checkIn, watchedData.checkOut)
      setTotalPrice(roomPrice * nights)
    }
  }, [roomPrice, watchedData.checkIn, watchedData.checkOut])

  // Fetch room price
  useEffect(() => {
    fetchRoomPrice()
  }, [roomId])

  const fetchRoomPrice = async () => {
    try {
      const response = await fetch(`/api/rooms/${roomId}/price?checkIn=${searchData.checkIn}&checkOut=${searchData.checkOut}`)
      const data = await response.json()
      
      if (response.ok) {
        setRoomPrice(data.price)
        const nights = calculateDaysBetween(searchData.checkIn, searchData.checkOut)
        setTotalPrice(data.price * nights)
      }
    } catch (error) {
      console.error('Error fetching room price:', error)
    }
  }

  const onSubmit = async (data: { propertyId: string; roomId: string; checkIn: string; checkOut: string; guests: number; notes?: string }) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          totalPrice
        })
      })

      const result = await response.json()

      if (response.ok) {
        router.push(`/booking/${result.booking.id}`)
      } else {
        setError(result.error || 'Gagal membuat pemesanan')
      }
    } catch {
      setError('Terjadi kesalahan server')
    } finally {
      setIsLoading(false)
    }
  }

  const nights = calculateDaysBetween(searchData.checkIn, searchData.checkOut)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Booking Summary */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Check-in:</span>
          <span>{new Date(searchData.checkIn).toLocaleDateString('id-ID')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Check-out:</span>
          <span>{new Date(searchData.checkOut).toLocaleDateString('id-ID')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Durasi:</span>
          <span>{nights} malam</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Jumlah tamu:</span>
          <span>{searchData.guests} orang</span>
        </div>
      </div>

      {/* Price Breakdown */}
      {roomPrice > 0 && (
        <div className="bg-blue-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Harga per malam:</span>
            <span>{formatCurrency(roomPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total ({nights} malam):</span>
            <span className="font-semibold">{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      )}

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Catatan Khusus (Opsional)
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          placeholder="Masukkan catatan khusus untuk pemesanan Anda"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.notes && (
          <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !roomPrice}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Memproses...' : 'Pesan Sekarang'}
      </button>

      {/* Terms */}
      <p className="text-xs text-gray-500 text-center">
        Dengan memesan, Anda menyetujui{' '}
        <a href="/terms" className="text-blue-600 hover:underline">
          syarat dan ketentuan
        </a>{' '}
        kami.
      </p>
    </form>
  )
}
