import type { Dive } from '../../types/dive'

export interface DiveTableProps {
  dives: Dive[]
}

export type SortKey = 'site' | 'maxDepthM' | 'durationMin'
export type SortDir = 'asc' | 'desc'

export interface SortState {
  key: SortKey
  dir: SortDir
}

export const PAGE_SIZE = 10

export interface SortableColumn {
  key: SortKey
  label: string
}
