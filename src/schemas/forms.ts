import { z } from 'zod'

/**
 * Shared Zod schemas for every form on the site. Imported by both the
 * React Hook Form resolvers in the browser and the Netlify Functions,
 * so client and server validation can never drift apart.
 */

const name = z.string().trim().min(2, 'Please enter your full name.').max(120)
const email = z.string().trim().email('Please enter a valid email address.').max(200)
const phone = z
  .string()
  .trim()
  .min(7, 'Please enter a valid phone number.')
  .max(20)
  .regex(/^[+\d\s()-]+$/, 'Please use digits and + only.')
const message = z.string().trim().max(2000).optional()
const consent = z.literal(true, {
  message: 'Please accept the Privacy Policy to continue.',
})
const termsAccepted = z.literal(true, {
  message: 'Please accept the Terms and Conditions to continue.',
})
/** Honeypot — must stay empty. Real users never see or fill this field. */
const honeypot = z.string().max(0).optional().or(z.literal(''))

export const contactFormSchema = z.object({
  name,
  email,
  phone,
  subject: z.string().trim().min(1, 'Please select a topic.'),
  message: z.string().trim().min(10, 'Tell us a little more — at least 10 characters.').max(2000),
  consent,
  website: honeypot,
})
export type ContactFormValues = z.infer<typeof contactFormSchema>

export const deliveryMethodSchema = z.enum(['delivery', 'collection'])

export const bookingFormSchema = z.object({
  itemName: z.string().trim().min(1),
  itemSlug: z.string().trim().min(1),
  itemCategory: z.enum(['device', 'car']),
  period: z.enum(['daily', 'weekly', 'monthly', 'long-term']),
  startDate: z.string().trim().min(1, 'Please choose a start date.'),
  endDate: z.string().trim().min(1, 'Please choose an end date.'),
  deliveryMethod: deliveryMethodSchema,
  deliveryAddress: z.string().trim().max(300).optional(),
  name,
  email,
  phone,
  notes: message,
  termsAccepted,
  consent,
  website: honeypot,
})
export type BookingFormValues = z.infer<typeof bookingFormSchema>

export const enquiryItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  type: z.enum(['phone', 'accessory']),
  price: z.number().nonnegative(),
  quantity: z.number().int().min(1).max(10),
  storage: z.string().optional(),
  color: z.string().optional(),
  layBuy: z.boolean().optional(),
})
export type EnquiryItem = z.infer<typeof enquiryItemSchema>

export const orderEnquirySchema = z.object({
  items: z.array(enquiryItemSchema).min(1, 'Add at least one item to your enquiry cart.'),
  discountCode: z.string().trim().max(40).optional(),
  deliveryMethod: deliveryMethodSchema,
  deliveryAddress: z.string().trim().max(300).optional(),
  name,
  email,
  phone,
  notes: message,
  termsAccepted,
  consent,
  website: honeypot,
})
export type OrderEnquiryValues = z.infer<typeof orderEnquirySchema>
