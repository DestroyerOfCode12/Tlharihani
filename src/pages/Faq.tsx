import { useId, useState } from 'react'
import { Seo } from '../components/Seo'
import { Section } from '../components/ui/Section'
import { faqs } from '../data/faqs'
import { faqPageJsonLd } from '../lib/structured-data'

function AccordionItem({
  question,
  answer,
  needsConfirmation,
  open,
  onToggle,
}: {
  question: string
  answer: string
  needsConfirmation: boolean
  open: boolean
  onToggle: () => void
}) {
  const id = useId()

  return (
    <div className="border-hairline border-b">
      <h3>
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="font-display text-lg sm:text-xl">{question}</span>
          <span
            aria-hidden="true"
            className={`border-hairline-strong flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform ${
              open ? 'rotate-45' : ''
            }`}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        hidden={!open}
        className="text-grey-300 pb-5 text-sm leading-relaxed"
      >
        <p>
          {answer}
          {needsConfirmation ? (
            <span className="label-caps text-accent ml-2">[to be confirmed by the team]</span>
          ) : null}
        </p>
      </div>
    </div>
  )
}

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers to common questions about renting, deposits, documents, delivery, lay buy, warranties, payment and appointments at Gadgets & Travels."
        path="/faq"
        jsonLd={faqPageJsonLd(faqs)}
      />

      <Section tone="ink" className="pt-14 sm:pt-20">
        <p className="label-caps text-accent">FAQ</p>
        <h1 className="font-display mt-3 text-4xl sm:text-5xl">Frequently asked questions</h1>
        <p className="text-grey-300 mt-4 max-w-xl text-sm">
          Can&apos;t find what you&apos;re looking for?{' '}
          <a href="/contact" className="underline underline-offset-2">
            Get in touch
          </a>{' '}
          and we&apos;ll answer personally.
        </p>

        <div className="mt-10 max-w-3xl">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              needsConfirmation={faq.needsConfirmation}
              open={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </Section>
    </>
  )
}
