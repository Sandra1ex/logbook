import type { ChangeEventHandler } from 'react'

export interface FormInputProps {
  label: string
  type: string
  value: string | number
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  required?: boolean
  placeholder?: string
  min?: number | string
  max?: number | string
  error?: string
}
