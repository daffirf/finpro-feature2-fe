'use client'

import { useState, useEffect } from 'react'
import { formatCurrency, formatDate } from '@/lib/utils'

interface ReportData {
  totalRevenue: number
  totalBookings: number
  averageBookingValue: number
  monthlyRevenue: {
    month: string
    revenue: number
  }[]
  topProperties: {
    name: string
    revenue: number
    bookings: number
  }[]
}

export function TenantReports() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    fetchReportData()
  }, [dateRange])

  const fetchReportData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/tenant/reports?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`)
      const data = await response.json()
      
      if (response.ok) {
        setReportData(data.report)
      } else {
        setError(data.error || 'Gagal memuat laporan')
      }
    } catch (error) {
      setError('Terjadi kesalahan server')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDateRangeChange = (field: 'startDate' | 'endDate', value: string) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Laporan Penjualan</h2>
        
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dari Tanggal</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sampai Tanggal</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      ) : reportData ? (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-600">Total Pendapatan</p>
                  <p className="text-2xl font-bold text-blue-900">{formatCurrency(reportData.totalRevenue)}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-600">Total Pemesanan</p>
                  <p className="text-2xl font-bold text-green-900">{reportData.totalBookings}</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-purple-600">Rata-rata per Pemesanan</p>
                  <p className="text-2xl font-bold text-purple-900">{formatCurrency(reportData.averageBookingValue)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Revenue Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pendapatan Bulanan</h3>
            <div className="space-y-4">
              {reportData.monthlyRevenue.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{month.month}</span>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ 
                          width: `${(month.revenue / Math.max(...reportData.monthlyRevenue.map(m => m.revenue))) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <span className="font-semibold text-gray-900 w-24 text-right">
                      {formatCurrency(month.revenue)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Properties */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Properti Terlaris</h3>
            <div className="space-y-4">
              {reportData.topProperties.map((property, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">{property.name}</h4>
                    <p className="text-sm text-gray-600">{property.bookings} pemesanan</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(property.revenue)}</p>
                    <p className="text-sm text-gray-600">pendapatan</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Tidak ada data laporan untuk periode yang dipilih</p>
        </div>
      )}
    </div>
  )
}

