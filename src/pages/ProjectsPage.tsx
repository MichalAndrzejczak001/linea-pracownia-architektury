import { useSearchParams } from 'react-router'
import { useI18n } from '../i18n/LanguageContext'
import { fmt } from '../i18n/pl'
import { PROJECTS, type ProjectCategory, type ProjectStatus } from '../data/projects'
import { CtaBand, PageHeader, Seo } from '../components/ui'
import { ProjectCard } from '../components/cards'

const CATEGORIES: ('all' | ProjectCategory)[] = ['all', 'house', 'interior', 'adaptation', 'commercial']
const STATUSES: ('all' | ProjectStatus)[] = ['all', 'done', 'in-progress']

/** Filtry zapisane w adresie URL (?typ=…&status=…) – można je udostępnić linkiem. */
export function ProjectsPage() {
  const { t } = useI18n()
  const [params, setParams] = useSearchParams()
  const category = (CATEGORIES as string[]).includes(params.get('type') ?? '') ? (params.get('type') as ProjectCategory) : 'all'
  const status = (STATUSES as string[]).includes(params.get('status') ?? '') ? (params.get('status') as ProjectStatus) : 'all'

  const setFilter = (key: 'type' | 'status', value: string) => {
    const next = new URLSearchParams(params)
    if (value === 'all') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const list = PROJECTS.filter((p) => (category === 'all' || p.category === category) && (status === 'all' || p.status === status)).sort(
    (a, b) => b.year - a.year,
  )

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${active ? 'border-ink bg-ink text-paper' : 'border-line bg-white hover:border-ink'}`

  return (
    <>
      <Seo title={t.projects.title} description={t.projects.description} />
      <PageHeader eyebrow={t.projects.eyebrow} title={t.projects.title} lead={t.projects.lead} crumbs={[{ label: t.nav.projects }]} />

      <div className="container-x py-12">
        <div className="flex flex-col gap-5 border-b border-line pb-8 lg:flex-row lg:items-center lg:justify-between">
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-muted">{t.projects.filterType}</legend>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button key={c} type="button" aria-pressed={category === c} className={chip(category === c)} onClick={() => setFilter('type', c)}>
                  {t.categories[c]}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-muted">{t.projects.filterStatus}</legend>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button key={s} type="button" aria-pressed={status === s} className={chip(status === s)} onClick={() => setFilter('status', s)}>
                  {s === 'all' ? t.projects.statusAll : s === 'done' ? t.common.statusDone : t.common.statusInProgress}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <p className="mt-6 text-sm text-muted" role="status">
          {fmt(t.projects.count, { count: list.length })}
        </p>

        {list.length ? (
          <ul className="mt-6 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} headingLevel={2} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 border border-dashed border-line p-10 text-center">
            <p className="text-lg">{t.projects.empty}</p>
            <button type="button" className="btn-outline mt-4" onClick={() => setParams({}, { replace: true })}>
              {t.projects.reset}
            </button>
          </div>
        )}
      </div>

      <CtaBand title={t.project.ctaTitle} text={t.project.ctaText} />
    </>
  )
}
