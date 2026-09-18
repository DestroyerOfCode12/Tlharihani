import { testimonials } from '../../data/testimonials'
import { Section } from '../ui/Section'
import { Reveal } from '../motion/Reveal'
import { ScrollRow } from './ScrollRow'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="text-accent flex gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill={index < rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M8 1l2.1 4.5 4.9.6-3.6 3.4.9 4.9L8 12.1 3.7 14.4l.9-4.9L1 6.1l4.9-.6L8 1Z" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <Section tone="ink" aria-labelledby="testimonials-heading">
      <div className="mb-10 max-w-2xl">
        <p className="label-caps text-accent">What customers say</p>
        <h2 id="testimonials-heading" className="font-display mt-3 text-3xl sm:text-4xl">
          Trusted since 2010
        </h2>
      </div>
      <ScrollRow>
        {testimonials.map((testimonial, index) => (
          <Reveal
            key={testimonial.id}
            delay={index * 0.08}
            className="border-hairline bg-surface w-[85vw] shrink-0 rounded-lg border p-8 sm:w-[420px]"
          >
            <Stars rating={testimonial.rating} />
            <p className="font-display text-paper mt-4 text-xl leading-snug text-balance">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <p className="label-caps text-grey-400 mt-6">
              {testimonial.name} &middot; {testimonial.location}
            </p>
          </Reveal>
        ))}
      </ScrollRow>
    </Section>
  )
}
