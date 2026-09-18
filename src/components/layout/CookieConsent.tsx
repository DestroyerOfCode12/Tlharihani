import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { getStoredConsent, loadAnalytics, storeConsent } from '../../lib/analytics'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const existing = getStoredConsent()
    if (existing === 'accepted') {
      loadAnalytics()
      return
    }
    if (existing === null) setVisible(true)
  }, [])

  function accept() {
    storeConsent('accepted')
    loadAnalytics()
    setVisible(false)
  }

  function decline() {
    storeConsent('declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="border-hairline-strong bg-ink-soft/98 fixed inset-x-0 bottom-0 z-50 border-t backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-grey-200 max-w-2xl text-sm">
          We use cookies to understand how you use our site and to keep improving it. Analytics and
          advertising cookies only load once you accept.{' '}
          <Link
            to="/privacy-policy"
            className="decoration-accent hover:text-paper underline underline-offset-2"
          >
            Read our Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="secondary" size="sm" onClick={decline}>
            Decline
          </Button>
          <Button variant="primary" size="sm" onClick={accept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}
