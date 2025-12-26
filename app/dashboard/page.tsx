'use client'

export default function DashboardPage() {
  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-secondary-darkGray mb-2">Benvenuto! ☀️</h1>
        <p className="text-secondary-darkGray/60">Gestisci i tuoi buoni sole e scopri quando il sole brillerà per te</p>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-yellow to-orange-500 rounded-lg shadow-lg p-8 mb-10 text-center">
        <h2 className="text-2xl font-bold text-secondary-darkGray mb-2">Crea il tuo primo Buono Sole</h2>
        <p className="text-secondary-darkGray/80 mb-4">Acquista garanzia sole per il tuo evento a soli €1.99 o €7.99</p>
        <button className="btn btn-primary">
          Acquista Buono
        </button>
      </div>

      {/* Buoni Section */}
      <div>
        <h2 className="text-2xl font-bold text-secondary-darkGray mb-6">I Tuoi Buoni Sole</h2>

        {/* Empty State */}
        <div className="empty-state card">
          <div className="empty-state-icon">☀️</div>
          <div className="empty-state-title">Nessun buono ancora</div>
          <div className="empty-state-text">Inizia a garantire il sole per il tuo prossimo evento</div>
          <button className="btn btn-primary">
            Crea il tuo primo Buono
          </button>
        </div>
      </div>
    </div>
  )
}
