import { siteConfig } from '../../data/site-config'

const items = [
  { label: siteConfig.tagline, detail: 'Trusted since 2010' },
  { label: 'Registered business', detail: 'Fully compliant, verifiable' },
  { label: 'Secure payments', detail: 'Yoco, EFT, or cash' },
  { label: 'Appointment-only hub', detail: '77 Stella Street, Sandton' },
]

export function TrustStrip() {
  return (
    <section aria-label="Why customers trust us" className="border-hairline bg-surface border-y">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1 text-center sm:text-left">
            <span className="label-caps text-accent">{item.label}</span>
            <span className="text-grey-300 text-sm">{item.detail}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
