import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserData } from '@/types/dashboard'

export function useDashboardAuth() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUser = () => {
      try {
        const token = localStorage.getItem('token')
        const userStr = localStorage.getItem('user')

        if (!token || !userStr) {
          router.push('/auth/login')
          return
        }

        const userData = JSON.parse(userStr)
        setUser(userData)
      } catch (err) {
        console.error('Error loading user data:', err)
        setError('Failed to load user data')
        router.push('/auth/login')
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [router])

  return { user, isLoading, error }
}

