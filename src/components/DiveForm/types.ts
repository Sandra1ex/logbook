import type { Dive, DiveInput } from '../../types/dive'

export interface DiveFormProps {
  onSubmit: (dive: DiveInput) => void
  dive?: Dive
  onCloseEdit?: () => void
  embedded?: boolean
}

export type DiveFormField = 'date' | 'site' | 'maxDepthM' | 'durationMin'

export type FieldErrors = Partial<Record<DiveFormField, string>>
