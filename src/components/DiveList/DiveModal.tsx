import { useState, useEffect, type ReactElement } from 'react'
import type { StarsProps, DiveModalProps } from './types'
import ActionButton from '../Shared/ActionButton'

function Stars({ rating }: StarsProps): ReactElement {
  return (
    <span className="stars" aria-label={`Оценка ${rating} из 5`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  )
}

function formatDate(iso: string): string {
  return new Date(iso + 'T12:00:00').toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatDateTime(dateIso: string, time: string): string {
  return `${formatDate(dateIso)} в ${time}`
}

export function DiveModal({ dive, onClose }: DiveModalProps): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(true)

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false)
        onClose()
      }
    }
    if (isModalOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isModalOpen, onClose])

  function closeModal() {
    setIsModalOpen(false)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{dive.site}</h3>
          <button type="button" className="modal-close-btn" onClick={closeModal}>
            ×
          </button>
        </div>
        <time dateTime={dive.date + 'T' + dive.time}>{formatDateTime(dive.date, dive.time)}</time>
        <div className="modal-grid">
          <div>
            <span className="label">Глубина</span>
            <span className="value">{dive.maxDepthM} м</span>
          </div>
          <div>
            <span className="label">Время</span>
            <span className="value">{dive.durationMin} мин</span>
          </div>
          <div>
            <span className="label">Оценка</span>
            <span className="value">
              <Stars rating={dive.rating} />
            </span>
          </div>
        </div>
        {dive.notes && (
          <div className="modal-section">
            <span className="label">Заметки</span>
            <p className="notes">{dive.notes}</p>
          </div>
        )}
        <div className="modal-actions">
          <ActionButton text="Добавить данные" onClick={() => {}} />
          <ActionButton text="Редактировать" onClick={() => {}} color="blue" />
        </div>
      </div>
    </div>
  )
}
