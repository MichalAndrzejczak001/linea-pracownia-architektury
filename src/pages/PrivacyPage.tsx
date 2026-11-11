import { useI18n } from '../i18n/LanguageContext'
import type { Localized } from '../i18n/types'
import { COMPANY } from '../data/company'
import { PageHeader, Seo } from '../components/ui'
import { openCookieSettings } from '../components/CookieBanner'

const UPDATED = '2026-11-02'

const SECTIONS: { h: Localized; p: Localized<string[]> }[] = [
  {
    h: { pl: '1. Administrator danych', en: '1. Data controller' },
    p: {
      pl: [`Administratorem Twoich danych osobowych jest ${COMPANY.name}, ${COMPANY.street}, ${COMPANY.postalCity}, e-mail: ${COMPANY.email}.`],
      en: [`The controller of your personal data is ${COMPANY.name}, ${COMPANY.street}, ${COMPANY.postalCity}, e-mail: ${COMPANY.email}.`],
    },
  },
  {
    h: { pl: '2. Jakie dane i w jakim celu przetwarzamy', en: '2. What data we process and why' },
    p: {
      pl: [
        'Formularz kontaktowy (brief): imię i nazwisko, e-mail, opcjonalnie telefon i informacje o inwestycji – w celu odpowiedzi na zapytanie i przygotowania oferty (art. 6 ust. 1 lit. b i f RODO).',
        'Newsletter: adres e-mail – w celu wysyłki newslettera na podstawie Twojej zgody (art. 6 ust. 1 lit. a RODO). Zgodę możesz wycofać w każdej chwili.',
      ],
      en: [
        'Contact form (brief): name, e-mail, optionally phone number and project details – to respond to your enquiry and prepare a proposal (Art. 6(1)(b) and (f) GDPR).',
        'Newsletter: e-mail address – to send the newsletter based on your consent (Art. 6(1)(a) GDPR). You can withdraw consent at any time.',
      ],
    },
  },
  {
    h: { pl: '3. Jak długo przechowujemy dane', en: '3. How long we keep data' },
    p: {
      pl: ['Dane z zapytań przechowujemy przez 12 miesięcy od ostatniego kontaktu, a w razie zawarcia umowy – przez okres wymagany przepisami prawa. Dane z newslettera – do czasu wycofania zgody.'],
      en: ['Enquiry data is kept for 12 months from the last contact or, if a contract is signed, for the period required by law. Newsletter data is kept until you withdraw consent.'],
    },
  },
  {
    h: { pl: '4. Twoje prawa', en: '4. Your rights' },
    p: {
      pl: ['Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia, wniesienia sprzeciwu oraz skargi do Prezesa Urzędu Ochrony Danych Osobowych.'],
      en: ['You have the right to access, rectify, erase, restrict and port your data, to object to processing, and to lodge a complaint with the Polish data protection authority (UODO).'],
    },
  },
  {
    h: { pl: '5. Pliki cookies', en: '5. Cookies' },
    p: {
      pl: [
        'Niezbędny plik (localStorage „linea-cookie-consent”) zapamiętuje Twój wybór dotyczący cookies. Cookies analityczne i marketingowe są używane wyłącznie po wyrażeniu zgody w banerze.',
        'Mapa OpenStreetMap na stronie kontaktowej ładuje się dopiero po kliknięciu przycisku – wcześniej nie łączymy się z zewnętrznymi serwerami. Czcionka jest hostowana lokalnie, bez Google Fonts.',
      ],
      en: [
        'A necessary item (localStorage “linea-cookie-consent”) remembers your cookie choice. Analytics and marketing cookies are used only after you consent in the banner.',
        'The OpenStreetMap map on the contact page loads only after you click the button – we do not connect to external servers before that. The font is self-hosted, without Google Fonts.',
      ],
    },
  },
]

export function PrivacyPage() {
  const { t, l, formatDate } = useI18n()
  return (
    <>
      <Seo title={t.privacy.title} description={t.privacy.description} />
      <PageHeader title={t.privacy.title} crumbs={[{ label: t.nav.privacy }]} />
      <div className="container-x py-12">
        <div className="prose-linea max-w-3xl">
          <p className="text-sm text-muted">
            {t.privacy.updated}: <time dateTime={UPDATED}>{formatDate(UPDATED)}</time>
          </p>
          {SECTIONS.map((s) => (
            <section key={s.h.pl}>
              <h2>{l(s.h)}</h2>
              {l(s.p).map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </section>
          ))}
          <button type="button" className="btn-outline mt-4" onClick={openCookieSettings}>
            {t.cookies.manage}
          </button>
        </div>
      </div>
    </>
  )
}
