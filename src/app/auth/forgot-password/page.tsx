'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, AlertCircle, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react'

const forgotPasswordSchema = z.object({
  email: z.string().email('Email tidak valid')
})

interface ForgotPasswordFormData {
  email: string
}

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const { api } = await import('@/lib/api')
      await api.post('/auth/forgot-password', data)
      setSuccess(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal mengirim link reset password. Silakan coba lagi.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="h-1 bg-gradient-to-r from-teal-500 to-blue-600"></div>
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <Card className="max-w-md w-full shadow-xl">
            <CardContent className="pt-8 pb-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Terkirim! 📧</h1>
              <p className="text-gray-600 mb-6">Link reset password telah dikirim ke email Anda.</p>
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 mb-3">
                <Link href="/auth/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali ke Login
                </Link>
              </Button>
              <p className="text-sm text-gray-600">
                Tidak menerima email?{' '}
                <button onClick={() => setSuccess(false)} className="text-teal-600 hover:underline font-semibold">
                  Kirim ulang
                </button>
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="h-1 bg-gradient-to-r from-teal-500 to-blue-600"></div>
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="max-w-md w-full shadow-xl">
          <CardContent className="pt-8 pb-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-teal-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Lupa Password?</h1>
              <p className="text-sm text-gray-600">Masukkan email untuk reset password</p>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  className={errors.email ? 'border-red-500' : ''}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isLoading} className="w-full bg-teal-600 hover:bg-teal-700">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  'Kirim Link Reset'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/auth/login" className="text-sm text-gray-600 hover:text-teal-600 inline-flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Login
              </Link>
            </div>

            <p className="text-xs text-center text-gray-500 mt-4">
              💡 Cek folder spam jika tidak menerima email
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

