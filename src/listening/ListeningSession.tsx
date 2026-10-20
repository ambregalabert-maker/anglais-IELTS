// Une séance du module Listening (stratégies et dictées).

import { useState } from 'react'
import { SessionPlayer } from '../lesson/LessonPlayer'
import { getProgress } from '../store/progress'
import { LISTENING_MODES, buildListening, type ListeningMode } from './engine'

export default function ListeningSession({ mode }: { mode: ListeningMode }) {
  const info = LISTENING_MODES.find((m) => m.id === mode) ?? LISTENING_MODES[LISTENING_MODES.length - 1]
  const [difficulty] = useState(() => getProgress().settings.difficulty)
  const [exercises] = useState(() => buildListening(info.id))
  return (
    <SessionPlayer
      exercises={exercises}
      difficulty={difficulty}
      color={info.color}
      shade={info.color}
      exitPath="/listening"
      onFinish={(accuracy) => ({
        title: `${info.icon} ${info.title} : terminé !`,
        message: accuracy >= 0.8 ? 'Tu es prête pour un vrai test : va t’entraîner avec de vrais audios !' : 'Relis la fiche de conseils, puis recommence.',
        bonus: 10 + (accuracy === 1 ? 5 : 0),
      })}
    />
  )
}
