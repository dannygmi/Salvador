export const xpForLevel = (n: number): number => Math.floor(50 * n * 1.5)

export const getTotalXPForLevel = (level: number): number => {
  let total = 0
  for (let i = 1; i < level; i++) total += xpForLevel(i)
  return total
}

export const getLevelFromXP = (totalXP: number): number => {
  let level = 1
  let accumulated = 0
  while (true) {
    const needed = xpForLevel(level)
    if (accumulated + needed > totalXP) break
    accumulated += needed
    level++
    if (level > 100) break
  }
  return level
}

export const getXPProgressInCurrentLevel = (
  totalXP: number
): { current: number; needed: number; percent: number } => {
  const level = getLevelFromXP(totalXP)
  const xpAtLevelStart = getTotalXPForLevel(level)
  const needed = xpForLevel(level)
  const current = totalXP - xpAtLevelStart
  const percent = Math.min(100, Math.round((current / needed) * 100))
  return { current, needed, percent }
}

export const STREAK_MULTIPLIER = (streak: number): number => {
  if (streak >= 31) return 3
  if (streak >= 15) return 2
  if (streak >= 8) return 1.5
  return 1
}

export const applyStreakMultiplier = (xp: number, streak: number): number =>
  Math.round(xp * STREAK_MULTIPLIER(streak))

export const LEVEL_TITLES: Record<number, string> = {
  1: 'Recovering Warrior',
  2: 'Pain Fighter',
  3: 'Core Apprentice',
  4: 'Spine Defender',
  5: 'Movement Seeker',
  6: 'Stability Scout',
  7: 'Endurance Builder',
  8: 'Strength Forger',
  9: 'Disc Guardian',
  10: 'Iron Spine',
}

export const getLevelTitle = (level: number): string =>
  LEVEL_TITLES[level] ?? `Elite Warrior ${level}`
