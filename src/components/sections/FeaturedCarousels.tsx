import { phones } from '../../data/phones'
import { rentals } from '../../data/rentals'
import { Section } from '../ui/Section'
import { ButtonLink } from '../ui/ButtonLink'
import { PhoneCard } from './PhoneCard'
import { RentalCard } from './RentalCard'
import { ScrollRow } from './ScrollRow'

export function FeaturedPhones() {
  const featured = phones.filter((phone) => phone.isFeatured)

  return (
    <Section tone="ink" aria-labelledby="featured-phones-heading">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-caps text-accent">Featured phones</p>
          <h2 id="featured-phones-heading" className="font-display mt-3 text-3xl sm:text-4xl">
            This week&apos;s picks
          </h2>
        </div>
        <ButtonLink to="/shop" variant="secondary" size="sm">
          View all phones
        </ButtonLink>
      </div>
      <ScrollRow>
        {featured.map((phone) => (
          <div key={phone.id} className="w-[72vw] shrink-0 sm:w-[300px]">
            <PhoneCard phone={phone} />
          </div>
        ))}
      </ScrollRow>
    </Section>
  )
}

export function FeaturedRentals() {
  const featured = rentals.filter((rental) => rental.isFeatured)

  return (
    <Section tone="surface" aria-labelledby="featured-rentals-heading">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-caps text-accent">Featured rentals</p>
          <h2 id="featured-rentals-heading" className="font-display mt-3 text-3xl sm:text-4xl">
            Ready to book this week
          </h2>
        </div>
        <ButtonLink to="/rentals" variant="secondary" size="sm">
          View all rentals
        </ButtonLink>
      </div>
      <ScrollRow>
        {featured.map((rental) => (
          <div key={rental.id} className="w-[80vw] shrink-0 sm:w-[340px]">
            <RentalCard rental={rental} />
          </div>
        ))}
      </ScrollRow>
    </Section>
  )
}
