# Gadgets & Travels Website

Phase 1 site for Gadgets & Travels: phone sales, plus device and car rentals, built around a
"concierge on the go" service. Sandton, South Africa. Est. 2010.

Stack: React 19, Vite, TypeScript (strict), Tailwind CSS v4, React Router, Framer Motion, React
Hook Form and Zod. Deployed on Netlify, with Netlify Functions handling forms and email.

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

To test the Netlify Functions locally (contact, booking and order forms, plus email), install the
[Netlify CLI](https://docs.netlify.com/cli/get-started/) and run `netlify dev` instead of `npm run
dev`. It proxies `/.netlify/functions/*` to your local functions and serves the Vite app. Copy
`.env.example` to `.env` and fill in a real `RESEND_API_KEY` first, or the functions will return a 502. They're written to fail loudly rather than silently drop an enquiry.

---

## Project structure

```
src/
  components/
    ui/          Design system primitives (Button, Badge, Input, Select, Checkbox, Section, ...)
    layout/      Header, Footer, WhatsApp button, cookie consent, mobile menu, Logo
    sections/    Page-section building blocks (Hero, cards, carousels, etc.)
    motion/      Reveal (scroll-triggered fade/rise), reduced-motion aware
  pages/         One file per route, lazy-loaded in src/App.tsx
  data/          Typed content: phones, accessories, rentals, testimonials, FAQs, site config
  schemas/       Zod schemas, shared by the frontend forms and the Netlify Functions
  lib/           Formatting, analytics, API calls, structured data, design tokens
  context/       Enquiry cart (localStorage-persisted)
netlify/
  functions/     contact.ts, booking.ts, order.ts. Validate with the same Zod schemas, send email
  lib/           Shared function helpers: rate limiting, sanitisation, email templates
netlify.toml     Headers (CSP, HSTS, etc.), redirects, functions config
```

---

## Adding a phone or rental listing

No admin panel. Listings are typed data files, validated by Zod, so a bad entry fails the build
instead of shipping broken data.

**Add a phone:** open `src/data/phones.ts`, copy an existing object in the `rawPhones` array, and
change the fields. `slug` needs to be unique since it becomes the URL, `/shop/phones/<slug>`. Add
the product photo(s) to `public/images/phones/` and reference them in the `images` array. Set
`isFeatured: true` to show it on the homepage, or `isSpecial: true` for the "Special" badge.

**Add an accessory:** same idea, in the `rawAccessories` array of `src/data/phones.ts`.

**Add a rental:** open `src/data/rentals.ts`, copy an object in `rawRentals`, and set `category` to
`device` or `car` (phones are sold, not rented, in Phase 1, see below). Fill in `pricing` (any
combination of `daily`, `weekly`, `monthly`, `longTerm`, only the ones you set will show),
`deposit`, and `images`.

**Add a testimonial:** `src/data/testimonials.ts`. **Add an FAQ:** `src/data/faqs.ts`. Mark
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

One place only: `src/data/site-config.ts`, the `whatsappNumber` field (international format,
digits only, e.g. `27821234567`). Every WhatsApp button and link on the site reads from this one
value.

## Discount codes and Specials badges

Discount codes live in `src/data/discounts.ts`. Add a code, label and percentage, set `active:
true`. The "Special" badge on any phone, accessory or rental is just `isSpecial: true` on that
item's data entry, no code changes needed for either.

---

## Deploying

1. Push this repo to GitHub (or your Git provider of choice).
2. In Netlify: **Add new site > Import an existing project**, pick the repo. Build command and
   publish directory are already set in `netlify.toml` (`npm run build` builds to `dist`), and
   `netlify/functions` is registered as the Functions directory.
3. Under **Site settings > Environment variables**, set the variables listed in `.env.example`:
   - `RESEND_API_KEY` and `RESEND_FROM_EMAIL`, from your [Resend](https://resend.com) account.
   - `BUSINESS_ORDERS_EMAIL`, where contact, order and booking notifications land.
   - Set up SPF, DKIM and DMARC for your sending domain in Resend so emails land in inboxes.
4. Connect the client's domain under **Domain management**, and set up the professional inboxes
   (Google Workspace, or the domain registrar's own email hosting).
5. Add the analytics IDs to `src/data/site-config.ts` (`analyticsConfig`) once GA4 and Meta Pixel
   accounts exist. They stay inactive, no scripts load, until IDs are present _and_ the visitor
   accepts cookies.
6. Update `public/robots.txt` and `public/sitemap.xml` with the final domain before launch.

---

## What's deliberately deferred to Phase 2 / 3

Flagged in `src/data/site-config.ts` under `featureFlags`, and called out in the original brief:

- **Yoco online checkout** (`yocoCheckoutEnabled`). Phase 1 is "enquire now, pay later". Yoco, EFT
  and cash on collection are shown as accepted payment methods, but no card data ever touches this
  site. Flip the flag once hosted checkout is wired up.
- **Customer accounts** (`customerAccountsEnabled`). Guest checkout only in Phase 1. The data model
  (enquiry items, reference numbers) is already shaped to extend into order history later.
- **Secure ID/document upload for renters.** Intentionally not built. Documents get requested by
  the team securely after a booking is confirmed, never through a basic web form.
- **Rentals as a Shop tab** (`rentalsAsShopTab`). Rentals is its own main-nav item by default. Flip
  this flag (and see `src/components/layout/nav-links.ts`) to nest it under Shop instead.

## Outstanding information

Search the codebase for `[TO BE SUPPLIED: ...]` and `[CONFIRM]`. Every placeholder that needs a
real value or client sign-off before launch is marked this way: the WhatsApp number, confirmed
domain, legal business description, full stock list, warranty and returns terms, delivery areas
and costs, and the client's existing Terms & Returns documents to replace the drafted placeholder
legal pages.

See also `PRELAUNCH-CHECKLIST.md`.
