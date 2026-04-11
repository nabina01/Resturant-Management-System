import axios from 'axios'

const RESTAURANT_API_BASE_URL = import.meta.env.VITE_RESTAURANT_API_URL || 'http://localhost:3001/api'

export const restaurantApiClient = axios.create({
  baseURL: RESTAURANT_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default restaurantApiClient
