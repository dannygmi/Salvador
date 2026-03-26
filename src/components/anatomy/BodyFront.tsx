'use client'

import { useState } from 'react'

// Muscle group IDs for front view
export type FrontMuscle =
  | 'rectus-abdominis'
  | 'obliques'
  | 'transversus-abdominis'
  | 'hip-flexors'
  | 'quadriceps'
  | 'adductors'
  | 'tibialis-anterior'
  | 'diaphragm'

interface BodyFrontProps {
  highlighted?: string[]
  secondary?: string[]
  width?: number
}

const MUSCLE_LABELS: Record<string, string> = {
  'rectus-abdominis': 'Rectus Abdominis',
  'obliques': 'Obliques',
  'transversus-abdominis': 'Transversus Abdominis',
  'hip-flexors': 'Hip Flexors (Iliopsoas)',
  'quadriceps': 'Quadriceps',
  'adductors': 'Adductors',
  'tibialis-anterior': 'Tibialis Anterior',
  'diaphragm': 'Diaphragm',
}

export const BodyFront = ({ highlighted = [], secondary = [], width = 200 }: BodyFrontProps) => {
  const [tooltip, setTooltip] = useState<string | null>(null)

  const getColor = (id: string) => {
    if (highlighted.includes(id)) return '#E85B5B'
    if (secondary.includes(id)) return 'rgba(232,91,91,0.35)'
    return 'rgba(255,255,255,0.08)'
  }

  const getStroke = (id: string) => {
    if (highlighted.includes(id) || secondary.includes(id)) return 'rgba(232,91,91,0.6)'
    return 'rgba(255,255,255,0.2)'
  }

  const scale = width / 200

  return (
    <div className="relative inline-block" style={{ width, height: width * 2.3 }}>
      <svg
        viewBox="0 0 200 460"
        width={width}
        height={width * 2.3}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ─── Body outline ─────────────────────────────────────────── */}
        {/* Head */}
        <ellipse cx="100" cy="28" rx="22" ry="26" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        {/* Neck */}
        <rect x="90" y="52" width="20" height="14" rx="4" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        {/* Torso */}
        <path d="M65 66 Q55 70 52 90 L50 160 Q50 168 58 170 L142 170 Q150 168 150 160 L148 90 Q145 70 135 66 Z" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        {/* Left arm */}
        <path d="M65 70 Q45 80 40 100 Q36 120 38 150 Q38 160 44 162 Q50 164 52 155 L55 130 Q55 110 60 95 Z" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        {/* Right arm */}
        <path d="M135 70 Q155 80 160 100 Q164 120 162 150 Q162 160 156 162 Q150 164 148 155 L145 130 Q145 110 140 95 Z" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        {/* Pelvis/hips */}
        <path d="M58 168 Q50 175 48 185 L48 200 Q48 210 58 212 L142 212 Q152 210 152 200 L152 185 Q150 175 142 168 Z" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        {/* Left thigh */}
        <path d="M58 210 Q50 215 48 230 L46 300 Q46 315 54 318 Q64 320 68 310 L72 245 Q72 225 68 212 Z" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        {/* Right thigh */}
        <path d="M142 210 Q150 215 152 230 L154 300 Q154 315 146 318 Q136 320 132 310 L128 245 Q128 225 132 212 Z" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        {/* Left lower leg */}
        <path d="M54 316 Q48 325 48 345 L49 395 Q50 408 56 410 Q64 412 66 404 L68 355 Q70 335 68 318 Z" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        {/* Right lower leg */}
        <path d="M146 316 Q152 325 152 345 L151 395 Q150 408 144 410 Q136 412 134 404 L132 355 Q130 335 132 318 Z" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        {/* Left foot */}
        <ellipse cx="57" cy="425" rx="14" ry="8" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        {/* Right foot */}
        <ellipse cx="143" cy="425" rx="14" ry="8" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />

        {/* ─── Muscles ──────────────────────────────────────────────── */}

        {/* Diaphragm */}
        <path
          id="diaphragm"
          d="M70 82 Q100 95 130 82 Q130 96 100 103 Q70 96 70 82 Z"
          fill={getColor('diaphragm')}
          stroke={getStroke('diaphragm')}
          strokeWidth="1"
          style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
          onMouseEnter={() => setTooltip('diaphragm')}
          onMouseLeave={() => setTooltip(null)}
        />

        {/* Rectus Abdominis – 6 segments */}
        {[0,1,2].map(row => (
          [0,1].map(col => {
            const x = col === 0 ? 81 : 101
            const y = 110 + row * 17
            const id = 'rectus-abdominis'
            return (
              <rect
                key={`ra-${row}-${col}`}
                x={x} y={y} width={16} height={14} rx={3}
                fill={getColor(id)}
                stroke={getStroke(id)}
                strokeWidth="1"
                style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
                onMouseEnter={() => setTooltip(id)}
                onMouseLeave={() => setTooltip(null)}
              />
            )
          })
        ))}
        {/* Linea alba */}
        <line x1="100" y1="108" x2="100" y2="165" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* External Obliques */}
        <path
          id="obliques"
          d="M72 110 Q68 112 66 120 L64 148 Q64 155 70 157 L78 155 Q80 150 82 143 L82 112 Z"
          fill={getColor('obliques')}
          stroke={getStroke('obliques')}
          strokeWidth="1"
          style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
          onMouseEnter={() => setTooltip('obliques')}
          onMouseLeave={() => setTooltip(null)}
        />
        <path
          d="M128 110 Q132 112 134 120 L136 148 Q136 155 130 157 L122 155 Q120 150 118 143 L118 112 Z"
          fill={getColor('obliques')}
          stroke={getStroke('obliques')}
          strokeWidth="1"
          style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
          onMouseEnter={() => setTooltip('obliques')}
          onMouseLeave={() => setTooltip(null)}
        />

        {/* Transversus Abdominis (deep – shown as thin inner band) */}
        <path
          d="M76 162 Q100 166 124 162 Q120 168 100 170 Q80 168 76 162 Z"
          fill={getColor('transversus-abdominis')}
          stroke={getStroke('transversus-abdominis')}
          strokeWidth="1"
          strokeDasharray="3 2"
          style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
          onMouseEnter={() => setTooltip('transversus-abdominis')}
          onMouseLeave={() => setTooltip(null)}
        />

        {/* Hip Flexors (iliopsoas) */}
        <path
          d="M72 180 Q68 185 66 198 L68 210 Q72 212 76 210 L78 198 Q78 186 76 180 Z"
          fill={getColor('hip-flexors')}
          stroke={getStroke('hip-flexors')}
          strokeWidth="1"
          style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
          onMouseEnter={() => setTooltip('hip-flexors')}
          onMouseLeave={() => setTooltip(null)}
        />
        <path
          d="M128 180 Q132 185 134 198 L132 210 Q128 212 124 210 L122 198 Q122 186 124 180 Z"
          fill={getColor('hip-flexors')}
          stroke={getStroke('hip-flexors')}
          strokeWidth="1"
          style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
          onMouseEnter={() => setTooltip('hip-flexors')}
          onMouseLeave={() => setTooltip(null)}
        />

        {/* Quadriceps */}
        <path
          d="M52 214 Q48 222 48 240 L50 295 Q52 308 60 310 L66 308 Q68 295 68 278 L67 240 Q67 222 62 214 Z"
          fill={getColor('quadriceps')}
          stroke={getStroke('quadriceps')}
          strokeWidth="1"
          style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
          onMouseEnter={() => setTooltip('quadriceps')}
          onMouseLeave={() => setTooltip(null)}
        />
        <path
          d="M148 214 Q152 222 152 240 L150 295 Q148 308 140 310 L134 308 Q132 295 132 278 L133 240 Q133 222 138 214 Z"
          fill={getColor('quadriceps')}
          stroke={getStroke('quadriceps')}
          strokeWidth="1"
          style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
          onMouseEnter={() => setTooltip('quadriceps')}
          onMouseLeave={() => setTooltip(null)}
        />

        {/* Adductors */}
        <path
          d="M76 212 Q72 220 72 238 L74 280 Q76 290 80 292 L84 290 Q84 270 82 248 L80 220 Z"
          fill={getColor('adductors')}
          stroke={getStroke('adductors')}
          strokeWidth="1"
          style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
          onMouseEnter={() => setTooltip('adductors')}
          onMouseLeave={() => setTooltip(null)}
        />
        <path
          d="M124 212 Q128 220 128 238 L126 280 Q124 290 120 292 L116 290 Q116 270 118 248 L120 220 Z"
          fill={getColor('adductors')}
          stroke={getStroke('adductors')}
          strokeWidth="1"
          style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
          onMouseEnter={() => setTooltip('adductors')}
          onMouseLeave={() => setTooltip(null)}
        />

        {/* Tibialis Anterior */}
        <path
          d="M50 320 Q50 330 52 350 L54 390 Q55 400 58 400 Q61 399 61 388 L59 350 Q57 330 55 320 Z"
          fill={getColor('tibialis-anterior')}
          stroke={getStroke('tibialis-anterior')}
          strokeWidth="1"
          style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
          onMouseEnter={() => setTooltip('tibialis-anterior')}
          onMouseLeave={() => setTooltip(null)}
        />
        <path
          d="M150 320 Q150 330 148 350 L146 390 Q145 400 142 400 Q139 399 139 388 L141 350 Q143 330 145 320 Z"
          fill={getColor('tibialis-anterior')}
          stroke={getStroke('tibialis-anterior')}
          strokeWidth="1"
          style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
          onMouseEnter={() => setTooltip('tibialis-anterior')}
          onMouseLeave={() => setTooltip(null)}
        />

        {/* Pectorals (non-interactive, decorative) */}
        <path d="M72 72 Q80 78 100 80 Q100 90 90 92 Q75 88 68 80 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <path d="M128 72 Q120 78 100 80 Q100 90 110 92 Q125 88 132 80 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

        {/* Tooltip */}
        {tooltip && (
          <g>
            <rect x="20" y="440" width="160" height="18" rx="4" fill="rgba(0,0,0,0.8)" />
            <text x="100" y="453" textAnchor="middle" fill="#F5F5F5" fontSize="10" fontFamily="Outfit, sans-serif">
              {MUSCLE_LABELS[tooltip] ?? tooltip}
            </text>
          </g>
        )}
      </svg>

      {/* Legend */}
      <div className="mt-2 flex gap-4 text-xs text-muted justify-center">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-[#E85B5B]" />
          <span>Primary</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-[rgba(232,91,91,0.35)]" />
          <span>Secondary</span>
        </div>
      </div>
    </div>
  )
}
