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
  {
    slug: 'budzet-budowy-domu-jak-go-policzyc',
    date: '2026-11-06',
    category: 'advice',
    author: 'Paweł Sadowski',
    image: 'dom-z-patio-1',
    title: {
      pl: 'Budżet budowy domu – jak go policzyć, zanim zaczniesz projekt',
      en: 'Your house-building budget – how to work it out before the design starts',
    },
    excerpt: {
      pl: 'Najczęstszy błąd inwestorów to liczenie samego stanu surowego. Pokazujemy, z jakich części składa się budżet całej inwestycji.',
      en: 'The most common mistake is budgeting only for the shell. Here is what the budget of the whole investment is made of.',
    },
    body: {
      pl: [
        'Na pierwszym spotkaniu prawie zawsze pada pytanie: „ile będzie kosztował dom?”. Odpowiedź zależy od metrażu, standardu i działki, ale sposób liczenia jest zawsze ten sam – trzeba policzyć całą inwestycję, a nie tylko budowę murów.',
        '## Z czego składa się budżet',
        'W naszych realizacjach koszty rozkładają się zwykle tak: projekt i formalności 3–5%, stan surowy zamknięty 35–40%, instalacje 15–20%, wykończenie wnętrz 25–30%, zagospodarowanie terenu 5–8%. Do tego zawsze doliczamy rezerwę 10–15% na nieprzewidziane wydatki.',
        '## Jak zmniejszyć koszty już na etapie projektu',
        'Zwarta bryła bez zbędnych załamań, prosty dach, mniej ścian nośnych i dobrze zaplanowane instalacje obniżają koszt budowy bardziej niż tańsze materiały. Dlatego budżet warto podać architektowi od razu – wtedy projekt od początku jest realny do zbudowania.',
        'Orientacyjny koszt samego projektu sprawdzisz w kalkulatorze na stronie Usługi, a pełną listę kontrolną znajdziesz w naszym bezpłatnym poradniku PDF.',
      ],
      en: [
        'At the first meeting we almost always hear: “how much will the house cost?”. The answer depends on size, standard and plot, but the method is always the same – you have to budget for the whole investment, not just the walls.',
        '## What the budget is made of',
        'In our projects costs usually split like this: design and permits 3–5%, closed shell 35–40%, building services 15–20%, interior fit-out 25–30%, landscaping 5–8%. On top of that we always add a 10–15% contingency for unexpected costs.',
        '## How to cut costs at the design stage',
        'A compact form without unnecessary corners, a simple roof, fewer load-bearing walls and well-planned services lower construction costs more than cheaper materials. That is why you should tell your architect the budget straight away – then the design is buildable from day one.',
        'You can check the indicative design fee in the calculator on the Services page, and the full checklist is in our free PDF guide.',
      ],
    },
  },
  {
    slug: 'adaptacja-poddasza-od-czego-zaczac',
    date: '2026-10-20',
    category: 'advice',
    author: 'Tomasz Wierzbicki',
    image: 'apartament-piotrkowska-2',
    title: {
      pl: 'Adaptacja poddasza – od czego zacząć',
      en: 'Converting an attic – where to start',
    },
    excerpt: {
      pl: 'Nieużytkowe poddasze to często najtańsze dodatkowe metry. Wyjaśniamy, co trzeba sprawdzić, zanim zamówisz projekt.',
      en: 'An unused attic is often the cheapest extra space you can get. Here is what to check before ordering a design.',
    },
    body: {
      pl: [
        'Adaptacja poddasza w domu lub kamienicy pozwala zyskać nawet kilkadziesiąt metrów bez rozbudowy budynku. Zanim jednak powstanie projekt, trzeba sprawdzić kilka rzeczy.',
        '## Co sprawdzamy na początku',
        'Wysokość pomieszczeń i kąt dachu (to od nich zależy powierzchnia użytkowa), stan i rodzaj więźby dachowej, możliwość doprowadzenia instalacji oraz dostęp do światła dziennego – czy wystarczą okna dachowe, czy potrzebne są lukarny.',
        '## Formalności',
        'Zakres formalności zależy od skali prac. Inaczej traktowany jest remont wnętrza, a inaczej zmiana konstrukcji dachu, nowe lukarny czy zmiana sposobu użytkowania. W budynkach zabytkowych dochodzi uzgodnienie z konserwatorem. Na konsultacji sprawdzamy, jaka procedura będzie potrzebna w Twoim przypadku.',
        'Jeśli myślisz o poddaszu w kamienicy na terenie Łodzi, zobacz nasz projekt Loftu na Księżym Młynie – zasady są bardzo podobne.',
      ],
      en: [
        'Converting the attic of a house or tenement can add dozens of square metres without extending the building. Before the design starts, however, a few things need checking.',
        '## What we check first',
        'Room height and roof pitch (they determine the usable area), the condition and type of the roof structure, the possibility of running services, and access to daylight – whether roof windows are enough or dormers are needed.',
        '## Paperwork',
        'The paperwork depends on the scale of the work. An interior refurbishment is treated differently from changing the roof structure, adding dormers or changing the use of the space. Listed buildings also need heritage approval. At the consultation we check which procedure applies in your case.',
        'If you are thinking about an attic in a Łódź tenement, take a look at our Księży Młyn Loft project – the principles are very similar.',
      ],
    },
  },
  {
    slug: 'makiety-i-wirtualne-spacery',
    date: '2026-09-22',
    category: 'studio',
    author: 'Julia Kmiecik',
    image: 'studio-1',
    title: {
      pl: 'Makiety i wirtualne spacery – jak pokazujemy projekty klientom',
      en: 'Models and virtual walkthroughs – how we present designs to clients',
    },
    excerpt: {
      pl: 'Oprócz wizualizacji przygotowujemy makiety i spacery 3D, w których można „wejść” do domu jeszcze przed budową.',
      en: 'Besides visualisations we prepare physical models and 3D walkthroughs that let you “enter” the house before it is built.',
    },
    body: {
      pl: [
        'Rysunki techniczne nie każdemu wiele mówią. Dlatego każdą koncepcję domu pokazujemy na trzy sposoby: wizualizacje, prostą makietę bryły i wirtualny spacer w modelu 3D.',
        '## Dlaczego to ważne',
        'Spacer po modelu pozwala sprawdzić proporcje pomieszczeń, widok z okien i światło o różnych porach dnia. Klienci najczęściej właśnie na tym etapie zmieniają układ – a zmiana w modelu jest wielokrotnie tańsza niż zmiana na budowie.',
        'Spacery 3D są w cenie każdej koncepcji domu i wnętrza. Możesz je obejrzeć w pracowni albo zdalnie, przez przeglądarkę.',
      ],
      en: [
        'Technical drawings do not speak to everyone. That is why we present every house concept in three ways: visualisations, a simple massing model and a virtual walkthrough of the 3D model.',
        '## Why it matters',
        'A walkthrough lets you check room proportions, the view from the windows and daylight at different times of day. This is when clients most often change the layout – and a change in the model is many times cheaper than a change on site.',
        '3D walkthroughs are included in every house and interior concept. You can view them at the studio or remotely in your browser.',
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
