'use client'

import { useState } from 'react'
import type { Exercise, ExerciseLog } from '@/types'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SetTracker } from './SetTracker'
import { WorkoutTimer } from './WorkoutTimer'
import { PainRating } from './PainRating'
import { MuscleViewer } from '@/components/anatomy/MuscleViewer'
import { ChevronDown, ChevronUp, Zap, Info } from 'lucide-react'
import { clsx } from 'clsx'
import { getPhaseAccent } from '@/data/phases'

interface ExerciseCardProps {
  exercise: Exercise
  onComplete: (log: ExerciseLog) => void
  phaseAccent?: string
  isCompleted?: boolean
}

export const ExerciseCard = ({ exercise, onComplete, phaseAccent, isCompleted = false }: ExerciseCardProps) => {
  const [expanded, setExpanded] = useState(false)
  const [setsCompleted, setSetsCompleted] = useState(0)
  const [painRating, setPainRating] = useState<number>(3)
  const [timerDone, setTimerDone] = useState(false)
  const [showMuscles, setShowMuscles] = useState(false)
  const accent = phaseAccent ?? getPhaseAccent(exercise.phase)

  const totalSets = exercise.sets ?? 1
  const allDone = exercise.timed ? timerDone : setsCompleted >= totalSets

  const handleComplete = () => {
    onComplete({
      exerciseId: exercise.id,
      setsCompleted: exercise.timed ? 1 : setsCompleted,
      duration: exercise.timeSecs,
      painRating,
      completed: true,
    })
  }

  return (
    <Card
      className={clsx(
        'overflow-hidden transition-all',
        isCompleted && 'opacity-60'
      )}
      glowColor={isCompleted ? undefined : accent}
    >
      {/* Header — full row is tappable */}
      <button
        className="w-full text-left p-4 active:bg-white/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${accent}20`, color: accent }}
              >
                {exercise.category === 'pool' ? '🏊 Pool' : exercise.category === 'sauna' ? '🌡️ Sauna' : exercise.category === 'steam' ? '💨 Steam' : '💪 Exercise'}
              </span>
              <span className="text-xs text-gold font-bold flex items-center gap-1">
                <Zap size={12} /> {exercise.xp} XP
              </span>
            </div>
            <h3 className="font-bold text-[17px] leading-tight">{exercise.name}</h3>
            <p className="text-muted text-sm mt-0.5">
              {exercise.sets && !exercise.timed ? `${exercise.sets} sets × ` : ''}{exercise.reps ?? exercise.durationStr ?? ''}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 pt-1">
            {isCompleted && (
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accent}20`, color: accent }}>
                <span className="text-sm font-bold">✓</span>
              </div>
            )}
            <span className="text-muted">
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </div>
        </div>

        {/* Equipment badge */}
        {exercise.equipment && (
          <div className="mt-1.5 text-xs text-muted flex items-center gap-1">
            <Info size={11} /> {exercise.equipment}
          </div>
        )}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-border">
          {/* Form cues */}
          <div className="p-4 space-y-2">
            <h4 className="text-xs font-bold text-muted uppercase tracking-wider">Form Cues</h4>
            <ul className="space-y-1.5">
              {exercise.formCues.map((cue, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="text-gold mt-0.5 shrink-0">→</span>
                  <span>{cue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Muscle map toggle */}
          <div className="px-4 pb-3">
            <button
              onClick={() => setShowMuscles(!showMuscles)}
              className="flex items-center gap-1.5 text-sm font-medium text-gold/80 active:text-gold py-2"
            >
              <span>{showMuscles ? '▲ Hide muscle map' : '▼ Show muscle map'}</span>
            </button>
            {showMuscles && (
              <div className="mt-3 flex justify-center">
                <MuscleViewer exercise={exercise} width={150} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Workout controls */}
      {!isCompleted && (
        <div className="border-t border-border p-4 space-y-4">
          {exercise.timed && exercise.timeSecs ? (
            <WorkoutTimer
              durationSecs={exercise.timeSecs}
              label={exercise.reps ?? exercise.durationStr ?? ''}
              onComplete={() => setTimerDone(true)}
            />
          ) : exercise.sets ? (
            <SetTracker
              totalSets={exercise.sets}
              completed={setsCompleted}
              onChange={setSetsCompleted}
              accentColor={accent}
            />
          ) : null}

          <div>
            <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">How did it feel?</h4>
            <PainRating value={painRating} onChange={setPainRating} />
          </div>

          <Button
            variant="primary"
            size="md"
            fullWidth
            disabled={!allDone && !exercise.timed}
            onClick={handleComplete}
            style={allDone ? { backgroundColor: accent, color: '#0D0D0D' } : undefined}
          >
            {allDone ? '✓ Mark Complete' : `Complete ${setsCompleted}/${totalSets} sets`}
          </Button>
        </div>
      )}
    </Card>
  )
}
