import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Seo } from '../components/Seo'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { Field } from '../components/ui/Field'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Textarea } from '../components/ui/Textarea'
import { Checkbox } from '../components/ui/Checkbox'
import { contactFormSchema, type ContactFormValues } from '../schemas/forms'
import { submitContact } from '../lib/api'
import { siteConfig, buildWhatsAppLink } from '../data/site-config'
import { trackEvent } from '../lib/analytics'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [reference, setReference] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { subject: 'General enquiry', website: '' },
  })

  async function onSubmit(values: ContactFormValues) {
    setSubmitting(true)
    setStatus('idle')
    try {
      const { reference: ref } = await submitContact(values)
      setReference(ref)
      setStatus('success')
      trackEvent('enquiry_submitted', { step: 'contact_form' })
      reset()
    } catch {
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  const whatsappHref = buildWhatsAppLink("Hi Gadgets & Travels! I'd like to get in touch.")

  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with Gadgets & Travels — WhatsApp, email, or book an appointment at our Sandton hub. We reply within one business day."
        path="/contact"
      />

      <Section tone="ink" className="pt-14 sm:pt-20">
        <p className="label-caps text-accent">Contact</p>
        <h1 className="font-display mt-3 text-4xl sm:text-5xl">Let&apos;s talk</h1>
        <p className="text-grey-300 mt-4 max-w-xl text-sm">
          Whether it&apos;s a question about a phone, a rental booking, or you&apos;d like to book
          an appointment at our hub — reach out and we&apos;ll reply within one business day.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_420px]">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
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

            <Field
              label="What's this about?"
              htmlFor="subject"
              required
              error={errors.subject?.message}
            >
              <Select id="subject" {...register('subject')}>
                <option value="General enquiry">General enquiry</option>
                <option value="Buying a phone">Buying a phone</option>
                <option value="Renting a device or car">Renting a device or car</option>
                <option value="Book an appointment">Book an appointment at the hub</option>
                <option value="Something else">Something else</option>
              </Select>
            </Field>

            <Field label="Message" htmlFor="message" required error={errors.message?.message}>
              <Textarea id="message" invalid={!!errors.message} rows={6} {...register('message')} />
            </Field>

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

            {status === 'success' ? (
              <p role="status" className="text-accent text-sm">
                Message sent — thank you! Your reference is {reference}. We&apos;ll be in touch
                soon.
              </p>
            ) : null}
            {status === 'error' ? (
              <p role="alert" className="text-sm text-[#e0745a]">
                Something went wrong sending your message. Please try again, or reach us directly on
                WhatsApp below.
              </p>
            ) : null}

            <Button type="submit" variant="primary" size="lg" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send message'}
            </Button>
          </form>

          <div className="flex flex-col gap-8">
            <div className="border-hairline bg-surface rounded-lg border p-6">
              <h2 className="label-caps text-grey-400 mb-4">Reach us directly</h2>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { source: 'contact-page' })}
                className="label-caps text-ink mb-4 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3"
              >
                WhatsApp us
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-grey-200 hover:text-paper block text-sm"
              >
                {siteConfig.email}
              </a>
            </div>

            <div className="border-hairline bg-surface rounded-lg border p-6">
              <h2 className="label-caps text-grey-400 mb-3">Sandton hub</h2>
              <p className="text-grey-200 text-sm">
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}, South Africa
              </p>
              <p className="text-accent mt-3 text-sm">Visits are strictly by appointment only.</p>
              <div className="border-hairline mt-4 aspect-video overflow-hidden rounded-md border">
                <iframe
                  title="Map showing the Gadgets & Travels hub in Sandton"
                  src={siteConfig.mapEmbedSrc}
                  loading="lazy"
                  className="h-full w-full"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
