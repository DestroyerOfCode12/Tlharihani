import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Section } from '../components/ui/Section'
import { ButtonLink } from '../components/ui/ButtonLink'
import { findRentalBySlug } from '../lib/catalog'
import { buildWhatsAppLink } from '../data/site-config'
import { trackEvent } from '../lib/analytics'

interface StoredBooking {
  reference: string
  item: string
  startDate: string
  endDate: string
  deliveryMethod: string
}

export default function BookingConfirmation() {
  const { slug } = useParams<{ slug: string }>()
  const rental = slug ? findRentalBySlug(slug) : undefined
  const [booking, setBooking] = useState<StoredBooking | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('gt-last-booking')
    if (raw) {
      try {
        setBooking(JSON.parse(raw) as StoredBooking)
      } catch {
        setBooking(null)
      }
    }
  }, [])

  if (!rental || !booking) return <Navigate to="/rentals" replace />

  const whatsappHref = buildWhatsAppLink(
    `Hi! I just requested to book the ${rental.name} (ref ${booking.reference}), from ${booking.startDate} to ${booking.endDate}. Looking forward to your confirmation!`,
  )

  return (
    <>
      <Seo
        title="Booking Requested"
        description="Your rental booking request has been received."
        path={`/rentals/${rental.slug}/confirmation`}
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
        <h1 className="font-display mt-6 text-4xl">Booking request received</h1>
        <p className="text-grey-300 mt-4 max-w-md text-sm">
          Thanks, we&apos;ve received your request for the{' '}
          <strong className="text-paper">{rental.name}</strong>. We&apos;ll confirm availability and
          next steps within one business day. Your reference number is:
        </p>
        <p className="label-caps border-hairline-strong text-accent mt-4 rounded-full border px-5 py-2">
          {booking.reference}
        </p>
        <p className="text-grey-400 mt-6 max-w-md text-xs">
          We&apos;ll request a copy of your ID, 3 months bank statement and proof of residence
          securely by email or WhatsApp once your booking is confirmed.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'booking-confirmation' })}
            className="label-caps text-ink inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-[0.68rem] hover:brightness-95"
          >
            Continue on WhatsApp
          </a>
          <ButtonLink to="/rentals" variant="secondary" size="lg">
            Browse more rentals
          </ButtonLink>
        </div>
      </Section>
    </>
  )
}
