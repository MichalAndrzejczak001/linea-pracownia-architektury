import type { Localized } from '../i18n/types'

export interface TeamMember {
  name: string
  role: Localized
  bio: Localized
  image: string
  linkedin: string
}

export const TEAM: TeamMember[] = [
  {
    name: 'Marta Linde',
    role: { pl: 'Architektka, współzałożycielka', en: 'Architect, co-founder' },
    bio: {
      pl: 'Uprawnienia budowlane bez ograniczeń, członkini Okręgowej Izby Architektów. Projektuje domy jednorodzinne od 2009 roku.',
      en: 'Fully licensed architect and member of the regional Chamber of Architects. Designing houses since 2009.',
    },
    image: 'team-2',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Tomasz Wierzbicki',
    role: { pl: 'Architekt, współzałożyciel', en: 'Architect, co-founder' },
    bio: {
      pl: 'Specjalista od adaptacji budynków poprzemysłowych i zabytkowych. Wykłada projektowanie w budynkach istniejących.',
      en: 'Specialist in converting post-industrial and listed buildings. Lectures on design in existing buildings.',
    },
    image: 'team-1',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Paweł Sadowski',
    role: { pl: 'Architekt, kierownik projektów', en: 'Architect, project manager' },
    bio: {
      pl: 'Prowadzi projekty od koncepcji do pozwolenia na budowę i pilnuje harmonogramu każdej umowy.',
      en: 'Leads projects from concept to building permit and keeps every contract on schedule.',
    },
    image: 'team-3',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Julia Kmiecik',
    role: { pl: 'Architektka wnętrz', en: 'Interior architect' },
    bio: {
      pl: 'Projektuje wnętrza mieszkań i kamienic. Lubi łączyć historyczne detale z nowoczesną funkcją.',
      en: 'Designs flats and tenement interiors, combining historic details with modern use.',
    },
    image: 'team-4',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Adam Nowicki',
    role: { pl: 'Projektant BIM, koordynator branż', en: 'BIM designer, design coordinator' },
    bio: {
      pl: 'Odpowiada za model BIM, koordynację konstrukcji i instalacji oraz analizy energetyczne.',
      en: 'Responsible for the BIM model, coordinating structure and services, and energy analysis.',
    },
    image: 'team-5',
    linkedin: 'https://www.linkedin.com/',
  },
]

export interface Testimonial {
  author: string
  context: Localized
  text: Localized
  rating: number
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
  },
  {
    author: 'Michał W.',
    context: { pl: 'Loft na Księżym Młynie, 2024', en: 'Księży Młyn Loft, 2024' },
    text: {
      pl: 'Formalności z konserwatorem zabytków wzięli na siebie. Antresola dała nam dodatkowy pokój, o którym nie marzyliśmy.',
      en: 'They handled all the heritage paperwork. The mezzanine gave us an extra room we had not even dreamed of.',
    },
    rating: 5,
  },
  {
    author: 'Katarzyna D.',
    context: { pl: 'Apartament przy Piotrkowskiej, 2025', en: 'Piotrkowska Street Apartment, 2025' },
    text: {
      pl: 'Rysunki wykonawcze były tak dokładne, że ekipa nie dzwoniła z pytaniami. Remont skończył się tydzień przed terminem.',
      en: 'The working drawings were so precise that the builders never had to call with questions. The renovation finished a week early.',
    },
    rating: 5,
  },
  {
    author: 'Grzegorz P., CEO',
    context: { pl: 'Biuro w dawnej przędzalni, 2025', en: 'Office in a Former Mill, 2025' },
    text: {
      pl: 'Krótki termin, trudna hala i 70 osób do przeniesienia. Wprowadziliśmy się dwa tygodnie wcześniej, niż planowaliśmy.',
      en: 'A tight deadline, a difficult hall and 70 people to move. We moved in two weeks earlier than planned.',
    },
    rating: 5,
  },
]

