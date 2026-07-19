import { useEffect, useState, type ReactElement } from 'react'
import type { Dive } from '../../../types/dive'
import type { DiveTimerState } from './types'
import {
  formatCountdown,
  formatTimerEnd,
  getTimerEndDate,
  isTimerActive,
} from '../../../utils/diveTimer'

interface DiveTimerCardProps {
  latestDive: Dive | null
}

function getTimerState(latestDive: Dive | null, now: number): DiveTimerState {
  if (!latestDive || !isTimerActive(latestDive, now)) {
    return { isActive: false, remainingMs: 0, endsAt: null }
  }

  const endsAt = getTimerEndDate(latestDive)

  return {
    isActive: true,
    remainingMs: Math.max(0, endsAt.getTime() - now),
    endsAt,
  }
}

export function DiveTimerCard({
  latestDive,
}: DiveTimerCardProps): ReactElement | null {
  const [now, setNow] = useState(() => Date.now())
  const timer = getTimerState(latestDive, now)

  useEffect(() => {
    if (!latestDive || !isTimerActive(latestDive)) return

    const tick = () => setNow(Date.now())
    tick()

    const intervalId = window.setInterval(tick, 1000)
    return () => window.clearInterval(intervalId)
  }, [latestDive])

  if (!timer.isActive || !timer.endsAt) return null

  return (
    <div className="stat-card stat-card-timer">
      <span className="stat-value timer-value">
        {formatCountdown(timer.remainingMs)}
      </span>
      <span className="stat-label">время до разрешенного полета</span>
      <span className="timer-end">до {formatTimerEnd(timer.endsAt)}</span>
    </div>
  )
}
