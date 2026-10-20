// Service worker de Pépin IELTS : rend le site utilisable hors ligne.
// Ce fichier est un modèle : vite.config.ts le recopie dans dist/sw.js avec la liste des fichiers du site.

const CACHE = 'pepin-__VERSION__'
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
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('pepin-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return

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
