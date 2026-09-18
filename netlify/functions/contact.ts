import type { Handler } from '@netlify/functions'
import { z } from 'zod'
import { contactFormSchema } from '../../src/schemas/forms'
import { getClientIp, isRateLimited } from '../lib/rate-limit'
import { sendEmail } from '../lib/send-email'
import { renderEmailShell, emailRow } from '../lib/email-templates'

const BUSINESS_EMAIL = process.env.BUSINESS_ORDERS_EMAIL || process.env.BUSINESS_EMAIL || ''

const requestSchema = contactFormSchema.extend({
  reference: z.string().trim().min(1).max(60),
})

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const ip = getClientIp(event.headers as Record<string, string | undefined>)
  if (isRateLimited(ip, 'contact')) {
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
      body: JSON.stringify({ error: 'Please check the form and try again.' }),
    }
  }

  const { name, email, phone, subject, message, website, reference } = result.data

  // Honeypot filled → silently pretend success so bots don't learn to adapt.
  if (website) {
    return { statusCode: 200, body: JSON.stringify({ reference }) }
  }

  try {
    if (!BUSINESS_EMAIL) throw new Error('BUSINESS_ORDERS_EMAIL is not configured')

    await sendEmail({
      to: BUSINESS_EMAIL,
      subject: `New enquiry — ${subject} (${reference})`,
      replyTo: email,
      html: renderEmailShell(
        'New contact enquiry',
        reference,
        [
          emailRow('Name', name),
          emailRow('Email', email),
          emailRow('Phone', phone),
          emailRow('Subject', subject),
          emailRow('Message', message),
        ].join(''),
      ),
    })

    await sendEmail({
      to: email,
      subject: `We've received your message — ${reference}`,
      html: renderEmailShell(
        'Thanks for reaching out',
        reference,
        [emailRow('Subject', subject), emailRow('Message', message)].join(''),
        "We reply within one business day. If it's urgent, message us on WhatsApp and we'll get back to you faster.",
      ),
    })

    return { statusCode: 200, body: JSON.stringify({ reference }) }
  } catch (error) {
    console.error(
      'contact function error',
      error instanceof Error ? error.message : 'unknown error',
    )
    return {
      statusCode: 502,
      body: JSON.stringify({ error: 'We could not send your message. Please try again.' }),
    }
  }
}
