import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface LogoProps {
  variant?: 'white' | 'black'
  className?: string
  withRingAnimation?: boolean
}

/**
 * Brand mark. `withRingAnimation` draws the circular ring on first load only
 * (home hero) — everywhere else it renders static for performance.
 */
export function Logo({
  variant = 'white',
  className = 'h-10 w-auto',
  withRingAnimation = false,
}: LogoProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const src = variant === 'white' ? '/logo/logo-white.png' : '/logo/logo-black.png'

  if (!withRingAnimation || prefersReducedMotion) {
    return (
      <Link to="/" aria-label="Gadgets & Travels — home" className="inline-flex items-center">
        <img src={src} alt="Gadgets & Travels" className={className} width={160} height={120} />
      </Link>
    )
  }

  return (
    <Link
      to="/"
      aria-label="Gadgets & Travels — home"
      className="relative inline-flex items-center"
    >
      <img src={src} alt="Gadgets & Travels" className={className} width={160} height={120} />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 160 120"
        fill="none"
        aria-hidden="true"
      >
        <motion.ellipse
          cx="80"
          cy="60"
          rx="76"
          ry="56"
          stroke="#C9B99A"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0.9 }}
          animate={{ pathLength: 1, opacity: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </Link>
  )
}
