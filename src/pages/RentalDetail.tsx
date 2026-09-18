import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Seo } from '../components/Seo'
import { Section } from '../components/ui/Section'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Field } from '../components/ui/Field'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Textarea } from '../components/ui/Textarea'
import { Checkbox } from '../components/ui/Checkbox'
import { AvailabilityBadge } from '../components/sections/RentalCard'
import { findRentalBySlug } from '../lib/catalog'
import { formatCurrency } from '../lib/format'
import { bookingFormSchema, type BookingFormValues } from '../schemas/forms'
import { trackEvent } from '../lib/analytics'
import { buildWhatsAppLink } from '../data/site-config'
import { submitBooking } from '../lib/api'

const periodLabels: Record<string, string> = {
  daily: 'Day',
  weekly: 'Week',
  monthly: 'Month',
  longTerm: 'Month (long term)',
}

export default function RentalDetail() {
  const { slug } = useParams<{ slug: string }>()
  const rental = slug ? findRentalBySlug(slug) : undefined
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (rental)
      trackEvent('product_viewed', { slug: rental.slug, type: `rental-${rental.category}` })
  }, [rental])

  const availablePeriods = rental
    ? (Object.entries(rental.pricing).filter(([, value]) => value !== undefined) as [
        keyof typeof rental.pricing,
        number,
      ][])
    : []

  const periodKeyToFormValue: Record<string, BookingFormValues['period']> = {
    daily: 'daily',
    weekly: 'weekly',
    monthly: 'monthly',
    longTerm: 'long-term',
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      itemName: rental?.name ?? '',
      itemSlug: rental?.slug ?? '',
      itemCategory: rental?.category ?? 'device',
      period: availablePeriods.length ? periodKeyToFormValue[availablePeriods[0][0]] : 'daily',
      deliveryMethod: 'delivery',
      website: '',
    },
  })

  const deliveryMethod = watch('deliveryMethod')

  if (!rental) return <Navigate to="/rentals" replace />

  const isBookable = rental.availability.status !== 'booked'

  async function onSubmit(values: BookingFormValues) {
    setSubmitError(null)
    setSubmitting(true)
    try {
      const { reference } = await submitBooking(values)
      trackEvent('booking_requested', { slug: rental!.slug, category: rental!.category })

      sessionStorage.setItem(
        'gt-last-booking',
        JSON.stringify({ reference, item: rental!.name, ...values }),
      )
      navigate(`/rentals/${rental!.slug}/confirmation`)
    } catch {
      setSubmitError(
        'We could not send your request automatically. Please continue on WhatsApp below and we will confirm your booking right away.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const whatsappHref = buildWhatsAppLink(
    `Hi! I'd like to book the ${rental.name} (${rental.category}). Could you confirm availability and next steps?`,
  )

  return (
    <>
      <Seo
        title={`Rent ${rental.name}`}
        description={rental.summary}
        path={`/rentals/${rental.slug}`}
        image={rental.images[0]}
      />

      <Section tone="ink" className="pt-14 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="border-hairline bg-ink-soft aspect-[4/3] overflow-hidden rounded-lg border">
              <img
                src={rental.images[0]}
                alt={rental.name}
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {rental.isSpecial ? <Badge tone="accent">Special</Badge> : null}
              <AvailabilityBadge availability={rental.availability} />
            </div>

            <div>
              <p className="label-caps text-grey-400">{rental.category}</p>
              <h1 className="font-display mt-2 text-4xl">{rental.name}</h1>
              <p className="text-grey-200 mt-3 text-sm leading-relaxed">{rental.description}</p>
            </div>

            <div>
              <h2 className="label-caps text-grey-400 mb-3">Pricing</h2>
              <ul className="divide-hairline border-hairline divide-y overflow-hidden rounded-lg border">
                {availablePeriods.map(([period, amount]) => (
                  <li key={period} className="flex items-center justify-between px-4 py-3 text-sm">
                    <span className="text-grey-300">Per {periodLabels[period]}</span>
                    <span className="text-paper font-semibold">{formatCurrency(amount)}</span>
                  </li>
                ))}
                <li className="bg-surface flex items-center justify-between px-4 py-3 text-sm">
                  <span className="text-grey-300">Refundable deposit</span>
                  <span className="text-accent font-semibold">
                    {formatCurrency(rental.deposit)}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="label-caps text-grey-400 mb-3">Features</h2>
              <ul className="text-grey-200 grid gap-2 text-sm">
                {rental.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span
                      className="bg-accent mt-1.5 h-1 w-1 shrink-0 rounded-full"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <dl className="border-hairline grid grid-cols-2 gap-x-6 gap-y-3 border-t pt-6 text-sm">
              {Object.entries(rental.specifications).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-grey-400">{key}</dt>
                  <dd className="text-paper">{value}</dd>
                </div>
              ))}
            </dl>

            <p className="text-grey-400 text-xs">
              We&apos;ll request a copy of your ID and proof of residence securely after your
              booking is confirmed — never through this form.
            </p>
          </div>

          <div className="border-hairline bg-surface rounded-lg border p-6 sm:p-8">
            <h2 className="font-display text-2xl">Request to book</h2>
            {!isBookable ? (
              <p className="text-grey-300 mt-3 text-sm">
                This item is currently booked
                {rental.availability.availableFrom
                  ? ` until ${rental.availability.availableFrom}`
                  : ''}
                . Submit a request and we&apos;ll notify you the moment it&apos;s free, or suggest
                something similar.
              </p>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5" noValidate>
              <input type="hidden" {...register('itemName')} />
              <input type="hidden" {...register('itemSlug')} />
              <input type="hidden" {...register('itemCategory')} />

              {/* Honeypot — hidden from real users, bots often fill every field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Leave this field blank</label>
                <input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register('website')}
                />
              </div>

              <Field label="Rental period" htmlFor="period" required error={errors.period?.message}>
                <Select id="period" invalid={!!errors.period} {...register('period')}>
                  {availablePeriods.map(([period]) => (
                    <option key={period} value={periodKeyToFormValue[period]}>
                      {periodLabels[period]}
                    </option>
                  ))}
                </Select>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Start date"
                  htmlFor="startDate"
                  required
                  error={errors.startDate?.message}
                >
                  <Input
                    id="startDate"
                    type="date"
                    invalid={!!errors.startDate}
                    {...register('startDate')}
                  />
                </Field>
                <Field label="End date" htmlFor="endDate" required error={errors.endDate?.message}>
                  <Input
                    id="endDate"
                    type="date"
                    invalid={!!errors.endDate}
                    {...register('endDate')}
                  />
                </Field>
              </div>

              <Field label="Delivery or collection" htmlFor="deliveryMethod" required>
                <Select id="deliveryMethod" {...register('deliveryMethod')}>
                  <option value="delivery">Delivery to my address</option>
                  <option value="collection">Collection from Sandton hub (by appointment)</option>
                </Select>
              </Field>

              {deliveryMethod === 'delivery' ? (
                <Field
                  label="Delivery address"
                  htmlFor="deliveryAddress"
                  error={errors.deliveryAddress?.message}
                >
                  <Input
                    id="deliveryAddress"
                    placeholder="Street, suburb, city"
                    {...register('deliveryAddress')}
                  />
                </Field>
              ) : null}

              <Field label="Full name" htmlFor="name" required error={errors.name?.message}>
                <Input id="name" invalid={!!errors.name} {...register('name')} />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Email" htmlFor="email" required error={errors.email?.message}>
                  <Input id="email" type="email" invalid={!!errors.email} {...register('email')} />
                </Field>
                <Field
                  label="Phone / WhatsApp"
                  htmlFor="phone"
                  required
                  error={errors.phone?.message}
                >
                  <Input id="phone" type="tel" invalid={!!errors.phone} {...register('phone')} />
                </Field>
              </div>

              <Field label="Notes (optional)" htmlFor="notes" error={errors.notes?.message}>
                <Textarea
                  id="notes"
                  placeholder="Anything else we should know?"
                  {...register('notes')}
                />
              </Field>

              <Checkbox
                id="termsAccepted"
                label={
                  <>
                    I agree to the{' '}
                    <a
                      href="/terms"
                      className="underline underline-offset-2"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms and Conditions
                    </a>
                    .
                  </>
                }
                invalid={!!errors.termsAccepted}
                error={errors.termsAccepted?.message}
                {...register('termsAccepted')}
              />

              <Checkbox
                id="consent"
                label={
                  <>
                    I agree to the{' '}
                    <a
                      href="/privacy-policy"
                      className="underline underline-offset-2"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Privacy Policy
                    </a>
                    .
                  </>
                }
                invalid={!!errors.consent}
                error={errors.consent?.message}
                {...register('consent')}
              />

              {submitError ? (
                <p role="alert" className="text-sm text-[#e0745a]">
                  {submitError}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button type="submit" variant="primary" size="lg" disabled={submitting}>
                  {submitting ? 'Sending request…' : 'Request booking'}
                </Button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('whatsapp_click', { source: 'rental-detail', slug: rental.slug })
                  }
                  className="border-hairline-strong label-caps text-paper hover:border-paper inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-[0.68rem]"
                >
                  Continue on WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  )
}
