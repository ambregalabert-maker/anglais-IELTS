// L'écran d'une leçon : barre de progression, exercices, bandeau de correction, écran de fin.

import { useEffect, useMemo, useRef, useState } from 'react'
import Mascot, { type MascotMood } from '../components/Mascot'
import { UNITS } from '../data/units'
import { confetti } from '../lib/confetti'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { useStudyTimer } from '../lib/useStudyTimer'
import { toast } from '../store/events'
import { addXp, awardBadge, completeLesson, getProgress, recordAnswer } from '../store/progress'
import { buildLesson } from './engine'
import type { Exercise } from './types'
import { ChoiceView, JudgeView, MatchView, ReorderView, SpeakButton, TypeView, type Pending } from './views'

const XP_PER_ANSWER = 2
const COMBO_STEP = 5
const COMBO_BONUS = 3
const MAX_RETRIES = 2

const PRAISE = ['Excellent !', 'Bravo !', 'Parfait !', 'Bien joué !', 'Super !', 'Génial !']
const COMFORT = ['Pas tout à fait…', 'Presque !', 'On y retourne !', 'Ça viendra !']

interface Feedback {
  correct: boolean
  typo?: boolean
  title: string
}

interface Item {
  ex: Exercise
  retry: number
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
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

export default function LessonPlayer({ unitId, lesson }: { unitId: string; lesson: number | 'exam' }) {
  const unit = UNITS.find((u) => u.id === unitId)
  const initial = useMemo(() => buildLesson(unitId, lesson), [unitId, lesson])
  const lessonKey = `${unitId}-${lesson === 'exam' ? 'exam' : lesson + 1}`

  const [queue, setQueue] = useState<Item[]>(() => initial.map((ex) => ({ ex, retry: 0 })))
  const [pos, setPos] = useState(0)
  const [pending, setPending] = useState<Pending | null>(null)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [resolved, setResolved] = useState(0)
  const [firstTry, setFirstTry] = useState(0)
  const [combo, setCombo] = useState(0)
  const [xp, setXp] = useState(0)
  const [mood, setMood] = useState<MascotMood>('idle')
  const [confirmQuit, setConfirmQuit] = useState(false)
  const [finished, setFinished] = useState<null | { accuracy: number; seconds: number; xp: number; mastered: boolean }>(null)
  const start = useRef(Date.now())

  useStudyTimer(!finished)

  const current = queue[pos]
  const total = initial.length

  function gainXp(amount: number) {
    setXp((x) => x + amount)
  }

  /** Enregistre la réponse et affiche le bandeau vert ou rouge. */
  function settle(correct: boolean, opts: { typo?: boolean; wordIds?: string[]; perWord?: { id: string; correct: boolean }[] } = {}) {
    const item = current
    const firstAttempt = item.retry === 0
    const earned = correct && firstAttempt ? XP_PER_ANSWER : 0
    if (opts.perWord) {
      opts.perWord.forEach((w, i) => recordAnswer({ key: `w:${w.id}:match`, wordIds: [w.id], correct: w.correct, xp: i === 0 ? earned : 0 }))
    } else {
      recordAnswer({ key: item.ex.key, wordIds: item.ex.wordIds, correct, xp: earned })
    }
    gainXp(earned)

    if (correct) {
      playSound('correct')
      setMood('happy')
      const nextCombo = combo + 1
      setCombo(nextCombo)
      if (nextCombo % COMBO_STEP === 0) {
        addXp(COMBO_BONUS)
        gainXp(COMBO_BONUS)
        toast(`Combo ×${nextCombo} ! +${COMBO_BONUS} XP`, '⚡')
      }
      if (firstAttempt) setFirstTry((n) => n + 1)
      setResolved((n) => n + 1)
    } else {
      playSound('wrong')
      setMood('sad')
      setCombo(0)
      // Les paires ne reviennent pas : les mots ratés sont déjà notés pour les révisions
      if (item.ex.kind !== 'match' && item.retry < MAX_RETRIES) {
        // L'exercice raté revient à la fin de la leçon
        setQueue((q) => [...q, { ex: item.ex, retry: item.retry + 1 }])
      } else {
        setResolved((n) => n + 1)
      }
    }
    setFeedback({ correct, typo: opts.typo, title: correct ? (opts.typo ? 'Presque parfait !' : pick(PRAISE)) : pick(COMFORT) })
  }

  function check() {
    if (!pending || feedback) return
    settle(pending.correct, { typo: pending.typo })
  }

  function next() {
    setFeedback(null)
    setPending(null)
    setMood('idle')
    if (pos + 1 < queue.length) {
      setPos(pos + 1)
      return
    }
    finish()
  }

  function finish() {
    const accuracy = total ? firstTry / total : 1
    const before = getProgress().lessons[lessonKey]
    const bonus = (lesson === 'exam' ? 20 : 10) + (accuracy === 1 ? 5 : 0)
    addXp(bonus)
    completeLesson(lessonKey, accuracy)
    if (lesson === 'exam') awardBadge('first-unit')
    const mastered = !before?.mastered && !!getProgress().lessons[lessonKey]?.mastered
    playSound('complete')
    confetti(140)
    setFinished({ accuracy, seconds: (Date.now() - start.current) / 1000, xp: xp + bonus, mastered })
  }

  // Entrée = Vérifier / Continuer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || finished || confirmQuit) return
      e.preventDefault()
      if (feedback) next()
      else check()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!unit || initial.length === 0) {
    return (
      <div className="lesson">
        <div className="lesson-empty">
          <Mascot mood="think" size={110} />
          <p>Cette leçon n’existe pas encore.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Retour au chemin
          </button>
        </div>
      </div>
    )
  }

