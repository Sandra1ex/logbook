import { useState, useEffect } from 'react'
import type { DiveInput } from '../../types/dive'
import type { DiveFormProps } from './types'
import { emptyForm } from './const'
import { validateDiveForm, type FieldErrors } from './validation'
import FormInput from '../Shared/FormInput'
import ActionButton from '../Shared/ActionButton'

export function DiveForm({ onSubmit, dive, onCloseEdit, embedded }: DiveFormProps) {
  const [form, setForm] = useState<DiveInput>(dive ? { ...dive } : emptyForm)
  const [errors, setErrors] = useState<FieldErrors>({})

  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    if (dive) {
      setForm({ ...dive })
    } else {
      setForm(emptyForm)
    }
    setErrors({})
  }, [dive])

  function clearError(field: keyof FieldErrors) {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nextErrors = validateDiveForm(form, today)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onSubmit(form)
    if (!dive) {
      setForm({ ...emptyForm, date: today })
      setErrors({})
    }
  }

  function handleFormSubmit() {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent)
  }

  return (
    <form className={`dive-form${embedded ? ' embedded' : ''}`} onSubmit={handleSubmit}>
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
          onClick={handleFormSubmit}
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
