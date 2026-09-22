import { Seo } from '../components/Seo'
import { LegalLayout } from '../components/layout/LegalLayout'
import { siteConfig } from '../data/site-config'

export default function ReturnsWarranty() {
  return (
    <>
      <Seo
        title="Returns, Refunds & Warranty"
        description="Warranty, returns and exchange terms for phones purchased from Gadgets & Travels."
        path="/returns-warranty"
      />
      <LegalLayout title="Returns, Refunds & Warranty Policy" updated="18 September 2026">
        <p>
          [TO BE SUPPLIED: This page is a placeholder ready for {siteConfig.businessName}&apos;s
          existing Returns, Refunds and Warranty Policy document. Replace the sections below with
          the client&apos;s final terms once supplied.]
        </p>

        <h2>1. Warranty by condition</h2>
        <ul className="flex flex-col gap-2">
          <li>
            <strong>New phones:</strong> [TO BE SUPPLIED: manufacturer or in-house warranty period.]
          </li>
          <li>
            <strong>Used phones:</strong> sold with battery health disclosed upfront. [TO BE
            SUPPLIED: any warranty coverage.]
          </li>
        </ul>

        <h2>2. What's covered</h2>
        <p>
          [TO BE SUPPLIED: covered faults, exclusions such as accidental damage or liquid damage.]
        </p>

        <h2>3. Returns window</h2>
        <p>[TO BE SUPPLIED: number of days, condition requirements, proof of purchase.]</p>

        <h2>4. How to make a claim</h2>
        <p>
          Contact us at{' '}
          <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-2">
            {siteConfig.email}
          </a>{' '}
          or via WhatsApp with your order reference and a description of the issue. We will arrange
          an inspection, repair or replacement in line with this policy.
        </p>

        <h2>5. Trade-ins, buyback and repairs</h2>
        <p>[TO BE SUPPLIED: whether these services are offered, and their terms.]</p>
      </LegalLayout>
    </>
  )
}
