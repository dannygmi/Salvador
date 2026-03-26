'use client'

interface SetTrackerProps {
  totalSets: number
  completed: number
  onChange: (n: number) => void
  accentColor?: string
}

export const SetTracker = ({ totalSets, completed, onChange, accentColor = '#E8A84B' }: SetTrackerProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-muted uppercase tracking-wider">Sets</span>
        <span className="text-sm font-semibold">{completed}/{totalSets}</span>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: totalSets }).map((_, i) => {
          const done = i < completed
          return (
            <button
              key={i}
              onClick={() => onChange(done ? i : i + 1)}
              className="flex-1 h-12 rounded-xl font-bold text-sm transition-all active:scale-95"
              style={done
                ? { backgroundColor: accentColor, color: '#0D0D0D' }
                : { backgroundColor: 'rgba(255,255,255,0.06)', color: '#6B7280', border: '1px solid rgba(255,255,255,0.1)' }
              }
            >
              {done ? '✓' : i + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}
