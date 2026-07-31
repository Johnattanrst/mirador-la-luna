/** Fades in [data-blur-img] images once loaded; already-cached images resolve instantly via .complete. */
export function initBlurUpImages(root: ParentNode = document): void {
  root.querySelectorAll<HTMLImageElement>('[data-blur-img]').forEach((img) => {
    if (img.complete) {
      img.classList.add('is-loaded')
      return
    }
    img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true })
  })
}

/** Removes [data-fallback-img] images that fail to load, revealing the placeholder markup underneath. */
export function initImageFallbacks(root: ParentNode = document): void {
  root.querySelectorAll<HTMLImageElement>('[data-fallback-img]').forEach((img) => {
    img.addEventListener('error', () => img.remove(), { once: true })
  })
}
