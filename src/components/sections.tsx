import { Link } from 'react-router'
import { ArrowRight, Plus } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import type { Localized } from '../i18n/types'
import { PROCESS, SERVICES, type Service } from '../data/services'
import { FAQ } from '../data/people'
import { Reveal } from './ui'
import { ServiceIcon } from './ServiceIcon'

export function ProcessSteps() {
  const { l } = useI18n()
  return (
    <ol className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {PROCESS.map((step, i) => (
        <Reveal as="li" key={i} delay={i * 60} className="flex flex-col bg-paper p-7">
          <span className="text-4xl font-extrabold text-brass" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-4 text-lg font-bold">{l(step.title)}</h3>
          <p className="mt-2 flex-1 leading-relaxed text-muted">{l(step.text)}</p>
          <p className="mt-4 text-sm font-semibold text-ink-2">{l(step.time)}</p>
        </Reveal>
      ))}
    </ol>
  )
}

/** Lista pytań i odpowiedzi (<details> – działa bez JavaScriptu i z klawiatury). */
export function Faq({ items = FAQ }: { items?: { q: Localized; a: Localized }[] }) {
  const { l } = useI18n()
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q.pl} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
            {l(item.q)}
            <Plus aria-hidden="true" className="h-5 w-5 shrink-0 text-brass transition-transform group-open:rotate-45" />
          </summary>
          <p className="max-w-3xl pb-5 leading-relaxed text-ink-2">{l(item.a)}</p>
        </details>
      ))}
    </div>
  )
}

/** Karta usługi z ceną „od” – na stronie głównej i w przeglądzie usług. */
export function ServiceCard({ service, headingLevel = 3 }: { service: Service; headingLevel?: 2 | 3 }) {
  const { t, l, path, formatPrice } = useI18n()
  const H = headingLevel === 2 ? 'h2' : 'h3'
  const price = service.rate ? `${t.common.from} ${formatPrice(service.rate.min)} / m²` : l(service.priceNote).split(' (')[0].split(' · ')[0]
  return (
    <article className="group relative flex h-full flex-col border border-line bg-white p-6 transition-colors hover:border-ink">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-sand text-brass">
        <ServiceIcon name={service.icon} className="h-6 w-6" />
      </span>
      <H className="mt-5 text-lg font-bold leading-snug">
        <Link to={path('offer', service.slug)} className="after:absolute after:inset-0 group-hover:text-brass">
          {l(service.title)}
        </Link>
      </H>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{l(service.short)}</p>
      <p className="mt-4 text-sm">
        <span className="font-bold text-brass">{price}</span>
        <span className="text-muted"> · {l(service.duration)}</span>
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold" aria-hidden="true">
        {t.offer.details} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </article>
  )
}

export function ServiceGrid({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {SERVICES.map((s, i) => (
        <Reveal as="li" key={s.id} delay={i * 50}>
          <ServiceCard service={s} headingLevel={headingLevel} />
        </Reveal>
      ))}
    </ul>
  )
}
