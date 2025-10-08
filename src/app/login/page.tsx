'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/validation'
import { api, setAuthToken } from '@/lib/api'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{
    email: string
    password: string
  }>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    setError('')

    try {
      const result = await api.post<{ token: string; user: { role: string } }>('/auth/login', data)

      // Save token to localStorage
      setAuthToken(result.token)

      // Redirect based on user role
      if (result.user.role === 'TENANT') {
        router.push('/tenant')
      } else {
        router.push('/')
      }
      
      // Refresh page to update header
      window.location.reload()
    } catch (error: any) {
      setError(error.message || 'Login gagal')
    } finally {
      setIsLoading(false)
    }
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
              <h1 className="text-3xl font-bold text-gray-900">Masuk ke Akun</h1>
              <p className="text-gray-600 mt-2">Selamat datang kembali!</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Belum punya akun?{' '}
                <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Daftar di sini
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
