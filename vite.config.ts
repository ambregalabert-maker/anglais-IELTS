import { readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Fichiers du dossier public/ à mettre en cache pour le mode hors ligne
const PUBLIC_FILES = ['./', 'index.html', 'manifest.webmanifest', 'favicon.svg', 'icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png']

/** Génère dist/sw.js (le service worker) avec la liste de tous les fichiers du site. */
function serviceWorker(): Plugin {
  return {
    name: 'pepin-service-worker',
    apply: 'build',
    generateBundle(_, bundle) {
      const files = [...new Set([...PUBLIC_FILES, ...Object.keys(bundle).filter((f) => !f.endsWith('.map'))])]
      const source = readFileSync('sw-template.js', 'utf8')
        .replace('__VERSION__', Date.now().toString(36))
        .replace('__FILES__', JSON.stringify(files))
      this.emitFile({ type: 'asset', fileName: 'sw.js', source })
    },
  }
}

// base './' : le site fonctionne dans n'importe quel sous-dossier (GitHub Pages, Netlify, Vercel…)
export default defineConfig({
  base: './',
  plugins: [react(), serviceWorker()],
})
