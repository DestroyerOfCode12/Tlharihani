import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Section } from '../components/ui/Section'
import { Select } from '../components/ui/Select'
import { Checkbox } from '../components/ui/Checkbox'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { CardSkeleton } from '../components/ui/Skeleton'
import { PhoneCard } from '../components/sections/PhoneCard'
import { AccessoryCard } from '../components/sections/AccessoryCard'
import { phones, accessories } from '../data/phones'
import { uniqueBrands, sortItems, type SortOption } from '../lib/catalog'
import type { Condition } from '../schemas/catalog'
import { useEffectAfterMount } from '../hooks/useEffectAfterMount'

type ShopTab = 'phones' | 'accessories'

const conditionOptions: { value: Condition; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'refurbished', label: 'Refurbished' },
]

const priceBins = [
  { value: 'any', label: 'Any price' },
  { value: '0-8000', label: 'Under R8,000' },
  { value: '8000-15000', label: 'R8,000 – R15,000' },
  { value: '15000-25000', label: 'R15,000 – R25,000' },
  { value: '25000-999999', label: 'R25,000+' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [tab, setTab] = useState<ShopTab>((searchParams.get('tab') as ShopTab) || 'phones')
  const [loading, setLoading] = useState(true)
  const [brands, setBrands] = useState<string[]>([])
  const [conditions, setConditions] = useState<Condition[]>([])
  const [storage, setStorage] = useState<string[]>([])
  const [priceBin, setPriceBin] = useState('any')
  const [sort, setSort] = useState<SortOption>('featured')

  useEffectAfterMount(() => {
    setSearchParams(tab === 'phones' ? {} : { tab }, { replace: true })
  }, [tab])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(timer)
  }, [])

  const items = tab === 'phones' ? phones : accessories
  const availableBrands = useMemo(() => uniqueBrands(items), [items])
  const storageOptions = useMemo(
    () => Array.from(new Set(phones.flatMap((phone) => phone.storageOptions))).sort(),
    [],
  )

  function toggle<T>(list: T[], value: T, setter: (next: T[]) => void) {
    setter(list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value])
  }

  const filtered = useMemo(() => {
    const [min, max] = priceBin === 'any' ? [0, Infinity] : priceBin.split('-').map(Number)

    const base = items.filter((item) => {
      if (brands.length && !brands.includes(item.brand)) return false
      if (conditions.length && !conditions.includes(item.condition)) return false
      if (item.price < min || item.price > max) return false
      if (tab === 'phones' && storage.length) {
        const phone = item as (typeof phones)[number]
        if (!phone.storageOptions.some((option) => storage.includes(option))) return false
      }
      return true
    })

    return sortItems(base, sort)
  }, [items, brands, conditions, storage, priceBin, sort, tab])

  function clearFilters() {
    setBrands([])
    setConditions([])
    setStorage([])
    setPriceBin('any')
  }

  const hasActiveFilters =
    brands.length > 0 || conditions.length > 0 || storage.length > 0 || priceBin !== 'any'

  return (
    <>
      <Seo
        title="Shop Phones & Accessories"
        description="New, used and refurbished phones, plus accessories, all with clear pricing, condition and warranty details. Enquire to buy — no card checkout required."
        path="/shop"
      />

      <Section tone="ink" className="pt-14 pb-6 sm:pt-20">
        <p className="label-caps text-accent">Shop</p>
        <h1 className="font-display mt-3 text-4xl sm:text-5xl">Phones & accessories</h1>
        <p className="text-grey-300 mt-4 max-w-xl text-sm">
          Every listing shows condition, storage and warranty upfront. Add what you like to your
          enquiry cart and we&apos;ll confirm stock and next steps.
        </p>

        <div
          className="border-hairline mt-8 flex gap-2 border-b"
          role="tablist"
          aria-label="Shop category"
        >
          {(['phones', 'accessories'] as const).map((value) => (
            <button
              key={value}
              role="tab"
              aria-selected={tab === value}
              onClick={() => setTab(value)}
              className={`label-caps -mb-px border-b-2 px-4 py-3 transition-colors ${
                tab === value
                  ? 'border-accent text-paper'
                  : 'text-grey-400 hover:text-paper border-transparent'
              }`}
            >
              {value === 'phones' ? 'Phones' : 'Accessories'}
            </button>
          ))}
        </div>
      </Section>

      <Section tone="ink" className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside aria-label="Filters" className="flex flex-col gap-8">
            <div>
              <h2 className="label-caps text-grey-400 mb-3">Sort by</h2>
              <Select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to high</option>
                <option value="price-desc">Price: High to low</option>
                <option value="newest">Newest</option>
              </Select>
            </div>

            <div>
              <h2 className="label-caps text-grey-400 mb-3">Price</h2>
              <Select
                value={priceBin}
                onChange={(event) => setPriceBin(event.target.value)}
                aria-label="Filter by price"
              >
                {priceBins.map((bin) => (
                  <option key={bin.value} value={bin.value}>
                    {bin.label}
                  </option>
                ))}
              </Select>
            </div>

            <fieldset>
              <legend className="label-caps text-grey-400 mb-3">Brand</legend>
              <div className="flex flex-col gap-2.5">
                {availableBrands.map((brand) => (
                  <Checkbox
                    key={brand}
                    id={`brand-${brand}`}
                    label={brand}
                    checked={brands.includes(brand)}
                    onChange={() => toggle(brands, brand, setBrands)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="label-caps text-grey-400 mb-3">Condition</legend>
              <div className="flex flex-col gap-2.5">
                {conditionOptions.map((option) => (
                  <Checkbox
                    key={option.value}
                    id={`condition-${option.value}`}
                    label={option.label}
                    checked={conditions.includes(option.value)}
                    onChange={() => toggle(conditions, option.value, setConditions)}
                  />
                ))}
              </div>
            </fieldset>

            {tab === 'phones' ? (
              <fieldset>
                <legend className="label-caps text-grey-400 mb-3">Storage</legend>
                <div className="flex flex-col gap-2.5">
                  {storageOptions.map((option) => (
                    <Checkbox
                      key={option}
                      id={`storage-${option}`}
                      label={option}
                      checked={storage.includes(option)}
                      onChange={() => toggle(storage, option, setStorage)}
                    />
                  ))}
                </div>
              </fieldset>
            ) : null}

            {hasActiveFilters ? (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="w-fit">
                Clear filters
              </Button>
            ) : null}
          </aside>

          <div>
            {loading ? (
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                title="No matches yet"
                description="Try widening your filters, or message us — we may have exactly what you're after in stock but not yet listed."
              />
            ) : (
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                {filtered.map((item) =>
                  tab === 'phones' ? (
                    <PhoneCard key={item.id} phone={item as (typeof phones)[number]} />
                  ) : (
                    <AccessoryCard key={item.id} accessory={item as (typeof accessories)[number]} />
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
