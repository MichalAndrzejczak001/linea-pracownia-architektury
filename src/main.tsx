import { StrictMode, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider, type RouteObject } from 'react-router'
import './index.css'
import { Layout } from './components/Layout'
import { ROUTES } from './i18n/routes'
import { LANGS, type Lang } from './i18n/types'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

/**
 * Podstrony ładowane leniwie (osobne pliki JS) – mniejszy pakiet startowy i szybsze LCP.
 * Strona główna i 404 są w pakiecie głównym, bo to najczęstsze strony wejścia.
 */
const page = (load: () => Promise<{ default: ComponentType }>): Pick<RouteObject, 'lazy'> => ({
  lazy: async () => ({ Component: (await load()).default }),
})
const Offer = () => import('./pages/OfferPage').then((m) => ({ default: m.OfferPage }))
const Projects = () => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage }))
const ProjectDetail = () => import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage }))
const Studio = () => import('./pages/StudioPage').then((m) => ({ default: m.StudioPage }))
const News = () => import('./pages/NewsPage').then((m) => ({ default: m.NewsPage }))
const NewsDetail = () => import('./pages/NewsDetailPage').then((m) => ({ default: m.NewsDetailPage }))
const Contact = () => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
const Guide = () => import('./pages/GuidePage').then((m) => ({ default: m.GuidePage }))
const Privacy = () => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage }))
const Service = () => import('./pages/ServicePage').then((m) => ({ default: m.ServicePage }))
const Team = () => import('./pages/TeamPages').then((m) => ({ default: m.TeamPage }))
const Person = () => import('./pages/TeamPages').then((m) => ({ default: m.PersonPage }))
const Reviews = () => import('./pages/ReviewsPage').then((m) => ({ default: m.ReviewsPage }))
const Careers = () => import('./pages/CareersFaqPages').then((m) => ({ default: m.CareersPage }))
const FaqList = () => import('./pages/CareersFaqPages').then((m) => ({ default: m.FaqPage }))
const Accessibility = () => import('./pages/AccessibilityPage').then((m) => ({ default: m.AccessibilityPage }))

/** Dla każdego języka osobne drzewo tras z lokalizowanymi adresami (/pl/uslugi, /en/services). */
const langRoutes = (lang: Lang): RouteObject => ({
  path: `/${lang}`,
  element: <Layout lang={lang} />,
  children: [
    { index: true, element: <HomePage /> },
    { path: ROUTES.offer[lang], ...page(Offer) },
    { path: `${ROUTES.offer[lang]}/:slug`, ...page(Service) },
    { path: ROUTES.projects[lang], ...page(Projects) },
    { path: `${ROUTES.projects[lang]}/:slug`, ...page(ProjectDetail) },
    { path: ROUTES.studio[lang], ...page(Studio) },
    { path: ROUTES.team[lang], ...page(Team) },
    { path: `${ROUTES.team[lang]}/:slug`, ...page(Person) },
    { path: ROUTES.reviews[lang], ...page(Reviews) },
    { path: ROUTES.careers[lang], ...page(Careers) },
    { path: ROUTES.faq[lang], ...page(FaqList) },
    { path: ROUTES.news[lang], ...page(News) },
    { path: `${ROUTES.news[lang]}/:slug`, ...page(NewsDetail) },
    { path: ROUTES.contact[lang], ...page(Contact) },
    { path: ROUTES.guide[lang], ...page(Guide) },
    { path: ROUTES.privacy[lang], ...page(Privacy) },
    { path: ROUTES.accessibility[lang], ...page(Accessibility) },
    // stary adres oferty (przed rozbudową menu) – przekierowanie na /pl/uslugi
    ...(lang === 'pl' ? [{ path: 'oferta', element: <Navigate to="/pl/uslugi" replace /> }] : []),
    { path: '*', element: <NotFoundPage /> },
  ],
})

const preferred: Lang = navigator.language?.toLowerCase().startsWith('pl') ? 'pl' : 'en'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to={`/${preferred}`} replace /> },
  ...LANGS.map(langRoutes),
  { path: '*', element: <Layout lang="pl" />, children: [{ path: '*', element: <NotFoundPage /> }] },
], { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
