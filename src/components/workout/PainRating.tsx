'use client'

interface PainRatingProps {
  value: number
  onChange: (v: number) => void
}

const FACES = ['😊', '🙂', '😐', '😟', '😣']
const LABELS = ['Great', 'Fine', 'Okay', 'Ouch', 'Pain']
const COLORS = ['#6BA354', '#8AAF5A', '#E8A84B', '#D4854B', '#E85B5B']

export const PainRating = ({ value, onChange }: PainRatingProps) => {
  return (
    <div className="flex gap-2">
      {FACES.map((face, i) => {
        const v = i + 1
        const selected = value === v
        return (
          <button
            key={v}
            onClick={() => onChange(v)}
            className="flex-1 flex flex-col items-center gap-1 rounded-2xl transition-all active:scale-90 select-none"
            style={{
              minHeight: 68,
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: selected ? `${COLORS[i]}20` : 'rgba(255,255,255,0.04)',
              border: selected ? `1.5px solid ${COLORS[i]}60` : '1.5px solid transparent',
            }}
          >
            <span className="text-2xl leading-none">{face}</span>
            <span className="text-[11px] font-semibold" style={{ color: selected ? COLORS[i] : '#6B7280' }}>
              {LABELS[i]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
