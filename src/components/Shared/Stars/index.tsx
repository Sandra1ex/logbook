import { type ReactElement } from 'react'
import type { StarsProps } from './types'

export function Stars({ rating }: StarsProps): ReactElement {
  return (
    <span className="stars" aria-label={`Оценка ${rating} из 5`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  )
}
