import { Link } from 'react-router'
import { useI18n } from '../i18n/LanguageContext'
import { Seo } from '../components/ui'

export function NotFoundPage({ message }: { message?: string }) {
  const { t, path } = useI18n()
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-start justify-center py-20">
      <Seo title={t.notFound.title} description={t.notFound.text} />
      <meta name="robots" content="noindex" />
      <p className="text-7xl font-extrabold text-brass" aria-hidden="true">
        404
      </p>
      <h1 className="mt-4 text-4xl font-extrabold">{t.notFound.title}</h1>
      <p className="mt-3 max-w-xl text-lg text-muted">{message ?? t.notFound.text}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to={path('home')} className="btn-primary">
          {t.notFound.home}
        </Link>
        <Link to={path('projects')} className="btn-outline">
          {t.nav.projects}
        </Link>
      </div>
    </section>
  )
}
