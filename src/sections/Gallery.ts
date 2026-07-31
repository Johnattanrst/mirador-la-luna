import { escapeHtml } from '../utils/html'
import { renderSection } from '../components/Section'
import features from '../config/features.json'
import galleryItems from '../data/gallery.json'

interface GalleryItem {
  id: string
  category: string
  label: string
  /** Optional real photo path, e.g. /images/gallery/restaurant-1.jpg. Falls back to the label tile if missing. */
  image?: string
}

function renderGalleryItem(item: GalleryItem): string {
  const image = item.image
    ? `<img class="gallery__item-image" data-blur-img data-fallback-img src="${escapeHtml(item.image)}" alt="" loading="lazy" decoding="async" />
       <span class="gallery__item-scrim" aria-hidden="true"></span>`
    : ''

  return `
    <button
      type="button"
      class="gallery__item"
      data-gallery-item
      data-category="${escapeHtml(item.category)}"
      data-label="${escapeHtml(item.label)}"
      ${item.image ? `data-image="${escapeHtml(item.image)}"` : ''}
      aria-label="Ampliar: ${escapeHtml(item.label)}"
    >
      ${image}
      <span class="gallery__item-label">${escapeHtml(item.label)}</span>
    </button>
  `.trim()
}

export function renderGallery(): string {
  const bodyHtml = `
    <div class="gallery__grid" data-gallery-grid>
      ${(galleryItems as GalleryItem[]).map(renderGalleryItem).join('')}
    </div>
    <div class="lightbox" data-lightbox hidden>
      <div class="lightbox__backdrop" data-lightbox-close></div>
      <div class="lightbox__dialog" role="dialog" aria-modal="true" aria-label="Imagen ampliada">
        <button type="button" class="lightbox__close" data-lightbox-close aria-label="Cerrar imagen ampliada">✕</button>
        <div class="lightbox__image" data-lightbox-image></div>
      </div>
    </div>
  `

  return renderSection({
    id: 'gallery',
    title: 'Galería',
    bodyHtml,
    visible: features.sections.gallery,
  })
}

export function mountGallery(element: HTMLElement): void {
  const grid = element.querySelector<HTMLElement>('[data-gallery-grid]')
  const lightbox = element.querySelector<HTMLElement>('[data-lightbox]')
  const lightboxImage = element.querySelector<HTMLElement>('[data-lightbox-image]')
  if (!grid || !lightbox || !lightboxImage) return

  element.querySelectorAll<HTMLButtonElement>('[data-gallery-filter]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const category = chip.dataset.galleryFilter ?? 'all'

      element.querySelectorAll<HTMLButtonElement>('[data-gallery-filter]').forEach((c) => {
        c.setAttribute('aria-pressed', String(c === chip))
      })

      grid.querySelectorAll<HTMLElement>('[data-gallery-item]').forEach((item) => {
        const matches = category === 'all' || item.dataset.category === category
        item.hidden = !matches
      })
    })
  })

  const openLightbox = (label: string, imageSrc?: string) => {
    lightboxImage.replaceChildren()
    if (imageSrc) {
      const img = document.createElement('img')
      img.src = imageSrc
      img.alt = label
      img.className = 'lightbox__image-photo'
      lightboxImage.appendChild(img)
    } else {
      lightboxImage.textContent = label
    }
    lightbox.hidden = false
  }

  const closeLightbox = () => {
    lightbox.hidden = true
  }

  grid.querySelectorAll<HTMLButtonElement>('[data-gallery-item]').forEach((item) => {
    item.addEventListener('click', () => openLightbox(item.dataset.label ?? '', item.dataset.image))
  })

  lightbox.querySelectorAll<HTMLElement>('[data-lightbox-close]').forEach((el) => {
    el.addEventListener('click', closeLightbox)
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox()
  })
}
