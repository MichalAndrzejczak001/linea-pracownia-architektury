import { Link } from 'react-router'
import { CheckSquare, Download, FileText } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { Img, PageHeader, Seo } from '../components/ui'
import { asset } from '../lib/asset'

/** Materiał do pobrania bez zapisu na listę – „lead magnet” (kryterium C2 z zadania 1). */
export function GuidePage() {
  const { t, lang, path } = useI18n()
  const g = t.guide
  const file = asset(`files/linea-poradnik-${lang}.pdf`)

  return (
    <>
      <Seo title={g.title} description={g.description} />
      <PageHeader eyebrow={g.eyebrow} title={g.title} lead={g.lead} crumbs={[{ label: t.nav.guide }]} />

      <div className="container-x grid gap-12 py-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold">{g.inside}</h2>
          <ol className="mt-6 space-y-4">
            {g.chapters.map((c, i) => (
              <li key={c} className="flex gap-4 border-b border-line pb-4">
                <span className="text-2xl font-extrabold text-brass" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="pt-1.5 text-lg">{c}</span>
              </li>
            ))}
          </ol>

          <h2 className="mt-12 text-2xl font-bold">{g.checklistTitle}</h2>
          <ul className="mt-5 space-y-3">
            {g.checklist.map((c) => (
              <li key={c} className="flex gap-3 text-ink-2">
                <CheckSquare aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brass" /> {c}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-2">
          <div className="sticky top-28 border border-line bg-white">
            <Img name="studio-2" alt="" className="aspect-[16/10] w-full" />
            <div className="p-6">
              <p className="flex items-center gap-2 text-sm text-muted">
                <FileText aria-hidden="true" className="h-4 w-4" /> {g.fileInfo}
              </p>
              <a href={file} download className="btn-accent mt-4 w-full py-4 text-base">
                <Download aria-hidden="true" className="h-5 w-5" /> {g.download}
              </a>
              <div className="mt-8 border-t border-line pt-6">
                <h2 className="font-bold">{g.alsoTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{g.alsoText}</p>
                <Link to={path('contact')} className="btn-outline mt-4 w-full">
                  {t.home.ctaPrimary}
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
