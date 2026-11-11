import { Link, useParams } from 'react-router'
import { ArrowLeft, Mail } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { fmt } from '../i18n/pl'
import { TEAM, getMember } from '../data/people'
import { getProject } from '../data/projects'
import { CtaBand, Img, PageHeader, Reveal, Seo, SocialIcon } from '../components/ui'
import { MemberCard, ProjectCard } from '../components/cards'
import { NotFoundPage } from './NotFoundPage'

/** /pl/zespol */
export function TeamPage() {
  const { t, path } = useI18n()
  return (
    <>
      <Seo title={t.team.title} description={t.team.description} />
      <PageHeader eyebrow={t.team.eyebrow} title={t.team.title} lead={t.team.lead} crumbs={[{ label: t.nav.about, to: path('studio') }, { label: t.team.title }]} />
      <div className="container-x py-16">
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal as="li" key={m.slug} delay={i * 60}>
              <MemberCard m={m} headingLevel={2} />
            </Reveal>
          ))}
        </ul>
      </div>
      <CtaBand title={t.home.finalTitle} text={t.home.finalLead} />
    </>
  )
}

/** /pl/zespol/{slug} */
export function PersonPage() {
  const { slug } = useParams()
  const { t, l, path } = useI18n()
  const m = getMember(slug)
  if (!m) return <NotFoundPage message={t.team.notFound} />
  const projects = m.projects.map(getProject).filter((p) => p !== undefined)

  return (
    <>
      <Seo title={`${m.name} – ${l(m.role)}`} description={l(m.bio)} />
      <PageHeader
        eyebrow={l(m.role)}
        title={m.name}
        crumbs={[{ label: t.nav.about, to: path('studio') }, { label: t.team.title, to: path('team') }, { label: m.name }]}
      />
      <div className="container-x grid gap-12 py-14 lg:grid-cols-3">
        <aside>
          <Img name={m.image} variant="square" alt={m.name} priority className="aspect-square w-full" />
          <dl className="mt-6 space-y-4">
            <div>
              <dt className="text-sm text-muted">{t.team.education}</dt>
              <dd className="font-semibold">{l(m.education)}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">{t.team.specialties}</dt>
              <dd>
                <ul className="mt-1 flex flex-wrap gap-2">
                  {l(m.specialties).map((s) => (
                    <li key={s} className="rounded-full bg-sand px-3 py-1 text-sm font-semibold">
                      {s}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">{t.team.contact}</dt>
              <dd className="mt-2 flex gap-2">
                <a href={`mailto:${m.email}`} className="btn-primary">
                  <Mail aria-hidden="true" className="h-4 w-4" /> {t.team.write}
                </a>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line hover:border-brass hover:text-brass"
                >
                  <SocialIcon name="linkedin" />
                  <span className="sr-only">
                    {fmt(t.studio.linkedin, { name: m.name })} {t.common.externalLink}
                  </span>
                </a>
              </dd>
            </div>
          </dl>
        </aside>
        <div className="lg:col-span-2">
          <blockquote className="border-l-4 border-brass pl-5 text-2xl leading-snug font-bold">„{l(m.quote)}”</blockquote>
          <div className="prose-linea mt-8 text-lg">
            {l(m.about).map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
          {projects.length > 0 && (
            <section className="mt-12" aria-labelledby="person-projects">
              <h2 id="person-projects" className="mb-6 text-2xl font-bold">
                {t.team.projects}
              </h2>
              <ul className="grid gap-8 sm:grid-cols-2">
                {projects.map((p) => (
                  <li key={p.slug}>
                    <ProjectCard project={p} />
                  </li>
                ))}
              </ul>
            </section>
          )}
          <Link to={path('team')} className="link mt-12 inline-flex items-center gap-2">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> {t.team.back}
          </Link>
        </div>
      </div>
      <CtaBand title={t.home.finalTitle} text={t.home.finalLead} />
    </>
  )
}
