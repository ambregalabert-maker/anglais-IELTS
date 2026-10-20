import { Suspense, lazy, useEffect } from 'react'
import Celebrations from './components/Celebrations'
import Mascot from './components/Mascot'
import NavBar from './components/NavBar'
import TopBar from './components/TopBar'
import type { LabMode } from './lab/engine'
import LessonPlayer from './lesson/LessonPlayer'
import type { ListeningMode } from './listening/engine'
import Flashcards from './review/Flashcards'
import ReviewSession, { type ReviewMode } from './review/ReviewSession'
import type { Deck } from './review/data'
import type { TryhardModule } from './tryhard/generators'
import { useRoute } from './lib/router'
import { findModule } from './modules/registry'
import { useApplySettings } from './store/hooks'
import { checkStreakOnOpen } from './store/progress'

// Écrans chargés à la demande
const LabSession = lazy(() => import('./lab/LabSession'))
const ListeningSession = lazy(() => import('./listening/ListeningSession'))
const TryhardPage = lazy(() => import('./tryhard/TryhardPage'))
const DrillSession = lazy(() => import('./writing/DrillSession'))
const EssayReport = lazy(() => import('./writing/EssayReport'))
const ExamWriter = lazy(() => import('./writing/ExamWriter'))
const Task2Guided = lazy(() => import('./writing/Task2Guided'))

function Loading() {
  return (
    <div className="loading">
      <Mascot mood="think" size={90} />
    </div>
  )
}

function fullScreenPage(route: string) {
  const lesson = route.match(/^\/lesson\/([\w-]+)\/(\d+|exam)$/)
  if (lesson) return <LessonPlayer unitId={lesson[1]} lesson={lesson[2] === 'exam' ? 'exam' : Number(lesson[2])} />
  const review = route.match(/^\/review\/session\/(due|mistakes|weak)$/)
  if (review) return <ReviewSession mode={review[1] as ReviewMode} />
  const lab = route.match(/^\/lab\/([a-z]+)$/)
  if (lab) return <LabSession mode={lab[1] as LabMode} />
  const guided = route.match(/^\/writing\/guided\/([\w-]+)$/)
  if (guided) return <Task2Guided topicId={guided[1]} />
  const exam = route.match(/^\/writing\/exam\/([12])\/([\w-]+)$/)
  if (exam) return <ExamWriter task={Number(exam[1]) as 1 | 2} id={exam[2]} />
  const essay = route.match(/^\/writing\/essay\/([\w-]+)$/)
  if (essay) return <EssayReport id={essay[1]} />
  if (route === '/writing/task1') return <DrillSession kind="task1" />
  const grammar = route.match(/^\/writing\/grammar\/([\w-]+)$/)
  if (grammar) return <DrillSession kind="grammar" topic={grammar[1]} />
  const listening = route.match(/^\/listening\/([a-z]+)$/)
  if (listening) return <ListeningSession mode={listening[1] as ListeningMode} />
  const tryhard = route.match(/^\/tryhard\/(home|vocab|writing|listening)$/)
  if (tryhard) return <TryhardPage module={tryhard[1] as TryhardModule} />
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
        <Suspense fallback={<Loading />}>
          <div key={route}>{fullScreen}</div>
        </Suspense>
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
          <Suspense fallback={<Loading />}>
            <Page />
          </Suspense>
        </main>
      </div>
      <Celebrations />
    </div>
  )
}
