import { useEffect, useRef, useState } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { ArrowUp } from 'lucide-react'
import { LanguageProvider, useI18n } from '../i18n/LanguageContext'
import type { Lang } from '../i18n/types'
import { Header } from './Header'
import { Footer } from './Footer'
import { CookieBanner } from './CookieBanner'

function BackToTop() {
  const { t } = useI18n()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <button
      type="button"
      onClick={() => {
        window.scrollTo({ top: 0 })
        document.getElementById('main')?.focus({ preventScroll: true })
      }}
      className="fixed right-4 bottom-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-ink text-paper shadow-lg hover:bg-brass"
      aria-label={t.common.backToTop}
    >
      <ArrowUp aria-hidden="true" />
    </button>
  )
}

function Shell() {
  const { t } = useI18n()
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const prevPath = useRef(pathname)

  // Po zmianie podstrony przenosimy fokus na treść – czytnik ekranu ogłasza nową stronę.
  // Porównanie ścieżek (a nie flaga „pierwszy render”) jest odporne na podwójne efekty StrictMode.
  useEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-3 focus:font-semibold focus:text-paper"
      >
        {t.header.skip}
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <CookieBanner />
      <ScrollRestoration />
    </>
  )
}

export function Layout({ lang }: { lang: Lang }) {
  return (
    <LanguageProvider lang={lang}>
      <Shell />
    </LanguageProvider>
  )
}
