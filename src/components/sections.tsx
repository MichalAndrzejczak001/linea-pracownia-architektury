import { useI18n } from '../i18n/LanguageContext'
import { PROCESS } from '../data/services'
import { FAQ } from '../data/people'
import { Plus } from 'lucide-react'
import { Reveal } from './ui'

export function ProcessSteps({ dark = false }: { dark?: boolean }) {
  const { l } = useI18n()
  return (
    <ol className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {PROCESS.map((step, i) => (
        <Reveal as="li" key={i} delay={i * 60} className={`flex flex-col p-7 ${dark ? 'bg-ink-2' : 'bg-paper'}`}>
          <span className="text-4xl font-extrabold text-brass" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-4 text-lg font-bold">{l(step.title)}</h3>
          <p className="mt-2 flex-1 leading-relaxed text-muted">{l(step.text)}</p>
          <p className="mt-4 text-sm font-semibold text-ink-2">{l(step.time)}</p>
        </Reveal>
      ))}
    </ol>
  )
}

export function Faq() {
  const { l } = useI18n()
  return (
    <div className="divide-y divide-line border-y border-line">
      {FAQ.map((item, i) => (
        <details key={i} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
            {l(item.q)}
            <Plus aria-hidden="true" className="h-5 w-5 shrink-0 text-brass transition-transform group-open:rotate-45" />
          </summary>
          <p className="max-w-3xl pb-5 leading-relaxed text-ink-2">{l(item.a)}</p>
        </details>
      ))}
    </div>
  )
}
