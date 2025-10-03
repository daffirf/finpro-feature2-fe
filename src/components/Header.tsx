'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { verifyToken } from '@/lib/auth'

export function Header() {
  const [user, setUser] = useState<any>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth-token='))
      ?.split('=')[1]

    if (token) {
      const userData = verifyToken(token)
      setUser(userData)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900">PropertyRent</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            <Link href="/search" className="text-gray-700 hover:text-blue-600 transition-colors">
              Cari Penginapan
            </Link>
            {user && (
              <>
                {user.role === 'TENANT' ? (
                  <Link href="/tenant" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Dashboard
                  </Link>
                ) : (
                  <Link href="/user/bookings" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Pesanan Saya
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Halo, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Daftar
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Beranda
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-blue-600 transition-colors">
                Cari Penginapan
              </Link>
              {user && (
                <>
                  {user.role === 'TENANT' ? (
                    <Link href="/tenant" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Dashboard
                    </Link>
                  ) : (
                    <Link href="/user/bookings" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Pesanan Saya
                    </Link>
                  )}
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

