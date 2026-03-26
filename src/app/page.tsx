'use client'

import { useState, useEffect } from 'react'
import { useAppState } from '@/hooks/useAppState'
import { BottomNav } from '@/components/ui/BottomNav'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { XPBar } from '@/components/gamification/XPBar'
import { StreakCounter } from '@/components/gamification/StreakCounter'
import { BadgeGrid } from '@/components/gamification/BadgeGrid'
import { WeeklySummary } from '@/components/tracking/WeeklySummary'
import { PHASES, MOTIVATIONAL_QUOTES, RED_FLAGS, AVOID_LIST } from '@/data/phases'
import { getPhaseAccent } from '@/data/phases'
import { AlertTriangle, ChevronRight, Zap, Shield } from 'lucide-react'
import Link from 'next/link'
import { toISODateString } from '@/lib/dateUtils'
import { clsx } from 'clsx'

const Disclaimer = ({ onAccept }: { onAccept: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-end bg-black/80 backdrop-blur-sm">
    <div className="bg-card border-t border-border rounded-t-3xl p-6 w-full max-w-lg mx-auto pb-safe">
      <div className="w-12 h-1 bg-border rounded-full mx-auto mb-5" />
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
          <Shield className="text-gold" size={20} />
        </div>
        <h2 className="text-xl font-black">Medical Disclaimer</h2>
      </div>
      <p className="text-white/70 text-sm leading-relaxed mb-5">
        This app is for <strong className="text-white">personal tracking only</strong>. It is not medical advice.
        Always work with a physiotherapist or spine specialist before starting any exercise program.
        If you experience any red flag symptoms (loss of bladder/bowel control, progressive weakness,
        saddle numbness), seek emergency care immediately.
      </p>
      <Button variant="primary" size="lg" fullWidth onClick={onAccept}>
        I Understand — Let's Go
      </Button>
    </div>
  </div>
)

export default function HomePage() {
  const { state, loaded, acceptDisclaimer } = useAppState()
  const [quote, setQuote] = useState('')
  const [showRedFlags, setShowRedFlags] = useState(false)

  useEffect(() => {
    const idx = Math.floor(Date.now() / 86400000) % MOTIVATIONAL_QUOTES.length
    setQuote(MOTIVATIONAL_QUOTES[idx])
  }, [])

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-4xl animate-pulse">🏋️</div>
      </div>
    )
  }

  const { user, sessions, badges, symptoms } = state
  const phase = PHASES.find(p => p.id === user.currentPhase)!
  const accent = getPhaseAccent(user.currentPhase)
  const today = toISODateString()
  const hasWorkedOutToday = sessions.some(s => s.date === today)

  // Symptom sparkline (last 7 days back pain)
  const last7Symptoms = symptoms
    .filter(s => s.date >= toISODateString(new Date(Date.now() - 6 * 86400000)))
    .sort((a, b) => a.date.localeCompare(b.date))

  return (
    <>
      {!user.disclaimerAccepted && <Disclaimer onAccept={acceptDisclaimer} />}

      <main className="min-h-screen pb-nav max-w-lg mx-auto">
        {/* Header */}
        <div className="px-4 pt-app pb-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-2xl font-black">SpineQuest</h1>
              <p className="text-muted text-sm">L4-L5 · L5-S1 Recovery</p>
            </div>
            <div className="flex items-center gap-3">
              <StreakCounter streak={user.currentStreak} freezeAvailable={user.streakFreezeAvailable} compact />
            </div>
          </div>
        </div>

        <div className="px-4 space-y-4">
          {/* XP / Level Bar */}
          <Card className="p-4">
            <XPBar totalXP={user.totalXP} level={user.level} />
          </Card>

          {/* Daily quote */}
          {quote && (
            <div className="px-3 py-3 rounded-xl border border-white/10 bg-white/3 italic text-sm text-white/60 text-center">
              "{quote}"
            </div>
          )}

          {/* Current Phase */}
          <Card className="p-4" glowColor={accent}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-bold" style={{ color: accent }}>Phase {user.currentPhase}</span>
                <h2 className="text-lg font-bold leading-tight">{phase.name}</h2>
                <p className="text-xs text-muted">{phase.weeks}</p>
              </div>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-black"
                style={{ backgroundColor: `${accent}20`, color: accent }}
              >
                {user.currentPhase}
              </div>
            </div>
            <p className="text-sm text-white/70 mb-4">{phase.goal}</p>
            <Link href="/workout">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                style={{ backgroundColor: accent, color: hasWorkedOutToday ? undefined : '#0D0D0D' }}
              >
                {hasWorkedOutToday ? '✓ Workout Done Today' : "Today's Workout →"}
              </Button>
            </Link>
          </Card>

          {/* Weekly Summary */}
          <Card className="p-4">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Zap size={16} className="text-gold" /> This Week
            </h3>
            <WeeklySummary sessions={sessions} />
          </Card>

          {/* Symptom Sparkline */}
          {last7Symptoms.length > 0 && (
            <Card className="p-4">
              <h3 className="font-bold mb-3 text-sm">7-Day Pain Trend</h3>
              <div className="flex items-end gap-1 h-12">
                {last7Symptoms.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-sm transition-all"
                      style={{
                        height: `${Math.max(4, (s.backPain / 10) * 44)}px`,
                        backgroundColor: s.backPain > 6 ? '#E85B5B' : s.backPain > 3 ? '#E8A84B' : '#6BA354',
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-muted mt-1">
                <span>7 days ago</span>
                <span>today</span>
              </div>
              <Link href="/progress">
                <p className="text-xs text-gold mt-2 text-center">Log symptoms & view full chart →</p>
              </Link>
            </Card>
          )}

          {/* Recent Badges */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold">Recent Badges</h3>
              <Link href="/progress" className="text-xs text-gold">View all</Link>
            </div>
            <BadgeGrid badges={badges} limit={3} />
            {Object.values(badges).filter(b => b.unlockedAt).length === 0 && (
              <p className="text-muted text-sm text-center py-3">Complete your first session to earn badges!</p>
            )}
          </Card>

          {/* Red Flags */}
          <button
            onClick={() => setShowRedFlags(!showRedFlags)}
            className="w-full flex items-center gap-3 p-4 rounded-2xl bg-danger/5 border border-danger/20 text-left active:bg-danger/10 transition-colors"
          >
            <AlertTriangle className="text-danger shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-danger font-bold text-sm">Red Flag Symptoms</p>
              <p className="text-xs text-white/50">Tap to see when to seek emergency care</p>
            </div>
            <ChevronRight className={clsx('text-danger shrink-0 transition-transform', showRedFlags && 'rotate-90')} size={16} />
          </button>

          {showRedFlags && (
            <Card className="p-4 border-danger/30 animate-fade-in">
              <ul className="space-y-2">
                {RED_FLAGS.map((flag, i) => (
                  <li key={i} className={clsx('flex items-start gap-2 text-sm', flag.severity === 'emergency' ? 'text-danger' : 'text-orange-400')}>
                    <span className="shrink-0 mt-0.5">{flag.severity === 'emergency' ? '🚨' : '⚠️'}</span>
                    <span>{flag.text}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted mt-3 border-t border-border pt-3">
                🚨 = Seek emergency care immediately · ⚠️ = Call your doctor urgently
              </p>
            </Card>
          )}

          {/* Avoid list */}
          <Card className="p-4">
            <h3 className="font-bold text-sm mb-2 text-danger">Always Avoid</h3>
            <ul className="space-y-1">
              {AVOID_LIST.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="text-danger shrink-0">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="h-4" />
        </div>
      </main>

      <BottomNav />
    </>
  )
}
