import { ButtonLink } from '../ui/ButtonLink'
import { WhatsAppButton } from '../layout/WhatsAppButton'
import { Reveal } from '../motion/Reveal'

export function ClosingCta() {
  return (
    <section aria-labelledby="closing-cta-heading" className="bg-ink py-20 sm:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <Reveal>
          <p className="label-caps text-accent">Ready when you are</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 id="closing-cta-heading" className="font-display text-3xl text-balance sm:text-5xl">
            Let&apos;s sort out your next phone, device or car
          </h2>
        </Reveal>
        <Reveal delay={0.16} className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
          <ButtonLink to="/rentals" variant="primary" size="lg">
            Rent Now
          </ButtonLink>
          <ButtonLink to="/shop" variant="secondary" size="lg">
            Shop Phones
          </ButtonLink>
          <WhatsAppButton
            floating={false}
            message="Hi Gadgets & Travels! I'd like some help getting started."
          />
        </Reveal>
      </div>
    </section>
  )
}
