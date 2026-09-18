/** Escapes text before it's interpolated into an HTML email body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Strips characters that could be used for header/CRLF injection in plain-text fields. */
export function sanitizeLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim()
}
