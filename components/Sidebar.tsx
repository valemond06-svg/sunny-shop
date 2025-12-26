'use client'

export default function Sidebar({ side = 'left' }: { side?: 'left' | 'right' }) {
  return (
    <aside className={`w-72 bg-white rounded-lg shadow-default p-5 sticky top-24 h-fit ${side === 'right' ? 'hidden lg:block' : 'hidden lg:block'}`}>
      <div className="text-center text-secondary-darkGray/50 text-xs py-10">
        📢 Banner Pubblicitario {side === 'left' ? 'Sinistro' : 'Destro'}
      </div>
      {/* Placeholder for ads */}
      <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-400 text-xs min-h-96">
        Spazio per annunci pubblicitari
      </div>
    </aside>
  )
}
