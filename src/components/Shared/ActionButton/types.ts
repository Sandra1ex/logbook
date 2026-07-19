export type ActionButtonColor = 'red' | 'accent' | 'outline' | 'blue'

export interface ActionButtonProps {
  text: string
  onClick?: () => void
  color?: ActionButtonColor
  type?: 'button' | 'submit'
}
