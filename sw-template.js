// Service worker de Pépin IELTS : rend le site utilisable hors ligne.
// Ce fichier est un modèle : vite.config.ts le recopie dans dist/sw.js avec la liste des fichiers du site.

const CACHE = 'pepin-__VERSION__'
// Les enregistrements audio ne changent jamais (nom = empreinte du texte) : ils sont gardés d'une version à l'autre
const AUDIO_CACHE = 'pepin-audio'
const FILES = __FILES__

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => Promise.allSettled(FILES.map((f) => cache.add(new URL(f, self.registration.scope).href))))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  // On supprime les anciennes versions du cache
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('pepin-') && k !== CACHE && k !== AUDIO_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return

  // Voix enregistrées
  const path = new URL(req.url).pathname
  if (path.includes('/audio/')) {
    // L'index des enregistrements : le réseau d'abord (il change quand on ajoute des phrases)
    if (path.endsWith('index.json')) {
      event.respondWith(
        fetch(req)
          .then((res) => {
            const copy = res.clone()
            if (res.ok) caches.open(AUDIO_CACHE).then((c) => c.put(req.url, copy))
            return res
          })
          .catch(() => caches.match(req.url)),
      )
      return
    }
    event.respondWith(audioResponse(req))
    return
  }

  // Pages : le réseau d'abord (pour avoir la dernière version), le cache si on est hors ligne
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put(new URL('index.html', self.registration.scope).href, copy))
          return res
        })
        .catch(() => caches.match(new URL('index.html', self.registration.scope).href)),
    )
    return
  }

  // Fichiers (JS, CSS, polices, images) : le cache d'abord, ils ne changent jamais (noms uniques)
  event.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put(req, copy))
          }
          return res
        }),
    ),
  )
})

/** Un fichier audio depuis le cache (téléchargé une seule fois). Safari demande des morceaux (« Range ») : on les découpe. */
async function audioResponse(req) {
  const cache = await caches.open(AUDIO_CACHE)
  let res = await cache.match(req.url)
  if (!res) {
    try {
      res = await fetch(req.url)
    } catch {
      return Response.error()
    }
    if (!res.ok) return res
    await cache.put(req.url, res.clone())
  }
  const range = req.headers.get('range')
  if (!range) return res
  const buf = await res.arrayBuffer()
  const m = /bytes=(\d*)-(\d*)/.exec(range)
  const start = m && m[1] ? Number(m[1]) : 0
  const end = m && m[2] ? Math.min(Number(m[2]), buf.byteLength - 1) : buf.byteLength - 1
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Range': `bytes ${start}-${end}/${buf.byteLength}`,
      'Content-Length': String(end - start + 1),
      'Accept-Ranges': 'bytes',
    },
  })
}
