'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validation
    if (!email || !password) {
      setError('Compila tutti i campi')
      setLoading(false)
      return
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        setLoading(false)
        return
      }

      // Success - redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      setError('Errore durante l\'accesso')
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">☀️</div>
        <h1 className="text-3xl font-bold text-secondary-darkGray mb-2">Sunny Shop</h1>
        <p className="text-secondary-darkGray/60 text-sm">Garanzia Sole per i Tuoi Eventi</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-status-error text-status-error px-4 py-3 rounded mb-6 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            placeholder="tua@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Accesso in corso...' : 'Accedi'}
        </button>
      </form>

      {/* Toggle Link */}
      <div className="text-center mt-6 text-secondary-darkGray/60 text-sm">
        Non hai un account?{' '}
        <Link href="/auth/signup" className="text-primary-blue font-semibold hover:underline">
          Registrati
        </Link>
      </div>
    </div>
  )
}
