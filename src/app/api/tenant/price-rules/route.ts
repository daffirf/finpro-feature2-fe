import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { z } from 'zod'

const priceRuleSchema = z.object({
  propertyId: z.string().min(1, 'Property ID harus diisi'),
  name: z.string().min(2, 'Nama aturan minimal 2 karakter'),
  startDate: z.string().min(1, 'Tanggal mulai harus diisi'),
  endDate: z.string().min(1, 'Tanggal selesai harus diisi'),
  priceType: z.enum(['PERCENTAGE', 'FIXED']),
  value: z.number().positive('Nilai harus positif')
})

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
    const validatedData = priceRuleSchema.parse(body)

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

    // Validate date range
    const startDate = new Date(validatedData.startDate)
    const endDate = new Date(validatedData.endDate)

    if (startDate >= endDate) {
      return NextResponse.json(
        { error: 'Tanggal selesai harus setelah tanggal mulai' },
        { status: 400 }
      )
    }

    // Create price rule
    const priceRule = await prisma.priceRule.create({
      data: {
        propertyId: validatedData.propertyId,
        name: validatedData.name,
        startDate,
        endDate,
        priceType: validatedData.priceType,
        value: validatedData.value
      }
    })

    return NextResponse.json({
      priceRule,
      message: 'Aturan harga berhasil ditambahkan'
    }, { status: 201 })

  } catch (error: any) {
    console.error('Create price rule error:', error)
    
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

