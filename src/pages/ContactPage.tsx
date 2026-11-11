import { useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router'
import { CheckCircle2, Clock, Info, Mail, MapPin, Phone } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { fmt } from '../i18n/pl'
import { LOCALE } from '../i18n/types'
import { COMPANY } from '../data/company'
import { STANDARDS } from '../data/services'
import { EMAIL_RE, PHONE_RE, digitsCount } from '../lib/validation'
import { PageHeader, Seo } from '../components/ui'

const TYPES = ['house', 'catalog', 'extension', 'interior', 'adaptation', 'commercial', 'plot', 'supervision', 'other'] as const
const BUDGETS = ['b1', 'b2', 'b3', 'b4', 'unknown'] as const
const STARTS = ['now', 'q', 'h', 'later'] as const
const MODES = ['online', 'studio', 'phone'] as const

interface Values {
  name: string
  email: string
  phone: string
  type: string
  location: string
  area: string
  budget: string
  start: string
  hasPlot: boolean
  message: string
  mode: (typeof MODES)[number]
  slot: string
  nda: boolean
  consent: boolean
  newsletter: boolean
}
type Field = keyof Values
type Errors = Partial<Record<Field, string>>

/** Terminy konsultacji: najbliższe 8 dni roboczych, zawsze liczone od dzisiejszej daty. */
function upcomingSlots(count = 8): string[] {
  const days: string[] = []
  const d = new Date()
  while (days.length < count) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(d.toISOString().slice(0, 10))
  }
  return days
}
const HOURS = ['10:00', '13:00', '16:00']

