import type { BookingFormValues, ContactFormValues, OrderEnquiryValues } from '../schemas/forms'
import { generateReference } from './format'

interface ApiResponse {
  reference: string
}

async function postForm<T>(endpoint: string, prefix: string, payload: T): Promise<ApiResponse> {
  const reference = generateReference(prefix)

  const response = await fetch(`/.netlify/functions/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, reference }),
  })

  if (!response.ok) {
    throw new Error(`Request to ${endpoint} failed with status ${response.status}`)
  }

  return { reference }
}

export function submitContact(values: ContactFormValues) {
  return postForm('contact', 'GT-ENQ', values)
}

export function submitBooking(values: BookingFormValues) {
  return postForm('booking', 'GT-BOOK', values)
}

export function submitOrder(values: OrderEnquiryValues) {
  return postForm('order', 'GT-ORD', values)
}
