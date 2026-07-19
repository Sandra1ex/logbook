import { useState, useEffect, useRef, type ReactElement } from 'react'
import type { DiveInput } from '../../types/dive'
import type { DiveModalProps } from './types'
import { Stars } from '../Shared/Stars'
import { formatDateTimeLong } from '../../utils/format'
import { DiveForm } from '../DiveForm'
import ActionButton from '../Shared/ActionButton'

const CLOSE_DURATION_MS = 550

export function DiveModal({ dive, onClose, onUpdate }: DiveModalProps): ReactElement {
  const [isEditing, setIsEditing] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const closeTimeoutRef = useRef<number | null>(null)
  const isClosingRef = useRef(false)

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  function requestClose() {
    if (isClosingRef.current) return
    isClosingRef.current = true
    setIsClosing(true)
    closeTimeoutRef.current = window.setTimeout(onClose, CLOSE_DURATION_MS)
  }

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key !== 'Escape' || isClosingRef.current) return
      if (isEditing) {
        setIsEditing(false)
      } else {
        requestClose()
      }
    }

    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isEditing, onClose])

  function handleOverlayClick() {
    if (isEditing || isClosing) return
    requestClose()
  }

  function handleUpdate(input: DiveInput) {
    onUpdate(dive.id, input)
    setIsEditing(false)
  }

  return (
    <div
      className={`modal-overlay${isClosing ? ' modal-overlay-closing' : ''}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`modal-content${isEditing ? ' modal-content-editing' : ''}${isClosing ? ' modal-content-closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{isEditing ? 'Редактирование' : dive.site}</h3>
          <button type="button" className="modal-close-btn" onClick={requestClose}>
            ×
          </button>
        </div>

        {isEditing ? (
          <DiveForm
            dive={dive}
            embedded
            onSubmit={handleUpdate}
            onCloseEdit={() => setIsEditing(false)}
          />
        ) : (
          <>
            <time dateTime={dive.time ? dive.date + 'T' + dive.time : dive.date}>
              {formatDateTimeLong(dive.date, dive.time)}
            </time>
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
              <ActionButton
                text="Редактировать"
                onClick={() => setIsEditing(true)}
                color="blue"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
