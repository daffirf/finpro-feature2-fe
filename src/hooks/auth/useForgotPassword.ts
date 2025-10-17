import { useState } from 'react'
// import { api } from '@/lib/api' // Uncomment when ready for API

export interface ForgotPasswordData {
  email: string
}

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const requestReset = async (data: ForgotPasswordData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/forgot-password', data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSuccess(true)
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Gagal mengirim email reset password'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setError(null)
    setSuccess(false)
  }

  return {
    requestReset,
    reset,
    isLoading,
    error,
    success
  }
}

