const REVEAL_SELECTOR = '.reveal-on-scroll'

/** Fades sections up as they enter the viewport; skipped under prefers-reduced-motion. */
export function initScrollReveal(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const elements = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
  if (elements.length === 0) return

  document.documentElement.classList.add('js-reveal')

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        obs.unobserve(entry.target)
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
  )

  elements.forEach((el) => observer.observe(el))
}
