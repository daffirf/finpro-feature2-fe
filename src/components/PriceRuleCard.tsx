'use client'

import { formatCurrency, formatDate } from '@/lib/utils'

interface PriceRuleCardProps {
  rule: {
    id: string
    name: string
    startDate: string
    endDate: string
    priceType: 'PERCENTAGE' | 'FIXED'
    value: number
    isActive: boolean
  }
  onToggle?: (id: string, isActive: boolean) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function PriceRuleCard({ rule, onToggle, onEdit, onDelete }: PriceRuleCardProps) {
  const formatValue = () => {
    if (rule.priceType === 'PERCENTAGE') {
      return `${rule.value > 0 ? '+' : ''}${rule.value}%`
    } else {
      return formatCurrency(rule.value)
    }
  }

  const getValueColor = () => {
    if (rule.priceType === 'PERCENTAGE') {
      return rule.value > 0 ? 'text-green-600' : 'text-red-600'
    }
    return 'text-gray-600'
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{rule.name}</h3>
          <p className="text-sm text-gray-600">
            {formatDate(rule.startDate)} - {formatDate(rule.endDate)}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            rule.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {rule.isActive ? 'Aktif' : 'Nonaktif'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-sm text-gray-600">Jenis:</span>
          <span className="ml-2 text-sm font-medium">
            {rule.priceType === 'PERCENTAGE' ? 'Persentase' : 'Harga Tetap'}
          </span>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-600">Nilai:</span>
          <span className={`ml-2 text-sm font-semibold ${getValueColor()}`}>
            {formatValue()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {onToggle && (
            <button
              onClick={() => onToggle(rule.id, rule.isActive)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                rule.isActive
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {rule.isActive ? 'Nonaktifkan' : 'Aktifkan'}
            </button>
          )}
          
          {onEdit && (
            <button
              onClick={() => onEdit(rule.id)}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200"
            >
              Edit
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={() => onDelete(rule.id)}
              className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200"
            >
              Hapus
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