export const AWARDS: { year: number; title: Localized }[] = [
  { year: 2026, title: { pl: 'Łódzka Architektura Roku – wyróżnienie (Biuro w dawnej przędzalni)', en: 'Łódź Architecture of the Year – commendation (Office in a Former Mill)' } },
  { year: 2025, title: { pl: 'Finał konkursu „Dom Roku” – Czarny Kubik', en: '“House of the Year” finalist – The Black Cube' } },
  { year: 2024, title: { pl: 'Nagroda czytelników portalu Architektura Łodzi – Loft na Księżym Młynie', en: 'Readers’ award, Łódź Architecture portal – Księży Młyn Loft' } },
  { year: 2021, title: { pl: 'Członkostwo w Polskiej Izbie Budownictwa Pasywnego', en: 'Member of the Polish Passive Building Chamber' } },
]

export const FAQ: { q: Localized; a: Localized }[] = [
  {
    q: { pl: 'Ile kosztuje projekt indywidualny domu?', en: 'How much does a bespoke house design cost?' },
    a: {
      pl: 'Najczęściej od 180 do 260 zł netto za m² powierzchni użytkowej. Dla domu 150 m² to zwykle 27–39 tys. zł netto za pełny projekt z pozwoleniem. Dokładną, stałą cenę podajemy w ofercie po bezpłatnej konsultacji. Orientacyjną kwotę policzysz w naszym kalkulatorze.',
      en: 'Usually PLN 180–260 net per m² of usable floor area. For a 150 m² house that is typically PLN 27–39k net for the full design including the permit. We give you a fixed price after the free consultation. You can get an estimate in our calculator.',
    },
  },
  {
    q: { pl: 'Ile trwa przygotowanie projektu?', en: 'How long does the design take?' },
    a: {
      pl: 'Od podpisania umowy do złożenia wniosku o pozwolenie na budowę mija zwykle 3–4 miesiące. Do tego dochodzi czas urzędu (ustawowo do 65 dni) i projekt techniczny.',
      en: 'From signing the contract to filing the permit application usually takes 3–4 months. Add the authority’s processing time (up to 65 days by law) and the technical design.',
    },
  },
  {
    q: { pl: 'Czy projekt indywidualny jest dużo droższy od gotowego?', en: 'Is a bespoke design much more expensive than a catalogue one?' },
    a: {
      pl: 'Sam projekt tak, ale gotowy projekt i tak trzeba zaadaptować do działki (zwykle 5–10 tys. zł). Indywidualny dom jest dopasowany do działki i rodziny, co często obniża koszt budowy i późniejszych rachunków.',
      en: 'The design itself is, but a catalogue design still has to be adapted to the plot (usually PLN 5–10k). A bespoke house fits the plot and the family, which often lowers construction and running costs.',
    },
  },
  {
    q: { pl: 'Czy załatwiacie pozwolenie na budowę?', en: 'Do you handle the building permit?' },
    a: {
      pl: 'Tak. Na podstawie pełnomocnictwa składamy wniosek, odpowiadamy na wezwania urzędu i informujemy Cię o każdym etapie.',
      en: 'Yes. With your power of attorney we file the application, respond to the authority’s requests and keep you informed at every stage.',
    },
  },
  {
    q: { pl: 'Czy pracujecie poza Łodzią?', en: 'Do you work outside Łódź?' },
    a: {
      pl: 'Tak, projektujemy w całym województwie łódzkim, a wnętrza i konsultacje prowadzimy również zdalnie w całej Polsce.',
      en: 'Yes, we design throughout the Łódź region, and we run interior projects and consultations remotely across Poland.',
    },
  },
  {
    q: { pl: 'Co przygotować na pierwsze spotkanie?', en: 'What should I bring to the first meeting?' },
    a: {
      pl: 'Wypis i wyrys z MPZP lub decyzję o warunkach zabudowy, mapę działki, orientacyjny budżet i listę potrzeb. Wszystko opisaliśmy w bezpłatnym poradniku PDF.',
      en: 'Your zoning plan extract or planning decision, a plot map, an approximate budget and a list of needs. It is all described in our free PDF guide.',
    },
  },
  {
    q: { pl: 'Jak chronicie moje dane i pomysły?', en: 'How do you protect my data and ideas?' },
    a: {
      pl: 'Dane z formularzy przetwarzamy tylko w celu kontaktu (RODO). Na życzenie podpisujemy umowę o poufności, a prawa autorskie do projektu opisujemy jasno w umowie.',
      en: 'We process form data only to contact you (GDPR). On request we sign a non-disclosure agreement, and copyright in the design is set out clearly in the contract.',
    },
  },
]
