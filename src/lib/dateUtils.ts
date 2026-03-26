export const parseISO = (dateStr: string): Date => new Date(dateStr)

export const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

export const isYesterday = (date: Date, today: Date = new Date()): boolean => {
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  return isSameDay(date, yesterday)
}

export const differenceInDays = (a: Date, b: Date): number => {
  const msPerDay = 1000 * 60 * 60 * 24
  const aDay = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const bDay = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.round((aDay - bDay) / msPerDay)
}

export const toISODateString = (date: Date = new Date()): string =>
  date.toISOString().split('T')[0]

export const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const formatShortDate = (dateStr: string): string => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export const getLastNDays = (n: number): string[] => {
  const days: string[] = []
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(toISODateString(d))
  }
  return days
}

export const getWeekStart = (date: Date = new Date()): Date => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  return d
}
