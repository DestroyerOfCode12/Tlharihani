import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'bg-ink-soft text-paper placeholder:text-grey-500 w-full rounded-md border px-4 py-3 text-sm',
        'border-hairline-strong focus:border-accent focus:outline-none',
        invalid && 'border-[#e0745a]',
        className,
      )}
      {...rest}
    />
  )
})
