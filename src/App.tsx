import { useEffect } from 'react'
import Celebrations from './components/Celebrations'
import NavBar from './components/NavBar'
import TopBar from './components/TopBar'
import LabSession from './lab/LabSession'
import type { LabMode } from './lab/engine'
import LessonPlayer from './lesson/LessonPlayer'
import Flashcards from './review/Flashcards'
import ReviewSession, { type ReviewMode } from './review/ReviewSession'
import type { Deck } from './review/data'
import { useRoute } from './lib/router'
import { findModule } from './modules/registry'
import { useApplySettings } from './store/hooks'
import { checkStreakOnOpen } from './store/progress'

function fullScreenPage(route: string) {
  const lesson = route.match(/^\/lesson\/([\w-]+)\/(\d+|exam)$/)
  if (lesson) return <LessonPlayer unitId={lesson[1]} lesson={lesson[2] === 'exam' ? 'exam' : Number(lesson[2])} />
  const review = route.match(/^\/review\/session\/(due|mistakes|weak)$/)
  if (review) return <ReviewSession mode={review[1] as ReviewMode} />
  const lab = route.match(/^\/lab\/([a-z]+)$/)
  if (lab) return <LabSession mode={lab[1] as LabMode} />
  const cards = route.match(/^\/review\/cards\/(.+)$/)
  if (cards) return <Flashcards deck={cards[1] as Deck} />
  return null
}

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

  // Pendant une leçon ou une révision : plein écran, sans navigation (comme dans les applis de langues)
  const fullScreen = fullScreenPage(route)
  if (fullScreen) {
    return (
      <>
        <div key={route}>{fullScreen}</div>
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
