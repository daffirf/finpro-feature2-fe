'use client'

import { formatCurrency, formatDateTime } from '@/lib/utils'
import Link from 'next/link'

interface BookingCardProps {
  booking: {
    id: string
    checkIn: string
    checkOut: string
    guests: number
    totalPrice: number
    status: string
    createdAt: string
    property: {
      name: string
      address: string
      images: string[]
    }
    room: {
      name: string
    }
  }
}

export function BookingCard({ booking }: BookingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING_PAYMENT':
        return 'bg-yellow-100 text-yellow-800'
      case 'PAYMENT_CONFIRMED':
        return 'bg-blue-100 text-blue-800'
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING_PAYMENT':
        return 'Menunggu Pembayaran'
      case 'PAYMENT_CONFIRMED':
        return 'Pembayaran Dikonfirmasi'
      case 'CONFIRMED':
        return 'Dikonfirmasi'
      case 'CANCELLED':
        return 'Dibatalkan'
      case 'COMPLETED':
        return 'Selesai'
      default:
        return status
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="grid md:grid-cols-3 gap-6 p-6">
        {/* Property Image */}
        <div className="relative h-48 md:h-full">
          {booking.property.images.length > 0 ? (
            <img
              src={booking.property.images[0]}
              alt={booking.property.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Booking Details */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{booking.property.name}</h3>
              <p className="text-gray-600">{booking.property.address}</p>
              <p className="text-sm text-gray-500">{booking.room.name}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
              {getStatusText(booking.status)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Check-in:</span>
              <p className="font-medium">{formatDateTime(booking.checkIn)}</p>
            </div>
            <div>
              <span className="text-gray-600">Check-out:</span>
              <p className="font-medium">{formatDateTime(booking.checkOut)}</p>
            </div>
            <div>
              <span className="text-gray-600">Jumlah Tamu:</span>
              <p className="font-medium">{booking.guests} orang</p>
            </div>
            <div>
              <span className="text-gray-600">Total Harga:</span>
              <p className="font-medium text-lg">{formatCurrency(booking.totalPrice)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm text-gray-500">
              Dibuat: {formatDateTime(booking.createdAt)}
            </span>
            <div className="flex space-x-2">
              <Link
                href={`/booking/${booking.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Lihat Detail
              </Link>
              {booking.status === 'COMPLETED' && (
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Beri Review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

