// Séances de révision : mots à revoir (répétition espacée), « Mes erreurs », ou mots difficiles.

import { useState } from 'react'
import { SessionPlayer } from '../lesson/LessonPlayer'
import { exerciseFromKey, reviewExercise } from '../lesson/engine'
import type { Exercise } from '../lesson/types'
import { shuffle } from '../lib/text'
import { completeReview, getProgress, resolveMistake } from '../store/progress'
import { SESSION_SIZE, dueWords, openMistakes, weakWords } from './data'

export type ReviewMode = 'due' | 'mistakes' | 'weak'

function build(mode: ReviewMode): Exercise[] {
  const p = getProgress()
  const level = p.settings.difficulty
  if (mode === 'mistakes') {
    const out: Exercise[] = []
    for (const key of openMistakes(p)) {
      if (out.length >= SESSION_SIZE) break
      const ex = exerciseFromKey(key, level)
      if (ex) out.push({ ...ex, key })
      else resolveMistake(key)
    }
    return shuffle(out)
  }
  const words = (mode === 'due' ? dueWords(p) : weakWords(p)).slice(0, SESSION_SIZE)
  return shuffle(words.map((w) => reviewExercise(w, p.words[w.id]?.box ?? 0, level)))
}

const TEXTS: Record<ReviewMode, { title: string; empty: string }> = {
  due: { title: 'Révision terminée !', empty: 'Aucun mot à revoir aujourd’hui. Reviens demain !' },
  mistakes: { title: 'Erreurs corrigées !', empty: 'Aucune erreur à corriger. Bravo !' },
  weak: { title: 'Révision terminée !', empty: 'Fais d’abord quelques leçons pour avoir des mots à réviser.' },
}

export default function ReviewSession({ mode }: { mode: ReviewMode }) {
  const [difficulty] = useState(() => getProgress().settings.difficulty)
  const [exercises] = useState(() => build(mode))
  return (
    <SessionPlayer
      exercises={exercises}
      difficulty={difficulty}
      color="#ff5d8f"
      shade="#cf3a6a"
      exitPath="/review"
      emptyMessage={TEXTS[mode].empty}
      onFinish={(accuracy) => {
        completeReview()
        const left = mode === 'mistakes' ? openMistakes(getProgress()).length : 0
        return {
          title: TEXTS[mode].title,
          message:
            mode === 'mistakes'
              ? left
                ? `Encore ${left} erreur${left > 1 ? 's' : ''} à retravailler.`
                : 'Plus aucune erreur en attente. Impeccable !'
              : `${exercises.length} mots revus. Ceux que tu connais reviendront de plus en plus tard.`,
          bonus: 10 + (accuracy === 1 ? 5 : 0),
        }
      }}
    />
  )
}
