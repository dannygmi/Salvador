'use client'

import type { BadgeState } from '@/types'
import { BADGE_DEFS } from '@/data/badges'
import { clsx } from 'clsx'
import { formatDate } from '@/lib/dateUtils'

interface BadgeGridProps {
  badges: Record<string, BadgeState>
  limit?: number
}

export const BadgeGrid = ({ badges, limit }: BadgeGridProps) => {
  const defs = limit
    ? BADGE_DEFS.filter(b => badges[b.id]?.unlockedAt).slice(-limit).reverse()
    : BADGE_DEFS

  return (
    <div className="grid grid-cols-3 gap-3">
      {defs.map(def => {
        const badge = badges[def.id]
        const unlocked = !!badge?.unlockedAt
        return (
          <div
            key={def.id}
            className={clsx(
              'flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center',
              unlocked
                ? 'bg-card border-gold/30 shadow-sm shadow-gold/10'
                : 'bg-white/5 border-border opacity-40'
            )}
          >
            <span className={clsx('text-3xl', !unlocked && 'grayscale')}>{def.icon}</span>
            <span className={clsx('text-xs font-semibold leading-tight', unlocked ? 'text-white' : 'text-muted')}>
              {def.name}
            </span>
            {unlocked && badge.unlockedAt && (
              <span className="text-[10px] text-gold/70">{formatDate(badge.unlockedAt)}</span>
            )}
            {!unlocked && (
              <span className="text-[10px] text-muted">{def.description}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
