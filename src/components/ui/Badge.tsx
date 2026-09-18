import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger'

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'border-hairline-strong text-paper',
  accent: 'border-accent/60 text-accent',
  success: 'border-accent/60 text-accent',
  warning: 'border-grey-300 text-grey-200',
  danger: 'border-[#e0745a]/60 text-[#e0745a]',
}

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'label-caps inline-flex items-center gap-1.5 rounded-full border px-3 py-1',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
