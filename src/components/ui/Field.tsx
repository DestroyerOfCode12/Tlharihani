import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface FieldProps {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
  className?: string
}

export function Field({ label, htmlFor, error, hint, required, children, className }: FieldProps) {
  const errorId = `${htmlFor}-error`
  const hintId = `${htmlFor}-hint`

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={htmlFor} className="label-caps text-grey-300">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      {hint ? (
        <span id={hintId} className="text-grey-400 text-xs">
          {hint}
        </span>
      ) : null}
      {children}
      {error ? (
        <p id={errorId} role="alert" className="text-xs text-[#e0745a]">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function describedBy(id: string, hasError: boolean, hasHint: boolean): string | undefined {
  const parts: string[] = []
  if (hasHint) parts.push(`${id}-hint`)
  if (hasError) parts.push(`${id}-error`)
  return parts.length ? parts.join(' ') : undefined
}
