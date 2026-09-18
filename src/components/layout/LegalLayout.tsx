import type { ReactNode } from 'react'
import { Section } from '../ui/Section'

interface LegalLayoutProps {
  title: string
  updated: string
  children: ReactNode
}

export function LegalLayout({ title, updated, children }: LegalLayoutProps) {
  return (
    <Section tone="ink" narrow className="pt-14 sm:pt-20">
      <p className="label-caps text-accent">Legal</p>
      <h1 className="font-display mt-3 text-4xl">{title}</h1>
      <p className="text-grey-500 mt-2 text-xs">Last updated: {updated}</p>
      <div className="prose-legal text-grey-200 [&_h2]:font-display [&_h2]:text-paper [&_strong]:text-paper mt-10 flex flex-col gap-6 text-sm leading-relaxed [&_h2]:mt-8 [&_h2]:text-2xl [&_li]:ml-5 [&_li]:list-disc">
        {children}
      </div>
    </Section>
  )
}
