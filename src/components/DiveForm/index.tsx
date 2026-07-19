import { useState, useEffect, type FormEvent, type ReactElement } from 'react'
import type { Dive, DiveInput } from '../../types/dive'
import type { DiveFormProps, FieldErrors } from './types'
import { emptyForm, normalizeDiveInput } from './const'
import { validateDiveForm } from './validation'
import { getLocalDateString } from '../../utils/diveTimer'
import FormInput from '../Shared/FormInput'
import ActionButton from '../Shared/ActionButton'

function toFormValues(dive: Dive): DiveInput {
  return {
    date: dive.date,
    time: dive.time,
    site: dive.site,
    maxDepthM: dive.maxDepthM,
    durationMin: dive.durationMin,
    notes: dive.notes,
    rating: dive.rating,
  }
}

export function DiveForm({
  onSubmit,
  dive,
  onCloseEdit,
  embedded,
}: DiveFormProps): ReactElement {
  const [form, setForm] = useState<DiveInput>(
    dive ? toFormValues(dive) : emptyForm,
  )
  const [errors, setErrors] = useState<FieldErrors>({})

  const today = getLocalDateString()

  useEffect(() => {
    if (dive) {
      setForm(toFormValues(dive))
    } else {
      setForm({ ...emptyForm, date: getLocalDateString() })
    }
    setErrors({})
  }, [dive])

  function clearError(field: keyof FieldErrors): void {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    const nextErrors = validateDiveForm(form, today)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onSubmit(normalizeDiveInput(form))

    if (!dive) {
      setForm({ ...emptyForm, date: getLocalDateString() })
      setErrors({})
    }
  }

  return (
    <form
      className={`dive-form${embedded ? ' embedded' : ''}`}
      onSubmit={handleSubmit}
    >
      <h2>{dive ? 'Редактирование' : 'Новое погружение'}</h2>

      <div className="form-row">
        <FormInput
          label="Дата"
          type="date"
          value={form.date}
          onChange={(e) => {
            setForm({ ...form, date: e.target.value })
            clearError('date')
          }}
          error={errors.date}
        />
        <FormInput
          label="Время начала"
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />
      </div>

      <div className="form-row">
        <FormInput
          label="Место / сайт"
          type="text"
          placeholder="напр. Бали, Туламбен"
          value={form.site}
          onChange={(e) => {
            setForm({ ...form, site: e.target.value })
            clearError('site')
          }}
          error={errors.site}
        />
        <FormInput
          label="Макс. глубина, м"
          type="number"
          min={0}
          max={200}
          value={form.maxDepthM || ''}
          onChange={(e) => {
            setForm({ ...form, maxDepthM: Number(e.target.value) })
            clearError('maxDepthM')
          }}
          error={errors.maxDepthM}
        />
      </div>

      <div className="form-row">
        <FormInput
          label="Время, мин"
          type="number"
          min={1}
          max={300}
          value={form.durationMin || ''}
          onChange={(e) => {
            setForm({ ...form, durationMin: Number(e.target.value) })
            clearError('durationMin')
          }}
          error={errors.durationMin}
        />
      </div>

      <label>
        Оценка
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={star <= form.rating ? 'star active' : 'star'}
              onClick={() => setForm({ ...form, rating: star })}
              aria-label={`${star} звёзд`}
            >
              ★
            </button>
          ))}
        </div>
      </label>

      <FormInput
        label="Заметки"
        type="textarea"
        placeholder="что видел, погода, оборудование..."
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      <div className={embedded ? 'modal-actions' : 'form-actions'}>
        <ActionButton
          text={dive ? 'Сохранить изменения' : 'Записать погружение'}
          type="submit"
          color="accent"
        />
        {dive && onCloseEdit && (
          <ActionButton
            text="Отмена"
            onClick={onCloseEdit}
            color={embedded ? 'red' : 'outline'}
          />
        )}
      </div>
    </form>
  )
}
