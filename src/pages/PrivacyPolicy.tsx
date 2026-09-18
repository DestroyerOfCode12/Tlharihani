import { Seo } from '../components/Seo'
import { LegalLayout } from '../components/layout/LegalLayout'
import { siteConfig } from '../data/site-config'

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How Gadgets & Travels collects, uses and protects your personal information, in line with the Protection of Personal Information Act (POPIA)."
        path="/privacy-policy"
      />
      <LegalLayout title="Privacy Policy" updated="18 September 2026">
        <p>
          {siteConfig.businessName} ({siteConfig.legalName}) respects your privacy and is committed
          to protecting your personal information in accordance with the Protection of Personal
          Information Act 4 of 2013 (POPIA). This policy explains what information we collect, why,
          how long we keep it, who it is shared with, and how you can exercise your rights.
        </p>

        <h2>1. Information we collect</h2>
        <p>We only collect what each form needs to fulfil your request:</p>
        <ul className="flex flex-col gap-2">
          <li>
            <strong>Contact enquiries:</strong> name, email, phone number, and your message.
          </li>
          <li>
            <strong>Shop enquiries (enquiry cart):</strong> name, email, phone number, delivery
            address (if delivery is chosen), and the items you&apos;re enquiring about.
          </li>
          <li>
            <strong>Rental bookings:</strong> name, email, phone number, delivery/collection
            preference, and rental dates. ID and proof of residence are requested separately and
            securely once a booking is confirmed — never collected through this website.
          </li>
          <li>
            <strong>Website usage:</strong> with your consent, anonymised analytics data via Google
            Analytics 4 and Meta Pixel (see our{' '}
            <a href="/cookie-notice" className="underline underline-offset-2">
              Cookie Notice
            </a>
            ).
          </li>
        </ul>

        <h2>2. Why we collect it</h2>
        <p>
          We process your personal information to respond to enquiries, confirm and fulfil purchases
          and rental bookings, communicate with you about your order, and — only with your consent —
          to understand how visitors use our site so we can improve it.
        </p>

        <h2>3. How long we keep it</h2>
        <p>
          In Phase 1, form submissions are sent directly by email and are not stored in a database
          on our servers. Email records are retained in our business mailbox for as long as
          reasonably necessary to fulfil the purpose they were collected for, or as required by law
          (for example, tax and business records), after which they are deleted or archived
          securely. [TO BE SUPPLIED: confirm specific retention periods once finalised with the
          Information Officer.]
        </p>

        <h2>4. Who we share it with</h2>
        <ul className="flex flex-col gap-2">
          <li>
            Our transactional email provider (Resend or Brevo), solely to deliver enquiry, order and
            booking emails.
          </li>
          <li>
            Google Analytics 4 and Meta Pixel, only after you accept cookies, for anonymised usage
            analytics and advertising measurement.
          </li>
          <li>
            Our payment provider, Yoco, only when you choose to pay by card — we never see or store
            your card details.
          </li>
          <li>We do not sell or rent your personal information to any third party.</li>
        </ul>

        <h2>5. Your rights</h2>
        <p>
          Under POPIA, you have the right to access, correct, or request deletion of your personal
          information, and to object to its processing. To exercise any of these rights, contact our
          Information Officer below. We will respond within a reasonable time and in line with POPIA
          requirements.
        </p>

        <h2>6. Security</h2>
        <p>
          We take reasonable technical and organisational measures to protect your information,
          including HTTPS encryption in transit, spam and rate-limit protections on our forms, and
          minimising what we collect and store in the first place.
        </p>

        <h2>7. Cookies</h2>
        <p>
          See our{' '}
          <a href="/cookie-notice" className="underline underline-offset-2">
            Cookie Notice
          </a>{' '}
          for details on how we use cookies and how to control your preferences.
        </p>

        <h2>8. Information Officer</h2>
        <p>
          [TO BE SUPPLIED: Information Officer name and contact details, as required by POPIA.]
          <br />
          Email:{' '}
          <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-2">
            {siteConfig.email}
          </a>
        </p>

        <h2>9. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date
          at the top of this page reflects the most recent revision.
        </p>
      </LegalLayout>
    </>
  )
}
