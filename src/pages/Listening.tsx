import { useState } from 'react'
import { IconHeadphones } from '../components/Icons'
import ModuleHeader from '../components/ModuleHeader'
import Character from '../characters/Character'
import { LISTENING_METHODS, LISTENING_ROUTINE, LISTENING_SECTIONS, LISTENING_STEPS, LISTENING_TRAP_TABLE, REAL_AUDIO_URL, TIPS } from '../data/listening'
import { LISTENING_SCRIPTS } from '../data/listeningScripts'
import { LISTENING_MODES } from '../listening/engine'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { logActivity, useProgress } from '../store/progress'

export default function Listening() {
  const p = useProgress()
  const voiceOn = p.settings.voice
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="page">
      <ModuleHeader title="Listening" subtitle="Apprendre à anticiper avant d’écouter" color="#3ccf7a" icon={<IconHeadphones size={36} />} tryhard="listening" />

      <a className="real-audio" href={REAL_AUDIO_URL} target="_blank" rel="noopener noreferrer" onClick={() => {
          playSound('tap')
          logActivity('listening', 'real-audio')
        }}>
        <Character id="mia" mood="happy" size={70} />
        <span className="grow">
          <b>S’entraîner avec de vrais audios</b>
          <small>Tests complets sur computerielts.com (nouvel onglet)</small>
        </span>
        <span className="real-audio-arrow">↗</span>
      </a>

      {!voiceOn && <p className="card advice">🔇 La voix est coupée : les phrases ne seront pas lues et les dictées seront impossibles. Active-la dans ton Profil.</p>}

      <h2 className="section-title">Exercices audio, format examen</h2>
      <section className="passage-list">
        {LISTENING_SCRIPTS.map((sc) => {
          const total = sc.sets.reduce((n, s) => n + s.items.length, 0)
          const stat = sc.sets.map((s) => p.practice[`lis:${sc.id}:${s.id}`]).filter(Boolean)
          const best = stat.reduce((n, s) => n + (s?.best ?? 0), 0)
          return (
            <button
              key={sc.id}
              className="passage-card script-card"
              style={{ ['--c' as string]: '#3ccf7a' }}
              onClick={() => {
                playSound('tap')
                navigate(`/listening/script/${sc.id}`)
              }}
            >
              <span className="passage-meta">
                <b>{sc.code}</b>
                <span>Section {sc.section}</span>
                <span>· {sc.sets[0].title}</span>
                {sc.fromGuide && <span className="guide-tag">Ta méthode</span>}
              </span>
              <b lang="en">{sc.title}</b>
              <small className="muted">{sc.context}</small>
              <span className="lab-count">{stat.length ? `Meilleur : ${best}/${total}` : `${total} question${total > 1 ? 's' : ''}`}</span>
            </button>
          )
        })}
      </section>

      <h2 className="section-title">Les 4 sections</h2>
      <section className="card info-table-wrap">
        <table className="info-table">
          <thead>
            <tr>
              <th>Section</th>
              <th>Contexte</th>
              <th>Questions fréquentes</th>
            </tr>
          </thead>
          <tbody>
            {LISTENING_SECTIONS.map((r) => (
              <tr key={r.section}>
                <td>
                  <b>{r.section}</b>
                </td>
                <td>{r.context}</td>
                <td>{r.types}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="muted small-note">Une seule écoute, 40 questions, 30 minutes. Sur ordinateur, tu tapes les réponses au fur et à mesure : pas de 10 minutes de transfert.</p>
      </section>

      <h2 className="section-title">La méthode en 5 étapes</h2>
      <section className="card">
        <ol className="steps">
          {LISTENING_STEPS.map((s) => (
            <li key={s.title}>
              <b>{s.title}</b> : {s.text}
            </li>
          ))}
        </ol>
      </section>

      <h2 className="section-title">Méthode par type de question</h2>
      <section className="card method-list">
        {LISTENING_METHODS.map((m) => (
          <details key={m.title} className="glossary-item">
            <summary>
              <b lang="en" className="grow">
                {m.title}
              </b>
            </summary>
            <div className="glossary-body">
              <ul>
                {m.tips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </section>

      <h2 className="section-title">Pièges fréquents</h2>
      <section className="card info-table-wrap">
        <table className="info-table">
          <thead>
            <tr>
              <th>Piège</th>
              <th>Dans l’audio</th>
              <th>Bonne réponse</th>
            </tr>
          </thead>
          <tbody>
            {LISTENING_TRAP_TABLE.map((r) => (
              <tr key={r.trap}>
                <td>
                  <b>{r.trap}</b>
                </td>
                <td lang="en">{r.audio}</td>
                <td>{r.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <h2 className="section-title">Stratégies</h2>
      <section className="lab-grid">
        {LISTENING_MODES.map((m) => (
          <button
            key={m.id}
            className="lab-card"
            style={{ ['--c' as string]: m.color }}
            onClick={() => {
              playSound('tap')
              navigate(`/listening/${m.id}`)
            }}
          >
            <span className="lab-icon">{m.icon}</span>
            <b>{m.title}</b>
            <small>{m.description}</small>
          </button>
        ))}
      </section>

      <h2 className="section-title">Routine conseillée</h2>
      <section className="card">
        <ol className="steps">
          {LISTENING_ROUTINE.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
      </section>

      <h2 className="section-title">Fiche à relire avant chaque test</h2>
      <section className="tips">
        {TIPS.map((t, i) => (
          <div key={t.title} className="card tip-card">
            <button className="tip-head" onClick={() => setOpen(open === i ? null : i)}>
              <b>{t.title}</b>
              <span>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <ul className="guide-intro">
                {t.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    </div>
  )
}
