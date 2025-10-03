'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import Link from 'next/link'

interface Booking {
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

export default function UserBookingsPage() {
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
      const response = await fetch(`/api/user/bookings?status=${filter}`)
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pesanan Saya</h1>
            <p className="text-gray-600">Kelola dan lihat riwayat pemesanan Anda</p>
          </div>

          {/* Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Filter Status:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Semua Status</option>
                <option value="PENDING_PAYMENT">Menunggu Pembayaran</option>
                <option value="PAYMENT_CONFIRMED">Pembayaran Dikonfirmasi</option>
                <option value="CONFIRMED">Dikonfirmasi</option>
                <option value="COMPLETED">Selesai</option>
                <option value="CANCELLED">Dibatalkan</option>
              </select>
            </div>
          </div>

          {/* Bookings List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada pemesanan</h3>
              <p className="text-gray-600 mb-4">Mulai dengan mencari penginapan yang sesuai</p>
              <Link
                href="/search"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Cari Penginapan
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

