// src/layouts/MainLayout.tsx

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
