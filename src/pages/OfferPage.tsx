import { Link } from 'react-router'
import { useI18n } from '../i18n/LanguageContext'
import { SERVICES } from '../data/services'
import { FAQ } from '../data/people'
import { CtaBand, PageHeader, SectionHeading, Seo } from '../components/ui'
import { CostCalculator } from '../components/CostCalculator'
import { Faq, ProcessSteps, ServiceGrid } from '../components/sections'
import { ServiceIcon } from '../components/ServiceIcon'

/** Przegląd usług – /pl/uslugi. Każda usługa ma też własną podstronę. */
export function OfferPage() {
  const { t, l, path, formatPrice } = useI18n()

  return (
    <>
      <Seo title={t.offer.title} description={t.offer.description} />
      <PageHeader eyebrow={t.offer.eyebrow} title={t.offer.title} lead={t.offer.lead} crumbs={[{ label: t.nav.offer }]} />

      <section className="container-x py-16" aria-labelledby="services-list">
        <h2 id="services-list" className="mb-8 text-2xl font-bold">
          {t.offer.count}
        </h2>
        <ServiceGrid />
      </section>

      {/* Cennik zbiorczy – wszystkie ceny w jednym miejscu */}
      <section className="border-y border-line bg-white py-16" aria-labelledby="pricing">
        <div className="container-x">
          <SectionHeading id="pricing" eyebrow={t.offer.price} title={t.offer.pricingTitle} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">{t.offer.title}</caption>
              <thead>
                <tr className="border-b-2 border-ink text-sm">
                  <th scope="col" className="py-3 pr-4 font-bold">
                    {t.nav.offer}
                  </th>
                  <th scope="col" className="py-3 pr-4 font-bold">
                    {t.offer.price}
                  </th>
                  <th scope="col" className="py-3 font-bold">
                    {t.offer.duration}
                  </th>
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((s) => (
                  <tr key={s.id} className="border-b border-line">
                    <th scope="row" className="py-4 pr-4 font-semibold">
                      <Link to={path('offer', s.slug)} className="inline-flex items-center gap-3 hover:text-brass hover:underline">
                        <ServiceIcon name={s.icon} className="h-5 w-5 shrink-0 text-brass" />
                        {l(s.title)}
                      </Link>
                    </th>
                    <td className="py-4 pr-4">
                      {s.rate ? (
                        <>
                          <strong>
                            {formatPrice(s.rate.min)} – {formatPrice(s.rate.max)}
                          </strong>{' '}
                          <span className="text-sm text-muted">{l(s.priceNote)}</span>
                        </>
                      ) : (
                        <strong>{l(s.priceNote)}</strong>
                      )}
                    </td>
                    <td className="py-4">{l(s.duration)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted">{t.common.netPrices}</p>
        </div>
      </section>

      <section id="kalkulator" className="scroll-mt-24 bg-sand/60 py-20" aria-labelledby="calc-heading">
        <div className="container-x">
          <SectionHeading id="calc-heading" eyebrow={t.home.calcEyebrow} title={t.home.calcTitle} lead={t.home.calcLead} />
          <CostCalculator />
        </div>
      </section>

      <section className="container-x py-20" aria-labelledby="process-heading">
        <SectionHeading id="process-heading" eyebrow={t.home.processEyebrow} title={t.offer.processTitle} lead={t.offer.processLead} />
        <ProcessSteps />
      </section>

      <section className="border-t border-line bg-white py-20" aria-labelledby="models-heading">
        <div className="container-x">
          <SectionHeading id="models-heading" title={t.offer.modelsTitle} />
          <ul className="grid gap-6 md:grid-cols-3">
            {t.offer.models.map((m) => (
              <li key={m.title} className="border-t-2 border-brass pt-5">
                <h3 className="text-lg font-bold">{m.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{m.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="container-x scroll-mt-24 py-20" aria-labelledby="faq-heading">
        <SectionHeading id="faq-heading" title={t.offer.faqTitle} />
        <Faq items={FAQ.filter((f) => f.category === 'prices')} />
        <Link to={path('faq')} className="btn-outline mt-8">
          {t.offer.faqMore}
        </Link>
      </section>

      <CtaBand title={t.home.finalTitle} text={t.home.finalLead} />
    </>
  )
}
