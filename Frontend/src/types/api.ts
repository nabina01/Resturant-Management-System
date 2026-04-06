export interface AuthResponse {
  access_token: string
  user: BackendUser
}

export interface RefreshTokenResponse {
  access_token: string
}

export interface BackendUser {
  id: string
  email: string
  firstName?: string | null
  lastName?: string | null
  phone?: string | null
  createdAt: string
  updatedAt: string
}

export interface BackendAuthResponse {
  accessToken: string
  user: BackendUser
}

export interface BackendRefreshTokenResponse {
  accessToken: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  phone?: string
}

export interface UpdateProfileRequest {
  name?: string
  phone?: string
}

export interface Address {
  id: string
  user_id: string
  name: string
  address_line: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface BackendAddress {
  id: string
  userId: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  addressType: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateAddressRequest {
  name: string
  address_line: string
  city: string
  state: string
  postal_code: string
  country: string
}

export interface BackendCreateAddressRequest {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  addressType: string
}

export interface UpdateAddressRequest extends CreateAddressRequest {
  id: string
}

export interface ErrorResponse {
  message: string
  errors?: Record<string, string[]>
}
