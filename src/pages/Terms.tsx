import { Seo } from '../components/Seo'
import { LegalLayout } from '../components/layout/LegalLayout'
import { siteConfig } from '../data/site-config'

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms & Conditions"
        description="Terms and conditions for shopping and renting with Gadgets & Travels."
        path="/terms"
      />
      <LegalLayout title="Terms & Conditions" updated="18 September 2026">
        <p>
          [TO BE SUPPLIED: This page is a placeholder structure ready for {siteConfig.businessName}
          &apos;s existing Terms and Conditions document. Replace the sections below with the
          client&apos;s final legal text once supplied.]
        </p>

        <h2>1. About these terms</h2>
        <p>
          These Terms and Conditions govern all purchases and rental bookings made through{' '}
          {siteConfig.businessName} ({siteConfig.legalName}), whether via this website, WhatsApp,
          email, or in person at our Sandton hub. By submitting an enquiry, order or booking
          request, you agree to be bound by these terms.
        </p>

        <h2>2. Enquire now, pay later</h2>
        <p>
          This website does not process online card payments. Submitting an enquiry or booking
          request reserves nothing until we confirm stock, availability and price with you directly.
          Accepted payment methods are Yoco (card, in person or via secure link), EFT, and cash on
          collection.
        </p>

        <h2>3. Rentals</h2>
        <ul className="flex flex-col gap-2">
          <li>
            A refundable deposit is required for every rental, shown on the listing before you book.
          </li>
          <li>
            A copy of your ID and proof of residence will be requested securely once your booking is
            confirmed — never through the website form.
          </li>
          <li>
            You must tick the Terms and Conditions checkbox before any booking request is submitted.
          </li>
          <li>
            [TO BE SUPPLIED: late return fees, damage assessment process, and insurance terms.]
          </li>
        </ul>

        <h2>4. Phone sales</h2>
        <p>
          [TO BE SUPPLIED: warranty terms, lay buy terms, and returns eligibility — see also our{' '}
          <a href="/returns-warranty" className="underline underline-offset-2">
            Returns, Refunds & Warranty Policy
          </a>
          .]
        </p>

        <h2>5. Appointments</h2>
        <p>
          Our hub at {siteConfig.address.line1}, {siteConfig.address.line2} is open by appointment
          only. Please book a time via the Contact page or WhatsApp before visiting.
        </p>

        <h2>6. Governing law</h2>
        <p>
          These terms are governed by the laws of South Africa. [TO BE SUPPLIED: dispute resolution
          clause.]
        </p>

        <h2>7. Contact</h2>
        <p>
          Questions about these terms can be sent to{' '}
          <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-2">
            {siteConfig.email}
          </a>
          .
        </p>
      </LegalLayout>
    </>
  )
}
