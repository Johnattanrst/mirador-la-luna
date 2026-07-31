import features from './features.json'
import siteConfig from '../data/site-config.json'

export interface NavItem {
  id: string
  label: string
  href: string
  external: boolean
}

/** Spanish nav labels keyed by the English section id used across features.json and anchor ids. */
const SECTION_LABELS: Record<string, string> = {
  hero: 'Inicio',
  about: 'Nosotros',
  gallery: 'Galería',
  menu: 'Menú',
  events: 'Eventos',
  pricing: 'Precios',
  contact: 'Contacto',
  location: 'Ubicación',
  faq: 'FAQ',
}

/** Sections that link out to an external URL instead of scrolling to an in-page anchor. */
const EXTERNAL_HREF: Partial<Record<string, string>> = {
  menu: siteConfig.menuUrl,
}

/**
 * Builds the nav/footer link list from features.json — a section with its flag
 * set to false is simply absent here, so toggling one flag hides it everywhere.
 */
export function getNavItems(): NavItem[] {
  return Object.entries(features.sections)
    .filter(([, enabled]) => enabled)
    .map(([id]) => {
      const external = EXTERNAL_HREF[id]
      return {
        id,
        label: SECTION_LABELS[id] ?? id,
        href: external ?? `#${id}`,
        external: Boolean(external),
      }
    })
}
