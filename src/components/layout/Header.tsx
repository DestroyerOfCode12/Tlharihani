import { useEffect, useState } from 'react'
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Logo } from './Logo'
import { primaryNavLinks } from './nav-links'
import { ButtonLink } from '../ui/ButtonLink'
import { useEnquiryCart } from '../../context/EnquiryCartContext'
import { cn } from '../../lib/cn'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { count } = useEnquiryCart()
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b transition-all duration-300',
        scrolled
          ? 'border-hairline bg-ink/92 backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 sm:px-8',
          scrolled ? 'py-3' : 'py-5 sm:py-7',
        )}
      >
        <Logo
          className={cn('w-auto transition-all duration-300', scrolled ? 'h-8' : 'h-10 sm:h-12')}
        />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {primaryNavLinks.map((link) => (
            <RouterNavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'label-caps text-grey-300 hover:text-paper transition-colors',
                  isActive && 'text-paper',
                )
              }
            >
              {link.label}
            </RouterNavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink to="/rentals" variant="secondary" size="sm" className="hidden sm:inline-flex">
            Rent Now
          </ButtonLink>
          <RouterNavLink
            to="/shop/enquiry"
            aria-label={`Enquiry cart, ${count} item${count === 1 ? '' : 's'}`}
            className="border-hairline-strong text-paper hover:border-paper relative flex h-10 w-10 items-center justify-center rounded-full border"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M2 2h1.6l1.1 11.2A2 2 0 0 0 6.7 15h8.6a2 2 0 0 0 2-1.8L18 5.5H5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="18" r="1.2" fill="currentColor" />
              <circle cx="15" cy="18" r="1.2" fill="currentColor" />
            </svg>
            {count > 0 ? (
              <span className="bg-accent text-ink absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[0.62rem] font-semibold">
                {count}
              </span>
            ) : null}
          </RouterNavLink>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="border-hairline-strong text-paper flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
          >
            <span className="relative flex h-3.5 w-4 flex-col justify-between">
              <span
                className={cn(
                  'h-px w-full bg-current transition-transform',
                  menuOpen && 'translate-y-[6.5px] rotate-45',
                )}
              />
              <span
                className={cn('h-px w-full bg-current transition-opacity', menuOpen && 'opacity-0')}
              />
              <span
                className={cn(
                  'h-px w-full bg-current transition-transform',
                  menuOpen && '-translate-y-[6.5px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
            className="bg-ink fixed inset-0 top-0 z-30 flex h-dvh flex-col justify-between px-6 pt-24 pb-10 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {primaryNavLinks.map((link, index) => (
                <RouterNavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'border-hairline font-display border-b py-5 text-3xl transition-colors',
                      isActive ? 'text-accent' : 'text-paper',
                    )
                  }
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  {link.label}
                </RouterNavLink>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <ButtonLink to="/rentals" variant="primary" size="lg">
                Rent Now
              </ButtonLink>
              <ButtonLink to="/shop" variant="secondary" size="lg">
                Shop Phones
              </ButtonLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
