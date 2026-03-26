'use client'

import { useState } from 'react'
import { useAppState } from '@/hooks/useAppState'
import { BottomNav } from '@/components/ui/BottomNav'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PHASES, getPhaseAccent } from '@/data/phases'
import { exportCSV } from '@/lib/storage'
import type { PhaseNumber } from '@/types'
import { Shield, Download, RotateCcw, ChevronRight } from 'lucide-react'

export default function SettingsPage() {
  const { state, loaded, advancePhase, resetData } = useAppState()
  const [confirmReset, setConfirmReset] = useState(false)
  const [showPhaseOverride, setShowPhaseOverride] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  if (!loaded) return null

  const { user } = state
  const accent = getPhaseAccent(user.currentPhase)

  return (
    <>
      <main className="min-h-screen pb-24 max-w-lg mx-auto">
        <div className="px-4 pt-safe pt-6 pb-4">
          <h1 className="text-2xl font-black">Settings</h1>
          <p className="text-muted text-sm">Manage your app & data</p>
        </div>

        <div className="px-4 space-y-4">
          {/* Current status */}
          <Card className="p-4">
            <h3 className="font-bold text-sm text-muted uppercase tracking-wider mb-3">Your Status</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-gold">{user.level}</p>
                <p className="text-xs text-muted">Level</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-2xl font-black" style={{ color: accent }}>P{user.currentPhase}</p>
                <p className="text-xs text-muted">Phase</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-gold">{user.totalXP}</p>
                <p className="text-xs text-muted">Total XP</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-gold">{user.longestStreak}</p>
                <p className="text-xs text-muted">Best Streak</p>
              </div>
            </div>
          </Card>

          {/* Phase management */}
          <Card className="p-4">
            <button
              onClick={() => setShowPhaseOverride(!showPhaseOverride)}
              className="w-full flex items-center justify-between"
            >
              <div>
                <p className="font-bold">Phase Override</p>
                <p className="text-xs text-muted">Advance or change your current phase</p>
              </div>
              <ChevronRight className={`text-muted transition-transform ${showPhaseOverride ? 'rotate-90' : ''}`} size={18} />
            </button>

            {showPhaseOverride && (
              <div className="mt-4 space-y-2 border-t border-border pt-4 animate-fade-in">
                <p className="text-xs text-muted mb-3">
                  Phases unlock based on time + symptom progress. Only advance when ready.
                </p>
                {PHASES.map(p => (
                  <button
                    key={p.id}
                    disabled={p.id === user.currentPhase}
                    onClick={() => advancePhase(p.id as PhaseNumber)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors ${
                      p.id === user.currentPhase
                        ? 'border-transparent opacity-50 cursor-default'
                        : 'border-border hover:border-white/30 active:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                        style={{ backgroundColor: `${p.accentHex}20`, color: p.accentHex }}
                      >
                        {p.id}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-muted">{p.weeks}</p>
                      </div>
                    </div>
                    {p.id === user.currentPhase && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${p.accentHex}20`, color: p.accentHex }}>
                        Current
                      </span>
                    )}
                  </button>
                ))}
                <p className="text-xs text-danger mt-2">
                  ⚠️ If symptoms worsen, drop back a phase. Recovery is not linear.
                </p>
              </div>
            )}
          </Card>

          {/* Data Export */}
          <Card className="p-4">
            <h3 className="font-bold mb-2">Export Data</h3>
            <p className="text-xs text-muted mb-3">
              Download your workout history and symptom log as CSV to share with your physiotherapist.
            </p>
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={() => exportCSV(state)}
            >
              <Download size={16} className="mr-2" />
              Download CSV
            </Button>
          </Card>

          {/* Disclaimer */}
          <Card className="p-4">
            <button
              onClick={() => setShowDisclaimer(!showDisclaimer)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Shield className="text-gold" size={20} />
                <p className="font-bold">Medical Disclaimer</p>
              </div>
              <ChevronRight className={`text-muted transition-transform ${showDisclaimer ? 'rotate-90' : ''}`} size={18} />
            </button>
            {showDisclaimer && (
              <div className="mt-4 pt-4 border-t border-border text-sm text-white/70 leading-relaxed animate-fade-in">
                <p>
                  This app is for <strong className="text-white">personal tracking purposes only</strong>. It does not
                  constitute medical advice, diagnosis, or treatment recommendations.
                </p>
                <p className="mt-2">
                  Always consult a qualified physiotherapist, spine specialist, or physician before starting any
                  exercise program, especially if you have been diagnosed with disc herniations, spinal stenosis,
                  or other spinal conditions.
                </p>
                <p className="mt-2">
                  If you experience any red flag symptoms (loss of bladder/bowel control, saddle numbness,
                  progressive leg weakness), seek emergency care immediately.
                </p>
              </div>
            )}
          </Card>

          {/* App Info */}
          <Card className="p-4">
            <h3 className="font-bold mb-2 text-sm">About SpineQuest</h3>
            <div className="space-y-1 text-xs text-muted">
              <p>Version 1.0.0</p>
              <p>L4-L5 · L5-S1 Disc Bulge Recovery Tracker</p>
              <p>Metropolitan Sagrada Família Gym, Barcelona</p>
              <p className="mt-2">All data stored locally on your device.</p>
            </div>
          </Card>

          {/* Reset */}
          <Card className="p-4 border-danger/20">
            <h3 className="font-bold text-danger mb-2 text-sm">Danger Zone</h3>
            {!confirmReset ? (
              <Button
                variant="danger"
                size="md"
                fullWidth
                onClick={() => setConfirmReset(true)}
              >
                <RotateCcw size={16} className="mr-2" />
                Reset All Data
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-danger font-semibold">
                  This will delete ALL your progress, sessions, and badges. This cannot be undone.
                </p>
                <div className="flex gap-2">
                  <Button variant="ghost" size="md" fullWidth onClick={() => setConfirmReset(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    size="md"
                    fullWidth
                    onClick={() => { resetData(); setConfirmReset(false) }}
                  >
                    Yes, Reset
                  </Button>
                </div>
              </div>
            )}
          </Card>

          <div className="h-4" />
        </div>
      </main>
      <BottomNav />
    </>
  )
}
