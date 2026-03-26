'use client'

interface PainRatingProps {
  value: number
  onChange: (v: number) => void
}

const FACES = ['😊', '🙂', '😐', '😟', '😣']
const LABELS = ['Great!', 'Fine', 'Okay', 'Uncomfortable', 'Painful']

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
            className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all active:scale-95 ${
              selected
                ? 'bg-gold/15 border border-gold/30'
                : 'bg-white/5 border border-transparent'
            }`}
          >
            <span className="text-xl">{face}</span>
            <span className="text-[10px] text-muted">{LABELS[i]}</span>
          </button>
        )
      })}
    </div>
  )
}
