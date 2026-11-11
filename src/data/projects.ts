import type { Localized } from '../i18n/types'

export type ProjectCategory = 'house' | 'interior' | 'adaptation' | 'commercial'
export type ProjectStatus = 'done' | 'in-progress'

export interface Project {
  slug: string
  title: Localized
  category: ProjectCategory
  status: ProjectStatus
  year: number
  location: Localized
  area: number
  /** Nazwy plików w /public/images (bez rozszerzenia); pierwszy = okładka. */
  images: string[]
  /** Zdjęcie ze szkicem koncepcyjnym do porównania „szkic ↔ realizacja”. */
  sketch?: string
  featured?: boolean
  lead: Localized
  challenge: Localized
  solution: Localized
  /** Mierzalne efekty – rekomendacja z zadania 1 („konkretne liczby zamiast haseł”). */
  results: Localized<string[]>
  quote?: { text: Localized; author: string }
}

export const PROJECTS: Project[] = [
  {
    slug: 'dom-pod-lasem',
    title: { pl: 'Dom pod Lasem', en: 'House by the Forest' },
    category: 'house',
    status: 'done',
    year: 2024,
    location: { pl: 'Łódź, Łagiewniki', en: 'Łódź, Łagiewniki' },
    area: 186,
    images: ['dom-pod-lasem-1', 'dom-pod-lasem-2', 'dom-pod-lasem-3'],
    sketch: 'dom-pod-lasem-1-sketch',
    featured: true,
    lead: {
      pl: 'Parterowy dom z drewna i betonu architektonicznego, otwarty na Las Łagiewnicki.',
      en: 'A single-storey timber and fair-faced concrete house opening onto the Łagiewniki Forest.',
    },
    challenge: {
      pl: 'Działka leży w otulinie lasu – MPZP narzucał niską wysokość zabudowy i dach o kącie 25–40°. Rodzina z trójką dzieci chciała dużej, jasnej strefy dziennej i ciszy w sypialniach.',
      en: 'The plot lies in the forest buffer zone – the zoning plan required a low building and a 25–40° roof. A family with three children wanted a large, bright living area and quiet bedrooms.',
    },
    solution: {
      pl: 'Zaprojektowaliśmy bryłę w kształcie litery L: strefa dzienna z przeszkleniami od południa i lasu, sypialnie w osobnym skrzydle. Okap 1,2 m chroni wnętrza przed przegrzewaniem latem.',
      en: 'We designed an L-shaped house: the living area with glazing facing south and the forest, bedrooms in a separate wing. A 1.2 m roof overhang protects the interior from overheating in summer.',
    },
    results: {
      pl: ['zapotrzebowanie na energię pierwotną 42 kWh/m²·rok', 'pozwolenie na budowę w 9 tygodni', 'budowa zamknięta w 98% zakładanego budżetu'],
      en: ['primary energy demand of 42 kWh/m² per year', 'building permit obtained in 9 weeks', 'construction completed at 98% of the planned budget'],
    },
    quote: {
      text: {
        pl: 'Najbardziej doceniamy to, że od początku wiedzieliśmy, ile zapłacimy i kiedy. Dom wygląda dokładnie jak na wizualizacjach.',
        en: 'What we value most is that we knew from day one what we would pay and when. The house looks exactly like the visualisations.',
      },
      author: 'Anna i Piotr K.',
    },
  },
  {
    slug: 'czarny-kubik',
    title: { pl: 'Czarny Kubik', en: 'The Black Cube' },
    category: 'house',
    status: 'done',
    year: 2025,
    location: { pl: 'Zgierz', en: 'Zgierz' },
    area: 154,
    images: ['czarny-kubik-1', 'czarny-kubik-2', 'czarny-kubik-3'],
    sketch: 'czarny-kubik-1-sketch',
    featured: true,
    lead: {
      pl: 'Piętrowy dom z płaskim dachem na wąskiej, 16-metrowej działce w zabudowie podmiejskiej.',
      en: 'A two-storey flat-roofed house on a narrow 16-metre suburban plot.',
    },
    challenge: {
      pl: 'Wąska działka, sąsiedzi blisko po obu stronach i inwestorzy pracujący zdalnie, którzy potrzebowali dwóch cichych gabinetów.',
      en: 'A narrow plot, neighbours close on both sides and owners working remotely who needed two quiet home offices.',
    },
    solution: {
      pl: 'Ściany boczne niemal bez okien, za to pełne przeszklenie od ogrodu i świetlik nad schodami. Elewacja z czarnej blachy na rąbek i modrzewia.',
      en: 'Side walls with almost no windows, full glazing towards the garden and a rooflight above the stairs. Facade of black standing-seam metal and larch.',
    },
    results: {
      pl: ['2 gabinety z akustyką na poziomie 35 dB', '100% okien sypialni od strony ogrodu', 'czas projektu od umowy do pozwolenia: 4,5 miesiąca'],
      en: ['2 home offices with 35 dB acoustic comfort', '100% of bedroom windows face the garden', 'contract to building permit in 4.5 months'],
    },
  },
  {
    slug: 'loft-ksiezy-mlyn',
    title: { pl: 'Loft na Księżym Młynie', en: 'Księży Młyn Loft' },
    category: 'adaptation',
    status: 'done',
    year: 2024,
    location: { pl: 'Łódź, Księży Młyn', en: 'Łódź, Księży Młyn' },
    area: 118,
    images: ['loft-ksiezy-mlyn-1', 'loft-ksiezy-mlyn-2', 'loft-ksiezy-mlyn-3'],
    sketch: 'loft-ksiezy-mlyn-1-sketch',
    featured: true,
    lead: {
      pl: 'Mieszkanie w dawnej przędzalni z XIX wieku – z ceglanymi ścianami i antresolą.',
      en: 'A flat in a 19th-century spinning mill – with exposed brick walls and a mezzanine.',
    },
    challenge: {
      pl: 'Budynek jest w rejestrze zabytków. Każda zmiana wymagała uzgodnienia z konserwatorem, a 5,4 m wysokości trzeba było wykorzystać bez naruszania historycznych okien.',
      en: 'The building is listed. Every change needed heritage approval, and the 5.4 m ceiling height had to be used without touching the historic windows.',
    },
    solution: {
      pl: 'Lekka stalowa antresola odsunięta od okien, oryginalna cegła oczyszczona i zaimpregnowana, nowe instalacje prowadzone w posadzce i stalowych korytach.',
      en: 'A light steel mezzanine set back from the windows, the original brick cleaned and sealed, new services run in the floor and exposed steel trays.',
    },
    results: {
      pl: ['+38 m² powierzchni dzięki antresoli', 'uzgodnienie konserwatorskie za pierwszym podejściem', 'zachowane 100% oryginalnej stolarki okiennej'],
      en: ['+38 m² of floor area thanks to the mezzanine', 'heritage approval at the first attempt', '100% of the original window frames preserved'],
    },
    quote: {
      text: {
        pl: 'Bałem się formalności z konserwatorem. LINEA wzięła to na siebie i wszystko poszło szybciej, niż zakładałem.',
        en: 'I was worried about the heritage paperwork. LINEA took it over and everything went faster than I expected.',
      },
      author: 'Michał W.',
    },
  },
  {
    slug: 'biuro-w-przedzalni',
    title: { pl: 'Biuro w dawnej przędzalni', en: 'Office in a Former Mill' },
    category: 'commercial',
    status: 'done',
    year: 2025,
    location: { pl: 'Łódź, Widzew', en: 'Łódź, Widzew' },
    area: 640,
    images: ['biuro-przedzalnia-1', 'biuro-przedzalnia-2', 'biuro-przedzalnia-3'],
    featured: false,
    lead: {
      pl: 'Biuro firmy technologicznej na 70 stanowisk w hali dawnej przędzalni. Wyróżnienie w konkursie Łódzka Architektura Roku 2026.',
      en: 'A 70-desk office for a tech company in a former spinning hall. Commended in the Łódź Architecture of the Year 2026 competition.',
    },
    challenge: {
      pl: 'Otwarta hala bez podziałów, słaba akustyka i bardzo krótki termin – firma musiała się wprowadzić w 7 miesięcy od podpisania umowy.',
      en: 'An open hall with no partitions, poor acoustics and a tight deadline – the company had to move in 7 months after signing.',
    },
    solution: {
      pl: 'Szklane boksy do rozmów, panele akustyczne z filcu z recyklingu i podział na strefy: skupienia, spotkań i kuchnię dla całego zespołu.',
      en: 'Glass meeting pods, acoustic panels made from recycled felt and zoning into focus areas, meeting areas and a shared kitchen.',
    },
    results: {
      pl: ['czas pogłosu skrócony z 2,1 s do 0,6 s', 'wprowadzenie się 2 tygodnie przed terminem', '12 salek i budek do rozmów'],
      en: ['reverberation time cut from 2.1 s to 0.6 s', 'move-in 2 weeks ahead of schedule', '12 meeting rooms and phone booths'],
    },
  },
  {
    slug: 'apartament-piotrkowska',
    title: { pl: 'Apartament przy Piotrkowskiej', en: 'Piotrkowska Street Apartment' },
    category: 'interior',
    status: 'done',
    year: 2025,
    location: { pl: 'Łódź, Śródmieście', en: 'Łódź, City Centre' },
    area: 92,
    images: ['apartament-piotrkowska-1', 'apartament-piotrkowska-2', 'apartament-piotrkowska-3'],
    lead: {
      pl: 'Jasne wnętrze w kamienicy z 1896 roku: odnowione sztukaterie, jodełka i współczesne meble.',
      en: 'A bright interior in an 1896 tenement: restored mouldings, herringbone parquet and contemporary furniture.',
    },
    challenge: {
      pl: 'Długi, ciemny korytarz i kuchnia bez okna. Inwestorka chciała zachować charakter kamienicy, ale mieszkać nowocześnie.',
      en: 'A long, dark corridor and a kitchen without a window. The owner wanted to keep the tenement’s character but live in a modern way.',
    },
    solution: {
      pl: 'Przenieśliśmy kuchnię do salonu, a w miejscu dawnej kuchni powstała garderoba. Przeszklone drzwi doświetlają korytarz.',
      en: 'We moved the kitchen into the living room and turned the old kitchen into a walk-in wardrobe. Glazed doors bring daylight into the corridor.',
    },
    results: {
      pl: ['naturalne światło w 5 z 5 pomieszczeń', 'odzyskane 9 m² na garderobę', 'remont zakończony w 11 tygodni'],
      en: ['daylight in 5 out of 5 rooms', '9 m² recovered for a walk-in wardrobe', 'renovation finished in 11 weeks'],
    },
  },
  {
    slug: 'mieszkanie-stare-polesie',
    title: { pl: 'Mieszkanie na Starym Polesiu', en: 'Stare Polesie Flat' },
    category: 'interior',
    status: 'done',
    year: 2026,
    location: { pl: 'Łódź, Stare Polesie', en: 'Łódź, Stare Polesie' },
    area: 74,
    images: ['mieszkanie-polesie-1', 'mieszkanie-polesie-2', 'mieszkanie-polesie-3'],
    lead: {
      pl: 'Trzy pokoje dla młodej rodziny – z miejscem do pracy i zieloną jadalnią.',
      en: 'Three rooms for a young family – with a home office and a green dining room.',
    },
    challenge: {
      pl: 'Niewielki metraż, a potrzeby jak w domu: pokój dziecka, miejsce do pracy zdalnej, duży stół dla gości.',
      en: 'A small floor area with the needs of a house: a child’s room, a remote-work space and a big table for guests.',
    },
    solution: {
      pl: 'Zabudowy na całą wysokość ścian, rozkładany stół i gabinet oddzielony od salonu przesuwną ścianą.',
      en: 'Full-height built-in storage, an extending table and a study separated from the living room by a sliding wall.',
    },
    results: {
      pl: ['+40% miejsca do przechowywania', 'stół dla 10 osób w 74 m²', 'koszt wykończenia 2 300 zł/m²'],
      en: ['+40% storage space', 'a table for 10 in 74 m²', 'fit-out cost of PLN 2,300 per m²'],
    },
  },
  {
    slug: 'dom-z-patio',
    title: { pl: 'Dom z Patio', en: 'Patio House' },
    category: 'house',
    status: 'done',
    year: 2023,
    location: { pl: 'Konstantynów Łódzki', en: 'Konstantynów Łódzki' },
    area: 212,
    images: ['dom-z-patio-1', 'dom-z-patio-2', 'dom-z-patio-3'],
    lead: {
      pl: 'Dom z wewnętrznym patio, które daje prywatność mimo bliskiej zabudowy.',
      en: 'A house built around an inner patio that gives privacy despite close neighbours.',
    },
    challenge: {
      pl: 'Działka narożna przy ruchliwej ulicy. Inwestorzy chcieli ogrodu, którego nikt nie widzi z chodnika.',
      en: 'A corner plot by a busy road. The owners wanted a garden nobody could see from the pavement.',
    },
    solution: {
      pl: 'Bryła otacza patio z trzech stron, a od ulicy chroni ją pełna ściana z drewna. Wszystkie pokoje dzienne wychodzą na patio.',
      en: 'The house wraps the patio on three sides, with a solid timber wall facing the street. All living rooms open onto the patio.',
    },
    results: {
      pl: ['hałas w salonie poniżej 30 dB', 'pompa ciepła i fotowoltaika 9,8 kWp', 'rachunki za energię ok. 210 zł/mies.'],
      en: ['living-room noise below 30 dB', 'heat pump and a 9.8 kWp PV system', 'energy bills of about PLN 210 a month'],
    },
  },
  {
    slug: 'willa-biale-linie',
    title: { pl: 'Willa Białe Linie', en: 'White Lines Villa' },
    category: 'house',
    status: 'in-progress',
    year: 2026,
    location: { pl: 'Grotniki', en: 'Grotniki' },
    area: 248,
    images: ['willa-biale-linie-1', 'willa-biale-linie-2', 'willa-biale-linie-3'],
    lead: {
      pl: 'Dwukondygnacyjna willa z tarasem na dachu. Budowa ruszyła w październiku 2026.',
      en: 'A two-storey villa with a roof terrace. Construction started in October 2026.',
    },
    challenge: {
      pl: 'Duży program funkcjonalny (5 sypialni, basen, gabinet) przy zachowaniu lekkiej, niewysokiej bryły.',
      en: 'A large brief (5 bedrooms, a pool, a study) while keeping the building light and low.',
    },
    solution: {
      pl: 'Piętro cofnięte względem parteru tworzy taras i daje cień przeszkleniom. Biały tynk zestawiony z cegłą z rozbiórki.',
      en: 'The upper floor is set back from the ground floor, creating a terrace and shading the glazing. White render paired with reclaimed brick.',
    },
    results: {
      pl: ['planowane zakończenie stanu surowego: maj 2027', 'standard energetyczny NF40', 'cegła z odzysku: 18 000 sztuk'],
      en: ['shell completion planned for May 2027', 'NF40 energy standard', '18,000 reclaimed bricks'],
    },
  },
]

export const getProject = (slug: string | undefined) => PROJECTS.find((p) => p.slug === slug)
