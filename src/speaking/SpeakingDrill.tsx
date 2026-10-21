// Séances de Speaking question par question : Part 1 (A-R-E), Part 3, « développer une réponse »
// et « paraphraser un mot oublié ». On répond à voix haute (enregistré si le micro est autorisé),
// puis on compare avec la réponse modèle et on s'auto-évalue.

import { useMemo, useState } from 'react'
import { SessionEndScreen } from '../lesson/LessonPlayer'
import { DEVELOP, PARAPHRASE_WORDS, PART1_QUESTIONS, PART2_CARDS, PART3_MODEL, PART3_TYPES, speakingTrackId } from '../data/speaking'
import { CANDIDATE } from '../data/speech'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { sample } from '../lib/text'
import { useStudyTimer } from '../lib/useStudyTimer'
import { recordPractice } from '../store/progress'
import { ExaminerQuestion, ModelTrack, RecordBox, SelfCheck, SpokenText } from './parts'

export type DrillKind = 'part1' | 'develop' | 'paraphrase' | 'part3'

interface Step {
  key: string
  question: string
  short?: string // réponse trop courte (développer)
  word?: string // mot à paraphraser
  model?: string
  modelTrack?: string
}

const INFO: Record<DrillKind, { title: string; seconds: number; checks: string[]; hint: string }> = {
  part1: { title: 'Part 1 : questions sur toi', seconds: 25, checks: ['Answer : j’ai répondu directement', 'Reason : j’ai dit pourquoi', 'Example : j’ai ajouté un détail'], hint: '2-3 phrases, 15 à 25 secondes : Answer, Reason, Example.' },
  develop: { title: 'Développer une réponse', seconds: 25, checks: ['3 phrases au lieu d’un mot', 'Une raison', 'Un exemple ou un détail personnel'], hint: 'Transforme cette réponse trop courte en 3 phrases.' },
  paraphrase: { title: 'Paraphraser un mot oublié', seconds: 15, checks: ['Je l’ai expliqué sans dire le mot', 'Une seule phrase claire'], hint: 'Explique ce mot sans le dire, comme si tu l’avais oublié : « It’s the thing you use to… », « the person who… ».' },
  part3: { title: 'Part 3 : discussion', seconds: 45, checks: ['Mon avis est clair', 'Je l’ai expliqué', 'Un exemple ou une comparaison', 'Une nuance (it depends, to some extent…)'], hint: 'Parle de la société, pas seulement de toi. Vise 30 à 45 secondes.' },
}

function buildSteps(kind: DrillKind): Step[] {
  switch (kind) {
    case 'part1':
      return sample(PART1_QUESTIONS, 5).map((p) => ({ key: p.id, question: p.q, model: p.model }))
    case 'develop':
      return sample(DEVELOP, 5).map((p) => ({ key: p.id, question: p.q, short: p.short, model: p.model }))
    case 'paraphrase':
      return sample(PARAPHRASE_WORDS, 5).map((w) => ({ key: w.word, question: `Explain “${w.word}” without saying it.`, word: w.word, model: w.model }))
    case 'part3': {
      const card = sample(PART2_CARDS, 1)[0]
      return card.part3.map((q) =>
        q === PART3_MODEL.q ? { key: q, question: q, model: PART3_MODEL.a, modelTrack: speakingTrackId('part3', 'skills') } : { key: q, question: q },
      )
    }
  }
}

export default function SpeakingDrill({ kind }: { kind: DrillKind }) {
  const info = INFO[kind]
  const steps = useMemo(() => buildSteps(kind), [kind])
  const [pos, setPos] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [checks, setChecks] = useState<boolean[]>([])
  const [score, setScore] = useState(0)
  const [start] = useState(() => Date.now())
  const [done, setDone] = useState<null | { seconds: number }>(null)
  useStudyTimer(!done)

  const total = steps.length * info.checks.length
  const step = steps[pos]

  function next() {
    const gained = checks.filter(Boolean).length
    const newScore = score + gained
    setScore(newScore)
    setChecks([])
    setAnswered(false)
    playSound('tap')
    if (pos + 1 < steps.length) setPos(pos + 1)
    else {
      recordPractice(`speak:${kind}`, newScore, total, 'speaking')
      playSound('complete')
      setDone({ seconds: (Date.now() - start) / 1000 })
    }
  }

  if (done) {
    return (
      <SessionEndScreen
        title="Séance terminée !"
        message="Réécoute-toi demain : tu entendras tout de suite ce qui a progressé."
        bonus={0}
        accuracy={total ? score / total : 1}
        seconds={done.seconds}
        xp={score * 2}
        exitPath="/speaking"
      />
    )
  }

  return (
    <div className="lesson" style={{ ['--unit' as string]: '#e8a400' }}>
      <header className="lesson-top">
        <button className="lesson-quit" onClick={() => navigate('/speaking')} aria-label="Quitter">
          ✕
        </button>
        <div className="lesson-bar">
          <div className="lesson-bar-fill" style={{ width: `${(pos / steps.length) * 100}%` }} />
        </div>
        <span className="deck-count">
          {pos + 1}/{steps.length}
        </span>
      </header>
      <main className="lesson-body skim-body speaking-body" key={step.key}>
        <p className="muted flash-deck">{info.title}</p>
        <ExaminerQuestion text={step.question} />
        {step.short && (
          <p className="short-answer">
            Réponse trop courte : <b lang="en">« {step.short} »</b>
          </p>
        )}
        {kind === 'part3' && (
          <details className="glossary-item formula-help">
            <summary>
              <b className="grow">Formules de réponse selon le type de question</b>
            </summary>
            <ul className="glossary-body" lang="en">
              {PART3_TYPES.map((t) => (
                <li key={t.type}>
                  <b>{t.type}</b> ({t.example}) : {t.formula}
                </li>
              ))}
            </ul>
          </details>
        )}
        <p className="qset-tip">💡 {info.hint}</p>
        <RecordBox seconds={info.seconds} onDone={() => setAnswered(true)} />
        {!answered ? (
          <button className="btn btn-secondary" onClick={() => setAnswered(true)}>
            J’ai répondu
          </button>
        ) : (
          <section className="card speaking-review">
            {step.model ? (
              <>
                <h3>{kind === 'paraphrase' ? 'Une explication possible' : 'Réponse modèle'}</h3>
                {step.modelTrack ? (
                  <>
                    <ModelTrack id={step.modelTrack} />
                    <p lang="en">{step.model}</p>
                  </>
                ) : (
                  <SpokenText text={step.model} voice={CANDIDATE} />
                )}
              </>
            ) : (
              <p className="muted">Pas de réponse modèle pour cette question : réécoute-toi avec la grille ci-dessous.</p>
            )}
            <h3>Auto-évaluation</h3>
            <SelfCheck items={info.checks} value={checks} onChange={setChecks} />
          </section>
        )}
      </main>
      <footer className="lesson-foot">
        <div className="lesson-foot-inner">
          <button className="btn btn-primary btn-block" disabled={!answered} onClick={next}>
            {pos + 1 < steps.length ? 'Question suivante' : 'Terminer'}
          </button>
        </div>
      </footer>
    </div>
  )
}
