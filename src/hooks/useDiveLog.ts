import { useEffect, useState } from 'react'
import type { Dive, DiveInput } from '../types/dive'
import type { DiveLogStats } from './types'
import { getDiveDateTime } from '../utils/diveTimer'

const STORAGE_KEY = 'dive-logbook'

function migrateDive(raw: Dive & { recordedAt?: string }): Dive {
  if (raw.recordedAt) return raw as Dive

  const diveAt = getDiveDateTime(raw)
  return {
    ...raw,
    recordedAt: Number.isNaN(diveAt.getTime())
      ? new Date().toISOString()
      : diveAt.toISOString(),
  }
}

function loadDives(): Dive[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw) as Dive[]
    if (!Array.isArray(parsed)) return []

    return parsed.map(migrateDive)
  } catch {
    return []
  }
}

function saveDives(dives: Dive[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dives))
}

export function useDiveLog() {
  const [dives, setDives] = useState<Dive[]>(loadDives)

  useEffect(() => {
    saveDives(dives)
  }, [dives])

  function addDive(input: DiveInput): void {
    const dive: Dive = {
      ...input,
      id: crypto.randomUUID(),
      recordedAt: new Date().toISOString(),
    }
    setDives((prev) => [dive, ...prev])
  }

  function deleteDive(id: string): void {
    setDives((prev) => prev.filter((dive) => dive.id !== id))
  }

  function updateDive(id: string, input: DiveInput): void {
    setDives((prev) =>
      prev.map((dive) =>
        dive.id === id
          ? {
              ...input,
              id,
              recordedAt: dive.recordedAt || new Date().toISOString(),
            }
          : dive,
      ),
    )
  }

  const stats: DiveLogStats = {
    total: dives.length,
    maxDepth: dives.reduce((max, dive) => Math.max(max, dive.maxDepthM), 0),
    totalMinutes: dives.reduce((sum, dive) => sum + dive.durationMin, 0),
  }

  return { dives, addDive, deleteDive, updateDive, stats }
}
