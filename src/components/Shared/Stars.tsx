import { type ReactElement } from 'react'

interface StarsProps {
  rating: number
}

export function Stars({ rating }: StarsProps): ReactElement {
  return (
    <span className="stars" aria-label={`Оценка ${rating} из 5`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  )
}
