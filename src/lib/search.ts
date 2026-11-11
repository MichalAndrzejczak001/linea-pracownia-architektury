import type { Lang } from '../i18n/types'
import { buildPath } from '../i18n/routes'
import { PROJECTS } from '../data/projects'
import { NEWS_SORTED } from '../data/news'
import { SERVICES } from '../data/services'
import { FAQ, JOBS, TEAM } from '../data/people'

export type ResultType = 'project' | 'news' | 'service' | 'faq' | 'person' | 'job'

export interface SearchItem {
  type: ResultType
  title: string
  snippet: string
  href: string
  haystack: string
}

/** Normalizacja do wyszukiwania: małe litery i bez polskich znaków („Łódź” → „lodz”). */
export const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/ł/g, 'l')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

export function buildIndex(lang: Lang): SearchItem[] {
  const item = (type: ResultType, title: string, snippet: string, href: string, extra = ''): SearchItem => ({
    type,
    title,
    snippet,
    href,
    haystack: normalize(`${title} ${snippet} ${extra}`),
  })
  return [
    ...PROJECTS.map((p) =>
      item('project', p.title[lang], p.lead[lang], buildPath(lang, 'projects', p.slug), `${p.location[lang]} ${p.challenge[lang]} ${p.solution[lang]} ${p.year}`),
    ),
    ...SERVICES.map((s) =>
      item('service', s.title[lang], s.lead[lang], buildPath(lang, 'offer', s.slug), `${s.scope[lang].join(' ')} ${s.forWhom[lang]} ${s.faq.map((f) => f.q[lang]).join(' ')}`),
    ),
    ...TEAM.map((m) => item('person', m.name, m.role[lang], buildPath(lang, 'team', m.slug), `${m.bio[lang]} ${m.specialties[lang].join(' ')}`)),
    ...JOBS.map((j) => item('job', j.title[lang], j.intro[lang], `${buildPath(lang, 'careers')}#${j.slug}`, j.requirements[lang].join(' '))),
    ...NEWS_SORTED.map((n) => item('news', n.title[lang], n.excerpt[lang], buildPath(lang, 'news', n.slug), n.body[lang].join(' '))),
    ...FAQ.map((f) => item('faq', f.q[lang], f.a[lang], `${buildPath(lang, 'faq')}#${f.category}`)),
  ]
}

/** Wszystkie słowa zapytania muszą wystąpić; wyżej trafienia w tytule. */
export function search(index: SearchItem[], query: string, limit = 8): SearchItem[] {
  const words = normalize(query).split(/\s+/).filter((w) => w.length >= 2)
  if (!words.length) return []
  return index
    .filter((it) => words.every((w) => it.haystack.includes(w)))
    .map((it) => ({ it, score: words.reduce((acc, w) => acc + (normalize(it.title).includes(w) ? 3 : 1), 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ it }) => it)
}
