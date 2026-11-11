import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider, type RouteObject } from 'react-router'
import './index.css'
import { Layout } from './components/Layout'
import { ROUTES } from './i18n/routes'
import { LANGS, type Lang } from './i18n/types'
import { HomePage } from './pages/HomePage'
import { OfferPage } from './pages/OfferPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { StudioPage } from './pages/StudioPage'
import { NewsPage } from './pages/NewsPage'
import { NewsDetailPage } from './pages/NewsDetailPage'
import { ContactPage } from './pages/ContactPage'
import { GuidePage } from './pages/GuidePage'
import { PrivacyPage } from './pages/PrivacyPage'
import { NotFoundPage } from './pages/NotFoundPage'

/** Dla każdego języka osobne drzewo tras z lokalizowanymi adresami (/pl/oferta, /en/services). */
const langRoutes = (lang: Lang): RouteObject => ({
  path: `/${lang}`,
  element: <Layout lang={lang} />,
  children: [
    { index: true, element: <HomePage /> },
    { path: ROUTES.offer[lang], element: <OfferPage /> },
    { path: ROUTES.projects[lang], element: <ProjectsPage /> },
    { path: `${ROUTES.projects[lang]}/:slug`, element: <ProjectDetailPage /> },
    { path: ROUTES.studio[lang], element: <StudioPage /> },
    { path: ROUTES.news[lang], element: <NewsPage /> },
    { path: `${ROUTES.news[lang]}/:slug`, element: <NewsDetailPage /> },
    { path: ROUTES.contact[lang], element: <ContactPage /> },
    { path: ROUTES.guide[lang], element: <GuidePage /> },
    { path: ROUTES.privacy[lang], element: <PrivacyPage /> },
    { path: '*', element: <NotFoundPage /> },
  ],
})

const preferred: Lang = navigator.language?.toLowerCase().startsWith('pl') ? 'pl' : 'en'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to={`/${preferred}`} replace /> },
  ...LANGS.map(langRoutes),
  { path: '*', element: <Layout lang="pl" />, children: [{ path: '*', element: <NotFoundPage /> }] },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
