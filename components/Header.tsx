'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getAvatarLetter } from '@/lib/utils'

interface HeaderProps {
  email: string
}

export default function Header({ email }: HeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <header className="bg-white shadow-default sticky top-0 z-50 mb-8">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-3xl">☀️</span>
            <span className="text-2xl font-bold text-secondary-darkGray">Sunny Shop</span>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-secondary-lightGray rounded-full px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-yellow to-primary-blue flex items-center justify-center text-white font-bold text-sm">
                {getAvatarLetter(email)}
              </div>
              <span className="text-sm text-secondary-darkGray">{email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-small bg-status-error text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
