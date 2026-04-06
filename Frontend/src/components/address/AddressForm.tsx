import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Address } from '@/types/api'
import { addressSchema, type AddressFormData } from '@/lib/validation'
import { addressService } from '@/api/services/addressService'
import { FormField } from '@/components/form/FormField'
import { FormInput } from '@/components/form/FormInput'
import { FormButton } from '@/components/form/FormButton'
import { toast } from 'sonner'

interface AddressFormProps {
  address?: Address
  onSuccess: () => void
  onCancel: () => void
}

export const AddressForm = ({ address, onSuccess, onCancel }: AddressFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: address?.name || '',
      address_line: address?.address_line || '',
      city: address?.city || '',
      state: address?.state || '',
      postal_code: address?.postal_code || '',
      country: address?.country || 'United States',
    },
  })

  useEffect(() => {
    if (address) {
      reset({
        name: address.name,
        address_line: address.address_line,
        city: address.city,
        state: address.state,
        postal_code: address.postal_code,
        country: address.country,
      })
    }
  }, [address, reset])

  const onSubmit = async (data: AddressFormData) => {
    setIsLoading(true)

    try {
      if (address) {
        await addressService.updateAddress({ id: address.id, ...data })
      } else {
        await addressService.createAddress(data)
      }
      onSuccess()
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to save address'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        {address ? 'Edit Address' : 'Add New Address'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Address Name"
          error={errors.name}
          required
        >
          <FormInput
            type="text"
            placeholder="e.g., Home, Office, Restaurant"
            {...register('name')}
            error={!!errors.name}
          />
        </FormField>

        <FormField
          label="Street Address"
          error={errors.address_line}
          required
        >
          <FormInput
            type="text"
            placeholder="123 Main Street"
            {...register('address_line')}
            error={!!errors.address_line}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="City"
            error={errors.city}
            required
          >
            <FormInput
              type="text"
              placeholder="New York"
              {...register('city')}
              error={!!errors.city}
            />
          </FormField>

          <FormField
            label="State/Province"
            error={errors.state}
            required
          >
            <FormInput
              type="text"
              placeholder="NY"
              {...register('state')}
              error={!!errors.state}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Postal Code"
            error={errors.postal_code}
            required
          >
            <FormInput
              type="text"
              placeholder="10001"
              {...register('postal_code')}
              error={!!errors.postal_code}
            />
          </FormField>

          <FormField
            label="Country"
            error={errors.country}
            required
          >
            <FormInput
              type="text"
              placeholder="United States"
              {...register('country')}
              error={!!errors.country}
            />
          </FormField>
        </div>

        <div className="flex gap-4 pt-4">
          <FormButton
            type="submit"
            isLoading={isLoading}
            className="flex-1"
          >
            {address ? 'Update Address' : 'Add Address'}
          </FormButton>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-md border border-border text-foreground font-medium hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
