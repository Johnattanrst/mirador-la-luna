import { escapeHtml, classNames } from '../utils/html'

export interface SectionProps {
  id: string
  bodyHtml: string
  title?: string
  visible?: boolean
  className?: string
}

/**
 * Wraps section content with its anchor id and a scroll-reveal hook.
 * Returns an empty string when `visible` is false, so toggling a flag in
 * features.json fully removes the section (and its nav entry) with no
 * leftover markup.
 */
export function renderSection(props: SectionProps): string {
  if (props.visible === false) return ''

  const classes = classNames('section', 'reveal-on-scroll', props.className)
  const heading = props.title ? `<h2 class="section__title">${escapeHtml(props.title)}</h2>` : ''

  return `
    <section id="${escapeHtml(props.id)}" class="${classes}">
      <div class="section__inner">
        ${heading}
        ${props.bodyHtml}
      </div>
    </section>
  `.trim()
}
