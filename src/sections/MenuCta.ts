import { renderSection } from '../components/Section'
import { renderButton } from '../components/Button'
import siteConfig from '../data/site-config.json'
import features from '../config/features.json'

export function renderMenuCta(): string {
  const bodyHtml = `
    <div class="menu-cta">
      <p class="menu-cta__text">Descubre nuestra propuesta gastronómica completa, con opciones para cada momento del día.</p>
      ${renderButton({
        label: 'Ver Menú Completo',
        href: siteConfig.menuUrl,
        variant: 'primary',
        target: '_blank',
      })}
    </div>
  `

  return renderSection({
    id: 'menu',
    bodyHtml,
    className: 'menu-cta-section',
    visible: features.sections.menu,
  })
}
