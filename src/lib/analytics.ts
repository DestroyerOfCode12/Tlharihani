import { analyticsConfig } from '../data/site-config'

interface FbqFunction {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  loaded: boolean
  version: string
  push: FbqFunction
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: FbqFunction
    _fbq?: FbqFunction
  }
}

export type AnalyticsEvent =
  | 'whatsapp_click'
  | 'enquiry_submitted'
  | 'booking_requested'
  | 'product_viewed'
  | 'discount_code_used'

const CONSENT_KEY = 'gt-cookie-consent'

export type ConsentValue = 'accepted' | 'declined'

export function getStoredConsent(): ConsentValue | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY)
    return value === 'accepted' || value === 'declined' ? value : null
  } catch {
    return null
  }
}

export function storeConsent(value: ConsentValue): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // Storage unavailable (private mode, blocked cookies) — consent still applies for this session.
  }
}

let analyticsLoaded = false

/** Injects GA4 + Meta Pixel loaders. Only ever called after explicit cookie consent. */
export function loadAnalytics(): void {
  if (analyticsLoaded) return
  if (typeof window === 'undefined') return

  const { ga4MeasurementId, metaPixelId } = analyticsConfig

  if (ga4MeasurementId) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', ga4MeasurementId, { anonymize_ip: true })
  }

  if (metaPixelId && !window.fbq) {
    // Sets up the fbq stub as executed JS (not an injected inline <script>), so a
    // strict CSP with no 'unsafe-inline' script-src still allows this to run —
    // only the externally-sourced fbevents.js below needs a script-src allowance.
    const fbq: FbqFunction = function fbqStub(...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args)
      } else {
        fbq.queue.push(args)
      }
    } as FbqFunction
    fbq.queue = []
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.push = fbq
    window.fbq = fbq
    window._fbq = fbq

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)

    window.fbq('init', metaPixelId)
    window.fbq('track', 'PageView')
  }

  analyticsLoaded = true
}

export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (getStoredConsent() !== 'accepted') return
  if (typeof window === 'undefined') return

  window.gtag?.('event', event, params)
  window.fbq?.('trackCustom', event, params)
}
