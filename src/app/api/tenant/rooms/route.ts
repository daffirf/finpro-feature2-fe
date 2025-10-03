import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { createRoomSchema } from '@/lib/validation'

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
    const validatedData = createRoomSchema.parse(body)

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

    // Check if property belongs to tenant
    const property = await prisma.property.findUnique({
      where: { id: validatedData.propertyId }
    })

    if (!property || property.tenantId !== tenant.id) {
      return NextResponse.json(
        { error: 'Properti tidak ditemukan atau tidak memiliki akses' },
        { status: 404 }
      )
    }

    // Create room
    const room = await prisma.room.create({
      data: {
        propertyId: validatedData.propertyId,
        name: validatedData.name,
        description: validatedData.description,
        capacity: validatedData.capacity,
        basePrice: validatedData.basePrice,
        images: validatedData.images || []
      }
    })

    return NextResponse.json({
      room,
      message: 'Kamar berhasil ditambahkan'
    }, { status: 201 })

  } catch (error: any) {
    console.error('Create room error:', error)
    
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

