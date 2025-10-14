'use client'

import { useState, useEffect } from 'react'

interface CalendarEvent {
  date: string
  type: 'booked' | 'available' | 'blocked'
  booking?: {
    id: string
    user: { name: string }
    room: { name: string }
  }
}

interface PropertyCalendarProps {
  propertyId: string
  selectedRoomId?: string
  month?: number
  year?: number
}

export function PropertyCalendar({ 
  propertyId, 
  selectedRoomId, 
  month = new Date().getMonth() + 1, 
  year = new Date().getFullYear() 
}: PropertyCalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(month)
  const [currentYear, setCurrentYear] = useState(year)

  useEffect(() => {
    fetchCalendarData()
  }, [propertyId, selectedRoomId, currentMonth, currentYear])

  const fetchCalendarData = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        month: currentMonth.toString(),
        year: currentYear.toString(),
        ...(selectedRoomId && { roomId: selectedRoomId })
      })

      const response = await fetch(`/api/tenant/properties/${propertyId}/calendar?${params}`)
      const data = await response.json()

      if (response.ok) {
        setEvents(data.events || [])
      }
    } catch (error) {
      console.error('Error fetching calendar data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month - 1, 1).getDay()
  }

  const getEventForDate = (day: number) => {
    const dateString = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    return events.find(event => event.date === dateString)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 1) {
        setCurrentMonth(12)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 12) {
        setCurrentMonth(1)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  const dayNames = ['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Kalender Ketersediaan
        </h3>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span className="text-lg font-medium text-gray-900 min-w-[140px] text-center">
            {monthNames[currentMonth - 1]} {currentYear}
          </span>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${i}`} className="h-12"></div>
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const event = getEventForDate(day)
              const isPast = new Date(currentYear, currentMonth - 1, day) < new Date()
              
              return (
                <div
                  key={day}
                  className={`h-12 flex items-center justify-center text-sm rounded-lg border cursor-pointer transition-colors ${
                    isPast 
                      ? 'bg-gray-100 text-gray-400' 
                      : event?.type === 'booked'
                      ? 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200'
                      : event?.type === 'blocked'
                      ? 'bg-gray-300 text-gray-600 border-gray-400'
                      : 'bg-green-50 text-green-800 border-green-200 hover:bg-green-100'
                  }`}
                  title={event ? `Room: ${event.booking?.room.name}, User: ${event.booking?.user.name}` : 'Available'}
                >
                  {day}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
              <span className="text-sm text-gray-600">Tersedia</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
              <span className="text-sm text-gray-600">Terisi</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-300 border border-gray-400 rounded"></div>
              <span className="text-sm text-gray-600">Diblokir</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
              <span className="text-sm text-gray-600">Terlewat</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
