'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Home, 
  Users, 
  Store, 
  Calendar, 
  User, 
  Settings, 
  HelpCircle, 
  Heart,
  MessageCircle,
  BookOpen,
  Award,
  X,
  LucideIcon
} from 'lucide-react'
import { COLORS, FONT_FAMILY, FONT_SIZES } from '@/lib/constants'

interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface MenuSection {
  category: string;
  items: MenuItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems: MenuSection[] = [
  {
    category: 'Main',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: Home },
      { name: 'Community', href: '/community', icon: Users },
      { name: 'Store', href: '/store', icon: Store },
      { name: 'Appointments', href: '/appointments', icon: Calendar },
    ]
  },
  {
    category: 'Services',
    items: [
      { name: 'Consultations', href: '/consultations', icon: MessageCircle },
      { name: 'Resources', href: '/resources', icon: BookOpen },
      { name: 'Wellness', href: '/wellness', icon: Heart },
      { name: 'Achievements', href: '/achievements', icon: Award },
    ]
  },
  {
    category: 'Account',
    items: [
      { name: 'Profile', href: '/profile', icon: User },
      { name: 'Settings', href: '/settings', icon: Settings },
      { name: 'Help & Support', href: '/help', icon: HelpCircle },
    ]
  }
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState<string>('/dashboard')

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ 
          width: '320px',
          backgroundColor: 'white',
          fontFamily: FONT_FAMILY.default,
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: COLORS.accent }}
        >
          <div className="flex items-center space-x-3">
            <div 
              className="text-2xl font-bold rounded-lg p-2"
              style={{ color: COLORS.primary, backgroundColor: `${COLORS.primary}20` }}
            >
              ▷
            </div>
            <h2 
              className="font-bold tracking-wide"
              style={{ color: COLORS.text, fontSize: FONT_SIZES.subheading }}
            >
              Nanban
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="h-5 w-5" style={{ color: COLORS.text }} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6">
          {menuItems.map((section: MenuSection, sectionIndex: number) => (
            <div key={section.category} className="mb-6">
              {/* Section Header */}
              <div className="px-6 mb-3">
                <h3 
                  className="font-semibold uppercase tracking-wider opacity-60"
                  style={{ 
                    color: COLORS.text, 
                    fontSize: FONT_SIZES.small 
                  }}
                >
                  {section.category}
                </h3>
              </div>

              {/* Section Items */}
              <div className="space-y-1 px-3">
                {section.items.map((item: MenuItem) => {
                  const Icon = item.icon
                  const isActive = activeItem === item.href
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        setActiveItem(item.href)
                        onClose()
                      }}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 hover:scale-[0.98] ${
                        isActive ? 'shadow-md' : 'hover:bg-gray-50'
                      }`}
                      style={{
                        backgroundColor: isActive ? `${COLORS.primary}15` : 'transparent',
                        borderLeft: isActive ? `4px solid ${COLORS.primary}` : '4px solid transparent'
                      }}
                    >
                      <Icon 
                        className="h-5 w-5 flex-shrink-0" 
                        style={{ 
                          color: isActive ? COLORS.primary : COLORS.text + '80' 
                        }} 
                      />
                      <span 
                        className={`font-medium ${isActive ? 'font-semibold' : ''}`}
                        style={{ 
                          color: isActive ? COLORS.primary : COLORS.text,
                          fontSize: FONT_SIZES.body 
                        }}
                      >
                        {item.name}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}