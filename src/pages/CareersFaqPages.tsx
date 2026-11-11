import { Link } from 'react-router'
import { Briefcase, Check, Mail, Phone } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { fmt } from '../i18n/pl'
import { COMPANY } from '../data/company'
import { FAQ, JOBS, type FaqCategory } from '../data/people'
import { CtaBand, PageHeader, SectionHeading, Seo } from '../components/ui'
import { Faq } from '../components/sections'

/** /pl/kariera – oferty pracy z jawnymi widełkami wynagrodzeń. */
export function CareersPage() {
  const { t, l, path } = useI18n()
  const c = t.careers
  return (
    <>
      <Seo title={c.title} description={c.description} />
      <PageHeader eyebrow={c.eyebrow} title={c.title} lead={c.lead} crumbs={[{ label: t.nav.about, to: path('studio') }, { label: c.title }]} />

      <section className="border-b border-line bg-white py-14" aria-labelledby="why">
        <div className="container-x">
          <SectionHeading id="why" title={c.whyTitle} />
          <ul className="grid gap-8 md:grid-cols-3">
            {c.why.map((w) => (
              <li key={w.title} className="border-t-2 border-brass pt-5">
                <h3 className="text-lg font-bold">{w.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-16" aria-labelledby="open">
        <h2 id="open" className="mb-8 text-3xl font-bold">
          {c.open} ({JOBS.length})
        </h2>
        <ul className="space-y-8">
          {JOBS.map((j) => (
            <li key={j.slug}>
              <article id={j.slug} className="scroll-mt-28 border border-line bg-white p-7" aria-labelledby={`${j.slug}-title`}>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <h3 id={`${j.slug}-title`} className="flex items-center gap-3 text-2xl font-bold">
                      <Briefcase aria-hidden="true" className="h-6 w-6 shrink-0 text-brass" /> {l(j.title)}
                    </h3>
                    <p className="mt-1 text-muted">{l(j.type)}</p>
                  </div>
                  <p className="shrink-0 rounded-sm bg-sand px-4 py-2 text-sm">
                    <span className="block text-muted">{c.salary}</span>
                    <strong className="text-base">{l(j.salary)}</strong>
                  </p>
                </div>
                <p className="mt-5 text-lg text-ink-2">{l(j.intro)}</p>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  {(
                    [
                      [c.duties, j.duties],
                      [c.requirements, j.requirements],
                      [c.offer, j.offer],
                    ] as const
                  ).map(([title, items]) => (
                    <div key={title}>
                      <h4 className="font-bold">{title}</h4>
                      <ul className="mt-2 space-y-1.5">
                        {l(items).map((it) => (
                          <li key={it} className="flex gap-2 text-sm text-ink-2">
                            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brass" /> {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
                  <a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(l(j.title))}`} className="btn-accent">
                    <Mail aria-hidden="true" className="h-4 w-4" /> {c.apply}
                  </a>
                  <p className="text-sm text-muted">{fmt(c.applyHint, { email: COMPANY.email })}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

const CATS: FaqCategory[] = ['prices', 'process', 'formalities', 'cooperation']

/** /pl/faq – pytania pogrupowane w kategorie, ze spisem kategorii. */
export function FaqPage() {
  const { t, path } = useI18n()
  const f = t.faqPage
  return (
    <>
      <Seo title={f.title} description={f.description} />
      <PageHeader eyebrow={f.eyebrow} title={f.title} lead={f.lead} crumbs={[{ label: t.nav.knowledge, to: path('news') }, { label: t.nav.faq }]} />
      <div className="container-x grid gap-12 py-14 lg:grid-cols-4">
        <nav aria-label={f.title} className="lg:sticky lg:top-28 lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col">
            {CATS.map((c) => (
              <li key={c}>
                <a href={`#${c}`} className="block rounded-sm border border-line bg-white px-4 py-2 font-semibold hover:border-ink">
                  {f.categories[c]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-14 lg:col-span-3">
          {CATS.map((c) => (
            <section key={c} id={c} className="scroll-mt-28" aria-labelledby={`${c}-h`}>
              <h2 id={`${c}-h`} className="mb-4 text-2xl font-bold">
                {f.categories[c]}
              </h2>
              <Faq items={FAQ.filter((q) => q.category === c)} />
            </section>
          ))}
          <aside className="border border-brass/40 bg-brass/5 p-8" aria-labelledby="faq-more">
            <h2 id="faq-more" className="text-2xl font-bold">
              {f.moreTitle}
            </h2>
            <p className="mt-2 text-muted">{f.moreText}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to={path('contact')} className="btn-primary">
                {t.home.ctaPrimary}
              </Link>
              <a href={COMPANY.phoneHref} className="btn-outline">
                <Phone aria-hidden="true" className="h-4 w-4" /> {COMPANY.phone}
              </a>
            </div>
          </aside>
        </div>
      </div>
      <CtaBand title={t.home.finalTitle} text={t.home.finalLead} />
    </>
  )
}
