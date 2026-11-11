import type { Localized } from '../i18n/types'
import type { ServiceId } from './services'

/* ---------------- Zespół ---------------- */

export interface TeamMember {
  slug: string
  name: string
  role: Localized
  bio: Localized
  /** Dłuższy opis na podstronie osoby */
  about: Localized<string[]>
  education: Localized
  specialties: Localized<string[]>
  projects: string[]
  quote: Localized
  image: string
  email: string
  linkedin: string
}

export const TEAM: TeamMember[] = [
  {
    slug: 'marta-linde',
    name: 'Marta Linde',
    role: { pl: 'Architektka, współzałożycielka', en: 'Architect, co-founder' },
    bio: {
      pl: 'Uprawnienia budowlane bez ograniczeń, członkini Okręgowej Izby Architektów. Projektuje domy jednorodzinne od 2009 roku.',
      en: 'Fully licensed architect and member of the regional Chamber of Architects. Designing houses since 2009.',
    },
    about: {
      pl: [
        'Marta założyła LINEA w 2012 roku razem z Tomaszem Wierzbickim. Wcześniej przez trzy lata pracowała w pracowni w Kopenhadze, gdzie nauczyła się projektować domy proste, jasne i oszczędne w utrzymaniu.',
        'Prowadzi projekty domów jednorodzinnych od pierwszej rozmowy do odbioru budynku. Najbardziej lubi etap koncepcji – szukanie układu, który pasuje do rodziny i do działki.',
      ],
      en: [
        'Marta co-founded LINEA in 2012 with Tomasz Wierzbicki. Before that she spent three years at a studio in Copenhagen, where she learned to design houses that are simple, bright and cheap to run.',
        'She leads house projects from the first conversation to the final inspection. Her favourite stage is the concept – finding a layout that suits both the family and the plot.',
      ],
    },
    education: { pl: 'Politechnika Łódzka, Wydział Budownictwa, Architektury i Inżynierii Środowiska', en: 'Lodz University of Technology, Faculty of Civil Engineering, Architecture and Environmental Engineering' },
    specialties: { pl: ['domy jednorodzinne', 'architektura energooszczędna', 'koncepcje i bryła'], en: ['single-family houses', 'low-energy architecture', 'concepts and massing'] },
    projects: ['dom-pod-lasem', 'willa-biale-linie', 'czarny-kubik'],
    quote: { pl: 'Dobry dom zaczyna się od tego, jak w nim chcesz spędzić zwykły wtorek.', en: 'A good house starts with how you want to spend an ordinary Tuesday in it.' },
    image: 'team-2',
    email: 'marta.linde@linea-architekci.pl',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    slug: 'tomasz-wierzbicki',
    name: 'Tomasz Wierzbicki',
    role: { pl: 'Architekt, współzałożyciel', en: 'Architect, co-founder' },
    bio: {
      pl: 'Specjalista od adaptacji budynków poprzemysłowych i zabytkowych. Wykłada projektowanie w budynkach istniejących.',
      en: 'Specialist in converting post-industrial and listed buildings. Lectures on design in existing buildings.',
    },
    about: {
      pl: [
        'Tomasz od ponad 15 lat zajmuje się łódzkimi fabrykami i kamienicami. Zna procedury konserwatorskie i wie, jak połączyć ochronę zabytku z wygodą mieszkania czy pracy.',
        'Prowadzi zajęcia z projektowania w budynkach istniejących i jest autorem wielu artykułów o rewitalizacji poprzemysłowej Łodzi.',
      ],
      en: [
        'For over 15 years Tomasz has worked on Łódź factories and tenements. He knows the heritage procedures and how to combine conservation with comfortable living or working.',
        'He teaches design in existing buildings and has written many articles on the post-industrial regeneration of Łódź.',
      ],
    },
    education: { pl: 'Politechnika Łódzka; studia podyplomowe z ochrony zabytków', en: 'Lodz University of Technology; postgraduate studies in heritage conservation' },
    specialties: { pl: ['adaptacje loftów', 'budynki zabytkowe', 'zmiana sposobu użytkowania'], en: ['loft conversions', 'listed buildings', 'change of use'] },
    projects: ['loft-ksiezy-mlyn', 'biuro-w-przedzalni'],
    quote: { pl: 'Najciekawsze projekty zaczynają się od budynku, który już ma swoją historię.', en: 'The most interesting projects start with a building that already has a story.' },
    image: 'team-1',
    email: 'tomasz.wierzbicki@linea-architekci.pl',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    slug: 'pawel-sadowski',
    name: 'Paweł Sadowski',
    role: { pl: 'Architekt, kierownik projektów', en: 'Architect, project manager' },
    bio: {
      pl: 'Prowadzi projekty od koncepcji do pozwolenia na budowę i pilnuje harmonogramu każdej umowy.',
      en: 'Leads projects from concept to building permit and keeps every contract on schedule.',
    },
    about: {
      pl: [
        'Paweł dołączył do zespołu w 2018 roku. Odpowiada za harmonogramy, kontakt z urzędami i koordynację projektantów branżowych – to dzięki niemu pozwolenia na budowę uzyskujemy zwykle w ciągu 2–3 miesięcy.',
        'Prowadzi też nadzory autorskie i doradza klientom przy wyborze wykonawców.',
      ],
      en: [
        'Paweł joined the team in 2018. He is responsible for schedules, contact with authorities and coordinating the engineers – thanks to him we usually get building permits within 2–3 months.',
        'He also handles design supervision and advises clients on choosing contractors.',
      ],
    },
    education: { pl: 'Politechnika Warszawska, Wydział Architektury', en: 'Warsaw University of Technology, Faculty of Architecture' },
    specialties: { pl: ['prowadzenie projektów', 'pozwolenia na budowę', 'nadzór autorski'], en: ['project management', 'building permits', 'design supervision'] },
    projects: ['dom-z-patio', 'willa-biale-linie'],
    quote: { pl: 'Termin w umowie to obietnica – dotrzymujemy jej.', en: 'A deadline in the contract is a promise – we keep it.' },
    image: 'team-3',
    email: 'pawel.sadowski@linea-architekci.pl',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    slug: 'julia-kmiecik',
    name: 'Julia Kmiecik',
    role: { pl: 'Architektka wnętrz', en: 'Interior architect' },
    bio: {
      pl: 'Projektuje wnętrza mieszkań i kamienic. Lubi łączyć historyczne detale z nowoczesną funkcją.',
      en: 'Designs flats and tenement interiors, combining historic details with modern use.',
    },
    about: {
      pl: [
        'Julia stworzyła w LINEA dział projektowania wnętrz w 2020 roku. Projektuje zarówno małe mieszkania, w których liczy się każdy centymetr, jak i duże apartamenty w kamienicach.',
        'Przygotowuje szczegółowe rysunki wykonawcze i zestawienia materiałów, dzięki którym ekipy remontowe mają mniej pytań, a klienci mniej niespodzianek.',
      ],
      en: [
        'Julia set up LINEA’s interior design team in 2020. She designs both small flats where every centimetre counts and large tenement apartments.',
        'She prepares detailed working drawings and materials schedules, so builders have fewer questions and clients fewer surprises.',
      ],
    },
    education: { pl: 'Akademia Sztuk Pięknych w Łodzi, architektura wnętrz', en: 'Academy of Fine Arts in Łódź, interior architecture' },
    specialties: { pl: ['wnętrza mieszkań', 'kamienice', 'zabudowy stolarskie'], en: ['flat interiors', 'tenements', 'bespoke joinery'] },
    projects: ['apartament-piotrkowska', 'mieszkanie-stare-polesie'],
    quote: { pl: 'Wnętrze ma być wygodne na co dzień, a piękne przy okazji.', en: 'An interior should be comfortable every day – and beautiful along the way.' },
    image: 'team-4',
    email: 'julia.kmiecik@linea-architekci.pl',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    slug: 'adam-nowicki',
    name: 'Adam Nowicki',
    role: { pl: 'Projektant BIM, koordynator branż', en: 'BIM designer, design coordinator' },
    bio: {
      pl: 'Odpowiada za model BIM, koordynację konstrukcji i instalacji oraz analizy energetyczne.',
      en: 'Responsible for the BIM model, coordinating structure and services, and energy analysis.',
    },
    about: {
      pl: [
        'Adam buduje modele BIM wszystkich naszych projektów i sprawdza w nich kolizje konstrukcji z instalacjami, zanim pojawią się na budowie.',
        'Przygotowuje też analizy energetyczne i nasłonecznienia oraz wirtualne spacery 3D, w których klienci mogą obejrzeć dom przed budową.',
      ],
      en: [
        'Adam builds the BIM models of all our projects and checks them for clashes between structure and services before they appear on site.',
        'He also prepares energy and sunlight analyses and the 3D walkthroughs in which clients can explore their house before it is built.',
      ],
    },
    education: { pl: 'Politechnika Łódzka, budownictwo; certyfikat BIM', en: 'Lodz University of Technology, civil engineering; BIM certificate' },
    specialties: { pl: ['modelowanie BIM', 'analizy energetyczne', 'wizualizacje i spacery 3D'], en: ['BIM modelling', 'energy analysis', 'visualisations and 3D walkthroughs'] },
    projects: ['dom-pod-lasem', 'biuro-w-przedzalni'],
    quote: { pl: 'Każdy błąd znaleziony w modelu to jeden problem mniej na budowie.', en: 'Every clash found in the model is one less problem on site.' },
    image: 'team-5',
    email: 'adam.nowicki@linea-architekci.pl',
    linkedin: 'https://www.linkedin.com/',
  },
]

