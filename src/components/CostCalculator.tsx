import { useId, useState } from 'react'
import { Link } from 'react-router'
import { Check, Calculator } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { fmt } from '../i18n/pl'
import { STANDARDS, type StandardId } from '../data/services'
import { AREA, estimate, type CalcType } from '../lib/estimate'

/** Kalkulator orientacyjnej wyceny – narzędzie diagnozy potrzeb (kryterium C1 z zadania 1). */
const TYPES: CalcType[] = ['house', 'interior', 'adaptation']

export function CostCalculator() {
  const { t, l, lang, path, formatPrice } = useI18n()
  const id = useId()
  const [type, setType] = useState<CalcType>('house')
  const [area, setArea] = useState(150)
  const [standard, setStandard] = useState<StandardId>('extended')

  const safeArea = Math.min(AREA.max, Math.max(AREA.min, area || AREA.min))
  const { service, low, high } = estimate(type, safeArea, standard)
  const query = new URLSearchParams({ type, area: String(safeArea), standard, est: `${low}-${high}` })

  return (
    <div className="grid overflow-hidden border border-line bg-white lg:grid-cols-5">
      <form className="space-y-7 p-6 sm:p-8 lg:col-span-3" onSubmit={(e) => e.preventDefault()} aria-labelledby={`${id}-title`}>
        <h3 id={`${id}-title`} className="flex items-center gap-2 text-xl font-bold">
          <Calculator aria-hidden="true" className="h-5 w-5 text-brass" /> {t.calculator.title}
        </h3>

        <fieldset>
          <legend className="field-label">{t.calculator.type}</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {TYPES.map((ty) => (
              <label
                key={ty}
                className={`flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-3 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brass ${
                  type === ty ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'
                }`}
              >
                <input type="radio" name={`${id}-type`} value={ty} checked={type === ty} onChange={() => setType(ty)} className="sr-only" />
                {t.calculator.types[ty]}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <div className="flex items-end justify-between gap-4">
            <label htmlFor={`${id}-area`} className="field-label">
              {t.calculator.area}
            </label>
            <input
              type="number"
              inputMode="numeric"
              min={AREA.min}
              max={AREA.max}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              onBlur={() => setArea(safeArea)}
              aria-label={t.calculator.area}
              className="field mb-1.5 w-28 py-1.5 text-right font-bold"
            />
          </div>
          <input
            id={`${id}-area`}
            type="range"
            min={AREA.min}
            max={AREA.max}
            step={5}
            value={safeArea}
            onChange={(e) => setArea(Number(e.target.value))}
            aria-valuetext={`${safeArea} m²`}
            className="w-full accent-brass"
          />
          <p className="mt-1 text-sm text-muted">{fmt(t.calculator.areaHint, { min: AREA.min, max: AREA.max })}</p>
        </div>

        <fieldset>
          <legend className="field-label">{t.calculator.standard}</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {STANDARDS.map((s) => (
              <label
                key={s.id}
                className={`flex cursor-pointer flex-col rounded-sm border px-3 py-3 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brass ${
                  standard === s.id ? 'border-brass bg-brass/10' : 'border-line hover:border-ink'
                }`}
              >
                <input type="radio" name={`${id}-std`} value={s.id} checked={standard === s.id} onChange={() => setStandard(s.id)} className="sr-only" />
                <span className="font-bold">{l(s.label)}</span>
                <span className="text-muted">{l(s.hint)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      <div className="on-dark flex flex-col bg-ink p-6 text-paper sm:p-8 lg:col-span-2" aria-live="polite">
        <p className="eyebrow">{t.calculator.resultLabel}</p>
        <p className="mt-3 text-3xl font-extrabold sm:text-4xl">
          {formatPrice(low)} – {formatPrice(high)}
        </p>
        <p className="mt-1 text-sm text-paper/75">
          {t.calculator.resultNet} · {formatPrice(Math.round(low * 1.23))} – {formatPrice(Math.round(high * 1.23))} {t.calculator.resultGross}
        </p>
        <dl className="mt-6 space-y-1 border-t border-paper/15 pt-5">
          <dt className="text-sm text-paper/70">{t.calculator.resultTime}</dt>
          <dd className="font-bold">{l(service.duration)}</dd>
        </dl>
        <p className="mt-5 text-sm text-paper/70">{t.calculator.resultIncludes}</p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {l(service.scope)
            .slice(0, 3)
            .map((s) => (
              <li key={s} className="flex gap-2">
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brass-light" /> {s}
              </li>
            ))}
        </ul>
        <p className="mt-5 text-xs leading-relaxed text-paper/65">{t.calculator.lead}</p>
        <Link to={`${path('contact')}?${query.toString()}`} className="btn-light mt-6" lang={lang}>
          {t.calculator.cta}
        </Link>
      </div>
    </div>
  )
}
