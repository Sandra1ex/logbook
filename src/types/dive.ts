export interface Dive {
  id: string
  date: string
  site: string
  maxDepthM: number
  durationMin: number
  notes: string
  rating: number
}

export type DiveInput = Omit<Dive, 'id'>
