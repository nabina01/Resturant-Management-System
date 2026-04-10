import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DashboardLayout } from '@/components/DashboardLayout'
import { useAuth } from '@/hooks/useAuth'
import { FormField } from '@/components/form/FormField'
import { FormInput } from '@/components/form/FormInput'
import { FormButton } from '@/components/form/FormButton'
import { updateProfileSchema, type UpdateProfileFormData } from '@/lib/validation'
import { userService } from '@/api/services/userService'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'

const getFullName = (firstName?: string | null, lastName?: string | null) =>
  [firstName, lastName].filter(Boolean).join(' ').trim()

export const Profile = () => {
  const { user } = useAuth()
  const { setUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: getFullName(user?.firstName, user?.lastName),
      phone: user?.phone || '',
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        name: getFullName(user.firstName, user.lastName),
        phone: user.phone || '',
      })
    }
  }, [user, reset])

  const onSubmit = async (data: UpdateProfileFormData) => {
    setIsLoading(true)
    setSuccessMessage('')

    try {
      const updatedUser = await userService.updateProfile(data)
      setUser(updatedUser)
      setSuccessMessage('Profile updated successfully')
      toast.success('Profile updated successfully')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update profile'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout title="Profile Settings">
      <div className="max-w-2xl">
        <div className="bg-white rounded-lg shadow p-8">
          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              label="Full Name"
              error={errors.name}
              required
            >
              <FormInput
                type="text"
                placeholder="Your name"
                {...register('name')}
                error={!!errors.name}
              />
            </FormField>

            <FormField
              label="Email Address"
              required
            >
              <FormInput
                type="email"
                value={user?.email || ''}
                disabled
                className="bg-muted"
              />
            </FormField>

            <FormField
              label="Phone"
              error={errors.phone}
            >
              <FormInput
                type="tel"
                placeholder="+1 (555) 000-0000"
                {...register('phone')}
              />
            </FormField>

            <div className="flex gap-4">
              <FormButton
                type="submit"
                isLoading={isLoading}
                className="flex-1"
              >
                Save Changes
              </FormButton>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
