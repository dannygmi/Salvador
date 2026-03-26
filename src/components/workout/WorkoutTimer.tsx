'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

interface WorkoutTimerProps {
  durationSecs: number
  label?: string
  onComplete?: () => void
}

export const WorkoutTimer = ({ durationSecs, label, onComplete }: WorkoutTimerProps) => {
  const [remaining, setRemaining] = useState(durationSecs)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) {
            clearInterval(intervalRef.current!)
            setRunning(false)
            setDone(true)
            onComplete?.()
            return 0
          }
          return r - 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running, onComplete])

  const reset = () => {
    setRemaining(durationSecs)
    setRunning(false)
    setDone(false)
  }

  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60
  const progress = ((durationSecs - remaining) / durationSecs) * 100

  return (
    <div className="space-y-3">
      {label && <span className="text-xs font-bold text-muted uppercase tracking-wider">{label}</span>}

      {/* Circular progress */}
      <div className="flex items-center justify-center">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
            <circle
              cx="48" cy="48" r="40"
              fill="none"
              stroke={done ? '#6BA354' : '#E8A84B'}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {done ? (
              <span className="text-2xl">✓</span>
            ) : (
              <span className="text-xl font-bold tabular-nums">
                {mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setRunning(!running)}
          disabled={done}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 border border-gold/20 text-gold font-medium text-sm active:scale-95 disabled:opacity-40"
        >
          {running ? <Pause size={16} /> : <Play size={16} />}
          {running ? 'Pause' : done ? 'Done!' : 'Start'}
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 text-muted text-sm active:scale-95"
        >
          <RotateCcw size={14} />
        </button>
        {!done && (
          <button
            onClick={() => { setDone(true); setRunning(false); onComplete?.() }}
            className="px-3 py-2 rounded-xl bg-white/5 text-muted text-sm active:scale-95"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  )
}
