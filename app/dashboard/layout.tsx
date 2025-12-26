'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        router.push('/auth/login')
        return
      }

      setEmail(user.email || '')
      setLoading(false)
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">☀️</div>
          <p className="text-xl text-gray-600">Caricamento...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header email={email} />
      <main className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <Sidebar side="left" />

          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>

          {/* Right Sidebar */}
          <Sidebar side="right" />
        </div>
      </main>
    </>
  )
}
