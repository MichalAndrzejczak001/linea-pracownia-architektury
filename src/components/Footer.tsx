import { Link } from 'react-router'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import type { RouteId } from '../i18n/routes'
import { COMPANY } from '../data/company'
import { NewsletterForm } from './NewsletterForm'
import { Logo, SocialIcon } from './ui'
import { openCookieSettings } from './CookieBanner'

const LINKS: RouteId[] = ['offer', 'projects', 'studio', 'team', 'reviews', 'careers', 'news', 'faq', 'contact']

export function Footer() {
  const { t, l, path } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="on-dark bg-ink text-paper">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-sm leading-relaxed text-paper/75">{t.footer.about}</p>
          <h2 className="mt-8 mb-3 text-sm font-bold uppercase tracking-[0.15em] text-brass-light">{t.footer.followTitle}</h2>
          <ul className="flex gap-3">
            {(Object.keys(COMPANY.social) as (keyof typeof COMPANY.social)[]).map((s) => (
              <li key={s}>
                <a
                  href={COMPANY.social[s]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-paper/25 text-paper transition-colors hover:border-brass-light hover:text-brass-light"
                >
                  <SocialIcon name={s} />
                  <span className="sr-only">
                    {s} {t.common.externalLink}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-brass-light">{t.footer.contactTitle}</h2>
          <address className="space-y-3 not-italic text-paper/85">
            <p className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brass-light" />
              <span>
                {COMPANY.street}
                <br />
                {COMPANY.postalCity}
              </span>
            </p>
            <p className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brass-light" />
              <a href={COMPANY.phoneHref} className="hover:text-brass-light hover:underline">
                {COMPANY.phone}
              </a>
            </p>
            <p className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brass-light" />
              <a href={`mailto:${COMPANY.email}`} className="break-all hover:text-brass-light hover:underline">
                {COMPANY.email}
              </a>
            </p>
          </address>
          <dl className="mt-5 space-y-1 text-sm text-paper/75">
            {l(COMPANY.hours).map(([d, h]) => (
              <div key={d} className="flex justify-between gap-4">
                <dt>{d}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label={t.footer.menuTitle} className="lg:col-span-2">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-brass-light">{t.footer.menuTitle}</h2>
          <ul className="space-y-2.5">
            {LINKS.map((id) => (
              <li key={id}>
                <Link to={path(id)} className="text-paper/85 hover:text-brass-light hover:underline">
                  {t.nav[id]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-brass-light">{t.newsletter.title}</h2>
          <p className="mb-4 text-sm leading-relaxed text-paper/75">{t.newsletter.text}</p>
          <NewsletterForm dark />
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="container-x flex flex-col gap-4 py-6 text-sm text-paper/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {COMPANY.founded}–{year} {COMPANY.name}. {t.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link to={path('privacy')} className="hover:text-brass-light hover:underline">
                {t.nav.privacy}
              </Link>
            </li>
            <li>
              <Link to={path('accessibility')} className="hover:text-brass-light hover:underline">
                {t.nav.accessibility}
              </Link>
            </li>
            <li>
              <button type="button" onClick={openCookieSettings} className="hover:text-brass-light hover:underline">
                {t.cookies.manage}
              </button>
            </li>
          </ul>
        </div>
        <p className="container-x pb-6 text-xs leading-relaxed text-paper/60">{t.footer.disclaimer}</p>
      </div>
    </footer>
  )
}
