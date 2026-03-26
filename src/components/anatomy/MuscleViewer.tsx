'use client'

import { BodyFront } from './BodyFront'
import { BodyBack } from './BodyBack'
import type { Exercise } from '@/types'
import { useState } from 'react'

interface MuscleViewerProps {
  exercise: Exercise
  width?: number
}

export const MuscleViewer = ({ exercise, width = 180 }: MuscleViewerProps) => {
  const [view, setView] = useState<'front' | 'back'>(exercise.bodyView === 'front' ? 'front' : 'back')

  const Body = view === 'front' ? BodyFront : BodyBack

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        <button
          onClick={() => setView('front')}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${view === 'front' ? 'bg-white/20 text-white' : 'text-muted hover:text-white'}`}
        >
          Front
        </button>
        <button
          onClick={() => setView('back')}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${view === 'back' ? 'bg-white/20 text-white' : 'text-muted hover:text-white'}`}
        >
          Back
        </button>
      </div>
      <Body
        highlighted={exercise.muscles.primary}
        secondary={exercise.muscles.secondary}
        width={width}
      />
    </div>
  )
}
