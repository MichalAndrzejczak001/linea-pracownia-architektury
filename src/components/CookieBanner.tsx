import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useI18n } from '../i18n/LanguageContext'

const KEY = 'linea-cookie-consent'
const OPEN_EVENT = 'linea:cookie-settings'

interface Consent {
  analytics: boolean
  marketing: boolean
  date: string
}

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Consent) : null
  } catch {
    return null
  }
}

function saveConsent(c: Omit<Consent, 'date'>) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...c, date: new Date().toISOString() }))
  } catch {
    /* tryb prywatny / zablokowany storage – baner po prostu pojawi się ponownie */
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_EVENT))

/**
 * Baner zgody na cookies zgodny z RODO: przyciski „Akceptuj” i „Odrzuć” są równorzędne
 * i widoczne od razu (w zadaniu 1 brak przycisku odmowy był wadą jednej z ocenianych stron).
 */
export function CookieBanner() {
  const { t, path } = useI18n()
  const [visible, setVisible] = useState(() => readConsent() === null)
  const [details, setDetails] = useState(false)
  const [analytics, setAnalytics] = useState(() => readConsent()?.analytics ?? false)
  const [marketing, setMarketing] = useState(() => readConsent()?.marketing ?? false)

  useEffect(() => {
    const open = () => {
      setDetails(true)
      setVisible(true)
    }
    window.addEventListener(OPEN_EVENT, open)
    return () => window.removeEventListener(OPEN_EVENT, open)
  }, [])

  if (!visible) return null

  const finish = (a: boolean, m: boolean) => {
    saveConsent({ analytics: a, marketing: m })
    setAnalytics(a)
    setMarketing(m)
    setVisible(false)
  }

  return (
    <section
      role="region"
      aria-labelledby="cookie-title"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-sm border border-line bg-white p-5 shadow-2xl sm:inset-x-6 sm:p-6"
    >
      <h2 id="cookie-title" className="text-lg font-bold">
        {t.cookies.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {t.cookies.text}{' '}
        <Link to={path('privacy')} className="link">
          {t.nav.privacy}
        </Link>
      </p>

      {details && (
        <fieldset className="mt-4 space-y-3 border-t border-line pt-4">
          <legend className="sr-only">{t.cookies.settings}</legend>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked disabled className="mt-0.5 h-4 w-4 accent-brass" />
            <span>
              <strong>{t.cookies.necessary}</strong> – {t.cookies.necessaryText}
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-0.5 h-4 w-4 accent-brass" />
            <span>
              <strong>{t.cookies.analytics}</strong> – {t.cookies.analyticsText}
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-0.5 h-4 w-4 accent-brass" />
            <span>
              <strong>{t.cookies.marketing}</strong> – {t.cookies.marketingText}
            </span>
          </label>
        </fieldset>
      )}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button type="button" className="btn-primary flex-1" onClick={() => finish(true, true)}>
          {t.cookies.accept}
        </button>
        <button type="button" className="btn-outline flex-1" onClick={() => finish(false, false)}>
          {t.cookies.reject}
        </button>
        {details ? (
          <button type="button" className="btn-outline flex-1" onClick={() => finish(analytics, marketing)}>
            {t.cookies.save}
          </button>
        ) : (
          <button type="button" className="btn flex-1 text-ink underline underline-offset-4" onClick={() => setDetails(true)}>
            {t.cookies.settings}
          </button>
        )}
      </div>
    </section>
  )
}
