import { type ReactElement } from 'react'
import type { StarsProps, DiveCardProps } from './types'
import ActionButton from '../Shared/ActionButton'

function Stars({ rating }: StarsProps): ReactElement {
  return (
    <span className="stars" aria-label={`Оценка ${rating} из 5`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  )
}

function formatDate(iso: string): string {
  return new Date(iso + 'T12:00:00').toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function DiveCard({ dive, onClick, onDelete }: DiveCardProps): ReactElement {
  return (
    <li key={dive.id} className="dive-card">
      <div className="dive-card-header" onClick={onClick}>
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

      <div className="dive-actions">
        <ActionButton text="Удалить" onClick={() => onDelete(dive.id)} color="red" />
      </div>
    </li>
  )
}
