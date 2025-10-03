'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createReviewSchema } from '@/lib/validation'

interface ReviewFormProps {
  bookingId: string
  propertyId: string
  onSuccess: () => void
}

export function ReviewForm({ bookingId, propertyId, onSuccess }: ReviewFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<{
    bookingId: string
    rating: number
    comment: string
  }>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      bookingId,
      rating: 5
    }
  })

  const watchedRating = watch('rating')

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          onSuccess()
        }, 2000)
      } else {
        setError(result.error || 'Gagal menambahkan review')
      }
    } catch (error) {
      setError('Terjadi kesalahan server')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-900 mb-2">Review Berhasil Ditambahkan!</h3>
        <p className="text-green-700">Terima kasih atas review Anda.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Berikan Rating (1-5 bintang)
        </label>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => register('rating').onChange({ target: { value: star } })}
              className="focus:outline-none"
            >
              <svg
                className={`w-8 h-8 ${
                  star <= watchedRating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {watchedRating} dari 5 bintang
          </span>
        </div>
        {errors.rating && (
          <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
        )}
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Komentar
        </label>
        <textarea
          {...register('comment')}
          rows={4}
          placeholder="Bagikan pengalaman Anda menginap di properti ini..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.comment && (
          <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Mengirim...' : 'Kirim Review'}
      </button>

      {/* Terms */}
      <p className="text-xs text-gray-500 text-center">
        Review yang Anda berikan akan membantu pengguna lain dalam memilih penginapan.
      </p>
    </form>
  )
}
