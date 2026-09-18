import { Section } from '../ui/Section'
import { Reveal } from '../motion/Reveal'

const steps = [
  {
    number: '01',
    title: 'Tell us what you need',
    description:
      "Browse the site, or just message us on WhatsApp. Not sure yet? We'll help you work it out.",
  },
  {
    number: '02',
    title: 'We bring it to you',
    description:
      'Home, office, hotel, wherever suits you. Your phone, device or car arrives inspected, charged and ready to go at the time you asked for.',
  },
  {
    number: '03',
    title: 'Enjoy it, worry-free',
    description:
      'Clear pricing. A documented condition. A real person on WhatsApp if anything comes up.',
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
      <div className="grid gap-10 sm:grid-cols-[1.1fr_1.3fr_1fr] sm:gap-8">
        {steps.map((step, index) => (
          <Reveal
            key={step.number}
            delay={index * 0.1}
            className={index === 1 ? 'flex flex-col gap-4 sm:mt-6' : 'flex flex-col gap-4'}
          >
            <span className="font-script text-accent text-5xl">{step.number}</span>
            <h3 className="font-display text-2xl">{step.title}</h3>
            <p className="text-grey-300 text-sm">{step.description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
