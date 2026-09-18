import { useMemo, useState } from 'react'
import { Seo } from '../components/Seo'
import { Section } from '../components/ui/Section'
import { EmptyState } from '../components/ui/EmptyState'
import { RentalCard } from '../components/sections/RentalCard'
import { rentals } from '../data/rentals'
import type { RentalCategory } from '../schemas/catalog'

const categories: { value: RentalCategory; label: string }[] = [
  { value: 'device', label: 'Devices' },
  { value: 'car', label: 'Cars' },
]

export default function Rentals() {
  const [active, setActive] = useState<RentalCategory>('device')
  const filtered = useMemo(() => rentals.filter((rental) => rental.category === active), [active])

  return (
    <>
      <Seo
        title="Rentals: Devices & Cars"
        description="Rent devices and cars on daily, weekly, monthly or long term terms. Clear pricing, deposits and live availability, delivered wherever you are."
        path="/rentals"
      />

      <Section tone="ink" className="pt-14 pb-6 sm:pt-20">
        <p className="label-caps text-accent">Rentals</p>
        <h1 className="font-display mt-3 text-4xl sm:text-5xl">Devices and cars, on your terms</h1>
        <p className="text-grey-300 mt-4 max-w-xl text-sm">
          Daily, weekly, monthly or long term. Every listing shows the deposit and live availability
          before you book. We deliver and collect wherever suits you.
        </p>

        <div
          className="border-hairline mt-8 flex gap-2 border-b"
          role="tablist"
          aria-label="Rental category"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              role="tab"
              aria-selected={active === category.value}
              onClick={() => setActive(category.value)}
              className={`label-caps -mb-px border-b-2 px-4 py-3 transition-colors ${
                active === category.value
                  ? 'border-accent text-paper'
                  : 'text-grey-400 hover:text-paper border-transparent'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </Section>

      <Section tone="ink" className="pt-0">
        {filtered.length === 0 ? (
          <EmptyState
            title="Nothing listed in this category yet"
            description="New rentals get added regularly. Message us on WhatsApp and we'll let you know as soon as something suitable comes in."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((rental) => (
              <RentalCard key={rental.id} rental={rental} />
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
