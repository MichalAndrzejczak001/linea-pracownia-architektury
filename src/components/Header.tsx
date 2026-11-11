import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { translatePath, type RouteId } from '../i18n/routes'
import { LANGS } from '../i18n/types'
import { Logo } from './ui'
import { SearchDialog } from './SearchDialog'

const NAV: RouteId[] = ['offer', 'projects', 'studio', 'news', 'guide', 'contact']

export function Header() {
  const { t, lang, path } = useI18n()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  // Menu mobilne: blokada przewijania tła i zamykanie klawiszem Esc
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-[0.95rem] font-semibold transition-colors hover:text-brass ${
      isActive ? 'text-brass after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-brass' : 'text-ink'
    }`

  const langSwitch = (
    <ul className="flex items-center gap-1 text-sm font-semibold" aria-label={t.header.language}>
      {LANGS.map((l) => (
        <li key={l}>
          <Link
            to={l === lang ? pathname : translatePath(pathname, lang, l)}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? 'true' : undefined}
            aria-label={l === lang ? undefined : t.header.switchTo}
            onClick={close}
            className={`rounded-sm px-2 py-1.5 uppercase ${l === lang ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}
          >
            {l}
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="container-x flex h-18 items-center justify-between gap-6 py-3">
        <Link to={path('home')} onClick={close}>
          <Logo />
          <span className="sr-only"> – {t.nav.home}</span>
        </Link>

        <nav aria-label={t.nav.main} className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-7">
            {NAV.map((id) => (
              <li key={id}>
                <NavLink to={path(id)} className={navClass}>
                  {t.nav[id]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 xl:gap-4">
          <SearchDialog />
          <div className="hidden items-center gap-3 lg:flex xl:gap-4">
            {langSwitch}
            <Link to={path('contact')} className="btn-accent">
              {t.header.cta}
            </Link>
          </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.header.closeMenu : t.header.openMenu}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        </div>
      </div>
    </header>

      {/* Panel poza <header>: backdrop-filter nagłówka tworzy kontekst dla position:fixed */}
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-[73px] bottom-0 z-40 overflow-y-auto border-t border-line bg-paper lg:hidden">
          <nav aria-label={t.nav.main} className="container-x py-6">
            <ul className="divide-y divide-line">
              {NAV.map((id) => (
                <li key={id}>
                  <NavLink
                    to={path(id)}
                    onClick={close}
                    className={({ isActive }) => `block py-4 text-xl font-bold ${isActive ? 'text-brass' : 'text-ink'}`}
                  >
                    {t.nav[id]}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-6">
              <Link to={path('contact')} onClick={close} className="btn-accent w-full py-4 text-base">
                {t.header.cta}
              </Link>
              {langSwitch}
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
