import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Section } from '../components/ui/Section'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { ButtonLink } from '../components/ui/ButtonLink'
import { Select } from '../components/ui/Select'
import { findPhoneBySlug } from '../lib/catalog'
import { formatCurrency } from '../lib/format'
import { useEnquiryCart } from '../context/EnquiryCartContext'
import { trackEvent } from '../lib/analytics'
import { productJsonLd } from '../lib/structured-data'

const conditionLabel: Record<string, string> = {
  new: 'New',
  used: 'Used',
}
const stockLabel: Record<string, { text: string; tone: 'accent' | 'warning' | 'danger' }> = {
  'in-stock': { text: 'In stock', tone: 'accent' },
  'low-stock': { text: 'Low stock', tone: 'warning' },
  'sold-out': { text: 'Sold out', tone: 'danger' },
  'pre-order': { text: 'Pre-order', tone: 'warning' },
}

export default function PhoneDetail() {
  const { slug } = useParams<{ slug: string }>()
  const phone = slug ? findPhoneBySlug(slug) : undefined
  const { addItem } = useEnquiryCart()

  const [activeImage, setActiveImage] = useState(0)
  const [storage, setStorage] = useState(phone?.storageOptions[0] ?? '')
  const [color, setColor] = useState(phone?.colorOptions[0] ?? '')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (phone) trackEvent('product_viewed', { slug: phone.slug, type: 'phone' })
  }, [phone])

  if (!phone) return <Navigate to="/shop" replace />

  const stock = stockLabel[phone.stockStatus]

  function handleAddToEnquiry() {
    if (!phone) return
    addItem({
      id: phone.id,
      name: `${phone.brand} ${phone.model}`,
      slug: phone.slug,
      type: 'phone',
      price: phone.price,
      quantity: 1,
      storage,
      color,
    })
    setAdded(true)
    trackEvent('enquiry_submitted', { step: 'add_to_cart', slug: phone.slug })
    window.setTimeout(() => setAdded(false), 2500)
  }

  return (
    <>
      <Seo
        title={`${phone.brand} ${phone.model}`}
        description={phone.description}
        path={`/shop/phones/${phone.slug}`}
        image={phone.images[0]}
        jsonLd={productJsonLd(phone, window.location.origin)}
      />

      <Section tone="ink" className="pt-14 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="border-hairline bg-ink-soft aspect-[3/4] overflow-hidden rounded-lg border">
              <img
                src={phone.images[activeImage]}
                alt={`${phone.brand} ${phone.model}`}
                width={900}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            {phone.images.length > 1 ? (
              <div className="flex gap-3">
                {phone.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View image ${index + 1}`}
                    aria-current={activeImage === index}
                    className={`h-16 w-16 overflow-hidden rounded-md border ${
                      activeImage === index ? 'border-accent' : 'border-hairline'
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              {phone.isSpecial ? <Badge tone="accent">Special</Badge> : null}
              <Badge tone="neutral">{conditionLabel[phone.condition]}</Badge>
              <Badge tone={stock.tone}>{stock.text}</Badge>
            </div>

            <div>
              <p className="label-caps text-grey-400">{phone.brand}</p>
              <h1 className="font-display mt-2 text-4xl">{phone.model}</h1>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold">{formatCurrency(phone.price)}</span>
              {phone.compareAtPrice ? (
                <span className="text-grey-400 text-lg line-through">
                  {formatCurrency(phone.compareAtPrice)}
                </span>
              ) : null}
            </div>

            <p className="text-grey-200 text-sm leading-relaxed">{phone.description}</p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="storage-select" className="label-caps text-grey-400 mb-2 block">
                  Storage
                </label>
                <Select
                  id="storage-select"
                  value={storage}
                  onChange={(event) => setStorage(event.target.value)}
                >
                  {phone.storageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label htmlFor="color-select" className="label-caps text-grey-400 mb-2 block">
                  Colour
                </label>
                <Select
                  id="color-select"
                  value={color}
                  onChange={(event) => setColor(event.target.value)}
                >
                  {phone.colorOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <dl className="border-hairline grid grid-cols-2 gap-x-6 gap-y-3 border-t pt-6 text-sm">
              {phone.batteryHealth ? (
                <div>
                  <dt className="text-grey-400">Battery health</dt>
                  <dd className="text-paper">{phone.batteryHealth}%</dd>
                </div>
              ) : null}
              <div>
                <dt className="text-grey-400">Warranty</dt>
                <dd className="text-paper">
                  {phone.warrantyMonths > 0 ? `${phone.warrantyMonths} months` : 'Sold as-is'}
                </dd>
              </div>
              {Object.entries(phone.specs).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-grey-400">{key}</dt>
                  <dd className="text-paper">{value}</dd>
                </div>
              ))}
            </dl>

            {phone.layBuyAvailable ? (
              <p className="text-accent text-sm">
                Lay buy available on this phone.{' '}
                <a href="/terms" className="underline underline-offset-2">
                  See lay buy terms
                </a>
                .
              </p>
            ) : null}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToEnquiry}
                disabled={phone.stockStatus === 'sold-out'}
              >
                {added
                  ? 'Added to enquiry ✓'
                  : phone.stockStatus === 'sold-out'
                    ? 'Currently sold out'
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
