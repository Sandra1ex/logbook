import { useState, useEffect } from 'react'
import type { DiveInput } from '../../types/dive'
import type { DiveFormProps } from './types'
import { emptyForm } from './const'
import FormInput from '../Shared/FormInput'
import ActionButton from '../Shared/ActionButton'

export function DiveForm({ onSubmit, dive, onCloseEdit }: DiveFormProps) {
  const [form, setForm] = useState<DiveInput>(dive ? { ...dive } : emptyForm)
  const [dateError, setDateError] = useState<string | null>(null)

  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    if (dive) {
      setForm({ ...dive })
    } else {
      setForm(emptyForm)
    }
  }, [dive])

  function validateDate(date: string) {
    if (date > today) {
      setDateError('Нельзя записывать будущие даты')
      return false
    }
    setDateError(null)
    return true
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.site.trim() || !validateDate(form.date)) return
    onSubmit(form)
    setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10), time: '08:00' })
  }

  function handleFormSubmit() {
    handleSubmit({ preventDefault: () => {} } as any)
  }

  return (
    <form className="dive-form" onSubmit={handleSubmit}>
      <h2>{dive ? 'Редактирование' : 'Новое погружение'}</h2>

      <div className="form-row">
        <FormInput
          label="Дата"
          type="date"
          value={form.date}
          onChange={(e) => {
            setForm({ ...form, date: e.target.value })
            setDateError(null)
          }}
          required
          error={dateError || undefined}
        />
        <FormInput
          label="Время начала"
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />
      </div>

      <div className="form-row">
        <FormInput
          label="Место / сайт"
          type="text"
          placeholder="напр. Бали, Туламбен"
          value={form.site}
          onChange={(e) => setForm({ ...form, site: e.target.value })}
          required
        />
        <FormInput
          label="Время, мин"
          type="number"
          min={1}
          max={300}
          value={form.durationMin || ''}
          onChange={(e) =>
            setForm({ ...form, durationMin: Number(e.target.value) })
          }
          required
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

      <div className="form-actions">
        <ActionButton 
          text={dive ? 'Сохранить изменения' : 'Записать погружение'} 
          onClick={handleFormSubmit} 
          color="accent" 
        />
        {dive && onCloseEdit && (
          <ActionButton text="Отмена" onClick={onCloseEdit} color="outline" />
        )}
      </div>
    </form>
  )
}
