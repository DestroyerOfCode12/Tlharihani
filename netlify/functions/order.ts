import type { Handler } from '@netlify/functions'
import { z } from 'zod'
import { orderEnquirySchema } from '../../src/schemas/forms'
import { getClientIp, isRateLimited } from '../lib/rate-limit'
import { sendEmail } from '../lib/send-email'
import { renderEmailShell, emailRow } from '../lib/email-templates'

const BUSINESS_EMAIL = process.env.BUSINESS_ORDERS_EMAIL || process.env.BUSINESS_EMAIL || ''

const requestSchema = orderEnquirySchema.extend({
  reference: z.string().trim().min(1).max(60),
})

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const ip = getClientIp(event.headers as Record<string, string | undefined>)
  if (isRateLimited(ip, 'order')) {
    return {
      statusCode: 429,
      body: JSON.stringify({ error: 'Too many requests. Please try again shortly.' }),
    }
  }

  let payload: unknown
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body.' }) }
  }

  const result = requestSchema.safeParse(payload)
  if (!result.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Please check your enquiry and try again.' }),
    }
  }

  const {
    reference,
    website,
    items,
    discountCode,
    deliveryMethod,
    deliveryAddress,
    name,
    email,
    phone,
    notes,
  } = result.data

  if (website) {
    return { statusCode: 200, body: JSON.stringify({ reference }) }
  }

  try {
    if (!BUSINESS_EMAIL) throw new Error('BUSINESS_ORDERS_EMAIL is not configured')

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemsSummary = items
      .map(
        (item) =>
          `${item.quantity}x ${item.name}${item.storage ? ` (${item.storage})` : ''}${item.color ? ` — ${item.color}` : ''}`,
      )
      .join('; ')

    const sharedRows = [
      emailRow('Items', itemsSummary),
      emailRow('Subtotal', `R${subtotal.toLocaleString('en-ZA')}`),
      ...(discountCode ? [emailRow('Discount code', discountCode)] : []),
      emailRow('Delivery/collection', deliveryMethod),
      ...(deliveryAddress ? [emailRow('Address', deliveryAddress)] : []),
    ]

    await sendEmail({
      to: BUSINESS_EMAIL,
      subject: `New shop enquiry (${reference})`,
      replyTo: email,
      html: renderEmailShell(
        'New shop enquiry',
        reference,
        [
          ...sharedRows,
          emailRow('Name', name),
          emailRow('Email', email),
          emailRow('Phone', phone),
          ...(notes ? [emailRow('Notes', notes)] : []),
        ].join(''),
      ),
    })

    await sendEmail({
      to: email,
      subject: `We've received your enquiry — ${reference}`,
      html: renderEmailShell(
        'Your enquiry is in',
        reference,
        sharedRows.join(''),
        "We'll confirm stock and final pricing shortly. Payment is accepted via Yoco, EFT or cash on collection — there's no online card checkout yet.",
      ),
    })

    return { statusCode: 200, body: JSON.stringify({ reference }) }
  } catch (error) {
    console.error('order function error', error instanceof Error ? error.message : 'unknown error')
    return {
      statusCode: 502,
      body: JSON.stringify({ error: 'We could not send your enquiry. Please try again.' }),
    }
  }
}
