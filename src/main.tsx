import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/nunito'
import './styles/global.css'
import './styles/mascot.css'
import './styles/lesson.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Mode hors ligne et installation sur le téléphone (seulement sur le site publié)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      /* hébergement qui n'autorise pas les service workers : le site marche quand même, en ligne */
    })
  })
}
