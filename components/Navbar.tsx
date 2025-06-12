'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-slate-700 text-white shadow-lg">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-white">▷</div>
            </Link>
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-semibold">Nanban</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/community" className="hover:text-gray-300 transition-colors">
              Community
            </Link>
            <Link href="/store" className="hover:text-gray-300 transition-colors">
              Store
            </Link>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search problems..."
                className="bg-white text-gray-900 px-4 py-2 pr-10 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>

            <Link href="/appointment" className="hover:text-gray-300 transition-colors">
              Appointment
            </Link>
            <Link href="/login" className="hover:text-gray-300 transition-colors">
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link href="/community" className="hover:text-gray-300 transition-colors py-2">
                Community
              </Link>
              <Link href="/store" className="hover:text-gray-300 transition-colors py-2">
                Store
              </Link>
              <div className="py-2">
                <input
                  type="text"
                  placeholder="Search problems..."
                  className="bg-white text-gray-900 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Link href="/appointment" className="hover:text-gray-300 transition-colors py-2">
                Appointment
              </Link>
              <Link href="/login" className="hover:text-gray-300 transition-colors py-2">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}