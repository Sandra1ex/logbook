import type { Dive, DiveInput } from '../../types/dive'

export interface DiveListProps {
  dives: Dive[]
  onDelete: (id: string) => void
  onUpdate: (id: string, input: DiveInput) => void
}

export interface DiveCardProps {
  dive: Dive
  onClick: () => void
  onDelete: (id: string) => void
}

export interface DiveModalProps {
  dive: Dive
  onClose: () => void
  onUpdate: (id: string, input: DiveInput) => void
}
