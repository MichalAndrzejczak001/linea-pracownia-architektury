import type { Localized } from '../i18n/types'

export type ServiceId = 'house' | 'interior' | 'adaptation' | 'supervision'

export interface Service {
  id: ServiceId
  title: Localized
  lead: Localized
  forWhom: Localized
  scope: Localized<string[]>
  /** Widełki cen w zł netto za m² powierzchni użytkowej (null = usługa rozliczana inaczej). */
  rate: { min: number; max: number } | null
  priceNote: Localized
  duration: Localized
  image: string
}

export const SERVICES: Service[] = [
  {
    id: 'house',
    title: { pl: 'Projekt domu jednorodzinnego', en: 'Single-family house design' },
    lead: {
      pl: 'Indywidualny dom zaprojektowany pod Twoją działkę, rodzinę i budżet – od analizy MPZP po projekt techniczny.',
      en: 'A bespoke house designed for your plot, your family and your budget – from zoning analysis to the technical design.',
    },
    forWhom: {
      pl: 'Dla osób, które mają działkę (albo właśnie ją wybierają) i chcą domu lepszego niż projekt z katalogu.',
      en: 'For people who own a plot (or are choosing one) and want more than a catalogue house.',
    },
    scope: {
      pl: [
        'analiza działki, MPZP lub warunków zabudowy',
        'koncepcja w 2 wariantach z wizualizacjami 3D',
        'projekt zagospodarowania terenu i projekt architektoniczno-budowlany',
        'projekt techniczny wraz z koordynacją branż (konstrukcja, instalacje)',
        'złożenie wniosku i prowadzenie sprawy pozwolenia na budowę',
      ],
      en: [
        'plot, zoning plan or planning permission analysis',
        'concept design in 2 variants with 3D visualisations',
        'site plan and architectural & building design',
        'technical design with coordination of structure and services',
        'filing and handling the building permit application',
      ],
    },
    rate: { min: 180, max: 260 },
    priceNote: { pl: 'zł netto / m² pow. użytkowej', en: 'PLN net / m² of usable floor area' },
    duration: { pl: '4–7 miesięcy', en: '4–7 months' },
    image: 'dom-pod-lasem-1',
  },
  {
    id: 'interior',
    title: { pl: 'Projekt wnętrz', en: 'Interior design' },
    lead: {
      pl: 'Funkcjonalne i ponadczasowe wnętrza domów, mieszkań i kamienic – z rysunkami wykonawczymi dla ekipy.',
      en: 'Functional, timeless interiors for houses, flats and tenement apartments – with working drawings for your builders.',
    },
    forWhom: {
      pl: 'Dla właścicieli mieszkań z rynku pierwotnego i wtórnego oraz inwestorów kończących budowę domu.',
      en: 'For owners of new and pre-owned flats and for investors finishing their house.',
    },
    scope: {
      pl: [
        'inwentaryzacja i układ funkcjonalny (2 warianty)',
        'wizualizacje fotorealistyczne wszystkich pomieszczeń',
        'rysunki wykonawcze: ściany, podłogi, oświetlenie, zabudowy stolarskie',
        'zestawienie materiałów z kosztorysem orientacyjnym',
        'wizyty kontrolne w trakcie wykończenia',
      ],
      en: [
        'measured survey and layout (2 variants)',
        'photorealistic visualisations of every room',
        'working drawings: walls, floors, lighting, joinery',
        'materials schedule with an indicative cost estimate',
        'site visits during the finishing works',
      ],
    },
    rate: { min: 140, max: 220 },
    priceNote: { pl: 'zł netto / m² wnętrza', en: 'PLN net / m² of interior' },
    duration: { pl: '6–12 tygodni', en: '6–12 weeks' },
    image: 'apartament-piotrkowska-1',
  },
  {
    id: 'adaptation',
    title: { pl: 'Adaptacje loftów i kamienic', en: 'Loft & tenement conversions' },
    lead: {
      pl: 'Nowe życie łódzkich fabryk i kamienic: zmiana sposobu użytkowania, uzgodnienia konserwatorskie, antresole.',
      en: 'New life for Łódź factories and tenements: change of use, heritage approvals, mezzanines.',
    },
    forWhom: {
      pl: 'Dla właścicieli lokali w budynkach poprzemysłowych i zabytkowych oraz firm szukających biura z charakterem.',
      en: 'For owners of units in post-industrial and listed buildings and companies looking for an office with character.',
    },
    scope: {
      pl: [
        'inwentaryzacja budowlana i ocena stanu technicznego',
        'uzgodnienia z Miejskim Konserwatorem Zabytków',
        'projekt zmiany sposobu użytkowania i przebudowy',
        'projekt wnętrz z zachowaniem historycznych detali',
        'nadzór autorski nad pracami',
      ],
      en: [
        'measured building survey and condition assessment',
        'approvals from the municipal heritage conservator',
        'change-of-use and alteration design',
        'interior design preserving historic details',
        'design supervision on site',
      ],
    },
    rate: { min: 200, max: 320 },
    priceNote: { pl: 'zł netto / m² pow. użytkowej', en: 'PLN net / m² of usable floor area' },
    duration: { pl: '5–9 miesięcy', en: '5–9 months' },
    image: 'loft-ksiezy-mlyn-1',
  },
  {
    id: 'supervision',
    title: { pl: 'Nadzór autorski i doradztwo', en: 'Design supervision & advisory' },
    lead: {
      pl: 'Pilnujemy, żeby dom powstał zgodnie z projektem. Pomagamy też ocenić działkę jeszcze przed zakupem.',
      en: 'We make sure the house is built as designed – and help you assess a plot before you buy it.',
    },
    forWhom: {
      pl: 'Dla inwestorów w trakcie budowy oraz osób, które dopiero wybierają działkę.',
      en: 'For investors during construction and people who are still choosing a plot.',
    },
    scope: {
      pl: [
        'wizyty na budowie i wpisy do dziennika budowy',
        'rozwiązywanie problemów wykonawczych i zamian materiałów',
        'odbiory etapów prac',
        'analiza działki przed zakupem (MPZP, media, nasłonecznienie)',
      ],
      en: [
        'site visits and entries in the construction log',
        'solving on-site issues and material substitutions',
        'stage acceptance inspections',
        'pre-purchase plot analysis (zoning, utilities, sunlight)',
      ],
    },
    rate: null,
    priceNote: {
      pl: 'od 450 zł netto za wizytę · analiza działki 900 zł netto',
      en: 'from PLN 450 net per visit · plot analysis PLN 900 net',
    },
    duration: { pl: 'przez cały czas budowy', en: 'throughout construction' },
    image: 'studio-2',
  },
]

