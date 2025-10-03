import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

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

    // Build date filter
    const dateFilter: any = {}
    if (startDate) {
      dateFilter.gte = new Date(startDate)
    }
    if (endDate) {
      dateFilter.lte = new Date(endDate)
    }

    // Get bookings for the date range
    const bookings = await prisma.booking.findMany({
      where: {
        property: { tenantId: tenant.id },
        status: { in: ['CONFIRMED', 'COMPLETED'] },
        ...(Object.keys(dateFilter).length > 0 && {
          createdAt: dateFilter
        })
      },
      include: {
        property: {
          select: {
            name: true
          }
        }
      }
    })

    // Calculate stats
    const totalRevenue = bookings.reduce((sum, booking) => sum + Number(booking.totalPrice), 0)
    const totalBookings = bookings.length
    const averageBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0

    // Monthly revenue
    const monthlyRevenue = bookings.reduce((acc, booking) => {
      const month = booking.createdAt.toISOString().slice(0, 7) // YYYY-MM
      const existing = acc.find(item => item.month === month)
      if (existing) {
        existing.revenue += Number(booking.totalPrice)
      } else {
        acc.push({
          month,
          revenue: Number(booking.totalPrice)
        })
      }
      return acc
    }, [] as { month: string; revenue: number }[])

    // Top properties
    const propertyStats = bookings.reduce((acc, booking) => {
      const propertyName = booking.property.name
      const existing = acc.find(item => item.name === propertyName)
      if (existing) {
        existing.revenue += Number(booking.totalPrice)
        existing.bookings += 1
      } else {
        acc.push({
          name: propertyName,
          revenue: Number(booking.totalPrice),
          bookings: 1
        })
      }
      return acc
    }, [] as { name: string; revenue: number; bookings: number }[])

    const topProperties = propertyStats
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)

    const report = {
      totalRevenue,
      totalBookings,
      averageBookingValue,
      monthlyRevenue: monthlyRevenue.sort((a, b) => a.month.localeCompare(b.month)),
      topProperties
    }

    return NextResponse.json({
      report
    })

  } catch (error) {
    console.error('Get tenant reports error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