  if (finished) return <LessonEnd unitTitle={unit.title} exam={lesson === 'exam'} {...finished} />

  const ex = current.ex
  const answer = answerText(ex)

  return (
    <div className="lesson" style={{ ['--unit' as string]: unit.color, ['--unit-shade' as string]: unit.shade }}>
      <header className="lesson-top">
        <button className="lesson-quit" onClick={() => setConfirmQuit(true)} aria-label="Quitter la leçon">
          ✕
        </button>
        <div className="lesson-bar" role="progressbar" aria-valuenow={resolved} aria-valuemax={total}>
          <div className="lesson-bar-fill" style={{ width: `${(resolved / total) * 100}%` }} />
        </div>
        {combo >= 3 && <span className="combo">🔥 {combo}</span>}
      </header>

      <main className="lesson-body" key={pos}>
        {current.retry > 0 && <span className="retry-tag">↻ Erreur précédente</span>}
        <div className="lesson-head">
          <Mascot mood={mood} size={64} />
          <h2>{ex.instruction}</h2>
        </div>
        {ex.kind === 'choice' && <ChoiceView ex={ex} locked={!!feedback} onPending={setPending} />}
        {ex.kind === 'type' && <TypeView ex={ex} locked={!!feedback} onPending={setPending} />}
        {ex.kind === 'judge' && <JudgeView ex={ex} locked={!!feedback} onPending={setPending} />}
        {ex.kind === 'reorder' && <ReorderView ex={ex} locked={!!feedback} onPending={setPending} />}
        {ex.kind === 'match' && (
          <MatchView
            ex={ex}
            onComplete={({ wrongIds }) =>
              settle(wrongIds.length === 0, { perWord: ex.pairs.map((p) => ({ id: p.id, correct: !wrongIds.includes(p.id) })) })
            }
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
              {!feedback.correct && ex.kind !== 'match' && (
                <p className="feedback-answer">
                  <span>Bonne réponse :</span> <b>{answer}</b> {isEnglishAnswer(ex) && <SpeakButton text={answer} small />}
                </p>
              )}
              {feedback.typo && ex.kind === 'type' && (
                <p className="feedback-answer">
                  <span>Attention à l’orthographe :</span> <b>{ex.answer}</b>
                </p>
              )}
              {!feedback.correct && ex.explanation && <p className="feedback-why">{ex.explanation}</p>}
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
              onClick={feedback ? next : check}
            >
              {feedback ? 'Continuer' : 'Vérifier'}
            </button>
          ) : (
            <p className="match-help">Touche un mot, puis sa traduction.</p>
          )}
        </div>
      </footer>

      {confirmQuit && (
        <div className="modal-backdrop" onClick={() => setConfirmQuit(false)}>
          <div className="modal pop-in" onClick={(e) => e.stopPropagation()}>
            <Mascot mood="sad" size={100} />
            <h3>Tu pars déjà ?</h3>
            <p className="muted">Ta progression dans cette leçon sera perdue (l’XP déjà gagnée est gardée).</p>
            <button className="btn btn-primary btn-block" onClick={() => setConfirmQuit(false)}>
              Continuer la leçon
            </button>
            <button className="btn btn-secondary btn-block" onClick={() => navigate('/')}>
              Quitter
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function LessonEnd({ unitTitle, exam, accuracy, seconds, xp, mastered }: { unitTitle: string; exam: boolean; accuracy: number; seconds: number; xp: number; mastered: boolean }) {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  const pct = Math.round(accuracy * 100)
  return (
    <div className="lesson lesson-end">
      <Mascot mood="dance" size={150} />
      <h1>{exam ? 'Unité validée !' : 'Leçon terminée !'}</h1>
      <p className="muted">{exam ? `Tu as bouclé « ${unitTitle} ». Bravo !` : pct === 100 ? 'Sans aucune erreur, impressionnant !' : 'Chaque leçon te rapproche du 7.'}</p>
      {mastered && <p className="mastered-msg">👑 Leçon maîtrisée !</p>}
      <div className="end-stats">
        <div className="end-stat xp">
          <small>XP gagnée</small>
          <b>⚡ {xp}</b>
        </div>
        <div className="end-stat acc">
          <small>Précision</small>
          <b>🎯 {pct}%</b>
        </div>
        <div className="end-stat time">
          <small>Temps</small>
          <b>
            ⏱️ {m}:{String(s).padStart(2, '0')}
          </b>
        </div>
      </div>
      <button className="btn btn-primary btn-block end-btn" onClick={() => navigate('/')}>
        Continuer
      </button>
    </div>
  )
}
