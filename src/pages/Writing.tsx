import { useState } from 'react'
import { IconPen } from '../components/Icons'
import ModuleHeader from '../components/ModuleHeader'
import { GRAMMAR } from '../data/writing/grammar'
import { TASK1_CHARTS } from '../data/writing/task1'
import { TASK2_TOPICS, TASK2_TYPES, type Task2Type } from '../data/writing/topics'
import { formatLongDate } from '../lib/dates'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { deleteEssay, useProgress } from '../store/progress'

const KIND_LABELS = { line: 'Line graph', bar: 'Bar chart', pie: 'Pie charts', table: 'Table' }

function go(path: string) {
  playSound('tap')
  navigate(path)
}

export default function Writing() {
  const p = useProgress()
  const [type, setType] = useState<Task2Type | 'all'>('all')
  const [openRules, setOpenRules] = useState<string | null>(null)
  const topics = TASK2_TOPICS.filter((t) => type === 'all' || t.type === type)

  return (
    <div className="page">
      <ModuleHeader title="Writing" subtitle="Task 1, Task 2 et grammaire, avec ta méthode en 9 étapes" color="#ff9a4d" icon={<IconPen size={36} />} tryhard="writing" />

      <section className="lab-grid">
        <button className="lab-card" style={{ ['--c' as string]: '#ff9a4d' }} onClick={() => go('/writing/exam/2/random')}>
          <span className="lab-icon">⏱️</span>
          <b>Task 2 · Mode examen</b>
          <small>40 minutes, 250 mots, sujet au hasard, rapport automatique</small>
        </button>
        <button className="lab-card" style={{ ['--c' as string]: '#6c4cf5' }} onClick={() => go('/writing/exam/1/random')}>
          <span className="lab-icon">📊</span>
          <b>Task 1 · Mode examen</b>
          <small>20 minutes, 150 mots, sur un graphique</small>
        </button>
        <button className="lab-card" style={{ ['--c' as string]: '#2fbf71' }} onClick={() => go('/writing/task1')}>
          <span className="lab-icon">📈</span>
          <b>Task 1 · Exercices</b>
          <small>Tendances, comparaisons, temps, overview</small>
        </button>
        <button className="lab-card" style={{ ['--c' as string]: '#36b5ff' }} onClick={() => go('/writing/grammar/mix')}>
          <span className="lab-icon">🧩</span>
          <b>Grammaire</b>
          <small>Les temps, comparatifs, too / enough (Booklet 2)</small>
        </button>
      </section>

      <h2 className="section-title">Task 2 · Parcours guidé</h2>
      <section className="card">
        <p className="muted">Choisis un sujet : tu avances étape par étape avec la méthode de ton guide. Ton brouillon est gardé automatiquement.</p>
        <div className="chip-row deck-row">
          <button className={`chip ${type === 'all' ? 'on' : ''}`} onClick={() => setType('all')}>
            Tous ({TASK2_TOPICS.length})
          </button>
          {(Object.keys(TASK2_TYPES) as Task2Type[]).map((t) => (
            <button key={t} className={`chip ${type === t ? 'on' : ''}`} onClick={() => setType(t)}>
              {TASK2_TYPES[t]}
            </button>
          ))}
        </div>
        <div className="topic-list">
          {topics.map((t) => {
            const draft = p.drafts[`guided-${t.id}`]
            const done = p.essays.some((e) => e.task === 2 && e.topicId === t.id)
            return (
              <div key={t.id} className="topic-row">
                <div className="grow">
                  <small>
                    {TASK2_TYPES[t.type]} · {t.theme} {done && '· ✅ fait'} {draft && !done && '· ✏️ brouillon'}
                  </small>
                  <p lang="en">{t.question}</p>
                </div>
                <div className="topic-actions">
                  <button className="chip" onClick={() => go(`/writing/guided/${t.id}`)}>
                    Guidé
                  </button>
                  <button className="chip" onClick={() => go(`/writing/exam/2/${t.id}`)}>
                    ⏱️ Examen
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <h2 className="section-title">Task 1 · Graphiques</h2>
      <section className="card topic-list">
        {TASK1_CHARTS.map((c) => (
          <div key={c.id} className="topic-row">
            <div className="grow">
              <small>{KIND_LABELS[c.kind]}</small>
              <p>{c.title}</p>
            </div>
            <button className="chip" onClick={() => go(`/writing/exam/1/${c.id}`)}>
              ⏱️ Examen
            </button>
          </div>
        ))}
      </section>

      <h2 className="section-title">Grammaire du Booklet 2</h2>
      <section className="grammar-list">
        {GRAMMAR.map((g) => (
          <div key={g.id} className="card grammar-card">
            <div className="grammar-head">
              <span className="lab-icon">{g.icon}</span>
              <b className="grow">{g.title}</b>
              <button className="chip" onClick={() => setOpenRules(openRules === g.id ? null : g.id)}>
                {openRules === g.id ? 'Masquer' : 'Rappel'}
              </button>
              <button className="chip on" onClick={() => go(`/writing/grammar/${g.id}`)}>
                S’entraîner
              </button>
            </div>
            {openRules === g.id && (
              <ul className="guide-intro">
                {g.rules.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      <h2 className="section-title">Mes essais ({p.essays.length})</h2>
      {p.essays.length === 0 ? (
        <p className="muted">Tes essais apparaîtront ici, avec leur rapport.</p>
      ) : (
        <section className="card topic-list">
          {p.essays.map((e) => {
            const title = e.task === 2 ? TASK2_TOPICS.find((t) => t.id === e.topicId)?.question : TASK1_CHARTS.find((c) => c.id === e.topicId)?.title
            return (
              <div key={e.id} className="topic-row">
                <button className="grow essay-link" onClick={() => go(`/writing/essay/${e.id}`)}>
                  <small>
                    Task {e.task} · {e.mode === 'exam' ? 'examen' : 'guidé'} · {formatLongDate(e.date)} · {e.words} mots · {e.issues} point(s)
                  </small>
                  <p lang="en">{title}</p>
                </button>
                <button
                  className="chip"
                  aria-label="Supprimer"
                  onClick={() => {
                    if (confirm('Supprimer cet essai ?')) deleteEssay(e.id)
                  }}
                >
                  🗑️
                </button>
              </div>
            )
          })}
        </section>
      )}
    </div>
  )
}
