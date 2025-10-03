import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const property = await prisma.property.findUnique({
      where: {
        id: id,
        isActive: true
      },
      include: {
        rooms: {
          where: {
            isActive: true
          },
          select: {
            id: true,
            name: true,
            description: true,
            capacity: true,
            basePrice: true,
            images: true
          }
        },
        reviews: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      }
    })

    if (!property) {
      return NextResponse.json(
        { error: 'Properti tidak ditemukan' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      property
    })

  } catch (error) {
    console.error('Get property error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

