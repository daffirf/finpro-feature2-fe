import { cn } from '@/lib/utils'

interface AlertProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  className?: string
}

export function Alert({ children, variant = 'default', className }: AlertProps) {
  const baseClasses = 'p-4 rounded-lg border'
  
  const variantClasses = {
    default: 'bg-gray-50 border-gray-200 text-gray-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </div>
  )
}

interface AlertTitleProps {
  children: React.ReactNode
  className?: string
}

export function AlertTitle({ children, className }: AlertTitleProps) {
  return (
    <h4 className={cn('font-semibold mb-1', className)}>
      {children}
    </h4>
  )
}

interface AlertDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function AlertDescription({ children, className }: AlertDescriptionProps) {
  return (
    <p className={cn('text-sm', className)}>
      {children}
    </p>
  )
}

