import { useEffect, useState, type FocusEvent, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { ArrowRight, Calculator, ChevronDown, Menu, X } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { fmt } from '../i18n/pl'
import { translatePath, type RouteId } from '../i18n/routes'
import { LANGS } from '../i18n/types'
import { SERVICES } from '../data/services'
import { Logo } from './ui'
import { SearchDialog } from './SearchDialog'
import { ServiceIcon } from './ServiceIcon'

interface Child {
  to: string
  label: string
  desc?: string
  icon?: ReactNode
}
interface NavItem {
  key: string
  label: string
  to: string
  children?: Child[]
  /** szeroki panel (mega menu) dla usług */
  wide?: boolean
  footer?: Child[]
}

/** Struktura menu – wspólna dla widoku komputerowego i mobilnego. */
function useNav(): NavItem[] {
  const { t, l, path } = useI18n()
  const child = (id: 'studio' | 'team' | 'reviews' | 'careers' | 'news' | 'guide' | 'faq', desc: string): Child => ({
    to: path(id as RouteId),
    label: t.nav[id],
    desc,
  })
  return [
    {
      key: 'offer',
      label: t.nav.offer,
      to: path('offer'),
      wide: true,
      children: SERVICES.map((s) => ({
        to: path('offer', s.slug),
        label: l(s.title),
        desc: l(s.short),
        icon: <ServiceIcon name={s.icon} className="h-5 w-5" />,
      })),
      footer: [
        { to: path('offer'), label: t.nav.allServices, icon: <ArrowRight aria-hidden="true" className="h-4 w-4" /> },
        { to: `${path('offer')}#kalkulator`, label: t.nav.calculator, icon: <Calculator aria-hidden="true" className="h-4 w-4" /> },
      ],
    },
    { key: 'projects', label: t.nav.projects, to: path('projects') },
    {
      key: 'about',
      label: t.nav.about,
      to: path('studio'),
      children: [child('studio', t.nav.desc.studio), child('team', t.nav.desc.team), child('reviews', t.nav.desc.reviews), child('careers', t.nav.desc.careers)],
    },
    {
      key: 'knowledge',
      label: t.nav.knowledge,
      to: path('news'),
      children: [child('news', t.nav.desc.news), child('guide', t.nav.desc.guide), child('faq', t.nav.desc.faq)],
    },
    { key: 'contact', label: t.nav.contact, to: path('contact') },
  ]
}

const isUnder = (pathname: string, to: string) => {
  const clean = to.split('#')[0]
  return pathname === clean || pathname.startsWith(clean + '/')
}
const isActive = (pathname: string, item: NavItem) => isUnder(pathname, item.to) || !!item.children?.some((c) => isUnder(pathname, c.to))
const topClass = (on: boolean) =>
  `relative py-2 text-[0.95rem] font-semibold transition-colors hover:text-brass ${
    on ? 'text-brass after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-brass' : 'text-ink'
  }`

/* ---------- Element menu z rozwijaną listą (komputer) ---------- */
function DesktopItem({ item, open, setOpen, onNavigate }: { item: NavItem; open: boolean; setOpen: (o: boolean) => void; onNavigate: () => void }) {
  const { t } = useI18n()
  const { pathname } = useLocation()
  const panelId = `submenu-${item.key}`
  const onBlur = (e: FocusEvent<HTMLLIElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false)
  }
  const onKeyDown = (e: ReactKeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Escape' && open) {
      setOpen(false)
      e.currentTarget.querySelector<HTMLButtonElement>('button[aria-expanded]')?.focus()
    }
  }
  return (
    <li className={item.wide ? 'static' : 'relative'} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onBlur={onBlur} onKeyDown={onKeyDown}>
      <span className="flex items-center gap-0.5">
        <NavLink to={item.to} end className={() => topClass(isActive(pathname, item))} onClick={onNavigate}>
          {item.label}
        </NavLink>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={fmt(t.nav.submenu, { name: item.label })}
          onClick={() => setOpen(!open)}
          className="inline-flex h-8 w-6 items-center justify-center rounded-sm text-muted hover:text-ink"
        >
          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </span>
      <div id={panelId} hidden={!open} className={`absolute top-full z-50 pt-3 ${item.wide ? 'inset-x-4 sm:inset-x-6 lg:inset-x-8' : '-left-4 w-80'}`}>
        <div className="border border-line bg-paper shadow-xl">
          <ul className={item.wide ? 'grid gap-1 p-4 md:grid-cols-2 xl:grid-cols-4' : 'p-2'}>
            {item.children!.map((c) => (
              <li key={c.to}>
                <Link
                  to={c.to}
                  onClick={onNavigate}
                  aria-current={pathname === c.to ? 'page' : undefined}
                  className="flex h-full gap-3 rounded-sm p-3 hover:bg-sand/70 focus-visible:bg-sand/70 aria-[current=page]:bg-sand"
                >
                  {c.icon && <span className="mt-0.5 text-brass">{c.icon}</span>}
                  <span>
                    <span className="block font-bold text-ink">{c.label}</span>
                    {c.desc && <span className="mt-0.5 block text-sm text-muted">{c.desc}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {item.footer && (
            <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-line bg-sand/50 px-7 py-4">
              {item.footer.map((f) => (
                <Link key={f.to} to={f.to} onClick={onNavigate} className="inline-flex items-center gap-2 text-sm font-bold text-brass hover:underline">
                  {f.icon} {f.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export function Header() {
  const { t, lang, path } = useI18n()
  const { pathname } = useLocation()
  const nav = useNav()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const closeAll = () => {
    setMobileOpen(false)
    setOpenKey(null)
  }

  // Menu mobilne: blokada przewijania tła i zamykanie klawiszem Esc
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileOpen])

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
            onClick={closeAll}
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
        <div className="container-x relative flex h-18 items-center justify-between gap-6 py-3">
          <Link to={path('home')} onClick={closeAll}>
            <Logo />
            <span className="sr-only"> – {t.nav.home}</span>
          </Link>

          <nav aria-label={t.nav.main} className="hidden lg:block">
            <ul className="flex items-center gap-4 xl:gap-6">
              {nav.map((item) =>
                item.children ? (
                  <DesktopItem
                    key={item.key}
                    item={item}
                    open={openKey === item.key}
                    // element zamyka tylko własną listę – utrata fokusu w jednym menu nie może zamknąć innego
                    setOpen={(o) => setOpenKey((k) => (o ? item.key : k === item.key ? null : k))}
                    onNavigate={closeAll}
                  />
                ) : (
                  <li key={item.key}>
                    <NavLink to={item.to} className={() => topClass(isActive(pathname, item))} onClick={closeAll}>
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
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
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? t.header.closeMenu : t.header.openMenu}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Panel poza <header>: backdrop-filter nagłówka tworzy kontekst dla position:fixed */}
      {mobileOpen && (
        <div id="mobile-menu" className="fixed inset-x-0 top-[73px] bottom-0 z-40 overflow-y-auto border-t border-line bg-paper lg:hidden">
          <nav aria-label={t.nav.main} className="container-x py-4">
            <ul className="divide-y divide-line">
              {nav.map((item) => {
                const sectionOpen = mobileSection === item.key
                return (
                  <li key={item.key}>
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.to}
                        onClick={closeAll}
                        className={`block flex-1 py-4 text-xl font-bold ${isActive(pathname, item) ? 'text-brass' : 'text-ink'}`}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <button
                          type="button"
                          aria-expanded={sectionOpen}
                          aria-controls={`m-${item.key}`}
                          aria-label={fmt(t.nav.submenu, { name: item.label })}
                          onClick={() => setMobileSection(sectionOpen ? null : item.key)}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line"
                        >
                          <ChevronDown aria-hidden="true" className={`h-5 w-5 transition-transform ${sectionOpen ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    {item.children && (
                      <ul id={`m-${item.key}`} hidden={!sectionOpen} className="mb-3 space-y-1 border-l-2 border-brass pl-4">
                        {item.children.map((c) => (
                          <li key={c.to}>
                            <Link to={c.to} onClick={closeAll} className="flex items-center gap-3 py-2 font-semibold text-ink-2">
                              {c.icon && <span className="text-brass">{c.icon}</span>}
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
            <div className="mt-8 flex flex-col gap-6">
              <Link to={path('contact')} onClick={closeAll} className="btn-accent w-full py-4 text-base">
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