export const getMember = (slug: string | undefined) => TEAM.find((m) => m.slug === slug)

/* ---------------- Opinie ---------------- */

export interface Testimonial {
  author: string
  context: Localized
  text: Localized
  rating: number
  service: ServiceId
  project?: string
  date: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    author: 'Anna i Piotr K.',
    context: { pl: 'Dom pod Lasem, 2024', en: 'House by the Forest, 2024' },
    text: {
      pl: 'Od początku wiedzieliśmy, ile zapłacimy i kiedy dostaniemy kolejne etapy projektu. Pozwolenie na budowę mieliśmy w 9 tygodni.',
      en: 'From the start we knew what we would pay and when each design stage would arrive. We had our building permit in 9 weeks.',
    },
    rating: 5,
    service: 'house',
    project: 'dom-pod-lasem',
    date: '2024-10-02',
  },
  {
    author: 'Michał W.',
    context: { pl: 'Loft na Księżym Młynie, 2024', en: 'Księży Młyn Loft, 2024' },
    text: {
      pl: 'Formalności z konserwatorem zabytków wzięli na siebie. Antresola dała nam dodatkowy pokój, o którym nie marzyliśmy.',
      en: 'They handled all the heritage paperwork. The mezzanine gave us an extra room we had not even dreamed of.',
    },
    rating: 5,
    service: 'adaptation',
    project: 'loft-ksiezy-mlyn',
    date: '2024-06-18',
  },
  {
    author: 'Katarzyna D.',
    context: { pl: 'Apartament przy Piotrkowskiej, 2025', en: 'Piotrkowska Street Apartment, 2025' },
    text: {
      pl: 'Rysunki wykonawcze były tak dokładne, że ekipa nie dzwoniła z pytaniami. Remont skończył się tydzień przed terminem.',
      en: 'The working drawings were so precise that the builders never had to call with questions. The renovation finished a week early.',
    },
    rating: 5,
    service: 'interior',
    project: 'apartament-piotrkowska',
    date: '2025-05-27',
  },
  {
    author: 'Grzegorz P., CEO',
    context: { pl: 'Biuro w dawnej przędzalni, 2025', en: 'Office in a Former Mill, 2025' },
    text: {
      pl: 'Krótki termin, trudna hala i 70 osób do przeniesienia. Wprowadziliśmy się dwa tygodnie wcześniej, niż planowaliśmy.',
      en: 'A tight deadline, a difficult hall and 70 people to move. We moved in two weeks earlier than planned.',
    },
    rating: 5,
    service: 'commercial',
    project: 'biuro-w-przedzalni',
    date: '2025-09-12',
  },
  {
    author: 'Ewa i Marek S.',
    context: { pl: 'Czarny Kubik, 2025', en: 'The Black Cube, 2025' },
    text: {
      pl: 'Nasza działka ma tylko 16 metrów szerokości i bałam się, że nic sensownego się na niej nie zmieści. Dziś mamy dwa ciche gabinety i ogród, którego nie widzą sąsiedzi.',
      en: 'Our plot is only 16 metres wide and I feared nothing sensible would fit. Today we have two quiet studies and a garden the neighbours cannot see.',
    },
    rating: 5,
    service: 'house',
    project: 'czarny-kubik',
    date: '2025-11-04',
  },
  {
    author: 'Tomasz R.',
    context: { pl: 'Analiza działki, Stryków, 2026', en: 'Plot analysis, Stryków, 2026' },
    text: {
      pl: 'Analiza pokazała, że na wymarzonej działce zmieści się dom o połowę mniejszy, niż planowaliśmy. Zrezygnowaliśmy z zakupu i oszczędziliśmy sobie dużego problemu.',
      en: 'The analysis showed that our dream plot would only take a house half the size we planned. We walked away from the purchase and saved ourselves a big problem.',
    },
    rating: 5,
    service: 'plot',
    date: '2026-03-15',
  },
  {
    author: 'Magdalena i Jan L.',
    context: { pl: 'Mieszkanie na Starym Polesiu, 2026', en: 'Stare Polesie Flat, 2026' },
    text: {
      pl: 'W 74 m² zmieściliśmy pokój dla dziecka, gabinet i stół dla dziesięciu osób. Julia znalazła miejsce na wszystko, o czym marzyliśmy.',
      en: 'In 74 m² we fitted a child’s room, a study and a table for ten. Julia found room for everything we dreamed of.',
    },
    rating: 5,
    service: 'interior',
    project: 'mieszkanie-stare-polesie',
    date: '2026-04-22',
  },
  {
    author: 'Robert K.',
    context: { pl: 'Dom z Patio, 2023', en: 'Patio House, 2023' },
    text: {
      pl: 'Bardzo dobry projekt i kontakt. Jedyny minus to dłuższe niż zakładałem oczekiwanie na pierwszą koncepcję w okresie wakacyjnym – ale efekt był tego wart.',
      en: 'A very good design and great communication. The only downside was a longer than expected wait for the first concept during the summer holidays – but the result was worth it.',
    },
    rating: 4,
    service: 'house',
    project: 'dom-z-patio',
    date: '2023-09-08',
  },
]

