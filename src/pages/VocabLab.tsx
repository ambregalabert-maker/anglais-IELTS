import { useMemo, useState } from 'react'
import { IconFlask } from '../components/Icons'
import ModuleHeader from '../components/ModuleHeader'
import { UNITS } from '../data/units'
import { ALL_WORDS } from '../data/vocab'
import { LAB_COUNTS, LAB_MODES } from '../lab/engine'
import { SpeakButton } from '../lesson/views'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { normalizeLoose } from '../lib/text'
import { MASTERED_BOX, useProgress } from '../store/progress'

const LEVELS = ['B1', 'B2', 'C1', 'C2'] as const

export default function VocabLab() {
  const p = useProgress()
  const [query, setQuery] = useState('')
  const [unit, setUnit] = useState<string>('all')
  const [level, setLevel] = useState<string>('all')
  const [limit, setLimit] = useState(40)

  const words = useMemo(() => {
    const q = normalizeLoose(query)
    return ALL_WORDS.filter(
      (w) =>
        (unit === 'all' || w.unitId === unit) &&
        (level === 'all' || w.level === level) &&
        (!q || normalizeLoose(w.word).includes(q) || normalizeLoose(w.fr).includes(q)),
    )
  }, [query, unit, level])

  return (
    <div className="page">
      <ModuleHeader title="Vocab Lab" subtitle="Le vocabulaire avancé pour viser le C2 en Lexical resource" color="#36b5ff" icon={<IconFlask size={36} />} tryhard="vocab" />

      <section className="lab-grid">
        {LAB_MODES.map((m) => (
          <button
            key={m.id}
            className="lab-card"
            style={{ ['--c' as string]: m.color }}
            onClick={() => {
              playSound('tap')
              navigate(`/lab/${m.id}`)
            }}
          >
            <span className="lab-icon">{m.icon}</span>
            <b>{m.title}</b>
            <small>{m.description}</small>
            {m.id !== 'mix' && <span className="lab-count">{LAB_COUNTS[m.id]} exercices</span>}
          </button>
        ))}
      </section>

      <h2 className="section-title">Glossaire ({ALL_WORDS.length} mots)</h2>
      <section className="card glossary">
        <input className="search" placeholder="Chercher un mot (anglais ou français)…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="glossary-filters">
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="all">Tous les thèmes</option>
            {UNITS.map((u) => (
              <option key={u.id} value={u.id}>
                {u.title}
              </option>
            ))}
          </select>
          <div className="segmented">
            <button className={level === 'all' ? 'on' : ''} onClick={() => setLevel('all')}>
              Tous
            </button>
            {LEVELS.map((l) => (
              <button key={l} className={level === l ? 'on' : ''} onClick={() => setLevel(l)}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <p className="muted small-note">
          {words.length} mot{words.length > 1 ? 's' : ''} · 👑 = maîtrisé
        </p>
        <div className="glossary-list">
          {words.slice(0, limit).map((w) => {
            const stat = p.words[w.id]
            return (
              <details key={w.id} className="glossary-item">
                <summary>
                  <span className={`level-tag l-${w.level}`}>{w.level}</span>
                  <span className="grow">
                    <b lang="en">{w.word}</b> {stat && stat.box >= MASTERED_BOX && '👑'}
                    <small>{w.fr}</small>
                  </span>
                  <SpeakButton text={w.word} small />
                </summary>
                <div className="glossary-body" lang="en">
                  <p>
                    <i>{w.pos}</i> · {w.def}
                  </p>
                  <p className="muted">« {w.ex} »</p>
                  {w.col && <p className="flash-col">{w.col.join(' · ')}</p>}
                  {w.note && <p className="flash-note">💡 {w.note}</p>}
                </div>
              </details>
            )
          })}
        </div>
        {words.length > limit && (
          <button className="btn btn-secondary btn-block" onClick={() => setLimit(limit + 60)}>
            Voir plus
          </button>
        )}
      </section>
    </div>
  )
}
