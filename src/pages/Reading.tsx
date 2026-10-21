import { useState } from 'react'
import { IconBook } from '../components/Icons'
import ModuleHeader from '../components/ModuleHeader'
import { FOUR_STEPS, PASSAGES, QUESTION_METHODS, READING_FORMAT, READING_ROUTINE, TIME_PLAN, passageWords } from '../data/reading'
import { TYPE_LABELS } from '../practice/types'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { addParaphrase, removeParaphrase, useProgress } from '../store/progress'

const COLOR = '#00a8a8'

export default function Reading() {
  const p = useProgress()
  const [q, setQ] = useState('')
  const [t, setT] = useState('')
  const go = (path: string) => {
    playSound('tap')
    navigate(path)
  }

  return (
    <div className="page">
      <ModuleHeader title="Reading" subtitle="3 textes, 40 questions, 60 minutes : la méthode et l’entraînement" color={COLOR} icon={<IconBook size={36} />} />

      <section className="card">
        <div className="format-row">
          {READING_FORMAT.map((f) => (
            <div key={f.label} className="format-cell">
              <b>{f.value}</b>
              <small>{f.label}</small>
            </div>
          ))}
        </div>
        <p className="muted small-note">
          Sur ordinateur, les réponses se tapent directement : il n’y a aucun temps de transfert à la fin. Garde 1 à 2 minutes pour vérifier l’orthographe.
        </p>
      </section>

      <h2 className="section-title">Textes d’entraînement</h2>
      <section className="passage-list">
        {PASSAGES.map((ps) => {
          const total = ps.sets.reduce((n, s) => n + s.items.length, 0)
          const best = ps.sets.reduce((n, s) => n + (p.practice[`read:${ps.id}:${s.id}`]?.best ?? 0), 0)
          const tried = ps.sets.some((s) => p.practice[`read:${ps.id}:${s.id}`])
          return (
            <article key={ps.id} className="passage-card" style={{ ['--c' as string]: COLOR }}>
              <div className="passage-meta">
                <span className={`level-tag l-${ps.level}`}>{ps.level}</span>
                <span>{ps.topic}</span>
                <span>· {passageWords(ps)} mots</span>
                {ps.fromGuide && <span className="guide-tag">Ta méthode</span>}
              </div>
              <h3 lang="en">{ps.title}</h3>
              <p className="muted small-note">
                {[...new Set(ps.sets.map((s) => s.title))].join(' · ')} · {total} questions · {ps.minutes} min
              </p>
              <div className="passage-actions">
                <button className="btn btn-primary" onClick={() => go(`/reading/text/${ps.id}`)}>
                  {tried ? `Refaire (meilleur : ${best}/${total})` : 'Commencer'}
                </button>
                <button className="btn btn-secondary" onClick={() => go(`/reading/skim/${ps.id}`)}>
                  ⏱ Chrono-skimming
                </button>
              </div>
            </article>
          )
        })}
      </section>

      <h2 className="section-title">Gestion du temps</h2>
      <section className="card info-table-wrap">
        <table className="info-table">
          <thead>
            <tr>
              <th>Texte</th>
              <th>Temps conseillé</th>
              <th>Pourquoi</th>
            </tr>
          </thead>
          <tbody>
            {TIME_PLAN.map((r) => (
              <tr key={r.text}>
                <td>{r.text}</td>
                <td>
                  <b>{r.minutes} min</b>
                </td>
                <td>{r.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <h2 className="section-title">La méthode en 4 étapes</h2>
      <section className="card">
        <ol className="steps">
          {FOUR_STEPS.map((s) => (
            <li key={s.title}>
              <b>{s.title}</b> : {s.text}
            </li>
          ))}
        </ol>
      </section>

      <h2 className="section-title">Méthode par type de question</h2>
      <section className="card method-list">
        {QUESTION_METHODS.map((m) => (
          <details key={m.id} className="glossary-item">
            <summary>
              <span className="grow">
                <b lang="en">{m.title}</b>
                <small>{m.what}</small>
              </span>
            </summary>
            <div className="glossary-body">
              <ol>
                {m.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <p className="flash-note">💡 {m.tip}</p>
            </div>
          </details>
        ))}
        <p className="muted small-note">Types présents dans les textes : {[...new Set(PASSAGES.flatMap((x) => x.sets.map((s) => TYPE_LABELS[s.type])))].join(', ')}.</p>
      </section>

      <h2 className="section-title">Mon carnet de paraphrases</h2>
      <section className="card paraphrase-book">
        <p className="muted">Note chaque paraphrase que tu n’as pas reconnue : ce sont elles qui font gagner des points.</p>
        <form
          className="paraphrase-form"
          onSubmit={(e) => {
            e.preventDefault()
            if (!q.trim() || !t.trim()) return
            addParaphrase(q.trim(), t.trim())
            setQ('')
            setT('')
          }}
        >
          <input className="search" lang="en" placeholder="Dans la question (ex. decreased)" value={q} onChange={(e) => setQ(e.target.value)} />
          <input className="search" lang="en" placeholder="Dans le texte (ex. fell)" value={t} onChange={(e) => setT(e.target.value)} />
          <button className="btn btn-primary" type="submit" disabled={!q.trim() || !t.trim()}>
            Ajouter
          </button>
        </form>
        {p.paraphrases.length > 0 && (
          <ul className="paraphrase-list" lang="en">
            {p.paraphrases.map((x, i) => (
              <li key={`${x.question}-${i}`}>
                <span>{x.question}</span>
                <span className="muted">=</span>
                <span>{x.text}</span>
                <button className="icon-btn small" onClick={() => removeParaphrase(i)} aria-label="Supprimer">
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <h2 className="section-title">Routine conseillée</h2>
      <section className="card">
        <ol className="steps">
          {READING_ROUTINE.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
      </section>
    </div>
  )
}
