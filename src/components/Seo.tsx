import { useEffect } from 'react'
import { siteConfig } from '../data/site-config'

interface SeoProps {
  title: string
  description: string
  path: string
  image?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  noindex?: boolean
}

const SITE_NAME = siteConfig.businessName
const DEFAULT_IMAGE = '/og-default.jpg'

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLinkTag(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Sets per-page title, meta description, OG/Twitter tags, canonical link and JSON-LD. */
export function Seo({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  jsonLd,
  noindex = false,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`
    document.title = fullTitle

    const origin = window.location.origin
    const url = `${origin}${path}`
    const absoluteImage = image.startsWith('http') ? image : `${origin}${image}`

    setMetaTag('name', 'description', description)
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setLinkTag('canonical', url)

    setMetaTag('property', 'og:title', fullTitle)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:url', url)
    setMetaTag('property', 'og:image', absoluteImage)
    setMetaTag('property', 'og:site_name', SITE_NAME)

    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', fullTitle)
    setMetaTag('name', 'twitter:description', description)
    setMetaTag('name', 'twitter:image', absoluteImage)

    const scriptId = 'seo-json-ld'
    document.getElementById(scriptId)?.remove()
    if (jsonLd) {
      const script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
  }, [title, description, path, image, jsonLd, noindex])

  return null
}
