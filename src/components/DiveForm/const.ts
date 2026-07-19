import type { DiveInput } from '../../types/dive'

export const emptyForm: DiveInput = {
  date: new Date().toISOString().slice(0, 10),
  time: '08:00',
  site: '',
  maxDepthM: 0,
  durationMin: 0,
  notes: '',
  rating: 3,
}
