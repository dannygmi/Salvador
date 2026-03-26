'use client'

import { useState, useRef } from 'react'
import { useAppState } from '@/hooks/useAppState'
import { BottomNav } from '@/components/ui/BottomNav'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ExerciseCard } from '@/components/workout/ExerciseCard'
import { LevelUpModal } from '@/components/gamification/LevelUpModal'
import { EXERCISES, getExercisesByPhase } from '@/data/exercises'
import { PHASES, getPhaseAccent } from '@/data/phases'
import type { ExerciseLog } from '@/types'
import { toISODateString } from '@/lib/dateUtils'
import { Zap, CheckCircle } from 'lucide-react'
import { clsx } from 'clsx'

export default function WorkoutPage() {
  const { state, loaded, completeWorkout } = useAppState()
  const [completedLogs, setCompletedLogs] = useState<ExerciseLog[]>([])
  const [sessionActive, setSessionActive] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [levelUpData, setLevelUpData] = useState<{ newLevel: number; xp: number } | null>(null)
  const startTime = useRef<number>(Date.now())

  if (!loaded) return <div className="flex items-center justify-center min-h-screen"><div className="text-4xl animate-pulse">💪</div></div>

  const { user } = state
  const phase = PHASES.find(p => p.id === user.currentPhase)!
  const accent = getPhaseAccent(user.currentPhase)
  const exercises = getExercisesByPhase(user.currentPhase)
  const completedIds = new Set(completedLogs.filter(l => l.completed).map(l => l.exerciseId))
  const today = toISODateString()
  const alreadyDoneToday = state.sessions.some(s => s.date === today)

  const totalXP = completedLogs.reduce((sum, log) => {
    const ex = exercises.find(e => e.id === log.exerciseId)
    return sum + (ex?.xp ?? 0)
  }, 0)

  const handleExerciseComplete = (exerciseId: string, log: ExerciseLog) => {
    setCompletedLogs(prev => {
      const filtered = prev.filter(l => l.exerciseId !== exerciseId)
      return [...filtered, log]
    })
  }

  const handleFinishWorkout = () => {
    const duration = Math.round((Date.now() - startTime.current) / 60000)
    const result = completeWorkout({
      date: today,
      phase: user.currentPhase,
      exercises: completedLogs,
      totalXP,
      duration: Math.max(1, duration),
    })
    setSessionComplete(true)
    if (result.leveledUp) {
      setLevelUpData({ newLevel: result.newLevel, xp: result.multipliedXP })
    }
  }

  if (sessionComplete && !levelUpData) {
    return (
      <>
        <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center pb-24">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-black mb-2">Workout Complete!</h1>
          <p className="text-muted mb-4">
            {completedLogs.filter(l => l.completed).length} exercises · {totalXP} XP earned
          </p>
          <div className="bg-gold/10 border border-gold/20 rounded-xl px-6 py-3 mb-8">
            <span className="text-gold font-bold text-lg">+{totalXP} XP</span>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => { setSessionActive(false); setSessionComplete(false); setCompletedLogs([]) }}
          >
            Done
          </Button>
        </main>
        <BottomNav />
      </>
    )
  }

  return (
    <>
      {levelUpData && (
        <LevelUpModal
          newLevel={levelUpData.newLevel}
          xpEarned={levelUpData.xp}
          onClose={() => { setLevelUpData(null) }}
        />
      )}

      <main className="min-h-screen pb-24 max-w-lg mx-auto">
        {/* Header */}
        <div className="px-4 pt-safe pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black">Workout</h1>
              <p className="text-sm font-medium" style={{ color: accent }}>
                Phase {user.currentPhase}: {phase.name}
              </p>
            </div>
            {sessionActive && (
              <div className="flex items-center gap-1.5 bg-gold/10 border border-gold/20 rounded-xl px-3 py-1.5">
                <Zap size={14} className="text-gold" />
                <span className="text-gold font-bold text-sm">{totalXP} XP</span>
              </div>
            )}
          </div>
        </div>

        <div className="px-4 space-y-4">
          {/* Already done today */}
          {alreadyDoneToday && !sessionActive && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <CheckCircle className="text-green-400 shrink-0" size={20} />
              <div>
                <p className="text-green-400 font-semibold text-sm">Already crushed it today!</p>
                <p className="text-xs text-muted">You can log another session if you want.</p>
              </div>
            </div>
          )}

          {/* Phase habits */}
          <Card className="p-4" glowColor={accent}>
            <h3 className="font-bold text-sm mb-3 text-muted uppercase tracking-wider">Daily Habits</h3>
            <ul className="space-y-2">
              {phase.habits.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  <span className="text-white/80">{h}</span>
                </li>
              ))}
            </ul>
          </Card>

          {!sessionActive ? (
            <Button
              variant="primary"
              size="lg"
              fullWidth
              style={{ backgroundColor: accent, color: '#0D0D0D' }}
              onClick={() => { setSessionActive(true); startTime.current = Date.now() }}
            >
              Start Session
            </Button>
          ) : (
            <>
              {/* Exercise list */}
              <div className="space-y-3">
                {exercises.map(ex => (
                  <ExerciseCard
                    key={ex.id}
                    exercise={ex}
                    phaseAccent={accent}
                    isCompleted={completedIds.has(ex.id)}
                    onComplete={log => handleExerciseComplete(ex.id, log)}
                  />
                ))}
              </div>

              {/* Finish workout */}
              {completedLogs.length > 0 && (
                <Card className="p-4">
                  <p className="text-sm text-muted mb-3">
                    {completedLogs.filter(l => l.completed).length}/{exercises.length} exercises complete
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleFinishWorkout}
                    style={{ backgroundColor: accent, color: '#0D0D0D' }}
                  >
                    Finish Workout · +{totalXP} XP
                  </Button>
                </Card>
              )}
            </>
          )}

          <div className="h-4" />
        </div>
      </main>

      <BottomNav />
    </>
  )
}
