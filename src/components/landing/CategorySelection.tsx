'use client'

import Link from 'next/link'
import { categoryConfig, PropertyCategory } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'

export default function CategorySelection() {
  const categories: PropertyCategory[] = ['villa', 'house', 'apartment', 'guest_house']

  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName]
    return IconComponent || LucideIcons.Home
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Temukan Akomodasi Impian Anda
          </h2>
          <p className="text-gray-600 text-lg">
            Pilih kategori properti yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const config = categoryConfig[category]
            const IconComponent = getIconComponent(config.icon)
            
            return (
              <Link
                key={category}
                href={`/search?category=${category}`}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 text-center">
                    <div className="transform group-hover:scale-110 transition-transform duration-300 text-white">
                      <IconComponent size={80} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>

                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {config.label}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {config.description}
                  </p>
                  <div className="flex items-center text-teal-600 font-semibold text-sm">
                    <span>Lihat Properti</span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`${config.color} px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
                    Popular
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

