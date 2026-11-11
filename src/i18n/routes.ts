import type { Lang, Localized } from './types'

/** Lokalizowane adresy podstron: /pl/oferta ↔ /en/services. */
export const ROUTES = {
  home: { pl: '', en: '' },
  offer: { pl: 'oferta', en: 'services' },
  projects: { pl: 'projekty', en: 'projects' },
  studio: { pl: 'pracownia', en: 'studio' },
  news: { pl: 'aktualnosci', en: 'news' },
  contact: { pl: 'kontakt', en: 'contact' },
  guide: { pl: 'poradnik', en: 'guide' },
  privacy: { pl: 'polityka-prywatnosci', en: 'privacy-policy' },
} satisfies Record<string, Localized>

export type RouteId = keyof typeof ROUTES

export function buildPath(lang: Lang, route: RouteId, param?: string): string {
  const slug = ROUTES[route][lang]
  return '/' + [lang, slug, param].filter(Boolean).join('/')
}

/**
 * Odpowiednik bieżącego adresu w drugim języku – przełącznik języka
 * zostawia użytkownika na tej samej podstronie (np. tym samym projekcie).
 */
export function translatePath(pathname: string, from: Lang, to: Lang): string {
  const [, , slug = '', ...rest] = pathname.split('/')
  const entry = (Object.keys(ROUTES) as RouteId[]).find((id) => ROUTES[id][from] === slug)
  if (!entry) return buildPath(to, 'home')
  return buildPath(to, entry, rest.filter(Boolean).join('/') || undefined)
}
