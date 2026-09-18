import type { ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Container } from './Container'

interface SectionProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  as?: ElementType
  tone?: 'ink' | 'surface' | 'paper'
  id?: string
  narrow?: boolean
  'aria-labelledby'?: string
}

const toneClasses: Record<NonNullable<SectionProps['tone']>, string> = {
  ink: 'bg-ink text-paper',
  surface: 'bg-surface text-paper',
  paper: 'bg-paper text-ink',
}

export function Section({
  children,
  className,
  containerClassName,
  as: Tag = 'section',
  tone = 'ink',
  id,
  narrow = false,
  'aria-labelledby': ariaLabelledBy,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn('py-16 sm:py-24', toneClasses[tone], className)}
    >
      <Container narrow={narrow} className={containerClassName}>
        {children}
      </Container>
    </Tag>
  )
}
