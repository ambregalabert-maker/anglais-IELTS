import { useEffect } from 'react'
import Celebrations from './components/Celebrations'
import NavBar from './components/NavBar'
import TopBar from './components/TopBar'
import LessonPlayer from './lesson/LessonPlayer'
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

  // Pendant une leçon : plein écran, sans navigation (comme dans les applis de langues)
  const lessonMatch = route.match(/^\/lesson\/([\w-]+)\/(\d+|exam)$/)
  if (lessonMatch) {
    const [, unitId, n] = lessonMatch
    return (
      <>
        <LessonPlayer key={route} unitId={unitId} lesson={n === 'exam' ? 'exam' : Number(n)} />
        <Celebrations />
      </>
    )
  }

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
