'use client'

import { useMemo, useState } from 'react'
import type { WorkoutSession } from '@/types'
import {
  computeMuscleProgress,
  overallAthletePct,
  STATUS_COLOR,
  STATUS_LABEL,
  type MuscleGroupProgress,
} from '@/lib/muscleProgress'
import { Card } from '@/components/ui/Card'
import { AlertTriangle, Target, Zap, ChevronDown, ChevronUp } from 'lucide-react'

interface Props {
  sessions: WorkoutSession[]
}

/* Circular progress ring */
const Ring = ({ pct, color, size = 64 }: { pct: number; color: string; size?: number }) => {
  const r = (size - 10) / 2
  const c = 2 * Math.PI * r
  const offset = c - (pct / 100) * c
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={5} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={5}
        strokeDasharray={c} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
    </svg>
  )
}

const MuscleRow = ({ m }: { m: MuscleGroupProgress }) => {
  const color = STATUS_COLOR[m.status]
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
      <div className="relative shrink-0">
        <Ring pct={m.percentage} color={color} size={52} />
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold" style={{ color }}>
          {m.percentage}%
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold truncate">{m.name}</p>
          {m.isProblemArea && (
            <AlertTriangle size={12} className="shrink-0" style={{ color: '#E8A84B' }} />
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${m.percentage}%`, backgroundColor: color }}
            />
          </div>
          <span className="text-[11px] font-semibold shrink-0" style={{ color }}>
            {STATUS_LABEL[m.status]}
          </span>
        </div>
        <p className="text-xs text-muted mt-0.5">{m.setsCompleted}/{m.target} sets</p>
      </div>
    </div>
  )
}

const SPORT_MILESTONES = [
  { pct: 0, label: 'Injured', icon: '🛌' },
  { pct: 20, label: 'Pain-Free Daily Life', icon: '🚶' },
  { pct: 40, label: 'Light Training', icon: '🏋️' },
  { pct: 60, label: 'Recreational Sport', icon: '🏃' },
  { pct: 80, label: 'Competitive Sport', icon: '⚽' },
  { pct: 100, label: 'Elite Athlete', icon: '🏆' },
]

function currentMilestone(pct: number) {
  for (let i = SPORT_MILESTONES.length - 1; i >= 0; i--) {
    if (pct >= SPORT_MILESTONES[i].pct) return SPORT_MILESTONES[i]
  }
  return SPORT_MILESTONES[0]
}

function nextMilestone(pct: number) {
  return SPORT_MILESTONES.find(m => m.pct > pct) ?? SPORT_MILESTONES[SPORT_MILESTONES.length - 1]
}

export const AthleteBoard = ({ sessions }: Props) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Lateral Stabilisers')
  const progress = useMemo(() => computeMuscleProgress(sessions), [sessions])
  const overallPct = overallAthletePct(progress)
  const milestone = currentMilestone(overallPct)
  const next = nextMilestone(overallPct)

  const problemAreas = progress.filter(m => m.isProblemArea)
  const categories = Array.from(new Set(progress.map(m => m.category)))
  const byCategory = (cat: string) => progress.filter(m => m.category === cat)

  return (
    <div className="space-y-4">

      {/* Athlete Progress Card */}
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">{milestone.icon}</div>
          <div className="flex-1">
            <h3 className="font-black text-lg leading-tight">{milestone.label}</h3>
            <p className="text-xs text-muted">Next: {next.icon} {next.label}</p>
          </div>
          <div className="relative shrink-0">
            <Ring pct={overallPct} color="#E8A84B" size={72} />
            <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-gold">
              {overallPct}%
            </span>
          </div>
        </div>

        {/* Journey timeline */}
        <div className="relative">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-phase1 via-gold to-phase3 transition-all duration-700"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <div className="flex justify-between">
            {SPORT_MILESTONES.map(m => (
              <div
                key={m.pct}
                className="flex flex-col items-center"
                style={{ opacity: overallPct >= m.pct ? 1 : 0.35 }}
              >
                <span className="text-sm">{m.icon}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted mt-3 text-center">
          Rehabilitating {progress.filter(m => m.status !== 'critical').length}/{progress.length} muscle groups
        </p>
      </Card>

      {/* Pelvic Tilt Alert */}
      <Card className="p-4 border border-amber-500/30 bg-amber-500/5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle size={16} className="text-amber-400" />
          </div>
          <div>
            <h4 className="font-bold text-amber-400 text-sm">Lateral Pelvic Tilt Detected</h4>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Your tight hip flexors and QL, combined with glute med weakness, create an uneven pelvis.
              This loads L4-L5 asymmetrically. Focus on the Lateral Stabilisers group below.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {['QL stretching', 'Single-leg glute work', 'Hip flexor release', 'Lateral band walks'].map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Problem Areas */}
      <Card className="p-4">
        <h3 className="font-bold mb-1 flex items-center gap-2 text-sm">
          <Target size={15} className="text-danger" />
          Your Problem Areas
        </h3>
        <p className="text-xs text-muted mb-3">Fix these to unlock full athletic potential</p>
        <div>
          {problemAreas.map(m => (
            <div key={m.id}>
              <MuscleRow m={m} />
              {m.problemNote && (
                <p className="text-xs text-muted pl-16 -mt-1.5 mb-2 leading-relaxed">{m.problemNote}</p>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* All muscle groups by category */}
      <Card className="overflow-hidden">
        <div className="p-4 pb-2">
          <h3 className="font-bold flex items-center gap-2 text-sm">
            <Zap size={15} className="text-gold" />
            All Muscle Groups
          </h3>
        </div>
        {categories.map(cat => {
          const muscles = byCategory(cat)
          const avgPct = Math.round(muscles.reduce((s, m) => s + m.percentage, 0) / muscles.length)
          const isOpen = expandedCategory === cat
          const catColor = STATUS_COLOR[
            avgPct < 15 ? 'critical' : avgPct < 40 ? 'low' : avgPct < 75 ? 'building' : 'strong'
          ]
          return (
            <div key={cat} className="border-t border-border">
              <button
                className="w-full flex items-center justify-between px-4 py-3 active:bg-white/5"
                onClick={() => setExpandedCategory(isOpen ? null : cat)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: catColor }} />
                  <span className="text-sm font-semibold">{cat}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold" style={{ color: catColor }}>{avgPct}%</span>
                  {isOpen ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-2 animate-fade-in">
                  {muscles.map(m => <MuscleRow key={m.id} m={m} />)}
                </div>
              )}
            </div>
          )
        })}
      </Card>

      {/* Goal statement */}
      <Card className="p-4 bg-gradient-to-br from-card to-white/5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🏆</span>
          <div>
            <h4 className="font-black text-base">Return to All Sports</h4>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Your programme is specifically designed to rebuild the spine-stabilising muscles
              that let you run, jump, cut and compete without fear. Every rep is investing
              in your athletic future.
            </p>
            <p className="text-xs text-gold font-semibold mt-2">
              {overallPct < 30
                ? `${next.pct - overallPct}% more to reach "${next.label}"`
                : overallPct < 80
                ? `${next.pct - overallPct}% to next level — keep going!`
                : 'You\'re nearly back. Push through to the finish.'}
            </p>
          </div>
        </div>
      </Card>

    </div>
  )
}
