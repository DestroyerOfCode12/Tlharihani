import { Seo } from '../components/Seo'
import { Section } from '../components/ui/Section'
import { ButtonLink } from '../components/ui/ButtonLink'
import { Logo } from '../components/layout/Logo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="This page could not be found." path="/404" noindex />
      <Section
        tone="ink"
        className="flex min-h-[80vh] flex-col items-center justify-center text-center"
      >
        <Logo className="h-16 w-auto opacity-70" />
        <p className="label-caps text-accent mt-8">404</p>
        <h1 className="font-display mt-3 text-4xl sm:text-5xl">This page has wandered off</h1>
        <p className="text-grey-300 mt-4 max-w-md text-sm">
          The page you&apos;re looking for doesn&apos;t exist, may have moved, or the link might be
          out of date. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/" variant="primary" size="lg">
            Back home
          </ButtonLink>
          <ButtonLink to="/contact" variant="secondary" size="lg">
            Contact us
          </ButtonLink>
        </div>
      </Section>
    </>
  )
}
