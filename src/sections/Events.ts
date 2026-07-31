import { renderSection } from '../components/Section'
import { renderCard } from '../components/Card'
import { renderButton } from '../components/Button'
import events from '../data/events.json'
import features from '../config/features.json'

function formatEventDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function renderEvents(): string {
  const bodyHtml = `
    <div class="card-grid">
      ${events
        .map((event) =>
          renderCard({
            title: event.title,
            description: event.description,
            imagePlaceholder: `Foto: ${event.title}`,
            tag: formatEventDate(event.date),
            meta: event.price,
            featured: false,
            bodyHtml: renderButton({
              label: event.ctaLabel,
              href: event.ctaUrl,
              variant: 'secondary',
              target: '_blank',
              visible: features.buttons.reserveWhatsapp,
            }),
          }),
        )
        .join('')}
    </div>
  `

  return renderSection({
    id: 'events',
    title: 'Eventos',
    bodyHtml,
    visible: features.sections.events,
  })
}