/* ---------------- Kariera ---------------- */

export interface Job {
  slug: string
  title: Localized
  type: Localized
  salary: Localized
  intro: Localized
  duties: Localized<string[]>
  requirements: Localized<string[]>
  offer: Localized<string[]>
}

export const JOBS: Job[] = [
  {
    slug: 'architekt-domy-jednorodzinne',
    title: { pl: 'Architekt / architektka – domy jednorodzinne', en: 'Architect – single-family houses' },
    type: { pl: 'umowa o pracę, pełny etat, Łódź (hybrydowo)', en: 'employment contract, full-time, Łódź (hybrid)' },
    salary: { pl: '9 000 – 12 000 zł brutto miesięcznie', en: 'PLN 9,000 – 12,000 gross per month' },
    intro: {
      pl: 'Szukamy osoby, która samodzielnie poprowadzi projekty domów od koncepcji do pozwolenia na budowę.',
      en: 'We are looking for someone to lead house projects independently from concept to building permit.',
    },
    duties: {
      pl: ['prowadzenie projektów domów jednorodzinnych', 'kontakt z klientami i urzędami', 'współpraca z projektantami branżowymi'],
      en: ['leading single-family house projects', 'liaising with clients and authorities', 'working with engineering consultants'],
    },
    requirements: {
      pl: ['min. 3 lata doświadczenia w projektowaniu domów', 'znajomość Archicada lub Revita', 'mile widziane uprawnienia budowlane'],
      en: ['at least 3 years of house design experience', 'ArchiCAD or Revit skills', 'a building licence is a plus'],
    },
    offer: {
      pl: ['stałe wynagrodzenie podane w ogłoszeniu', 'pracownia w dawnej tkalni przy Ogrodowej', 'budżet szkoleniowy 3 000 zł rocznie'],
      en: ['a fixed salary stated in the ad', 'a studio in a former weaving mill on Ogrodowa Street', 'a PLN 3,000 annual training budget'],
    },
  },
  {
    slug: 'asystent-architekta-wnetrz',
    title: { pl: 'Asystent / asystentka architekta wnętrz', en: 'Interior design assistant' },
    type: { pl: 'umowa o pracę lub B2B, pełny etat, Łódź', en: 'employment or B2B contract, full-time, Łódź' },
    salary: { pl: '6 000 – 7 500 zł brutto miesięcznie', en: 'PLN 6,000 – 7,500 gross per month' },
    intro: {
      pl: 'Dołącz do działu wnętrz i pomagaj przy rysunkach wykonawczych, zestawieniach materiałów i wizualizacjach.',
      en: 'Join our interiors team and help with working drawings, materials schedules and visualisations.',
    },
    duties: {
      pl: ['rysunki wykonawcze i zestawienia materiałów', 'przygotowanie wizualizacji', 'kontakt z dostawcami i stolarzami'],
      en: ['working drawings and materials schedules', 'preparing visualisations', 'liaising with suppliers and joiners'],
    },
    requirements: {
      pl: ['wykształcenie z architektury wnętrz (także absolwenci)', 'znajomość programu CAD i narzędzia do wizualizacji', 'staranność i dobra organizacja pracy'],
      en: ['a degree in interior architecture (graduates welcome)', 'CAD and visualisation software skills', 'attention to detail and good organisation'],
    },
    offer: {
      pl: ['opieka doświadczonej architektki', 'realne projekty od pierwszego tygodnia', 'elastyczne godziny pracy'],
      en: ['mentoring by an experienced interior architect', 'real projects from the first week', 'flexible working hours'],
    },
  },
  {
    slug: 'praktyki-studenckie',
    title: { pl: 'Praktyki studenckie (lato 2027)', en: 'Student internship (summer 2027)' },
    type: { pl: 'płatne praktyki, 2–3 miesiące, Łódź', en: 'paid internship, 2–3 months, Łódź' },
    salary: { pl: '4 300 zł brutto miesięcznie', en: 'PLN 4,300 gross per month' },
    intro: {
      pl: 'Praktyki dla studentów architektury i architektury wnętrz, którzy chcą zobaczyć, jak projekt powstaje od pierwszej rozmowy do budowy.',
      en: 'An internship for architecture and interior design students who want to see how a project develops from the first meeting to construction.',
    },
    duties: {
      pl: ['udział w spotkaniach z klientami', 'pomoc przy modelach BIM i makietach', 'wizyty na budowach z architektami'],
      en: ['attending client meetings', 'helping with BIM models and physical models', 'site visits with our architects'],
    },
    requirements: {
      pl: ['status studenta (min. 3. rok)', 'portfolio z pracami studenckimi', 'znajomość podstaw programu CAD'],
      en: ['student status (3rd year or above)', 'a portfolio of student work', 'basic CAD skills'],
    },
    offer: {
      pl: ['wynagrodzenie za praktyki', 'opiekun praktyk z zespołu', 'możliwość zatrudnienia po studiach'],
      en: ['a paid internship', 'a dedicated mentor', 'the chance of a job after graduation'],
    },
  },
]

