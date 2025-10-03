import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { createBookingSchema } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = createBookingSchema.parse(body)

    // Check if room is available
    const isAvailable = await checkRoomAvailability(
      validatedData.roomId,
      validatedData.checkIn,
      validatedData.checkOut
    )

    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Kamar tidak tersedia untuk tanggal yang dipilih' },
        { status: 400 }
      )
    }

    // Calculate total price
    const checkInDate = new Date(validatedData.checkIn)
    const checkOutDate = new Date(validatedData.checkOut)
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    
    // Get room base price
    const room = await prisma.room.findUnique({
      where: { id: validatedData.roomId },
      select: { basePrice: true }
    })
    
    if (!room) {
      return NextResponse.json(
        { error: 'Room tidak ditemukan' },
        { status: 404 }
      )
    }
    
    const totalPrice = Number(room.basePrice) * nights

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        propertyId: validatedData.propertyId,
        roomId: validatedData.roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: validatedData.guests,
        totalPrice: totalPrice,
        notes: validatedData.notes || null,
        status: 'PENDING_PAYMENT'
      },
      include: {
        property: {
          select: {
            name: true,
            address: true
          }
        },
        room: {
          select: {
            name: true,
            capacity: true
          }
        }
      }
    })

    return NextResponse.json({
      booking,
      message: 'Pemesanan berhasil dibuat'
    }, { status: 201 })

  } catch (error: any) {
    console.error('Create booking error:', error)
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Data tidak valid', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

async function checkRoomAvailability(roomId: string, checkIn: string, checkOut: string): Promise<boolean> {
  const startDate = new Date(checkIn)
  const endDate = new Date(checkOut)

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
