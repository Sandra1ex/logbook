interface StatsProps {
  total: number
  maxDepth: number
  totalMinutes: number
}

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} мин`
  return `${h} ч ${m} мин`
}

export function Stats({ total, maxDepth, totalMinutes }: StatsProps) {
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
        <span className="stat-label">время под водой</span>
      </div>
    </section>
  )
}
