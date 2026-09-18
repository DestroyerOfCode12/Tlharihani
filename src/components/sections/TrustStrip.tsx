import { siteConfig } from '../../data/site-config'

const items = [
  { label: siteConfig.tagline, detail: 'Trusted since 2010' },
  { label: 'Registered business', detail: 'Fully compliant, verifiable' },
  { label: 'Secure payments', detail: 'Yoco, EFT, or cash' },
  { label: 'Appointment-only hub', detail: '77 Stella Street, Sandton' },
]

// The one light section on the site. Everything else sits on black, so this
// band (right before the closing CTA) is the visual breather that keeps the
// long scroll from reading as one undifferentiated dark wall.
export function TrustStrip() {
  return (
    <section aria-label="Why customers trust us" className="bg-paper text-ink">
      <div className="divide-paper-hairline mx-auto grid max-w-7xl divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 px-5 py-10 text-center sm:px-8 sm:text-left"
          >
            <span className="label-caps text-accent-deep">{item.label}</span>
            <span className="text-ink/60 text-sm">{item.detail}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
