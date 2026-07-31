import { escapeHtml, classNames } from '../utils/html'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

export interface ButtonProps {
  label: string
  href?: string
  variant?: ButtonVariant
  visible?: boolean
  target?: '_blank' | '_self'
  ariaLabel?: string
}

export function renderButton(props: ButtonProps): string {
  if (props.visible === false) return ''

  const variant = props.variant ?? 'primary'
  const classes = classNames('btn', `btn--${variant}`)
  const rel = props.target === '_blank' ? ' rel="noopener noreferrer"' : ''
  const target = props.target ? ` target="${props.target}"` : ''
  const ariaLabel = props.ariaLabel ? ` aria-label="${escapeHtml(props.ariaLabel)}"` : ''

  if (props.href) {
    return `<a class="${classes}" href="${escapeHtml(props.href)}"${target}${rel}${ariaLabel}>${escapeHtml(props.label)}</a>`
  }

  return `<button class="${classes}" type="button"${ariaLabel}>${escapeHtml(props.label)}</button>`
}
