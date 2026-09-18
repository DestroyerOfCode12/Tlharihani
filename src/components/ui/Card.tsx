import type { ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface CardProps {
  children: ReactNode
  className?: string
  as?: ElementType
}

export function Card({ children, className, as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={cn(
        'group border-hairline bg-surface hover:border-hairline-strong relative overflow-hidden rounded-lg border transition-colors duration-300',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
