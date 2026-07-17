interface ActionButtonProps {
  text: string
  onClick: () => void
  color?: 'red' | 'accent' | 'outline' | 'blue'
}

function ActionButton({ text, onClick, color = 'accent' }: ActionButtonProps) {
  const baseClasses = 'btn-edit'
  const variantClasses = 
    color === 'red' ? 'btn-delete' :
    color === 'blue' ? 'btn-edit btn-blue' :
    color === 'outline' ? 'btn-secondary' : 'btn-primary'

  return (
    <button type="button" className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
      {text}
    </button>
  )
}

export default ActionButton
