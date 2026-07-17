import { useState, useEffect, type FormEvent } from 'react'
import type { Dive, DiveInput } from '../types/dive'
import ActionButton from './ActionButtons'

const emptyForm: DiveInput = {
  date: new Date().toISOString().slice(0, 10),
  site: '',
  maxDepthM: 0,
  durationMin: 0,
  notes: '',
  rating: 3,
}

interface DiveFormProps {
  onSubmit: (dive: Dive | DiveInput) => void
  dive?: Dive
  onCloseEdit?: () => void
}

export function DiveForm({ onSubmit, dive, onCloseEdit }: DiveFormProps) {
  const [form, setForm] = useState<DiveInput>(dive ? { ...dive } : emptyForm)

  useEffect(() => {
    if (dive) {
      setForm({ ...dive })
    } else {
      setForm(emptyForm)
    }
  }, [dive])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.site.trim()) return
    onSubmit(form)
    setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) })
  }

  function handleFormSubmit() {
    handleSubmit({ preventDefault: () => {} } as FormEvent)
  }

  return (
    <form className="dive-form" onSubmit={handleSubmit}>
      <h2>{dive ? 'Редактирование' : 'Новое погружение'}</h2>

      <div className="form-row">
        <label>
          Дата
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </label>
        <label>
          Место / сайт
          <input
            type="text"
            placeholder="напр. Бали, Туламбен"
            value={form.site}
            onChange={(e) => setForm({ ...form, site: e.target.value })}
            required
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Макс. глубина, м
          <input
            type="number"
            min={0}
            max={200}
            value={form.maxDepthM || ''}
            onChange={(e) =>
              setForm({ ...form, maxDepthM: Number(e.target.value) })
            }
            required
          />
        </label>
        <label>
          Время, мин
          <input
            type="number"
            min={1}
            max={300}
            value={form.durationMin || ''}
            onChange={(e) =>
              setForm({ ...form, durationMin: Number(e.target.value) })
            }
            required
          />
        </label>
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

      <label>
        Заметки
        <textarea
          rows={3}
          placeholder="что видел, погода, оборудование..."
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </label>

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
