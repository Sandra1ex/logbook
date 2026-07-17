import { useState, useEffect } from 'react'
import type { Dive } from '../types/dive'
import ActionButton from './ActionButtons'

interface DiveListProps {
  dives: Dive[]
  onDelete: (id: string) => void
}

function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars" aria-label={`Оценка ${rating} из 5`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  )
}

export function DiveList({ dives, onDelete }: DiveListProps) {
  const [viewingId, setViewingId] = useState<string | null>(null)
  const diveToView = dives.find((d) => d.id === viewingId)

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape' && viewingId) {
        setViewingId(null)
      }
    }
    if (viewingId) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [viewingId])

  function closeModal() {
    setViewingId(null)
  }

  if (dives.length === 0) {
    return (
      <section className="dive-list empty">
        <h2>Журнал пуст</h2>
        <p>Добавь первое погружение — оно появится здесь.</p>
      </section>
    )
  }

  return (
    <section className="dive-list">
      <h2>Журнал ({dives.length})</h2>
      <ul>
        {dives.map((dive) => (
          <li key={dive.id} className="dive-card">
            <div className="dive-card-header" onClick={() => setViewingId(dive.id)}>
              <div>
                <h3>{dive.site}</h3>
                <time dateTime={dive.date}>{formatDate(dive.date)}</time>
              </div>
              <Stars rating={dive.rating} />
            </div>

            <div className="dive-meta">
              <span>{dive.maxDepthM} м</span>
              <span>{dive.durationMin} мин</span>
            </div>

              <div className="dive-actions">
                <ActionButton text="Удалить" onClick={() => onDelete(dive.id)} color="red" />
              </div>

              {viewingId === dive.id && diveToView && (
                <div className="modal-overlay" onClick={closeModal}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                      <h3>{diveToView.site}</h3>
                      <button type="button" className="modal-close-btn" onClick={closeModal}>
                        ×
                      </button>
                    </div>
                    <time dateTime={diveToView.date}>{formatDate(diveToView.date)}</time>
                    <div className="modal-grid">
                      <div>
                        <span className="label">Глубина</span>
                        <span className="value">{diveToView.maxDepthM} м</span>
                      </div>
                      <div>
                        <span className="label">Время</span>
                        <span className="value">{diveToView.durationMin} мин</span>
                      </div>
                      <div>
                        <span className="label">Оценка</span>
                        <span className="value">
                          <Stars rating={diveToView.rating} />
                        </span>
                      </div>
                    </div>
                    {diveToView.notes && (
                      <div className="modal-section">
                        <span className="label">Заметки</span>
                        <p className="notes">{diveToView.notes}</p>
                      </div>
                    )}
                    <div className="modal-actions">
                      <ActionButton text="Добавить данные" onClick={() => {}} />
                      <ActionButton text="Редактировать" onClick={() => {}} color="blue" />
                    </div>
                  </div>
                </div>
              )}
          </li>
        ))}
      </ul>
    </section>
  )
}
