import type { PhaseConfig } from '@/types'

export const PHASES: PhaseConfig[] = [
  {
    id: 1,
    name: 'Pain Relief & Gentle Mobility',
    weeks: 'Weeks 1–4',
    goal: 'Reduce inflammation, relieve nerve pressure, retrain movement. Calm the nervous system.',
    accent: 'phase1',
    accentHex: '#C7727E',
    exerciseIds: [
      'prone-press',
      'pelvic-tilt',
      'knee-chest',
      'nerve-glide',
      'water-walking',
      'flutter-kicks',
      'diaphragmatic-breathing',
    ],
    unlockCriteria:
      'Complete Phase 1 exercises consistently for 4 weeks AND leg symptoms are reducing.',
    habits: [
      'Walk 10–15 min flat ground, 2× per day',
      'Prone lying (stomach) 5 min, 3× per day',
      'Pool session 20–30 min',
      'Steam room 10–15 min post-exercise',
      'Ice lower back 15 min after land exercises',
      'Never sit longer than 20 min at a time',
    ],
    minWeeks: 4,
  },
  {
    id: 2,
    name: 'Core Activation & Stability',
    weeks: 'Weeks 5–8',
    goal: "Build the deep core 'corset' protecting the spine.",
    accent: 'phase2',
    accentHex: '#5B8DB8',
    exerciseIds: [
      'dead-bug',
      'bird-dog',
      'side-plank-modified',
      'glute-bridge',
      'clamshell',
      'cat-cow',
      'aqua-jogging',
      'leg-pendulums',
    ],
    unlockCriteria:
      '4 weeks of consistent Phase 2 work AND comfortable sitting 30+ minutes AND sciatica clearly improving.',
    habits: [
      'Walk 20–30 min including gentle inclines',
      'Core routine 1× per day, 5 days per week',
      'Pool 2–3× per week, 30 min',
      'Sauna 10–15 min post-workout',
      'Standing desk: 30 min sit / 20 min stand intervals',
    ],
    minWeeks: 4,
  },
  {
    id: 3,
    name: 'Strengthening & Endurance',
    weeks: 'Weeks 9–14',
    goal: 'Build functional strength using gym equipment.',
    accent: 'phase3',
    accentHex: '#6BA354',
    exerciseIds: [
      'side-plank-full',
      'goblet-squat',
      'romanian-deadlift',
      'pallof-press',
      'single-leg-glute-bridge',
      'lat-pulldown',
      'farmers-walk',
      'backstroke',
    ],
    unlockCriteria:
      '6 weeks of consistent Phase 3 + minimal symptoms during exercise.',
    habits: [
      'Walk 30–45 min including inclines',
      'Gym routine 4–5× per week',
      'Pool 2× per week active recovery',
      'Sauna 15 min post-workout',
    ],
    minWeeks: 6,
  },
  {
    id: 4,
    name: 'Return to Full Activity',
    weeks: 'Weeks 15+',
    goal: 'Sustainable lifelong maintenance. This phase never ends.',
    accent: 'phase4',
    accentHex: '#8B6BAF',
    exerciseIds: ['p4-core-circuit', 'p4-strength-session'],
    unlockCriteria: 'Complete Phase 3 with minimal symptoms. This is a lifestyle.',
    habits: [
      'Core routine 3× per week minimum (lifelong)',
      '150+ min per week moderate activity',
      'Pool 1–2× per week active recovery',
      'Sauna/steam 2–3× per week',
      'Drop back a phase if symptoms flare',
    ],
    minWeeks: 0,
  },
]

export const RED_FLAGS = [
  { text: 'Loss of bladder or bowel control', severity: 'emergency' as const },
  { text: 'Progressive leg weakness (actual inability to move, not just pain)', severity: 'emergency' as const },
  { text: 'Numbness in saddle area (inner thighs/groin)', severity: 'emergency' as const },
  { text: 'Severe pain worsening after 2+ weeks of rest', severity: 'urgent' as const },
  { text: 'New bilateral sciatica (both sides simultaneously)', severity: 'urgent' as const },
]

export const AVOID_LIST = [
  'Heavy barbell deadlifts (stick with Romanian Deadlifts)',
  'Sit-ups and crunches',
  'Loaded spinal flexion exercises',
  'High-impact running on concrete',
  'Breaststroke swimming (hyperextends lumbar)',
]

export const MOTIVATIONAL_QUOTES = [
  'Your spine is an investment, not an expense. Every rep counts.',
  'The best time to start was yesterday. The second best time is now.',
  'Recovery is not linear. Progress is still progress.',
  'Strong glutes = happy spine. Keep going.',
  'Every walk, every stretch, every breath — you are getting better.',
  'The pain that comes from growth is different from the pain that signals damage. Learn the difference.',
  "Your body has incredible capacity to heal. Give it what it needs.",
  "Consistency beats intensity every time. Show up.",
  "A year from now you'll wish you started today.",
  "The gym is your therapy. Movement is your medicine.",
  "Disc herniation is not a life sentence. Thousands have recovered fully. So will you.",
  "Small daily improvements lead to staggering long-term results.",
]

export const getPhaseById = (id: number): PhaseConfig | undefined =>
  PHASES.find(p => p.id === id)

export const getPhaseAccent = (phase: number): string => {
  const colors: Record<number, string> = {
    1: '#C7727E',
    2: '#5B8DB8',
    3: '#6BA354',
    4: '#8B6BAF',
  }
  return colors[phase] ?? '#E8A84B'
}
