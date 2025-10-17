'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Home,
  Calendar,
  Heart,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react'

interface SidebarProps {
  onLogout?: () => void
}

interface NavItem {
  id: string
  label: string
  icon: React.ElementType
  href?: string
  onClick?: () => void
}

export function DashboardSidebar({ onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Home,
      href: '/dashboard'
    },
    {
      id: 'bookings',
      label: 'Booking Saya',
      icon: Calendar,
      href: '/dashboard/bookings'
    },
    {
      id: 'favorites',
      label: 'Favorit',
      icon: Heart,
      href: '/dashboard/favorites'
    },
    {
      id: 'payments',
      label: 'Pembayaran',
      icon: CreditCard,
      href: '/dashboard/payments'
    },
    {
      id: 'settings',
      label: 'Pengaturan',
      icon: Settings,
      href: '/dashboard/settings'
    }
  ]

  const utilityItems: NavItem[] = [
    {
      id: 'profile',
      label: 'Profil Saya',
      icon: User,
      href: '/user'
    },
    {
      id: 'logout',
      label: 'Keluar',
      icon: LogOut,
      onClick: onLogout
    }
  ]

  const isActive = (href?: string) => {
    if (!href) return false
    return pathname === href
  }

  const SidebarContent = () => (
    <>
      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <div className={`mb-2 ${isCollapsed ? 'text-center' : ''}`}>
          <p className={`text-xs font-semibold text-gray-400 uppercase tracking-wider ${isCollapsed ? 'hidden' : 'px-3 py-2'}`}>
            Menu Utama
          </p>
        </div>
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          
          return item.href ? (
            <Link
              key={item.id}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                ${active 
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-teal-50 hover:text-teal-700'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
              onClick={() => setIsMobileOpen(false)}
            >
              <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {active && !isCollapsed && (
                <div className="ml-auto w-2 h-2 rounded-full bg-white"></div>
              )}
            </Link>
          ) : (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                text-gray-700 hover:bg-teal-50 hover:text-teal-700
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </button>
          )
        })}
      </nav>

      <Separator />

      {/* Utility Navigation */}
      <div className="p-4 space-y-1">
        <div className={`mb-2 ${isCollapsed ? 'text-center' : ''}`}>
          <p className={`text-xs font-semibold text-gray-400 uppercase tracking-wider ${isCollapsed ? 'hidden' : 'px-3 py-2'}`}>
            Akun
          </p>
        </div>
        {utilityItems.map((item) => {
          const Icon = item.icon
          const isLogout = item.id === 'logout'
          
          return item.href ? (
            <Link
              key={item.id}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                text-gray-700 hover:bg-teal-50 hover:text-teal-700
                ${isCollapsed ? 'justify-center' : ''}
              `}
              onClick={() => setIsMobileOpen(false)}
            >
              <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </Link>
          ) : (
            <button
              key={item.id}
              onClick={() => {
                item.onClick?.()
                setIsMobileOpen(false)
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                ${isLogout 
                  ? 'text-red-600 hover:bg-red-50' 
                  : 'text-gray-700 hover:bg-teal-50 hover:text-teal-700'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Collapse Toggle Button - Desktop Only */}
      <div className="hidden lg:block p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 border-gray-200 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700"
        >
          {isCollapsed ? (
            <>
              <ChevronRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs">Tutup Sidebar</span>
            </>
          )}
        </Button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed bottom-6 right-6 z-50 lg:hidden h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-teal-500 to-teal-600 border-0 text-white hover:from-teal-600 hover:to-teal-700"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          lg:hidden w-72
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center shadow-lg">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Dashboard</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(false)}
              className="hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Content */}
          <div className="flex-1 overflow-y-auto">
            <SidebarContent />
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col h-full bg-white border-r border-gray-200 shadow-sm
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-72'}
        `}
      >
        {/* Desktop Header */}
        <div className={`flex items-center gap-3 p-6 border-b ${isCollapsed ? 'justify-center px-4' : ''}`}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center shadow-lg">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <h2 className="text-lg font-bold text-gray-900">Dashboard</h2>
          )}
        </div>

        {/* Desktop Content */}
        <div className="flex-1 overflow-y-auto">
          <SidebarContent />
        </div>
      </aside>
    </>
  )
}

