import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { EnquiryItem } from '../schemas/forms'

const STORAGE_KEY = 'gt-enquiry-cart'

interface EnquiryCartContextValue {
  items: EnquiryItem[]
  addItem: (item: EnquiryItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clear: () => void
  count: number
  subtotal: number
}

const EnquiryCartContext = createContext<EnquiryCartContextValue | null>(null)

function readStoredItems(): EnquiryItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as EnquiryItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function EnquiryCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<EnquiryItem[]>(() =>
    typeof window === 'undefined' ? [] : readStoredItems(),
  )

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Storage unavailable — cart still works for the current page session.
    }
  }, [items])

  const addItem = useCallback((item: EnquiryItem) => {
    setItems((current) => {
      const existingIndex = current.findIndex(
        (entry) =>
          entry.id === item.id && entry.storage === item.storage && entry.color === item.color,
      )
      if (existingIndex >= 0) {
        const next = [...current]
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: Math.min(10, next[existingIndex].quantity + item.quantity),
        }
        return next
      }
      return [...current, item]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((entry) => entry.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, quantity: Math.max(1, Math.min(10, quantity)) } : entry,
      ),
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clear, count, subtotal }),
    [items, addItem, removeItem, updateQuantity, clear, count, subtotal],
  )

  return <EnquiryCartContext.Provider value={value}>{children}</EnquiryCartContext.Provider>
}

export function useEnquiryCart(): EnquiryCartContextValue {
  const context = useContext(EnquiryCartContext)
  if (!context) throw new Error('useEnquiryCart must be used within EnquiryCartProvider')
  return context
}
