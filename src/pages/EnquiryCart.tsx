import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Seo } from '../components/Seo'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { ButtonLink } from '../components/ui/ButtonLink'
import { Field } from '../components/ui/Field'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Textarea } from '../components/ui/Textarea'
import { Checkbox } from '../components/ui/Checkbox'
import { EmptyState } from '../components/ui/EmptyState'
import { useEnquiryCart } from '../context/EnquiryCartContext'
import { formatCurrency } from '../lib/format'
import { orderEnquirySchema, type OrderEnquiryValues } from '../schemas/forms'
import { submitOrder } from '../lib/api'
import { findDiscountCode } from '../data/discounts'
import { siteConfig } from '../data/site-config'
import { trackEvent } from '../lib/analytics'

export default function EnquiryCart() {
  const { items, removeItem, updateQuantity, subtotal, clear } = useEnquiryCart()
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string
    percentOff: number
  } | null>(null)
  const [discountInput, setDiscountInput] = useState('')
  const [discountError, setDiscountError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderEnquiryValues>({
    resolver: zodResolver(orderEnquirySchema),
    defaultValues: { items: [], deliveryMethod: 'delivery', website: '' },
  })

  const deliveryMethod = watch('deliveryMethod')

  const discountAmount = appliedDiscount
    ? Math.round((subtotal * appliedDiscount.percentOff) / 100)
    : 0
  const total = subtotal - discountAmount

  function applyDiscount() {
    const found = findDiscountCode(discountInput)
    if (!found) {
      setDiscountError('That code is not valid or has expired.')
      setAppliedDiscount(null)
      return
    }
    setAppliedDiscount({ code: found.code, percentOff: found.percentOff })
    setDiscountError(null)
    trackEvent('discount_code_used', { code: found.code })
  }

  async function onSubmit(values: OrderEnquiryValues) {
    if (items.length === 0) return
    setSubmitError(null)
    setSubmitting(true)
    try {
      const payload: OrderEnquiryValues = {
        ...values,
        items,
        discountCode: appliedDiscount?.code,
      }
      const { reference } = await submitOrder(payload)
      trackEvent('enquiry_submitted', { step: 'order_submit', itemCount: items.length })

      sessionStorage.setItem(
        'gt-last-order',
        JSON.stringify({ ...values, reference, items, subtotal, discount: appliedDiscount, total }),
      )
      clear()
      navigate('/shop/enquiry/confirmation')
    } catch {
      setSubmitError(
        'We could not send your enquiry automatically. Please try again, or message us directly on WhatsApp.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <>
        <Seo
          title="Enquiry Cart"
          description="Review the items in your enquiry cart."
          path="/shop/enquiry"
          noindex
        />
        <Section tone="ink" className="pt-14 sm:pt-20">
          <EmptyState
            title="Your enquiry cart is empty"
            description="Browse the shop and add a phone or accessory to start an enquiry — no payment required yet."
            action={<ButtonLink to="/shop">Browse the shop</ButtonLink>}
          />
        </Section>
      </>
    )
  }

  return (
    <>
      <Seo
        title="Enquiry Cart"
        description="Review the items in your enquiry cart."
        path="/shop/enquiry"
        noindex
      />

      <Section tone="ink" className="pt-14 sm:pt-20">
        <p className="label-caps text-accent">Enquire now, pay later</p>
        <h1 className="font-display mt-3 text-4xl">Your enquiry cart</h1>
        <p className="text-grey-300 mt-4 max-w-xl text-sm">
          Review your items, add your details, and we&apos;ll confirm stock, price and next steps by
          email and WhatsApp. No card payment is taken here.
        </p>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px]">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.storage ?? ''}-${item.color ?? ''}`}
                className="border-hairline bg-surface flex items-center justify-between gap-4 rounded-lg border p-4"
              >
                <div>
                  <p className="font-display text-lg">{item.name}</p>
                  <p className="text-grey-400 text-xs">
                    {[item.storage, item.color].filter(Boolean).join(' · ')}
                  </p>
                  <p className="text-paper mt-1 text-sm">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="sr-only" htmlFor={`qty-${item.id}`}>
                    Quantity for {item.name}
                  </label>
                  <select
                    id={`qty-${item.id}`}
                    value={item.quantity}
                    onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                    className="border-hairline-strong bg-ink-soft rounded-md border px-2 py-1.5 text-sm"
                  >
                    {Array.from({ length: 10 }).map((_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="text-grey-400 text-xs underline underline-offset-2 hover:text-[#e0745a]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="border-hairline bg-surface rounded-lg border p-4">
              <label htmlFor="discount" className="label-caps text-grey-400 mb-2 block">
                Discount code
              </label>
              <div className="flex gap-2">
                <Input
                  id="discount"
                  value={discountInput}
                  onChange={(event) => setDiscountInput(event.target.value)}
                  placeholder="e.g. WELCOME10"
                />
                <Button type="button" variant="secondary" onClick={applyDiscount}>
                  Apply
                </Button>
              </div>
              {discountError ? (
                <p className="mt-2 text-xs text-[#e0745a]">{discountError}</p>
              ) : null}
              {appliedDiscount ? (
                <p className="text-accent mt-2 text-xs">
                  {appliedDiscount.code} applied — {appliedDiscount.percentOff}% off.
                </p>
              ) : null}
            </div>

            <dl className="border-hairline flex flex-col gap-2 border-t pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-grey-400">Subtotal</dt>
                <dd className="text-paper">{formatCurrency(subtotal)}</dd>
              </div>
              {appliedDiscount ? (
                <div className="text-accent flex justify-between">
                  <dt>Discount</dt>
                  <dd>-{formatCurrency(discountAmount)}</dd>
                </div>
              ) : null}
              <div className="border-hairline flex justify-between border-t pt-2 text-base font-semibold">
                <dt>Estimated total</dt>
                <dd>{formatCurrency(total)}</dd>
              </div>
            </dl>
            <p className="text-grey-400 text-xs">
              Final pricing is confirmed once we&apos;ve checked stock. Payment is by Yoco, EFT or
              cash on collection — never online card checkout at this stage.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-hairline bg-surface flex flex-col gap-5 rounded-lg border p-6"
            noValidate
          >
            <h2 className="font-display text-2xl">Your details</h2>

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

            <Button type="submit" variant="primary" size="lg" disabled={submitting}>
              {submitting ? 'Sending enquiry…' : 'Submit enquiry'}
            </Button>
            <p className="text-grey-400 text-center text-xs">
              Payment accepted via {siteConfig.paymentMethods.join(', ')}.
            </p>
          </form>
        </div>
      </Section>
    </>
  )
}
