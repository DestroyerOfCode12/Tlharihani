import { Link } from 'react-router-dom'
import type { Rental } from '../../schemas/catalog'
import { Badge } from '../ui/Badge'
import { formatCurrency, formatDate } from '../../lib/format'
import { lowestRentalPrice } from '../../lib/catalog'

const aspectByCategory: Record<Rental['category'], string> = {
  phone: 'aspect-[3/4]',
  device: 'aspect-[4/3]',
  car: 'aspect-[16/9]',
}

export function AvailabilityBadge({ availability }: { availability: Rental['availability'] }) {
  if (availability.status === 'available') return <Badge tone="accent">Available</Badge>
  if (availability.status === 'booked') return <Badge tone="danger">Booked</Badge>
  return (
    <Badge tone="warning">
      Available{' '}
      {availability.availableFrom ? `from ${formatDate(availability.availableFrom)}` : 'soon'}
    </Badge>
  )
}

export function RentalCard({ rental }: { rental: Rental }) {
  const price = lowestRentalPrice(rental.pricing)

  return (
    <Link
      to={`/rentals/${rental.slug}`}
      className="group border-hairline bg-surface hover:border-hairline-strong block overflow-hidden rounded-lg border transition-colors duration-300"
    >
      <div className={`bg-ink-soft relative overflow-hidden ${aspectByCategory[rental.category]}`}>
        <img
          src={rental.images[0]}
          alt={rental.name}
          width={1200}
          height={900}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {rental.isSpecial ? <Badge tone="accent">Special</Badge> : null}
          <AvailabilityBadge availability={rental.availability} />
        </div>
      </div>
      <div className="space-y-1.5 p-5">
        <p className="label-caps text-grey-400">{rental.category}</p>
        <h3 className="font-display text-paper text-xl">{rental.name}</h3>
        <p className="text-grey-400 line-clamp-2 text-sm">{rental.summary}</p>
        <div className="flex items-baseline justify-between gap-2 pt-1">
          {price ? (
            <span className="text-paper text-base font-semibold">
              {formatCurrency(price.amount)}{' '}
              <span className="text-grey-400 text-xs font-normal">/ {price.period}</span>
            </span>
          ) : null}
          <span className="text-grey-400 text-xs">Deposit {formatCurrency(rental.deposit)}</span>
        </div>
      </div>
    </Link>
  )
}
