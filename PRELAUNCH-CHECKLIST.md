# Pre-Launch Checklist — Gadgets & Travels

Work through this before pointing the client's domain at the live site.

## Content sign-off

- [ ] Replace every `[TO BE SUPPLIED: ...]` marker in `src/data/site-config.ts` (WhatsApp number,
      business description, postal code, social links, domain).
- [ ] Replace every `[CONFIRM]` in `src/data/faqs.ts` and `src/data/rentals.ts` once the client
      has verified those answers.
- [ ] Swap all placeholder SVG images in `public/images/` for real product/hub photography, in the
      same aspect ratios (phones/rentals 3:4, accessories 1:1, cars 16:9, devices 4:3).
- [ ] Replace the placeholder Terms & Conditions (`src/pages/Terms.tsx`) and Returns, Refunds &
      Warranty Policy (`src/pages/ReturnsWarranty.tsx`) with the client's actual legal documents.
- [ ] Fill in the Information Officer's name and contact details in
      `src/pages/PrivacyPolicy.tsx` (required for POPIA compliance).
- [ ] Confirm final phone/accessory/rental inventory matches what's actually in stock —
      `src/data/phones.ts` and `src/data/rentals.ts` currently ship with representative sample
      listings.
- [ ] Update `public/robots.txt` and `public/sitemap.xml` with the confirmed production domain.

## Security

- [ ] Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `BUSINESS_ORDERS_EMAIL` as Netlify environment
      variables (never committed to the repo — see `.env.example`).
- [ ] Confirm SPF, DKIM and DMARC records are published on the sending domain in Resend, so order
      emails land in inboxes and the domain can't be spoofed.
- [ ] Review the CSP in `netlify.toml` after connecting the final domain and any additional
      third-party scripts — tighten further if analytics/maps aren't used.
- [ ] Consider adding Cloudflare Turnstile or hCaptcha to the contact/booking/order forms for
      stronger spam protection beyond the honeypot + in-memory rate limiting already in place
      (see `netlify/lib/rate-limit.ts` — it's best-effort per function instance, not distributed).
- [ ] Run `npm audit` and address any high/critical findings before launch; enable Dependabot (or
      equivalent) on the GitHub repo for ongoing dependency alerts.
- [ ] Confirm HTTPS is enforced and HSTS is active once the custom domain + Netlify SSL cert are
      live (`Strict-Transport-Security` header is already set in `netlify.toml`).
- [ ] Verify no personal data is logged in Netlify Function logs (current handlers only log
      generic error messages, never form contents).

## Performance

- [ ] Once real photography replaces the placeholder SVGs, export as AVIF/WebP with responsive
      `srcset`s and explicit width/height (the placeholder `<img>` tags already carry width/height
      attributes to prevent layout shift — keep that pattern).
- [ ] Run Lighthouse (mobile, throttled) on Home, Shop, a product detail page, and Rentals.
      Target 95+ on Performance, Accessibility, Best Practices and SEO.
- [ ] Confirm Largest Contentful Paint stays under 2.5s on a mid-range Android device over 4G —
      the hero image is the likely LCP element; keep it compressed once real photography lands.
- [ ] Spot-check bundle sizes with `npm run build` — routes are already code-split via
      `React.lazy`, and vendor/motion/forms are split into separate chunks (see `vite.config.ts`).

## Accessibility (WCAG 2.2 AA)

- [ ] Run an automated pass (axe DevTools or Lighthouse) on every page template.
- [ ] Keyboard-only pass: tab through the header, mobile menu, every form, and the product
      gallery — confirm visible focus rings throughout (global `:focus-visible` style is set in
      `src/index.css`).
- [ ] Screen reader pass on at least the booking form and enquiry cart — confirm errors are
      announced (`role="alert"` is used on every field error) and the FAQ accordion's
      expanded/collapsed state is communicated.
- [ ] Verify colour contrast on grey-on-black text at final production values, especially
      `text-grey-400`/`text-grey-500` on dark surfaces.
- [ ] Confirm every real product photo has meaningful alt text once placeholders are replaced.

## SEO

- [ ] Verify unique title/meta description render correctly per page (`src/components/Seo.tsx`
      sets these client-side — confirm they're present in the rendered HTML `<head>` for
      crawlers, and consider prerendering/SSR in a later phase if crawler JS execution becomes a
      concern).
- [ ] Validate structured data (LocalBusiness, Product, FAQPage) with Google's Rich Results Test
      once the real domain is live.
- [ ] Submit `sitemap.xml` to Google Search Console after launch.
- [ ] Confirm Open Graph / Twitter card images render correctly when the site URL is shared
      (currently `public/og-default.jpg`, generated from the brand logo).

## Analytics & consent

- [ ] Add real GA4 measurement ID and Meta Pixel ID to `analyticsConfig` in
      `src/data/site-config.ts` once accounts exist.
- [ ] Confirm the cookie consent banner blocks both scripts until "Accept" is clicked, and that
      "Decline" genuinely prevents them from loading (test in a fresh/incognito session).
- [ ] Confirm the five tracked events fire correctly: `whatsapp_click`, `enquiry_submitted`,
      `booking_requested`, `product_viewed`, `discount_code_used`.

## Email deliverability

- [ ] Send a real test enquiry, booking and order through the live site and confirm both the
      business notification and the customer confirmation email arrive (check spam folders).
- [ ] Confirm reply-to is set correctly so replying to a customer notification email reaches the
      customer directly (already wired via `replyTo` in each Netlify Function).

## Final checks

- [ ] Test the full flow end-to-end on a real mid-range Android phone over mobile data: browse →
      add to enquiry cart → submit → confirmation → WhatsApp handoff.
- [ ] Test a rental booking end-to-end, including the "booked" and "available from" states.
- [ ] Confirm the 404 page renders for an unknown URL.
- [ ] Confirm `prefers-reduced-motion` disables non-essential animation (toggle it in OS/browser
      settings and re-test the homepage hero and page transitions).
