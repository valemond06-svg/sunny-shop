'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { generateBuonoCode, formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function NewBuonoPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [step, setStep] = useState<'form' | 'payment'>('form')

    const [formData, setFormData] = useState({
        citta: '',
        data_evento: '',
        ora_inizio: '09:00',
        ora_fine: '10:00',
        is_full_day: true,
    })

    const [paymentData, setPaymentData] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    })

    // Helper to validate duration
    const validateDuration = () => {
        if (formData.is_full_day) return true;

        const [h1, m1] = formData.ora_inizio.split(':').map(Number);
        const [h2, m2] = formData.ora_fine.split(':').map(Number);

        const startMinutes = h1 * 60 + m1;
        const endMinutes = h2 * 60 + m2;
        const diff = endMinutes - startMinutes;

        if (diff <= 0) {
            setError('L\'ora di fine deve essere successiva all\'ora di inizio');
            return false;
        }

        if (diff > 60) {
            setError('La fascia oraria da €1.99 può durare al massimo 1 ora');
            return false;
        }

        return true;
    }

    const handleStepToPayment = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (validateDuration()) {
            setStep('payment')
        }
    }

    const handleFinalPurchase = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                router.push('/auth/login')
                return
            }

            // Simulate network delay for payment
            await new Promise(resolve => setTimeout(resolve, 1500))

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
                <button
                    onClick={() => step === 'payment' ? setStep('form') : router.push('/dashboard')}
                    className="text-primary-blue hover:underline mb-4 inline-block bg-transparent border-none p-0 cursor-pointer"
                >
                    ← {step === 'payment' ? 'Modifica Dati' : 'Torna alla Dashboard'}
                </button>
                <h1 className="text-3xl font-bold text-secondary-darkGray">
                    {step === 'form' ? 'Acquista Garanzia Sole' : 'Metodo di Pagamento'}
                </h1>
                <p className="text-secondary-darkGray/60">
                    {step === 'form' ? 'Garantisci il bel tempo per il tuo evento speciale' : 'Completa l\'acquisto in modo sicuro'}
                </p>
            </div>

            <div className="card bg-white p-8 relative overflow-hidden">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
                    <div className={`h-full bg-primary-yellow transition-all duration-500 ${step === 'form' ? 'w-1/2' : 'w-full'}`}></div>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-status-error text-status-error px-4 py-3 rounded mb-6 text-sm flex items-center gap-2">
                        <span>⚠️</span> {error}
                    </div>
                )}

                {step === 'form' ? (
                    <form onSubmit={handleStepToPayment} className="space-y-6">
                        <div className="form-group">
                            <label className="form-label text-secondary-darkGray font-semibold mb-2 block">Città dell'evento</label>
                            <input
                                type="text"
                                className="form-input w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-blue/20 outline-none"
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
                                className="form-input w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-blue/20 outline-none"
                                required
                                min={new Date().toISOString().split('T')[0]}
                                value={formData.data_evento}
                                onChange={(e) => setFormData({ ...formData, data_evento: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label text-secondary-darkGray font-semibold mb-2 block">Tipologia di Garanzia</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, is_full_day: true })}
                                    className={`p-4 border-2 rounded-xl text-left transition-all ${formData.is_full_day ? 'border-primary-yellow bg-yellow-50' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <div className="text-xl mb-1">📅</div>
                                    <div className="font-bold text-secondary-darkGray">Intera Giornata</div>
                                    <div className="text-xs text-secondary-darkGray/60">Protezione 24h</div>
                                    <div className="mt-2 font-bold text-primary-blue">€7.99</div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, is_full_day: false })}
                                    className={`p-4 border-2 rounded-xl text-left transition-all ${!formData.is_full_day ? 'border-primary-yellow bg-yellow-50' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <div className="text-xl mb-1">⏱️</div>
                                    <div className="font-bold text-secondary-darkGray">Fascia Oraria</div>
                                    <div className="text-xs text-secondary-darkGray/60">Max 1 ora</div>
                                    <div className="mt-2 font-bold text-primary-blue">€1.99</div>
                                </button>
                            </div>
                        </div>

                        {!formData.is_full_day && (
                            <div className="grid grid-cols-2 gap-4 fade-in bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                <div className="form-group">
                                    <label className="form-label text-secondary-darkGray text-xs font-semibold mb-1 block uppercase tracking-wider">Ora Inizio</label>
                                    <input
                                        type="time"
                                        className="form-input w-full p-2 border rounded-lg"
                                        required={!formData.is_full_day}
                                        value={formData.ora_inizio}
                                        onChange={(e) => setFormData({ ...formData, ora_inizio: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label text-secondary-darkGray text-xs font-semibold mb-1 block uppercase tracking-wider">Ora Fine</label>
                                    <input
                                        type="time"
                                        className="form-input w-full p-2 border rounded-lg"
                                        required={!formData.is_full_day}
                                        value={formData.ora_fine}
                                        onChange={(e) => setFormData({ ...formData, ora_fine: e.target.value })}
                                    />
                                </div>
                                <p className="col-span-2 text-[10px] text-primary-blue mt-1">
                                    💡 Suggerimento: Seleziona l'ora esatta del tuo momento più importante.
                                </p>
                            </div>
                        )}

                        <div className="pt-6 border-t border-gray-100">
                            <button
                                type="submit"
                                className="btn btn-primary w-full py-4 text-lg font-bold flex items-center justify-center gap-2"
                            >
                                Continua al Pagamento <span>→</span>
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleFinalPurchase} className="space-y-6 fade-in">
                        {/* Order Summary */}
                        <div className="bg-gray-50 p-4 rounded-xl mb-6">
                            <h3 className="text-xs font-bold text-secondary-darkGray/40 uppercase mb-3">Riepilogo Ordine</h3>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-secondary-darkGray">{formData.citta}</div>
                                    <div className="text-sm text-secondary-darkGray/60">
                                        {formatDate(formData.data_evento)} {formData.is_full_day ? '(Intera Giornata)' : `(${formData.ora_inizio} - ${formData.ora_fine})`}
                                    </div>
                                </div>
                                <div className="text-xl font-bold text-primary-blue">
                                    €{formData.is_full_day ? '7.99' : '1.99'}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="form-group">
                                <label className="form-label text-secondary-darkGray text-sm font-semibold mb-2 block">Intestatario Carta</label>
                                <input
                                    type="text"
                                    className="form-input w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-blue/20 outline-none"
                                    placeholder="Nome sulla carta"
                                    required
                                    value={paymentData.cardName}
                                    onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label text-secondary-darkGray text-sm font-semibold mb-2 block">Numero Carta</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="form-input w-full p-3 border rounded-lg pl-12 focus:ring-2 focus:ring-primary-blue/20 outline-none"
                                        placeholder="0000 0000 0000 0000"
                                        maxLength={16}
                                        required
                                        value={paymentData.cardNumber}
                                        onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value.replace(/\D/g, '') })}
                                    />
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">💳</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-group">
                                    <label className="form-label text-secondary-darkGray text-sm font-semibold mb-2 block">Scadenza</label>
                                    <input
                                        type="text"
                                        className="form-input w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-blue/20 outline-none"
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        required
                                        value={paymentData.expiry}
                                        onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label text-secondary-darkGray text-sm font-semibold mb-2 block">CVV</label>
                                    <input
                                        type="password"
                                        className="form-input w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-blue/20 outline-none"
                                        placeholder="123"
                                        maxLength={3}
                                        required
                                        value={paymentData.cvv}
                                        onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value.replace(/\D/g, '') })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-full py-4 text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Elaborazione...
                                    </>
                                ) : (
                                    <>Paga Ora €{formData.is_full_day ? '7.99' : '1.99'}</>
                                )}
                            </button>
                            <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-secondary-darkGray/40 uppercase font-bold tracking-widest">
                                <span>🔒 Pagamento Crittografato</span>
                                <span className="text-gray-200">|</span>
                                <span>Powered by MockStripe</span>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
