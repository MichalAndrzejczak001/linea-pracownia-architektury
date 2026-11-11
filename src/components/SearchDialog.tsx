import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Search, X } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { fmt } from '../i18n/pl'
import { buildIndex, search } from '../lib/search'

/**
 * Wyszukiwarka w nagłówku (brak wyszukiwarki obniżał ocenę menu w arkuszu z zadania 1).
 * Natywny <dialog>: pułapka fokusu i zamykanie klawiszem Esc; skrót Ctrl+K.
 */
export function SearchDialog({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useI18n()
  const id = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const index = useMemo(() => buildIndex(lang), [lang])
  const results = useMemo(() => search(index, query), [index, query])

  const open = () => {
    dialogRef.current?.showModal()
    inputRef.current?.focus()
  }
  const close = () => dialogRef.current?.close()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (!dialogRef.current?.open) {
          dialogRef.current?.showModal()
          inputRef.current?.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const tooShort = query.trim().length < 2

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={t.search.open}
        title={t.search.shortcut}
        className={`inline-flex items-center justify-center rounded-sm border border-line text-ink transition-colors hover:border-ink ${compact ? 'h-11 w-11' : 'h-10 w-10'}`}
      >
        <Search aria-hidden="true" className="h-5 w-5" />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`${id}-title`}
        className="mx-auto mt-[8vh] w-[calc(100%-2rem)] max-w-2xl rounded-sm bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/70"
        onClick={(e) => e.target === e.currentTarget && close()}
        onClose={() => setQuery('')}
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 id={`${id}-title`} className="text-lg font-bold">
              {t.search.title}
            </h2>
            <button type="button" onClick={close} aria-label={t.search.close} className="inline-flex h-10 w-10 items-center justify-center rounded-sm hover:bg-sand">
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <label htmlFor={`${id}-q`} className="field-label mt-3">
            {t.search.label}
          </label>
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              ref={inputRef}
              id={`${id}-q`}
              type="search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                // Esc zamyka okno od razu (domyślnie pole „search” najpierw tylko się czyści)
                if (e.key === 'Escape') {
                  e.preventDefault()
                  close()
                }
              }}
              placeholder={t.search.placeholder}
              aria-describedby={`${id}-status`}
              className="field pl-10 text-lg"
            />
          </div>
          <p id={`${id}-status`} role="status" className="mt-2 text-sm text-muted">
            {tooShort ? t.search.hint : results.length ? fmt(t.search.results, { count: results.length }) : fmt(t.search.empty, { q: query.trim() })}
          </p>
        </div>

        {!tooShort && results.length > 0 && (
          <ul className="max-h-[50vh] divide-y divide-line overflow-y-auto border-t border-line bg-white">
            {results.map((r) => (
              <li key={r.href + r.title}>
                <Link to={r.href} onClick={close} className="block px-5 py-4 hover:bg-sand/60 focus-visible:bg-sand/60 sm:px-6">
                  <span className="eyebrow">{t.search.types[r.type]}</span>
                  <span className="mt-1 block font-bold">{r.title}</span>
                  <span className="mt-0.5 line-clamp-2 block text-sm text-muted">{r.snippet}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </dialog>
    </>
  )
}
