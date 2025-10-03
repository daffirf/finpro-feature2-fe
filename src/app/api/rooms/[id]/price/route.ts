import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const { searchParams } = new URL(request.url)
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')

    if (!checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Parameter checkIn dan checkOut diperlukan' },
        { status: 400 }
      )
    }

    // Get room
    const room = await prisma.room.findUnique({
      where: { id: id },
      include: {
        property: {
          include: {
            priceRules: {
              where: {
                isActive: true
              }
            }
          }
        }
      }
    })

    if (!room) {
      return NextResponse.json(
        { error: 'Kamar tidak ditemukan' },
        { status: 404 }
      )
    }

    // Calculate price for the date range
    let totalPrice = 0
    const startDate = new Date(checkIn)
    const endDate = new Date(checkOut)
    const currentDate = new Date(startDate)

    while (currentDate < endDate) {
      let dailyPrice = Number(room.basePrice)

      // Check for price rules
      const applicableRule = room.property.priceRules.find(rule => {
        const ruleStart = new Date(rule.startDate)
        const ruleEnd = new Date(rule.endDate)
        return currentDate >= ruleStart && currentDate <= ruleEnd
      })

      if (applicableRule) {
        if (applicableRule.priceType === 'PERCENTAGE') {
          dailyPrice = dailyPrice * (1 + Number(applicableRule.value) / 100)
        } else {
          dailyPrice = Number(applicableRule.value)
        }
      }

      totalPrice += dailyPrice
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return NextResponse.json({
      price: Math.round(totalPrice)
    })

  } catch (error) {
    console.error('Get room price error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

