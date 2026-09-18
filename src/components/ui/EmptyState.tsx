import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
  icon?: ReactNode
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="border-hairline bg-surface flex flex-col items-center gap-4 rounded-lg border px-8 py-16 text-center">
      {icon ?? (
        <span
          aria-hidden="true"
          className="border-hairline-strong flex h-14 w-14 items-center justify-center rounded-full border"
        >
          <span className="bg-accent h-2 w-2 rounded-full" />
        </span>
      )}
      <h3 className="font-display text-2xl">{title}</h3>
      {description ? <p className="text-grey-300 max-w-sm text-sm">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  )
}
