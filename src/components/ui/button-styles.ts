import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'whatsapp'
export type ButtonSize = 'md' | 'lg' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2 label-caps rounded-full transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-paper text-ink hover:bg-paper-dim',
  secondary: 'bg-transparent text-paper border border-hairline-strong hover:border-paper',
  ghost: 'bg-transparent text-paper hover:text-accent',
  whatsapp: 'bg-[#25D366] text-ink hover:brightness-95',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[0.62rem]',
  md: 'px-6 py-3.5 text-[0.68rem]',
  lg: 'px-8 py-4.5 text-[0.72rem]',
}

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className)
}
