'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { TenantDashboard } from '@/components/TenantDashboard'

export default function TenantPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in and is a tenant
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth-token='))
      ?.split('=')[1]

    if (token) {
      // Verify token and check role
      fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user && data.user.role === 'TENANT') {
          setUser(data.user)
        } else {
          window.location.href = '/unauthorized'
        }
      })
      .catch(() => {
        window.location.href = '/login'
      })
      .finally(() => {
        setIsLoading(false)
      })
    } else {
      window.location.href = '/login'
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <TenantDashboard />
      </main>

      <Footer />
    </div>
  )
}

