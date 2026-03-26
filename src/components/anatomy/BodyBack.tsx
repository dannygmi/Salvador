'use client'

import { useState } from 'react'

export type BackMuscle =
  | 'spinal-erectors'
  | 'multifidus'
  | 'latissimus-dorsi'
  | 'trapezius'
  | 'rhomboids'
  | 'quadratus-lumborum'
  | 'gluteus-maximus'
  | 'gluteus-medius'
  | 'hamstrings'
  | 'calves'
  | 'glutes'

interface BodyBackProps {
  highlighted?: string[]
  secondary?: string[]
  width?: number
}

const MUSCLE_LABELS: Record<string, string> = {
  'spinal-erectors': 'Spinal Erectors',
  'multifidus': 'Multifidus',
  'latissimus-dorsi': 'Latissimus Dorsi',
  'trapezius': 'Trapezius',
  'rhomboids': 'Rhomboids',
  'quadratus-lumborum': 'Quadratus Lumborum',
  'gluteus-maximus': 'Gluteus Maximus',
  'gluteus-medius': 'Gluteus Medius',
  'hamstrings': 'Hamstrings',
  'calves': 'Gastrocnemius / Calves',
  'glutes': 'Glutes',
}

export const BodyBack = ({ highlighted = [], secondary = [], width = 200 }: BodyBackProps) => {
  const [tooltip, setTooltip] = useState<string | null>(null)

  const getColor = (id: string) => {
    const ids = id === 'glutes' ? ['gluteus-maximus', 'gluteus-medius'] : [id]
    if (ids.some(i => highlighted.includes(i) || highlighted.includes('glutes') && (i === 'gluteus-maximus' || i === 'gluteus-medius')))
      return '#E85B5B'
    if (ids.some(i => secondary.includes(i) || secondary.includes('glutes') && (i === 'gluteus-maximus' || i === 'gluteus-medius')))
      return 'rgba(232,91,91,0.35)'
    return 'rgba(255,255,255,0.08)'
  }

  const getStroke = (id: string) => {
    const c = getColor(id)
    if (c === 'rgba(255,255,255,0.08)') return 'rgba(255,255,255,0.2)'
    return 'rgba(232,91,91,0.6)'
  }

  const muscle = (id: string) => ({
    fill: getColor(id),
    stroke: getStroke(id),
    strokeWidth: 1 as number,
    style: { cursor: 'pointer' as const, transition: 'fill 0.3s' },
    onMouseEnter: () => setTooltip(id),
    onMouseLeave: () => setTooltip(null),
  })

  return (
    <div className="relative inline-block" style={{ width, height: width * 2.3 }}>
      <svg viewBox="0 0 200 460" width={width} height={width * 2.3} xmlns="http://www.w3.org/2000/svg">
        {/* Body outline back view */}
        <ellipse cx="100" cy="28" rx="22" ry="26" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        <rect x="90" y="52" width="20" height="14" rx="4" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        <path d="M65 66 Q55 70 52 90 L50 160 Q50 168 58 170 L142 170 Q150 168 150 160 L148 90 Q145 70 135 66 Z" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        <path d="M65 70 Q45 80 40 100 Q36 120 38 150 Q38 160 44 162 Q50 164 52 155 L55 130 Q55 110 60 95 Z" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        <path d="M135 70 Q155 80 160 100 Q164 120 162 150 Q162 160 156 162 Q150 164 148 155 L145 130 Q145 110 140 95 Z" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        <path d="M58 168 Q50 175 48 185 L48 210 Q48 215 58 216 L142 216 Q152 215 152 210 L152 185 Q150 175 142 168 Z" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        <path d="M58 214 Q50 218 48 232 L46 298 Q46 312 54 316 Q64 318 68 308 L72 245 Q72 226 68 214 Z" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        <path d="M142 214 Q150 218 152 232 L154 298 Q154 312 146 316 Q136 318 132 308 L128 245 Q128 226 132 214 Z" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        <path d="M54 314 Q48 324 48 344 L49 394 Q50 406 56 408 Q64 410 66 402 L68 354 Q70 333 68 316 Z" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        <path d="M146 314 Q152 324 152 344 L151 394 Q150 406 144 408 Q136 410 134 402 L132 354 Q130 333 132 316 Z" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        <ellipse cx="57" cy="423" rx="14" ry="8" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
        <ellipse cx="143" cy="423" rx="14" ry="8" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />

        {/* ─── Muscles ─── */}

        {/* Trapezius – upper back / neck */}
        <path
          d="M78 66 Q100 72 122 66 Q118 80 100 84 Q82 80 78 66 Z"
          {...muscle('trapezius')}
        />
        {/* Lower trap (wings) */}
        <path d="M66 80 Q78 82 82 90 Q75 96 65 95 Q60 88 66 80 Z" {...muscle('trapezius')} />
        <path d="M134 80 Q122 82 118 90 Q125 96 135 95 Q140 88 134 80 Z" {...muscle('trapezius')} />

        {/* Rhomboids */}
        <path
          d="M82 90 Q100 95 118 90 L116 108 Q100 112 84 108 Z"
          {...muscle('rhomboids')}
        />

        {/* Latissimus Dorsi */}
        <path
          d="M56 92 Q66 92 74 102 L74 140 Q74 150 68 152 L58 150 Q53 140 54 120 Z"
          {...muscle('latissimus-dorsi')}
        />
        <path
          d="M144 92 Q134 92 126 102 L126 140 Q126 150 132 152 L142 150 Q147 140 146 120 Z"
          {...muscle('latissimus-dorsi')}
        />

        {/* Spinal Erectors (two columns) */}
        <path
          d="M88 96 Q92 97 94 100 L94 164 Q93 167 90 168 L87 167 Q85 164 85 161 L85 100 Z"
          {...muscle('spinal-erectors')}
        />
        <path
          d="M106 96 Q110 97 115 100 L115 164 Q114 167 111 168 L108 167 Q106 164 106 161 L106 100 Z"
          {...muscle('spinal-erectors')}
        />

        {/* Multifidus (flanking spine deeper) */}
        <path
          d="M85 108 Q87 110 88 116 L88 155 Q87 158 85 158 Q83 157 83 154 L82 115 Z"
          {...muscle('multifidus')}
        />
        <path
          d="M115 108 Q113 110 112 116 L112 155 Q113 158 115 158 Q117 157 117 154 L118 115 Z"
          {...muscle('multifidus')}
        />

        {/* Quadratus Lumborum */}
        <path
          d="M74 145 Q80 148 85 150 L85 165 Q80 166 75 164 Q72 158 72 150 Z"
          {...muscle('quadratus-lumborum')}
        />
        <path
          d="M126 145 Q120 148 115 150 L115 165 Q120 166 125 164 Q128 158 128 150 Z"
          {...muscle('quadratus-lumborum')}
        />

        {/* Gluteus Medius */}
        <path
          d="M58 172 Q66 170 76 172 L80 186 Q76 194 68 196 Q58 192 56 184 Z"
          {...muscle('gluteus-medius')}
        />
        <path
          d="M142 172 Q134 170 124 172 L120 186 Q124 194 132 196 Q142 192 144 184 Z"
          {...muscle('gluteus-medius')}
        />

        {/* Gluteus Maximus */}
        <path
          d="M58 186 Q76 192 88 196 L92 212 Q84 216 72 214 Q58 210 55 200 Z"
          {...muscle('gluteus-maximus')}
        />
        <path
          d="M142 186 Q124 192 112 196 L108 212 Q116 216 128 214 Q142 210 145 200 Z"
          {...muscle('gluteus-maximus')}
        />

        {/* Hamstrings */}
        <path
          d="M50 218 Q60 215 70 218 L72 280 Q70 300 62 308 Q52 306 49 296 L48 256 Z"
          {...muscle('hamstrings')}
        />
        <path
          d="M150 218 Q140 215 130 218 L128 280 Q130 300 138 308 Q148 306 151 296 L152 256 Z"
          {...muscle('hamstrings')}
        />

        {/* Calves / Gastrocnemius */}
        <path
          d="M50 320 Q56 318 62 320 L64 360 Q62 378 56 380 Q50 378 49 360 Z"
          {...muscle('calves')}
        />
        <path
          d="M150 320 Q144 318 138 320 L136 360 Q138 378 144 380 Q150 378 151 360 Z"
          {...muscle('calves')}
        />

        {/* Spine indicator */}
        <line x1="100" y1="66" x2="100" y2="168" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 3" />

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
