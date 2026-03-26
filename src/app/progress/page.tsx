'use client'

import { useState } from 'react'
import { useAppState } from '@/hooks/useAppState'
import { BottomNav } from '@/components/ui/BottomNav'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SymptomChart } from '@/components/tracking/SymptomChart'
import { BadgeGrid } from '@/components/gamification/BadgeGrid'
import { PHASES, getPhaseAccent } from '@/data/phases'
import type { SymptomEntry } from '@/types'
import { toISODateString } from '@/lib/dateUtils'
import { TrendingUp, Activity, Award, ChevronDown, Dumbbell } from 'lucide-react'
import { AthleteBoard } from '@/components/gamification/AthleteBoard'

const tabs = ['Athlete', 'Symptoms', 'Badges', 'History'] as const
type Tab = typeof tabs[number]

const numericSymptomLabel = (n: number) => {
  if (n <= 2) return 'Low'
  if (n <= 5) return 'Moderate'
  if (n <= 7) return 'High'
  return 'Severe'
}

export default function ProgressPage() {
  const { state, loaded, logSymptoms } = useAppState()
  const [activeTab, setActiveTab] = useState<Tab>('Athlete')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Partial<SymptomEntry>>({
    date: toISODateString(),
    backPain: 5,
    legPain: 3,
    numbness: 'none',
    sittingTolerance: 20,
    notes: '',
  })

  if (!loaded) return null

  const { user, sessions, symptoms, badges } = state
  const accent = getPhaseAccent(user.currentPhase)

  const handleLogSymptom = () => {
    if (!form.date) return
    logSymptoms(form as SymptomEntry)
    setShowForm(false)
  }

  const recent = sessions.slice(-20).reverse()

  return (
    <>
      <main className="min-h-screen pb-nav max-w-lg mx-auto">
        <div className="px-4 pt-app pb-4">
          <h1 className="text-2xl font-black">Progress</h1>
          <p className="text-muted text-sm">Track your recovery journey</p>
        </div>

        {/* Tabs */}
        <div className="px-4 mb-4">
          <div className="flex gap-1 bg-white/5 rounded-2xl p-1">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab ? 'bg-card text-white shadow-sm' : 'text-muted'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 space-y-4">
          {activeTab === 'Athlete' && (
            <AthleteBoard sessions={sessions} />
          )}

          {activeTab === 'Symptoms' && (
            <>
              {/* Log check-in */}
              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? 'Cancel' : '+ Log Symptom Check-In'}
              </Button>

              {showForm && (
                <Card className="p-4 space-y-4 animate-fade-in">
                  <h3 className="font-bold">Daily Check-In</h3>

                  <div>
                    <label className="text-xs text-muted uppercase tracking-wider block mb-2">
                      Back Pain · {form.backPain}/10 ({numericSymptomLabel(form.backPain ?? 5)})
                    </label>
                    <input
                      type="range" min={0} max={10} value={form.backPain ?? 5}
                      onChange={e => setForm(f => ({ ...f, backPain: +e.target.value }))}
                      className="w-full accent-[#C7727E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-muted uppercase tracking-wider block mb-2">
                      Leg Pain / Sciatica · {form.legPain}/10 ({numericSymptomLabel(form.legPain ?? 3)})
                    </label>
                    <input
                      type="range" min={0} max={10} value={form.legPain ?? 3}
                      onChange={e => setForm(f => ({ ...f, legPain: +e.target.value }))}
                      className="w-full accent-[#5B8DB8]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-muted uppercase tracking-wider block mb-2">Numbness/Tingling</label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['none', 'mild', 'moderate', 'severe'] as const).map(n => (
                        <button
                          key={n}
                          onClick={() => setForm(f => ({ ...f, numbness: n }))}
                          className={`py-2 rounded-xl text-xs font-medium capitalize transition-colors ${
                            form.numbness === n ? 'bg-gold/20 border border-gold/40 text-gold' : 'bg-white/5 text-muted border border-transparent'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted uppercase tracking-wider block mb-2">
                      Sitting Tolerance · {form.sittingTolerance} min
                    </label>
                    <input
                      type="range" min={0} max={120} step={5} value={form.sittingTolerance ?? 20}
                      onChange={e => setForm(f => ({ ...f, sittingTolerance: +e.target.value }))}
                      className="w-full accent-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-muted uppercase tracking-wider block mb-2">Notes (optional)</label>
                    <textarea
                      value={form.notes ?? ''}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      placeholder="How are you feeling today?"
                      className="w-full bg-white/5 border border-border rounded-xl p-3 text-sm resize-none h-20 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <Button variant="primary" size="md" fullWidth onClick={handleLogSymptom}
                    style={{ backgroundColor: accent, color: '#0D0D0D' }}>
                    Save Check-In
                  </Button>
                </Card>
              )}

              <Card className="p-4">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Activity size={16} className="text-gold" /> Pain Trend (30 days)
                </h3>
                <SymptomChart symptoms={symptoms} days={30} />
              </Card>

              {/* Recent entries */}
              {symptoms.length > 0 && (
                <Card className="p-4">
                  <h3 className="font-bold mb-3 text-sm">Recent Check-Ins</h3>
                  <div className="space-y-2">
                    {symptoms.slice(-5).reverse().map((s, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <span className="text-sm text-muted">{s.date}</span>
                        <div className="flex gap-3 text-sm">
                          <span className="text-phase1">Back: {s.backPain}/10</span>
                          <span className="text-phase2">Leg: {s.legPain}/10</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Phase suggestion */}
              {symptoms.length >= 14 && (() => {
                const recent14 = symptoms.slice(-14)
                const avgLeg = recent14.reduce((s, e) => s + e.legPain, 0) / recent14.length
                if (avgLeg < 3 && user.currentPhase < 4) {
                  return (
                    <Card className="p-4 border-green-500/30 bg-green-500/5">
                      <p className="text-green-400 font-semibold text-sm">
                        🎉 Your sciatica has been under 3/10 for 2 weeks!
                      </p>
                      <p className="text-xs text-muted mt-1">
                        Consider progressing to Phase {user.currentPhase + 1} — check Settings to advance.
                      </p>
                    </Card>
                  )
                }
                return null
              })()}
            </>
          )}

          {activeTab === 'Badges' && (
            <Card className="p-4">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Award size={16} className="text-gold" />
                Badges ({Object.values(badges).filter(b => b.unlockedAt).length}/{Object.values(badges).length})
              </h3>
              <BadgeGrid badges={badges} />
            </Card>
          )}

          {activeTab === 'History' && (
            <>
              <Card className="p-4">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <TrendingUp size={16} className="text-gold" /> All Sessions ({sessions.length})
                </h3>
                {sessions.length === 0 ? (
                  <p className="text-muted text-sm text-center py-4">No sessions yet. Start your first workout!</p>
                ) : (
                  <div className="space-y-2">
                    {recent.map(s => (
                      <div key={s.id} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-medium">{s.date}</p>
                          <p className="text-xs text-muted">
                            Phase {s.phase} · {s.exercises.filter(e => e.completed).length} exercises · {s.duration} min
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gold font-bold text-sm">+{s.totalXP} XP</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Phase timeline */}
              <Card className="p-4">
                <h3 className="font-bold mb-4">Phase Timeline</h3>
                <div className="space-y-3">
                  {PHASES.map(p => {
                    const startDate = user.phaseStartDates[p.id]
                    const isActive = p.id === user.currentPhase
                    const isComplete = p.id < user.currentPhase
                    return (
                      <div key={p.id} className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                          style={{
                            backgroundColor: isComplete || isActive ? `${p.accentHex}20` : 'rgba(255,255,255,0.05)',
                            color: isComplete || isActive ? p.accentHex : '#6B7280',
                            border: `1px solid ${isActive ? p.accentHex : 'transparent'}`,
                          }}
                        >
                          {isComplete ? '✓' : p.id}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${isActive ? 'text-white' : isComplete ? 'text-white/60' : 'text-muted'}`}>
                            {p.name}
                          </p>
                          <p className="text-xs text-muted">
                            {startDate ? `Started ${startDate}` : p.weeks}
                          </p>
                        </div>
                        {isActive && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${p.accentHex}20`, color: p.accentHex }}>
                            Active
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </Card>
            </>
          )}

          <div className="h-4" />
        </div>
      </main>
      <BottomNav />
    </>
  )
}
