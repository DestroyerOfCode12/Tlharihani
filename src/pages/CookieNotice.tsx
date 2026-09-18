import { Seo } from '../components/Seo'
import { LegalLayout } from '../components/layout/LegalLayout'

export default function CookieNotice() {
  return (
    <>
      <Seo
        title="Cookie Notice"
        description="How Gadgets & Travels uses cookies, and how to control your preferences."
        path="/cookie-notice"
      />
      <LegalLayout title="Cookie Notice" updated="18 September 2026">
        <p>
          This notice explains how Gadgets & Travels uses cookies and similar technologies on this
          website.
        </p>

        <h2>1. What are cookies</h2>
        <p>
          Cookies are small text files stored on your device that help websites function and collect
          information about how they&apos;re used.
        </p>

        <h2>2. Cookies we use</h2>
        <ul className="flex flex-col gap-2">
          <li>
            <strong>Essential:</strong> a cookie preference cookie, to remember your consent choice.
            This is required for the site to function and cannot be disabled.
          </li>
          <li>
            <strong>Analytics (optional):</strong> Google Analytics 4, to understand how visitors
            use our site. Only loads after you accept.
          </li>
          <li>
            <strong>Advertising (optional):</strong> Meta Pixel, to measure the effectiveness of our
            advertising. Only loads after you accept.
          </li>
        </ul>

        <h2>3. Your choices</h2>
        <p>
          When you first visit, you&apos;ll see a banner asking you to accept or decline analytics
          and advertising cookies. Declining means only essential cookies are used. You can change
          your mind at any time by clearing your browser&apos;s site data for this domain, which
          will show the banner again.
        </p>

        <h2>4. Third parties</h2>
        <p>
          Analytics and advertising cookies are set by Google and Meta respectively, and are subject
          to their own privacy policies. We do not control how these providers use data beyond the
          anonymised, aggregated reporting we receive.
        </p>
      </LegalLayout>
    </>
  )
}
