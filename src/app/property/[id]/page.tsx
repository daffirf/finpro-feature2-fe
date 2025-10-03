'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PriceCalendar } from '@/components/PriceCalendar'
import { BookingForm } from '@/components/BookingForm'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'

interface Property {
  id: string
  name: string
  description: string
  address: string
  city: string
  latitude: number
  longitude: number
  basePrice: number
  images: string[]
  amenities: string[]
  rooms: {
    id: string
    name: string
    description: string
    capacity: number
    basePrice: number
    images: string[]
  }[]
  reviews: {
    id: string
    rating: number
    comment: string
    user: {
      name: string
    }
    createdAt: string
  }[]
  _count: {
    reviews: number
  }
}

export default function PropertyDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedRoom, setSelectedRoom] = useState<string>('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const searchData = {
    city: searchParams.get('city') || '',
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    guests: parseInt(searchParams.get('guests') || '1')
  }

  useEffect(() => {
    fetchProperty()
  }, [params.id])

  const fetchProperty = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/properties/${params.id}`)
      const data = await response.json()

      if (response.ok) {
        setProperty(data.property)
        // Auto-select first room if available
        if (data.property.rooms.length > 0) {
          setSelectedRoom(data.property.rooms[0].id)
        }
      } else {
        setError(data.error || 'Gagal memuat properti')
      }
    } catch (error) {
      setError('Terjadi kesalahan server')
    } finally {
      setIsLoading(false)
    }
  }

  const averageRating = property?.reviews.length 
    ? property.reviews.reduce((sum, review) => sum + review.rating, 0) / property.reviews.length
    : 0

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

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error || 'Properti tidak ditemukan'}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Property Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>
          <p className="text-gray-600 mb-4">{property.address}, {property.city}</p>
          
          {averageRating > 0 && (
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {averageRating.toFixed(1)} ({property._count.reviews} ulasan)
              </span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-96">
                {property.images.length > 0 ? (
                  <>
                    <Image
                      src={property.images[currentImageIndex]}
                      alt={property.name}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Image Navigation */}
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                          disabled={currentImageIndex === 0}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(Math.min(property.images.length - 1, currentImageIndex + 1))}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                          disabled={currentImageIndex === property.images.length - 1}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="h-full bg-gray-200 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Navigation */}
              {property.images.length > 1 && (
                <div className="p-4 grid grid-cols-4 gap-2">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-16 rounded-lg overflow-hidden ${
                        index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${property.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tentang Properti Ini</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Fasilitas</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rooms */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Kamar Tersedia</h2>
              <div className="space-y-4">
                {property.rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedRoom === room.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{room.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{room.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Max {room.capacity} orang</span>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(room.basePrice)}/malam
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex items-center justify-center">
                          {selectedRoom === room.id && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            {property.reviews.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Ulasan ({property._count.reviews})</h2>
                <div className="space-y-4">
                  {property.reviews.slice(0, 5).map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">{review.user.name}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price Calendar */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Kalender Harga</h3>
              <PriceCalendar
                propertyId={property.id}
                selectedRoomId={selectedRoom}
                searchData={searchData}
              />
            </div>

            {/* Booking Form */}
            {selectedRoom && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pesan Sekarang</h3>
                <BookingForm
                  propertyId={property.id}
                  roomId={selectedRoom}
                  searchData={searchData}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

