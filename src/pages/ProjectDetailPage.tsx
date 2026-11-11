import { Link, useParams } from 'react-router'
import { ArrowLeft, ArrowRight, TrendingUp } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { PROJECTS, getProject } from '../data/projects'
import { CtaBand, Img, PageHeader, Seo } from '../components/ui'
import { Gallery } from '../components/Gallery'
import { BeforeAfter } from '../components/BeforeAfter'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const { t, l, path, formatNumber } = useI18n()
  const project = getProject(slug)
  if (!project) return <NotFoundPage message={t.project.notFound} />

  const idx = PROJECTS.indexOf(project)
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length]
  const next = PROJECTS[(idx + 1) % PROJECTS.length]
  const title = l(project.title)

  const facts: [string, string][] = [
    [t.common.category, t.categories[project.category]],
    [t.common.location, l(project.location)],
    [t.common.area, `${formatNumber(project.area)} m²`],
    [t.common.year, String(project.year)],
    [t.common.status, project.status === 'done' ? t.common.statusDone : t.common.statusInProgress],
  ]

  return (
    <>
      <Seo title={title} description={l(project.lead)} />
      <PageHeader
        eyebrow={`${t.categories[project.category]} · ${project.year}`}
        title={title}
        lead={l(project.lead)}
        crumbs={[{ label: t.nav.projects, to: path('projects') }, { label: title }]}
      />

      <div className="container-x py-12">
        <Img name={project.images[0]} alt={title} priority sizes="100vw" className="aspect-[16/9] w-full" />

        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <aside className="lg:order-2">
            <dl className="divide-y divide-line border-y border-line">
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 bg-ink p-6 text-paper on-dark">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <TrendingUp aria-hidden="true" className="h-5 w-5 text-brass-light" /> {t.project.results}
              </h2>
              <ul className="mt-4 space-y-3">
                {l(project.results).map((r) => (
                  <li key={r} className="border-l-2 border-brass-light pl-3 leading-snug">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="space-y-10 lg:col-span-2">
            <section aria-labelledby="challenge">
              <h2 id="challenge" className="text-2xl font-bold">
                {t.project.challenge}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-2">{l(project.challenge)}</p>
            </section>
            <section aria-labelledby="solution">
              <h2 id="solution" className="text-2xl font-bold">
                {t.project.solution}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-2">{l(project.solution)}</p>
            </section>
            {project.quote && (
              <figure className="border-l-4 border-brass bg-white p-6">
                <figcaption className="eyebrow mb-3">{t.project.clientSays}</figcaption>
                <blockquote className="text-xl leading-relaxed">„{l(project.quote.text)}”</blockquote>
                <p className="mt-3 font-semibold text-muted">— {project.quote.author}</p>
              </figure>
            )}
          </div>
        </div>

        {project.sketch && (
          <section className="mt-16" aria-labelledby="sketch">
            <h2 id="sketch" className="mb-5 text-2xl font-bold">
              {t.project.sketchTitle}
            </h2>
            <BeforeAfter before={project.sketch} after={project.images[0]} alt={title} />
          </section>
        )}

        <section className="mt-16" aria-labelledby="gallery">
          <h2 id="gallery" className="mb-5 text-2xl font-bold">
            {t.project.gallery}
          </h2>
          <Gallery images={project.images} alt={title} />
        </section>

        <nav className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2" aria-label={t.nav.projects}>
          <Link to={path('projects', prev.slug)} className="group flex items-center gap-3">
            <ArrowLeft aria-hidden="true" className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block text-sm text-muted">{t.project.prev}</span>
              <span className="font-bold group-hover:text-brass">{l(prev.title)}</span>
            </span>
          </Link>
          <Link to={path('projects', next.slug)} className="group flex items-center justify-end gap-3 text-right">
            <span>
              <span className="block text-sm text-muted">{t.project.next}</span>
              <span className="font-bold group-hover:text-brass">{l(next.title)}</span>
            </span>
            <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>
      </div>

      <CtaBand title={t.project.ctaTitle} text={t.project.ctaText} />
    </>
  )
}
