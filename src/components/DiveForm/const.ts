import type { DiveInput } from '../../types/dive'
import { getLocalDateString } from '../../utils/diveTimer'

function getLocalTimeString(date = new Date()): string {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export const emptyForm: DiveInput = {
  date: getLocalDateString(),
  time: '',
  site: '',
  maxDepthM: 0,
  durationMin: 0,
  notes: '',
  rating: 3,
}

/** Fill blank start time with "now" so the 24h timer can start. */
export function normalizeDiveInput(input: DiveInput): DiveInput {
  const time = (input.time ?? '').trim()

  return {
    ...input,
    time: time || getLocalTimeString(),
  }
}
