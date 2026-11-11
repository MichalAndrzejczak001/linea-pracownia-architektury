/**
 * Adres pliku z katalogu public/ z uwzględnieniem ścieżki bazowej
 * (np. /linea-pracownia-architektury/ na GitHub Pages, / lokalnie).
 */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '')
