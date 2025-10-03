'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { validateFile } from '@/lib/validation'

interface PaymentFormProps {
  bookingId: string
  onSuccess: () => void
}

export function PaymentForm({ bookingId, onSuccess }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validation = validateFile(file)
      if (!validation.valid) {
        setError(validation.error || 'File tidak valid')
        return
      }
      
      setSelectedFile(file)
      setError('')
      
      // Create preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const onSubmit = async (data: any) => {
    if (!selectedFile) {
      setError('Pilih file bukti pembayaran')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('bookingId', bookingId)

      const response = await fetch('/api/bookings/payment-proof', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (response.ok) {
        onSuccess()
      } else {
        setError(result.error || 'Gagal mengupload bukti pembayaran')
      }
    } catch (error) {
      setError('Terjadi kesalahan server')
    } finally {
      setIsLoading(false)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Bukti Pembayaran
        </label>
        
        {!selectedFile ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="hidden"
              id="payment-proof"
            />
            <label
              htmlFor="payment-proof"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div className="text-sm text-gray-600">
                <span className="font-medium text-blue-600">Klik untuk upload</span> atau drag & drop
              </div>
              <div className="text-xs text-gray-500">
                PNG, JPG maksimal 1MB
              </div>
            </label>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="relative h-48 rounded-lg overflow-hidden border">
              <img
                src={previewUrl || ''}
                alt="Preview bukti pembayaran"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{selectedFile.name}</span>
              <button
                type="button"
                onClick={removeFile}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payment Instructions */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Instruksi Pembayaran:</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p>1. Transfer ke rekening berikut:</p>
          <p className="font-mono bg-white p-2 rounded border">BCA: 1234567890 a.n. PropertyRent</p>
          <p>2. Upload bukti transfer di form ini</p>
          <p>3. Tunggu konfirmasi dari pemilik properti</p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !selectedFile}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Mengupload...' : 'Upload Bukti Pembayaran'}
      </button>

      {/* Terms */}
      <p className="text-xs text-gray-500 text-center">
        Dengan mengupload bukti pembayaran, Anda menyetujui bahwa informasi yang diberikan adalah benar.
      </p>
    </form>
  )
}

