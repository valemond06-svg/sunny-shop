'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { generateBuonoCode } from '@/lib/utils'
import Link from 'next/link'

export default function NewBuonoPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        citta: '',
        data_evento: '',
        ora_inizio: '09:00',
        ora_fine: '',
        is_full_day: true,
    })

    const handlePurchase = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                router.push('/auth/login')
                return
            }

            const importo = formData.is_full_day ? 7.99 : 1.99
            const codice = generateBuonoCode()

            const { error: insertError } = await supabase
                .from('buoni')
                .insert({
                    user_id: user.id,
                    codice_buono: codice,
                    citta: formData.citta,
                    data_evento: formData.data_evento,
                    ora_inizio: formData.ora_inizio,
                    ora_fine: formData.is_full_day ? null : formData.ora_fine,
                    importo: importo,
                    stato: 'attivo'
                })

            if (insertError) throw insertError

            router.push('/dashboard?success=true')
        } catch (err: any) {
            setError(err.message || 'Errore durante l\'acquisto')
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <Link href="/dashboard" className="text-primary-blue hover:underline mb-4 inline-block">
                    ← Torna alla Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-secondary-darkGray">Acquista Garanzia Sole</h1>
                <p className="text-secondary-darkGray/60">Garantisci il bel tempo per il tuo evento speciale</p>
            </div>

            <div className="card bg-white p-8">
                {error && (
                    <div className="bg-red-50 border-l-4 border-status-error text-status-error px-4 py-3 rounded mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handlePurchase} className="space-y-6">
                    <div className="form-group">
                        <label className="form-label text-secondary-darkGray font-semibold mb-2 block">Città dell'evento</label>
                        <input
                            type="text"
                            className="form-input w-full p-3 border rounded-lg"
                            placeholder="es. Roma, Milano..."
                            required
                            value={formData.citta}
                            onChange={(e) => setFormData({ ...formData, citta: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label text-secondary-darkGray font-semibold mb-2 block">Data dell'evento</label>
                        <input
                            type="date"
                            className="form-input w-full p-3 border rounded-lg"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            value={formData.data_evento}
                            onChange={(e) => setFormData({ ...formData, data_evento: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="form-label text-secondary-darkGray font-semibold mb-2 block">Tipologia</label>
                            <select
                                className="form-input w-full p-3 border rounded-lg"
                                value={formData.is_full_day ? 'full' : 'hours'}
                                onChange={(e) => setFormData({ ...formData, is_full_day: e.target.value === 'full' })}
                            >
                                <option value="full">Intera Giornata (€7.99)</option>
                                <option value="hours">Fascia Oraria (€1.99)</option>
                            </select>
                        </div>
                    </div>

                    {!formData.is_full_day && (
                        <div className="grid grid-cols-2 gap-4 fade-in">
                            <div className="form-group">
                                <label className="form-label text-secondary-darkGray font-semibold mb-2 block">Ora Inizio</label>
                                <input
                                    type="time"
                                    className="form-input w-full p-3 border rounded-lg"
                                    required={!formData.is_full_day}
                                    value={formData.ora_inizio}
                                    onChange={(e) => setFormData({ ...formData, ora_inizio: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label text-secondary-darkGray font-semibold mb-2 block">Ora Fine</label>
                                <input
                                    type="time"
                                    className="form-input w-full p-3 border rounded-lg"
                                    required={!formData.is_full_day}
                                    value={formData.ora_fine}
                                    onChange={(e) => setFormData({ ...formData, ora_fine: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    <div className="pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-secondary-darkGray">Totale da pagare:</span>
                            <span className="text-3xl font-bold text-secondary-darkGray">
                                €{formData.is_full_day ? '7.99' : '1.99'}
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full py-4 text-lg disabled:opacity-50"
                        >
                            {loading ? 'Elaborazione...' : 'Conferma e Acquista'}
                        </button>
                        <p className="text-center text-xs text-secondary-darkGray/50 mt-4">
                            In questa versione demo, l'acquisto è simulato e non richiede pagamento reale.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
