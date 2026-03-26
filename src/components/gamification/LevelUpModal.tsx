'use client'

import { useEffect, useState } from 'react'
import { getLevelTitle } from '@/lib/xp'
import { Button } from '@/components/ui/Button'

interface LevelUpModalProps {
  newLevel: number
  xpEarned: number
  onClose: () => void
}

export const LevelUpModal = ({ newLevel, xpEarned, onClose }: LevelUpModalProps) => {
  const [confetti, setConfetti] = useState<Array<{ x: number; color: string; delay: number }>>([])

  useEffect(() => {
    setConfetti(
      Array.from({ length: 20 }, (_, i) => ({
        x: Math.random() * 100,
        color: ['#E8A84B', '#C7727E', '#5B8DB8', '#6BA354', '#8B6BAF'][i % 5],
        delay: Math.random() * 0.5,
      }))
    )
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      {confetti.map((c, i) => (
        <div
          key={i}
          className="absolute top-0 w-2 h-2 rounded-sm"
          style={{
            left: `${c.x}%`,
            backgroundColor: c.color,
            animation: `confettiFall ${1.5 + c.delay}s ease-in ${c.delay}s forwards`,
          }}
        />
      ))}

      <div className="bg-card border border-gold/40 rounded-3xl p-8 text-center max-w-xs w-full shadow-2xl level-glow animate-pop">
        <div className="text-6xl mb-3">⭐</div>
        <h2 className="text-3xl font-black text-gold mb-1">Level Up!</h2>
        <p className="text-5xl font-black mb-1">{newLevel}</p>
        <p className="text-muted mb-4">{getLevelTitle(newLevel)}</p>
        <div className="bg-gold/10 border border-gold/20 rounded-xl px-4 py-2 mb-6">
          <span className="text-gold font-bold">+{xpEarned} XP earned this session</span>
        </div>
        <Button variant="primary" size="lg" fullWidth onClick={onClose}>
          Keep Going! 💪
        </Button>
      </div>
    </div>
  )
}
