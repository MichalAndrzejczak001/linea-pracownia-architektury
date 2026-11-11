import { useI18n } from '../i18n/LanguageContext'
import type { Localized } from '../i18n/types'
import { COMPANY } from '../data/company'
import { PageHeader, Seo } from '../components/ui'

const UPDATED = '2026-11-11'

const SECTIONS: { h: Localized; p: Localized<string[]> }[] = [
  {
    h: { pl: 'Status zgodności', en: 'Compliance status' },
    p: {
      pl: [
        `${COMPANY.name} chce, aby strona była dostępna dla wszystkich, także dla osób korzystających z czytników ekranu, klawiatury lub powiększenia. Strona jest zgodna z wytycznymi WCAG 2.2 na poziomie AA, z wyjątkami opisanymi niżej.`,
      ],
      en: [
        `${COMPANY.name} wants this website to be accessible to everyone, including people using screen readers, keyboards or magnification. The website conforms to WCAG 2.2 level AA, with the exceptions listed below.`,
      ],
    },
  },
  {
    h: { pl: 'Jak dbamy o dostępność', en: 'How we ensure accessibility' },
    p: {
      pl: [
        'Całą stronę można obsłużyć klawiaturą, a pierwszym elementem jest link „Przejdź do treści”. Kolory tekstu mają kontrast zgodny z poziomem AA, zdjęcia mają opisy alternatywne, a formularze – etykiety i komunikaty błędów odczytywane przez czytniki ekranu.',
        'Animacje są wyłączane, gdy w systemie włączone jest ograniczenie ruchu. Strona działa przy powiększeniu do 200% i na ekranach od 320 pikseli szerokości.',
        'Każdą zmianę strony sprawdzamy automatycznym testem axe (WCAG 2.2 A i AA) i narzędziem Lighthouse oraz ręcznie – klawiaturą i czytnikiem ekranu.',
      ],
      en: [
        'The whole site can be used with a keyboard, and the first element is a “Skip to content” link. Text colours meet AA contrast, images have alternative text, and forms have labels and error messages announced by screen readers.',
        'Animations are switched off when reduced motion is enabled in the operating system. The site works at 200% zoom and on screens from 320 pixels wide.',
        'Every change is checked with an automated axe test (WCAG 2.2 A and AA) and Lighthouse, and manually with a keyboard and a screen reader.',
      ],
    },
  },
  {
    h: { pl: 'Znane ograniczenia', en: 'Known limitations' },
    p: {
      pl: [
        'Film z realizacjami nie ma dźwięku ani audiodeskrypcji – zamiast tego ma napisy opisujące każdą realizację, a te same informacje są dostępne w zakładce Projekty.',
        'Mapa OpenStreetMap na stronie Kontakt pochodzi z zewnętrznego serwisu i może nie być w pełni dostępna. Adres i opis dojazdu podajemy tekstem obok mapy.',
        'Poradnik PDF ma strukturę nagłówków, ale nie jest w pełni oznaczonym dokumentem PDF/UA. Na prośbę wyślemy jego treść w formie tekstowej.',
      ],
      en: [
        'The project video has no sound or audio description – instead it has captions describing each project, and the same information is available in the Projects section.',
        'The OpenStreetMap map on the Contact page comes from an external service and may not be fully accessible. We provide the address and directions as text next to the map.',
        'The PDF guide has a heading structure but is not a fully tagged PDF/UA document. On request we will send its content as text.',
      ],
    },
  },
  {
    h: { pl: 'Kontakt w sprawie dostępności', en: 'Accessibility contact' },
    p: {
      pl: [`Jeśli coś na stronie jest dla Ciebie niedostępne, napisz na ${COMPANY.email} lub zadzwoń pod numer ${COMPANY.phone}. Odpowiemy w ciągu 7 dni i przekażemy informacje w dogodnej dla Ciebie formie.`],
      en: [`If anything on the site is not accessible to you, write to ${COMPANY.email} or call ${COMPANY.phone}. We will reply within 7 days and provide the information in a format that suits you.`],
    },
  },
]

export function AccessibilityPage() {
  const { t, l, formatDate } = useI18n()
  return (
    <>
      <Seo title={t.a11y.title} description={t.a11y.description} />
      <PageHeader title={t.a11y.title} crumbs={[{ label: t.nav.accessibility }]} />
      <div className="container-x py-12">
        <div className="prose-linea max-w-3xl">
          <p className="text-sm text-muted">
            {t.privacy.updated}: <time dateTime={UPDATED}>{formatDate(UPDATED)}</time>
          </p>
          {SECTIONS.map((s) => (
            <section key={s.h.pl}>
              <h2>{l(s.h)}</h2>
              {l(s.p).map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </>
  )
}
