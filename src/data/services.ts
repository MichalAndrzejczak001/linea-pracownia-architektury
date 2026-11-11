import type { Localized } from '../i18n/types'

export type ServiceId = 'house' | 'catalog' | 'extension' | 'interior' | 'adaptation' | 'commercial' | 'plot' | 'supervision'
export type ServiceIcon = 'House' | 'Files' | 'Expand' | 'Sofa' | 'Factory' | 'Building2' | 'MapPinned' | 'HardHat'

export interface Service {
  id: ServiceId
  /** Adres podstrony: /pl/uslugi/{slug} i /en/services/{slug} */
  slug: string
  icon: ServiceIcon
  title: Localized
  /** Krótki opis do menu rozwijanego */
  short: Localized
  lead: Localized
  forWhom: Localized
  scope: Localized<string[]>
  steps: Localized<string[]>
  /** Widełki cen w zł netto za m² (null = usługa rozliczana inaczej). */
  rate: { min: number; max: number } | null
  priceNote: Localized
  priceExample: Localized
  duration: Localized
  image: string
  related: string[]
  faq: { q: Localized; a: Localized }[]
}

export const SERVICES: Service[] = [
  {
    id: 'house',
    slug: 'projekt-domu',
    icon: 'House',
    title: { pl: 'Projekt domu jednorodzinnego', en: 'Single-family house design' },
    short: { pl: 'Indywidualny dom od koncepcji po pozwolenie', en: 'A bespoke house from concept to permit' },
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
        'koncepcja w 2 wariantach z wizualizacjami 3D i spacerem po modelu',
        'projekt zagospodarowania terenu i projekt architektoniczno-budowlany',
        'projekt techniczny wraz z koordynacją branż (konstrukcja, instalacje)',
        'złożenie wniosku i prowadzenie sprawy pozwolenia na budowę',
      ],
      en: [
        'plot, zoning plan or planning permission analysis',
        'concept design in 2 variants with 3D visualisations and a model walkthrough',
        'site plan and architectural & building design',
        'technical design with coordination of structure and services',
        'filing and handling the building permit application',
      ],
    },
    steps: {
      pl: ['Konsultacja i analiza działki', 'Koncepcja i wizualizacje (2 rundy poprawek)', 'Projekt budowlany i pozwolenie', 'Projekt techniczny i wybór wykonawcy'],
      en: ['Consultation and plot analysis', 'Concept and visualisations (2 revision rounds)', 'Building design and permit', 'Technical design and choosing a contractor'],
    },
    rate: { min: 180, max: 260 },
    priceNote: { pl: 'zł netto / m² pow. użytkowej', en: 'PLN net / m² of usable floor area' },
    priceExample: {
      pl: 'Przykład: dom 150 m² w standardzie rozszerzonym – ok. 30–36 tys. zł netto za pełny projekt z pozwoleniem.',
      en: 'Example: a 150 m² house, extended standard – about PLN 30–36k net for the full design including the permit.',
    },
    duration: { pl: '4–7 miesięcy', en: '4–7 months' },
    image: 'dom-pod-lasem-1',
    related: ['dom-pod-lasem', 'czarny-kubik', 'willa-biale-linie'],
    faq: [
      {
        q: { pl: 'Czy mogę zmienić projekt po złożeniu wniosku o pozwolenie?', en: 'Can I change the design after the permit application is filed?' },
        a: {
          pl: 'Tak, ale zmiany istotne wymagają zmiany pozwolenia. Dlatego wszystkie ważne decyzje zbieramy na etapie koncepcji, kiedy zmiana nic nie kosztuje.',
          en: 'Yes, but significant changes require an amended permit. That is why we settle all key decisions at the concept stage, when changes cost nothing.',
        },
      },
      {
        q: { pl: 'Czy projekt obejmuje instalacje i konstrukcję?', en: 'Does the design include structure and services?' },
        a: {
          pl: 'Tak. Współpracujemy na stałe z konstruktorem i projektantami instalacji, a całość koordynujemy w jednym modelu BIM.',
          en: 'Yes. We work with a permanent team of structural and building-services engineers and coordinate everything in one BIM model.',
        },
      },
    ],
  },
  {
    id: 'catalog',
    slug: 'adaptacja-projektu-gotowego',
    icon: 'Files',
    title: { pl: 'Adaptacja projektu gotowego', en: 'Adapting a catalogue design' },
    short: { pl: 'Dopasowanie projektu z katalogu do działki', en: 'Fitting a catalogue house to your plot' },
    lead: {
      pl: 'Kupiłeś projekt z katalogu? Dopasujemy go do działki, przepisów i Twoich potrzeb, żeby można było uzyskać pozwolenie na budowę.',
      en: 'Bought a catalogue design? We adapt it to your plot, local regulations and your needs, so you can get a building permit.',
    },
    forWhom: {
      pl: 'Dla inwestorów, którzy wybrali gotowy projekt i chcą szybko i niedrogo przejść do budowy.',
      en: 'For clients who have chosen a ready-made design and want to get to construction quickly and affordably.',
    },
    scope: {
      pl: [
        'sprawdzenie zgodności projektu z MPZP lub warunkami zabudowy',
        'projekt zagospodarowania terenu na mapie do celów projektowych',
        'dostosowanie konstrukcji do warunków gruntowych i strefy śniegowej',
        'drobne zmiany układu (np. przesunięcie ścianki, okna, dodatkowy gabinet)',
        'kompletny wniosek o pozwolenie na budowę',
      ],
      en: [
        'checking the design against the zoning plan or planning decision',
        'site plan on the survey map for design purposes',
        'adapting the structure to soil conditions and the snow load zone',
        'minor layout changes (e.g. moving a partition or window, adding a study)',
        'a complete building permit application',
      ],
    },
    steps: {
      pl: ['Analiza projektu i działki', 'Lista zmian i wycena', 'Adaptacja i projekt zagospodarowania', 'Wniosek o pozwolenie'],
      en: ['Design and plot review', 'List of changes and quote', 'Adaptation and site plan', 'Permit application'],
    },
    rate: null,
    priceNote: { pl: 'od 4 500 zł netto (zależnie od zakresu zmian)', en: 'from PLN 4,500 net (depending on the changes)' },
    priceExample: {
      pl: 'Przykład: adaptacja z 3 drobnymi zmianami układu – ok. 6 500 zł netto.',
      en: 'Example: adaptation with 3 minor layout changes – about PLN 6,500 net.',
    },
    duration: { pl: '4–8 tygodni', en: '4–8 weeks' },
    image: 'willa-biale-linie-2',
    related: [],
    faq: [
      {
        q: { pl: 'Czy każdy gotowy projekt da się postawić na mojej działce?', en: 'Can any catalogue design be built on my plot?' },
        a: {
          pl: 'Nie zawsze. Plan miejscowy może narzucać np. kąt dachu, wysokość lub szerokość elewacji. Sprawdzimy to przed zakupem projektu – bezpłatnie w ramach konsultacji.',
          en: 'Not always. The zoning plan may dictate e.g. roof pitch, height or facade width. We check this before you buy the design – free of charge as part of the consultation.',
        },
      },
      {
        q: { pl: 'Kiedy lepiej wybrać projekt indywidualny?', en: 'When is a bespoke design the better choice?' },
        a: {
          pl: 'Gdy działka jest wąska, ma spadek lub nietypowy kształt albo gdy lista zmian w gotowym projekcie robi się długa. Wtedy koszt adaptacji zbliża się do projektu indywidualnego.',
          en: 'When the plot is narrow, sloping or irregular, or when the list of changes grows long. Then the cost of adaptation approaches that of a bespoke design.',
        },
      },
    ],
  },
  {
    id: 'extension',
    slug: 'rozbudowa-i-nadbudowa',
    icon: 'Expand',
    title: { pl: 'Rozbudowa i nadbudowa domu', en: 'House extensions and additions' },
    short: { pl: 'Więcej przestrzeni bez przeprowadzki', en: 'More space without moving house' },
    lead: {
      pl: 'Dobudowa, nadbudowa piętra lub przebudowa układu – projektujemy tak, aby nowa część i istniejący dom tworzyły spójną całość.',
      en: 'An extension, an extra storey or a new layout – designed so that the new part and the existing house form one coherent whole.',
    },
    forWhom: {
      pl: 'Dla rodzin, którym dom zrobił się za mały, oraz właścicieli starszych domów, którzy chcą je zmodernizować.',
      en: 'For families who have outgrown their home and owners of older houses who want to modernise them.',
    },
    scope: {
      pl: [
        'inwentaryzacja budynku i ocena stanu konstrukcji',
        'koncepcja rozbudowy w 2 wariantach z wizualizacjami',
        'projekt budowlany rozbudowy lub nadbudowy',
        'termomodernizacja istniejącej części (izolacja, okna, ogrzewanie)',
        'pozwolenie na budowę lub zgłoszenie – zależnie od zakresu',
      ],
      en: [
        'measured survey and structural condition assessment',
        'extension concept in 2 variants with visualisations',
        'building design for the extension or extra storey',
        'energy upgrade of the existing part (insulation, windows, heating)',
        'building permit or notification – depending on the scope',
      ],
    },
    steps: {
      pl: ['Inwentaryzacja i ekspertyza', 'Koncepcja rozbudowy', 'Projekt budowlany', 'Nadzór nad połączeniem starej i nowej części'],
      en: ['Survey and structural assessment', 'Extension concept', 'Building design', 'Supervising the junction of old and new'],
    },
    rate: { min: 190, max: 280 },
    priceNote: { pl: 'zł netto / m² nowej powierzchni', en: 'PLN net / m² of new floor area' },
    priceExample: {
      pl: 'Przykład: dobudowa 40 m² z nowym salonem – ok. 9–11 tys. zł netto, plus inwentaryzacja od 2 000 zł.',
      en: 'Example: a 40 m² extension with a new living room – about PLN 9–11k net, plus a survey from PLN 2,000.',
    },
    duration: { pl: '3–5 miesięcy', en: '3–5 months' },
    image: 'dom-z-patio-1',
    related: ['dom-z-patio'],
    faq: [
      {
        q: { pl: 'Czy na rozbudowę zawsze potrzebne jest pozwolenie?', en: 'Does an extension always need a building permit?' },
        a: {
          pl: 'Zależy od skali i rodzaju prac. Część mniejszych rozbudów wymaga tylko zgłoszenia, ale nadbudowa piętra czy zmiana konstrukcji zwykle wymaga pozwolenia. Sprawdzamy to na konsultacji.',
          en: 'It depends on the scale and type of work. Some smaller extensions need only a notification, but an extra storey or structural change usually needs a permit. We check this at the consultation.',
        },
      },
      {
        q: { pl: 'Czy można mieszkać w domu podczas rozbudowy?', en: 'Can we live in the house during the works?' },
        a: {
          pl: 'Często tak. Planujemy etapy prac tak, aby jak najdłużej korzystać z istniejącej części domu.',
          en: 'Often yes. We plan the stages so that you can use the existing part of the house for as long as possible.',
        },
      },
    ],
  },
  {
    id: 'interior',
    slug: 'projekt-wnetrz',
    icon: 'Sofa',
    title: { pl: 'Projekt wnętrz', en: 'Interior design' },
    short: { pl: 'Mieszkania, domy i kamienice', en: 'Flats, houses and tenements' },
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
    steps: {
      pl: ['Inwentaryzacja i rozmowa o potrzebach', 'Układ funkcjonalny', 'Wizualizacje i dobór materiałów', 'Rysunki wykonawcze i kosztorys'],
      en: ['Survey and briefing', 'Space planning', 'Visualisations and material selection', 'Working drawings and cost estimate'],
    },
    rate: { min: 140, max: 220 },
    priceNote: { pl: 'zł netto / m² wnętrza', en: 'PLN net / m² of interior' },
    priceExample: {
      pl: 'Przykład: mieszkanie 70 m² z pełną dokumentacją wykonawczą – ok. 11–14 tys. zł netto.',
      en: 'Example: a 70 m² flat with full working drawings – about PLN 11–14k net.',
    },
    duration: { pl: '6–12 tygodni', en: '6–12 weeks' },
    image: 'apartament-piotrkowska-1',
    related: ['apartament-piotrkowska', 'mieszkanie-stare-polesie'],
    faq: [
      {
        q: { pl: 'Czy pomagacie w zakupach i wyborze wykonawcy?', en: 'Do you help with shopping and choosing contractors?' },
        a: {
          pl: 'Tak. Zestawienie materiałów zawiera konkretne produkty i sklepy, a na życzenie polecamy sprawdzone ekipy i stolarzy, z którymi pracowaliśmy.',
          en: 'Yes. The materials schedule lists specific products and suppliers, and on request we recommend trusted builders and joiners we have worked with.',
        },
      },
      {
        q: { pl: 'Czy projektujecie wnętrza w zabytkowych kamienicach?', en: 'Do you design interiors in listed tenements?' },
        a: {
          pl: 'To jedna z naszych specjalności – zachowujemy sztukaterie, stolarkę i podłogi, a nowe instalacje prowadzimy tak, by ich nie naruszyć.',
          en: 'It is one of our specialities – we keep mouldings, joinery and floors, and route new services without damaging them.',
        },
      },
    ],
  },
  {
    id: 'adaptation',
    slug: 'adaptacje-loftow-i-kamienic',
    icon: 'Factory',
    title: { pl: 'Adaptacje loftów i kamienic', en: 'Loft & tenement conversions' },
    short: { pl: 'Nowe życie łódzkich fabryk i kamienic', en: 'New life for Łódź factories and tenements' },
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
    steps: {
      pl: ['Inwentaryzacja i analiza konserwatorska', 'Koncepcja z antresolą lub nowym podziałem', 'Uzgodnienia i projekt budowlany', 'Projekt wnętrz i nadzór'],
      en: ['Survey and heritage analysis', 'Concept with a mezzanine or new layout', 'Approvals and building design', 'Interior design and supervision'],
    },
    rate: { min: 200, max: 320 },
    priceNote: { pl: 'zł netto / m² pow. użytkowej', en: 'PLN net / m² of usable floor area' },
    priceExample: {
      pl: 'Przykład: loft 110 m² z antresolą i uzgodnieniem konserwatorskim – ok. 26–31 tys. zł netto.',
      en: 'Example: a 110 m² loft with a mezzanine and heritage approval – about PLN 26–31k net.',
    },
    duration: { pl: '5–9 miesięcy', en: '5–9 months' },
    image: 'loft-ksiezy-mlyn-1',
    related: ['loft-ksiezy-mlyn', 'biuro-w-przedzalni'],
    faq: [
      {
        q: { pl: 'Ile trwa uzgodnienie z konserwatorem zabytków?', en: 'How long does heritage approval take?' },
        a: {
          pl: 'Zwykle od 4 do 8 tygodni. Przed złożeniem dokumentów konsultujemy koncepcję z konserwatorem, co znacznie zmniejsza ryzyko odmowy.',
          en: 'Usually 4 to 8 weeks. We discuss the concept with the conservator before filing, which greatly reduces the risk of refusal.',
        },
      },
      {
        q: { pl: 'Czy w lofcie można zrobić antresolę?', en: 'Can a loft have a mezzanine?' },
        a: {
          pl: 'Przy wysokości powyżej ok. 4,8 m zazwyczaj tak. Projektujemy lekkie konstrukcje stalowe, które nie obciążają historycznych stropów.',
          en: 'With a ceiling height above about 4.8 m, usually yes. We design light steel structures that do not load the historic floors.',
        },
      },
    ],
  },
  {
    id: 'commercial',
    slug: 'lokale-komercyjne-i-biura',
    icon: 'Building2',
    title: { pl: 'Lokale komercyjne i biura', en: 'Commercial spaces and offices' },
    short: { pl: 'Biura, gabinety i lokale usługowe', en: 'Offices, clinics and retail units' },
    lead: {
      pl: 'Biura, gabinety i lokale usługowe zaprojektowane pod sposób pracy zespołu i wymagania przepisów (ppoż., sanepid, BHP).',
      en: 'Offices, clinics and retail units designed around how your team works and the regulations (fire safety, sanitary, health & safety).',
    },
    forWhom: {
      pl: 'Dla firm, które przenoszą się do nowej siedziby lub zmieniają aranżację biura.',
      en: 'For companies moving to new premises or rearranging their office.',
    },
    scope: {
      pl: [
        'analiza potrzeb zespołu i warsztat z pracownikami',
        'układ stref: skupienia, spotkań, socjalnej',
        'projekt akustyki i oświetlenia',
        'uzgodnienia z rzeczoznawcą ppoż. i sanepidu',
        'harmonogram prac i nadzór, żeby zdążyć przed przeprowadzką',
      ],
      en: [
        'team needs analysis and a staff workshop',
        'zoning: focus, meeting and break areas',
        'acoustic and lighting design',
        'fire safety and sanitary approvals',
        'works schedule and supervision to finish before the move',
      ],
    },
    steps: {
      pl: ['Warsztat i analiza potrzeb', 'Układ stref i koncepcja', 'Projekt wykonawczy i uzgodnienia', 'Nadzór i odbiór'],
      en: ['Workshop and needs analysis', 'Zoning and concept', 'Working design and approvals', 'Supervision and handover'],
    },
    rate: { min: 120, max: 200 },
    priceNote: { pl: 'zł netto / m² lokalu', en: 'PLN net / m² of premises' },
    priceExample: {
      pl: 'Przykład: biuro 400 m² na 45 stanowisk – ok. 55–65 tys. zł netto.',
      en: 'Example: a 400 m² office for 45 workstations – about PLN 55–65k net.',
    },
    duration: { pl: '2–4 miesiące', en: '2–4 months' },
    image: 'biuro-przedzalnia-1',
    related: ['biuro-w-przedzalni'],
    faq: [
      {
        q: { pl: 'Czy pracujecie z najemcami biur?', en: 'Do you work with office tenants?' },
        a: {
          pl: 'Tak. Projekt przygotowujemy tak, aby mieścił się w budżecie aranżacyjnym od właściciela budynku, i pomagamy w rozmowach z zarządcą.',
          en: 'Yes. We design within the fit-out budget provided by the landlord and help in discussions with the building manager.',
        },
      },
      {
        q: { pl: 'Jak szybko można się wprowadzić?', en: 'How soon can we move in?' },
        a: {
          pl: 'W typowym biurze 3–4 miesiące od podpisania umowy. Biuro w dawnej przędzalni (640 m²) oddaliśmy w 7 miesięcy, dwa tygodnie przed terminem.',
          en: 'For a typical office, 3–4 months from signing. The office in a former mill (640 m²) was completed in 7 months, two weeks early.',
        },
      },
    ],
  },
  {
    id: 'plot',
    slug: 'analiza-dzialki',
    icon: 'MapPinned',
    title: { pl: 'Analiza działki przed zakupem', en: 'Pre-purchase plot analysis' },
    short: { pl: 'Sprawdź działkę, zanim ją kupisz', en: 'Check a plot before you buy it' },
    lead: {
      pl: 'W 7 dni roboczych sprawdzimy, co i jak dużego można zbudować na działce, zanim podpiszesz umowę u notariusza.',
      en: 'Within 7 working days we check what – and how large – you can build on a plot before you sign at the notary.',
    },
    forWhom: {
      pl: 'Dla osób, które wybierają działkę pod dom i chcą uniknąć kosztownych niespodzianek.',
      en: 'For people choosing a building plot who want to avoid costly surprises.',
    },
    scope: {
      pl: [
        'analiza MPZP, planu ogólnego lub możliwości uzyskania warunków zabudowy',
        'chłonność działki: maksymalna powierzchnia zabudowy i wysokość domu',
        'dostęp do drogi i mediów, ukształtowanie terenu, nasłonecznienie',
        'szkic możliwego usytuowania domu na działce',
        'raport PDF z rekomendacją „kupować / negocjować / odpuścić”',
      ],
      en: [
        'analysis of the zoning plan, general plan or planning decision prospects',
        'plot capacity: maximum footprint and building height',
        'road access, utilities, terrain and sunlight',
        'a sketch of where the house could stand on the plot',
        'a PDF report with a “buy / negotiate / walk away” recommendation',
      ],
    },
    steps: {
      pl: ['Przesłanie danych działki', 'Analiza dokumentów i wizja lokalna', 'Szkic usytuowania domu', 'Raport i rozmowa podsumowująca'],
      en: ['Send us the plot details', 'Document review and site visit', 'Sketch of the house position', 'Report and summary call'],
    },
    rate: null,
    priceNote: { pl: '900 zł netto (stała cena)', en: 'PLN 900 net (fixed price)' },
    priceExample: {
      pl: 'Jeśli zamówisz u nas projekt domu na tej działce, odliczamy koszt analizy od ceny projektu.',
      en: 'If you then order your house design from us for that plot, we deduct the analysis fee from the design price.',
    },
    duration: { pl: '7 dni roboczych', en: '7 working days' },
    image: 'czarny-kubik-1',
    related: ['czarny-kubik', 'dom-pod-lasem'],
    faq: [
      {
        q: { pl: 'Co jeśli dla działki nie ma planu miejscowego?', en: 'What if there is no local zoning plan for the plot?' },
        a: {
          pl: 'Wtedy sprawdzamy plan ogólny gminy i szanse na decyzję o warunkach zabudowy, m.in. zabudowę sąsiednich działek. Wynik opisujemy w raporcie z poziomem ryzyka.',
          en: 'Then we check the municipal general plan and the chances of a planning decision, including development on neighbouring plots. The report describes the result with a risk level.',
        },
      },
      {
        q: { pl: 'Czy muszę być obecny na wizji lokalnej?', en: 'Do I need to attend the site visit?' },
        a: {
          pl: 'Nie jest to konieczne – po wizycie wysyłamy zdjęcia i notatki. Wiele osób przyjeżdża jednak, żeby od razu porozmawiać o pomysłach na dom.',
          en: 'It is not necessary – we send photos and notes after the visit. Many clients come anyway to discuss their house ideas on the spot.',
        },
      },
    ],
  },
  {
    id: 'supervision',
    slug: 'nadzor-autorski',
    icon: 'HardHat',
    title: { pl: 'Nadzór autorski', en: 'Design supervision' },
    short: { pl: 'Kontrola budowy zgodnie z projektem', en: 'Making sure it is built as designed' },
    lead: {
      pl: 'Pilnujemy, żeby dom powstał zgodnie z projektem, i szybko rozwiązujemy problemy, które pojawiają się na budowie.',
      en: 'We make sure the house is built as designed and quickly solve problems that come up on site.',
    },
    forWhom: {
      pl: 'Dla inwestorów w trakcie budowy – zarówno według naszego projektu, jak i projektu innej pracowni.',
      en: 'For clients during construction – whether the design is ours or by another studio.',
    },
    scope: {
      pl: [
        'wizyty na budowie w kluczowych etapach i wpisy do dziennika budowy',
        'odpowiedzi na pytania wykonawcy w ciągu 48 godzin',
        'rysunki uzupełniające i rozwiązania zamienne',
        'opinia o zamianach materiałów proponowanych przez wykonawcę',
        'udział w odbiorach etapów',
      ],
      en: [
        'site visits at key stages and construction log entries',
        'answers to the contractor’s questions within 48 hours',
        'supplementary drawings and alternative solutions',
        'opinions on material substitutions proposed by the contractor',
        'attendance at stage inspections',
      ],
    },
    steps: {
      pl: ['Ustalenie harmonogramu wizyt', 'Wizyty i dziennik budowy', 'Rozwiązywanie problemów na bieżąco', 'Odbiór końcowy'],
      en: ['Agreeing the visit schedule', 'Site visits and construction log', 'Solving issues as they arise', 'Final inspection'],
    },
    rate: null,
    priceNote: { pl: 'od 450 zł netto za wizytę · pakiet miesięczny 2 400 zł netto', en: 'from PLN 450 net per visit · monthly package PLN 2,400 net' },
    priceExample: {
      pl: 'Przykład: dom budowany przez 12 miesięcy, 10 wizyt w kluczowych etapach – ok. 4 500 zł netto.',
      en: 'Example: a house built over 12 months with 10 visits at key stages – about PLN 4,500 net.',
    },
    duration: { pl: 'przez cały czas budowy', en: 'throughout construction' },
    image: 'studio-2',
    related: ['willa-biale-linie', 'dom-pod-lasem'],
    faq: [
      {
        q: { pl: 'Czy nadzór autorski jest obowiązkowy?', en: 'Is design supervision mandatory?' },
        a: {
          pl: 'Nie zawsze – o obowiązku decyduje m.in. organ wydający pozwolenie. Polecamy go jednak, bo pozwala uniknąć kosztownych błędów i samowolnych zmian wykonawcy.',
          en: 'Not always – it depends, among other things, on the permitting authority. We recommend it anyway, as it prevents costly mistakes and unauthorised changes by the contractor.',
        },
      },
      {
        q: { pl: 'Czy nadzór zastępuje kierownika budowy?', en: 'Does design supervision replace the site manager?' },
        a: {
          pl: 'Nie. Kierownik budowy odpowiada za prowadzenie robót, a nadzór autorski – za zgodność budowy z projektem. Te role się uzupełniają.',
          en: 'No. The site manager runs the works, while design supervision ensures the build matches the design. The roles complement each other.',
        },
      },
    ],
  },
]

export const getService = (slug: string | undefined) => SERVICES.find((s) => s.slug === slug)
export const serviceById = (id: ServiceId) => SERVICES.find((s) => s.id === id)!

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
