import { Seo } from '../components/Seo'
import { Section } from '../components/ui/Section'
import { ButtonLink } from '../components/ui/ButtonLink'
import { Reveal } from '../components/motion/Reveal'
import { siteConfig } from '../data/site-config'

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Gadgets & Travels has sold phones and rented devices and cars across South Africa since 2010, built on a concierge-on-the-go philosophy."
        path="/about"
      />

      <Section tone="ink" className="pt-14 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="label-caps text-accent">Our story</p>
            <h1 className="font-display mt-3 text-4xl sm:text-5xl">
              Since 2010, we&apos;ve come to you
            </h1>
            <div className="text-grey-200 mt-6 space-y-4 text-sm leading-relaxed">
              <p>
                Gadgets & Travels started with a simple idea. Buying a phone or renting a device or
                car shouldn&apos;t mean queuing at a counter, waiting on hold, or hoping the fine
                print is fair.
              </p>
              <p>
                Since 2010 we&apos;ve built the business around one principle: come to the customer,
                not the other way around. {siteConfig.descriptionShort}
              </p>
              <p>
                We sell new, used and refurbished phones and accessories, and we rent out devices
                and cars on daily, weekly, monthly and long term terms. Condition is graded
                honestly, pricing is shown upfront, and there is a real person on WhatsApp if you
                need one.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="border-hairline overflow-hidden rounded-lg border">
            <img
              src="/images/hero/about-story.svg"
              alt="Gadgets & Travels team on the road"
              width={1400}
              height={1000}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="surface">
        <Reveal className="max-w-2xl">
          <p className="label-caps text-accent">The concierge philosophy</p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl">
            We come to you. That&apos;s the whole idea.
          </h2>
          <p className="text-grey-200 mt-4 text-sm leading-relaxed">
            &ldquo;Concierge on the go&rdquo; isn&apos;t a tagline. It&apos;s how every order and
            booking gets handled. Your phone, device or car arrives inspected, charged and delivered
            to your address, wherever you are in South Africa. When a rental ends, we collect it the
            same way. No dealership visit required, unless you want one.
          </p>
        </Reveal>
      </Section>

      <Section tone="ink">
        <div className="grid gap-10 sm:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl">Who we serve</h2>
            <p className="text-grey-300 mt-3 text-sm">
              Students who need a reliable first phone. Professionals who want a spare device for a
              work trip. Families upgrading together. A business that needs a car by Friday. We
              treat the enquiry the same either way.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl">Our Sandton hub</h2>
            <p className="text-grey-300 mt-3 text-sm">
              Based at {siteConfig.address.line1}, {siteConfig.address.line2}. Visits are strictly
              by appointment, so nobody is rushed and we're not running a walk-in showroom floor.
            </p>
            <ButtonLink to="/contact" variant="secondary" size="sm" className="mt-4 w-fit">
              Book an appointment
            </ButtonLink>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
