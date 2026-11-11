import { Link } from 'react-router'
import { ArrowRight, Quote, Star } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import type { Project } from '../data/projects'
import { isFresh, type NewsPost } from '../data/news'
import type { TeamMember, Testimonial } from '../data/people'
import { fmt } from '../i18n/pl'
import { Img } from './ui'

export function ProjectCard({ project, headingLevel = 3 }: { project: Project; headingLevel?: 2 | 3 }) {
  const { t, l, path, formatNumber } = useI18n()
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden bg-sand">
        <Img
          name={`${project.images[0]}-sm`}
          variant="single"
          alt=""
          className="aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span
          className={`absolute top-3 left-3 rounded-sm px-2.5 py-1 text-xs font-bold ${
            project.status === 'done' ? 'bg-paper text-ink' : 'bg-brass text-white'
          }`}
        >
          {project.status === 'done' ? t.common.statusDone : t.common.statusInProgress}
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <p className="eyebrow">
          {t.categories[project.category]} · {project.year}
        </p>
        <H className="mt-2 text-xl font-bold">
          <Link to={path('projects', project.slug)} className="after:absolute after:inset-0 hover:text-brass">
            {l(project.title)}
          </Link>
        </H>
        <p className="mt-2 leading-relaxed text-muted">{l(project.lead)}</p>
        <p className="mt-3 text-sm font-semibold text-ink-2">
          {l(project.location)} · {formatNumber(project.area)} m²
        </p>
      </div>
    </article>
  )
}

export function NewsCard({ post, headingLevel = 3 }: { post: NewsPost; headingLevel?: 2 | 3 }) {
  const { t, l, path, formatDate } = useI18n()
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article className="group relative flex flex-col border border-line bg-white">
      <div className="overflow-hidden">
        <Img name={`${post.image}-sm`} variant="single" alt="" className="aspect-[16/9] w-full transition-transform duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <span className="font-semibold text-brass">{t.newsCategories[post.category]}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {isFresh(post.date) && <span className="rounded-sm bg-ink px-2 py-0.5 text-xs font-bold text-paper">{t.common.new}</span>}
        </p>
        <H className="mt-3 text-lg font-bold leading-snug">
          <Link to={path('news', post.slug)} className="after:absolute after:inset-0 group-hover:text-brass">
            {l(post.title)}
          </Link>
        </H>
        <p className="mt-2 flex-1 leading-relaxed text-muted">{l(post.excerpt)}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink" aria-hidden="true">
          {t.common.readMore} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  )
}

export function TestimonialCard({ item }: { item: Testimonial }) {
  const { l } = useI18n()
  const initials = item.author
    .split(/\s+/)
    .filter((w) => /^\p{L}/u.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
  return (
    <figure className="flex h-full flex-col border border-line bg-white p-7">
      <Quote aria-hidden="true" className="h-8 w-8 text-brass" />
      <div className="mt-3 flex gap-0.5" role="img" aria-label={`${item.rating}/5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} aria-hidden="true" className={`h-4 w-4 ${i < item.rating ? 'fill-brass text-brass' : 'text-line'}`} />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-ink-2">„{l(item.text)}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span aria-hidden="true" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sand font-bold text-ink">
          {initials}
        </span>
        <span>
          <span className="block font-bold">{item.author}</span>
          <span className="block text-sm text-muted">{l(item.context)}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export function MemberCard({ m, headingLevel = 3 }: { m: TeamMember; headingLevel?: 2 | 3 }) {
  const { t, l, path } = useI18n()
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article className="group relative">
      <Img name={m.image} variant="square" alt={m.name} className="aspect-square w-full grayscale transition duration-500 group-hover:grayscale-0" />
      <H className="mt-4 text-lg font-bold">
        <Link to={path('team', m.slug)} className="after:absolute after:inset-0 group-hover:text-brass" aria-label={fmt(t.team.more, { name: m.name })}>
          {m.name}
        </Link>
      </H>
      <p className="text-sm font-semibold text-brass">{l(m.role)}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{l(m.bio)}</p>
    </article>
  )
}
