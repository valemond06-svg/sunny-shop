import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sunny Shop - Garanzia Sole per i Tuoi Eventi',
  description: 'Acquista un buono sole per i tuoi eventi. Rimborso completo se non c\'è sole.',
  icons: {
    icon: '☀️',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>
        {children}
      </body>
    </html>
  )
}
