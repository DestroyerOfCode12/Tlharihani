import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Section } from '../components/ui/Section'
import { ButtonLink } from '../components/ui/ButtonLink'
import { buildWhatsAppLink } from '../data/site-config'
import { formatCurrency } from '../lib/format'
import { trackEvent } from '../lib/analytics'
import type { EnquiryItem } from '../schemas/forms'

interface StoredOrder {
  reference: string
  items: EnquiryItem[]
  total: number
}

export default function EnquiryConfirmation() {
  const [order, setOrder] = useState<StoredOrder | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('gt-last-order')
    if (raw) {
      try {
        setOrder(JSON.parse(raw) as StoredOrder)
      } catch {
        setOrder(null)
      }
    }
  }, [])

  if (!order) return <Navigate to="/shop" replace />

  const itemSummary = order.items.map((item) => `${item.quantity}x ${item.name}`).join(', ')
  const whatsappHref = buildWhatsAppLink(
    `Hi! I just submitted an enquiry (ref ${order.reference}) for: ${itemSummary}. Total estimate: ${formatCurrency(order.total)}. Looking forward to hearing from you!`,
  )

  return (
    <>
      <Seo
        title="Enquiry Sent"
        description="Your enquiry has been received."
        path="/shop/enquiry/confirmation"
        noindex
      />

      <Section
        tone="ink"
        className="flex min-h-[70vh] flex-col items-center justify-center pt-14 text-center sm:pt-20"
      >
        <span
          className="border-accent text-accent flex h-16 w-16 items-center justify-center rounded-full border"
          aria-hidden="true"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12l5 5L20 6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h1 className="font-display mt-6 text-4xl">Enquiry sent</h1>
        <p className="text-grey-300 mt-4 max-w-md text-sm">
          Thank you — we&apos;ve received your enquiry and will confirm stock, price and next steps
          shortly. Your reference number is:
        </p>
        <p className="label-caps border-hairline-strong text-accent mt-4 rounded-full border px-5 py-2">
          {order.reference}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'enquiry-confirmation' })}
            className="label-caps text-ink inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-[0.68rem] hover:brightness-95"
          >
            Continue on WhatsApp
          </a>
          <ButtonLink to="/shop" variant="secondary" size="lg">
            Continue shopping
          </ButtonLink>
        </div>
      </Section>
    </>
  )
}
