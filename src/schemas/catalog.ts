import { z } from 'zod'

export const conditionSchema = z.enum(['new', 'used', 'refurbished'])
export type Condition = z.infer<typeof conditionSchema>

export const stockStatusSchema = z.enum(['in-stock', 'low-stock', 'sold-out', 'pre-order'])
export type StockStatus = z.infer<typeof stockStatusSchema>

export const moneySchema = z.number().int().positive()

export const phoneSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  category: z.literal('phone'),
  condition: conditionSchema,
  storageOptions: z.array(z.string().min(1)).min(1),
  colorOptions: z.array(z.string().min(1)).min(1),
  price: moneySchema,
  compareAtPrice: moneySchema.optional(),
  batteryHealth: z.number().min(0).max(100).optional(),
  warrantyMonths: z.number().int().min(0),
  layBuyAvailable: z.boolean(),
  stockStatus: stockStatusSchema,
  isSpecial: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  images: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  specs: z.record(z.string(), z.string()),
})
export type Phone = z.infer<typeof phoneSchema>

export const accessorySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().min(1),
  category: z.literal('accessory'),
  accessoryType: z.string().min(1),
  condition: conditionSchema,
  price: moneySchema,
  compareAtPrice: moneySchema.optional(),
  stockStatus: stockStatusSchema,
  isSpecial: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  images: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  specs: z.record(z.string(), z.string()).default({}),
})
export type Accessory = z.infer<typeof accessorySchema>

export const rentalCategorySchema = z.enum(['device', 'car'])
export type RentalCategory = z.infer<typeof rentalCategorySchema>

export const availabilityStatusSchema = z.enum(['available', 'booked', 'available-from'])

export const availabilitySchema = z.object({
  status: availabilityStatusSchema,
  availableFrom: z.string().optional(),
})
export type Availability = z.infer<typeof availabilitySchema>

export const rentalPricingSchema = z.object({
  daily: moneySchema.optional(),
  weekly: moneySchema.optional(),
  monthly: moneySchema.optional(),
  longTerm: moneySchema.optional(),
})
export type RentalPricing = z.infer<typeof rentalPricingSchema>

export const rentalSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  category: rentalCategorySchema,
  summary: z.string().min(1),
  description: z.string().min(1),
  pricing: rentalPricingSchema,
  deposit: moneySchema,
  features: z.array(z.string().min(1)).min(1),
  specifications: z.record(z.string(), z.string()),
  availability: availabilitySchema,
  isSpecial: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  images: z.array(z.string().min(1)).min(1),
})
export type Rental = z.infer<typeof rentalSchema>

export const testimonialSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  location: z.string().min(1),
  quote: z.string().min(1),
  service: z.enum(['shop', 'rental-device', 'rental-car', 'concierge']),
  rating: z.number().min(1).max(5),
})
export type Testimonial = z.infer<typeof testimonialSchema>

export const faqSchema = z.object({
  id: z.string().min(1),
  category: z.enum([
    'rentals',
    'deposits',
    'documents',
    'delivery',
    'lay-buy',
    'warranty',
    'payment',
    'appointments',
  ]),
  question: z.string().min(1),
  answer: z.string().min(1),
  needsConfirmation: z.boolean().default(false),
})
export type Faq = z.infer<typeof faqSchema>

export const discountCodeSchema = z.object({
  code: z.string().min(1),
  label: z.string().min(1),
  percentOff: z.number().min(1).max(100),
  active: z.boolean(),
})
export type DiscountCode = z.infer<typeof discountCodeSchema>
