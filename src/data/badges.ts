import type { BadgeState } from '@/types'

export interface BadgeDef {
  id: string
  name: string
  description: string
  icon: string
}

export const BADGE_DEFS: BadgeDef[] = [
  { id: 'first-steps', name: 'First Steps', description: 'Complete your first exercise session', icon: '👟' },
  { id: 'week-warrior', name: 'Week Warrior', description: '7-day streak', icon: '🔥' },
  { id: 'pool-rat', name: 'Pool Rat', description: '10 pool sessions completed', icon: '🏊' },
  { id: 'phase-2', name: 'Phase Up: Core', description: 'Unlock Phase 2', icon: '⬆️' },
  { id: 'phase-3', name: 'Phase Up: Strength', description: 'Unlock Phase 3', icon: '💪' },
  { id: 'phase-4', name: 'Phase Up: Free', description: 'Reach Phase 4 — full activity', icon: '🏆' },
  { id: 'iron-core', name: 'Iron Core', description: '50 core exercises completed', icon: '🛡️' },
  { id: 'mckenzie-master', name: 'McKenzie Master', description: '100 prone press-ups completed', icon: '🧘' },
  { id: 'nerve-tamer', name: 'Nerve Tamer', description: '30 nerve glide sessions', icon: '⚡' },
  { id: 'sauna-sage', name: 'Sauna Sage', description: '20 sauna/steam sessions', icon: '🌡️' },
  { id: 'month-strong', name: 'Month Strong', description: '30-day streak', icon: '📅' },
  { id: 'century-club', name: 'Century Club', description: '100 total exercise sessions', icon: '💯' },
  { id: 'pain-slayer', name: 'Pain Slayer', description: 'Complete the Phase 4 unlock', icon: '⚔️' },
  { id: 'comeback-king', name: 'Comeback King', description: 'Log a session after a symptom flare-up', icon: '👑' },
  { id: 'level-5', name: 'Level 5', description: 'Reach Level 5', icon: '🌟' },
  { id: 'level-10', name: 'Level 10', description: 'Reach Level 10', icon: '🌠' },
  { id: 'rdl-king', name: 'RDL King', description: '30 Romanian Deadlifts completed', icon: '🏋️' },
  { id: 'hydro-healer', name: 'Hydro Healer', description: '25 total pool sessions', icon: '💧' },
]

export const initialBadgeState = (): Record<string, BadgeState> => {
  const state: Record<string, BadgeState> = {}
  BADGE_DEFS.forEach(b => {
    state[b.id] = { id: b.id, name: b.name, description: b.description, icon: b.icon }
  })
  return state
}
