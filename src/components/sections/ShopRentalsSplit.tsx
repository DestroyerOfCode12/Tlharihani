import { ButtonLink } from '../ui/ButtonLink'
import { Reveal } from '../motion/Reveal'

export function ShopRentalsSplit() {
  return (
    <section aria-labelledby="split-heading" className="bg-ink">
      <h2 id="split-heading" className="sr-only">
        Shop or rent
      </h2>
      <div className="grid sm:grid-cols-2">
        <Reveal className="group border-hairline relative flex min-h-[70vh] flex-col justify-end overflow-hidden border-t p-8 sm:p-12">
          <img
            src="/images/hero/shop-split.svg"
            alt="Phones for sale at Gadgets & Travels"
            width={1200}
            height={1500}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="from-ink via-ink/30 absolute inset-0 bg-gradient-to-t to-transparent" />
          <div className="relative z-10 flex flex-col gap-4">
            <p className="label-caps text-accent">Own it</p>
            <h3 className="font-display text-3xl sm:text-4xl">Shop phones & accessories</h3>
            <p className="text-grey-200 max-w-sm text-sm">
              New, used and refurbished handsets, honestly graded, with battery health and warranty
              terms shown upfront.
            </p>
            <ButtonLink to="/shop" variant="primary" size="md" className="mt-2 w-fit">
              Browse the shop
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal
          delay={0.12}
          className="group border-hairline relative flex min-h-[70vh] flex-col justify-end overflow-hidden border-t p-8 sm:border-l sm:p-12"
        >
          <img
            src="/images/hero/rentals-split.svg"
            alt="Rentals from Gadgets & Travels"
            width={1200}
            height={1500}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="from-ink via-ink/30 absolute inset-0 bg-gradient-to-t to-transparent" />
          <div className="relative z-10 flex flex-col gap-4">
            <p className="label-caps text-accent">Borrow it</p>
            <h3 className="font-display text-3xl sm:text-4xl">Rent devices & cars</h3>
            <p className="text-grey-200 max-w-sm text-sm">
              Daily, weekly, monthly or long term — delivered and collected wherever you need them,
              with clear pricing and deposits.
            </p>
            <ButtonLink to="/rentals" variant="primary" size="md" className="mt-2 w-fit">
              Browse rentals
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
