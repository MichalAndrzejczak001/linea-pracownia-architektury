import type { Localized } from '../i18n/types'

/** Dane kontaktowe fikcyjnej firmy LINEA (projekt studencki). */
export const COMPANY = {
  name: 'LINEA Pracownia Architektury',
  shortName: 'LINEA',
  founded: 2012,
  street: 'ul. Ogrodowa 17 (budynek C, II piętro)',
  postalCity: '91-065 Łódź',
  phone: '+48 42 123 45 67',
  phoneHref: 'tel:+48421234567',
  email: 'biuro@linea-architekci.pl',
  mapQuery: 'Ogrodowa 17, Łódź',
  osmEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=19.4460%2C51.7760%2C19.4620%2C51.7820&layer=mapnik&marker=51.7790%2C19.4540',
  osmLink: 'https://www.openstreetmap.org/?mlat=51.7790&mlon=19.4540#map=17/51.7790/19.4540',
  hours: {
    pl: [
      ['Poniedziałek – piątek', '9:00 – 17:00'],
      ['Sobota', 'po umówieniu'],
    ],
    en: [
      ['Monday – Friday', '9:00 – 17:00'],
      ['Saturday', 'by appointment'],
    ],
  } satisfies Localized<[string, string][]>,
  social: {
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/',
    facebook: 'https://www.facebook.com/',
  },
  rating: { score: 4.9, count: 41 },
}

export const STATS: { value: number; suffix?: string; label: Localized }[] = [
  { value: new Date().getFullYear() - 2012, label: { pl: 'lat doświadczenia', en: 'years of practice' } },
  { value: 186, suffix: '+', label: { pl: 'zrealizowanych projektów', en: 'completed projects' } },
  { value: 48000, suffix: ' m²', label: { pl: 'zaprojektowanej powierzchni', en: 'of designed floor area' } },
  { value: 97, suffix: '%', label: { pl: 'inwestycji w zakładanym budżecie', en: 'of projects delivered on budget' } },
]

/** Historia firmy – oś czasu na podstronie Pracownia. */
export const HISTORY: { year: number; title: Localized; text: Localized }[] = [
  {
    year: 2012,
    title: { pl: 'Początek przy Piotrkowskiej', en: 'Starting out on Piotrkowska Street' },
    text: {
      pl: 'Marta Linde i Tomasz Wierzbicki zakładają pracownię w dwupokojowym biurze w kamienicy. Pierwsze zlecenia to domy jednorodzinne pod Łodzią.',
      en: 'Marta Linde and Tomasz Wierzbicki open the studio in a two-room tenement office. The first commissions are family houses around Łódź.',
    },
  },
  {
    year: 2015,
    title: { pl: 'Pierwszy loft', en: 'The first loft' },
    text: {
      pl: 'Pierwsza adaptacja mieszkania w budynku poprzemysłowym. Od tej pory przebudowy łódzkich fabryk i kamienic stają się specjalnością pracowni.',
      en: 'Our first flat conversion in a post-industrial building. Since then, converting Łódź factories and tenements has become our speciality.',
    },
  },
  {
    year: 2018,
    title: { pl: 'Projektowanie w BIM', en: 'Designing in BIM' },
    text: {
      pl: 'Przechodzimy na projektowanie w modelu BIM i zaczynamy koordynować wszystkie branże w jednym modelu. Do zespołu dołącza Paweł Sadowski.',
      en: 'We switch to BIM and start coordinating all disciplines in a single model. Paweł Sadowski joins the team.',
    },
  },
  {
    year: 2020,
    title: { pl: 'Przeprowadzka do tkalni', en: 'Moving into the weaving mill' },
    text: {
      pl: 'Pracownia przenosi się do odnowionej hali dawnej tkalni przy ul. Ogrodowej. Julia Kmiecik tworzy dział projektowania wnętrz.',
      en: 'The studio moves into a renovated hall of a former weaving mill on Ogrodowa Street. Julia Kmiecik sets up the interior design team.',
    },
  },
  {
    year: 2024,
    title: { pl: 'Nagroda za Loft na Księżym Młynie', en: 'Award for the Księży Młyn Loft' },
    text: {
      pl: 'Nagroda czytelników portalu Architektura Łodzi. Adam Nowicki rozwija analizy energetyczne – nasze domy schodzą poniżej 45 kWh/m²·rok.',
      en: 'Readers’ award from the Łódź Architecture portal. Adam Nowicki develops our energy analysis – our houses drop below 45 kWh/m² per year.',
    },
  },
  {
    year: 2026,
    title: { pl: 'Wyróżnienie i nowa strona', en: 'Commendation and a new website' },
    text: {
      pl: 'Wyróżnienie w konkursie Łódzka Architektura Roku. Uruchamiamy nową stronę z cennikiem, kalkulatorem wyceny i bezpłatnym poradnikiem.',
      en: 'A commendation in the Łódź Architecture of the Year competition. We launch a new website with pricing, a cost calculator and a free guide.',
    },
  },
]
