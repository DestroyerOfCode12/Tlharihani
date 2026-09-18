import { buildWhatsAppLink } from '../../data/site-config'
import { trackEvent } from '../../lib/analytics'

interface WhatsAppButtonProps {
  message?: string
  floating?: boolean
}

const defaultMessage =
  "Hi Gadgets & Travels! I'd like to find out more about your phones and rentals."

export function WhatsAppButton({ message = defaultMessage, floating = true }: WhatsAppButtonProps) {
  const href = buildWhatsAppLink(message)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent('whatsapp_click', { source: floating ? 'floating-button' : 'inline' })
      }
      aria-label="Chat with us on WhatsApp"
      className={
        floating
          ? 'text-ink shadow-lift fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] transition-transform hover:scale-105 focus-visible:scale-105 sm:right-8 sm:bottom-8'
          : 'text-ink inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] transition-transform hover:scale-105'
      }
    >
      <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.02 2.67C8.6 2.67 2.6 8.67 2.6 16.08c0 2.5.68 4.83 1.86 6.84L2.67 29.33l6.59-1.73a13.35 13.35 0 0 0 6.76 1.83h.01c7.41 0 13.41-6 13.41-13.41 0-7.42-6-13.35-13.42-13.35Zm0 24.4h-.01a11.1 11.1 0 0 1-5.65-1.55l-.41-.24-4.03 1.06 1.08-3.93-.26-.4a11.03 11.03 0 0 1-1.7-5.93c0-6.13 5-11.13 11.16-11.13 2.98 0 5.78 1.16 7.89 3.27a11.06 11.06 0 0 1 3.26 7.88c0 6.14-5 11.13-11.33 11.97Zm6.1-8.34c-.33-.17-1.96-.97-2.27-1.08-.3-.11-.53-.17-.75.17-.22.33-.86 1.08-1.06 1.3-.19.22-.39.25-.72.08-.33-.17-1.4-.52-2.66-1.65a9.98 9.98 0 0 1-1.84-2.29c-.19-.33-.02-.51.15-.68.15-.15.33-.39.5-.58.16-.2.22-.33.33-.55.11-.22.06-.42-.03-.58-.08-.17-.75-1.8-1.02-2.47-.27-.65-.55-.56-.75-.57h-.64c-.22 0-.58.08-.88.42-.3.33-1.15 1.13-1.15 2.75s1.18 3.19 1.34 3.41c.17.22 2.33 3.56 5.65 4.99.79.34 1.4.55 1.88.7.79.25 1.51.22 2.08.13.63-.1 1.96-.8 2.24-1.58.28-.77.28-1.43.19-1.57-.08-.14-.3-.22-.63-.39Z" />
      </svg>
    </a>
  )
}
