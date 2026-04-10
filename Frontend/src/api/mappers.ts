import type {
  Address,
  BackendAddress,
  BackendCreateAddressRequest,
  CreateAddressRequest,
  RegisterRequest,
  UpdateProfileRequest,
} from '@/types/api'

function splitName(name: string): { firstName: string; lastName: string } {
  const [firstName = '', ...rest] = name.trim().split(/\s+/)
  return {
    firstName,
    lastName: rest.join(' '),
  }
}

export function toBackendRegisterRequest(data: RegisterRequest): {
  email: string
  password: string
  phone?: string
  firstName?: string
  lastName?: string
} {
  const { firstName, lastName } = splitName(data.name)

  return {
    email: data.email,
    password: data.password,
    phone: data.phone,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
  }
}

export function toBackendUpdateProfileRequest(data: UpdateProfileRequest): {
  firstName?: string
  lastName?: string
  phone?: string
} {
  if (!data.name) {
    return { phone: data.phone }
  }

  const { firstName, lastName } = splitName(data.name)
  return {
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    phone: data.phone,
  }
}

export function mapBackendAddress(address: BackendAddress): Address {
  return {
    id: address.id,
    user_id: address.userId,
    name: address.addressType,
    address_line: address.street,
    city: address.city,
    state: address.state,
    postal_code: address.zipCode,
    country: address.country,
    is_default: address.isDefault,
    created_at: address.createdAt,
    updated_at: address.updatedAt,
  }
}

export function toBackendAddressRequest(data: CreateAddressRequest): BackendCreateAddressRequest {
  return {
    street: data.address_line,
    city: data.city,
    state: data.state,
    zipCode: data.postal_code,
    country: data.country,
    addressType: data.name,
  }
}