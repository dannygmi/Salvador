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
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, onComplete])

  const reset = () => { setRemaining(durationSecs); setRunning(false); setDone(false) }

  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60
  const progress = ((durationSecs - remaining) / durationSecs) * 100
  const circumference = 2 * Math.PI * 52

  return (
    <div className="space-y-4">
      {label && (
        <p className="text-xs font-bold text-muted uppercase tracking-wider text-center">{label}</p>
      )}

      {/* Large circular timer */}
      <div className="flex items-center justify-center">
        <div className="relative w-36 h-36">
          <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
            <circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke={done ? '#6BA354' : running ? '#E8A84B' : 'rgba(232,168,75,0.4)'}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress / 100)}
              style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.3s' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {done ? (
              <span className="text-4xl">✓</span>
            ) : (
              <>
                <span className="text-3xl font-black tabular-nums leading-none">
                  {mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}`}
                </span>
                {mins === 0 && <span className="text-xs text-muted mt-0.5">sec</span>}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => setRunning(!running)}
          disabled={done}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all active:scale-95 disabled:opacity-40"
          style={running
            ? { background: 'rgba(232,168,75,0.15)', border: '1px solid rgba(232,168,75,0.3)', color: '#E8A84B' }
            : { background: '#E8A84B', color: '#0D0D0D' }}
        >
          {running ? <><Pause size={18} /> Pause</> : done ? '✓ Done' : <><Play size={18} /> Start</>}
        </button>
        <button
          onClick={reset}
          className="w-14 flex items-center justify-center rounded-2xl bg-white/5 text-muted active:scale-95"
          style={{ minHeight: 56 }}
        >
          <RotateCcw size={18} />
        </button>
        {!done && (
          <button
            onClick={() => { setDone(true); setRunning(false); onComplete?.() }}
            className="px-4 rounded-2xl bg-white/5 text-muted text-sm font-medium active:scale-95"
            style={{ minHeight: 56 }}
          >
            Skip
          </button>
        )}
      </div>
    </div>
  )
}
