import { Link, useSearchParams } from 'react-router'
import { CalendarDays } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { NEWS_SORTED, type NewsCategory } from '../data/news'
import { PageHeader, Seo } from '../components/ui'
import { NewsCard } from '../components/cards'

const CATS: ('all' | NewsCategory)[] = ['all', 'awards', 'events', 'advice', 'studio']

export function NewsPage() {
  const { t, l, path, formatDate } = useI18n()
  const [params, setParams] = useSearchParams()
  const raw = params.get('cat') ?? 'all'
  const cat = (CATS as string[]).includes(raw) ? (raw as (typeof CATS)[number]) : 'all'
  const list = NEWS_SORTED.filter((p) => cat === 'all' || p.category === cat)

  // Najbliższe nadchodzące wydarzenie (np. dzień otwarty) wyróżnione na górze listy
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = NEWS_SORTED.find((p) => p.event && p.event.date >= today)

  return (
    <>
      <Seo title={t.news.title} description={t.news.description} />
      <PageHeader eyebrow={t.news.eyebrow} title={t.news.title} lead={t.news.lead} crumbs={[{ label: t.nav.news }]} />

      <div className="container-x py-12">
        {upcoming?.event && (
          <aside className="on-dark mb-10 flex flex-col gap-4 bg-ink p-6 text-paper sm:flex-row sm:items-center sm:justify-between" aria-labelledby="upcoming">
            <div className="flex items-start gap-4">
              <CalendarDays aria-hidden="true" className="mt-1 h-7 w-7 shrink-0 text-brass-light" />
              <div>
                <p id="upcoming" className="eyebrow">
                  {t.news.upcoming}
                </p>
                <p className="mt-1 text-lg font-bold">{l(upcoming.title)}</p>
                <p className="text-paper/80">
                  <time dateTime={upcoming.event.date}>{formatDate(upcoming.event.date)}</time>, {upcoming.event.time} · {l(upcoming.event.place)}
                </p>
              </div>
            </div>
            <Link to={path('news', upcoming.slug)} className="btn-light shrink-0">
              {t.common.readMore}
            </Link>
          </aside>
        )}

        <div role="group" aria-label={t.news.filterLabel} className="flex flex-wrap gap-2 border-b border-line pb-8">
          {CATS.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setParams(c === 'all' ? {} : { cat: c }, { replace: true, preventScrollReset: true })}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${cat === c ? 'border-ink bg-ink text-paper' : 'border-line bg-white hover:border-ink'}`}
            >
              {c === 'all' ? t.categories.all : t.newsCategories[c]}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((post) => (
            <li key={post.slug}>
              <NewsCard post={post} headingLevel={2} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
