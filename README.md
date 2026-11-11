# LINEA Pracownia Architektury – wizytówka www

Strona-wizytówka fikcyjnego biura architektonicznego z Łodzi, przygotowana jako **Zadanie 2** z przedmiotu
*Marketing internetowy* (Politechnika Łódzka, 2026/2027). Projekt uwzględnia wnioski z analizy witryn z Zadania 1.

**Wersja online:** https://michalandrzejczak001.github.io/linea-pracownia-architektury/

## Technologie

- **React 19** + **TypeScript** (tryb `strict`) – aplikacja SPA
- **Vite** – serwer deweloperski i budowanie wersji produkcyjnej
- **React Router 7** – routing z lokalizowanymi adresami (`/pl/oferta` ↔ `/en/services`)
- **Tailwind CSS 4** – style; jedna rodzina kroju pisma (Manrope, hostowana lokalnie)
- **lucide-react** – ikony
- Bez backendu – dane (projekty, aktualności, zespół) w plikach TypeScript w `src/data`

## Uruchomienie

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # wersja produkcyjna w katalogu dist/
npm run preview   # podgląd wersji produkcyjnej
npm run lint      # ESLint
```

Publikacja: każdy push na gałąź `main` buduje i publikuje stronę na GitHub Pages (`.github/workflows/deploy.yml`).

## Struktura

```
src/
  i18n/        słowniki PL/EN (typ Dictionary wymusza kompletność tłumaczeń), routing językowy
  data/        treści: firma, usługi i cennik, projekty, aktualności, zespół, opinie, FAQ
  components/  nagłówek z menu rozwijanym, stopka, baner cookies, kalkulator, galeria, wyszukiwarka, suwak szkic/realizacja…
  pages/       podstrony: Start, Usługi (+ 8 podstron usług), Realizacje (+ szczegóły), Pracownia,
               Zespół (+ profile), Opinie, Kariera, Aktualności (+ wpisy), Poradnik, FAQ,
               Kontakt (brief), Polityka prywatności, Deklaracja dostępności, 404 – razem 43 adresy w każdym języku
  lib/         walidacja formularzy, logika kalkulatora wyceny, wyszukiwarka
public/
  images/      zdjęcia WebP (źródła w CREDITS.md)
  files/       poradnik PDF (PL i EN)
  video/       film z realizacjami (MP4, wygenerowany ffmpeg ze zdjęć) i napisy WebVTT PL/EN
```

Formularze działają w trybie demonstracyjnym (walidacja i komunikat sukcesu, bez wysyłki na serwer).

> LINEA to firma fikcyjna. Zdjęcia: Unsplash (patrz `CREDITS.md`).
