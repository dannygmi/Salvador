'use client'

import { useState, useEffect, useCallback } from 'react'
import type { AppState, WorkoutSession, SymptomEntry, RecoveryLog, PhaseNumber } from '@/types'
import { loadState, saveState, defaultState } from '@/lib/storage'
import { getLevelFromXP, applyStreakMultiplier } from '@/lib/xp'
import { updateStreak } from '@/lib/streaks'
import { toISODateString } from '@/lib/dateUtils'
import { BADGE_DEFS } from '@/data/badges'
import { PHASES } from '@/data/phases'
import { v4 as uuidv4 } from 'uuid'

export const useAppState = () => {
  const [state, setState] = useState<AppState>(defaultState)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const s = loadState()
    setState(s)
    setLoaded(true)
  }, [])

  const persist = useCallback((next: AppState) => {
    setState(next)
    saveState(next)
  }, [])

  const acceptDisclaimer = useCallback(() => {
    const next = { ...state, user: { ...state.user, disclaimerAccepted: true } }
    persist(next)
  }, [state, persist])

  const completeWorkout = useCallback(
    (session: Omit<WorkoutSession, 'id'>) => {
      const today = toISODateString()
      const streakResult = updateStreak(
        state.user.lastWorkoutDate,
        state.user.currentStreak,
        state.user.longestStreak,
        state.user.streakFreezeAvailable
      )

      const multipliedXP = applyStreakMultiplier(session.totalXP, streakResult.newStreak)
      const newTotalXP = state.user.totalXP + multipliedXP
      const newLevel = getLevelFromXP(newTotalXP)
      const leveledUp = newLevel > state.user.level

      const fullSession: WorkoutSession = { ...session, id: uuidv4(), totalXP: multipliedXP }

      // Check badges
      const newBadges = { ...state.badges }
      const sessions = [...state.sessions, fullSession]
      const totalSessions = sessions.length

      const poolSessions = sessions.filter(s => s.exercises.some(e => e.exerciseId.includes('water') || e.exerciseId.includes('flutter') || e.exerciseId.includes('aqua') || e.exerciseId.includes('backstroke') || e.exerciseId.includes('leg-pendulums'))).length
      const proneCount = sessions.reduce((acc, s) => acc + s.exercises.filter(e => e.exerciseId === 'prone-press' && e.completed).length, 0)
      const nerveCount = sessions.reduce((acc, s) => acc + s.exercises.filter(e => e.exerciseId === 'nerve-glide' && e.completed).length, 0)
      const sauna = state.recoveryLogs.filter(r => r.sauna.done || r.steamRoom.done).length
      const coreExs = sessions.reduce((acc, s) => acc + s.exercises.filter(e => ['dead-bug','bird-dog','side-plank-modified','side-plank-full','p4-core-circuit'].includes(e.exerciseId) && e.completed).length, 0)

      const checkAndUnlock = (id: string, condition: boolean) => {
        if (condition && !newBadges[id]?.unlockedAt) {
          newBadges[id] = { ...newBadges[id], unlockedAt: new Date().toISOString() }
        }
      }

      checkAndUnlock('first-steps', totalSessions === 1)
      checkAndUnlock('week-warrior', streakResult.newStreak >= 7)
      checkAndUnlock('month-strong', streakResult.newStreak >= 30)
      checkAndUnlock('pool-rat', poolSessions >= 10)
      checkAndUnlock('hydro-healer', poolSessions >= 25)
      checkAndUnlock('mckenzie-master', proneCount >= 100)
      checkAndUnlock('nerve-tamer', nerveCount >= 30)
      checkAndUnlock('sauna-sage', sauna >= 20)
      checkAndUnlock('century-club', totalSessions >= 100)
      checkAndUnlock('iron-core', coreExs >= 50)
      checkAndUnlock('level-5', newLevel >= 5)
      checkAndUnlock('level-10', newLevel >= 10)

      const next: AppState = {
        ...state,
        user: {
          ...state.user,
          totalXP: newTotalXP,
          level: newLevel,
          currentStreak: streakResult.newStreak,
          longestStreak: streakResult.longestStreak,
          lastWorkoutDate: today,
          streakFreezeAvailable: streakResult.streakFreezeUsed
            ? false
            : state.user.streakFreezeAvailable,
        },
        sessions,
        badges: newBadges,
      }
      persist(next)
      return { leveledUp, newLevel, multipliedXP }
    },
    [state, persist]
  )

  const logSymptoms = useCallback(
    (entry: SymptomEntry) => {
      const existing = state.symptoms.filter(s => s.date !== entry.date)
      persist({ ...state, symptoms: [...existing, entry] })
    },
    [state, persist]
  )

  const logRecovery = useCallback(
    (log: RecoveryLog) => {
      const existing = state.recoveryLogs.filter(r => r.date !== log.date)
      const newBadges = { ...state.badges }
      const total = [...existing, log].filter(r => r.sauna.done || r.steamRoom.done).length
      if (total >= 20 && !newBadges['sauna-sage']?.unlockedAt) {
        newBadges['sauna-sage'] = { ...newBadges['sauna-sage'], unlockedAt: new Date().toISOString() }
      }
      persist({ ...state, recoveryLogs: [...existing, log], badges: newBadges })
    },
    [state, persist]
  )

  const advancePhase = useCallback(
    (toPhase: PhaseNumber) => {
      const newBadges = { ...state.badges }
      if (toPhase === 2 && !newBadges['phase-2']?.unlockedAt)
        newBadges['phase-2'] = { ...newBadges['phase-2'], unlockedAt: new Date().toISOString() }
      if (toPhase === 3 && !newBadges['phase-3']?.unlockedAt)
        newBadges['phase-3'] = { ...newBadges['phase-3'], unlockedAt: new Date().toISOString() }
      if (toPhase === 4) {
        if (!newBadges['phase-4']?.unlockedAt)
          newBadges['phase-4'] = { ...newBadges['phase-4'], unlockedAt: new Date().toISOString() }
        if (!newBadges['pain-slayer']?.unlockedAt)
          newBadges['pain-slayer'] = { ...newBadges['pain-slayer'], unlockedAt: new Date().toISOString() }
      }
      persist({
        ...state,
        user: {
          ...state.user,
          currentPhase: toPhase,
          phaseStartDates: { ...state.user.phaseStartDates, [toPhase]: toISODateString() },
        },
        badges: newBadges,
      })
    },
    [state, persist]
  )

  const resetData = useCallback(() => {
    persist({ ...defaultState })
  }, [persist])

  return {
    state,
    loaded,
    acceptDisclaimer,
    completeWorkout,
    logSymptoms,
    logRecovery,
    advancePhase,
    resetData,
    persist,
  }
}