export function ContactPage() {
  const { t, l, lang, path, formatPrice } = useI18n()
  const f = t.contact.form
  const [params] = useSearchParams()
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)

  // Dane przekazane z kalkulatora wyceny lub przycisku „Zapytaj o tę usługę”
  const [prefilled] = useState(() => params.has('type'))
  const [values, setValues] = useState<Values>(() => {
    const type = params.get('type') ?? ''
    const area = params.get('area') ?? ''
    const std = STANDARDS.find((s) => s.id === params.get('standard'))
    const [lo, hi] = (params.get('est') ?? '').split('-').map(Number)
    const calcNote =
      std && lo && hi
        ? `${t.calculator.title}: ${t.calculator.types[type as 'house'] ?? type}, ${area} m², ${l(std.label).toLowerCase()} – ${formatPrice(lo)}–${formatPrice(hi)} ${t.calculator.resultNet}.\n\n`
        : ''
    return {
      name: '',
      email: '',
      phone: '',
      type: (TYPES as readonly string[]).includes(type) ? type : '',
      location: '',
      area,
      budget: '',
      start: '',
      hasPlot: false,
      message: calcNote,
      mode: 'online',
      slot: '',
      nda: false,
      consent: false,
      newsletter: false,
    }
  })
  const [errors, setErrors] = useState<Errors>({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const slots = useMemo(() => upcomingSlots(), [])
  const dayFmt = new Intl.DateTimeFormat(LOCALE[lang], { weekday: 'long', day: 'numeric', month: 'long' })

  const validate = (v: Values): Errors => {
    const e: Errors = {}
    const req = t.contact.errors.required
    if (!v.name.trim()) e.name = req
    if (!v.email.trim()) e.email = req
    else if (!EMAIL_RE.test(v.email.trim())) e.email = t.contact.errors.email
    if (v.phone.trim() && (!PHONE_RE.test(v.phone.trim()) || digitsCount(v.phone) < 9 || digitsCount(v.phone) > 15)) e.phone = t.contact.errors.phone
    if (!v.type) e.type = req
    if (v.area && (Number(v.area) < 10 || Number(v.area) > 5000 || Number.isNaN(Number(v.area)))) e.area = t.contact.errors.area
    if (v.message.trim().length < 20) e.message = v.message.trim() ? t.contact.errors.message : req
    if (!v.consent) e.consent = t.contact.errors.consent
    return e
  }

  const set = <K extends Field>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value }
    setValues(next)
    if (attempted) setErrors(validate(next)) // po pierwszej próbie wysyłki walidujemy na bieżąco
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setAttempted(true)
    const errs = validate(values)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setStatus('sending')
    // Strona demonstracyjna: symulujemy wysyłkę zamiast żądania do API
    window.setTimeout(() => {
      setStatus('sent')
      window.scrollTo({ top: 0 })
      requestAnimationFrame(() => successRef.current?.focus())
    }, 900)
  }

  const errCount = Object.keys(errors).length
  const describedBy = (k: Field, hint?: boolean) => [errors[k] && `${k}-error`, hint && `${k}-hint`].filter(Boolean).join(' ') || undefined
  const inputProps = (k: Field) => ({
    id: k,
    name: k,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': describedBy(k),
  })
  const label = (k: Field, text: string, required = false) => (
    <label htmlFor={k} className="field-label">
      {text}
      {required && (
        <span className="text-error" aria-hidden="true">
          {' '}
          *
        </span>
      )}
      {required && <span className="sr-only"> ({t.common.required})</span>}
    </label>
  )
  const error = (k: Field) =>
    errors[k] ? (
      <p id={`${k}-error`} className="field-error">
        {errors[k]}
      </p>
    ) : null

  return (
    <>
      <Seo title={t.contact.title} description={t.contact.description} />
      <PageHeader eyebrow={t.contact.eyebrow} title={t.contact.heading} lead={t.contact.lead} crumbs={[{ label: t.nav.contact }]} />

      <div className="container-x grid gap-12 py-14 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {status === 'sent' ? (
            <section className="border border-success/40 bg-white p-8" aria-labelledby="success-title">
              <CheckCircle2 aria-hidden="true" className="h-12 w-12 text-success" />
              <h2 id="success-title" ref={successRef} tabIndex={-1} className="mt-4 text-3xl font-bold outline-none">
                {fmt(f.successTitle, { name: values.name.trim().split(' ')[0] })}
              </h2>
              <p className="mt-3 text-lg text-ink-2">{f.successText}</p>
              <h3 className="mt-8 mb-3 font-bold">{f.successSummary}</h3>
              <dl className="divide-y divide-line border-y border-line text-sm">
                {(
                  [
                    [f.email, values.email],
                    [f.type, values.type && f.types[values.type as (typeof TYPES)[number]]],
                    [f.location, values.location],
                    [f.area, values.area && `${values.area} m²`],
                    [f.meetingMode, f.modes[values.mode]],
                    [f.slot, values.slot ? `${dayFmt.format(new Date(values.slot.split('T')[0] + 'T12:00'))}, ${values.slot.split('T')[1]}` : f.slotNone],
                  ] as [string, string][]
                )
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="grid grid-cols-3 gap-4 py-2.5">
                      <dt className="text-muted">{k}</dt>
                      <dd className="col-span-2 font-semibold">{v}</dd>
                    </div>
                  ))}
              </dl>
              <p className="mt-6 flex items-start gap-2 text-sm text-muted">
                <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" /> {f.demoNote}
              </p>
              <Link to={path('home')} className="btn-outline mt-6">
                {t.notFound.home}
              </Link>
            </section>
          ) : (
            <form ref={formRef} onSubmit={submit} noValidate className="space-y-10" aria-labelledby="form-title">
              <h2 id="form-title" className="text-2xl font-bold">
                {f.title}
              </h2>

              {prefilled && values.message && (
                <p className="flex items-start gap-2 border-l-4 border-brass bg-brass/10 p-4 text-sm font-medium" role="status">
                  <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brass" /> {f.fromCalculator}
                </p>
              )}

              {attempted && errCount > 0 && (
                <div role="alert" className="border-l-4 border-error bg-error/5 p-4 font-semibold text-error">
                  {fmt(f.errorsSummary, { count: errCount })}
                </div>
              )}

              <Fieldset legend={f.sectionYou}>
                <div className="sm:col-span-2">
                  {label('name', f.name, true)}
                  <input {...inputProps('name')} type="text" autoComplete="name" className="field" value={values.name} onChange={(e) => set('name', e.target.value)} />
                  {error('name')}
                </div>
                <div>
                  {label('email', f.email, true)}
                  <input {...inputProps('email')} type="email" autoComplete="email" className="field" value={values.email} onChange={(e) => set('email', e.target.value)} />
                  {error('email')}
                </div>
                <div>
                  {label('phone', f.phone)}
                  <input
                    {...inputProps('phone')}
                    aria-describedby={describedBy('phone', true)}
                    type="tel"
                    autoComplete="tel"
                    className="field"
                    value={values.phone}
                    onChange={(e) => set('phone', e.target.value)}
                  />
                  <p id="phone-hint" className="mt-1 text-sm text-muted">
                    {f.phoneHint}
                  </p>
                  {error('phone')}
                </div>
              </Fieldset>

              <Fieldset legend={f.sectionProject}>
                <div>
                  {label('type', f.type, true)}
                  <select {...inputProps('type')} className="field" value={values.type} onChange={(e) => set('type', e.target.value)}>
                    <option value="">{f.typePlaceholder}</option>
                    {TYPES.map((ty) => (
                      <option key={ty} value={ty}>
                        {f.types[ty]}
                      </option>
                    ))}
                  </select>
                  {error('type')}
                </div>
                <div>
                  {label('location', f.location)}
                  <input
                    {...inputProps('location')}
                    type="text"
                    className="field"
                    placeholder={f.locationPlaceholder}
                    value={values.location}
                    onChange={(e) => set('location', e.target.value)}
                  />
                </div>
                <div>
                  {label('area', f.area)}
                  <input {...inputProps('area')} type="number" inputMode="numeric" min={10} max={5000} className="field" value={values.area} onChange={(e) => set('area', e.target.value)} />
                  {error('area')}
                </div>
                <div>
                  {label('budget', f.budget)}
                  <select {...inputProps('budget')} className="field" value={values.budget} onChange={(e) => set('budget', e.target.value)}>
                    <option value="">{f.typePlaceholder}</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>
                        {f.budgets[b]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  {label('start', f.start)}
                  <select {...inputProps('start')} className="field" value={values.start} onChange={(e) => set('start', e.target.value)}>
                    <option value="">{f.typePlaceholder}</option>
                    {STARTS.map((s) => (
                      <option key={s} value={s}>
                        {f.starts[s]}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="flex items-center gap-3 self-end pb-3 text-sm font-semibold">
                  <input type="checkbox" name="hasPlot" checked={values.hasPlot} onChange={(e) => set('hasPlot', e.target.checked)} className="h-5 w-5 accent-brass" />
                  {f.hasPlot}
                </label>
                <div className="sm:col-span-2">
                  {label('message', f.message, true)}
                  <textarea
                    {...inputProps('message')}
                    rows={6}
                    className="field"
                    placeholder={f.messagePlaceholder}
                    value={values.message}
                    onChange={(e) => set('message', e.target.value)}
                  />
                  {error('message')}
                </div>
              </Fieldset>

              <Fieldset legend={f.sectionMeeting}>
                <fieldset className="sm:col-span-2">
                  <legend className="field-label">{f.meetingMode}</legend>
                  <div className="flex flex-wrap gap-2">
                    {MODES.map((m) => (
                      <label
                        key={m}
                        className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brass ${
                          values.mode === m ? 'border-ink bg-ink text-paper' : 'border-line bg-white hover:border-ink'
                        }`}
                      >
                        <input type="radio" name="mode" value={m} checked={values.mode === m} onChange={() => set('mode', m)} className="sr-only" />
                        {f.modes[m]}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="sm:col-span-2">
                  {label('slot', f.slot)}
                  <select
                    {...inputProps('slot')}
                    aria-describedby="slot-hint"
                    className="field"
                    value={values.slot}
                    onChange={(e) => set('slot', e.target.value)}
                  >
                    <option value="">{f.slotNone}</option>
                    {slots.map((day) => (
                      <optgroup key={day} label={dayFmt.format(new Date(day + 'T12:00'))}>
                        {HOURS.map((h) => (
                          <option key={h} value={`${day}T${h}`}>
                            {dayFmt.format(new Date(day + 'T12:00'))}, {h}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <p id="slot-hint" className="mt-1 text-sm text-muted">
                    {f.slotHint}
                  </p>
                </div>
              </Fieldset>

              <div className="space-y-4">
                <Check name="nda" checked={values.nda} onChange={(v) => set('nda', v)}>
                  {f.nda}
                </Check>
                <div>
                  <Check name="consent" checked={values.consent} onChange={(v) => set('consent', v)} invalid={!!errors.consent} required requiredLabel={t.common.required}>
                    {f.consent}{' '}
                    <Link to={path('privacy')} className="link" target="_blank">
                      {f.consentLink}
                    </Link>
                    .
                  </Check>
                  {error('consent')}
                </div>
                <Check name="newsletter" checked={values.newsletter} onChange={(v) => set('newsletter', v)}>
                  {f.newsletter}
                </Check>
              </div>

              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <button type="submit" className="btn-accent px-8 py-4 text-base" disabled={status === 'sending'}>
                  {status === 'sending' ? f.sending : f.submit}
                </button>
                <p className="text-sm text-muted">{f.demoNote}</p>
              </div>
            </form>
          )}
        </div>

        <aside className="space-y-8" aria-labelledby="info-title">
          <div className="border border-line bg-white p-6">
            <h2 id="info-title" className="text-lg font-bold">
              {t.contact.infoTitle}
            </h2>
            <dl className="mt-5 space-y-5">
              <InfoRow icon={<MapPin className="h-5 w-5" />} label={t.contact.address}>
                {COMPANY.street}
                <br />
                {COMPANY.postalCity}
              </InfoRow>
              <InfoRow icon={<Phone className="h-5 w-5" />} label={t.contact.phone}>
                <a href={COMPANY.phoneHref} className="hover:text-brass hover:underline">
                  {COMPANY.phone}
                </a>
              </InfoRow>
              <InfoRow icon={<Mail className="h-5 w-5" />} label={t.contact.email}>
                <a href={`mailto:${COMPANY.email}`} className="break-all hover:text-brass hover:underline">
                  {COMPANY.email}
                </a>
              </InfoRow>
              <InfoRow icon={<Clock className="h-5 w-5" />} label={t.contact.hours}>
                {l(COMPANY.hours).map(([d, h]) => (
                  <span key={d} className="block">
                    {d}: {h}
                  </span>
                ))}
              </InfoRow>
            </dl>
          </div>
          <MapBox />
        </aside>
      </div>
    </>
  )
}

function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-5 w-full border-b border-line pb-2 text-sm font-bold uppercase tracking-[0.15em] text-brass">{legend}</legend>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  )
}

function Check({
  name,
  checked,
  onChange,
  children,
  invalid,
  required,
  requiredLabel,
}: {
  name: string
  checked: boolean
  onChange: (v: boolean) => void
  children: ReactNode
  invalid?: boolean
  required?: boolean
  requiredLabel?: string
}) {
  return (
    <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-2">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${name}-error` : undefined}
        className="mt-0.5 h-5 w-5 shrink-0 accent-brass"
      />
      <span>
        {children}
        {required && (
          <>
            <span className="text-error" aria-hidden="true">
              {' '}
              *
            </span>
            <span className="sr-only"> ({requiredLabel})</span>
          </>
        )}
      </span>
    </label>
  )
}

function InfoRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="relative pl-8">
      <dt className="text-sm text-muted">
        <span aria-hidden="true" className="absolute top-0.5 left-0 text-brass">
          {icon}
        </span>
        {label}
      </dt>
      <dd className="font-semibold">{children}</dd>
    </div>
  )
}

/** Mapa ładowana dopiero po kliknięciu – bez łączenia z zewnętrznym serwerem przed zgodą użytkownika. */
function MapBox() {
  const { t } = useI18n()
  const [show, setShow] = useState(false)
  return (
    <section className="border border-line bg-white p-6" aria-labelledby="map-title">
      <h2 id="map-title" className="text-lg font-bold">
        {t.contact.mapTitle}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t.contact.mapText}</p>
      <div className="mt-4 aspect-[4/3] w-full overflow-hidden bg-sand">
        {show ? (
          <iframe title={t.contact.mapIframeTitle} src={COMPANY.osmEmbed} className="h-full w-full border-0" loading="lazy" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
            <MapPin aria-hidden="true" className="h-8 w-8 text-brass" />
            <button type="button" className="btn-primary" onClick={() => setShow(true)}>
              {t.contact.mapLoad}
            </button>
            <p className="text-xs text-muted">{t.contact.mapNotice}</p>
          </div>
        )}
      </div>
      <a href={COMPANY.osmLink} target="_blank" rel="noopener noreferrer" className="link mt-3 inline-block text-sm">
        {t.contact.mapOpen} <span className="sr-only">{t.common.externalLink}</span>
      </a>
    </section>
  )
}
