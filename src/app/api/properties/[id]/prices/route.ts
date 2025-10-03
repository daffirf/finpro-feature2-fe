import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const { searchParams } = new URL(request.url)
    const roomId = searchParams.get('roomId')
    const month = searchParams.get('month')

    if (!roomId || !month) {
      return NextResponse.json(
        { error: 'Parameter roomId dan month diperlukan' },
        { status: 400 }
      )
    }

    const startDate = new Date(month)
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)

    // Get room base price
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      select: { basePrice: true }
    })

    if (!room) {
      return NextResponse.json(
        { error: 'Kamar tidak ditemukan' },
        { status: 404 }
      )
    }

    // Get price rules for the property
    const priceRules = await prisma.priceRule.findMany({
      where: {
        propertyId: id,
        isActive: true,
        OR: [
          {
            startDate: {
              lte: endDate
            },
            endDate: {
              gte: startDate
            }
          }
        ]
      }
    })

    // Generate price data for each day in the month
    const prices = []
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0]
      let price = Number(room.basePrice)
      let isHoliday = false
      let isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6

      // Check for price rules
      const applicableRule = priceRules.find(rule => {
        const ruleStart = new Date(rule.startDate)
        const ruleEnd = new Date(rule.endDate)
        return currentDate >= ruleStart && currentDate <= ruleEnd
      })

      if (applicableRule) {
        if (applicableRule.priceType === 'PERCENTAGE') {
          price = price * (1 + Number(applicableRule.value) / 100)
        } else {
          price = Number(applicableRule.value)
        }
        isHoliday = true
      }

      // Check if room is available for this date
      const isAvailable = await checkRoomAvailability(roomId, dateStr)

      prices.push({
        date: dateStr,
        price: Math.round(price),
        isAvailable,
        isHoliday,
        isWeekend
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return NextResponse.json({
      prices
    })

  } catch (error) {
    console.error('Get prices error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

async function checkRoomAvailability(roomId: string, date: string): Promise<boolean> {
  const startDate = new Date(date)
  const endDate = new Date(date)
  endDate.setDate(endDate.getDate() + 1)

  const conflictingBooking = await prisma.booking.findFirst({
    where: {
      roomId,
      status: {
        not: 'CANCELLED'
      },
      OR: [
        {
          AND: [
            { checkIn: { lt: endDate } },
            { checkOut: { gt: startDate } }
          ]
        }
      ]
    }
  })

  return !conflictingBooking
}

