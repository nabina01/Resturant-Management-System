import { apiClient } from '../client'
import { mapBackendAddress, toBackendAddressRequest } from '@/api/mappers'
import type { Address, BackendAddress, CreateAddressRequest, UpdateAddressRequest } from '@/types/api'

export const addressService = {
  async getAddresses(): Promise<Address[]> {
    const response = await apiClient.get<BackendAddress[]>('/address')
    return response.data.map(mapBackendAddress)
  },

  async createAddress(data: CreateAddressRequest): Promise<Address> {
    const response = await apiClient.post<BackendAddress>('/address', toBackendAddressRequest(data))
    return mapBackendAddress(response.data)
  },

  async updateAddress(data: UpdateAddressRequest): Promise<Address> {
    const { id, ...rest } = data
    const response = await apiClient.put<BackendAddress>(`/address/${id}`, toBackendAddressRequest(rest))
    return mapBackendAddress(response.data)
  },

  async deleteAddress(id: string): Promise<void> {
    await apiClient.delete(`/address/${id}`)
  },

  async setDefaultAddress(id: string): Promise<Address> {
    const response = await apiClient.patch<BackendAddress>(`/address/default/${id}`)
    return mapBackendAddress(response.data)
  },
}
