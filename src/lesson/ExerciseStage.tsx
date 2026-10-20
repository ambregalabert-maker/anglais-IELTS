// Un exercice à l'écran : consigne, personnage, graphique éventuel, réponse, puis bandeau vert / rouge.
// Commun aux leçons, révisions, Lab, Writing, Listening et au mode Tryhard.

import { useEffect, useState } from 'react'
import Chart from '../components/Chart'
import Mascot, { type MascotMood } from '../components/Mascot'
import { chartById } from '../data/writing/task1'
import { playSound } from '../lib/sound'
import type { Exercise } from './types'
import { ChoiceView, FreeView, JudgeView, MatchView, ReorderView, SpeakButton, TypeView, type Pending } from './views'

const PRAISE = ['Excellent !', 'Bravo !', 'Parfait !', 'Bien joué !', 'Super !', 'Génial !']
const COMFORT = ['Pas tout à fait…', 'Presque !', 'On y retourne !', 'Ça viendra !']

export interface StageAnswer {
  correct: boolean
  typo?: boolean
  perWord?: { id: string; correct: boolean }[] // exercice de paires : résultat mot par mot
}

interface Props {
  ex: Exercise
  retry?: boolean // l'exercice revient après une erreur
  paused?: boolean // une fenêtre est ouverte : on ignore la touche Entrée
  onAnswer: (a: StageAnswer) => void // appelé une fois la réponse vérifiée
  onContinue: () => void
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function hasSpeaker(ex: Exercise): boolean {
  return ex.kind === 'judge' || (ex.kind === 'choice' && !!ex.speakPrompt)
}

function answerText(ex: Exercise): string {
  switch (ex.kind) {
    case 'choice':
    case 'type':
    case 'reorder':
      return ex.answer
    case 'judge':
      return ex.ok ? 'La phrase est correcte.' : (ex.fix ?? 'La phrase est incorrecte.')
    case 'match':
    case 'free':
      return ''
  }
}

function isEnglishAnswer(ex: Exercise): boolean {
  if (ex.kind === 'reorder' || ex.kind === 'type') return true
  if (ex.kind === 'judge') return !ex.ok && !!ex.fix
  // Les QCM dont la question est en anglais ont une réponse en français, et inversement
  if (ex.kind === 'choice') return !ex.speakPrompt
  return false
}

interface Feedback {
  correct: boolean
  typo?: boolean
  title: string
  details?: string[]
}

export default function ExerciseStage({ ex, retry, paused, onAnswer, onContinue }: Props) {
  const [pending, setPending] = useState<Pending | null>(null)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [mood, setMood] = useState<MascotMood>('idle')

  function settle(a: StageAnswer, details?: string[]) {
    playSound(a.correct ? 'correct' : 'wrong')
    setMood(a.correct ? 'happy' : 'sad')
    setFeedback({ correct: a.correct, typo: a.typo, details, title: a.correct ? (a.typo ? 'Presque parfait !' : pick(PRAISE)) : pick(COMFORT) })
    onAnswer(a)
  }

  function check() {
    if (!pending || feedback) return
    settle({ correct: pending.correct, typo: pending.typo }, pending.details)
  }

  // Entrée = Vérifier / Continuer (sauf dans une zone de texte longue)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || paused || e.target instanceof HTMLTextAreaElement) return
      e.preventDefault()
      if (feedback) onContinue()
      else check()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const answer = answerText(ex)
  const chart = ex.chartId ? chartById(ex.chartId) : undefined

  return (
    <>
      <main className="lesson-body">
        {retry && <span className="retry-tag">↻ Erreur précédente</span>}
        <div className="lesson-head">
          {/* Quand un personnage parle dans l'exercice, Pépin laisse la place */}
          {!hasSpeaker(ex) && <Mascot mood={mood} size={64} />}
          <h2>{ex.instruction}</h2>
        </div>
        {chart && <Chart chart={chart} />}
        {ex.kind === 'choice' && <ChoiceView ex={ex} locked={!!feedback} onPending={setPending} />}
        {ex.kind === 'type' && <TypeView ex={ex} locked={!!feedback} onPending={setPending} />}
        {ex.kind === 'judge' && <JudgeView ex={ex} locked={!!feedback} onPending={setPending} />}
        {ex.kind === 'reorder' && <ReorderView ex={ex} locked={!!feedback} onPending={setPending} />}
        {ex.kind === 'free' && <FreeView ex={ex} locked={!!feedback} onPending={setPending} />}
        {ex.kind === 'match' && (
          <MatchView
            ex={ex}
            onComplete={({ wrongIds }) => settle({ correct: wrongIds.length === 0, perWord: ex.pairs.map((p) => ({ id: p.id, correct: !wrongIds.includes(p.id) })) })}
          />
        )}
      </main>

      <footer className={`lesson-foot ${feedback ? (feedback.correct ? 'ok' : 'ko') : ''}`}>
        <div className="lesson-foot-inner">
          {feedback && (
            <div className="feedback">
              <div className="feedback-title">
                <span className="feedback-icon">{feedback.correct ? '✓' : '✕'}</span>
                <b>{feedback.title}</b>
              </div>
              {!feedback.correct && answer && (
                <p className="feedback-answer">
                  <span>Bonne réponse :</span> <b>{answer}</b> {isEnglishAnswer(ex) && <SpeakButton text={answer} small />}
                </p>
              )}
              {feedback.typo && ex.kind === 'type' && (
                <p className="feedback-answer">
                  <span>Attention à l’orthographe :</span> <b>{ex.answer}</b>
                </p>
              )}
              {feedback.details && feedback.details.length > 0 && (
                <ul className="feedback-details">
                  {feedback.details.slice(0, 4).map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
              {!feedback.correct && ex.explanation && <p className="feedback-why">{ex.explanation}</p>}
              {ex.kind === 'free' && ex.sample && (
                <p className="feedback-why" lang="en">
                  Exemple : <i>{ex.sample}</i>
                </p>
              )}
              {feedback.correct && ex.kind === 'judge' && !ex.ok && ex.fix && (
                <p className="feedback-why">
                  Correction : <b>{ex.fix}</b>
                </p>
              )}
            </div>
          )}
          {ex.kind !== 'match' || feedback ? (
            <button
              className={`btn btn-block ${feedback ? (feedback.correct ? 'btn-success' : 'btn-danger') : 'btn-success'}`}
              disabled={!feedback && !pending}
              onClick={feedback ? onContinue : check}
            >
              {feedback ? 'Continuer' : 'Vérifier'}
            </button>
          ) : (
            <p className="match-help">Touche un mot, puis sa traduction.</p>
          )}
        </div>
      </footer>
    </>
  )
}
