import { EXERCISES } from '@/data/exercises'
import type { WorkoutSession } from '@/types'

export interface MuscleGroupData {
  id: string
  name: string
  category: string
  target: number
  isProblemArea?: boolean
  problemNote?: string
}

export interface MuscleGroupProgress extends MuscleGroupData {
  setsCompleted: number
  percentage: number
  status: 'critical' | 'low' | 'building' | 'strong'
}

// All tracked muscles with rehab targets (sets across full program)
export const MUSCLE_META: Record<string, MuscleGroupData> = {
  'multifidus': {
    id: 'multifidus',
    name: 'Multifidus',
    category: 'Deep Spine',
    target: 60,
    isProblemArea: true,
    problemNote: 'Atrophies rapidly after disc injury — must rebuild one vertebra at a time',
  },
  'transversus-abdominis': {
    id: 'transversus-abdominis',
    name: 'Deep Core (TVA)',
    category: 'Core Stability',
    target: 80,
    isProblemArea: true,
    problemNote: 'Your #1 spinal stabiliser — weakness leads to repeated disc stress',
  },
  'gluteus-medius': {
    id: 'gluteus-medius',
    name: 'Glute Med (Hip Stabiliser)',
    category: 'Lateral Stabilisers',
    target: 90,
    isProblemArea: true,
    problemNote: 'Weakness on one side causes lateral pelvic tilt → uneven disc load',
  },
  'quadratus-lumborum': {
    id: 'quadratus-lumborum',
    name: 'Quadratus Lumborum',
    category: 'Lateral Stabilisers',
    target: 50,
    isProblemArea: true,
    problemNote: 'Tightness pulls pelvis up on one side — the primary driver of your pelvic tilt',
  },
  'hip-flexors': {
    id: 'hip-flexors',
    name: 'Hip Flexors (Iliopsoas)',
    category: 'Hip Mobility',
    target: 60,
    isProblemArea: true,
    problemNote: 'Tightness tilts pelvis forward and laterally — key to restoring symmetry',
  },
  'spinal-erectors': {
    id: 'spinal-erectors',
    name: 'Spinal Erectors',
    category: 'Deep Spine',
    target: 70,
  },
  'gluteus-maximus': {
    id: 'gluteus-maximus',
    name: 'Glutes (Power)',
    category: 'Posterior Chain',
    target: 90,
  },
  'hamstrings': {
    id: 'hamstrings',
    name: 'Hamstrings',
    category: 'Posterior Chain',
    target: 70,
  },
  'obliques': {
    id: 'obliques',
    name: 'Obliques',
    category: 'Core Stability',
    target: 60,
  },
  'rectus-abdominis': {
    id: 'rectus-abdominis',
    name: 'Rectus Abdominis',
    category: 'Core Stability',
    target: 50,
  },
  'quadriceps': {
    id: 'quadriceps',
    name: 'Quadriceps',
    category: 'Leg Strength',
    target: 80,
  },
  'diaphragm': {
    id: 'diaphragm',
    name: 'Diaphragm / Breathing',
    category: 'Breathing',
    target: 30,
  },
  'piriformis': {
    id: 'piriformis',
    name: 'Piriformis',
    category: 'Hip Rotators',
    target: 40,
  },
  'calves': {
    id: 'calves',
    name: 'Calves',
    category: 'Leg Strength',
    target: 30,
  },
  'adductors': {
    id: 'adductors',
    name: 'Adductors',
    category: 'Leg Strength',
    target: 30,
  },
}

// Build a map from exerciseId -> { primary, secondary } sets from exercise data
const exerciseMuscleSets = new Map<string, { primary: string[]; secondary: string[] }>()
for (const ex of EXERCISES) {
  exerciseMuscleSets.set(ex.id, ex.muscles)
}

export function computeMuscleProgress(sessions: WorkoutSession[]): MuscleGroupProgress[] {
  const totalSets: Record<string, number> = {}

  for (const session of sessions) {
    for (const log of session.exercises) {
      if (!log.completed) continue
      const muscles = exerciseMuscleSets.get(log.exerciseId)
      if (!muscles) continue
      const sets = log.setsCompleted || 1

      for (const m of muscles.primary) {
        totalSets[m] = (totalSets[m] ?? 0) + sets
      }
      // secondary counts half
      for (const m of muscles.secondary) {
        totalSets[m] = (totalSets[m] ?? 0) + sets * 0.5
      }
    }
  }

  return Object.values(MUSCLE_META).map(meta => {
    const completed = Math.round(totalSets[meta.id] ?? 0)
    const percentage = Math.min(100, Math.round((completed / meta.target) * 100))
    const status: MuscleGroupProgress['status'] =
      percentage < 15 ? 'critical' :
      percentage < 40 ? 'low' :
      percentage < 75 ? 'building' : 'strong'

    return { ...meta, setsCompleted: completed, percentage, status }
  })
}

export const STATUS_COLOR: Record<MuscleGroupProgress['status'], string> = {
  critical: '#E85B5B',
  low: '#E8A84B',
  building: '#5B8DB8',
  strong: '#6BA354',
}

export const STATUS_LABEL: Record<MuscleGroupProgress['status'], string> = {
  critical: 'Needs Work',
  low: 'Building',
  building: 'Progress',
  strong: 'Strong',
}

export function overallAthletePct(progress: MuscleGroupProgress[]): number {
  if (progress.length === 0) return 0
  return Math.round(progress.reduce((s, p) => s + p.percentage, 0) / progress.length)
}
