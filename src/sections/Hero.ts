import { escapeHtml } from '../utils/html'
import { renderButton } from '../components/Button'
import siteConfig from '../data/site-config.json'
import features from '../config/features.json'

export function renderHero(): string {
  if (!features.sections.hero) return ''

  return `
    <section id="hero" class="hero">
      <div class="hero__glow" aria-hidden="true"></div>
      <div class="hero__moon" aria-hidden="true"></div>
      <div class="hero__content container">
        <h1 class="hero__title">${escapeHtml(siteConfig.name)}</h1>
        <p class="hero__tagline">${escapeHtml(siteConfig.tagline)}</p>
        <div class="hero__actions">
          ${renderButton({
            label: 'Ver Menú',
            href: siteConfig.menuUrl,
            variant: 'primary',
            target: '_blank',
            visible: features.buttons.heroMenuCta,
          })}
          ${renderButton({
            label: 'Cómo Llegar',
            href: '#location',
            variant: 'secondary',
            visible: features.buttons.heroDirectionsCta,
          })}
        </div>
      </div>
    </section>
  `.trim()
}
