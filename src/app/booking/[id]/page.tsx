'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PaymentForm } from '@/components/PaymentForm'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import Image from 'next/image'

interface Booking {
  id: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: string
  paymentProof: string | null
  notes: string | null
  createdAt: string
  property: {
    name: string
    address: string
  }
  room: {
    name: string
    capacity: number
  }
}

export default function BookingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBooking()
  }, [params.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchBooking = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/bookings/${params.id}`)
      const data = await response.json()

      if (response.ok) {
        setBooking(data.booking)
      } else {
        setError(data.error || 'Gagal memuat data pemesanan')
      }
    } catch {
      setError('Terjadi kesalahan server')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentSuccess = () => {
    fetchBooking() // Refresh booking data
  }

  const handleCancelBooking = async () => {
    if (!booking || !confirm('Apakah Anda yakin ingin membatalkan pemesanan ini? Tindakan ini tidak dapat dibatalkan.')) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/bookings/${booking.id}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()

      if (response.ok) {
        // Refresh booking data
        fetchBooking()
        alert('Pemesanan berhasil dibatalkan')
      } else {
        alert(result.error || 'Gagal membatalkan pemesanan')
      }
    } catch {
      alert('Terjadi kesalahan server')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error || 'Pemesanan tidak ditemukan'}
          </div>
        </div>
        <Footer />
      </div>
    )
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Detail Pemesanan</h1>
            <p className="text-gray-600">ID Pemesanan: {booking.id}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Status Pemesanan</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </span>
                </div>
                
                {booking.status === 'PENDING_PAYMENT' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className="text-yellow-800 font-medium">
                        Silakan lakukan pembayaran dalam 2 jam untuk menyelesaikan pemesanan.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Property Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Detail Properti</h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Nama Properti:</span>
                    <span className="ml-2 text-gray-900">{booking.property.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Alamat:</span>
                    <span className="ml-2 text-gray-900">{booking.property.address}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Kamar:</span>
                    <span className="ml-2 text-gray-900">{booking.room.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Kapasitas:</span>
                    <span className="ml-2 text-gray-900">Max {booking.room.capacity} orang</span>
                  </div>
                </div>
              </div>

              {/* Booking Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Detail Pemesanan</h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Check-in:</span>
                    <span className="ml-2 text-gray-900">{formatDateTime(booking.checkIn)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Check-out:</span>
                    <span className="ml-2 text-gray-900">{formatDateTime(booking.checkOut)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Jumlah Tamu:</span>
                    <span className="ml-2 text-gray-900">{booking.guests} orang</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Total Harga:</span>
                    <span className="ml-2 text-gray-900 font-semibold text-lg">{formatCurrency(booking.totalPrice)}</span>
                  </div>
                  {booking.notes && (
                    <div>
                      <span className="font-medium text-gray-700">Catatan:</span>
                      <span className="ml-2 text-gray-900">{booking.notes}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-700">Tanggal Pemesanan:</span>
                    <span className="ml-2 text-gray-900">{formatDateTime(booking.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Proof */}
              {booking.paymentProof && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Bukti Pembayaran</h2>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={booking.paymentProof}
                      alt="Bukti Pembayaran"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Payment Form */}
              {booking.status === 'PENDING_PAYMENT' && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Bukti Pembayaran</h3>
                  <PaymentForm
                    bookingId={booking.id}
                    onSuccess={handlePaymentSuccess}
                  />
                </div>
              )}

              {/* Actions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi</h3>
                <div className="space-y-3">
                  {booking.status === 'PENDING_PAYMENT' && (
                    <button
                      onClick={handleCancelBooking}
                      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Batalkan Pemesanan
                    </button>
                  )}
                  
                  <button
                    onClick={() => window.print()}
                    className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cetak Detail
                  </button>
                  
                  <button
                    onClick={() => router.push('/user/bookings')}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Kembali ke Daftar Pemesanan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

