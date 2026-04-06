import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginFormData } from '@/lib/validation'
import { FormField } from '@/components/form/FormField'
import { FormInput } from '@/components/form/FormInput'
import { FormButton } from '@/components/form/FormButton'
import { useState } from 'react'

export const Login = () => {
  const { login, isLoading } = useAuth()
  const [apiError, setApiError] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setApiError('')
    const result = await login(data)
    if (!result.success) {
      setApiError(result.error || 'Login failed')
    }
  }

  return (
    <div className="auth-screen auth-screen--login">
      <div className="auth-orb auth-orb--one" />
      <div className="auth-orb auth-orb--two" />

      <div className="auth-shell">
        <section className="auth-panel">
          <div className="auth-panel-inner">
            <div>
              <p className="auth-tag">Welcome back</p>
              <h2 className="auth-title">Sign in</h2>
              
            </div>

            {apiError && <div className="auth-alert">{apiError}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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

              <FormButton isLoading={isLoading} type="submit">
                Sign In
              </FormButton>
            </form>

            <div className="auth-switch">
              Dont have an account?{' '}
              <Link to="/register" className="auth-link">
                Create one
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
