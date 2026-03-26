import { isSameDay, isYesterday, parseISO, differenceInDays } from './dateUtils'

export interface StreakResult {
  newStreak: number
  longestStreak: number
  streakFreezeUsed: boolean
}

export const updateStreak = (
  lastWorkoutDate: string | null,
  currentStreak: number,
  longestStreak: number,
  streakFreezeAvailable: boolean,
  today: Date = new Date()
): StreakResult => {
  if (!lastWorkoutDate) {
    return { newStreak: 1, longestStreak: Math.max(1, longestStreak), streakFreezeUsed: false }
  }

  const last = parseISO(lastWorkoutDate)

  if (isSameDay(last, today)) {
    return { newStreak: currentStreak, longestStreak, streakFreezeUsed: false }
  }

  if (isYesterday(last, today)) {
    const newStreak = currentStreak + 1
    return {
      newStreak,
      longestStreak: Math.max(newStreak, longestStreak),
      streakFreezeUsed: false,
    }
  }

  const daysMissed = differenceInDays(today, last)

  if (daysMissed === 2 && streakFreezeAvailable) {
    const newStreak = currentStreak + 1
    return {
      newStreak,
      longestStreak: Math.max(newStreak, longestStreak),
      streakFreezeUsed: true,
    }
  }

  return { newStreak: 1, longestStreak, streakFreezeUsed: false }
}

export const shouldResetStreak = (
  lastWorkoutDate: string | null,
  streakFreezeAvailable: boolean,
  today: Date = new Date()
): boolean => {
  if (!lastWorkoutDate) return false
  const last = parseISO(lastWorkoutDate)
  const daysMissed = differenceInDays(today, last)
  if (daysMissed <= 1) return false
  if (daysMissed === 2 && streakFreezeAvailable) return false
  return true
}
