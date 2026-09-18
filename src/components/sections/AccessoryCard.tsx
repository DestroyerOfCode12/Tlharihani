import { Link } from 'react-router-dom'
import type { Accessory } from '../../schemas/catalog'
import { Badge } from '../ui/Badge'
import { formatCurrency } from '../../lib/format'

export function AccessoryCard({ accessory }: { accessory: Accessory }) {
  return (
    <Link
      to={`/shop/accessories/${accessory.slug}`}
      className="group border-hairline bg-surface hover:border-hairline-strong block overflow-hidden rounded-lg border transition-colors duration-300"
    >
      <div className="bg-ink-soft relative aspect-square overflow-hidden">
        <img
          src={accessory.images[0]}
          alt={accessory.name}
          width={900}
          height={900}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {accessory.isSpecial ? (
          <div className="absolute top-3 left-3">
            <Badge tone="accent">Special</Badge>
          </div>
        ) : null}
      </div>
      <div className="space-y-1.5 p-5">
        <p className="label-caps text-grey-400">{accessory.accessoryType}</p>
        <h3 className="font-display text-paper text-lg">{accessory.name}</h3>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-paper text-base font-semibold">
            {formatCurrency(accessory.price)}
          </span>
          {accessory.compareAtPrice ? (
            <span className="text-grey-400 text-sm line-through">
              {formatCurrency(accessory.compareAtPrice)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
