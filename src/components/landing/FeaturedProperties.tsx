'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, MapPin, Users } from 'lucide-react'
import { PropertySearchResult } from '@/types/property'

interface FeaturedPropertiesProps {
  properties: PropertySearchResult[]
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  // Show only first 3 properties
  const featuredProperties = properties.slice(0, 3)

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Penginapan Unggulan
          </h2>
          <p className="text-gray-600 text-lg">
            Pilihan terbaik dari ribuan properti kami
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <Link
              key={property.id}
              href={`/property/${property.slug}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={property.primaryImage}
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-lg">
                    {property.category === 'villa' ? 'Villa' :
                     property.category === 'house' ? 'House' :
                     property.category === 'apartment' ? 'Apartment' :
                     'Guest House'}
                  </span>
                </div>
                {/* Price Badge */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                  <div className="text-xs text-gray-600">Mulai dari</div>
                  <div className="text-lg font-bold text-teal-600">
                    Rp {property.minPrice.toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs text-gray-500">/ malam</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                  {property.name}
                </h3>
                
                {/* Location */}
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-1 flex-shrink-0" />
                  <span className="text-sm">{property.city}, {property.province}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {property.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {/* Rating */}
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-semibold text-gray-900">{property.averageRating}</span>
                    <span className="text-gray-500 text-sm ml-1">
                      ({property.totalReviews} ulasan)
                    </span>
                  </div>
                  
                  {/* Available Rooms */}
                  <div className="flex items-center text-gray-600">
                    <Users size={16} className="mr-1" />
                    <span className="text-sm">{property.availableRooms} kamar</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-4 flex items-center justify-center text-teal-600 font-semibold text-sm group-hover:text-teal-700">
                  <span>Lihat Detail</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/search"
            className="inline-flex items-center px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <span>Lihat Semua Properti</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

