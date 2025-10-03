import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { createPropertySchema } from '@/lib/validation'

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
    if (!user || user.role !== 'TENANT') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validatedData = createPropertySchema.parse(body)

    // Get tenant info
    const tenant = await prisma.tenant.findUnique({
      where: { userId: user.id }
    })

    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 404 }
      )
    }

    // Create property
    const property = await prisma.property.create({
      data: {
        tenantId: tenant.id,
        name: validatedData.name,
        description: validatedData.description,
        address: validatedData.address,
        city: validatedData.city,
        basePrice: validatedData.basePrice,
        amenities: validatedData.amenities || [],
        images: validatedData.images || []
      },
      include: {
        _count: {
          select: {
            rooms: true,
            bookings: true
          }
        }
      }
    })

    return NextResponse.json({
      property,
      message: 'Properti berhasil ditambahkan'
    }, { status: 201 })

  } catch (error: any) {
    console.error('Create property error:', error)
    
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