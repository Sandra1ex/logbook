import { type ReactElement } from 'react'
import type { FormInputProps } from './types'

function FormInput({
  label,
  type,
  value,
  onChange,
  required,
  placeholder,
  min,
  max,
  error,
}: FormInputProps): ReactElement {
  if (type === 'textarea') {
    return (
      <label>
        {label}
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={error ? { borderColor: 'var(--danger)' } : undefined}
        />
        {error && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{error}</span>}
      </label>
    )
  }

  return (
    <label>
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        style={error ? { borderColor: 'var(--danger)' } : undefined}
      />
      {error && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{error}</span>}
    </label>
  )
}

export default FormInput
