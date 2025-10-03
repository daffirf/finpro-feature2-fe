'use client'

import { useState, useEffect } from 'react'
import { formatCurrency } from '@/lib/utils'

interface PriceCalendarProps {
  propertyId: string
  selectedRoomId: string
  searchData: {
    city: string
    checkIn: string
    checkOut: string
    guests: number
  }
}

interface PriceData {
  date: string
  price: number
  isAvailable: boolean
  isHoliday: boolean
  isWeekend: boolean
}

export function PriceCalendar({ propertyId, selectedRoomId, searchData }: PriceCalendarProps) {
  const [priceData, setPriceData] = useState<PriceData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    if (selectedRoomId) {
      fetchPriceData()
    }
  }, [propertyId, selectedRoomId, currentMonth])

  const fetchPriceData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/properties/${propertyId}/prices?roomId=${selectedRoomId}&month=${currentMonth.toISOString()}`)
      const data = await response.json()
      
      if (response.ok) {
        setPriceData(data.prices)
      }
    } catch (error) {
      console.error('Error fetching price data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth)
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const getPriceForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return priceData.find(p => p.date === dateStr)
  }

  const isDateInRange = (day: number) => {
    if (!searchData.checkIn || !searchData.checkOut) return false
    
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const checkIn = new Date(searchData.checkIn)
    const checkOut = new Date(searchData.checkOut)
    
    return date >= checkIn && date < checkOut
  }

  const isDateSelected = (day: number) => {
    if (!searchData.checkIn || !searchData.checkOut) return false
    
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const checkIn = new Date(searchData.checkIn)
    const checkOut = new Date(searchData.checkOut)
    
    return date.getTime() === checkIn.getTime() || date.getTime() === checkOut.getTime()
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  return (
    <div className="space-y-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h4 className="text-lg font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h4>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {isLoading ? (
          <div className="col-span-7 flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          days.map((day, index) => {
            if (!day) {
              return <div key={index} className="h-12"></div>
            }

            const priceInfo = getPriceForDate(day)
            const isInRange = isDateInRange(day)
            const isSelected = isDateSelected(day)
            const isToday = new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString()

            return (
              <div
                key={day}
                className={`
                  h-12 p-1 rounded-lg text-center text-sm cursor-pointer transition-colors
                  ${isSelected 
                    ? 'bg-blue-600 text-white' 
                    : isInRange 
                      ? 'bg-blue-100 text-blue-900' 
                      : isToday
                        ? 'bg-gray-200 text-gray-900'
                        : 'hover:bg-gray-100'
                  }
                  ${!priceInfo?.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                title={priceInfo ? `${formatCurrency(priceInfo.price)} - ${priceInfo.isAvailable ? 'Tersedia' : 'Tidak tersedia'}` : ''}
              >
                <div className="font-medium">{day}</div>
                {priceInfo && (
                  <div className="text-xs">
                    {formatCurrency(priceInfo.price).replace('Rp', '').replace(/\s/g, '')}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Legend */}
      <div className="space-y-2 text-xs text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded"></div>
          <span>Tanggal terpilih</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-100 rounded"></div>
          <span>Dalam rentang</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-200 rounded"></div>
          <span>Hari ini</span>
        </div>
      </div>
    </div>
  )
}

