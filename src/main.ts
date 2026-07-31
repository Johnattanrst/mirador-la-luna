import './styles/main.css'
import { renderNavbar, mountNavbar } from './components/Navbar'
import { renderFooter } from './components/Footer'
import { renderHero } from './sections/Hero'
import { renderAbout } from './sections/About'
import { renderGallery, mountGallery } from './sections/Gallery'
import { renderMenuCta } from './sections/MenuCta'
import { renderEvents } from './sections/Events'
import { renderPricing } from './sections/Pricing'
import { renderContact } from './sections/Contact'
import { renderLocation } from './sections/Location'
import { renderFaq } from './sections/Faq'
import { getNavItems } from './config/navigation'
import { initScrollReveal } from './utils/scrollReveal'
import { initBlurUpImages, initImageFallbacks } from './utils/imageLoading'
import siteConfig from './data/site-config.json'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Root element #app not found')
}

const navItems = getNavItems()

app.innerHTML = `
  <a href="#main-content" class="skip-link">Saltar al contenido principal</a>

  ${renderNavbar({ brandName: siteConfig.name, items: navItems })}

  <main id="main-content">
    ${renderHero()}
    ${renderAbout()}
    ${renderGallery()}
    ${renderMenuCta()}
    ${renderEvents()}
    ${renderPricing()}
    ${renderContact()}
    ${renderLocation()}
    ${renderFaq()}
  </main>

  ${renderFooter({
    brandName: siteConfig.name,
    tagline: siteConfig.tagline,
    items: navItems,
    social: siteConfig.contact,
  })}
`

const navbarEl = app.querySelector<HTMLElement>('[data-navbar]')
if (navbarEl) {
  mountNavbar(navbarEl)
}

mountGallery(app)
initScrollReveal()
initBlurUpImages(app)
initImageFallbacks(app)
