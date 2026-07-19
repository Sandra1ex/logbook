import { type ReactElement } from 'react'
import type { StatsProps } from './types'
import { DiveTimerCard } from './DiveTimerCard'

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours === 0) return `${mins} мин`
  return `${hours} ч ${mins} мин`
}

export function Stats({
  total,
  maxDepth,
  totalMinutes,
  latestDive,
}: StatsProps): ReactElement {
  return (
    <section className="stats">
      <div className="stat-card">
        <span className="stat-value">{total}</span>
        <span className="stat-label">погружений</span>
      </div>
      <div className="stat-card">
        <span className="stat-value">{maxDepth || '—'}</span>
        <span className="stat-label">макс. глубина, м</span>
      </div>
      <div className="stat-card">
        <span className="stat-value">
          {totalMinutes ? formatDuration(totalMinutes) : '—'}
        </span>
        <span className="stat-label">всего под водой</span>
      </div>
      <DiveTimerCard latestDive={latestDive} />
    </section>
  )
}
