import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { buttonClasses, type ButtonSize, type ButtonVariant } from './button-styles'

interface InternalButtonLinkProps extends LinkProps {
  variant?: ButtonVariant
  size?: ButtonSize
}

/** For in-app navigation — renders a React Router Link styled as a button. */
export const ButtonLink = forwardRef<HTMLAnchorElement, InternalButtonLinkProps>(
  function ButtonLink({ variant = 'primary', size = 'md', className, ...rest }, ref) {
    return <Link ref={ref} className={buttonClasses(variant, size, className)} {...rest} />
  },
)

interface ExternalButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

/** For external links (WhatsApp, maps, mailto) — renders a plain anchor styled as a button. */
export const ExternalButtonLink = forwardRef<HTMLAnchorElement, ExternalButtonLinkProps>(
  function ExternalButtonLink({ variant = 'primary', size = 'md', className, ...rest }, ref) {
    return <a ref={ref} className={buttonClasses(variant, size, className)} {...rest} />
  },
)
