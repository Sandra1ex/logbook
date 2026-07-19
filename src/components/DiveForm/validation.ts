import type { DiveInput } from '../../types/dive'

export type FieldErrors = Partial<Record<'date' | 'site' | 'maxDepthM' | 'durationMin', string>>

export function validateDiveForm(form: DiveInput, today: string): FieldErrors {
  const errors: FieldErrors = {}

  if (!form.date) {
    errors.date = 'Укажите дату'
  } else if (form.date > today) {
    errors.date = 'Нельзя записывать будущие даты'
  }

  if (!form.site.trim()) {
    errors.site = 'Укажите место'
  }

  if (!form.maxDepthM || form.maxDepthM <= 0) {
    errors.maxDepthM = 'Укажите глубину'
  }

  if (!form.durationMin || form.durationMin <= 0) {
    errors.durationMin = 'Укажите длительность'
  }

  return errors
}
