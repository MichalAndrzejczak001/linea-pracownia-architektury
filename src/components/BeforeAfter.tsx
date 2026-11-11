import { useId, useState } from 'react'
import { MoveHorizontal } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'

/**
 * Porównanie „szkic ↔ realizacja”. Sterowane natywnym <input type="range">,
 * więc działa myszą, dotykiem i klawiaturą (strzałki, Home/End) oraz z czytnikiem ekranu.
 */
export function BeforeAfter({ before, after, alt }: { before: string; after: string; alt: string }) {
  const { t } = useI18n()
  const id = useId()
  const [pos, setPos] = useState(50)

  return (
    <div className="relative aspect-[16/10] w-full select-none overflow-hidden bg-sand">
      <img src={`/images/${after}.webp`} alt={`${alt} – ${t.beforeAfter.after}`} width={1600} height={1000} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <img
        src={`/images/${before}.webp`}
        alt={`${alt} – ${t.beforeAfter.before}`}
        width={1600}
        height={1000}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <span className="pointer-events-none absolute top-3 left-3 rounded-sm bg-ink/85 px-2.5 py-1 text-xs font-bold text-paper">{t.beforeAfter.before}</span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-sm bg-ink/85 px-2.5 py-1 text-xs font-bold text-paper">{t.beforeAfter.after}</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-paper shadow" style={{ left: `${pos}%` }} aria-hidden="true">
        <span className="absolute top-1/2 left-1/2 inline-flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-lg">
          <MoveHorizontal className="h-5 w-5" />
        </span>
      </div>
      <label htmlFor={id} className="sr-only">
        {t.beforeAfter.label}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`${pos}% ${t.beforeAfter.before}`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}
