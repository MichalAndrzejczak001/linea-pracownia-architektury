import { Award } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { fmt } from '../i18n/pl'
import { COMPANY, STATS } from '../data/company'
import { AWARDS, TEAM } from '../data/people'
import { CtaBand, Img, PageHeader, Reveal, SectionHeading, Seo, SocialIcon } from '../components/ui'

export function StudioPage() {
  const { t, l, formatNumber } = useI18n()

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

      <section className="container-x py-20" aria-labelledby="team-title">
        <SectionHeading id="team-title" title={t.studio.teamTitle} lead={t.studio.teamLead} />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {TEAM.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 70}>
              <article>
                <Img name={m.image} variant="square" alt={m.name} className="aspect-square w-full grayscale transition duration-500 hover:grayscale-0" />
                <h3 className="mt-4 text-lg font-bold">{m.name}</h3>
                <p className="text-sm font-semibold text-brass">{l(m.role)}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{l(m.bio)}</p>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-ink hover:border-brass hover:text-brass"
                >
                  <SocialIcon name="linkedin" />
                  <span className="sr-only">
                    {fmt(t.studio.linkedin, { name: m.name })} {t.common.externalLink}
                  </span>
                </a>
              </article>
            </Reveal>
          ))}
        </ul>
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
