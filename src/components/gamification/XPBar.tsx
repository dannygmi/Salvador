'use client'

import { useEffect, useRef, useState } from 'react'
import { getXPProgressInCurrentLevel, getLevelTitle } from '@/lib/xp'
import { clsx } from 'clsx'

interface XPBarProps {
  totalXP: number
  level: number
  compact?: boolean
}

export const XPBar = ({ totalXP, level, compact = false }: XPBarProps) => {
  const { current, needed, percent } = getXPProgressInCurrentLevel(totalXP)
  const [displayPercent, setDisplayPercent] = useState(0)
  const animated = useRef(false)

  useEffect(() => {
    if (!animated.current) {
      animated.current = true
      const timer = setTimeout(() => setDisplayPercent(percent), 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayPercent(percent)
    }
  }, [percent])

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-gold font-bold text-sm">Lv.{level}</span>
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold/80 to-gold rounded-full transition-all duration-700"
            style={{ width: `${displayPercent}%` }}
          />
        </div>
        <span className="text-xs text-muted">{current}/{needed}</span>
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-gold">Level {level}</span>
          <span className="text-muted text-sm font-medium">{getLevelTitle(level)}</span>
        </div>
        <span className="text-xs text-muted">{current} / {needed} XP</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${displayPercent}%`,
            background: 'linear-gradient(90deg, #E8A84B 0%, #F5C87A 50%, #E8A84B 100%)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted">
        <span>{totalXP} total XP</span>
        <span>{needed - current} XP to Level {level + 1}</span>
      </div>
    </div>
  )
}
