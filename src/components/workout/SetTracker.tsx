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
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-muted uppercase tracking-wider">Sets completed</span>
        <span className="text-base font-bold">{completed}/{totalSets}</span>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: totalSets }).map((_, i) => {
          const done = i < completed
          return (
            <button
              key={i}
              onClick={() => onChange(done ? i : i + 1)}
              className="flex-1 rounded-2xl font-bold text-base transition-all active:scale-90 select-none"
              style={{
                minHeight: 64,
                ...(done
                  ? { backgroundColor: accentColor, color: '#0D0D0D', boxShadow: `0 4px 16px ${accentColor}40` }
                  : { backgroundColor: 'rgba(255,255,255,0.06)', color: '#6B7280', border: '1px solid rgba(255,255,255,0.1)' }),
              }}
            >
              {done ? '✓' : i + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}
