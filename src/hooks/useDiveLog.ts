import { useEffect, useState } from 'react'
import type { Dive, DiveInput } from '../types/dive'
import type { DiveLogStats } from './types'

const STORAGE_KEY = 'dive-logbook'

function loadDives(): Dive[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw) as Dive[]
    return Array.isArray(parsed) ? parsed : []
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
    const dive: Dive = { ...input, id: crypto.randomUUID() }
    setDives((prev) => [dive, ...prev])
  }

  function deleteDive(id: string): void {
    setDives((prev) => prev.filter((dive) => dive.id !== id))
  }

  function updateDive(id: string, input: DiveInput): void {
    setDives((prev) =>
      prev.map((dive) => (dive.id === id ? { ...input, id } : dive)),
    )
  }

  const stats: DiveLogStats = {
    total: dives.length,
    maxDepth: dives.reduce((max, dive) => Math.max(max, dive.maxDepthM), 0),
    totalMinutes: dives.reduce((sum, dive) => sum + dive.durationMin, 0),
  }

  return { dives, addDive, deleteDive, updateDive, stats }
}
