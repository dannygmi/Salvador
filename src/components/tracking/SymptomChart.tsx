'use client'

import type { SymptomEntry } from '@/types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { formatShortDate } from '@/lib/dateUtils'

interface SymptomChartProps {
  symptoms: SymptomEntry[]
  days?: number
}

export const SymptomChart = ({ symptoms, days = 30 }: SymptomChartProps) => {
  const data = symptoms
    .slice(-days)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(s => ({
      date: formatShortDate(s.date),
      'Back Pain': s.backPain,
      'Leg Pain': s.legPain,
    }))

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted text-sm">
        No symptom data yet. Log your first check-in!
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="date" tick={{ fill: '#6B7280', fontSize: 11 }} />
        <YAxis domain={[0, 10]} tick={{ fill: '#6B7280', fontSize: 11 }} ticks={[0, 2, 4, 6, 8, 10]} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 12 }}
          labelStyle={{ color: '#F5F5F5' }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="Back Pain" stroke="#C7727E" strokeWidth={2} dot={{ r: 3, fill: '#C7727E' }} />
        <Line type="monotone" dataKey="Leg Pain" stroke="#5B8DB8" strokeWidth={2} dot={{ r: 3, fill: '#5B8DB8' }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
