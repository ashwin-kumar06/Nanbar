'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Menu, X, Bell, User } from 'lucide-react'
import { COLORS, FONT_FAMILY, FONT_SIZES } from '@/lib/constants'

interface NavbarProps {
  onSidebarToggle: () => void;
}

export default function Navbar({ onSidebarToggle }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      // Add your search logic here
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl backdrop-blur-md' : 'shadow-lg'
        }`}
      style={{
        backgroundColor: isScrolled ? `${COLORS.secondary}f0` : COLORS.secondary,
        fontFamily: FONT_FAMILY.default
      }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Sidebar Toggle Button + Logo */}
          <div className="flex items-center space-x-3">
            {/* Sidebar Toggle Button */}
            <button
              onClick={onSidebarToggle}
              className="text-2xl font-bold rounded-lg p-2 transition-all duration-300 hover:rotate-12 hover:scale-110"
              style={{ color: COLORS.primary, backgroundColor: `${COLORS.primary}20` }}
            >
              ▷
            </button>
          </div>
          <div>
            {/* Logo */}
            <Link href="/" className="flex items-center transition-transform duration-200 hover:scale-105">
              <span
                className="text-xl font-bold tracking-wide"
                style={{ color: 'white', fontSize: FONT_SIZES.subheading }}
              >
                Nanban
              </span>
            </Link>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {['Community', 'Store'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="relative group px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                style={{ fontSize: FONT_SIZES.body }}
              >
                <span className="relative z-10 text-white group-hover:text-white transition-colors">
                  {item}
                </span>
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ backgroundColor: `${COLORS.primary}20` }}
                />
              </Link>
            ))}

            {/* Enhanced Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative group">
              <div className="relative overflow-hidden rounded-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search problems..."
                  className="bg-white text-gray-900 px-5 py-2.5 pr-12 rounded-full w-64 focus:outline-none focus:ring-2 transition-all duration-200 focus:w-72 hover:shadow-lg"
                  style={{
                    fontSize: FONT_SIZES.small,
                    outlineColor: COLORS.primary, // Use outlineColor instead of focusRingColor
                  }}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-all duration-200 hover:scale-110"
                  style={{ backgroundColor: `${COLORS.primary}20` }}
                >
                  <Search className="h-4 w-4" style={{ color: COLORS.primary }} />
                </button>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                className="p-2 rounded-full transition-all duration-200 hover:scale-110 relative"
                style={{ backgroundColor: `${COLORS.primary}20` }}
              >
                <Bell className="h-5 w-5" style={{ color: COLORS.primary }} />
                <span
                  className="absolute -top-1 -right-1 h-3 w-3 rounded-full text-xs flex items-center justify-center"
                  style={{ backgroundColor: COLORS.primary, color: 'white' }}
                >
                  2
                </span>
              </button>

              <Link
                href="/appointment"
                className="px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: COLORS.primary,
                  color: 'white',
                  fontSize: FONT_SIZES.small
                }}
              >
                Book Appointment
              </Link>

              <Link
                href="/login"
                className="p-2 rounded-full transition-all duration-200 hover:scale-110 border-2 border-white hover:bg-white group"
              >
                <User className="h-5 w-5 text-white group-hover:text-gray-900 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
              style={{ backgroundColor: `${COLORS.primary}20` }}
            >
              {isMenuOpen ?
                <X size={24} style={{ color: COLORS.primary }} /> :
                <Menu size={24} style={{ color: COLORS.primary }} />
              }
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-4 pt-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search problems..."
                  className="bg-white text-gray-900 px-4 py-3 pr-12 rounded-full w-full focus:outline-none focus:ring-2 shadow-sm"
                  style={{ fontSize: FONT_SIZES.small }}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full"
                  style={{ backgroundColor: `${COLORS.primary}20` }}
                >
                  <Search className="h-4 w-4" style={{ color: COLORS.primary }} />
                </button>
              </form>

              {/* Mobile Menu Items */}
              <div className="space-y-2">
                {[
                  { name: 'Community', href: '/community' },
                  { name: 'Store', href: '/store' },
                  { name: 'Appointment', href: '/appointment' },
                  { name: 'Login', href: '/login' }
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:scale-[0.98] active:scale-95"
                    style={{
                      backgroundColor: `${COLORS.primary}10`,
                      fontSize: FONT_SIZES.body
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-white font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-600">
                <Link
                  href="/appointment"
                  className="w-full px-6 py-3 rounded-full font-semibold text-center block transition-all duration-200 hover:scale-[0.98] shadow-lg"
                  style={{
                    backgroundColor: COLORS.primary,
                    color: 'white',
                    fontSize: FONT_SIZES.body
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Your Appointment
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}