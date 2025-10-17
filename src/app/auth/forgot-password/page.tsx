'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Mail, KeyRound, AlertCircle, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react'

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

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // TODO: Replace with actual API call
      // await api.post('/auth/forgot-password', data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSuccess(true)
    } catch (err) {
      setError('Gagal mengirim link reset password. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="h-1 bg-gradient-to-r from-teal-500 to-blue-600"></div>
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl border-0">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Email Terkirim! 📧
                </h1>
                <p className="text-gray-600 mb-6">
                  Kami telah mengirim link reset password ke email Anda. Silakan cek inbox atau folder spam Anda.
                </p>
                <div className="space-y-3">
                  <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                    <Link href="/auth/login">
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Kembali ke Login
                    </Link>
                  </Button>
                  <p className="text-sm text-gray-600">
                    Tidak menerima email?{' '}
                    <button
                      onClick={() => setSuccess(false)}
                      className="text-teal-600 hover:text-teal-700 font-semibold"
                    >
                      Kirim ulang
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Teal accent line */}
      <div className="h-1 bg-gradient-to-r from-teal-500 to-blue-600"></div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-4 pb-6">
              <div className="flex justify-center">
                <Avatar className="h-20 w-20 border-4 border-teal-100">
                  <AvatarFallback className="bg-gradient-to-br from-teal-500 to-blue-600 text-white">
                    <KeyRound className="w-10 h-10" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="text-center space-y-2">
                <CardTitle className="text-3xl font-bold text-gray-900">
                  Lupa Password?
                </CardTitle>
                <CardDescription className="text-base">
                  Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      className={`pl-10 h-12 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-teal-500'}`}
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-5 w-5" />
                      Kirim Link Reset
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Atau</span>
                </div>
              </div>

              {/* Back to Login */}
              <div className="text-center">
                <Link 
                  href="/auth/login" 
                  className="text-gray-600 hover:text-teal-600 font-medium transition-colors inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Login
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Additional Help */}
          <div className="text-center mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-700">
              💡 <strong>Tips:</strong> Jika tidak menerima email, cek folder spam atau pastikan email Anda sudah terdaftar.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

