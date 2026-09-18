import type { ReactNode } from 'react'

export function ScrollRow({ children }: { children: ReactNode }) {
  return (
    <div className="-mx-5 flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden [&>*]:snap-start">
      {children}
    </div>
  )
}
