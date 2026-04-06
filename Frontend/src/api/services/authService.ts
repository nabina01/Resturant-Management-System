import { apiClient } from '../client'
import { toBackendRegisterRequest } from '@/api/mappers'
import type {
  AuthResponse,
  BackendAuthResponse,
  BackendRefreshTokenResponse,
  BackendUser,
  LoginRequest,
  RefreshTokenResponse,
  RegisterRequest,
} from '@/types/api'

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<BackendAuthResponse>('/login', data)
    return {
      access_token: response.data.accessToken,
      user: response.data.user,
    }
  },

  async register(data: RegisterRequest): Promise<BackendUser> {
    const response = await apiClient.post<BackendUser>('/register', toBackendRegisterRequest(data))
    return response.data
  },

  async logout(): Promise<void> {
    await apiClient.post('/logout')
  },

  async refreshToken(): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<BackendRefreshTokenResponse>('/refresh-token')
    return { access_token: response.data.accessToken }
  },

  async getCurrentUser(): Promise<BackendUser> {
    const response = await apiClient.get<BackendUser>('/profile')
    return response.data
  },
}
