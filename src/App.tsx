import { useEffect } from 'react'
import Celebrations from './components/Celebrations'
import NavBar from './components/NavBar'
import TopBar from './components/TopBar'
import { useRoute } from './lib/router'
import { findModule } from './modules/registry'
import { useApplySettings } from './store/hooks'
import { checkStreakOnOpen } from './store/progress'

export default function App() {
  const route = useRoute()
  const mod = findModule(route)
  const Page = mod.page
  useApplySettings()

  useEffect(() => {
    checkStreakOnOpen()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [mod.id])

  return (
    <div className="app">
      <NavBar active={mod} />
      <div className="main">
        <TopBar />
        <main key={mod.id} className="fade-in">
          <Page />
        </main>
      </div>
      <Celebrations />
    </div>
  )
}
