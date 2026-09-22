import { testimonialSchema, type Testimonial } from '../schemas/catalog'

// Placeholder quotes, standing in until real customer testimonials come through.
// Swap names, locations and quotes for real ones before launch.
const rawTestimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Naledi M.',
    location: 'Sandton',
    quote:
      'They brought three phones to my office so I could compare them in person before buying. No pressure, no upselling, just honest advice. That is rare.',
    service: 'shop',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Craig P.',
    location: 'Johannesburg',
    quote:
      'Rented a car for a week while mine was in for repairs. It was delivered to my driveway and collected the same way. Genuinely the easiest rental experience I have had.',
    service: 'rental-car',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    name: 'Zanele K.',
    location: 'Pretoria',
    quote:
      "Rented a GoPro for a Kruger trip on two days' notice. It arrived charged, with spare batteries, and a five minute rundown on how to use it. Concierge on the go is exactly right.",
    service: 'rental-device',
    rating: 5,
  },
  {
    id: 'testimonial-4',
    name: 'Thabo S.',
    location: 'Cape Town (via delivery)',
    quote:
      'Bought a used iPhone for my son and was nervous about condition. It arrived exactly as described, with the battery health documented. Been a customer since.',
    service: 'shop',
    rating: 5,
  },
]

export const testimonials: Testimonial[] = rawTestimonials.map((testimonial) =>
  testimonialSchema.parse(testimonial),
)
