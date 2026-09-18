import { Section } from '../ui/Section'
import { Reveal } from '../motion/Reveal'

const steps = [
  {
    number: '01',
    title: 'Tell us what you need',
    description:
      "Browse the site or message us on WhatsApp. Buying, renting, or just not sure yet — we'll point you the right way.",
  },
  {
    number: '02',
    title: 'We bring it to you',
    description:
      'Your phone, device or car is inspected, charged and delivered to your address — home, office, or hotel — at a time that suits you.',
  },
  {
    number: '03',
    title: 'Enjoy it, worry-free',
    description:
      'Clear pricing, a documented condition, and a real person on WhatsApp if anything comes up. Collection is just as easy.',
  },
]

export function ConciergeSteps() {
  return (
    <Section tone="surface" aria-labelledby="concierge-heading">
      <div className="mb-14 max-w-2xl">
        <p className="label-caps text-accent">How the concierge works</p>
        <h2 id="concierge-heading" className="font-display mt-3 text-3xl text-balance sm:text-4xl">
          Three steps between you and what you need
        </h2>
      </div>
      <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
        {steps.map((step, index) => (
          <Reveal key={step.number} delay={index * 0.1} className="flex flex-col gap-4">
            <span className="font-script text-accent text-5xl">{step.number}</span>
            <h3 className="font-display text-2xl">{step.title}</h3>
            <p className="text-grey-300 text-sm">{step.description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
