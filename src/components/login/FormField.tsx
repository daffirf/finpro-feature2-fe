import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, LucideIcon } from 'lucide-react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface FormFieldProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'password' | 'tel'
  placeholder?: string
  icon?: LucideIcon
  error?: string
  required?: boolean
  register: UseFormRegisterReturn
}

export function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  icon: Icon,
  error,
  required = false,
  register
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        )}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`${Icon ? 'pl-10' : ''} h-12 ${
            error
              ? 'border-red-500 focus-visible:ring-red-500'
              : 'focus-visible:ring-teal-500'
          }`}
          {...register}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
}

