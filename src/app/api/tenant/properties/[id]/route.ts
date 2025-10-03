import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const body = await request.json()
    const { isActive } = body
    const { id } = await params

    // Get property
    const property = await prisma.property.findUnique({
      where: { id }
    })

    if (!property) {
      return NextResponse.json(
        { error: 'Properti tidak ditemukan' },
        { status: 404 }
      )
    }

    if (property.tenantId !== tenant.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Update property
    const updatedProperty = await prisma.property.update({
      where: { id },
      data: {
        isActive: isActive
      }
    })

    return NextResponse.json({
      property: updatedProperty,
      message: `Properti berhasil ${isActive ? 'diaktifkan' : 'dinonaktifkan'}`
    })

  } catch (error) {
    console.error('Update property error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
