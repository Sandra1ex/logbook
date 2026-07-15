import { useEffect, useState } from 'react'
import type { Dive, DiveInput } from '../types/dive'

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

function saveDives(dives: Dive[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dives))
}

export function useDiveLog() {
  const [dives, setDives] = useState<Dive[]>(loadDives)

  useEffect(() => {
    saveDives(dives)
  }, [dives])

  function addDive(input: DiveInput) {
    const dive: Dive = { ...input, id: crypto.randomUUID() }
    setDives((prev) => [dive, ...prev])
  }

  function deleteDive(id: string) {
    setDives((prev) => prev.filter((d) => d.id !== id))
  }

  const stats = {
    total: dives.length,
    maxDepth: dives.reduce((max, d) => Math.max(max, d.maxDepthM), 0),
    totalMinutes: dives.reduce((sum, d) => sum + d.durationMin, 0),
  }

  return { dives, addDive, deleteDive, stats }
}
