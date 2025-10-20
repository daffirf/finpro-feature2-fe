'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatCurrency, getCategoryLabel, getCategoryIcon, getCategoryColor, PropertyCategory } from '@/lib/utils'
import { PropertySearchResult } from '@/types/property'
import * as LucideIcons from 'lucide-react'

interface PropertyCardProps {
  property: PropertySearchResult
  searchData: {
    city: string
    checkIn: string
    checkOut: string
    guests: number
  }
}

export function PropertyCard({ property, searchData }: PropertyCardProps) {
  const [imageError, setImageError] = useState(false)

  const totalNights = Math.ceil(
    (new Date(searchData.checkOut).getTime() - new Date(searchData.checkIn).getTime()) / (1000 * 60 * 60 * 24)
  )

  const displayImage = property.primaryImage && !imageError 
    ? property.primaryImage 
    : '/placeholder-property.jpg'

  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName]
    return IconComponent || LucideIcons.Home
  }
  
  const IconComponent = getIconComponent(getCategoryIcon(property.category as PropertyCategory))

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Image */}
        <div className="md:col-span-1 relative">
          <div className="relative h-64 md:h-full min-h-[250px]">
            {property.primaryImage ? (
              <Image
                src={displayImage}
                alt={property.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="h-full bg-gray-200 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`${getCategoryColor(property.category as PropertyCategory)} px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1`}>
                <IconComponent size={14} />
                <span>{getCategoryLabel(property.category as PropertyCategory)}</span>
              </span>
            </div>

            {/* Rating Badge */}
            {property.averageRating > 0 && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-semibold">{property.averageRating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Property Info */}
        <div className="md:col-span-2 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.name}</h3>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{property.city}, {property.province}</span>
              </div>
              <p className="text-gray-700 text-sm line-clamp-2">{property.description}</p>
            </div>
          </div>

          {/* Rating and Reviews */}
          {property.totalReviews > 0 && (
            <div className="flex items-center space-x-1 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(property.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {property.averageRating.toFixed(1)} ({property.totalReviews} ulasan)
              </span>
            </div>
          )}

          {/* Rooms Info */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Kamar Tersedia:</h4>
            <div className="space-y-2">
              {property.rooms.slice(0, 2).map((room) => (
                <div key={room.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-700">{room.name} (Max {room.capacity} orang)</span>
                  </div>
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
          <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-200">
            <div>
              <p className="text-xs text-gray-500 mb-1">Mulai dari</p>
              <div className="text-2xl font-bold text-teal-600">
                {formatCurrency(property.minPrice)}
                <span className="text-sm font-normal text-gray-600">/malam</span>
              </div>
              {totalNights > 0 && (
                <div className="text-sm text-gray-600">
                  Total {totalNights} malam: {formatCurrency(property.minPrice * totalNights)}
                </div>
              )}
              <div className="text-xs text-teal-600 mt-1">
                {property.availableRooms} kamar tersedia
              </div>
            </div>
            
            <Link
              href={`/property/${property.id}?${new URLSearchParams({
                ...searchData,
                guests: searchData.guests.toString()
              }).toString()}`}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Lihat Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
