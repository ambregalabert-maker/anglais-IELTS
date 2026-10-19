import { Fragment } from 'react'
import { IconCheck, IconCrown, IconLock, IconPath, IconStar, IconTrophy } from '../components/Icons'
import Mascot from '../components/Mascot'
import ModuleHeader from '../components/ModuleHeader'
import ProgressRing from '../components/ProgressRing'
import { UNITS, type UnitMeta } from '../data/units'
import { formatLongDate } from '../lib/dates'
import { playSound } from '../lib/sound'
import { toast } from '../store/events'
import { useDaysToExam, useToday } from '../store/hooks'
import { useProgress } from '../store/progress'
import type { Progress } from '../store/types'

type NodeState = 'locked' | 'available' | 'done' | 'mastered'

interface PathNode {
  id: string
  unit: UnitMeta
  index: number
  exam: boolean
}

// Décalage horizontal des ronds pour dessiner un chemin qui serpente
const OFFSETS = [0, 46, 72, 46, 0, -46, -72, -46]

function buildNodes(): PathNode[] {
  return UNITS.flatMap((unit) => [
    ...Array.from({ length: unit.lessons }, (_, i) => ({ id: `${unit.id}-${i + 1}`, unit, index: i, exam: false })),
    { id: `${unit.id}-exam`, unit, index: unit.lessons, exam: true },
  ])
}

const NODES = buildNodes()

function nodeStates(p: Progress): Record<string, NodeState> {
  const states: Record<string, NodeState> = {}
  let foundCurrent = false
  for (const n of NODES) {
    const lp = p.lessons[n.id]
    if (lp?.completed) states[n.id] = lp.mastered ? 'mastered' : 'done'
    else if (!foundCurrent) {
      states[n.id] = 'available'
      foundCurrent = true
    } else states[n.id] = 'locked'
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

      <ModuleHeader title="Chemin de vocabulaire" subtitle="Une leçon à la fois, de B1 vers le 7" color="#6c4cf5" icon={<IconPath size={36} />} />

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
                        aria-label={`${unit.title}, ${n.exam ? 'évaluation' : `leçon ${n.index + 1}`} (${state})`}
                        onClick={() => {
                          if (state === 'locked') {
                            playSound('wrong')
                            toast('Termine d’abord les leçons précédentes', '🔒')
                          } else {
                            playSound('tap')
                            toast('Les leçons arrivent à l’étape 2', '🚧')
                          }
                        }}
                      >
                        {state === 'locked' ? (
                          <IconLock />
                        ) : n.exam ? (
                          <IconTrophy />
                        ) : state === 'mastered' ? (
                          <IconCrown />
                        ) : state === 'done' ? (
                          <IconCheck />
                        ) : (
                          <IconStar />
                        )}
                      </button>
                      {state === 'available' && (
                        <div className={`path-mascot ${offset > 0 ? 'left' : 'right'}`}>
                          <div className="bubble">C’est parti !</div>
                          <Mascot mood="wave" size={78} />
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
