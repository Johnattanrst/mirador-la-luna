export interface ThemeToggleProps {
  ariaLabel?: string
}

const STORAGE_KEY = 'mirador-theme'
type Theme = 'light' | 'dark'

export function renderThemeToggle(props: ThemeToggleProps = {}): string {
  const label = props.ariaLabel ?? 'Cambiar entre modo claro y oscuro'
  return `<button class="theme-toggle" type="button" aria-label="${label}" data-theme-toggle>
    <span class="theme-toggle__icon" aria-hidden="true"></span>
  </button>`
}

function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : null
}

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(STORAGE_KEY, theme)
}

/** Attaches the click handler and restores any previously saved preference. */
export function mountThemeToggle(element: HTMLElement): void {
  const stored = getStoredTheme()
  if (stored) {
    applyTheme(stored)
  }

  element.addEventListener('click', () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const current = getStoredTheme() ?? (prefersDark ? 'dark' : 'light')
    const next: Theme = current === 'dark' ? 'light' : 'dark'
    applyTheme(next)
  })
}
