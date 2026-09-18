import { forwardRef } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { buttonClasses, type ButtonSize, type ButtonVariant } from './button-styles'

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant
  size?: ButtonSize
}

// External links (WhatsApp, maps) use a plain <a> with buttonClasses() directly
// instead of a wrapper component here, they're one-offs and didn't need it.
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { variant = 'primary', size = 'md', className, ...rest },
  ref,
) {
  return <Link ref={ref} className={buttonClasses(variant, size, className)} {...rest} />
})
