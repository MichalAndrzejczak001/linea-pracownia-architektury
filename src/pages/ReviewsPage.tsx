import { Link, useSearchParams } from 'react-router'
import { Star } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { TESTIMONIALS } from '../data/people'
import { serviceById, type ServiceId } from '../data/services'
import { COMPANY } from '../data/company'
import { CtaBand, PageHeader, Seo } from '../components/ui'
import { TestimonialCard } from '../components/cards'

/** /pl/opinie – wszystkie opinie z filtrem według usługi. */
export function ReviewsPage() {
  const { t, l, path, formatNumber } = useI18n()
  const [params, setParams] = useSearchParams()
  const services = [...new Set(TESTIMONIALS.map((r) => r.service))]
  const raw = params.get('service') ?? 'all'
  const active = (services as string[]).includes(raw) ? (raw as ServiceId) : 'all'
  const list = TESTIMONIALS.filter((r) => active === 'all' || r.service === active).sort((a, b) => b.date.localeCompare(a.date))
  const avg = TESTIMONIALS.reduce((s, r) => s + r.rating, 0) / TESTIMONIALS.length

  const chip = (on: boolean) => `rounded-full border px-4 py-2 text-sm font-semibold ${on ? 'border-ink bg-ink text-paper' : 'border-line bg-white hover:border-ink'}`

  return (
    <>
      <Seo title={t.reviews.title} description={t.reviews.description} />
      <PageHeader eyebrow={t.reviews.eyebrow} title={t.reviews.title} lead={t.reviews.lead} crumbs={[{ label: t.nav.about, to: path('studio') }, { label: t.reviews.title }]} />
      <div className="container-x py-12">
        <dl className="mb-10 flex flex-wrap gap-10 border-b border-line pb-8">
          <div>
            <dt className="text-sm text-muted">{t.reviews.average}</dt>
            <dd className="mt-1 flex items-center gap-2 text-4xl font-extrabold">
              {formatNumber(Math.round(avg * 10) / 10)}
              <span className="flex" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-5 w-5 fill-brass text-brass" />
                ))}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">{t.reviews.count}</dt>
            <dd className="mt-1 text-4xl font-extrabold">{TESTIMONIALS.length}</dd>
          </div>
        </dl>

        <div role="group" aria-label={t.reviews.filterLabel} className="mb-10 flex flex-wrap gap-2">
          <button type="button" aria-pressed={active === 'all'} className={chip(active === 'all')} onClick={() => setParams({}, { replace: true, preventScrollReset: true })}>
            {t.reviews.all}
          </button>
          {services.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={active === id}
              className={chip(active === id)}
              onClick={() => setParams({ service: id }, { replace: true, preventScrollReset: true })}
            >
              {l(serviceById(id).title)}
            </button>
          ))}
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {list.map((r) => (
            <li key={r.author} className="flex flex-col">
              <TestimonialCard item={r} />
              <p className="mt-2 flex flex-wrap gap-x-4 text-sm">
                <Link to={path('offer', serviceById(r.service).slug)} className="link">
                  {l(serviceById(r.service).title)}
                </Link>
                {r.project && (
                  <Link to={path('projects', r.project)} className="link">
                    {t.reviews.seeProject}
                  </Link>
                )}
              </p>
            </li>
          ))}
        </ul>

        <aside className="mt-14 border border-brass/40 bg-brass/5 p-8" aria-labelledby="add-review">
          <h2 id="add-review" className="text-2xl font-bold">
            {t.reviews.addTitle}
          </h2>
          <p className="mt-2 text-muted">
            {t.reviews.addText}{' '}
            <a href={`mailto:${COMPANY.email}`} className="link">
              {COMPANY.email}
            </a>
          </p>
        </aside>
      </div>
      <CtaBand title={t.home.finalTitle} text={t.home.finalLead} />
    </>
  )
}
