import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { motion as motionTokens } from '../../lib/tokens'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li'
}

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

// Fade-and-rise on scroll into view. No-ops under prefers-reduced-motion.
// Heads up if you're screenshotting with Playwright: a single fullPage capture
// resizes the viewport before whileInView ever fires, so these sections come back
// blank. Scroll incrementally first (see the smoke test script) or you'll think
// this is broken when it isn't.
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const MotionTag = as === 'li' ? motion.li : motion.div

  if (prefersReducedMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      transition={{ duration: motionTokens.duration.base, delay, ease: motionTokens.ease }}
    >
      {children}
    </MotionTag>
  )
}
