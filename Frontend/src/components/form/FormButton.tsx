import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FormButtonProps {
  children: ReactNode
  isLoading?: boolean
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary'
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export const FormButton = ({
  children,
  isLoading,
  disabled,
  className,
  variant = 'primary',
  type = 'submit',
  onClick,
}: FormButtonProps) => {
  const baseStyles = 'w-full py-2 px-4 rounded-md font-medium text-sm transition-colors'
  const primaryStyles = 'bg-primary text-primary-foreground hover:bg-blue-600 disabled:bg-blue-300'
  const secondaryStyles = 'bg-secondary text-secondary-foreground hover:bg-gray-300 disabled:bg-gray-200'

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(
        baseStyles,
        variant === 'primary' ? primaryStyles : secondaryStyles,
        'disabled:cursor-not-allowed disabled:opacity-70',
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}
