import { cn } from '../../lib/cn'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn('bg-surface-raised animate-pulse rounded-md', className)}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="border-hairline bg-surface overflow-hidden rounded-lg border">
      <Skeleton className="aspect-[3/4] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}
