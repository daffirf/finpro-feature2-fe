'use client'

import { useState, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Camera, Upload, X, Loader2 } from 'lucide-react'
import { Alert } from '@/components/ui/alert'

interface AvatarUploadProps {
  currentAvatarUrl?: string | null
  userName: string
  onUpload: (file: File) => Promise<void>
  onRemove?: () => Promise<void>
  isUploading?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  editable?: boolean
}

export default function AvatarUpload({
  currentAvatarUrl,
  userName,
  onUpload,
  onRemove,
  isUploading = false,
  size = 'lg',
  editable = true,
}: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const validateFile = (file: File): boolean => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setError('Format file tidak didukung. Gunakan JPG, PNG, GIF, atau WebP.')
      return false
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      setError('Ukuran file terlalu besar. Maksimal 5MB.')
      return false
    }

    return true
  }

  const handleFileSelect = async (file: File) => {
    setError(null)

    if (!validateFile(file)) {
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    try {
      await onUpload(file)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengupload foto')
      setPreview(null)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleRemoveAvatar = async () => {
    if (onRemove) {
      setError(null)
      setPreview(null)
      try {
        await onRemove()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal menghapus foto')
      }
    }
  }

  const displayAvatar = preview || currentAvatarUrl

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Avatar Display */}
      <div className="relative group">
        <Avatar className={`${sizeClasses[size]} border-4 border-teal-100 transition-all duration-200 ${isDragging ? 'border-teal-500 scale-105' : ''}`}>
          {displayAvatar && (
            <AvatarImage src={displayAvatar} alt={userName} className="object-cover" />
          )}
          <AvatarFallback className="bg-gradient-to-br from-teal-500 to-teal-600 text-white text-2xl font-semibold">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>

        {/* Upload Overlay */}
        {editable && !isUploading && (
          <div
            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        )}

        {/* Loading Overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}

        {/* Remove Button */}
        {editable && displayAvatar && onRemove && !isUploading && (
          <button
            onClick={handleRemoveAvatar}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-colors duration-200"
            title="Hapus foto"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Upload Button */}
      {editable && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={isUploading}
          />
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="border-teal-300 text-teal-700 hover:bg-teal-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Mengupload...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                {displayAvatar ? 'Ganti Foto' : 'Upload Foto'}
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            JPG, PNG, GIF atau WebP. Maks. 5MB.
          </p>
        </>
      )}

      {/* Error Message */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <div className="text-sm text-red-700">{error}</div>
        </Alert>
      )}
    </div>
  )
}

