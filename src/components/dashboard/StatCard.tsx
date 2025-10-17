import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  borderColor: string
  iconBgColor: string
  iconColor: string
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  borderColor, 
  iconBgColor, 
  iconColor 
}: StatCardProps) {
  return (
    <Card className={`border-l-4 ${borderColor} shadow-md hover:shadow-lg transition-shadow duration-300`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardDescription>{title}</CardDescription>
          <div className={`p-2 ${iconBgColor} rounded-lg`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
      </CardContent>
    </Card>
  )
}

