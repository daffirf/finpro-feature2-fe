'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  UserPlus, 
  Home,
  Building2,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Teal accent line */}
      <div className="h-1 bg-gradient-to-r from-teal-500 to-blue-600"></div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Avatar className="h-24 w-24 border-4 border-teal-100">
                <AvatarFallback className="bg-gradient-to-br from-teal-500 to-blue-600 text-white">
                  <UserPlus className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bergabung dengan Kami
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pilih jenis akun yang sesuai dengan kebutuhan Anda
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Guest/User Card */}
            <Card className="shadow-xl border-2 border-gray-200 hover:border-teal-500 transition-all hover:shadow-2xl group">
              <CardHeader className="space-y-4 pb-6">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Home className="w-10 h-10 text-teal-600" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Guest
                  </CardTitle>
                  <CardDescription className="text-base">
                    Untuk Anda yang ingin memesan penginapan
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Cari dan bandingkan penginapan terbaik
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Pesan dengan mudah dan aman
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Berikan review dan rating
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Kelola riwayat booking Anda
                    </p>
                  </div>
                </div>

                <Link href="/auth/register/user" className="block">
                  <Button
                    className="w-full h-12 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all"
                  >
                    Daftar Sebagai Guest
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Tenant/Property Owner Card */}
            <Card className="shadow-xl border-2 border-gray-200 hover:border-purple-500 transition-all hover:shadow-2xl group">
              <CardHeader className="space-y-4 pb-6">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 className="w-10 h-10 text-purple-600" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Pemilik Properti
                  </CardTitle>
                  <CardDescription className="text-base">
                    Untuk Anda yang ingin menyewakan properti
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Daftarkan properti Anda untuk disewakan
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Atur harga dan ketersediaan kamar
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Kelola booking dan tamu dengan mudah
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Lihat analitik dan laporan pendapatan
                    </p>
                  </div>
                </div>

                <Link href="/auth/register/tenant" className="block">
                  <Button
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all"
                  >
                    Daftar Sebagai Pemilik Properti
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
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
      </main>

      <Footer />
    </div>
  )
}
