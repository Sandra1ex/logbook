import type { Dive, DiveInput } from '../../types/dive'

export interface DiveFormProps {
  onSubmit: (dive: DiveInput) => void
  dive?: Dive
  onCloseEdit?: () => void
  embedded?: boolean
}
