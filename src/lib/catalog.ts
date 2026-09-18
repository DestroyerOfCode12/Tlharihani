import { accessories, phones } from '../data/phones'
import { rentals } from '../data/rentals'
import type { Accessory, Phone, Rental, RentalCategory } from '../schemas/catalog'

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest'

export function findPhoneBySlug(slug: string): Phone | undefined {
  return phones.find((phone) => phone.slug === slug)
}

export function findAccessoryBySlug(slug: string): Accessory | undefined {
  return accessories.find((accessory) => accessory.slug === slug)
}

export function findRentalBySlug(slug: string): Rental | undefined {
  return rentals.find((rental) => rental.slug === slug)
}

export function rentalsByCategory(category: RentalCategory): Rental[] {
  return rentals.filter((rental) => rental.category === category)
}

export function uniqueBrands(items: (Phone | Accessory)[]): string[] {
  return Array.from(new Set(items.map((item) => item.brand))).sort()
}

export function sortItems<T extends { price: number; isFeatured: boolean }>(
  items: T[],
  sort: SortOption,
): T[] {
  const copy = [...items]
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'newest':
      return copy.reverse()
    case 'featured':
    default:
      return copy.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
  }
}

export function lowestRentalPrice(
  pricing: Rental['pricing'],
): { amount: number; period: string } | null {
  if (pricing.daily) return { amount: pricing.daily, period: 'day' }
  if (pricing.weekly) return { amount: pricing.weekly, period: 'week' }
  if (pricing.monthly) return { amount: pricing.monthly, period: 'month' }
  if (pricing.longTerm) return { amount: pricing.longTerm, period: 'month, long term' }
  return null
}
