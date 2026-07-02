'use client'

import { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import ReduxProvider from '@/lib/redux/provider'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  return (
    <>
      <Navbar onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main content with padding for fixed navbar */}
      <main className="pt-16">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </main>
    </>
  )
}