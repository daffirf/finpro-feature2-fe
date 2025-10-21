import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

interface VerifyTokenResponse {
  valid: boolean
  email: string
}

interface SetPasswordData {
  token: string
  password: string
}

export function useSetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  /**
   * Verify email verification token
   */
  const verifyToken = async (token: string): Promise<VerifyTokenResponse> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await api.get<VerifyTokenResponse>(`/auth/verify-email?token=${token}`)
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Link verifikasi tidak valid atau sudah expired'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Set password for verified account
   */
  const setPassword = async (data: SetPasswordData): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      await api.post('/auth/set-password', {
        token: data.token,
        password: data.password
      })

      // Password set successfully - no auto-login
      // User must login manually with their new credentials
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal membuat password'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Clear error message
   */
  const clearError = () => {
    setError(null)
  }

  return {
    verifyToken,
    setPassword,
    isLoading,
    error,
    setError: clearError
  }
}

