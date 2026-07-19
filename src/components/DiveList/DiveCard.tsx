import { type ReactElement } from 'react'
import type { DiveCardProps } from './types'
import { Stars } from '../Shared/Stars'
import { formatDateLong } from '../../utils/format'
import ActionButton from '../Shared/ActionButton'

export function DiveCard({ dive, onClick, onDelete }: DiveCardProps): ReactElement {
  return (
    <li className="dive-card">
      <div className="dive-card-header" onClick={onClick}>
        <div>
          <h3>{dive.site}</h3>
          <time dateTime={dive.date}>{formatDateLong(dive.date)}</time>
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
