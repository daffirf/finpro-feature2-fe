'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/lib/validation'
import { api } from '@/lib/api'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{
    name: string
    email: string
    password: string
    phone?: string
    role: 'USER' | 'TENANT'
  }>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'USER'
    }
  })

  const onSubmit = async (data: { name: string; email: string; password: string; phone?: string; role: 'USER' | 'TENANT' }) => {
    setIsLoading(true)
    setError('')

    try {
      await api.post('/auth/register', data)
      setSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registrasi gagal')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Registrasi Berhasil!</h1>
              <p className="text-gray-600 mb-6">
                Akun Anda telah berhasil dibuat. Anda akan diarahkan ke halaman login.
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">P</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Buat Akun Baru</h1>
              <p className="text-gray-600 mt-2">Bergabunglah dengan kami hari ini!</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  {...register('password')}
                  type="password"
                  placeholder="Masukkan password Anda"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="Masukkan nomor telepon (opsional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Akun
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      {...register('role')}
                      type="radio"
                      value="USER"
                      className="mr-3"
                    />
                    <div>
                      <div className="font-semibold">Penyewa</div>
                      <div className="text-sm text-gray-600">Mencari penginapan</div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      {...register('role')}
                      type="radio"
                      value="TENANT"
                      className="mr-3"
                    />
                    <div>
                      <div className="font-semibold">Pemilik</div>
                      <div className="text-sm text-gray-600">Menyewakan properti</div>
                    </div>
                  </label>
                </div>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role.message as string}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Memproses...' : 'Daftar'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Sudah punya akun?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
