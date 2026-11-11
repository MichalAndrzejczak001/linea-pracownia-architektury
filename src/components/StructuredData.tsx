import { useI18n } from '../i18n/LanguageContext'
import { COMPANY } from '../data/company'
import { SERVICES } from '../data/services'

const SITE = 'https://linea-architekci.pl'

/**
 * Dane strukturalne schema.org (JSON-LD) – wyszukiwarki rozpoznają firmę lokalną:
 * adres, telefon, godziny pracy i usługi (lokalne SEO dla fraz typu „architekt Łódź”).
 */
export function StructuredData() {
  const { lang, l, path } = useI18n()
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE}/#firma`,
    name: COMPANY.name,
    description: lang === 'pl' ? 'Pracownia architektury: projekty domów jednorodzinnych, wnętrz i adaptacji loftów.' : 'Architecture studio: single-family houses, interiors and loft conversions.',
    url: SITE + path('home'),
    logo: `${SITE}/favicon.svg`,
    image: `${SITE}/images/hero.webp`,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    foundingDate: String(COMPANY.founded),
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Ogrodowa 17',
      postalCode: '91-065',
      addressLocality: 'Łódź',
      addressRegion: 'łódzkie',
      addressCountry: 'PL',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 51.779, longitude: 19.454 },
    areaServed: { '@type': 'AdministrativeArea', name: lang === 'pl' ? 'województwo łódzkie' : 'Łódź Voivodeship' },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
    ],
    sameAs: Object.values(COMPANY.social),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: lang === 'pl' ? 'Usługi' : 'Services',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: l(s.title), description: l(s.lead) },
        ...(s.rate ? { priceSpecification: { '@type': 'UnitPriceSpecification', price: s.rate.min, priceCurrency: 'PLN', unitText: 'm²' } } : {}),
      })),
    },
  }
  return <script type="application/ld+json">{JSON.stringify(data)}</script>
}
