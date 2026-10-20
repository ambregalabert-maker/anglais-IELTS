// Séances d'exercices du Writing : Task 1 (graphiques) ou grammaire du Booklet 2.

import { useState } from 'react'
import { GRAMMAR } from '../data/writing/grammar'
import { SessionPlayer } from '../lesson/LessonPlayer'
import { getProgress } from '../store/progress'
import { buildGrammar, buildTask1Drills } from './engine'

export default function DrillSession({ kind, topic }: { kind: 'task1' | 'grammar'; topic?: string }) {
  const [difficulty] = useState(() => getProgress().settings.difficulty)
  const [exercises] = useState(() => (kind === 'task1' ? buildTask1Drills() : buildGrammar(topic ?? 'mix')))
  const g = GRAMMAR.find((x) => x.id === topic)
  return (
    <SessionPlayer
      exercises={exercises}
      difficulty={difficulty}
      color="#ff9a4d"
      shade="#d4762a"
      exitPath="/writing"
      onFinish={(accuracy) => ({
        title: kind === 'task1' ? 'Task 1 : entraînement terminé !' : `${g ? g.title : 'Grammaire'} : terminé !`,
        message: accuracy >= 0.9 ? 'Excellent, tu maîtrises le sujet.' : 'Relis le rappel de cours, puis refais une série.',
        bonus: 10 + (accuracy === 1 ? 5 : 0),
      })}
    />
  )
}
