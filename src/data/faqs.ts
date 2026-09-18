import { faqSchema, type Faq } from '../schemas/catalog'

const rawFaqs: Faq[] = [
  {
    id: 'faq-how-rentals-work',
    category: 'rentals',
    question: 'How does renting a device or car actually work?',
    answer:
      'Browse the Rentals page, choose your item and dates, and submit a booking request. We confirm availability within one business day, then deliver the item to you (or have it ready for collection at the hub) at the agreed time. Everything is inspected and reset before it reaches you, and collected the same way at the end of your rental.',
    needsConfirmation: false,
  },
  {
    id: 'faq-deposits',
    category: 'deposits',
    question: 'Why is a deposit required, and how do I get it back?',
    answer:
      'The deposit covers the replacement value of the item in the unlikely event of loss or serious damage. It is fully refundable and released once the item is returned in the condition it was rented in. Deposit amounts are shown on every listing before you book.',
    needsConfirmation: false,
  },
  {
    id: 'faq-documents',
    category: 'documents',
    question: 'What documents do I need to rent something?',
    answer:
      "A copy of your ID and proof of residence. We don't collect these through the website. Once your booking is confirmed, the team requests them securely by email or WhatsApp.",
    needsConfirmation: false,
  },
  {
    id: 'faq-delivery-areas',
    category: 'delivery',
    question: 'Which areas do you deliver to?',
    answer:
      '[CONFIRM] We currently serve all major South African cities, with same-day delivery available in and around Sandton and Johannesburg. Delivery costs and timelines for other cities are confirmed when you submit an enquiry.',
    needsConfirmation: true,
  },
  {
    id: 'faq-in-store-collection',
    category: 'delivery',
    question: 'Can I collect in person instead of having it delivered?',
    answer:
      'Yes. Collection is available from our Sandton hub at 77 Stella Street, strictly by appointment. Choose "Collection" on your enquiry or booking form and we will arrange a time.',
    needsConfirmation: false,
  },
  {
    id: 'faq-lay-buy',
    category: 'lay-buy',
    question: 'How does lay buy work on phones?',
    answer:
      '[CONFIRM] Eligible phones can be reserved with a deposit and paid off over an agreed number of instalments before collection or delivery. Ask about lay buy terms when you submit your enquiry, or look for the "Lay Buy Available" badge on a listing.',
    needsConfirmation: true,
  },
  {
    id: 'faq-warranty',
    category: 'warranty',
    question: 'What warranty comes with a used or refurbished phone?',
    answer:
      '[CONFIRM] Refurbished phones include a minimum 6-month warranty covering hardware faults, and used phones are sold with battery health disclosed upfront. Full warranty terms for your specific device are listed on its product page.',
    needsConfirmation: true,
  },
  {
    id: 'faq-payment-methods',
    category: 'payment',
    question: 'What payment methods do you accept?',
    answer:
      'Yoco card payments, EFT, or cash on collection at our Sandton hub. We confirm payment details once your order or booking is finalised. There is no online card checkout yet.',
    needsConfirmation: false,
  },
  {
    id: 'faq-appointments',
    category: 'appointments',
    question: 'How do appointments at the Sandton hub work?',
    answer:
      'Request a time through the Contact page or WhatsApp and we will confirm a slot, usually within one business day. The hub is appointment-only so every visitor gets our full attention.',
    needsConfirmation: false,
  },
  {
    id: 'faq-returns',
    category: 'warranty',
    question: 'What happens if a phone I bought develops a fault?',
    answer:
      '[CONFIRM] Every phone is covered by its stated warranty from the date of purchase. If something goes wrong, contact us and we will arrange an inspection, repair or replacement in line with our Returns, Refunds and Warranty Policy.',
    needsConfirmation: true,
  },
]

export const faqs: Faq[] = rawFaqs.map((faq) => faqSchema.parse(faq))
