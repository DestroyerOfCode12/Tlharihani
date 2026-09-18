import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { EnquiryCartProvider } from './context/EnquiryCartContext'
import { PageLoader } from './components/PageLoader'

const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const PhoneDetail = lazy(() => import('./pages/PhoneDetail'))
const AccessoryDetail = lazy(() => import('./pages/AccessoryDetail'))
const EnquiryCart = lazy(() => import('./pages/EnquiryCart'))
const EnquiryConfirmation = lazy(() => import('./pages/EnquiryConfirmation'))
const Rentals = lazy(() => import('./pages/Rentals'))
const RentalDetail = lazy(() => import('./pages/RentalDetail'))
const BookingConfirmation = lazy(() => import('./pages/BookingConfirmation'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Faq = lazy(() => import('./pages/Faq'))
const Terms = lazy(() => import('./pages/Terms'))
const ReturnsWarranty = lazy(() => import('./pages/ReturnsWarranty'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const CookieNotice = lazy(() => import('./pages/CookieNotice'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <BrowserRouter>
      <EnquiryCartProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="shop/phones/:slug" element={<PhoneDetail />} />
              <Route path="shop/accessories/:slug" element={<AccessoryDetail />} />
              <Route path="shop/enquiry" element={<EnquiryCart />} />
              <Route path="shop/enquiry/confirmation" element={<EnquiryConfirmation />} />
              <Route path="rentals" element={<Rentals />} />
              <Route path="rentals/:slug" element={<RentalDetail />} />
              <Route path="rentals/:slug/confirmation" element={<BookingConfirmation />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faq" element={<Faq />} />
              <Route path="terms" element={<Terms />} />
              <Route path="returns-warranty" element={<ReturnsWarranty />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="cookie-notice" element={<CookieNotice />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </EnquiryCartProvider>
    </BrowserRouter>
  )
}

export default App
