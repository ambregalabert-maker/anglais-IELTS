import { Fragment } from 'react'
import { IconCheck, IconCrown, IconPath, IconStar, IconTrophy } from '../components/Icons'
import Character from '../characters/Character'
import { CAST } from '../characters/cast'
import ModuleHeader from '../components/ModuleHeader'
import TodayCard from '../plan/TodayCard'
import ProgressRing from '../components/ProgressRing'
import { UNITS, type UnitMeta } from '../data/units'
import { CONTENT } from '../data/vocab'
import { formatLongDate } from '../lib/dates'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { toast } from '../store/events'
import { useDaysToExam, useToday } from '../store/hooks'
import { updateSettings, useProgress } from '../store/progress'
import type { Difficulty, Progress } from '../store/types'

// Toutes les leçons sont ouvertes : « next » est simplement la leçon conseillée (la première pas encore faite).
// « soon » : thème dont le contenu n'est pas encore écrit.
type NodeState = 'todo' | 'next' | 'done' | 'mastered' | 'soon'

interface PathNode {
  id: string
  unit: UnitMeta
  index: number
  exam: boolean
}

// Décalage horizontal des ronds pour dessiner un chemin qui serpente
const OFFSETS = [0, 46, 72, 46, 0, -46, -72, -46]

function buildNodes(): PathNode[] {
  return UNITS.flatMap((unit) => {
    const count = CONTENT[unit.id]?.lessons.length ?? unit.lessons
    return [
      ...Array.from({ length: count }, (_, i) => ({ id: `${unit.id}-${i + 1}`, unit, index: i, exam: false })),
      { id: `${unit.id}-exam`, unit, index: count, exam: true },
    ]
  })
}

const NODES = buildNodes()

const LEVELS: { id: Difficulty; label: string }[] = [
  { id: 'normal', label: 'Normale' },
  { id: 'hard', label: 'Difficile 💪' },
  { id: 'expert', label: 'Expert 🧠' },
]

const STATE_LABEL: Record<NodeState, string> = { todo: 'à faire', next: 'conseillée', done: 'terminée', mastered: 'maîtrisée', soon: 'bientôt' }

function nodeStates(p: Progress): Record<string, NodeState> {
  const states: Record<string, NodeState> = {}
  let foundCurrent = false
  for (const n of NODES) {
    const lp = p.lessons[n.id]
    if (!CONTENT[n.unit.id]) states[n.id] = 'soon'
    else if (lp?.completed) states[n.id] = lp.mastered ? 'mastered' : 'done'
    else if (!foundCurrent) {
      states[n.id] = 'next'
      foundCurrent = true
    } else states[n.id] = 'todo'
  }
  return states
}

export default function Home() {
  const p = useProgress()
  const daysLeft = useDaysToExam()
  const { goalRatio, minutes } = useToday()
  const states = nodeStates(p)

  return (
    <div className="page">
      <div className="home-top">
        <section className="card countdown">
          <span className="countdown-num">{Math.max(0, daysLeft)}</span>
          <span className="countdown-label">
            jour{Math.abs(daysLeft) > 1 ? 's' : ''} avant l’IELTS
            <small>{formatLongDate(p.settings.examDate)}</small>
          </span>
        </section>
        <section className="card today-goal">
          <ProgressRing ratio={goalRatio} size={64} stroke={8} color={goalRatio >= 1 ? 'var(--success)' : 'var(--primary)'}>
            <b>{Math.min(100, Math.round(goalRatio * 100))}%</b>
          </ProgressRing>
          <span>
            <b>Objectif du jour</b>
            <small>
              {minutes} / {p.settings.dailyGoalMinutes} min
            </small>
          </span>
        </section>
      </div>

      <TodayCard />

      <ModuleHeader title="Chemin de vocabulaire" subtitle="Une leçon à la fois, de B1 jusqu’au C2" color="#6c4cf5" icon={<IconPath size={36} />} tryhard="home" />

      <div className="difficulty-row">
        <span>Difficulté</span>
        <div className="segmented">
          {LEVELS.map((l) => (
            <button key={l.id} className={p.settings.difficulty === l.id ? 'on' : ''} onClick={() => updateSettings({ difficulty: l.id })}>
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="path">
        {UNITS.map((unit, u) => {
          const nodes = NODES.filter((n) => n.unit.id === unit.id)
          return (
            <Fragment key={unit.id}>
              <div className="unit-banner" style={{ ['--unit' as string]: unit.color, ['--unit-shade' as string]: unit.shade }}>
                <div>
                  <small>
                    Unité {u + 1}
                    {unit.fromCourse && <span className="tag">De tes cours</span>}
                  </small>
                  <h2>{unit.title}</h2>
                  <p>{unit.description}</p>
                </div>
              </div>
              <div className="unit-nodes">
                {nodes.map((n, i) => {
                  const state = states[n.id]
                  const offset = OFFSETS[i % OFFSETS.length]
                  return (
                    <div key={n.id} className="node-row" style={{ transform: `translateX(${offset}px)` }}>
                      <button
                        className={`path-node ${state} ${n.exam ? 'exam' : ''}`}
                        style={{ ['--unit' as string]: unit.color, ['--unit-shade' as string]: unit.shade }}
                        aria-label={`${unit.title}, ${n.exam ? 'évaluation' : `leçon ${n.index + 1}`} (${STATE_LABEL[state]})`}
                        title={n.exam ? 'Évaluation de l’unité' : CONTENT[unit.id]?.lessons[n.index]?.title}
                        onClick={() => {
                          playSound('tap')
                          if (state === 'soon') toast('Ce thème arrive bientôt', '🚧')
                          else navigate(`/lesson/${unit.id}/${n.exam ? 'exam' : n.index}`)
                        }}
                      >
                        {n.exam ? (
                          <IconTrophy />
                        ) : state === 'mastered' ? (
                          <IconCrown />
                        ) : state === 'done' ? (
                          <IconCheck />
                        ) : (
                          <IconStar />
                        )}
                      </button>
                      {state === 'next' && (
                        <div className={`path-mascot ${offset > 0 ? 'left' : 'right'}`}>
                          <div className="bubble">{CAST[u % CAST.length].bubbles[i % 3]}</div>
                          <Character id={CAST[u % CAST.length].id} mood="wave" size={78} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
