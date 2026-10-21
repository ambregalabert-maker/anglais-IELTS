import { IconMic } from '../components/Icons'
import ModuleHeader from '../components/ModuleHeader'
import {
  PART1_TECHNIQUES,
  PART1_THEMES,
  PART2_CARDS,
  PART3_MODEL,
  PART3_TYPES,
  PRONUNCIATION,
  SPEAKING_CRITERIA,
  SPEAKING_METHOD,
  SPEAKING_PARTS,
  SPEAKING_ROUTINE,
  TIME_FILLERS,
  WEAK_STRONG,
  pronWords,
} from '../data/speaking'
import { CANDIDATE } from '../data/speech'
import { navigate } from '../lib/router'
import { playSound, speak } from '../lib/sound'
import { SpokenText } from '../speaking/parts'
import { useProgress } from '../store/progress'

const COLOR = '#e8a400'

const DRILLS = [
  { id: 'part1', icon: '🙋', title: 'Part 1 : questions rapides', text: '5 questions sur toi, 20 secondes chacune (A-R-E)' },
  { id: 'part3', icon: '🧠', title: 'Part 3 : discussion', text: 'Questions abstraites : avis, comparaison, nuance' },
  { id: 'develop', icon: '🌱', title: 'Développer une réponse', text: '« Yes. » → 3 vraies phrases' },
  { id: 'paraphrase', icon: '🔁', title: 'Paraphraser un mot oublié', text: 'Expliquer un mot sans le dire' },
]

export default function Speaking() {
  const p = useProgress()
  const voiceOn = p.settings.voice
  const go = (path: string) => {
    playSound('tap')
    navigate(path)
  }

  return (
    <div className="page">
      <ModuleHeader title="Speaking" subtitle="11 à 14 minutes, 3 parties, un examinateur : s’entraîner à voix haute" color={COLOR} icon={<IconMic size={36} />} />

      <section className="card info-table-wrap">
        <table className="info-table">
          <thead>
            <tr>
              <th>Partie</th>
              <th>Durée</th>
              <th>Format</th>
              <th>Objectif</th>
            </tr>
          </thead>
          <tbody>
            {SPEAKING_PARTS.map((r) => (
              <tr key={r.part}>
                <td>
                  <b>{r.part}</b>
                </td>
                <td>{r.time}</td>
                <td>{r.format}</td>
                <td>{r.goal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="muted small-note">Enregistré, avec un seul examinateur. 4 critères à poids égal. L’accent français n’est pas pénalisé en soi : ce qui compte, c’est d’être compris facilement.</p>
      </section>

      <h2 className="section-title">S’entraîner</h2>
      <section className="lab-grid">
        {DRILLS.map((d) => {
          const stat = p.practice[`speak:${d.id}`]
          return (
            <button key={d.id} className="lab-card" style={{ ['--c' as string]: COLOR }} onClick={() => go(`/speaking/drill/${d.id}`)}>
              <span className="lab-icon">{d.icon}</span>
              <b>{d.title}</b>
              <small>{d.text}</small>
              {stat && <span className="lab-count">{stat.tries} séance{stat.tries > 1 ? 's' : ''}</span>}
            </button>
          )
        })}
      </section>
      <p className="muted small-note">🎙️ Le site te demande l’accès au micro pour que tu puisses te réécouter. L’enregistrement reste sur ton téléphone : rien n’est envoyé.</p>

      <h2 className="section-title">Part 2 : cartes avec minuteur</h2>
      <section className="passage-list">
        {PART2_CARDS.map((c) => {
          const stat = p.practice[`speak:card:${c.id}`]
          return (
            <button key={c.id} className="passage-card script-card" style={{ ['--c' as string]: COLOR }} onClick={() => go(`/speaking/card/${c.id}`)}>
              <span className="passage-meta">
                <b>{c.theme}</b>
                {c.model && <span className="guide-tag">Avec modèle</span>}
              </span>
              <b lang="en">{c.title}</b>
              <small className="muted">1 min de préparation, 2 min de parole, puis {c.part3.length} questions de Part 3</small>
              {stat && <span className="lab-count">Dernière auto-évaluation : {stat.best}/4</span>}
            </button>
          )
        })}
      </section>

      <h2 className="section-title">Les 4 critères en pratique</h2>
      <section className="card info-table-wrap">
        <table className="info-table">
          <thead>
            <tr>
              <th>Critère</th>
              <th>Ce qui fait monter la note</th>
              <th>Ce qui la fait baisser</th>
            </tr>
          </thead>
          <tbody>
            {SPEAKING_CRITERIA.map((c) => (
              <tr key={c.name}>
                <td>
                  <b lang="en">{c.name}</b>
                </td>
                <td>{c.up}</td>
                <td>{c.down}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <h2 className="section-title">La méthode</h2>
      <section className="card">
        <ul className="steps">
          {SPEAKING_METHOD.map((m) => (
            <li key={m.title}>
              <b>{m.title}</b> : {m.text}
            </li>
          ))}
        </ul>
      </section>

      <h2 className="section-title">Part 1 en détail</h2>
      <section className="card speaking-detail">
        <p>
          <b>Thèmes fréquents :</b> {PART1_THEMES}.
        </p>
        <ul className="steps">
          {PART1_TECHNIQUES.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="weak-strong">
          <p lang="en">
            <b>Q :</b> {WEAK_STRONG.q}
          </p>
          <div className="ws-row weak">
            <span>Faible</span>
            <SpokenText text={WEAK_STRONG.weak} voice={CANDIDATE} />
          </div>
          <div className="ws-row strong">
            <span>Fort</span>
            <SpokenText text={WEAK_STRONG.strong} voice={CANDIDATE} />
          </div>
        </div>
      </section>

      <h2 className="section-title">Part 3 en détail</h2>
      <section className="card speaking-detail">
        <p className="muted">Les questions deviennent générales et abstraites : il faut parler de la société, pas seulement de toi.</p>
        <div className="info-table-wrap">
          <table className="info-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Exemple</th>
                <th>Formule de réponse</th>
              </tr>
            </thead>
            <tbody>
              {PART3_TYPES.map((t) => (
                <tr key={t.type}>
                  <td>
                    <b>{t.type}</b>
                  </td>
                  <td lang="en">{t.example}</td>
                  <td lang="en">{t.formula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p lang="en">
          <b>Modèle :</b> <i>{PART3_MODEL.q}</i>
        </p>
        <SpokenText text={PART3_MODEL.a} voice={CANDIDATE} />
      </section>

      <h2 className="section-title">Gagner du temps et nuancer</h2>
      <section className="card filler-list">
        {TIME_FILLERS.map((t) => (
          <SpokenText key={t} text={t} voice={CANDIDATE} />
        ))}
      </section>

      <h2 className="section-title">Prononciation pour francophones</h2>
      <section className="card pron">
        {PRONUNCIATION.map((g) => (
          <div key={g.title} className="pron-group">
            <h3>{g.title}</h3>
            <p className="muted small-note">{g.tip}</p>
            <div className="pron-pairs">
              {g.pairs.map((pair) => (
                <div key={pair} className="pron-pair" lang="en">
                  {pronWords(pair).map((w) => (
                    <button key={w} className="chip" disabled={!voiceOn} onClick={() => speak(w.toLowerCase())}>
                      🔊 {w}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="btn btn-secondary btn-block" onClick={() => go('/review/cards/pron')}>
          🃏 Réviser en flashcards
        </button>
      </section>

      <h2 className="section-title">Routine conseillée</h2>
      <section className="card">
        <ol className="steps">
          {SPEAKING_ROUTINE.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
      </section>
    </div>
  )
}
