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
