import { Link, useParams } from 'react-router'
import { Calculator, Check, Clock, Wallet } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { SERVICES, getService } from '../data/services'
import { getProject } from '../data/projects'
import { CtaBand, Img, PageHeader, SectionHeading, Seo } from '../components/ui'
import { ProjectCard } from '../components/cards'
import { Faq } from '../components/sections'
import { ServiceIcon } from '../components/ServiceIcon'
import { NotFoundPage } from './NotFoundPage'

/** Podstrona pojedynczej usługi – /pl/uslugi/{slug}. */
export function ServicePage() {
  const { slug } = useParams()
  const { t, l, path, formatPrice } = useI18n()
  const service = getService(slug)
  if (!service) return <NotFoundPage message={t.service.notFound} />

  const title = l(service.title)
  const related = service.related.map(getProject).filter((p) => p !== undefined)
  const others = SERVICES.filter((s) => s.id !== service.id)

  return (
    <>
      <Seo title={title} description={l(service.lead)} />
      <PageHeader
        eyebrow={t.nav.offer}
        title={title}
        lead={l(service.lead)}
        crumbs={[{ label: t.nav.offer, to: path('offer') }, { label: title }]}
      />

      <div className="container-x grid gap-12 py-14 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          <Img name={service.image} alt="" priority className="aspect-[16/9] w-full" />

          <section aria-labelledby="for-whom">
            <h2 id="for-whom" className="text-2xl font-bold">
              {t.service.forWhom}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-ink-2">{l(service.forWhom)}</p>
          </section>

          <section aria-labelledby="scope">
            <h2 id="scope" className="text-2xl font-bold">
              {t.service.scope}
            </h2>
            <ul className="mt-4 space-y-3">
              {l(service.scope).map((item) => (
                <li key={item} className="flex gap-3 text-lg text-ink-2">
                  <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brass" /> {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="steps">
            <h2 id="steps" className="text-2xl font-bold">
              {t.service.steps}
            </h2>
            <ol className="mt-5 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
              {l(service.steps).map((step, i) => (
                <li key={step} className="flex items-start gap-4 bg-paper p-5">
                  <span className="text-3xl font-extrabold text-brass" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="pt-1.5 font-semibold">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="service-faq">
            <h2 id="service-faq" className="mb-4 text-2xl font-bold">
              {t.service.faq}
            </h2>
            <Faq items={service.faq} />
            <Link to={path('faq')} className="link mt-4 inline-block">
              {t.offer.faqMore}
            </Link>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="on-dark sticky top-28 space-y-6 bg-ink p-7 text-paper">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-ink-2 text-brass-light">
              <ServiceIcon name={service.icon} className="h-6 w-6" />
            </span>
            <dl className="space-y-5">
              <div>
                <dt className="flex items-center gap-2 text-sm text-paper/70">
                  <Wallet aria-hidden="true" className="h-4 w-4" /> {t.service.price}
                </dt>
                <dd className="mt-1 text-2xl font-extrabold">
                  {service.rate ? `${formatPrice(service.rate.min)} – ${formatPrice(service.rate.max)}` : l(service.priceNote)}
                </dd>
                {service.rate && <dd className="text-sm text-paper/75">{l(service.priceNote)}</dd>}
              </div>
              <div>
                <dt className="flex items-center gap-2 text-sm text-paper/70">
                  <Clock aria-hidden="true" className="h-4 w-4" /> {t.service.duration}
                </dt>
                <dd className="mt-1 text-lg font-bold">{l(service.duration)}</dd>
              </div>
              <div className="border-t border-paper/15 pt-5">
                <dt className="text-sm text-paper/70">{t.service.example}</dt>
                <dd className="mt-1 leading-relaxed">{l(service.priceExample)}</dd>
              </div>
            </dl>
            <p className="text-xs text-paper/65">{t.common.netPrices}</p>
            <div className="flex flex-col gap-3">
              <Link to={`${path('contact')}?type=${service.id}`} className="btn-light">
                {t.service.ask}
              </Link>
              {service.rate && (
                <Link to={`${path('offer')}#kalkulator`} className="btn-outline-light">
                  <Calculator aria-hidden="true" className="h-4 w-4" /> {t.service.calc}
                </Link>
              )}
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-sand/60 py-16" aria-labelledby="related">
          <div className="container-x">
            <SectionHeading id="related" title={t.service.related} />
            <ul className="grid gap-10 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <nav className="container-x py-16" aria-labelledby="others">
        <h2 id="others" className="mb-6 text-2xl font-bold">
          {t.service.other}
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s) => (
            <li key={s.id}>
              <Link to={path('offer', s.slug)} className="flex items-center gap-3 border border-line bg-white p-4 font-semibold hover:border-ink hover:text-brass">
                <ServiceIcon name={s.icon} className="h-5 w-5 shrink-0 text-brass" />
                {l(s.title)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <CtaBand title={t.project.ctaTitle} text={t.project.ctaText} />
    </>
  )
}
