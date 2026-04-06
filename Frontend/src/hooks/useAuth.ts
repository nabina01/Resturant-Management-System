import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { authService } from '@/api/services/authService'
import type { LoginRequest, RegisterRequest } from '@/types/api'

export const useAuth = () => {
  const navigate = useNavigate()
  const { token, user, isLoading, setAuth, setIsLoading, logout: storeLogout } = useAuthStore()

  const login = useCallback(
    async (data: LoginRequest) => {
      setIsLoading(true)
      try {
        const response = await authService.login(data)
        setAuth(response.access_token, response.user)
        navigate('/dashboard')
        return { success: true }
      } catch (error: any) {
        const message = error.response?.data?.message || 'Login failed'
        return { success: false, error: message }
      } finally {
        setIsLoading(false)
      }
    },
    [setAuth, setIsLoading, navigate]
  )

  const register = useCallback(
    async (data: RegisterRequest) => {
      setIsLoading(true)
      try {
        await authService.register(data)
        navigate('/login')
        return { success: true }
      } catch (error: any) {
        const message = error.response?.data?.message || 'Registration failed'
        return { success: false, error: message }
      } finally {
        setIsLoading(false)
      }
    },
    [setIsLoading, navigate]
  )

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      storeLogout()
      navigate('/login')
    }
  }, [storeLogout, navigate])

  return {
    token,
    user,
    isLoading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  }
}
