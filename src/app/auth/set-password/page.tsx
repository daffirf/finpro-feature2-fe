'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSetPassword } from '@/hooks/auth'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Lock, AlertCircle, Loader2, CheckCircle2, KeyRound, Eye, EyeOff } from 'lucide-react'

export default function SetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')
  
  const { verifyToken, setPassword: setPasswordHook, isLoading, error: hookError, setError: clearError } = useSetPassword()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isValidToken, setIsValidToken] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [localError, setLocalError] = useState('')
  
  const error = hookError || localError

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setLocalError('Token verifikasi tidak ditemukan')
        setIsVerifying(false)
        return
      }
      try {
        const response = await verifyToken(token)
        if (response.valid) {
          setEmail(response.email)
          setIsValidToken(true)
        } else {
          setLocalError('Link verifikasi tidak valid')
        }
      } catch (err: any) {
        // Error already set by hook
      } finally {
        setIsVerifying(false)
      }
    }
    verify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setLocalError('')
    
    if (password.length < 6) {
      setLocalError('Password minimal 6 karakter')
      return
    }
    if (password !== confirmPassword) {
      setLocalError('Password tidak cocok')
      return
    }
    if (!token) {
      setLocalError('Token tidak valid')
      return
    }
    
    try {
      await setPasswordHook({ token, password })
      setIsSuccess(true)
      setTimeout(() => router.push('/auth/login'), 3000)
    } catch (err: any) {
      // Error already handled by hook
    }
  }

  // Unified layout wrapper
  const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="h-1 bg-gradient-to-r from-teal-500 to-blue-600"></div>
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="max-w-md w-full shadow-xl">
          <CardContent className="pt-8 pb-8">
            {children}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )

  if (isVerifying) {
    return (
      <LayoutWrapper>
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-teal-600 animate-spin mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900">Memverifikasi Email...</h1>
        </div>
      </LayoutWrapper>
    )
  }

  if (!isValidToken) {
    return (
      <LayoutWrapper>
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifikasi Gagal</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
            <Link href="/auth/register">Daftar Ulang</Link>
          </Button>
        </div>
      </LayoutWrapper>
    )
  }

  if (isSuccess) {
    return (
      <LayoutWrapper>
        <div className="text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Password Berhasil Dibuat! ✅</h1>
          <p className="text-gray-600 mb-4">Akun Anda telah diaktifkan</p>
          <Loader2 className="h-8 w-8 animate-spin text-teal-600 mx-auto" />
        </div>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <KeyRound className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Buat Password Anda</h1>
        <p className="text-sm text-teal-600 font-medium">{email}</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password *</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Konfirmasi Password *</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Masukkan ulang password"
              className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full bg-teal-600 hover:bg-teal-700">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Membuat Password...
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Buat Password
            </>
          )}
        </Button>
      </form>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Syarat:</strong> Min. 6 karakter, hindari info pribadi
        </p>
      </div>

      <p className="text-center text-xs text-gray-500 mt-4">
        Sudah punya password?{' '}
        <Link href="/auth/login" className="text-teal-600 hover:underline font-semibold">
          Login di sini
        </Link>
      </p>
    </LayoutWrapper>
  )
}

