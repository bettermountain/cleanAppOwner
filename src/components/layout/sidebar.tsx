import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  Home,
  Building2,
  Briefcase,
  UserCheck,
  Activity,
  Star,
  CreditCard,
  Bell,
  Settings,
} from 'lucide-react'

const navigation = [
  { name: 'ダッシュボード', href: '/', icon: Home },
  { name: '物件管理', href: '/properties', icon: Building2 },
  { name: '依頼管理', href: '/jobs', icon: Briefcase },
  { name: '指名オファー', href: '/offers', icon: UserCheck },
  { name: '進捗モニター', href: '/progress', icon: Activity },
  { name: 'レビュー', href: '/reviews', icon: Star },
  { name: '請求・支払', href: '/billing', icon: CreditCard },
  { name: '通知', href: '/notifications', icon: Bell },
  { name: '設定', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">CleanApp Owner</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
