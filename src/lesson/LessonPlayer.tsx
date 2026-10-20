// L'écran d'une leçon : barre de progression, exercices, bandeau de correction, écran de fin.

import { useRef, useState } from 'react'
import { CAST } from '../characters/cast'
import Character from '../characters/Character'
import Mascot from '../components/Mascot'
import { UNITS } from '../data/units'
import { confetti } from '../lib/confetti'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { useStudyTimer } from '../lib/useStudyTimer'
import { toast } from '../store/events'
import type { Difficulty } from '../store/types'
import { addXp, awardBadge, completeLesson, getProgress, logActivity, recordAnswer } from '../store/progress'
import { buildLesson } from './engine'
import type { Exercise } from './types'
import ExerciseStage, { type StageAnswer } from './ExerciseStage'

const XP_PER_ANSWER: Record<Difficulty, number> = { normal: 2, hard: 3, expert: 4 }
const LEVEL_BADGE: Record<Difficulty, string> = { normal: '', hard: '💪', expert: '🧠' }
const COMBO_STEP = 5
const COMBO_BONUS = 3
const MAX_RETRIES = 2

interface Item {
  ex: Exercise
  retry: number
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** Ce qu'affiche l'écran de fin, renvoyé par celui qui lance la séance. */
export interface SessionEnd {
  title: string
  message: string
  bonus: number // XP de fin de séance
  mastered?: boolean
}

interface SessionProps {
  exercises: Exercise[]
  difficulty: Difficulty
  color: string
  shade: string
  exitPath: string // où revenir en quittant
  emptyMessage?: string
  onFinish: (accuracy: number) => SessionEnd
}

/** Une leçon du chemin. */
export default function LessonPlayer({ unitId, lesson }: { unitId: string; lesson: number | 'exam' }) {
  const unit = UNITS.find((u) => u.id === unitId)
  // La difficulté est lue au début de la leçon (la changer en cours de route n'a pas d'effet)
  const [difficulty] = useState(() => getProgress().settings.difficulty)
  const [exercises] = useState(() => buildLesson(unitId, lesson, difficulty))
  const lessonKey = `${unitId}-${lesson === 'exam' ? 'exam' : lesson + 1}`
  const exam = lesson === 'exam'

  return (
    <SessionPlayer
      exercises={unit ? exercises : []}
      difficulty={difficulty}
      color={unit?.color ?? '#6c4cf5'}
      shade={unit?.shade ?? '#4d32c4'}
      exitPath="/"
      emptyMessage="Cette leçon n’existe pas encore."
      onFinish={(accuracy) => {
        const before = getProgress().lessons[lessonKey]
        completeLesson(lessonKey, accuracy)
        logActivity('lesson')
        if (exam) awardBadge('first-unit')
        const pct = Math.round(accuracy * 100)
        return {
          title: exam ? 'Unité validée !' : 'Leçon terminée !',
          message: exam ? `Tu as bouclé « ${unit?.title} ». Bravo !` : pct === 100 ? 'Sans aucune erreur, impressionnant !' : 'Chaque leçon te rapproche du C2.',
          bonus: (exam ? 20 : 10) + (accuracy === 1 ? 5 : 0),
          mastered: !before?.mastered && !!getProgress().lessons[lessonKey]?.mastered,
        }
      }}
    />
  )
}

/** Le lecteur d'exercices, commun aux leçons et aux révisions. */
export function SessionPlayer({ exercises: initial, difficulty, color, shade, exitPath, emptyMessage, onFinish }: SessionProps) {
  const [queue, setQueue] = useState<Item[]>(() => initial.map((ex) => ({ ex, retry: 0 })))
  const [pos, setPos] = useState(0)
  const [resolved, setResolved] = useState(0)
  const [firstTry, setFirstTry] = useState(0)
  const [combo, setCombo] = useState(0)
  const [xp, setXp] = useState(0)
  const [confirmQuit, setConfirmQuit] = useState(false)
  const [finished, setFinished] = useState<null | (SessionEnd & { accuracy: number; seconds: number; xp: number })>(null)
  const start = useRef(Date.now())

  useStudyTimer(!finished)

  const current = queue[pos]
  const total = initial.length

  /** Enregistre la réponse (statistiques, XP, combo) et remet l'exercice raté en fin de file. */
  function answered({ correct, perWord }: StageAnswer) {
    const item = current
    const firstAttempt = item.retry === 0
    const earned = correct && firstAttempt ? XP_PER_ANSWER[difficulty] : 0
    if (perWord) {
      perWord.forEach((w, i) => recordAnswer({ key: `w:${w.id}:match`, wordIds: [w.id], correct: w.correct, xp: i === 0 ? earned : 0 }))
    } else {
      recordAnswer({ key: item.ex.key, wordIds: item.ex.wordIds, correct, xp: earned })
    }
    setXp((x) => x + earned)

    if (correct) {
      const nextCombo = combo + 1
      setCombo(nextCombo)
      if (nextCombo % COMBO_STEP === 0) {
        addXp(COMBO_BONUS)
        setXp((x) => x + COMBO_BONUS)
        toast(`Combo ×${nextCombo} ! +${COMBO_BONUS} XP`, '⚡')
      }
      if (firstAttempt) setFirstTry((n) => n + 1)
      setResolved((n) => n + 1)
    } else {
      setCombo(0)
      // Les paires ne reviennent pas : les mots ratés sont déjà notés pour les révisions
      if (item.ex.kind !== 'match' && item.retry < MAX_RETRIES) setQueue((q) => [...q, { ex: item.ex, retry: item.retry + 1 }])
      else setResolved((n) => n + 1)
    }
  }

  function next() {
    if (pos + 1 < queue.length) {
      setPos(pos + 1)
      return
    }
    const accuracy = total ? firstTry / total : 1
    const end = onFinish(accuracy)
    addXp(end.bonus)
    playSound('complete')
    confetti(140)
    setFinished({ ...end, accuracy, seconds: (Date.now() - start.current) / 1000, xp: xp + end.bonus })
  }

  if (initial.length === 0) {
    return (
      <div className="lesson">
        <div className="lesson-empty">
          <Mascot mood="think" size={110} />
          <p>{emptyMessage ?? 'Rien à faire ici pour le moment.'}</p>
          <button className="btn btn-primary" onClick={() => navigate(exitPath)}>
            Retour
          </button>
        </div>
      </div>
    )
  }

  if (finished) return <SessionEndScreen {...finished} exitPath={exitPath} />

  return (
    <div className="lesson" style={{ ['--unit' as string]: color, ['--unit-shade' as string]: shade }}>
      <header className="lesson-top">
        <button className="lesson-quit" onClick={() => setConfirmQuit(true)} aria-label="Quitter la leçon">
          ✕
        </button>
        <div className="lesson-bar" role="progressbar" aria-valuenow={resolved} aria-valuemax={total}>
          <div className="lesson-bar-fill" style={{ width: `${(resolved / total) * 100}%` }} />
        </div>
        {LEVEL_BADGE[difficulty] && (
          <span className="hard-badge" title={difficulty === 'expert' ? 'Mode expert' : 'Mode difficile'}>
            {LEVEL_BADGE[difficulty]}
          </span>
        )}
        {combo >= 3 && <span className="combo">🔥 {combo}</span>}
      </header>

      <ExerciseStage key={pos} ex={current.ex} retry={current.retry > 0} paused={confirmQuit} onAnswer={answered} onContinue={next} />

      {confirmQuit && <QuitModal exitPath={exitPath} onStay={() => setConfirmQuit(false)} />}
    </div>
  )
}

export function QuitModal({ exitPath, onStay, message }: { exitPath: string; onStay: () => void; message?: string }) {
  return (
    <div className="modal-backdrop" onClick={onStay}>
      <div className="modal pop-in" onClick={(e) => e.stopPropagation()}>
        <Mascot mood="sad" size={100} />
        <h3>Tu pars déjà ?</h3>
        <p className="muted">{message ?? 'Ta progression dans cette séance sera perdue (l’XP déjà gagnée et tes réponses sont gardées).'}</p>
        <button className="btn btn-primary btn-block" onClick={onStay}>
          Continuer
        </button>
        <button className="btn btn-secondary btn-block" onClick={() => navigate(exitPath)}>
          Quitter
        </button>
      </div>
    </div>
  )
}

export function SessionEndScreen({ title, message, accuracy, seconds, xp, mastered, exitPath }: SessionEnd & { accuracy: number; seconds: number; xp: number; exitPath: string }) {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  const pct = Math.round(accuracy * 100)
  // Un copain différent vient danser avec Pépin à chaque fin de leçon
  const [friend] = useState(() => pick(CAST.filter((c) => c.id !== 'pepin')).id)
  return (
    <div className="lesson lesson-end">
      <div className="end-cast">
        <Mascot mood="dance" size={140} />
        <Character id={friend} mood="dance" size={110} />
      </div>
      <h1>{title}</h1>
      <p className="muted">{message}</p>
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
      <button className="btn btn-primary btn-block end-btn" onClick={() => navigate(exitPath)}>
        Continuer
      </button>
    </div>
  )
}
