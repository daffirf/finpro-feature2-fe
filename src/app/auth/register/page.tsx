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
import { GoogleOAuthButton } from '@/components/GoogleOAuthButton'

interface RegisterFormData {
  name: string
  email: string
  role: 'user' | 'tenant'
}

export default function RegisterPage() {
  const [success, setSuccess] = useState(false)
  const { register: registerUser, isLoading, error } = useRegister()

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    role: 'user'
  })
  
  const [registeredEmail, setRegisteredEmail] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await registerUser(formData)
      setRegisteredEmail(formData.email)
      setSuccess(true)
    } catch (error) {
      console.error('Registration error:', error)
    }
  }
 
  // Success state - Check Your Email
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
                  <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center">
                    <Mail className="w-12 h-12 text-teal-600" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Cek Email Anda! 📧
                </h1>
                <p className="text-gray-600 mb-2">
                  Kami telah mengirimkan link verifikasi ke
                </p>
                <p className="text-lg font-semibold text-teal-600 mb-6">
                  {registeredEmail}
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-gray-700">
                    <strong>Langkah selanjutnya:</strong>
                  </p>
                  <ol className="text-sm text-gray-600 mt-2 space-y-1 list-decimal list-inside">
                    <li>Buka inbox email Anda</li>
                    <li>Klik link verifikasi yang kami kirim</li>
                    <li>Buat password untuk akun Anda</li>
                    <li>Login dan mulai menggunakan layanan</li>
                  </ol>
                </div>
                <p className="text-xs text-gray-500 mb-6">
                  Tidak menerima email? Cek folder spam atau tunggu beberapa menit
                </p>
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">
                    Kembali ke Login
                  </Button>
                </Link>
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

              <form onSubmit={onSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Masukkan nama lengkap"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Daftar Sebagai <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value as 'user' | 'tenant'})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="user">🏠 Guest (Memesan Penginapan)</option>
                    <option value="tenant">🏢 Pemilik Properti (Menyewakan)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.role === 'user' 
                      ? 'Sebagai Guest, Anda dapat mencari dan memesan penginapan'
                      : 'Sebagai Pemilik Properti, Anda dapat mendaftarkan properti untuk disewakan'}
                  </p>
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

              {/* Google OAuth */}
              <GoogleOAuthButton type="register" callbackUrl="/dashboard" />

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
          <div className="mt-6 space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 text-center">
                <strong>📧 Tidak perlu password sekarang!</strong>
              </p>
              <p className="text-xs text-gray-600 mt-2 text-center">
                Anda akan menerima email untuk memverifikasi akun dan membuat password
              </p>
            </div>
            
            <p className="text-center text-sm text-gray-500">
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
