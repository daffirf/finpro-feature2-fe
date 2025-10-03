'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatCurrency } from '@/lib/utils'

interface PropertyCardProps {
  property: {
    id: string
    name: string
    description: string
    address: string
    city: string
    basePrice: number
    images: string[]
    amenities: string[]
    rooms: {
      id: string
      name: string
      capacity: number
      basePrice: number
    }[]
    reviews: {
      rating: number
    }[]
    _count: {
      reviews: number
    }
  }
  searchData: {
    city: string
    checkIn: string
    checkOut: string
    guests: number
  }
}

export function PropertyCard({ property, searchData }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageLoading, setIsImageLoading] = useState(true)

  const averageRating = property.reviews.length > 0 
    ? property.reviews.reduce((sum, review) => sum + review.rating, 0) / property.reviews.length
    : 0

  const totalNights = Math.ceil(
    (new Date(searchData.checkOut).getTime() - new Date(searchData.checkIn).getTime()) / (1000 * 60 * 60 * 24)
  )

  const handleImageError = () => {
    setIsImageLoading(false)
  }

  const handleImageLoad = () => {
    setIsImageLoading(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Image Gallery */}
        <div className="md:col-span-1 relative">
          {property.images.length > 0 ? (
            <div className="relative h-64 md:h-full">
              <Image
                src={property.images[currentImageIndex]}
                alt={property.name}
                fill
                className="object-cover"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
              {isImageLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Image Navigation */}
              {property.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Rating Badge */}
              {averageRating > 0 && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-semibold">{averageRating.toFixed(1)}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 md:h-full bg-gray-200 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Property Info */}
        <div className="md:col-span-2 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{property.address}, {property.city}</p>
              <p className="text-gray-700 text-sm line-clamp-2">{property.description}</p>
            </div>
          </div>

          {/* Amenities */}
          {property.amenities.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {property.amenities.slice(0, 4).map((amenity) => (
                  <span
                    key={amenity}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
                {property.amenities.length > 4 && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    +{property.amenities.length - 4} lainnya
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Rooms Info */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Kamar Tersedia:</h4>
            <div className="space-y-2">
              {property.rooms.slice(0, 2).map((room) => (
                <div key={room.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{room.name} (Max {room.capacity} orang)</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(room.basePrice)}/malam
                  </span>
                </div>
              ))}
              {property.rooms.length > 2 && (
                <p className="text-xs text-gray-500">
                  +{property.rooms.length - 2} kamar lainnya
                </p>
              )}
            </div>
          </div>

          {/* Price and Action */}
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(property.basePrice)}
                <span className="text-sm font-normal text-gray-600">/malam</span>
              </div>
              <div className="text-sm text-gray-600">
                Total untuk {totalNights} malam: {formatCurrency(property.basePrice * totalNights)}
              </div>
            </div>
            
            <Link
              href={`/property/${property.id}?${new URLSearchParams({
                ...searchData,
                guests: searchData.guests.toString()
              }).toString()}`}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Lihat Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}