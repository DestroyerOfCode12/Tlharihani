import { featureFlags } from '../../data/site-config'

export interface NavLink {
  label: string
  to: string
}

export const primaryNavLinks: NavLink[] = [
  { label: 'Shop', to: '/shop' },
  ...(featureFlags.rentalsAsShopTab ? [] : [{ label: 'Rentals', to: '/rentals' }]),
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
]
