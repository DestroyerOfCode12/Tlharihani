export function PageLoader() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <span className="border-hairline-strong h-8 w-8 animate-pulse rounded-full border" />
    </div>
  )
}
