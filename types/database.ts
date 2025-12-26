export type User = {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export type Buono = {
  id: string
  user_id: string
  codice_buono: string
  data_evento: string // YYYY-MM-DD
  ora_inizio: string // HH:mm
  ora_fine: string | null // HH:mm o null per full day
  importo: number // 1.99 o 7.99
  citta: string
  stato: 'attivo' | 'rimborso_accettato' | 'rimborso_rifiutato' | 'scaduto'
  data_creazione: string
  data_evento_passato: boolean
  certificato_url?: string
}

export type RimborsoRichiesto = {
  id: string
  buono_id: string
  data_richiesta: string
  status: 'in_verifica' | 'approvato' | 'rifiutato'
  condizioni_meteo: {
    pioggia: boolean
    nuvolosita: number
    citta: string
    data: string
  } | null
  data_verifica: string | null
}

export type Transazione = {
  id: string
  buono_id: string
  tipo: 'pagamento' | 'rimborso'
  importo: number
  stripe_payment_id: string | null
  data: string
  status: 'completato' | 'fallito' | 'in_sospeso'
}

export type MeteoData = {
  main: {
    temp: number
    feels_like: number
    humidity: number
  }
  clouds: {
    all: number // 0-100 nuvolosità
  }
  rain?: {
    '1h': number
  }
  weather: Array<{
    main: string
    description: string
  }>
}
