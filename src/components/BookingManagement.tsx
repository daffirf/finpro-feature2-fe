'use client'

import { useState, useEffect } from 'react'
import { formatCurrency, formatDateTime } from '@/lib/utils'

interface Booking {
  id: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: string
  paymentProof: string | null
  createdAt: string
  user: {
    name: string
    email: string
  }
  property: {
    name: string
  }
  room: {
    name: string
  }
}

export function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchBookings()
  }, [filter])

  const fetchBookings = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/tenant/bookings?status=${filter}`)
      const data = await response.json()
      
      if (response.ok) {
        setBookings(data.bookings)
      } else {
        setError(data.error || 'Gagal memuat pemesanan')
      }
    } catch (error) {
      setError('Terjadi kesalahan server')
    } finally {
      setIsLoading(false)
    }
  }

  const confirmPayment = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/tenant/bookings/${bookingId}/confirm`, {
        method: 'POST'
      })

      if (response.ok) {
        fetchBookings() // Refresh data
      }
    } catch (error) {
      console.error('Error confirming payment:', error)
    }
  }

  const rejectPayment = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/tenant/bookings/${bookingId}/reject`, {
        method: 'POST'
      })

      if (response.ok) {
        fetchBookings() // Refresh data
      }
    } catch (error) {
      console.error('Error rejecting payment:', error)
    }
  }

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
      default:
        return status
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Kelola Pemesanan</h2>
        
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Semua Status</option>
            <option value="PENDING_PAYMENT">Menunggu Pembayaran</option>
            <option value="PAYMENT_CONFIRMED">Pembayaran Dikonfirmasi</option>
            <option value="CONFIRMED">Dikonfirmasi</option>
            <option value="CANCELLED">Dibatalkan</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada pemesanan</h3>
          <p className="text-gray-600">Belum ada pemesanan dengan status yang dipilih</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{booking.property.name}</h3>
                  <p className="text-gray-600">{booking.room.name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                  {getStatusText(booking.status)}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Pemesan</p>
                  <p className="font-medium">{booking.user.name}</p>
                  <p className="text-sm text-gray-500">{booking.user.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Tanggal</p>
                  <p className="font-medium">
                    {formatDateTime(booking.checkIn)} - {formatDateTime(booking.checkOut)}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Jumlah Tamu</p>
                  <p className="font-medium">{booking.guests} orang</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Total Harga</p>
                  <p className="font-medium text-lg">{formatCurrency(booking.totalPrice)}</p>
                </div>
              </div>

              {booking.paymentProof && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Bukti Pembayaran:</p>
                  <div className="relative h-32 w-48 rounded-lg overflow-hidden border">
                    <img
                      src={booking.paymentProof}
                      alt="Bukti Pembayaran"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {booking.status === 'PAYMENT_CONFIRMED' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => confirmPayment(booking.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Konfirmasi Pembayaran
                  </button>
                  <button
                    onClick={() => rejectPayment(booking.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Tolak Pembayaran
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

