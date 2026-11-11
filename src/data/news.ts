import type { Localized } from '../i18n/types'

export type NewsCategory = 'awards' | 'events' | 'advice' | 'studio'

export interface NewsPost {
  slug: string
  date: string // ISO, np. 2026-11-09
  category: NewsCategory
  author: string
  image: string
  title: Localized
  excerpt: Localized
  /** Akapity treści; linia zaczynająca się od „## ” to śródtytuł. */
  body: Localized<string[]>
  /** Opcjonalne wydarzenie powiązane z wpisem (np. dzień otwarty). */
  event?: { date: string; time: string; place: Localized }
}

export const NEWS: NewsPost[] = [
  {
    slug: 'wyroznienie-lodzka-architektura-roku-2026',
    date: '2026-11-09',
    category: 'awards',
    author: 'Marta Linde',
    image: 'biuro-przedzalnia-1',
    title: {
      pl: 'Wyróżnienie w konkursie Łódzka Architektura Roku 2026',
      en: 'Commendation in the Łódź Architecture of the Year 2026 competition',
    },
    excerpt: {
      pl: 'Biuro w dawnej przędzalni na Widzewie zostało wyróżnione w kategorii „Adaptacja i rewitalizacja”.',
      en: 'Our office in a former spinning mill in Widzew was commended in the “Adaptation and Regeneration” category.',
    },
    body: {
      pl: [
        'Z ogromną radością informujemy, że projekt biura w dawnej przędzalni na Widzewie otrzymał wyróżnienie w kategorii „Adaptacja i rewitalizacja”. Jury doceniło połączenie historycznej konstrukcji hali z nowoczesnym, przyjaznym dla zespołu miejscem pracy.',
        '## Co zwróciło uwagę jury',
        'Zachowaliśmy żeliwne słupy, ceglane ściany i świetliki w dachu. Nowe elementy – szklane boksy, panele akustyczne i strefa kuchni – można w przyszłości zdemontować bez szkody dla budynku.',
        'Ważna była też akustyka: czas pogłosu w hali skróciliśmy z 2,1 s do 0,6 s, dzięki czemu 70 osób może pracować w jednej przestrzeni bez słuchawek.',
        'Dziękujemy inwestorowi za zaufanie i ekipie wykonawczej za świetną współpracę. Pełny opis projektu znajdziesz w zakładce Projekty.',
      ],
      en: [
        'We are delighted to announce that our office project in a former spinning mill in Widzew has been commended in the “Adaptation and Regeneration” category. The jury praised the combination of the hall’s historic structure with a modern, people-friendly workplace.',
        '## What the jury noticed',
        'We kept the cast-iron columns, brick walls and roof lights. The new elements – glass pods, acoustic panels and the kitchen area – can be removed in the future without damaging the building.',
        'Acoustics mattered too: we cut the hall’s reverberation time from 2.1 s to 0.6 s, so 70 people can work in one space without headphones.',
        'We thank the client for their trust and the contractor for excellent cooperation. You will find the full case study in the Projects section.',
      ],
    },
  },
  {
    slug: 'dzien-otwarty-pracowni-listopad-2026',
    date: '2026-11-04',
    category: 'events',
    author: 'Julia Kmiecik',
    image: 'studio-1',
    title: {
      pl: 'Dzień otwarty w pracowni – 21 listopada 2026',
      en: 'Studio open day – 21 November 2026',
    },
    excerpt: {
      pl: 'Zapraszamy na sobotnie konsultacje bez zapisów: przynieś mapę działki albo rzut mieszkania i porozmawiaj z architektem.',
      en: 'Join us for walk-in Saturday consultations: bring your plot map or flat layout and talk to an architect.',
    },
    event: { date: '2026-11-21', time: '10:00–15:00', place: { pl: 'ul. Ogrodowa 17, Łódź', en: '17 Ogrodowa St, Łódź' } },
    body: {
      pl: [
        'W sobotę 21 listopada otwieramy drzwi pracowni dla wszystkich, którzy planują budowę domu, remont mieszkania albo adaptację lokalu w kamienicy czy lofcie.',
        '## Co przygotowaliśmy',
        'Krótkie, 20-minutowe konsultacje z architektami (bez zapisów, według kolejności przybycia), prezentację makiet i materiałów wykończeniowych oraz drukowaną wersję naszego poradnika „Jak przygotować się do projektu domu”.',
        '## Co warto ze sobą zabrać',
        'Wypis i wyrys z MPZP albo decyzję o warunkach zabudowy, mapę działki, zdjęcia lub rzut mieszkania oraz listę pytań. Im więcej informacji, tym konkretniej możemy doradzić.',
        'Jeśli nie możesz przyjść, umów bezpłatną konsultację online w dowolnym dniu roboczym przez formularz kontaktowy.',
      ],
      en: [
        'On Saturday 21 November we are opening the studio to everyone planning to build a house, renovate a flat or convert a unit in a tenement or loft.',
        '## What we have prepared',
        'Short 20-minute consultations with our architects (walk-in, first come first served), a display of models and finishing materials, and a printed copy of our guide “How to prepare for your house design”.',
        '## What to bring',
        'Your zoning plan extract or planning decision, a plot map, photos or a floor plan of your flat and a list of questions. The more information you bring, the more specific our advice can be.',
        'If you cannot come, book a free online consultation on any working day using the contact form.',
      ],
    },
  },
  {
    slug: 'plan-ogolny-gminy-sprawdz-dzialke',
    date: '2026-10-27',
    category: 'advice',
    author: 'Tomasz Wierzbicki',
    image: 'studio-2',
    title: {
      pl: 'Plan ogólny gminy – dlaczego warto sprawdzić działkę przed zakupem',
      en: 'The municipal general plan – why you should check a plot before buying',
    },
    excerpt: {
      pl: 'Reforma planowania przestrzennego zmienia zasady wydawania warunków zabudowy. Wyjaśniamy, na co zwrócić uwagę.',
      en: 'The spatial planning reform changes how planning decisions are issued. Here is what to look out for.',
    },
    body: {
      pl: [
        'Po reformie planowania przestrzennego każda gmina przyjmuje plan ogólny. To dokument, który dzieli gminę na strefy i określa, co i jak można w nich budować.',
        '## Co to oznacza dla kupujących działkę',
        'Jeśli dla działki nie ma miejscowego planu zagospodarowania przestrzennego (MPZP), możliwość uzyskania warunków zabudowy zależy teraz od ustaleń planu ogólnego. Działka „budowlana” w ogłoszeniu nie zawsze jest budowlana w praktyce.',
        '## Jak się zabezpieczyć',
        'Przed podpisaniem umowy sprawdź w urzędzie gminy plan ogólny i MPZP, zapytaj o dostęp do drogi publicznej i mediów, a w razie wątpliwości zamów analizę chłonności działki. Robimy ją w ciągu 7 dni roboczych i pokazujemy, jak duży dom zmieści się na działce.',
      ],
      en: [
        'Following the spatial planning reform, every Polish municipality adopts a general plan. It divides the municipality into zones and sets out what may be built in each of them and how.',
        '## What this means for plot buyers',
        'If there is no local zoning plan for a plot, the chance of getting a planning decision now depends on the general plan. A plot advertised as “building land” is not always buildable in practice.',
        '## How to protect yourself',
        'Before signing, check the general plan and the local zoning plan at the municipal office, ask about access to a public road and utilities, and if in doubt order a plot capacity analysis. We deliver it within 7 working days and show you how large a house the plot can take.',
      ],
    },
  },
  {
    slug: 'start-budowy-willa-biale-linie',
    date: '2026-10-14',
    category: 'studio',
    author: 'Paweł Sadowski',
    image: 'willa-biale-linie-1',
    title: {
      pl: 'Ruszyła budowa Willi Białe Linie',
      en: 'Construction of the White Lines Villa has begun',
    },
    excerpt: {
      pl: 'Po 7 miesiącach projektowania i uzyskaniu pozwolenia na budowę zaczęły się prace ziemne w Grotnikach.',
      en: 'After 7 months of design and a granted building permit, groundworks have started in Grotniki.',
    },
    body: {
      pl: [
        'W Grotnikach wystartowała budowa willi, którą projektowaliśmy od marca. Pozwolenie na budowę uprawomocniło się we wrześniu, a w październiku na działkę wjechały koparki.',
        'Jako nadzór autorski będziemy na budowie co dwa tygodnie. Zakończenie stanu surowego zamkniętego planujemy na maj 2027 roku – postępy będziemy pokazywać w aktualnościach i na Instagramie.',
      ],
      en: [
        'Construction has started in Grotniki on the villa we have been designing since March. The building permit became final in September and the excavators arrived on site in October.',
        'As design supervisors we will visit the site every two weeks. The closed shell is planned for May 2027 – we will share progress in our news and on Instagram.',
      ],
    },
  },
  {
    slug: 'poradnik-jak-przygotowac-sie-do-projektu-domu',
    date: '2026-09-29',
    category: 'advice',
    author: 'Marta Linde',
    image: 'news-4',
    title: {
      pl: 'Nowy poradnik PDF: jak przygotować się do projektu domu',
      en: 'New PDF guide: how to prepare for your house design',
    },
    excerpt: {
      pl: 'Zebraliśmy w 6 krokach wszystko, co warto wiedzieć przed pierwszym spotkaniem z architektem. Do pobrania za darmo.',
      en: 'We have put everything you should know before meeting an architect into 6 steps. Free to download.',
    },
    body: {
      pl: [
        'Najczęstsze pytania, które słyszymy na pierwszych spotkaniach, zebraliśmy w krótkim poradniku. Znajdziesz w nim listę dokumentów, ćwiczenie „jak mieszkamy” i wskazówki, jak policzyć budżet całej inwestycji.',
        'Poradnik możesz pobrać bez podawania adresu e-mail w zakładce Poradnik.',
      ],
      en: [
        'We have collected the questions we hear most often at first meetings into a short guide. It includes a document checklist, a “how we live” exercise and tips on budgeting the whole investment.',
        'You can download the guide without giving your e-mail address in the Guide section.',
      ],
    },
  },
  {
    slug: 'dom-o-niskim-zuzyciu-energii',
    date: '2026-09-10',
    category: 'advice',
    author: 'Adam Nowicki',
    image: 'news-2',
    title: {
      pl: 'Jak projektujemy domy o niskim zużyciu energii',
      en: 'How we design low-energy houses',
    },
    excerpt: {
      pl: 'Pompa ciepła i fotowoltaika to nie wszystko. Największe oszczędności daje dobrze zaprojektowana bryła.',
      en: 'A heat pump and solar panels are not everything. The biggest savings come from a well-designed building form.',
    },
    body: {
      pl: [
        'Najtańsza energia to ta, której nie trzeba zużyć. Dlatego zaczynamy od zwartej bryły, właściwej orientacji okien i osłon przeciwsłonecznych, a dopiero potem dobieramy instalacje.',
        '## Trzy zasady, które stosujemy w każdym projekcie',
        'Duże przeszklenia od południa z okapem, który latem daje cień. Ciągła izolacja bez mostków termicznych. Wentylacja mechaniczna z odzyskiem ciepła dobrana do kubatury domu.',
        'Dzięki temu nasze domy osiągają zapotrzebowanie na energię pierwotną na poziomie 40–55 kWh/m²·rok, a rachunki rodziny w domu 180 m² wynoszą zwykle 180–250 zł miesięcznie.',
      ],
      en: [
        'The cheapest energy is the energy you do not use. That is why we start with a compact form, correct window orientation and solar shading – and only then choose the building services.',
        '## Three rules we apply to every project',
        'Large south-facing glazing with an overhang that gives shade in summer. Continuous insulation without thermal bridges. Mechanical ventilation with heat recovery sized to the house volume.',
        'As a result our houses reach a primary energy demand of 40–55 kWh/m² per year, and energy bills for a family in a 180 m² house are usually PLN 180–250 a month.',
      ],
    },
  },
]

/** Najnowsze wpisy na początku – aktualności zawsze w kolejności od najświeższych. */
export const NEWS_SORTED = [...NEWS].sort((a, b) => b.date.localeCompare(a.date))

export const getPost = (slug: string | undefined) => NEWS.find((p) => p.slug === slug)

/** Wpis jest „nowy”, jeżeli ma nie więcej niż 14 dni. */
export const isFresh = (iso: string, now = new Date()) =>
  (now.getTime() - new Date(iso + 'T12:00:00').getTime()) / 86_400_000 <= 14