export interface ProcessStep {
  title: Localized
  text: Localized
  time: Localized
}

export const PROCESS: ProcessStep[] = [
  {
    title: { pl: 'Bezpłatna konsultacja', en: 'Free consultation' },
    text: {
      pl: 'Poznajemy Twoje potrzeby, działkę i budżet. Mówimy wprost, co jest możliwe i ile to kosztuje.',
      en: 'We learn about your needs, plot and budget, and tell you plainly what is possible and what it costs.',
    },
    time: { pl: '45 minut, online lub w pracowni', en: '45 minutes, online or at the studio' },
  },
  {
    title: { pl: 'Oferta i umowa', en: 'Proposal and contract' },
    text: {
      pl: 'Dostajesz stałą cenę, harmonogram z kamieniami milowymi i listę tego, co jest (i czego nie ma) w zakresie.',
      en: 'You get a fixed price, a milestone schedule and a clear list of what is (and is not) included.',
    },
    time: { pl: 'do 5 dni roboczych', en: 'within 5 working days' },
  },
  {
    title: { pl: 'Koncepcja i wizualizacje', en: 'Concept and visualisations' },
    text: {
      pl: 'Dwa warianty bryły i układu funkcjonalnego, wizualizacje 3D i dwie rundy poprawek w cenie.',
      en: 'Two variants of massing and layout, 3D visualisations and two rounds of revisions included.',
    },
    time: { pl: '4–6 tygodni', en: '4–6 weeks' },
  },
  {
    title: { pl: 'Projekt budowlany', en: 'Building design' },
    text: {
      pl: 'Przygotowujemy dokumentację, zbieramy uzgodnienia i składamy wniosek o pozwolenie na budowę.',
      en: 'We prepare the documentation, collect approvals and file the building permit application.',
    },
    time: { pl: '6–10 tygodni', en: '6–10 weeks' },
  },
  {
    title: { pl: 'Projekt techniczny', en: 'Technical design' },
    text: {
      pl: 'Detale, zestawienia i koordynacja branż – tak, żeby wykonawca mógł rzetelnie wycenić budowę.',
      en: 'Details, schedules and coordination of all disciplines, so contractors can price the build accurately.',
    },
    time: { pl: '4–8 tygodni', en: '4–8 weeks' },
  },
  {
    title: { pl: 'Nadzór autorski', en: 'Design supervision' },
    text: {
      pl: 'Jesteśmy na budowie w kluczowych momentach i odpowiadamy na pytania ekipy w ciągu 48 godzin.',
      en: 'We are on site at key moments and answer the builders’ questions within 48 hours.',
    },
    time: { pl: 'do zakończenia budowy', en: 'until completion' },
  },
]

/** Mnożniki standardu dla kalkulatora wyceny. */
export const STANDARDS = [
  { id: 'basic', factor: 0, label: { pl: 'Podstawowy', en: 'Basic' }, hint: { pl: 'prosta bryła, dach dwuspadowy', en: 'simple massing, gable roof' } },
  { id: 'extended', factor: 0.5, label: { pl: 'Rozszerzony', en: 'Extended' }, hint: { pl: 'antresola, duże przeszklenia', en: 'mezzanine, large glazing' } },
  { id: 'premium', factor: 1, label: { pl: 'Premium', en: 'Premium' }, hint: { pl: 'nietypowa konstrukcja, pełny detal', en: 'non-standard structure, full detailing' } },
] as const satisfies { id: string; factor: number; label: Localized; hint: Localized }[]

export type StandardId = (typeof STANDARDS)[number]['id']
