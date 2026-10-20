// Une séance du Vocab Lab (12 exercices du mode choisi).

import { useState } from 'react'
import { SessionPlayer } from '../lesson/LessonPlayer'
import { getProgress } from '../store/progress'
import { LAB_MODES, buildLab, type LabMode } from './engine'

export default function LabSession({ mode }: { mode: LabMode }) {
  const info = LAB_MODES.find((m) => m.id === mode) ?? LAB_MODES[LAB_MODES.length - 1]
  const [difficulty] = useState(() => getProgress().settings.difficulty)
  const [exercises] = useState(() => buildLab(info.id, difficulty))
  return (
    <SessionPlayer
      exercises={exercises}
      difficulty={difficulty}
      color={info.color}
      shade={info.color}
      exitPath="/vocab"
      onFinish={(accuracy) => ({
        title: `${info.icon} ${info.title} : terminé !`,
        message: accuracy >= 0.9 ? 'Niveau C2 en vue. Impressionnant !' : 'Les exercices ratés t’attendent dans « Mes erreurs ».',
        bonus: 10 + (accuracy === 1 ? 5 : 0),
      })}
    />
  )
}
