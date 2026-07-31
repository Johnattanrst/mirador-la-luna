const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

/** Escapes text before interpolating it into an HTML template string. */
export function escapeHtml(value: string | number): string {
  return String(value).replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char])
}

/** Joins class names, skipping falsy values. */
export function classNames(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
