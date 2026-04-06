import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { registerSchema, type RegisterFormData } from '@/lib/validation'
import { FormField } from '@/components/form/FormField'
import { FormInput } from '@/components/form/FormInput'
import { FormButton } from '@/components/form/FormButton'
import { useState } from 'react'

export const Register = () => {
  const { register: registerUser, isLoading } = useAuth()
  const [apiError, setApiError] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setApiError('')
    const { confirmPassword, ...submitData } = data
    const result = await registerUser(submitData)
    if (!result.success) {
      setApiError(result.error || 'Registration failed')
    }
  }

  return (
    <div className="auth-screen auth-screen--register">
      <div className="auth-orb auth-orb--one" />
      <div className="auth-orb auth-orb--two" />

      <div className="auth-shell">
        <section className="auth-panel">
          <div className="auth-panel-inner">
            <div>
              <p className="auth-tag">Get started</p>
              <h2 className="auth-title">Create account</h2>
            </div>

            {apiError && <div className="auth-alert">{apiError}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
              <FormField
                label="Full Name"
                error={errors.name}
                required
              >
                <FormInput
                  type="text"
                  placeholder=" "
                  {...register('name')}
                  error={!!errors.name}
                />
              </FormField>

              <FormField
                label="Email Address"
                error={errors.email}
                required
              >
                <FormInput
                  type="email"
                  placeholder=" "
                  {...register('email')}
                  error={!!errors.email}
                />
              </FormField>

              <FormField
                label="Phone Number"
                error={errors.phone}
              >
                <FormInput
                  type="tel"
                  placeholder=" "
                  {...register('phone')}
                />
              </FormField>

              <FormField
                label="Password"
                error={errors.password}
                required
              >
                <FormInput
                  type="password"
                  placeholder=" "
                  {...register('password')}
                  error={!!errors.password}
                />
              </FormField>

              <FormField
                label="Confirm Password"
                error={errors.confirmPassword}
                required
              >
                <FormInput
                  type="password"
                  placeholder=" "
                  {...register('confirmPassword')}
                  error={!!errors.confirmPassword}
                />
              </FormField>

              <FormButton isLoading={isLoading} type="submit">
                Create Account
              </FormButton>
            </form>

            <div className="auth-switch">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
