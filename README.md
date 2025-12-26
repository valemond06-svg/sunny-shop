# ☀️ Sunny Shop

**Garanzia Sole per i Tuoi Eventi** - Un'applicazione web innovativa che ti permette di acquistare una garanzia sole per i tuoi eventi. Se non c'è sole, ricevi un rimborso completo!

## 🌟 Caratteristiche

- **Acquisto Buoni Sole**: Acquista garanzia sole per i tuoi eventi a partire da €1.99
- **Verifica Meteo Automatica**: Sistema automatico di verifica delle condizioni meteorologiche
- **Gestione Account**: Sistema di autenticazione sicuro con Supabase
- **Dashboard Intuitiva**: Gestisci tutti i tuoi buoni sole in un'unica interfacia
- **Design Moderno**: Interfaccia utente pulita e responsive

## 🚀 Stack Tecnologico

- **Framework**: [Next.js 14](https://nextjs.org/) con App Router
- **Linguaggio**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Auth**: [Supabase](https://supabase.com/)
- **Form Validation**: React Hook Form + Zod

## 📋 Prerequisiti

- Node.js 20.x o superiore
- Account Supabase (gratuito)

## 🛠️ Installazione

1. **Clona il repository**
```bash
git clone https://github.com/tuo-username/sunny-shop.git
cd sunny-shop
```

2. **Installa le dipendenze**
```bash
npm install
```

3. **Configura le variabili d'ambiente**

Copia il file `.env.example` in `.env`:
```bash
cp .env.example .env
```

Modifica il file `.env` con le tue credenziali Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

> **Come ottenere le credenziali Supabase:**
> 1. Vai su [https://app.supabase.com](https://app.supabase.com)
> 2. Crea un nuovo progetto (o usa uno esistente)
> 3. Vai in Settings > API
> 4. Copia l'URL del progetto e la chiave anon/public

4. **Configura il database Supabase**

Nel tuo progetto Supabase, crea le seguenti tabelle (SQL disponibile in `/docs/database-schema.sql` se presente):

- `users` - Gestione utenti
- `buoni` - Buoni sole acquistati
- `rimborsi` - Richieste di rimborso
- `transazioni` - Storico transazioni

5. **Avvia il server di sviluppo**
```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel tuo browser.

## 📝 Script Disponibili

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Crea la build di produzione
- `npm run start` - Avvia il server di produzione
- `npm run lint` - Esegui il linting del codice

## 📦 Struttura del Progetto

```
sunny-shop/
├── app/                    # Next.js App Router
│   ├── auth/              # Pagine di autenticazione
│   ├── dashboard/         # Dashboard utente
│   ├── layout.tsx         # Layout principale
│   ├── page.tsx           # Homepage
│   └── globals.css        # Stili globali
├── components/            # Componenti riutilizzabili
│   ├── Header.tsx
│   └── Sidebar.tsx
├── lib/                   # Utilità e configurazioni
│   ├── auth.ts           # Funzioni di autenticazione
│   ├── supabase.ts       # Client Supabase
│   └── utils.ts          # Utility functions
├── types/                 # TypeScript type definitions
│   └── database.ts
└── public/               # File statici
```

## 🎨 Design System

Il progetto utilizza un design system personalizzato definito in `app/globals.css` con:

- **Colori Primari**: Yellow (#FFD700) e Blue (#1E90FF)
- **Colori Secondari**: Dark Gray e Light Gray
- **Stati**: Success, Warning, Error
- **Componenti**: Bottoni, form, card, shadow utilities

## 🔐 Sicurezza

- Le credenziali Supabase non sono mai committate nel repository
- Usa sempre variabili d'ambiente per i dati sensibili
- Il file `.env` è incluso nel `.gitignore`

## 🚢 Deployment

### Vercel (Consigliato)

1. Push del codice su GitHub
2. Connetti il repository a [Vercel](https://vercel.com)
3. Configura le variabili d'ambiente nel dashboard Vercel
4. Deploy automatico!

### Altre Piattaforme

Il progetto può essere deployato su qualsiasi piattaforma che supporti Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 🤝 Contribuire

I contributi sono benvenuti! Per favore:

1. Fai un fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è sotto licenza MIT - vedi il file [LICENSE](LICENSE) per i dettagli.

## 📞 Contatti

Per domande o supporto, apri una issue su GitHub.

---

Realizzato con ☀️ da [Il Tuo Nome]