/* ---------------- Nagrody ---------------- */

export const AWARDS: { year: number; title: Localized }[] = [
  { year: 2026, title: { pl: 'Łódzka Architektura Roku – wyróżnienie (Biuro w dawnej przędzalni)', en: 'Łódź Architecture of the Year – commendation (Office in a Former Mill)' } },
  { year: 2025, title: { pl: 'Finał konkursu „Dom Roku” – Czarny Kubik', en: '“House of the Year” finalist – The Black Cube' } },
  { year: 2024, title: { pl: 'Nagroda czytelników portalu Architektura Łodzi – Loft na Księżym Młynie', en: 'Readers’ award, Łódź Architecture portal – Księży Młyn Loft' } },
  { year: 2021, title: { pl: 'Członkostwo w Polskiej Izbie Budownictwa Pasywnego', en: 'Member of the Polish Passive Building Chamber' } },
]

/* ---------------- FAQ (podstrona Wiedza → FAQ) ---------------- */

export type FaqCategory = 'prices' | 'process' | 'formalities' | 'cooperation'

export const FAQ: { q: Localized; a: Localized; category: FaqCategory }[] = [
  {
    category: 'prices',
    q: { pl: 'Ile kosztuje projekt indywidualny domu?', en: 'How much does a bespoke house design cost?' },
    a: {
      pl: 'Najczęściej od 180 do 260 zł netto za m² powierzchni użytkowej. Dla domu 150 m² to zwykle 27–39 tys. zł netto za pełny projekt z pozwoleniem. Dokładną, stałą cenę podajemy w ofercie po bezpłatnej konsultacji. Orientacyjną kwotę policzysz w naszym kalkulatorze.',
      en: 'Usually PLN 180–260 net per m² of usable floor area. For a 150 m² house that is typically PLN 27–39k net for the full design including the permit. We give you a fixed price after the free consultation. You can get an estimate in our calculator.',
    },
  },
  {
    category: 'prices',
    q: { pl: 'Czy projekt indywidualny jest dużo droższy od gotowego?', en: 'Is a bespoke design much more expensive than a catalogue one?' },
    a: {
      pl: 'Sam projekt tak, ale gotowy projekt i tak trzeba zaadaptować do działki (zwykle 5–10 tys. zł). Indywidualny dom jest dopasowany do działki i rodziny, co często obniża koszt budowy i późniejszych rachunków.',
      en: 'The design itself is, but a catalogue design still has to be adapted to the plot (usually PLN 5–10k). A bespoke house fits the plot and the family, which often lowers construction and running costs.',
    },
  },
  {
    category: 'prices',
    q: { pl: 'Jak wyglądają płatności?', en: 'How do payments work?' },
    a: {
      pl: 'Płacisz w trzech ratach powiązanych z etapami: 20% po podpisaniu umowy, 40% po akceptacji koncepcji i 40% po złożeniu wniosku o pozwolenie na budowę.',
      en: 'You pay in three instalments tied to the stages: 20% on signing, 40% on concept approval and 40% when the permit application is filed.',
    },
  },
  {
    category: 'process',
    q: { pl: 'Ile trwa przygotowanie projektu?', en: 'How long does the design take?' },
    a: {
      pl: 'Od podpisania umowy do złożenia wniosku o pozwolenie na budowę mija zwykle 3–4 miesiące. Do tego dochodzi czas urzędu (ustawowo do 65 dni) i projekt techniczny.',
      en: 'From signing the contract to filing the permit application usually takes 3–4 months. Add the authority’s processing time (up to 65 days by law) and the technical design.',
    },
  },
  {
    category: 'process',
    q: { pl: 'Co przygotować na pierwsze spotkanie?', en: 'What should I bring to the first meeting?' },
    a: {
      pl: 'Wypis i wyrys z MPZP lub decyzję o warunkach zabudowy, mapę działki, orientacyjny budżet i listę potrzeb. Wszystko opisaliśmy w bezpłatnym poradniku PDF.',
      en: 'Your zoning plan extract or planning decision, a plot map, an approximate budget and a list of needs. It is all described in our free PDF guide.',
    },
  },
  {
    category: 'process',
    q: { pl: 'Ile rund poprawek jest w cenie?', en: 'How many rounds of revisions are included?' },
    a: {
      pl: 'Dwie rundy poprawek koncepcji są w cenie. Dzięki wirtualnemu spacerowi 3D zwykle tyle wystarcza, aby dopracować dom w każdym szczególe.',
      en: 'Two rounds of concept revisions are included. Thanks to the 3D walkthrough this is usually enough to perfect the house in every detail.',
    },
  },
  {
    category: 'formalities',
    q: { pl: 'Czy załatwiacie pozwolenie na budowę?', en: 'Do you handle the building permit?' },
    a: {
      pl: 'Tak. Na podstawie pełnomocnictwa składamy wniosek, odpowiadamy na wezwania urzędu i informujemy Cię o każdym etapie.',
      en: 'Yes. With your power of attorney we file the application, respond to the authority’s requests and keep you informed at every stage.',
    },
  },
  {
    category: 'formalities',
    q: { pl: 'Czy pomagacie przy budynkach zabytkowych?', en: 'Do you help with listed buildings?' },
    a: {
      pl: 'Tak, to nasza specjalność. Przygotowujemy dokumentację i uzgodnienia z konserwatorem zabytków, a koncepcję omawiamy z nim jeszcze przed złożeniem wniosku.',
      en: 'Yes, it is our speciality. We prepare the documentation and heritage approvals, and discuss the concept with the conservator before filing.',
    },
  },
  {
    category: 'formalities',
    q: { pl: 'Jak chronicie moje dane i pomysły?', en: 'How do you protect my data and ideas?' },
    a: {
      pl: 'Dane z formularzy przetwarzamy tylko w celu kontaktu (RODO). Na życzenie podpisujemy umowę o poufności, a prawa autorskie do projektu opisujemy jasno w umowie.',
      en: 'We process form data only to contact you (GDPR). On request we sign a non-disclosure agreement, and copyright in the design is set out clearly in the contract.',
    },
  },
  {
    category: 'cooperation',
    q: { pl: 'Czy pracujecie poza Łodzią?', en: 'Do you work outside Łódź?' },
    a: {
      pl: 'Tak, projektujemy w całym województwie łódzkim, a wnętrza i konsultacje prowadzimy również zdalnie w całej Polsce.',
      en: 'Yes, we design throughout the Łódź region, and we run interior projects and consultations remotely across Poland.',
    },
  },
  {
    category: 'cooperation',
    q: { pl: 'Kto będzie prowadził mój projekt?', en: 'Who will lead my project?' },
    a: {
      pl: 'Każdy projekt prowadzi jedna osoba z zespołu – od pierwszej rozmowy do odbioru. Masz jej bezpośredni telefon i e-mail.',
      en: 'Every project is led by one person from the team – from the first meeting to completion. You get their direct phone number and e-mail.',
    },
  },
  {
    category: 'cooperation',
    q: { pl: 'Czy mogę zobaczyć zrealizowane budynki?', en: 'Can I see completed buildings?' },
    a: {
      pl: 'Tak. Za zgodą właścicieli organizujemy wizyty w kilku zrealizowanych domach, a raz w roku – dzień otwarty w pracowni.',
      en: 'Yes. With the owners’ consent we arrange visits to several completed houses, and once a year we hold an open day at the studio.',
    },
  },
]
