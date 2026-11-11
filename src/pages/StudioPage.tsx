import { Award } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { COMPANY, HISTORY, STATS } from '../data/company'
import { AWARDS, TEAM } from '../data/people'
import { Link } from 'react-router'
import { CtaBand, Img, PageHeader, Reveal, SectionHeading, Seo } from '../components/ui'
import { MemberCard } from '../components/cards'

export function StudioPage() {
  const { t, l, path, formatNumber } = useI18n()

  return (
    <>
      <Seo title={t.studio.title} description={t.studio.description} />
      <PageHeader eyebrow={t.studio.eyebrow} title={t.studio.heading} lead={t.studio.lead} crumbs={[{ label: t.nav.studio }]} />

      <section className="container-x grid gap-10 py-20 lg:grid-cols-2" aria-label={t.studio.eyebrow}>
        <div className="space-y-5 text-lg leading-relaxed text-ink-2">
          {t.studio.story.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
          <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6">
            {STATS.map((s) => (
              <div key={s.label.pl} className="flex flex-col">
                <dt className="order-2 text-sm text-muted">{l(s.label)}</dt>
                <dd className="text-3xl font-extrabold text-ink">
                  {formatNumber(s.value)}
                  {s.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid gap-4">
          <Img name="studio-1" alt={t.studio.imageAlt} className="aspect-[16/10] w-full" />
          <Img name="studio-2" alt={t.studio.imageAlt2} className="aspect-[16/10] w-full" />
        </div>
      </section>

      <section className="border-y border-line bg-white py-20" aria-labelledby="values-title">
        <div className="container-x">
          <SectionHeading id="values-title" title={t.studio.valuesTitle} />
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {t.studio.values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 70} className="border-t-2 border-brass pt-5">
                <h3 className="text-lg font-bold">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x pt-20" aria-labelledby="history-title">
        <SectionHeading id="history-title" title={t.studio.historyTitle} lead={t.studio.historyLead} />
        <ol className="relative border-l-2 border-line pl-8 sm:ml-4">
          {HISTORY.map((h, i) => (
            <Reveal as="li" key={h.year} delay={i * 60} className="relative pb-10 last:pb-0">
              <span aria-hidden="true" className="absolute top-1.5 -left-[41px] h-4 w-4 rounded-full border-4 border-paper bg-brass" />
              <p className="text-sm font-extrabold tracking-[0.15em] text-brass">{h.year}</p>
              <h3 className="mt-1 text-xl font-bold">{l(h.title)}</h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-muted">{l(h.text)}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-x py-20" aria-labelledby="team-title">
        <SectionHeading id="team-title" title={t.studio.teamTitle} lead={t.studio.teamLead} />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {TEAM.map((m, i) => (
            <Reveal as="li" key={m.slug} delay={i * 70}>
              <MemberCard m={m} />
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to={path('team')} className="btn-outline">
            {t.team.back}
          </Link>
          <Link to={path('reviews')} className="btn-outline">
            {t.reviews.title}
          </Link>
          <Link to={path('careers')} className="btn-outline">
            {t.careers.title}
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-sand/60 py-20" aria-labelledby="awards-title">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="awards-title" className="mb-6 text-3xl font-bold">
              {t.studio.awardsTitle}
            </h2>
            <ul className="divide-y divide-line border-y border-line">
              {AWARDS.map((a) => (
                <li key={a.year + a.title.pl} className="flex gap-4 py-4">
                  <Award aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
                  <span>
                    <strong className="mr-2">{a.year}</strong>
                    {l(a.title)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-3xl font-bold">{t.studio.careersTitle}</h2>
            <p className="text-lg leading-relaxed text-ink-2">
              {t.studio.careersText}{' '}
              <a href={`mailto:${COMPANY.email}`} className="link">
                {COMPANY.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaBand title={t.home.finalTitle} text={t.home.finalLead} />
    </>
  )
}
