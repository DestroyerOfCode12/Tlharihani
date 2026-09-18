import { siteConfig } from '../data/site-config'
import type { Faq, Phone } from '../schemas/catalog'

export function localBusinessJsonLd(origin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.businessName,
    description: siteConfig.descriptionShort,
    url: origin,
    logo: `${origin}/logo/logo-transparent.png`,
    image: `${origin}/og-default.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: 'ZA',
    },
    email: siteConfig.email,
    priceRange: '$$',
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Visits',
      value: 'By appointment only',
    },
  }
}

export function productJsonLd(phone: Phone, origin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${phone.brand} ${phone.model}`,
    description: phone.description,
    image: phone.images.map((src) => `${origin}${src}`),
    brand: { '@type': 'Brand', name: phone.brand },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'ZAR',
      price: phone.price,
      availability:
        phone.stockStatus === 'sold-out'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
      url: `${origin}/shop/phones/${phone.slug}`,
    },
    itemCondition:
      phone.condition === 'new'
        ? 'https://schema.org/NewCondition'
        : 'https://schema.org/UsedCondition',
  }
}

export function faqPageJsonLd(items: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.replace('[CONFIRM] ', ''),
      },
    })),
  }
}
