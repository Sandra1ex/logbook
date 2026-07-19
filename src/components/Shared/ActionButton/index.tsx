import { type ReactElement } from 'react'
import type { ActionButtonProps } from './types'

function ActionButton({
  text,
  onClick,
  color = 'accent',
  type = 'button',
}: ActionButtonProps): ReactElement {
  const baseClasses = 'btn-edit'
  const variantClasses =
    color === 'red'
      ? 'btn-delete'
      : color === 'blue'
        ? 'btn-edit btn-blue'
        : color === 'outline'
          ? 'btn-secondary'
          : 'btn-primary'

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default ActionButton
