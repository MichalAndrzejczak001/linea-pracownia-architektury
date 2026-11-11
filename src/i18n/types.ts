export const LANGS = ['pl', 'en'] as const
export type Lang = (typeof LANGS)[number]

/** Tekst w obu wersjach językowych – używany w plikach z danymi (projekty, aktualności…). */
export type Localized<T = string> = Record<Lang, T>

export const isLang = (value: string | undefined): value is Lang =>
  value !== undefined && (LANGS as readonly string[]).includes(value)

export const LOCALE: Record<Lang, string> = { pl: 'pl-PL', en: 'en-GB' }
