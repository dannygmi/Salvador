export type PhaseNumber = 1 | 2 | 3 | 4

export interface UserState {
  currentPhase: PhaseNumber
  totalXP: number
  level: number
  currentStreak: number
  longestStreak: number
  lastWorkoutDate: string | null
  streakFreezeAvailable: boolean
  streakFreezeUsedThisWeek: boolean
  phaseStartDates: Partial<Record<PhaseNumber, string>>
  disclaimerAccepted: boolean
  phaseUnlockEligible: Partial<Record<PhaseNumber, boolean>>
}

export interface WorkoutSession {
  id: string
  date: string
  phase: PhaseNumber
  exercises: ExerciseLog[]
  totalXP: number
  duration: number
  notes?: string
}

export interface ExerciseLog {
  exerciseId: string
  setsCompleted: number
  repsPerSet?: number[]
  weight?: number
  duration?: number
  painRating?: number
  completed: boolean
}

export interface SymptomEntry {
  date: string
  backPain: number
  legPain: number
  numbness: 'none' | 'mild' | 'moderate' | 'severe'
  sittingTolerance: number
  notes?: string
}

export interface BadgeState {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string
}

export interface RecoveryLog {
  date: string
  steamRoom: { done: boolean; duration: number }
  sauna: { done: boolean; duration: number }
  poolRecovery: { done: boolean; duration: number }
  ergonomics: {
    lumbarSupport: boolean
    breaks: boolean
    sleepPosition: boolean
    hipHinge: boolean
  }
}

export interface Exercise {
  id: string
  name: string
  phase: PhaseNumber
  category: 'exercise' | 'pool' | 'sauna' | 'steam' | 'habit'
  sets?: number
  reps?: string
  durationStr?: string
  muscles: { primary: string[]; secondary: string[] }
  bodyView: 'front' | 'back' | 'side'
  poseId: string
  formCues: string[]
  xp: number
  equipment?: string
  timed?: boolean
  timeSecs?: number
}

export interface PhaseConfig {
  id: PhaseNumber
  name: string
  weeks: string
  goal: string
  accent: string
  accentHex: string
  exerciseIds: string[]
  unlockCriteria: string
  habits: string[]
  minWeeks: number
}

export interface DailyChallenge {
  id: string
  description: string
  bonusXP: number
  phase: PhaseNumber
  completed: boolean
  date: string
}

export interface AppState {
  user: UserState
  sessions: WorkoutSession[]
  symptoms: SymptomEntry[]
  badges: Record<string, BadgeState>
  recoveryLogs: RecoveryLog[]
  dailyChallenges: DailyChallenge[]
}
