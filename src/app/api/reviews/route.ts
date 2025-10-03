import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { createReviewSchema } from '@/lib/validation'

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
    const validatedData = createReviewSchema.parse(body)

    // Check if booking exists and belongs to user
    const booking = await prisma.booking.findUnique({
      where: { id: validatedData.bookingId },
      include: {
        property: true
      }
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Pemesanan tidak ditemukan' },
        { status: 404 }
      )
    }

    if (booking.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    if (booking.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Hanya bisa memberikan review untuk pemesanan yang sudah selesai' },
        { status: 400 }
      )
    }

    // Check if review already exists
    const existingReview = await prisma.review.findUnique({
      where: { bookingId: validatedData.bookingId }
    })

    if (existingReview) {
      return NextResponse.json(
        { error: 'Review sudah pernah diberikan untuk pemesanan ini' },
        { status: 400 }
      )
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        userId: user.id,
        propertyId: booking.propertyId,
        bookingId: validatedData.bookingId,
        rating: validatedData.rating,
        comment: validatedData.comment
      },
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    })

    return NextResponse.json({
      review,
      message: 'Review berhasil ditambahkan'
    }, { status: 201 })

  } catch (error: any) {
    console.error('Create review error:', error)
    
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

