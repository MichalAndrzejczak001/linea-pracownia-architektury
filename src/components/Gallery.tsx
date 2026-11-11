import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { fmt } from '../i18n/pl'
import { useI18n } from '../i18n/LanguageContext'
import { Img } from './ui'
import { asset } from '../lib/asset'

/**
 * Galeria z podglądem pełnoekranowym. Natywny <dialog> zapewnia pułapkę fokusu
 * i zamykanie klawiszem Esc; strzałki ← → przełączają zdjęcia.
 */
export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const { t } = useI18n()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const openedFrom = useRef(0)
  const [index, setIndex] = useState<number | null>(null)
  const total = images.length

  const open = (i: number) => {
    openedFrom.current = i
    setIndex(i)
    dialogRef.current?.showModal()
  }
  const close = () => dialogRef.current?.close()
  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + total) % total))

  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    // Po zamknięciu fokus wraca do miniatury, z której otwarto galerię
    const onClose = () => {
      setIndex(null)
      triggerRefs.current[openedFrom.current]?.focus()
    }
    dlg.addEventListener('close', onClose)
    return () => dlg.removeEventListener('close', onClose)
  }, [])

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <li key={img} className={i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}>
            <button
              type="button"
              ref={(el) => {
                triggerRefs.current[i] = el
              }}
              onClick={() => open(i)}
              className="group block h-full w-full overflow-hidden bg-sand"
              aria-label={fmt(t.project.openImage, { n: i + 1, total })}
            >
              <Img
                name={img}
                alt=""
                sizes={i === 0 ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, 50vw'}
                className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={t.project.gallery}
        className="m-0 h-full max-h-none w-full max-w-none bg-[#0f1012]/95 p-0 text-paper"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {index !== null && (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-4" onClick={(e) => e.target === e.currentTarget && close()}>
            <figure className="flex max-w-6xl flex-col items-center">
              <img src={asset(`images/${images[index]}.webp`)} alt={`${alt} – ${fmt(t.lightbox.counter, { n: index + 1, total })}`} className="max-h-[72vh] w-auto object-contain" />
              <figcaption className="mt-3 text-center text-sm text-paper/80" aria-live="polite">
                {fmt(t.lightbox.counter, { n: index + 1, total })}
              </figcaption>
            </figure>
            <div className="flex gap-3">
              <button type="button" onClick={() => step(-1)} className="btn-outline-light h-12 w-12 p-0" aria-label={t.lightbox.prev}>
                <ChevronLeft aria-hidden="true" />
              </button>
              <button type="button" onClick={close} className="btn-light h-12 px-5" aria-label={t.lightbox.close}>
                <X aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} className="btn-outline-light h-12 w-12 p-0" aria-label={t.lightbox.next}>
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
