import { Seo } from '../components/Seo'
import { Hero } from '../components/sections/Hero'
import { ShopRentalsSplit } from '../components/sections/ShopRentalsSplit'
import { ConciergeSteps } from '../components/sections/ConciergeSteps'
import { FeaturedPhones, FeaturedRentals } from '../components/sections/FeaturedCarousels'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'
import { TrustStrip } from '../components/sections/TrustStrip'
import { ClosingCta } from '../components/sections/ClosingCta'
import { localBusinessJsonLd } from '../lib/structured-data'

export default function Home() {
  return (
    <>
      <Seo
        title="Concierge On The Go"
        description="Gadgets & Travels sells phones and rents devices and cars across South Africa, delivered to you. Sandton hub, appointment only, trusted since 2010."
        path="/"
        jsonLd={localBusinessJsonLd(window.location.origin)}
      />
      <Hero />
      <ShopRentalsSplit />
      <ConciergeSteps />
      <FeaturedPhones />
      <FeaturedRentals />
      <TestimonialsSection />
      <TrustStrip />
      <ClosingCta />
    </>
  )
}
