'use client'

import type { AppState, UserState, WorkoutSession, SymptomEntry, RecoveryLog, DailyChallenge } from '@/types'
import { initialBadgeState } from '@/data/badges'

const STORAGE_KEY = 'disc-recovery-app'

export const defaultUser: UserState = {
  currentPhase: 1,
  totalXP: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  lastWorkoutDate: null,
  streakFreezeAvailable: true,
  streakFreezeUsedThisWeek: false,
  phaseStartDates: { 1: new Date().toISOString().split('T')[0] },
  disclaimerAccepted: false,
  phaseUnlockEligible: {},
}

export const defaultState: AppState = {
  user: defaultUser,
  sessions: [],
  symptoms: [],
  badges: initialBadgeState(),
  recoveryLogs: [],
  dailyChallenges: [],
}

export const loadState = (): AppState => {
  if (typeof window === 'undefined') return defaultState
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as Partial<AppState>
    return {
      user: { ...defaultUser, ...parsed.user },
      sessions: parsed.sessions ?? [],
      symptoms: parsed.symptoms ?? [],
      badges: { ...initialBadgeState(), ...parsed.badges },
      recoveryLogs: parsed.recoveryLogs ?? [],
      dailyChallenges: parsed.dailyChallenges ?? [],
    }
  } catch {
    return defaultState
  }
}

export const saveState = (state: AppState): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    console.error('Failed to save state')
  }
}

export const exportCSV = (state: AppState): void => {
  // Export sessions
  const sessionRows = ['Date,Phase,XP,Duration (min),Exercises Completed']
  state.sessions.forEach(s => {
    const completed = s.exercises.filter(e => e.completed).length
    sessionRows.push(`${s.date},${s.phase},${s.totalXP},${s.duration},${completed}`)
  })

  // Export symptoms
  const symptomRows = ['Date,Back Pain (0-10),Leg Pain (0-10),Numbness,Sitting Tolerance (min)']
  state.symptoms.forEach(s => {
    symptomRows.push(`${s.date},${s.backPain},${s.legPain},${s.numbness},${s.sittingTolerance}`)
  })

  const content = [
    'WORKOUT SESSIONS',
    ...sessionRows,
    '',
    'SYMPTOM LOG',
    ...symptomRows,
  ].join('\n')

  const blob = new Blob([content], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `disc-recovery-export-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
