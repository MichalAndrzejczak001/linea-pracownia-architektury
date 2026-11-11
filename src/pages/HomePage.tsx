import { Link } from 'react-router'
import { ArrowRight, Download, Star } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { fmt } from '../i18n/pl'
import { COMPANY, STATS } from '../data/company'
import { SERVICES } from '../data/services'
import { PROJECTS } from '../data/projects'
import { NEWS_SORTED } from '../data/news'
import { TESTIMONIALS } from '../data/people'
import { CtaBand, Img, Reveal, SectionHeading, Seo } from '../components/ui'
import { NewsCard, ProjectCard, TestimonialCard } from '../components/cards'
import { BeforeAfter } from '../components/BeforeAfter'
import { ProcessSteps } from '../components/sections'

export function HomePage() {
  const { t, l, path, formatNumber, formatPrice } = useI18n()
  const featured = PROJECTS.filter((p) => p.featured)
  const loft = PROJECTS.find((p) => p.slug === 'loft-ksiezy-mlyn')!

  return (
    <>
      <Seo title={t.meta.homeTitle} description={t.meta.homeDescription} />

      {/* 1. Pierwszy ekran: dla kogo, co robimy, główne CTA */}
      <section className="on-dark relative isolate overflow-hidden bg-ink text-paper" aria-labelledby="hero-title">
        <Img name="hero" variant="single" priority alt={t.home.heroAlt} className="absolute inset-0 -z-10 h-full w-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/20" aria-hidden="true" />
        <div className="container-x flex min-h-[78vh] flex-col justify-center py-20 sm:py-28">
          <p className="eyebrow mb-5">{t.home.eyebrow}</p>
          <h1 id="hero-title" className="max-w-3xl text-4xl leading-[1.08] font-extrabold sm:text-6xl">
            {t.home.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/85 sm:text-xl">{t.home.lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to={path('contact')} className="btn-accent px-7 py-4 text-base">
              {t.home.ctaPrimary} <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
            <Link to={path('projects')} className="btn-outline-light px-7 py-4 text-base">
              {t.home.ctaSecondary}
            </Link>
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-paper/80">
            <span className="flex" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="h-4 w-4 fill-brass-light text-brass-light" />
              ))}
            </span>
            <strong className="text-paper">{formatNumber(COMPANY.rating.score)}/5</strong>
            {fmt(t.home.rating, { count: COMPANY.rating.count })}
          </p>
        </div>
      </section>

      {/* 2. Liczby – dowody zamiast haseł */}
      <div className="border-b border-line bg-white">
        <dl className="container-x grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label.pl} className="flex flex-col px-2 text-center lg:border-l lg:border-line lg:first:border-l-0">
              <dt className="order-2 mt-1 text-sm text-muted">{l(s.label)}</dt>
              <dd className="text-3xl font-extrabold text-ink sm:text-4xl">
                {formatNumber(s.value)}
                {s.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* 3. Oferta z widełkami cen */}
      <section className="container-x py-20 sm:py-24" aria-labelledby="services-title">
        <SectionHeading id="services-title" eyebrow={t.home.servicesEyebrow} title={t.home.servicesTitle} lead={t.home.servicesLead} />
        <ul className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 80}>
              <article className="group relative grid h-full overflow-hidden border border-line bg-white sm:grid-cols-5">
                <Img name={`${s.image}-sm`} variant="single" alt="" className="h-48 w-full sm:col-span-2 sm:h-full" />
                <div className="flex flex-col p-6 sm:col-span-3">
                  <h3 className="text-xl font-bold">
                    <Link to={`${path('offer')}#${s.id}`} className="after:absolute after:inset-0 group-hover:text-brass">
                      {l(s.title)}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted">{l(s.lead)}</p>
                  <p className="mt-4 text-sm">
                    <span className="font-bold text-brass">
                      {s.rate ? `${t.common.from} ${formatPrice(s.rate.min)} / m²` : l(s.priceNote).split(' · ')[0]}
                    </span>
                    <span className="text-muted"> · {l(s.duration)}</span>
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* 4. Wybrane realizacje */}
      <section className="bg-sand/60 py-20 sm:py-24" aria-labelledby="projects-title">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading id="projects-title" eyebrow={t.home.projectsEyebrow} title={t.home.projectsTitle} lead={t.home.projectsLead} />
            <Link to={path('projects')} className="btn-outline mb-10 shrink-0 self-start md:self-auto">
              {t.common.seeAllProjects} <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-10 md:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 80}>
                <ProjectCard project={p} />
                <p className="mt-3 border-l-2 border-brass pl-3 text-sm font-semibold text-ink-2">{l(p.results)[0]}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Szkic ↔ realizacja */}
      <section className="container-x grid items-center gap-10 py-20 sm:py-24 lg:grid-cols-5" aria-labelledby="sketch-title">
        <div className="lg:col-span-2">
          <SectionHeading id="sketch-title" eyebrow={t.home.sketchEyebrow} title={t.home.sketchTitle} lead={t.home.sketchLead} />
          <Link to={path('projects', loft.slug)} className="link -mt-4 inline-flex items-center gap-1.5">
            {l(loft.title)} <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="lg:col-span-3">
          <BeforeAfter before={loft.sketch!} after={loft.images[0]} alt={l(loft.title)} />
        </div>
      </section>

      {/* 6. Proces współpracy */}
      <section className="border-t border-line bg-white py-20 sm:py-24" aria-labelledby="process-title">
        <div className="container-x">
          <SectionHeading id="process-title" eyebrow={t.home.processEyebrow} title={t.home.processTitle} lead={t.home.processLead} />
          <ProcessSteps />
        </div>
      </section>

      {/* 7. Opinie */}
      <section className="container-x py-20 sm:py-24" aria-labelledby="testimonials-title">
        <SectionHeading id="testimonials-title" eyebrow={t.home.testimonialsEyebrow} title={t.home.testimonialsTitle} />
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {TESTIMONIALS.map((item, i) => (
            <Reveal as="li" key={item.author} delay={i * 80}>
              <TestimonialCard item={item} />
            </Reveal>
          ))}
        </ul>
      </section>

      {/* 8. Kalkulator – zachęta */}
      <section className="on-dark bg-ink-2 text-paper" aria-labelledby="calc-title">
        <div className="container-x grid items-center gap-8 py-16 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="eyebrow mb-3">{t.home.calcEyebrow}</p>
            <h2 id="calc-title" className="text-3xl font-bold sm:text-4xl">
              {t.home.calcTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-paper/80">{t.home.calcLead}</p>
          </div>
          <Link to={`${path('offer')}#kalkulator`} className="btn-light justify-self-start md:justify-self-end">
            {t.home.calcCta} <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 9. Aktualności + poradnik */}
      <section className="container-x py-20 sm:py-24" aria-labelledby="news-title">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading id="news-title" eyebrow={t.home.newsEyebrow} title={t.home.newsTitle} />
          <Link to={path('news')} className="btn-outline mb-10 shrink-0 self-start md:self-auto">
            {t.common.seeAllNews} <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {NEWS_SORTED.slice(0, 3).map((post) => (
            <li key={post.slug}>
              <NewsCard post={post} />
            </li>
          ))}
        </ul>

        <aside className="mt-14 grid items-center gap-8 border border-brass/40 bg-brass/5 p-8 md:grid-cols-3" aria-labelledby="guide-teaser">
          <div className="md:col-span-2">
            <h2 id="guide-teaser" className="text-2xl font-bold">
              {t.home.guideTitle}
            </h2>
            <p className="mt-2 text-muted">{t.home.guideLead}</p>
          </div>
          <Link to={path('guide')} className="btn-primary justify-self-start md:justify-self-end">
            <Download aria-hidden="true" className="h-4 w-4" /> {t.home.guideCta}
          </Link>
        </aside>
      </section>

      <CtaBand title={t.home.finalTitle} text={t.home.finalLead} />
    </>
  )
}
