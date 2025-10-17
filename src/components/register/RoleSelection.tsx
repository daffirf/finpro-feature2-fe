import { Label } from '@/components/ui/label'
import { AlertCircle, Users, Home } from 'lucide-react'

interface RoleSelectionProps {
  selectedRole: string
  error?: string
  onValueChange: (value: string) => void
}

export function RoleSelection({
  selectedRole,
  error,
  onValueChange
}: RoleSelectionProps) {
  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-700">
        Jenis Akun <span className="text-red-500">*</span>
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* USER Card */}
        <div 
          onClick={() => onValueChange('USER')}
          className={`
            relative flex flex-col items-center justify-center
            min-h-[220px] rounded-2xl border-2 p-6 cursor-pointer 
            transition-all duration-300 ease-in-out
            ${
              selectedRole === 'USER'
                ? 'border-teal-500 bg-gradient-to-br from-teal-50 via-teal-50 to-cyan-50 shadow-xl scale-[1.02] ring-4 ring-teal-100'
                : 'border-gray-300 bg-white hover:border-teal-400 hover:bg-teal-50 hover:shadow-lg active:scale-95'
            }
          `}
        >
          <div className={`
            w-20 h-20 rounded-full flex items-center justify-center mb-4 
            transition-all duration-300
            ${selectedRole === 'USER' 
              ? 'bg-gradient-to-br from-teal-500 to-cyan-600 shadow-xl scale-110' 
              : 'bg-gray-200 group-hover:bg-teal-100'
            }
          `}>
            <Users className={`h-10 w-10 transition-all ${selectedRole === 'USER' ? 'text-white' : 'text-gray-500'}`} />
          </div>
          
          <div className="text-center space-y-2">
            <div className={`font-bold text-2xl transition-colors ${selectedRole === 'USER' ? 'text-teal-700' : 'text-gray-900'}`}>
              User
            </div>
            <div className="text-sm text-gray-600 leading-relaxed px-2 font-medium">
              Mencari dan booking penginapan
            </div>
          </div>

          {selectedRole === 'USER' && (
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-200">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* TENANT Card */}
        <div 
          onClick={() => onValueChange('TENANT')}
          className={`
            relative flex flex-col items-center justify-center
            min-h-[220px] rounded-2xl border-2 p-6 cursor-pointer 
            transition-all duration-300 ease-in-out
            ${
              selectedRole === 'TENANT'
                ? 'border-blue-500 bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 shadow-xl scale-[1.02] ring-4 ring-blue-100'
                : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50 hover:shadow-lg active:scale-95'
            }
          `}
        >
          <div className={`
            w-20 h-20 rounded-full flex items-center justify-center mb-4 
            transition-all duration-300
            ${selectedRole === 'TENANT' 
              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl scale-110' 
              : 'bg-gray-200 group-hover:bg-blue-100'
            }
          `}>
            <Home className={`h-10 w-10 transition-all ${selectedRole === 'TENANT' ? 'text-white' : 'text-gray-500'}`} />
          </div>
          
          <div className="text-center space-y-2">
            <div className={`font-bold text-2xl transition-colors ${selectedRole === 'TENANT' ? 'text-blue-700' : 'text-gray-900'}`}>
              Tenant
            </div>
            <div className="text-sm text-gray-600 leading-relaxed px-2 font-medium">
              Menyewakan properti
            </div>
          </div>

          {selectedRole === 'TENANT' && (
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-200">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}
        </div>
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

