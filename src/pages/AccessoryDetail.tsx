import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Section } from '../components/ui/Section'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { ButtonLink } from '../components/ui/ButtonLink'
import { findAccessoryBySlug } from '../lib/catalog'
import { formatCurrency } from '../lib/format'
import { useEnquiryCart } from '../context/EnquiryCartContext'
import { trackEvent } from '../lib/analytics'

export default function AccessoryDetail() {
  const { slug } = useParams<{ slug: string }>()
  const accessory = slug ? findAccessoryBySlug(slug) : undefined
  const { addItem } = useEnquiryCart()
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (accessory) trackEvent('product_viewed', { slug: accessory.slug, type: 'accessory' })
  }, [accessory])

  if (!accessory) return <Navigate to="/shop" replace />

  function handleAddToEnquiry() {
    if (!accessory) return
    addItem({
      id: accessory.id,
      name: accessory.name,
      slug: accessory.slug,
      type: 'accessory',
      price: accessory.price,
      quantity: 1,
    })
    setAdded(true)
    trackEvent('enquiry_submitted', { step: 'add_to_cart', slug: accessory.slug })
    window.setTimeout(() => setAdded(false), 2500)
  }

  return (
    <>
      <Seo
        title={accessory.name}
        description={accessory.description}
        path={`/shop/accessories/${accessory.slug}`}
        image={accessory.images[0]}
      />

      <Section tone="ink" className="pt-14 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="border-hairline bg-ink-soft aspect-square overflow-hidden rounded-lg border">
            <img
              src={accessory.images[0]}
              alt={accessory.name}
              width={900}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              {accessory.isSpecial ? <Badge tone="accent">Special</Badge> : null}
              <Badge tone="neutral">{accessory.accessoryType}</Badge>
            </div>

            <div>
              <p className="label-caps text-grey-400">{accessory.brand}</p>
              <h1 className="font-display mt-2 text-4xl">{accessory.name}</h1>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold">{formatCurrency(accessory.price)}</span>
              {accessory.compareAtPrice ? (
                <span className="text-grey-500 text-lg line-through">
                  {formatCurrency(accessory.compareAtPrice)}
                </span>
              ) : null}
            </div>

            <p className="text-grey-200 text-sm leading-relaxed">{accessory.description}</p>

            {Object.keys(accessory.specs).length > 0 ? (
              <dl className="border-hairline grid grid-cols-2 gap-x-6 gap-y-3 border-t pt-6 text-sm">
                {Object.entries(accessory.specs).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-grey-400">{key}</dt>
                    <dd className="text-paper">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToEnquiry}
                disabled={accessory.stockStatus === 'sold-out'}
              >
                {added
                  ? 'Added to enquiry ✓'
                  : accessory.stockStatus === 'sold-out'
                    ? 'Sold out'
                    : 'Add to enquiry cart'}
              </Button>
              <ButtonLink to="/shop/enquiry" variant="secondary" size="lg">
                View enquiry cart
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
