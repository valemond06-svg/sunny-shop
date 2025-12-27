'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { formatPrice, formatDate } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function DashboardPage() {
  const [buoni, setBuoni] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const success = searchParams.get('success')

  useEffect(() => {
    const fetchBuoni = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('buoni')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setBuoni(data)
      }
      setLoading(false)
    }

    fetchBuoni()
  }, [])

  if (loading) {
    return <div className="text-center py-20 text-secondary-darkGray/50">Caricamento buoni...</div>
  }

  return (
    <div>
      {/* Success Notification */}
      {success && (
        <div className="bg-green-50 border-l-4 border-status-success text-status-success px-4 py-3 rounded mb-8 fade-in flex items-center justify-between">
          <p className="text-sm font-medium">✨ Buono acquistato con successo! La tua garanzia è attiva.</p>
        </div>
      )}

      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-secondary-darkGray mb-2">Benvenuto! ☀️</h1>
        <p className="text-secondary-darkGray/60">Gestisci i tuoi buoni sole e scopri quando il sole brillerà per te</p>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-yellow to-orange-500 rounded-lg shadow-lg p-8 mb-10 text-center">
        <h2 className="text-2xl font-bold text-secondary-darkGray mb-2">Garantisci il Sole per il Tuo Evento</h2>
        <p className="text-secondary-darkGray/80 mb-6">Rimborso completo se piove durante il tuo evento. Da soli €1.99.</p>
        <Link href="/dashboard/new-buono" className="btn bg-white text-secondary-darkGray font-bold hover:scale-105 transition-transform">
          Acquista Ora
        </Link>
      </div>

      {/* Buoni Section */}
      <div>
        <h2 className="text-2xl font-bold text-secondary-darkGray mb-6">I Tuoi Buoni Sole</h2>

        {buoni.length === 0 ? (
          /* Empty State */
          <div className="empty-state card">
            <div className="empty-state-icon">☀️</div>
            <div className="empty-state-title">Nessun buono ancora</div>
            <div className="empty-state-text mb-6">Inizia a garantire il sole per il tuo prossimo evento</div>
            <Link href="/dashboard/new-buono" className="btn btn-primary">
              Crea il tuo primo Buono
            </Link>
          </div>
        ) : (
          /* Buoni Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {buoni.map((buono) => (
              <div key={buono.id} className="card bg-white relative overflow-hidden">
                {/* Status Badge */}
                <div className={`absolute top-0 right-0 px-4 py-1 text-xs font-bold uppercase rounded-bl-lg ${buono.stato === 'attivo' ? 'bg-blue-100 text-blue-600' :
                    buono.stato === 'rimborso_accettato' ? 'bg-green-100 text-green-600' :
                      'bg-gray-100 text-gray-600'
                  }`}>
                  {buono.stato.replace('_', ' ')}
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">☀️</div>
                  <div>
                    <h3 className="text-lg font-bold text-secondary-darkGray">{buono.citta}</h3>
                    <p className="text-sm text-secondary-darkGray/60">{formatDate(buono.data_evento)}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6 border-y border-gray-50 py-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-darkGray/50">Codice:</span>
                    <span className="font-mono font-bold text-secondary-darkGray">{buono.codice_buono}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-darkGray/50">Orario:</span>
                    <span className="text-secondary-darkGray font-medium">
                      {buono.ora_fine ? `${buono.ora_inizio} - ${buono.ora_fine}` : 'Intera Giornata'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-darkGray/50">Importo:</span>
                    <span className="text-secondary-darkGray font-medium">{formatPrice(buono.importo)}</span>
                  </div>
                </div>

                <button className="w-full py-2 text-primary-blue text-sm font-semibold hover:bg-blue-50 rounded-lg transition-colors border border-blue-100">
                  Dettagli & Condizioni
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
