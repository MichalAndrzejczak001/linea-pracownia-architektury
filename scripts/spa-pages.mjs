// GitHub Pages nie zna tras aplikacji SPA: bez tego skryptu wejście wprost na /pl/uslugi
// wyświetla stronę przez 404.html, ale z kodem HTTP 404. Skrypt zapisuje kopię index.html
// pod adresem każdej podstrony z sitemap.xml (np. dist/pl/uslugi.html), więc serwer zwraca 200.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const dist = 'dist'
const index = join(dist, 'index.html')
const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8')
const paths = [...new Set([...sitemap.matchAll(/<loc>https?:\/\/[^/<]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]))]

for (const path of paths) {
  const file = join(dist, `${path.replace(/^\/|\/$/g, '')}.html`)
  mkdirSync(dirname(file), { recursive: true })
  copyFileSync(index, file)
}
// Nieznane adresy nadal trafiają do aplikacji, która pokazuje własną stronę 404.
copyFileSync(index, join(dist, '404.html'))
console.log(`Zapisano ${paths.length} stron HTML z trasami aplikacji + 404.html`)
