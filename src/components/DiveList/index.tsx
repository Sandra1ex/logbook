import { useState, type ReactElement } from 'react'
import type { DiveListProps } from './types'
import { DiveCard } from './DiveCard'
import { DiveModal } from './DiveModal'

export function DiveList({
  dives,
  onDelete,
  onUpdate,
}: DiveListProps): ReactElement {
  const [viewingId, setViewingId] = useState<string | null>(null)
  const diveToView = dives.find((dive) => dive.id === viewingId)

  if (dives.length === 0) {
    return (
      <section className="dive-list empty">
        <h2>Журнал пуст</h2>
        <p>Добавь первое погружение — оно появится здесь.</p>
      </section>
    )
  }

  return (
    <>
      <section className="dive-list">
        <h2>Журнал ({dives.length})</h2>
        <ul>
          {dives.map((dive) => (
            <DiveCard
              key={dive.id}
              dive={dive}
              onClick={() => setViewingId(dive.id)}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </section>

      {viewingId && diveToView && (
        <DiveModal
          dive={diveToView}
          onClose={() => setViewingId(null)}
          onUpdate={onUpdate}
        />
      )}
    </>
  )
}
