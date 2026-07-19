import type { Dive } from '../../../types/dive'

export interface StatsProps {
  total: number
  maxDepth: number
  totalMinutes: number
  latestDive: Dive | null
}

export interface DiveTimerState {
  isActive: boolean
  remainingMs: number
  endsAt: Date | null
}
