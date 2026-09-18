import { Resend } from 'resend'

interface SendEmailInput {
  to: string
  subject: string
  html: string
  replyTo?: string
}

/**
 * All order/booking/contact notifications go through this single choke point.
 * Throws if RESEND_API_KEY or RESEND_FROM_EMAIL are missing so a misconfigured
 * deploy fails loudly instead of silently dropping customer enquiries.
 */
export async function sendEmail({ to, subject, html, replyTo }: SendEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL

  if (!apiKey || !from) {
    throw new Error('Email is not configured: missing RESEND_API_KEY or RESEND_FROM_EMAIL')
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    replyTo,
  })

  if (error) {
    throw new Error(`Resend failed: ${error.message}`)
  }
}
