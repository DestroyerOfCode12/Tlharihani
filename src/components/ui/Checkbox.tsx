import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode
  invalid?: boolean
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, invalid, error, id, className, ...rest },
  ref,
) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-grey-200 flex cursor-pointer items-start gap-3 text-sm">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={invalid || undefined}
          className={cn(
            'bg-ink-soft mt-0.5 h-4 w-4 shrink-0 rounded-sm border accent-[#C9B99A]',
            'border-hairline-strong focus-visible:outline-accent focus-visible:outline focus-visible:outline-2',
            invalid && 'border-[#e0745a]',
          )}
          {...rest}
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p role="alert" className="pl-7 text-xs text-[#e0745a]">
          {error}
        </p>
      ) : null}
    </div>
  )
})
