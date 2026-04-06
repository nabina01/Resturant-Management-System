import { create } from 'zustand'
import type { BackendUser } from '@/types/api'

interface AuthState {
  token: string | null
  user: BackendUser | null
  isLoading: boolean
  setToken: (token: string | null) => void
  setUser: (user: BackendUser | null) => void
  setIsLoading: (loading: boolean) => void
  logout: () => void
  setAuth: (token: string, user: BackendUser) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null,
  isLoading: false,

  setToken: (token) => {
    set({ token })
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  },

  setUser: (user) => {
    set({ user })
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  },

  setIsLoading: (loading) => {
    set({ isLoading: loading })
  },

  logout: () => {
    set({ token: null, user: null })
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  setAuth: (token, user) => {
    set({ token, user })
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  },
}))
