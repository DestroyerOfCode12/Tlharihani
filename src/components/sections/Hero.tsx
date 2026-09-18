import { motion } from 'framer-motion'
import { Logo } from '../layout/Logo'
import { ButtonLink } from '../ui/ButtonLink'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section className="bg-ink relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-16 text-center sm:px-8">
      <img
        src="/images/hero/home-hero.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="from-ink via-ink/70 to-ink/40 absolute inset-0 bg-gradient-to-t" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-8">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo withRingAnimation className="h-24 w-auto sm:h-32" />
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.7,
            delay: prefersReducedMotion ? 0 : 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col gap-5"
        >
          <p className="label-caps text-accent">Concierge on the go</p>
          <h1 className="font-display text-4xl leading-[1.08] text-balance sm:text-6xl">
            We bring the phone, the device, or the car to you.
          </h1>
          <p className="text-grey-200 mx-auto max-w-xl text-base text-balance sm:text-lg">
            Gadgets & Travels has sold phones and rented out devices and cars across South Africa
            since 2010 — delivered to your door, wherever you are, with a concierge who handles the
            details.
          </p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.7,
            delay: prefersReducedMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <ButtonLink to="/shop" variant="primary" size="lg">
            Shop Phones
          </ButtonLink>
          <ButtonLink to="/rentals" variant="secondary" size="lg">
            Rent Now
          </ButtonLink>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 1, duration: 0.6 }}
        className="absolute bottom-8 hidden flex-col items-center gap-2 sm:flex"
        aria-hidden="true"
      >
        <span className="label-caps text-grey-400">Scroll</span>
        <span className="bg-hairline-strong h-10 w-px" />
      </motion.div>
    </section>
  )
}
