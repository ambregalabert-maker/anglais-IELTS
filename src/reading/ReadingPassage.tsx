// Un texte d'entraînement en conditions d'examen : le texte, les questions et un chrono.
// Sur téléphone, on passe du texte aux questions avec deux onglets ; sur ordinateur, ils sont côte à côte.

import { useState } from 'react'
import Character from '../characters/Character'
import { PASSAGE_BY_ID, passageWords } from '../data/reading'
import QuestionSetView from '../practice/QuestionSetView'
import { navigate } from '../lib/router'
import { formatClock, useCountdown } from '../lib/useCountdown'
import { useStudyTimer } from '../lib/useStudyTimer'
import { recordPractice } from '../store/progress'

export default function ReadingPassage({ id }: { id: string }) {
  const passage = PASSAGE_BY_ID[id]
  const [tab, setTab] = useState<'text' | 'questions'>('text')
  const [paused, setPaused] = useState(false)
  const [results, setResults] = useState<Record<string, { score: number; total: number }>>({})
  const done = passage ? Object.keys(results).length === passage.sets.length : false
  const [left] = useCountdown((passage?.minutes ?? 20) * 60, !paused && !done)
  useStudyTimer(!done)

  if (!passage) {
    return (
      <div className="lesson">
        <div className="lesson-empty">
          <Character id="nimbus" mood="think" size={110} />
          <p>Ce texte n’existe pas.</p>
          <button className="btn btn-primary" onClick={() => navigate('/reading')}>
            Retour
          </button>
        </div>
      </div>
    )
  }

  const total = passage.sets.reduce((n, s) => n + s.items.length, 0)
  const score = Object.values(results).reduce((n, r) => n + r.score, 0)
  let number = 1

  return (
    <div className="lesson reading" style={{ ['--unit' as string]: '#00a8a8' }}>
      <header className="lesson-top">
        <button className="lesson-quit" onClick={() => navigate('/reading')} aria-label="Quitter">
          ✕
        </button>
        <div className="reading-title">
          <b>{passage.title}</b>
          <small>
            {passageWords(passage)} mots · {total} questions · conseillé {passage.minutes} min
          </small>
        </div>
        <button className={`reading-clock ${left < 0 ? 'over' : ''}`} onClick={() => setPaused((p) => !p)} title={paused ? 'Reprendre' : 'Mettre en pause'}>
          {paused ? '▶' : '⏱'} {formatClock(left)}
        </button>
      </header>

      <div className="reading-tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'text'} className={tab === 'text' ? 'on' : ''} onClick={() => setTab('text')}>
          📄 Texte
        </button>
        <button role="tab" aria-selected={tab === 'questions'} className={tab === 'questions' ? 'on' : ''} onClick={() => setTab('questions')}>
          ✏️ Questions ({Object.keys(results).length}/{passage.sets.length})
        </button>
      </div>

      <main className={`reading-body show-${tab}`}>
        <article className="reading-text" lang="en">
          <h1>{passage.title}</h1>
          {passage.paragraphs.map((p) => (
            <p key={p.label}>
              <b className="para-label">{p.label}</b> {p.text}
            </p>
          ))}
        </article>
        <div className="reading-questions">
          {passage.sets.map((s) => {
            const n = number
            number += s.items.length
            return (
              <QuestionSetView
                key={s.id}
                set={s}
                number={n}
                onChecked={(r) => {
                  setResults((x) => ({ ...x, [s.id]: r }))
                  recordPractice(`read:${passage.id}:${s.id}`, r.score, r.total, 'reading')
                }}
              />
            )
          })}
          {done && (
            <section className="reading-done card">
              <Character id={score / total >= 0.75 ? 'mia' : 'nimbus'} mood={score / total >= 0.75 ? 'happy' : 'think'} size={80} />
              <div>
                <h3>
                  {score} / {total} bonnes réponses
                </h3>
                <p className="muted">
                  Temps : {formatClock(passage.minutes * 60 - left)}. Pour chaque erreur, retrouve la phrase exacte du texte et note dans ton carnet
                  la paraphrase que tu n’as pas reconnue.
                </p>
                <button className="btn btn-primary" onClick={() => navigate('/reading')}>
                  Terminer
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
