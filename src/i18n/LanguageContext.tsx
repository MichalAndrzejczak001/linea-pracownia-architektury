import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { pl } from './pl'
import { en } from './en'
import type { Dictionary } from './pl'
import { LOCALE, type Lang, type Localized } from './types'
import { buildPath, type RouteId } from './routes'

const DICTIONARIES: Record<Lang, Dictionary> = { pl, en }

interface I18n {
  lang: Lang
  t: Dictionary
  /** Wybiera wersję językową z obiektu danych { pl, en }. */
  l: <T>(value: Localized<T>) => T
  path: (route: RouteId, param?: string) => string
  formatDate: (iso: string, style?: 'long' | 'short') => string
  formatNumber: (value: number) => string
  formatPrice: (value: number) => string
}

const LanguageContext = createContext<I18n | null>(null)

export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<I18n>(() => {
    const locale = LOCALE[lang]
    const number = new Intl.NumberFormat(locale)
    const price = new Intl.NumberFormat(locale, { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 })
    return {
      lang,
      t: DICTIONARIES[lang],
      l: (v) => v[lang],
      path: (route, param) => buildPath(lang, route, param),
      formatDate: (iso, style = 'long') =>
        new Intl.DateTimeFormat(locale, style === 'long' ? { dateStyle: 'long' } : { day: 'numeric', month: 'short', year: 'numeric' }).format(
          new Date(iso + 'T12:00:00'),
        ),
      formatNumber: (v) => number.format(v),
      formatPrice: (v) => price.format(v),
    }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): I18n {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>')
  return ctx
}
