const currencyFormatter = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
  maximumFractionDigits: 0,
})

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function generateReference(prefix: string): string {
  const stamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `${prefix}-${stamp}-${random}`
}
