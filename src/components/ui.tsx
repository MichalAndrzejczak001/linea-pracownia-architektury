import { useEffect, useRef, useState, type ElementType, type HTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router'
import { useI18n } from '../i18n/LanguageContext'
import { asset } from '../lib/asset'

/* ---------- Logo (sygnet + logotyp) ---------- */

export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  const { lang } = useI18n()
  const ink = light ? '#f7f3ed' : '#1d1f22'
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true" focusable="false">
        <g fill="#c2934f">
          <rect x="7" y="17" width="3.2" height="14" />
          <rect x="14" y="12" width="3.2" height="19" />
          <rect x="21" y="7" width="3.2" height="24" />
        </g>
        <rect x="4" y="31" width="30" height="2.6" fill={ink} />
        <path d="M27.5 31 33 8" stroke={ink} strokeWidth="2.6" />
      </svg>
      <span className="leading-none">
        <span className={`block text-xl font-extrabold tracking-[0.22em] ${light ? 'text-paper' : 'text-ink'}`}>LINEA</span>
        <span className={`mt-1 block text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${light ? 'text-paper/75' : 'text-muted'}`}>
          {lang === 'pl' ? 'Pracownia Architektury' : 'Architecture Studio'}
        </span>
      </span>
    </span>
  )
}

/* ---------- Obraz z wersją mniejszą (srcset) i leniwym ładowaniem ---------- */

interface ImgProps {
  name: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
  /** square = portret 600×600; wide = 16:10 z wersją -sm */
  variant?: 'wide' | 'square' | 'single'
}

export function Img({ name, alt, className = '', sizes = '(min-width: 1024px) 50vw, 100vw', priority = false, variant = 'wide' }: ImgProps) {
  const src = asset(`images/${name}.webp`)
  const dims = variant === 'square' ? { width: 600, height: 600 } : { width: 1600, height: 1000 }
  return (
    <img
      src={src}
      srcSet={variant === 'wide' ? `${asset(`images/${name}-sm.webp`)} 800w, ${src} 1600w` : undefined}
      sizes={variant === 'wide' ? sizes : undefined}
      alt={alt}
      {...dims}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={`object-cover ${className}`}
    />
  )
}

/* ---------- SEO: React 19 przenosi <title> i <meta> do <head> ---------- */

export function Seo({ title, description }: { title: string; description: string }) {
  const { t } = useI18n()
  const full = title.includes('LINEA') ? title : `${title} | ${t.meta.siteName}`
  return (
    <>
      <title>{full}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
    </>
  )
}

/* ---------- Animacja pojawiania się przy przewijaniu ---------- */

export function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  ...rest
}: { children: ReactNode; as?: ElementType; className?: string; delay?: number } & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null)
  // Bez IntersectionObserver (stare przeglądarki) treść jest widoczna od razu
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag {...rest} ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  )
}

/* ---------- Nagłówek sekcji ---------- */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  align = 'left',
  as: H = 'h2',
}: {
  eyebrow?: string
  title: string
  lead?: string
  id?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
}) {
  return (
    <div className={`mb-10 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <H id={id} className={H === 'h1' ? 'text-4xl font-extrabold sm:text-5xl' : 'text-3xl font-bold sm:text-4xl'}>
        {title}
      </H>
      {lead && <p className="mt-4 text-lg leading-relaxed text-muted">{lead}</p>}
    </div>
  )
}

/* ---------- Nagłówek podstrony z okruszkami ---------- */

export function PageHeader({ eyebrow, title, lead, crumbs = [] }: { eyebrow?: string; title: string; lead?: string; crumbs?: { label: string; to?: string }[] }) {
  const { t, path } = useI18n()
  const all = [{ label: t.nav.home, to: path('home') }, ...crumbs]
  return (
    <header className="border-b border-line bg-sand/60">
      <div className="container-x py-12 sm:py-16">
        <nav aria-label={t.nav.breadcrumb} className="mb-6 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {all.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {c.to && i < all.length - 1 ? (
                  <Link to={c.to} className="hover:text-ink hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current={i === all.length - 1 ? 'page' : undefined} className="font-semibold text-ink">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-4xl text-4xl font-extrabold sm:text-5xl">{title}</h1>
        {lead && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">{lead}</p>}
      </div>
    </header>
  )
}

/* ---------- Pasek CTA ---------- */

export function CtaBand({ title, text, cta }: { title: string; text: string; cta?: string }) {
  const { t, path } = useI18n()
  return (
    <section className="on-dark bg-ink text-paper" aria-labelledby="cta-band-title">
      <div className="container-x flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 id="cta-band-title" className="text-3xl font-bold sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-lg text-paper/80">{text}</p>
        </div>
        <Link to={path('contact')} className="btn-light shrink-0">
          {cta ?? t.home.ctaPrimary}
        </Link>
      </div>
    </section>
  )
}

/* ---------- Ikony mediów społecznościowych (lucide nie zawiera logotypów marek) ---------- */

export function SocialIcon({ name }: { name: 'instagram' | 'linkedin' | 'facebook' }) {
  const paths = {
    instagram:
      'M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2Zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6Zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z',
    linkedin:
      'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11Z',
    facebook:
      'M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.25-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z',
  }
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={paths[name]} />
    </svg>
  )
}
