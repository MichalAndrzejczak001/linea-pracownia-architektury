import { useId, useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { EMAIL_RE } from '../lib/validation'

/** Zapis do newslettera (wersja demonstracyjna – bez wysyłki na serwer). */
export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const { t } = useI18n()
  const id = useId()
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) return setError(t.contact.errors.email)
    if (!consent) return setError(t.contact.errors.consent)
    setError(null)
    setDone(true)
  }

  if (done) {
    return (
      <p role="status" className={`flex items-start gap-2 font-semibold ${dark ? 'text-brass-light' : 'text-success'}`}>
        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" /> {t.newsletter.success}
      </p>
    )
  }

  return (
    <form onSubmit={submit} noValidate aria-describedby={error ? `${id}-err` : undefined}>
      <label htmlFor={`${id}-email`} className={`mb-1.5 block text-sm font-semibold ${dark ? 'text-paper' : 'text-ink'}`}>
        {t.newsletter.label}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.newsletter.placeholder}
          aria-invalid={error ? true : undefined}
          className={`field min-w-0 flex-1 ${dark ? 'border-paper/30 bg-ink-2 text-paper placeholder:text-paper/60 focus:border-brass-light' : ''}`}
        />
        <button type="submit" className={dark ? 'btn-light' : 'btn-primary'}>
          {t.newsletter.submit}
        </button>
      </div>
      <label className={`mt-3 flex items-start gap-2 text-sm ${dark ? 'text-paper/80' : 'text-muted'}`}>
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-brass" />
        {t.newsletter.consent}
      </label>
      {error && (
        <p id={`${id}-err`} role="alert" className={`mt-2 text-sm font-semibold ${dark ? 'text-[#ffb4a8]' : 'text-error'}`}>
          {error}
        </p>
      )}
    </form>
  )
}
