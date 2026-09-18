import type { Handler } from '@netlify/functions'
import { z } from 'zod'
import { bookingFormSchema } from '../../src/schemas/forms'
import { getClientIp, isRateLimited } from '../lib/rate-limit'
import { sendEmail } from '../lib/send-email'
import { renderEmailShell, emailRow } from '../lib/email-templates'

const BUSINESS_EMAIL = process.env.BUSINESS_ORDERS_EMAIL || process.env.BUSINESS_EMAIL || ''

const requestSchema = bookingFormSchema.extend({
  reference: z.string().trim().min(1).max(60),
})

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const ip = getClientIp(event.headers as Record<string, string | undefined>)
  if (isRateLimited(ip, 'booking')) {
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
      body: JSON.stringify({ error: 'Please check the booking form and try again.' }),
    }
  }

  const {
    reference,
    website,
    itemName,
    itemCategory,
    period,
    startDate,
    endDate,
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

    const sharedRows = [
      emailRow('Item', `${itemName} (${itemCategory})`),
      emailRow('Period', period),
      emailRow('Start date', startDate),
      emailRow('End date', endDate),
      emailRow('Delivery/collection', deliveryMethod),
      ...(deliveryAddress ? [emailRow('Address', deliveryAddress)] : []),
    ]

    await sendEmail({
      to: BUSINESS_EMAIL,
      subject: `New rental booking — ${itemName} (${reference})`,
      replyTo: email,
      html: renderEmailShell(
        'New rental booking request',
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
      subject: `Booking request received — ${reference}`,
      html: renderEmailShell(
        'Your booking request is in',
        reference,
        sharedRows.join(''),
        "We'll confirm availability within one business day. We'll also request a copy of your ID and proof of residence securely by email or WhatsApp once your booking is confirmed — never through the website.",
      ),
    })

    return { statusCode: 200, body: JSON.stringify({ reference }) }
  } catch (error) {
    console.error(
      'booking function error',
      error instanceof Error ? error.message : 'unknown error',
    )
    return {
      statusCode: 502,
      body: JSON.stringify({ error: 'We could not send your booking request. Please try again.' }),
    }
  }
}
