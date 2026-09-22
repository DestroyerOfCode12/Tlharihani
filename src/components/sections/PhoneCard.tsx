import { Link } from 'react-router-dom'
import type { Phone } from '../../schemas/catalog'
import { Badge } from '../ui/Badge'
import { formatCurrency } from '../../lib/format'

const conditionLabel: Record<Phone['condition'], string> = {
  new: 'New',
  used: 'Used',
}

export function PhoneCard({ phone }: { phone: Phone }) {
  return (
    <Link
      to={`/shop/phones/${phone.slug}`}
      className="group border-hairline bg-surface hover:border-hairline-strong block overflow-hidden rounded-lg border transition-colors duration-300"
    >
      <div className="bg-ink-soft relative aspect-[3/4] overflow-hidden">
        <img
          src={phone.images[0]}
          alt={`${phone.brand} ${phone.model}`}
          width={900}
          height={1200}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {phone.isSpecial ? <Badge tone="accent">Special</Badge> : null}
          <Badge tone="neutral">{conditionLabel[phone.condition]}</Badge>
        </div>
        {phone.stockStatus !== 'in-stock' ? (
          <div className="absolute bottom-3 left-3">
            <Badge tone={phone.stockStatus === 'sold-out' ? 'danger' : 'warning'}>
              {phone.stockStatus === 'low-stock'
                ? 'Low stock'
                : phone.stockStatus === 'sold-out'
                  ? 'Sold out'
                  : 'Pre-order'}
            </Badge>
          </div>
        ) : null}
      </div>
      <div className="space-y-1.5 p-5">
        <p className="label-caps text-grey-400">{phone.brand}</p>
        <h3 className="font-display text-paper text-xl">{phone.model}</h3>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-paper text-lg font-semibold">{formatCurrency(phone.price)}</span>
          {phone.compareAtPrice ? (
            <span className="text-grey-400 text-sm line-through">
              {formatCurrency(phone.compareAtPrice)}
            </span>
          ) : null}
        </div>
        {phone.layBuyAvailable ? <p className="text-accent text-xs">Lay buy available</p> : null}
      </div>
    </Link>
  )
}
