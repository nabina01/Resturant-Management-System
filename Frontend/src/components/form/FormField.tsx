import { ReactNode } from 'react'
import { FieldError } from 'react-hook-form'

interface FormFieldProps {
  label: string
  error?: FieldError
  required?: boolean
  children: ReactNode
}

export const FormField = ({ label, error, required, children }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  )
}
