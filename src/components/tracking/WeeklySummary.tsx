'use client'

import type { WorkoutSession } from '@/types'
import { getWeekStart, toISODateString } from '@/lib/dateUtils'

interface WeeklySummaryProps {
  sessions: WorkoutSession[]
  targetPerWeek?: number
}

export const WeeklySummary = ({ sessions, targetPerWeek = 5 }: WeeklySummaryProps) => {
  const weekStart = getWeekStart()
  const weekStartStr = toISODateString(weekStart)

  const thisWeek = sessions.filter(s => s.date >= weekStartStr)
  const totalXP = thisWeek.reduce((sum, s) => sum + s.totalXP, 0)
  const totalExercises = thisWeek.reduce((sum, s) => sum + s.exercises.filter(e => e.completed).length, 0)

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const activeDays = new Set(thisWeek.map(s => {
    const d = new Date(s.date)
    const day = d.getDay()
    return day === 0 ? 6 : day - 1
  }))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-2xl font-black text-gold">{thisWeek.length}</p>
          <p className="text-xs text-muted">Sessions</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-2xl font-black text-gold">{totalXP}</p>
          <p className="text-xs text-muted">XP earned</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-2xl font-black text-gold">{totalExercises}</p>
          <p className="text-xs text-muted">Exercises</p>
        </div>
      </div>

      {/* Day dots */}
      <div className="flex gap-1.5">
        {days.map((day, i) => (
          <div key={day} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full h-2 rounded-full transition-colors ${
                activeDays.has(i) ? 'bg-gold' : 'bg-white/10'
              }`}
            />
            <span className="text-[10px] text-muted">{day[0]}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-muted mb-1">
          <span>Weekly sessions</span>
          <span>{thisWeek.length}/{targetPerWeek}</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (thisWeek.length / targetPerWeek) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
