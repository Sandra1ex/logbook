export interface Dive {
  id: string
  date: string
  time: string
  site: string
  maxDepthM: number
  durationMin: number
  notes: string
  rating: number
  /** When the log entry was saved — used for the 24h timer */
  recordedAt: string
}

export type DiveInput = Omit<Dive, 'id' | 'recordedAt'>
