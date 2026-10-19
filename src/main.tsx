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
