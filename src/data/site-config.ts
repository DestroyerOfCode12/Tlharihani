/**
 * Single source of truth for every contact detail, brand string and toggle
 * used across the site. Change a number once here — never hunt through
 * components for it. See README.md "Change the WhatsApp number" section.
 */
export const siteConfig = {
  businessName: 'Gadgets & Travels',
  legalName: 'Gadgets & Travels (Pty) Ltd', // [TO BE SUPPLIED: confirm registered legal entity name]
  tagline: 'EST. 2010',
  descriptionShort:
    '[TO BE SUPPLIED: one or two sentence business description for meta tags and the About page]',

  // WhatsApp number in international format, no spaces or symbols, used to build wa.me links.
  // [TO BE SUPPLIED: WhatsApp number] — placeholder below must be replaced before launch.
  whatsappNumber: '27000000000',
  whatsappDisplay: '[TO BE SUPPLIED: WhatsApp number]',

  email: 'hello@gadgetsandtravels.co.za', // [TO BE SUPPLIED: confirm domain + inbox]
  salesEmail: 'sales@gadgetsandtravels.co.za', // [TO BE SUPPLIED]
  ordersInboxEmail: 'orders@gadgetsandtravels.co.za', // functions send business notifications here

  phone: '[TO BE SUPPLIED: landline or business number, optional]',

  address: {
    line1: '77 Stella Street',
    line2: 'Sandton',
    city: 'Sandton',
    region: 'Gauteng',
    postalCode: '[TO BE SUPPLIED: postal code]',
    country: 'South Africa',
    note: 'Hub visits are by appointment only.',
  },

  mapEmbedSrc: 'https://www.google.com/maps?q=77+Stella+Street,+Sandton,+South+Africa&output=embed',

  hours: {
    note: 'By appointment only — book a time that suits you and we will confirm within one business day.',
  },

  social: {
    instagram: '[TO BE SUPPLIED: Instagram handle/URL]',
    facebook: '[TO BE SUPPLIED: Facebook URL]',
  },

  domain: '[TO BE SUPPLIED: confirmed domain name]',

  founded: 2010,

  registeredBusiness: true,

  paymentMethods: ['Yoco (card)', 'EFT', 'Cash on collection'] as const,

  serviceCities:
    'Johannesburg, Pretoria, Sandton, Cape Town, Durban and beyond — the concierge comes to you.',
} as const

export const analyticsConfig = {
  // Leave empty to keep analytics fully disabled until IDs are supplied and consent is granted.
  ga4MeasurementId: '', // [TO BE SUPPLIED: G-XXXXXXX]
  metaPixelId: '', // [TO BE SUPPLIED: Meta Pixel ID]
}

export const featureFlags = {
  yocoCheckoutEnabled: false, // Phase 2 — flip on once Yoco hosted checkout is wired up.
  customerAccountsEnabled: false, // Phase 2
  rentalsAsShopTab: false, // Rentals lives in main nav by default; flip to nest under Shop instead.
}

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`
}
