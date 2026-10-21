// Chrono-skimming : 90 secondes pour parcourir un texte, puis on retrouve le sujet de chaque paragraphe sans le texte.

import { useEffect, useMemo, useState } from 'react'
import { PASSAGE_BY_ID } from '../data/reading'
import QuestionSetView from '../practice/QuestionSetView'
import type { QuestionSet } from '../practice/types'
import { navigate } from '../lib/router'
import { shuffle } from '../lib/text'
import { useStudyTimer } from '../lib/useStudyTimer'
import { recordPractice } from '../store/progress'
import { formatClock, useCountdown } from '../lib/useCountdown'

const SKIM_SECONDS = 90

export default function SkimDrill({ id }: { id: string }) {
  const passage = PASSAGE_BY_ID[id]
  const [phase, setPhase] = useState<'read' | 'answer'>('read')
  const [left] = useCountdown(SKIM_SECONDS, phase === 'read')
  useStudyTimer(true)
  useEffect(() => {
    if (left <= 0) setPhase('answer')
  }, [left])

  const set = useMemo<QuestionSet | null>(() => {
    if (!passage) return null
    const order = shuffle(passage.paragraphs)
    const keyOf = (label: string) => String(order.findIndex((p) => p.label === label) + 1)
    return {
      id: 'skim',
      title: 'De quoi parle chaque paragraphe ?',
      type: 'match',
      instruction: 'Sans relire le texte, choisis le sujet de chaque paragraphe.',
      tip: 'Au vrai test, ce premier survol te permet de savoir où chercher chaque réponse.',
      options: order.map((p, i) => ({ key: String(i + 1), text: p.gist })),
      items: passage.paragraphs.map((p) => ({ q: `Paragraph ${p.label}`, answer: keyOf(p.label) })),
    }
  }, [passage])

  if (!passage || !set) return null

  return (
    <div className="lesson reading" style={{ ['--unit' as string]: '#00a8a8' }}>
      <header className="lesson-top">
        <button className="lesson-quit" onClick={() => navigate('/reading')} aria-label="Quitter">
          ✕
        </button>
        <div className="reading-title">
          <b>Chrono-skimming</b>
          <small>{passage.title}</small>
        </div>
        {phase === 'read' && <span className={`reading-clock ${left <= 15 ? 'over' : ''}`}>⏱ {formatClock(left)}</span>}
      </header>
      <main className="lesson-body skim-body">
        {phase === 'read' ? (
          <>
            <p className="qset-tip">💡 Lis seulement le titre, la 1re et la dernière phrase de chaque paragraphe. Le texte disparaîtra à la fin du chrono.</p>
            <article className="reading-text" lang="en">
              <h1>{passage.title}</h1>
              {passage.paragraphs.map((p) => (
                <p key={p.label}>
                  <b className="para-label">{p.label}</b> {p.text}
                </p>
              ))}
            </article>
            <button className="btn btn-primary btn-block" onClick={() => setPhase('answer')}>
              J’ai fini de survoler
            </button>
          </>
        ) : (
          <>
            <QuestionSetView set={set} onChecked={(r) => recordPractice(`skim:${passage.id}`, r.score, r.total, 'reading')} />
            <button className="btn btn-secondary btn-block" onClick={() => navigate(`/reading/text/${passage.id}`)}>
              Faire les questions de ce texte
            </button>
          </>
        )}
      </main>
    </div>
  )
}
