'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const priceRuleSchema = z.object({
  name: z.string().min(2, 'Nama aturan minimal 2 karakter'),
  startDate: z.string().min(1, 'Tanggal mulai harus diisi'),
  endDate: z.string().min(1, 'Tanggal selesai harus diisi'),
  priceType: z.enum(['PERCENTAGE', 'FIXED']),
  value: z.number().positive('Nilai harus positif')
})

interface PriceRuleFormProps {
  propertyId: string
  onSuccess: () => void
  onCancel: () => void
}

export function PriceRuleForm({ propertyId, onSuccess, onCancel }: PriceRuleFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<{
    name: string
    startDate: string
    endDate: string
    priceType: 'PERCENTAGE' | 'FIXED'
    value: number
  }>({
    resolver: zodResolver(priceRuleSchema),
    defaultValues: {
      priceType: 'PERCENTAGE'
    }
  })

  const watchedPriceType = watch('priceType')

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/tenant/price-rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (response.ok) {
        onSuccess()
      } else {
        setError(result.error || 'Gagal menambahkan aturan harga')
      }
    } catch (error) {
      setError('Terjadi kesalahan server')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Tambah Aturan Harga</h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Aturan *
              </label>
              <input
                {...register('name')}
                type="text"
                placeholder="Contoh: Hari Libur Nasional"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Mulai *
                </label>
                <input
                  {...register('startDate')}
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Selesai *
                </label>
                <input
                  {...register('endDate')}
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Aturan *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    {...register('priceType')}
                    type="radio"
                    value="PERCENTAGE"
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Persentase</div>
                    <div className="text-sm text-gray-600">Naik/turun berdasarkan %</div>
                  </div>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    {...register('priceType')}
                    type="radio"
                    value="FIXED"
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Harga Tetap</div>
                    <div className="text-sm text-gray-600">Harga tetap per malam</div>
                  </div>
                </label>
              </div>
              {errors.priceType && (
                <p className="mt-1 text-sm text-red-600">{errors.priceType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nilai *
              </label>
              <div className="flex items-center space-x-2">
                <input
                  {...register('value', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  placeholder={watchedPriceType === 'PERCENTAGE' ? '10' : '500000'}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-sm text-gray-600">
                  {watchedPriceType === 'PERCENTAGE' ? '%' : 'IDR'}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {watchedPriceType === 'PERCENTAGE' 
                  ? 'Masukkan persentase (contoh: 10 untuk naik 10%)'
                  : 'Masukkan harga tetap per malam'
                }
              </p>
              {errors.value && (
                <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Menyimpan...' : 'Simpan Aturan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
