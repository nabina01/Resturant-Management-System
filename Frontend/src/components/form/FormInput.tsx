import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, error, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'w-full px-3 py-2 border border-border rounded-md text-sm',
          'bg-background text-foreground placeholder-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
    )
  }
)

FormInput.displayName = 'FormInput'
