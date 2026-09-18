import { discountCodeSchema, type DiscountCode } from '../schemas/catalog'

const rawDiscounts: DiscountCode[] = [
  {
    code: 'WELCOME10',
    label: 'Welcome: 10% off your first enquiry',
    percentOff: 10,
    active: true,
  },
]

export const discountCodes: DiscountCode[] = rawDiscounts.map((discount) =>
  discountCodeSchema.parse(discount),
)

export function findDiscountCode(code: string): DiscountCode | undefined {
  const normalized = code.trim().toUpperCase()
  return discountCodes.find((discount) => discount.active && discount.code === normalized)
}
