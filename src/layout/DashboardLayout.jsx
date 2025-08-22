// src/layout/DashboardLayout.jsx
import Sidebar from '../ui/Sidebar.jsx'
import Header from '../ui/Header.jsx'
import { useState, useEffect } from 'react'

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar on route change for mobile
  useEffect(() => {
    const handleRouteChange = () => {
      setSidebarOpen(false)
    }
    
    // Listen for route changes (works with React Router)
    window.addEventListener('popstate', handleRouteChange)
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      // Auto-close sidebar on mobile when resizing to mobile breakpoint
      if (window.innerWidth < 1024 && sidebarOpen) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarOpen])

  return (
    <div className="min-h-dvh bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - responsive positioning */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area - responsive margin */}
      <div className="flex flex-col min-h-dvh md:ml-64"> 
        <Header onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        
        {/* Main content with responsive padding */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="w-full max-w-none sm:max-w-full">
            {/* Content wrapper with responsive constraints */}
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile overlay when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default DashboardLayout