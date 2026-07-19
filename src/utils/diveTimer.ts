import type { Dive } from '../types/dive'

export const MS_PER_DAY = 24 * 60 * 60 * 1000

export function getLocalDateString(date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseTimeParts(time: string): { hours: number; minutes: number } {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})/)
  if (!match) return { hours: 0, minutes: 0 }

  return {
    hours: Number(match[1]),
    minutes: Number(match[2]),
  }
}

/** Parse dive date + start time as local Date. */
export function getDiveDateTime(dive: Pick<Dive, 'date' | 'time'>): Date {
  const dateMatch = dive.date?.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!dateMatch) return new Date(NaN)

  const year = Number(dateMatch[1])
  const month = Number(dateMatch[2])
  const day = Number(dateMatch[3])
  const { hours, minutes } = parseTimeParts(dive.time || '00:00')

  return new Date(year, month - 1, day, hours, minutes, 0, 0)
}

/**
 * Latest dive that has already started (by date + time).
 * Ignores future-dated dives so they don't block the timer.
 */
export function getLatestDive(dives: Dive[], now = Date.now()): Dive | null {
  if (dives.length === 0) return null

  const started = dives
    .map((dive) => ({ dive, at: getDiveDateTime(dive).getTime() }))
    .filter(({ at }) => !Number.isNaN(at) && at <= now)
    .sort((a, b) => b.at - a.at)

  return started[0]?.dive ?? null
}

/** Countdown ends 24 hours after the dive started. */
export function getTimerEndDate(dive: Dive): Date {
  return new Date(getDiveDateTime(dive).getTime() + MS_PER_DAY)
}

/**
 * Active only if the dive already happened
 * and less than 24 hours have passed since it.
 */
export function isTimerActive(dive: Dive, now = Date.now()): boolean {
  const diveAt = getDiveDateTime(dive).getTime()
  if (Number.isNaN(diveAt)) return false

  const elapsed = now - diveAt
  return elapsed >= 0 && elapsed < MS_PER_DAY
}

export function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':')
}

export function formatTimerEnd(date: Date): string {
  const datePart = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const timePart = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${datePart}, ${timePart}`
}

export function formatDiveStart(dive: Dive): string {
  const diveAt = getDiveDateTime(dive)
  if (Number.isNaN(diveAt.getTime())) return '—'

  return formatTimerEnd(diveAt)
}
