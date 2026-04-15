// src/layouts/MainLayout.tsx

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Outlet, useLocation } from 'react-router'

export default function MainLayout() {
  const location = useLocation()
  const isLaunchProject = location.pathname.includes('/launch-project')

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      {!isLaunchProject && <Footer />}
    </div>
  )
}
