import { apiClient } from '../client'
import { toBackendUpdateProfileRequest } from '@/api/mappers'
import type { BackendUser, UpdateProfileRequest } from '@/types/api'

export const userService = {
  async getProfile(): Promise<BackendUser> {
    const response = await apiClient.get<BackendUser>('/profile')
    return response.data
  },

  async updateProfile(data: UpdateProfileRequest): Promise<BackendUser> {
    const response = await apiClient.put<BackendUser>('/update', toBackendUpdateProfileRequest(data))
    return response.data
  },
}
