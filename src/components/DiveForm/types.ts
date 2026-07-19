import type { Dive, DiveInput } from '../../types/dive'

export interface DiveFormProps {
  onSubmit: (dive: Dive | DiveInput) => void
  dive?: Dive
  onCloseEdit?: () => void
}
