import { useParams } from 'react-router'
import { CalendarPlus } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { COMPANY } from '../data/company'
import { NEWS_SORTED, getPost, type NewsPost } from '../data/news'
import { CtaBand, Img, PageHeader, Seo } from '../components/ui'
import { NewsCard } from '../components/cards'
import { NotFoundPage } from './NotFoundPage'

/** Plik .ics dla wydarzenia – można go zaimportować do Google/Outlook/Apple Calendar. */
function icsHref(post: NewsPost, title: string, place: string) {
  const ev = post.event!
  const [start, end] = ev.time.split(/[–-]/).map((s) => s.trim().replace(':', '') + '00')
  const day = ev.date.replace(/-/g, '')
  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//LINEA//PL',
    'BEGIN:VEVENT',
    `UID:${post.slug}@linea-architekci.pl`,
    `DTSTAMP:${day}T000000Z`,
    `DTSTART;TZID=Europe/Warsaw:${day}T${start}`,
    `DTEND;TZID=Europe/Warsaw:${day}T${end}`,
    `SUMMARY:${title}`,
    `LOCATION:${place}`,
    `URL:${window.location.href}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(body)
}

export function NewsDetailPage() {
  const { slug } = useParams()
  const { t, l, path, formatDate } = useI18n()
  const post = getPost(slug)
  if (!post) return <NotFoundPage message={t.news.notFound} />

  const title = l(post.title)
  const more = NEWS_SORTED.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <Seo title={title} description={l(post.excerpt)} />
      <PageHeader eyebrow={t.newsCategories[post.category]} title={title} crumbs={[{ label: t.nav.news, to: path('news') }, { label: title }]} />

      <article className="container-x grid gap-12 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="mb-6 text-sm text-muted">
            {t.news.published}: <time dateTime={post.date}>{formatDate(post.date)}</time> · {t.news.by}: <strong className="text-ink">{post.author}</strong>
          </p>
          <Img name={post.image} alt="" priority className="mb-8 aspect-[16/9] w-full" />
          <p className="mb-6 text-xl leading-relaxed font-semibold text-ink">{l(post.excerpt)}</p>
          <div className="prose-linea text-lg">
            {l(post.body).map((para, i) => (para.startsWith('## ') ? <h2 key={i}>{para.slice(3)}</h2> : <p key={i}>{para}</p>))}
          </div>
        </div>

        <aside className="space-y-8">
          {post.event && (
            <div className="on-dark bg-ink p-6 text-paper">
              <h2 className="eyebrow">{t.news.eventBox}</h2>
              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="text-sm text-paper/70">{t.news.eventDate}</dt>
                  <dd className="font-bold">
                    <time dateTime={post.event.date}>{formatDate(post.event.date)}</time>, {post.event.time}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-paper/70">{t.news.eventPlace}</dt>
                  <dd className="font-bold">{l(post.event.place)}</dd>
                </div>
              </dl>
              <a href={icsHref(post, title, l(post.event.place))} download={`${post.slug}.ics`} className="btn-light mt-6 w-full">
                <CalendarPlus aria-hidden="true" className="h-4 w-4" /> {t.news.addToCalendar}
              </a>
            </div>
          )}
          <div className="border border-line bg-white p-6">
            <h2 className="text-lg font-bold">{t.home.finalTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.home.finalLead}</p>
            <a href={COMPANY.phoneHref} className="mt-4 block font-bold hover:text-brass">
              {COMPANY.phone}
            </a>
          </div>
        </aside>
      </article>

      <section className="border-t border-line bg-sand/60 py-16" aria-labelledby="more-title">
        <div className="container-x">
          <h2 id="more-title" className="mb-8 text-2xl font-bold">
            {t.news.more}
          </h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {more.map((p) => (
              <li key={p.slug}>
                <NewsCard post={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={t.home.finalTitle} text={t.home.finalLead} />
    </>
  )
}
