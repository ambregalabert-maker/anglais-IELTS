// Une carte de Part 2 comme à l'examen : 1 minute de préparation (avec des notes), 2 minutes de parole
// enregistrées, puis réécoute avec la grille des 4 critères, la réponse modèle et les questions de Part 3 liées.

import { useEffect, useState } from 'react'
import Character from '../characters/Character'
import { PART2_CARDS, PART2_STRUCTURE, SPEAKING_CRITERIA, speakingTrackId } from '../data/speaking'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { useStudyTimer } from '../lib/useStudyTimer'
import { recordPractice } from '../store/progress'
import { formatClock, useCountdown } from '../lib/useCountdown'
import { ExaminerQuestion, ModelTrack, RecordBox, SelfCheck } from './parts'

const PREP = 60
const TALK = 120

export default function SpeakingPart2({ id }: { id: string }) {
  const card = PART2_CARDS.find((c) => c.id === id)
  const [phase, setPhase] = useState<'card' | 'prep' | 'talk' | 'review'>('card')
  const [notes, setNotes] = useState('')
  const [checks, setChecks] = useState<boolean[]>([])
  const [saved, setSaved] = useState(false)
  const [prepLeft] = useCountdown(PREP, phase === 'prep')
  useStudyTimer(true)

  useEffect(() => {
    if (phase === 'prep' && prepLeft <= 0) {
      playSound('tap')
      setPhase('talk')
    }
  }, [phase, prepLeft])

  if (!card) {
    return (
      <div className="lesson">
        <div className="lesson-empty">
          <Character id="nimbus" mood="think" size={110} />
          <p>Cette carte n’existe pas.</p>
          <button className="btn btn-primary" onClick={() => navigate('/speaking')}>
            Retour
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="lesson reading" style={{ ['--unit' as string]: '#e8a400' }}>
      <header className="lesson-top">
        <button className="lesson-quit" onClick={() => navigate('/speaking')} aria-label="Quitter">
          ✕
        </button>
        <div className="reading-title">
          <b>Part 2 · {card.theme}</b>
          <small>{phase === 'card' ? 'Lis la carte' : phase === 'prep' ? '1 minute de préparation' : phase === 'talk' ? 'Parle 1 à 2 minutes' : 'Réécoute et évalue-toi'}</small>
        </div>
        {phase === 'prep' && <span className={`reading-clock ${prepLeft <= 10 ? 'over' : ''}`}>⏱ {formatClock(prepLeft)}</span>}
      </header>
      <main className="lesson-body skim-body speaking-body">
        <article className="cue-card" lang="en">
          <h2>{card.title}</h2>
          <p>You should say:</p>
          <ul>
            {card.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p>{card.explain}</p>
        </article>

        {phase === 'card' && (
          <>
            <ul className="steps compact">
              {PART2_STRUCTURE.map((s) => (
                <li key={s.title}>
                  <b>{s.title}</b> : {s.text}
                </li>
              ))}
            </ul>
            <button className="btn btn-primary btn-block" onClick={() => setPhase('prep')}>
              Commencer la préparation (1 min)
            </button>
          </>
        )}

        {(phase === 'prep' || phase === 'talk' || phase === 'review') && (
          <label className="notes">
            <span>Tes notes : 5-6 mots-clés, un par point, plus un pour le « why »</span>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} lang="en" readOnly={phase !== 'prep'} placeholder="swimming · 22 · Greece · fear · instructor · proud" />
          </label>
        )}
        {phase === 'prep' && (
          <button className="btn btn-secondary" onClick={() => setPhase('talk')}>
            Je suis prêt·e, parler maintenant
          </button>
        )}

        {phase === 'talk' && <p className="qset-tip">💡 Suis l’ordre de la carte. S’il te reste du temps : une comparaison, une conséquence ou un souhait.</p>}
        {/* Le même enregistreur reste affiché pendant la réécoute */}
        {(phase === 'talk' || phase === 'review') && <RecordBox seconds={TALK} autoStart onDone={() => setPhase('review')} />}

        {phase === 'review' && (
          <>
            <section className="card speaking-review">
              <h3>Réécoute-toi avec les 4 critères</h3>
              <p className="muted small-note">Ton enregistrement est juste au-dessus. Coche ce qui est vrai :</p>
              <SelfCheck items={SPEAKING_CRITERIA.map((c) => `${c.name} : ${c.up}`)} value={checks} onChange={setChecks} />
              <button
                className="btn btn-primary"
                disabled={saved}
                onClick={() => {
                  recordPractice(`speak:card:${card.id}`, checks.filter(Boolean).length, SPEAKING_CRITERIA.length, 'speaking')
                  setSaved(true)
                  playSound('complete')
                }}
              >
                {saved ? 'Enregistré ✓' : 'Valider mon auto-évaluation'}
              </button>
            </section>
            {card.model && (
              <section className="card speaking-review">
                <h3>Réponse modèle (≈ 2 minutes)</h3>
                <ModelTrack id={speakingTrackId('card', card.id)} />
                {card.model.map((p) => (
                  <p key={p} lang="en">
                    {p}
                  </p>
                ))}
              </section>
            )}
            <section className="card speaking-review">
              <h3>Part 3 : questions liées</h3>
              <p className="muted small-note">Réponds à voix haute à chaque question (30 à 45 secondes) : avis, explication, exemple, nuance.</p>
              {card.part3.map((q) => (
                <ExaminerQuestion key={q} text={q} autoPlay={false} />
              ))}
              <RecordBox seconds={240} />
            </section>
            <button className="btn btn-secondary btn-block" onClick={() => navigate('/speaking')}>
              Terminer
            </button>
          </>
        )}
      </main>
    </div>
  )
}
