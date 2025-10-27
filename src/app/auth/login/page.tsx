'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/validation'
import { useLogin } from '@/hooks/auth'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react'
import { FormField } from '../../../components/login/FormField'
import { GoogleOAuthButton } from '@/components/GoogleOAuthButton'

interface LoginFormData {
  email: string
  password: string
}

export default function LoginPage() {
  const { login, isLoading, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Teal accent line */}
      <div className="h-1 bg-gradient-to-r from-teal-500 to-blue-600"></div>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-4 pb-6">
              <div className="flex justify-center">
                <Avatar className="h-20 w-20 border-4 border-teal-100">
                  <AvatarFallback className="bg-gradient-to-br from-teal-500 to-blue-600 text-white">
                    <LogIn className="w-10 h-10" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="text-center space-y-2">
                <CardTitle className="text-3xl font-bold text-gray-900">
                  Masuk ke Akun
                </CardTitle>
                <CardDescription className="text-base">
                  Selamat datang kembali! Silakan masuk untuk melanjutkan.
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
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="nama@email.com"
                  icon={Mail}
                  error={errors.email?.message}
                  required
                  register={register('email')}
                />

                <FormField
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Masukkan password"
                  icon={Lock}
                  error={errors.password?.message}
                  required
                  register={register('password')}
                />

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <Link 
                    href="/auth/forgot-password" 
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
                  >
                    Lupa password?
                  </Link>
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
                      Memproses...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" />
                      Masuk
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

              {/* Google OAuth */}
              <GoogleOAuthButton type="login" callbackUrl="/landing" />

              {/* Register Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  Belum punya akun?{' '}
                  <Link 
                    href="/auth/register" 
                    className="text-teal-600 hover:text-teal-700 font-semibold transition-colors"
                  >
                    Daftar sekarang
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Dengan masuk, Anda menyetujui{' '}
            <Link href="/terms" className="text-teal-600 hover:underline">
              Syarat & Ketentuan
            </Link>{' '}
            dan{' '}
            <Link href="/privacy" className="text-teal-600 hover:underline">
              Kebijakan Privasi
            </Link>{' '}
            kami.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
