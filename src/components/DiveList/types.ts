import type { Dive } from '../../types/dive'

export interface DiveListProps {
  dives: Dive[]
  onDelete: (id: string) => void
}

export interface StarsProps {
  rating: number
}

export interface DiveCardProps {
  dive: {
    id: string
    site: string
    date: string
    maxDepthM: number
    durationMin: number
    rating: number
    notes?: string
  }
  onClick: () => void
  onDelete: (id: string) => void
}

export interface DiveModalProps {
  dive: Dive
  onClose: () => void
}
