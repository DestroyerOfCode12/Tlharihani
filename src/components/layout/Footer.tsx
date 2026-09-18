import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { siteConfig } from '../../data/site-config'
import { primaryNavLinks } from './nav-links'

const legalLinks = [
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Returns, Refunds & Warranty', to: '/returns-warranty' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Cookie Notice', to: '/cookie-notice' },
]

export function Footer() {
  return (
    <footer className="border-hairline bg-ink text-grey-300 border-t">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Logo className="h-11 w-auto" />
            <p className="label-caps text-grey-500">{siteConfig.tagline}</p>
            <p className="max-w-xs text-sm">
              Concierge on the go — phones, devices and cars sold and rented, delivered wherever you
              are in South Africa.
            </p>
          </div>

          <div>
            <h3 className="label-caps text-grey-400 mb-4">Explore</h3>
            <ul className="flex flex-col gap-3 text-sm">
              {primaryNavLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-paper transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label-caps text-grey-400 mb-4">Visit</h3>
            <address className="flex flex-col gap-2 text-sm not-italic">
              <span>{siteConfig.address.line1}</span>
              <span>{siteConfig.address.line2}, South Africa</span>
              <span className="text-accent">{siteConfig.address.note}</span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-paper mt-2 transition-colors"
              >
                {siteConfig.email}
              </a>
            </address>
          </div>

          <div>
            <h3 className="label-caps text-grey-400 mb-4">Legal</h3>
            <ul className="flex flex-col gap-3 text-sm">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-paper transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-hairline text-grey-500 mt-16 flex flex-col gap-3 border-t pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.businessName}. Registered business. Est.{' '}
            {siteConfig.founded}.
          </p>
          <p>Sandton, South Africa — serving every major city.</p>
        </div>
      </div>
    </footer>
  )
}
