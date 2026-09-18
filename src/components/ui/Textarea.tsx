import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid, rows = 5, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        'bg-ink-soft text-paper placeholder:text-grey-500 w-full resize-y rounded-md border px-4 py-3 text-sm',
        'border-hairline-strong focus:border-accent focus:outline-none',
        invalid && 'border-[#e0745a]',
        className,
      )}
      {...rest}
    />
  )
})
