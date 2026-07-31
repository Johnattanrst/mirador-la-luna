import { escapeHtml } from '../utils/html'
import { renderThemeToggle, mountThemeToggle } from './ThemeToggle'
import type { NavItem } from '../config/navigation'

export interface NavbarProps {
  brandName: string
  items: NavItem[]
}

function renderNavLink(item: NavItem): string {
  const rel = item.external ? ' target="_blank" rel="noopener noreferrer"' : ''
  const arrow = item.external ? ' ↗' : ''
  return `<li><a class="navbar__link" href="${escapeHtml(item.href)}"${rel}>${escapeHtml(item.label)}${arrow}</a></li>`
}

export function renderNavbar(props: NavbarProps): string {
  return `
    <header class="navbar" data-navbar>
      <div class="navbar__inner container">
        <a class="navbar__brand" href="#hero">${escapeHtml(props.brandName)}</a>
        <nav class="navbar__nav" id="primary-navigation" aria-label="Navegación principal">
          <ul class="navbar__links">
            ${props.items.map(renderNavLink).join('')}
          </ul>
        </nav>
        <div class="navbar__actions">
          ${renderThemeToggle()}
          <button
            class="navbar__toggle"
            type="button"
            aria-expanded="false"
            aria-controls="primary-navigation"
            aria-label="Abrir menú de navegación"
            data-navbar-toggle
          >
            <span class="navbar__toggle-bar"></span>
            <span class="navbar__toggle-bar"></span>
            <span class="navbar__toggle-bar"></span>
          </button>
        </div>
      </div>
    </header>
  `.trim()
}

/** Wires the mobile hamburger toggle, theme toggle, and close-on-link/Escape behavior. */
export function mountNavbar(element: HTMLElement): void {
  const themeToggleEl = element.querySelector<HTMLButtonElement>('[data-theme-toggle]')
  if (themeToggleEl) {
    mountThemeToggle(themeToggleEl)
  }

  const toggleButton = element.querySelector<HTMLButtonElement>('[data-navbar-toggle]')
  const nav = element.querySelector<HTMLElement>('#primary-navigation')
  if (!toggleButton || !nav) return

  const closeMenu = () => {
    element.classList.remove('is-open')
    toggleButton.setAttribute('aria-expanded', 'false')
  }

  const toggleMenu = () => {
    const isOpen = element.classList.toggle('is-open')
    toggleButton.setAttribute('aria-expanded', String(isOpen))
  }

  toggleButton.addEventListener('click', toggleMenu)
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu))
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu()
  })
}
