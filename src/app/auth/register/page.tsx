'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/lib/validation'
import { useRegister } from '@/hooks/auth'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  UserPlus, 
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle, 
  Loader2,
  CheckCircle2
} from 'lucide-react'
import { FormField } from '../../../components/register/FormField'
import { RoleSelection } from '../../../components/register/RoleSelection'

interface RegisterFormData {
  name: string
  email: string
  password: string
  phone?: string
  role: 'USER' | 'TENANT'
}

export default function RegisterPage() {
  const [success, setSuccess] = useState(false)
  const { register: registerUser, isLoading, error } = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'USER'
    }
  })

  const selectedRole = watch('role')

  const handleRoleChange = (value: string) => {
    setValue('role', value as 'USER' | 'TENANT', { shouldValidate: true })
  }

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Set success state untuk menampilkan loading screen
      setSuccess(true)
      // Register akan otomatis login dan redirect
      await registerUser(data)
    } catch (error) {
      console.error('Registration error:', error)
      setSuccess(false)
      // Error akan ditampilkan oleh error state dari useRegister
    }
  }
 
  // Loading state saat proses registrasi dan auto-login
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
                  <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-teal-600 animate-bounce" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Registrasi Berhasil! 🎉
                </h1>
                <p className="text-gray-600 mb-8">
                  Akun Anda berhasil dibuat. Sedang memproses login otomatis...
                </p>
                <div className="flex justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  // Registration Form
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Teal accent line */}
      <div className="h-1 bg-gradient-to-r from-teal-500 to-blue-600"></div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-4 pb-6">
              <div className="flex justify-center">
                <Avatar className="h-20 w-20 border-4 border-teal-100">
                  <AvatarFallback className="bg-gradient-to-br from-teal-500 to-blue-600 text-white">
                    <UserPlus className="w-10 h-10" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="text-center space-y-2">
                <CardTitle className="text-3xl font-bold text-gray-900">
                  Buat Akun Baru
                </CardTitle>
                <CardDescription className="text-base">
                  Bergabunglah dengan kami dan temukan penginapan terbaik!
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
                  id="name"
                  label="Nama Lengkap"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  icon={User}
                  error={errors.name?.message}
                  required
                  register={register('name')}
                />

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
                  placeholder="Minimal 6 karakter"
                  icon={Lock}
                  error={errors.password?.message}
                  required
                  register={register('password')}
                />

                <FormField
                  id="phone"
                  label="Nomor Telepon"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  icon={Phone}
                  error={errors.phone?.message}
                  optional
                  register={register('phone')}
                />

                <RoleSelection
                  selectedRole={selectedRole}
                  error={errors.role?.message}
                  onValueChange={handleRoleChange}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Membuat Akun...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-5 w-5" />
                      Daftar Sekarang
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

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  Sudah punya akun?{' '}
                  <Link 
                    href="/auth/login" 
                    className="text-teal-600 hover:text-teal-700 font-semibold transition-colors"
                  >
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Dengan mendaftar, Anda menyetujui{' '}
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
