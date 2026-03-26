'use client'

import { STREAK_MULTIPLIER } from '@/lib/xp'
import { clsx } from 'clsx'

interface StreakCounterProps {
  streak: number
  freezeAvailable: boolean
  compact?: boolean
}

export const StreakCounter = ({ streak, freezeAvailable, compact = false }: StreakCounterProps) => {
  const multiplier = STREAK_MULTIPLIER(streak)
  const isHot = streak >= 7

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <span className={clsx('flame-icon text-xl', streak === 0 && 'grayscale opacity-40')}>🔥</span>
        <span className={clsx('font-bold text-lg', streak > 0 ? 'text-gold' : 'text-muted')}>{streak}</span>
        {multiplier > 1 && (
          <span className="text-xs font-bold text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded-lg">
            {multiplier}×
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className={clsx('flame-icon text-4xl', streak === 0 && 'grayscale opacity-40')}>🔥</span>
        <span className={clsx('text-5xl font-black', streak > 0 ? 'text-gold' : 'text-muted')}>{streak}</span>
      </div>
      <p className="text-muted text-sm">
        {streak === 0 ? 'Start your streak today!' : `${streak} day streak`}
      </p>
      {multiplier > 1 && (
        <div className="mt-2 inline-flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 rounded-xl px-3 py-1">
          <span className="text-orange-400 font-bold text-sm">{multiplier}× XP multiplier active!</span>
        </div>
      )}
      {freezeAvailable && streak > 0 && (
        <p className="text-xs text-muted mt-2">❄️ Streak freeze available</p>
      )}
    </div>
  )
}
