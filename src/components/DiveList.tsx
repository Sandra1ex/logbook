import type { Dive } from '../types/dive'

interface DiveListProps {
  dives: Dive[]
  onDelete: (id: string) => void
}

function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars" aria-label={`Оценка ${rating} из 5`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  )
}

export function DiveList({ dives, onDelete }: DiveListProps) {
  if (dives.length === 0) {
    return (
      <section className="dive-list empty">
        <h2>Журнал пуст</h2>
        <p>Добавь первое погружение — оно появится здесь.</p>
      </section>
    )
  }

  return (
    <section className="dive-list">
      <h2>Журнал ({dives.length})</h2>
      <ul>
        {dives.map((dive) => (
          <li key={dive.id} className="dive-card">
            <div className="dive-card-header">
              <div>
                <h3>{dive.site}</h3>
                <time dateTime={dive.date}>{formatDate(dive.date)}</time>
              </div>
              <Stars rating={dive.rating} />
            </div>

            <div className="dive-meta">
              <span>{dive.maxDepthM} м</span>
              <span>{dive.durationMin} мин</span>
            </div>

            {dive.notes && <p className="dive-notes">{dive.notes}</p>}

            <button
              type="button"
              className="btn-delete"
              onClick={() => onDelete(dive.id)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
