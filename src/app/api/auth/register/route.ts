import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'
import { registerSchema } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        phone: validatedData.phone,
        role: validatedData.role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    // If role is TENANT, create tenant profile
    if (validatedData.role === 'TENANT') {
      await prisma.tenant.create({
        data: {
          userId: user.id,
          businessName: `${user.name}'s Business`,
          address: '',
          phone: validatedData.phone || '',
          description: ''
        }
      })
    }

    return NextResponse.json({
      message: 'Registrasi berhasil',
      user
    }, { status: 201 })

  } catch (error: any) {
    console.error('Register error:', error)
    
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

