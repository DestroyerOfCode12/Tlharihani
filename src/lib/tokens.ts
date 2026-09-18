/**
 * JS-side mirror of the CSS design tokens in src/index.css, for use in
 * Framer Motion variants and anywhere a raw value (not a Tailwind class) is needed.
 * Keep these two files in sync by hand — Tailwind v4 tokens live in CSS.
 */
export const easeLuxury = [0.22, 1, 0.36, 1] as const

export const motion = {
  duration: {
    fast: 0.18,
    base: 0.42,
    slow: 0.9,
  },
  ease: easeLuxury,
}

export const colors = {
  ink: '#0A0A0A',
  paper: '#F5F5F0',
  accent: '#C9B99A',
}
