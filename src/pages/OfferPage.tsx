import { Link } from 'react-router'
import { Check, Clock, Wallet } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { SERVICES } from '../data/services'
import { CtaBand, Img, PageHeader, Reveal, SectionHeading, Seo } from '../components/ui'
import { CostCalculator } from '../components/CostCalculator'
import { Faq, ProcessSteps } from '../components/sections'

export function OfferPage() {
  const { t, l, path, formatPrice } = useI18n()

  return (
    <>
      <Seo title={t.offer.title} description={t.offer.description} />
      <PageHeader eyebrow={t.offer.eyebrow} title={t.offer.title} lead={t.offer.lead} crumbs={[{ label: t.nav.offer }]} />

      {/* Szybka nawigacja po usługach */}
      <nav aria-label={t.offer.eyebrow} className="border-b border-line bg-white">
        <ul className="container-x flex gap-6 overflow-x-auto py-4 text-sm font-semibold whitespace-nowrap">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="hover:text-brass">
                {l(s.title)}
              </a>
            </li>
          ))}
          <li>
            <a href="#kalkulator" className="text-brass hover:underline">
              {t.calculator.title}
            </a>
          </li>
        </ul>
      </nav>

      <div className="container-x space-y-20 py-20">
        {SERVICES.map((s, i) => (
          <Reveal as="section" key={s.id} aria-labelledby={`${s.id}-title`} className="grid scroll-mt-28 items-start gap-10 lg:grid-cols-2">
            <div id={s.id} className={`scroll-mt-28 ${i % 2 ? 'lg:order-2' : ''}`}>
              <Img name={s.image} alt="" className="aspect-[16/10] w-full" />
            </div>
            <div>
              <p className="eyebrow mb-3">0{i + 1}</p>
              <h2 id={`${s.id}-title`} className="text-3xl font-bold">
                {l(s.title)}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-2">{l(s.lead)}</p>
              <p className="mt-4 text-muted">
                <strong className="text-ink">{t.offer.forWhom}:</strong> {l(s.forWhom)}
              </p>
              <h3 className="mt-6 mb-3 font-bold">{t.offer.scope}</h3>
              <ul className="space-y-2">
                {l(s.scope).map((item) => (
                  <li key={item} className="flex gap-2.5 text-ink-2">
                    <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brass" /> {item}
                  </li>
                ))}
              </ul>
              <dl className="mt-7 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
                <div>
                  <dt className="flex items-center gap-2 text-sm text-muted">
                    <Wallet aria-hidden="true" className="h-4 w-4" /> {t.offer.price}
                  </dt>
                  <dd className="mt-1 text-lg font-bold">
                    {s.rate ? (
                      <>
                        {formatPrice(s.rate.min)} – {formatPrice(s.rate.max)}
                        <span className="block text-sm font-normal text-muted">{l(s.priceNote)}</span>
                      </>
                    ) : (
                      l(s.priceNote)
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-sm text-muted">
                    <Clock aria-hidden="true" className="h-4 w-4" /> {t.offer.duration}
                  </dt>
                  <dd className="mt-1 text-lg font-bold">{l(s.duration)}</dd>
                </div>
              </dl>
              <Link to={`${path('contact')}?type=${s.id === 'supervision' ? 'plot' : s.id}`} className="btn-primary mt-7">
                {t.offer.ask}
              </Link>
            </div>
          </Reveal>
        ))}
        <p className="text-sm text-muted">{t.common.netPrices}</p>
      </div>

      <section id="kalkulator" className="scroll-mt-24 border-y border-line bg-sand/60 py-20" aria-labelledby="calc-heading">
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
        <Faq />
      </section>

      <CtaBand title={t.home.finalTitle} text={t.home.finalLead} />
    </>
  )
}
