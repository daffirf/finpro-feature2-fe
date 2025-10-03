import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

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
    if (!user || user.role !== 'TENANT') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { response } = body

    if (!response || response.trim().length === 0) {
      return NextResponse.json(
        { error: 'Response tidak boleh kosong' },
        { status: 400 }
      )
    }

    // Check if review exists and belongs to tenant's property
    const review = await prisma.review.findUnique({
      where: { id: id },
      include: {
        property: {
          include: {
            tenant: true
          }
        }
      }
    })

    if (!review) {
      return NextResponse.json(
        { error: 'Review tidak ditemukan' },
        { status: 404 }
      )
    }

    if (review.property.tenant.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Update review with response
    const updatedReview = await prisma.review.update({
      where: { id: id },
      data: { response },
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    })

    return NextResponse.json({
      review: updatedReview,
      message: 'Response berhasil ditambahkan'
    })

  } catch (error) {
    console.error('Add review response error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

