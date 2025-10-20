'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PriceCalendar } from '@/components/PriceCalendar'
import { BookingForm } from '@/components/BookingForm'
import { formatCurrency, getCategoryLabel, getCategoryIcon, getCategoryColor, PropertyCategory } from '@/lib/utils'
import { PropertyDetail, PropertyDetailResponse } from '@/types/property'
import { getPropertyDetail, logApiMode } from '@/lib/mockApi'
import Image from 'next/image'
import * as LucideIcons from 'lucide-react'

export default function PropertyDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [property, setProperty] = useState<PropertyDetail | null>(null)
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
    logApiMode() // Log API mode on mount
    fetchProperty()
  }, [params.id])

  const fetchProperty = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await getPropertyDetail(params.id as string)
      setProperty(response.property)
      
      // Auto-select first room if available
      if (response.property.rooms.length > 0) {
        setSelectedRoom(response.property.rooms[0].id.toString())
      }
    } catch (err: any) {
      console.error('Error fetching property:', err)
      setError(err.message || 'Gagal memuat properti')
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
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat properti...</p>
            </div>
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
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error || 'Properti tidak ditemukan'}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Sort images by order
  const sortedImages = [...property.images].sort((a, b) => a.order - b.order)
  const primaryImage = sortedImages.find(img => img.isPrimary) || sortedImages[0]

  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName]
    return IconComponent || LucideIcons.Home
  }
  
  const IconComponent = getIconComponent(getCategoryIcon(property.category as PropertyCategory))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Property Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{property.name}</h1>
            <span className={`${getCategoryColor(property.category as PropertyCategory)} px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1.5`}>
              <IconComponent size={16} />
              <span>{getCategoryLabel(property.category as PropertyCategory)}</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-gray-600 mb-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{property.address}, {property.city}, {property.province}</span>
            </div>
          </div>
          
          {property.averageRating > 0 && (
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(property.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {property.averageRating.toFixed(1)} ({property._count.reviews} ulasan)
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
                {sortedImages.length > 0 ? (
                  <>
                    <Image
                      src={sortedImages[currentImageIndex].url}
                      alt={sortedImages[currentImageIndex].altText || property.name}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Image Navigation */}
                    {sortedImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 disabled:opacity-50"
                          disabled={currentImageIndex === 0}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(Math.min(sortedImages.length - 1, currentImageIndex + 1))}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 disabled:opacity-50"
                          disabled={currentImageIndex === sortedImages.length - 1}
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
              {sortedImages.length > 1 && (
                <div className="p-4 grid grid-cols-4 gap-2">
                  {sortedImages.slice(0, 8).map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-16 rounded-lg overflow-hidden ${
                        index === currentImageIndex ? 'ring-2 ring-teal-500' : ''
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.altText || `${property.name} ${index + 1}`}
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
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            {/* Rooms */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Kamar Tersedia</h2>
              <div className="space-y-4">
                {property.rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedRoom === room.id.toString()
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRoom(room.id.toString())}
                  >
                    <div className="flex gap-4">
                      {/* Room Image */}
                      {room.images.length > 0 && (
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <Image
                            src={room.images[0].url}
                            alt={room.images[0].altText || room.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{room.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{room.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Max {room.capacity} orang</span>
                          </div>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(room.basePrice)}/malam
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{room.totalUnits} unit tersedia</p>
                      </div>
                      
                      <div className="flex items-center">
                        <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                          selectedRoom === room.id.toString() ? 'border-teal-600' : 'border-gray-300'
                        }`}>
                          {selectedRoom === room.id.toString() && (
                            <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Ulasan ({property._count.reviews})
                </h2>
                <div className="space-y-4">
                  {property.reviews.slice(0, 5).map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-start space-x-3 mb-2">
                        {/* User Avatar */}
                        <div className="relative w-10 h-10 flex-shrink-0">
                          {review.user.avatarUrl ? (
                            <Image
                              src={review.user.avatarUrl}
                              alt={review.user.name}
                              fill
                              className="rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                              {review.user.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-900">{review.user.name}</span>
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString('id-ID')}
                            </span>
                          </div>
                          <div className="flex mb-2">
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
                          <p className="text-gray-700">{review.comment}</p>
                          
                          {/* Tenant Reply */}
                          {review.reply && (
                            <div className="mt-3 ml-4 bg-gray-50 border-l-4 border-teal-500 p-3 rounded">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm font-semibold text-gray-900">
                                  Balasan dari {review.reply.tenant.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(review.reply.createdAt).toLocaleDateString('id-ID')}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">{review.reply.content}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {property._count.reviews > 5 && (
                    <button className="text-teal-600 hover:text-teal-700 font-semibold text-sm">
                      Lihat semua {property._count.reviews} ulasan →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Mulai dari</p>
                <p className="text-3xl font-bold text-teal-600">
                  {formatCurrency(property.minPrice)}
                  <span className="text-base font-normal text-gray-600">/malam</span>
                </p>
              </div>
            </div>

            {/* Price Calendar */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Kalender Harga</h3>
              <PriceCalendar
                propertyId={property.id.toString()}
                selectedRoomId={selectedRoom}
                searchData={searchData}
              />
            </div>

            {/* Booking Form */}
            {selectedRoom && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pesan Sekarang</h3>
                <BookingForm
                  propertyId={property.id.toString()}
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
