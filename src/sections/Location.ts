import { escapeHtml } from '../utils/html'
import { renderSection } from '../components/Section'
import { renderButton } from '../components/Button'
import siteConfig from '../data/site-config.json'
import features from '../config/features.json'

export function renderLocation(): string {
  const { location } = siteConfig

  const bodyHtml = `
    <div class="location__grid">
      <div class="location__info">
        <p class="location__address">${escapeHtml(location.address)}</p>
        <p class="location__parking">${escapeHtml(location.parkingInfo)}</p>
        ${renderButton({ label: 'Cómo Llegar', href: location.directionsUrl, variant: 'primary', target: '_blank' })}
      </div>
      <iframe
        class="location__map"
        src="${escapeHtml(location.mapsEmbedUrl)}"
        title="Mapa de ubicación de Mirador La Luna"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  `

  return renderSection({
    id: 'location',
    title: 'Ubicación',
    bodyHtml,
    visible: features.sections.location,
  })
}
