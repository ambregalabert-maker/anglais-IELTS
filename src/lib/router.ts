// Navigation par « hash » (#/writing…) : marche partout, même hébergé sur GitHub Pages, sans serveur.

import { useSyncExternalStore } from 'react'

function current(): string {
  const h = window.location.hash.replace(/^#/, '')
  return h.startsWith('/') ? h : '/'
}

export function useRoute(): string {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener('hashchange', cb)
      return () => window.removeEventListener('hashchange', cb)
    },
    current,
  )
}

export function navigate(path: string) {
  window.location.hash = path
}
