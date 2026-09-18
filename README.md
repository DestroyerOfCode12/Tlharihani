# Gadgets & Travels — Website

Production-ready Phase 1 site for **Gadgets & Travels**: phone sales, and phone/device/car
rentals, built around a "concierge on the go" service. Sandton, South Africa. Est. 2010.

Stack: React 19 + Vite + TypeScript (strict) + Tailwind CSS v4 + React Router + Framer Motion +
React Hook Form + Zod, deployed on Netlify with Netlify Functions for form handling and email.

---

## Running locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build         # typecheck + production build
npm run typecheck      # TypeScript only, no build
npm run lint            # oxlint
npm run format          # prettier --write
npm run format:check    # prettier --check
npm run preview         # preview the production build locally
```

To test the Netlify Functions (contact/booking/order forms and email) locally, install the
[Netlify CLI](https://docs.netlify.com/cli/get-started/) and run `netlify dev` instead of
`npm run dev` — it proxies `/.netlify/functions/*` to your local functions and serves the Vite
app. Copy `.env.example` to `.env` and fill in a real `RESEND_API_KEY` first, or the functions
will return a 502 (they fail loudly rather than silently dropping enquiries).

---

## Project structure

```
src/
  components/
    ui/          Design system primitives (Button, Card, Badge, Input, Modal, Section, ...)
    layout/      Header, Footer, WhatsApp button, cookie consent, mobile menu, Logo
    sections/    Page-section building blocks (Hero, cards, carousels, etc.)
    motion/      Reveal (scroll-triggered fade/rise), reduced-motion aware
  pages/         One file per route, lazy-loaded in src/App.tsx
  data/          Typed content: phones, accessories, rentals, testimonials, FAQs, site config
  schemas/       Zod schemas — shared by the frontend forms AND the Netlify Functions
  lib/           Formatting, analytics, API calls, structured data, design tokens
  context/       Enquiry cart (localStorage-persisted)
netlify/
  functions/     contact.ts, booking.ts, order.ts — validate with the same Zod schemas, send email
  lib/           Shared function helpers: rate limiting, sanitisation, email templates
netlify.toml     Headers (CSP, HSTS, etc.), redirects, functions config
```

---

## Adding a phone or rental listing

No admin panel — listings are typed data files, validated by Zod, so a bad entry fails the build
instead of shipping broken data.

**Add a phone:** open `src/data/phones.ts`, copy an existing object in the `rawPhones` array, and
change the fields (`slug` must be unique — it becomes the URL `/shop/phones/<slug>`). Add the
product photo(s) to `public/images/phones/` and reference them in the `images` array. To feature
it on the homepage, set `isFeatured: true`; for the "Special" badge, set `isSpecial: true`.

**Add an accessory:** same idea, in the `rawAccessories` array of `src/data/phones.ts`.

**Add a rental:** open `src/data/rentals.ts`, copy an object in `rawRentals`, set `category` to
`phone`, `device` or `car`, and fill in `pricing` (any combination of `daily`/`weekly`/`monthly`/
`longTerm` — only the ones you set will show), `deposit`, and `images`.

**Add a testimonial:** `src/data/testimonials.ts`. **Add an FAQ:** `src/data/faqs.ts` — mark
anything not yet confirmed with `needsConfirmation: true` and prefix the answer with `[CONFIRM]`.

## Updating rental availability

Each rental has an `availability` field:

```ts
availability: { status: 'available' }
availability: { status: 'booked' }
availability: { status: 'available-from', availableFrom: '2026-10-02' }
```

This drives the badge shown on the card and detail page, and whether the booking form is
presented as bookable.

## Changing the WhatsApp number

One place only: `src/data/site-config.ts` → `whatsappNumber` (international format, digits only,
e.g. `27821234567`). Every WhatsApp button and link on the site reads from this single value.

## Discount codes & Specials badges

Discount codes live in `src/data/discounts.ts` — add a code, label and percentage, set
`active: true`. The "Special" badge on any phone, accessory or rental is just `isSpecial: true`
on that item's data entry — no code changes needed for either.

---

## Deploying

1. Push this repo to GitHub (or your Git provider of choice).
2. In Netlify: **Add new site → Import an existing project**, pick the repo. Build command and
   publish directory are already set in `netlify.toml` (`npm run build` → `dist`), and
   `netlify/functions` is registered as the Functions directory.
3. Under **Site settings → Environment variables**, set the variables listed in `.env.example`:
   - `RESEND_API_KEY`, `RESEND_FROM_EMAIL` — from your [Resend](https://resend.com) account.
   - `BUSINESS_ORDERS_EMAIL` — where contact/order/booking notifications are sent.
   - Set up SPF, DKIM and DMARC for your sending domain in Resend so emails land in inboxes.
4. Connect the client's domain under **Domain management**, and set up the professional inboxes
   (e.g. via Google Workspace or the domain registrar's email hosting).
5. Fill in the analytics IDs in `src/data/site-config.ts` (`analyticsConfig`) once GA4 and Meta
   Pixel accounts are created — they stay inactive (no scripts load) until IDs are present _and_
   the visitor accepts cookies.
6. Update `public/robots.txt` and `public/sitemap.xml` with the final domain before launch.

---

## What's deliberately deferred to Phase 2 / 3

Flagged in `src/data/site-config.ts` under `featureFlags`, and called out throughout the brief:

- **Yoco online checkout** (`yocoCheckoutEnabled`) — Phase 1 is "enquire now, pay later"; Yoco,
  EFT and cash on collection are shown as accepted payment methods, but no card data ever touches
  this site. Flip the flag once hosted checkout is wired up.
- **Customer accounts** (`customerAccountsEnabled`) — guest checkout only in Phase 1; the data
  model (enquiry items, reference numbers) is already shaped to extend into order history later.
- **Secure ID/document upload for renters** — intentionally not built. Documents are requested
  by the team securely after a booking is confirmed, never through a basic web form.
- **Rentals as a Shop tab** (`rentalsAsShopTab`) — Rentals is its own main-nav item by default;
  flip this flag (and see `src/components/layout/nav-links.ts`) to nest it under Shop instead.

## Outstanding information

Search the codebase for `[TO BE SUPPLIED: ...]` and `[CONFIRM]` — every placeholder that needs a
real value or client sign-off before launch is marked this way, including: the WhatsApp number,
confirmed domain, legal business description, full stock list, warranty/returns terms, delivery
areas and costs, and the client's existing Terms & Returns documents (to replace the drafted
placeholder legal pages).

See also `PRELAUNCH-CHECKLIST.md`.
