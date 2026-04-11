import { restaurantApiClient } from '@/api/restaurantClient'
import type { MenuItem, RestaurantInfo } from '@/types/api'

export const restaurantService = {
  async getRestaurantInfo(): Promise<RestaurantInfo> {
    const response = await restaurantApiClient.get<RestaurantInfo>('/restaurant')
    return response.data
  },

  async getMenu(): Promise<MenuItem[]> {
    const response = await restaurantApiClient.get<MenuItem[]>('/menu')
    return response.data
  },
}
