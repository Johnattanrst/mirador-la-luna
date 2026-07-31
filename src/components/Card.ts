import { escapeHtml, classNames } from '../utils/html'

export interface CardImageSources {
  avif?: string
  webp?: string
}

export interface CardProps {
  title: string
  description?: string
  imageUrl?: string
  imageAlt?: string
  /** Optional AVIF/WebP variants of imageUrl, tried in that order before the imageUrl fallback. */
  imageSources?: CardImageSources
  /** Shown as a styled placeholder block when no real imageUrl is available yet. */
  imagePlaceholder?: string
  tag?: string
  meta?: string
  bodyHtml?: string
  featured?: boolean
  /** Heading level for the card title, so it nests correctly under its section/category heading. */
  headingLevel?: 2 | 3 | 4 | 5 | 6
}

function renderImageTag(props: CardProps): string {
  const img = `<img class="card__image" data-blur-img src="${escapeHtml(props.imageUrl ?? '')}" alt="${escapeHtml(props.imageAlt ?? '')}" loading="lazy" decoding="async" />`
  if (!props.imageSources) return img

  const avif = props.imageSources.avif
    ? `<source srcset="${escapeHtml(props.imageSources.avif)}" type="image/avif" />`
    : ''
  const webp = props.imageSources.webp
    ? `<source srcset="${escapeHtml(props.imageSources.webp)}" type="image/webp" />`
    : ''

  return `<picture>${avif}${webp}${img}</picture>`
}

export function renderCard(props: CardProps): string {
  const classes = classNames('card', props.featured && 'card--featured')

  const image = props.imageUrl
    ? renderImageTag(props)
    : props.imagePlaceholder
      ? `<div class="card__image card__image--placeholder" role="img" aria-label="${escapeHtml(props.imagePlaceholder)}">${escapeHtml(props.imagePlaceholder)}</div>`
      : ''

  const tag = props.tag ? `<span class="card__tag">${escapeHtml(props.tag)}</span>` : ''
  const meta = props.meta ? `<span class="card__meta">${escapeHtml(props.meta)}</span>` : ''
  const description = props.description
    ? `<p class="card__description">${escapeHtml(props.description)}</p>`
    : ''
  const headingTag = `h${props.headingLevel ?? 3}`

  return `
    <article class="${classes}">
      ${image}
      <div class="card__body">
        ${tag}
        <${headingTag} class="card__title">${escapeHtml(props.title)}</${headingTag}>
        ${description}
        ${props.bodyHtml ?? ''}
        ${meta}
      </div>
    </article>
  `.trim()
}
