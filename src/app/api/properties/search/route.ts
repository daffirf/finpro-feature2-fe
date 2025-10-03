import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const city = searchParams.get('city') || ''
    const checkIn = searchParams.get('checkIn') || ''
    const checkOut = searchParams.get('checkOut') || ''
    const guests = parseInt(searchParams.get('guests') || '1')
    const sortBy = searchParams.get('sortBy') || 'price_asc'
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const amenities = searchParams.get('amenities')?.split(',').filter(Boolean) || []

    // Build where clause
    const where: any = {
      isActive: true,
      city: {
        contains: city,
        mode: 'insensitive'
      }
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.basePrice = {}
      if (minPrice) where.basePrice.gte = parseFloat(minPrice)
      if (maxPrice) where.basePrice.lte = parseFloat(maxPrice)
    }

    // Amenities filter
    if (amenities.length > 0) {
      where.amenities = {
        hasSome: amenities
      }
    }

    // Build orderBy clause
    let orderBy: any = {}
    switch (sortBy) {
      case 'price_asc':
        orderBy = { basePrice: 'asc' }
        break
      case 'price_desc':
        orderBy = { basePrice: 'desc' }
        break
      case 'name_asc':
        orderBy = { name: 'asc' }
        break
      case 'rating_desc':
        orderBy = { reviews: { _count: 'desc' } }
        break
      default:
        orderBy = { basePrice: 'asc' }
    }

    // Get properties with rooms that can accommodate the guests
    const properties = await prisma.property.findMany({
      where: {
        ...where,
        rooms: {
          some: {
            capacity: {
              gte: guests
            },
            isActive: true
          }
        }
      },
      include: {
        rooms: {
          where: {
            capacity: {
              gte: guests
            },
            isActive: true
          },
          select: {
            id: true,
            name: true,
            capacity: true,
            basePrice: true
          }
        },
        reviews: {
          select: {
            rating: true
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      },
      orderBy
    })

    // Filter properties that have available rooms for the date range
    const availableProperties = []
    
    for (const property of properties) {
      // Check if any room is available for the date range
      const hasAvailableRoom = await checkRoomAvailability(
        property.rooms.map(room => room.id),
        checkIn,
        checkOut
      )
      
      if (hasAvailableRoom) {
        availableProperties.push(property)
      }
    }

    return NextResponse.json({
      properties: availableProperties,
      total: availableProperties.length
    })

  } catch (error) {
    console.error('Search properties error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

async function checkRoomAvailability(roomIds: string[], checkIn: string, checkOut: string): Promise<boolean> {
  if (!checkIn || !checkOut) return true

  const startDate = new Date(checkIn)
  const endDate = new Date(checkOut)

  // Check for conflicting bookings
  const conflictingBookings = await prisma.booking.findFirst({
    where: {
      roomId: {
        in: roomIds
      },
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

  return !conflictingBookings
}
