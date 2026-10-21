// L'examen : le format 2026, et un convertisseur score → note (indicatif).

import { useState } from 'react'
import { IconExam } from '../components/Icons'
import ModuleHeader from '../components/ModuleHeader'
import { navigate } from '../lib/router'

const FORMAT = [
  { test: 'Listening', time: '30 min', content: '4 sections, 40 questions, une seule écoute', path: '/listening' },
  { test: 'Reading', time: '60 min', content: '3 longs textes (700-950 mots), 40 questions', path: '/reading' },
  { test: 'Writing', time: '60 min', content: 'Task 1 (150 mots min., graphique ou processus) + Task 2 (250 mots min.)', path: '/writing' },
  { test: 'Speaking', time: '11-14 min', content: '3 parties, face à un examinateur', path: '/speaking' },
]

// Barèmes habituels (ils varient légèrement d'une version du test à l'autre : à prendre comme une estimation)
const LISTENING_BANDS: [number, number][] = [
  [39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [11, 4], [8, 3.5], [6, 3], [4, 2.5],
]
const READING_BANDS: [number, number][] = [
  [39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5],
]

function band(table: [number, number][], score: number): number {
  return table.find(([min]) => score >= min)?.[1] ?? 0
}

/** Note globale : moyenne des 4 épreuves, arrondie au demi-point (x,25 → x,5 ; x,75 → x+1). */
function overall(scores: number[]): number {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  return Math.floor(avg * 2 + 0.5) / 2
}

const HALF_BANDS = [9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4]

export default function Exam() {
  const [listening, setListening] = useState(32)
  const [reading, setReading] = useState(30)
  const [writing, setWriting] = useState(7)
  const [speaking, setSpeaking] = useState(7)
  const l = band(LISTENING_BANDS, listening)
  const r = band(READING_BANDS, reading)
  const total = overall([l, r, writing, speaking])

  return (
    <div className="page">
      <ModuleHeader title="L’examen" subtitle="Le format IELTS Academic en 2026, et ta note estimée" color="#6c4cf5" icon={<IconExam size={36} />} />

      <section className="card info-table-wrap">
        <table className="info-table">
          <thead>
            <tr>
              <th>Épreuve</th>
              <th>Durée</th>
              <th>Contenu</th>
            </tr>
          </thead>
          <tbody>
            {FORMAT.map((f) => (
              <tr key={f.test}>
                <td>
                  <button className="link-btn" onClick={() => navigate(f.path)}>
                    {f.test}
                  </button>
                </td>
                <td>{f.time}</td>
                <td>{f.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="muted small-note">Environ 2 h 45 au total, noté de 0 à 9 par demi-point. Listening et Speaking sont identiques en Academic et en General Training.</p>
      </section>

      <h2 className="section-title">Ce qui change en 2026</h2>
      <section className="card exam-notes">
        <p>
          <b>Le papier disparaît.</b> Depuis mi-2026, l’IELTS se passe sur ordinateur dans les centres (avec une option « Writing on Paper » dans certains pays). Le
          contenu, les compétences évaluées et la notation ne changent pas. La <i>One Skill Retake</i> permet de repasser une seule épreuve.
        </p>
        <p>
          <b>Conseil clé :</b> sur ordinateur, les réponses du Listening se tapent directement, et il n’y a plus les 10 minutes de transfert. Entraîne-toi au format
          écran : c’est le cas de tous les exercices du site.
        </p>
        <p className="muted">
          Certains blogs annoncent de « nouveaux types de questions » ou des « pénalités pour templates » en 2026 : ce ne sont pas des annonces officielles. En revanche,
          les critères officiels sanctionnent déjà les phrases apprises par cœur. Éviter les templates reste donc le bon conseil.
        </p>
      </section>

      <h2 className="section-title">Estimer ta note</h2>
      <section className="card converter">
        <p className="muted small-note">Les barèmes varient légèrement selon les versions du test : cette conversion est indicative.</p>
        <label className="conv-row">
          <span>
            <b>Listening</b>
            <small>{listening} / 40 bonnes réponses</small>
          </span>
          <input type="range" min={0} max={40} value={listening} onChange={(e) => setListening(Number(e.target.value))} />
          <b className="conv-band">{l.toFixed(1)}</b>
        </label>
        <label className="conv-row">
          <span>
            <b>Reading (Academic)</b>
            <small>{reading} / 40 bonnes réponses</small>
          </span>
          <input type="range" min={0} max={40} value={reading} onChange={(e) => setReading(Number(e.target.value))} />
          <b className="conv-band">{r.toFixed(1)}</b>
        </label>
        <label className="conv-row">
          <span>
            <b>Writing</b>
            <small>note estimée</small>
          </span>
          <select value={writing} onChange={(e) => setWriting(Number(e.target.value))}>
            {HALF_BANDS.map((b) => (
              <option key={b} value={b}>
                {b.toFixed(1)}
              </option>
            ))}
          </select>
          <span />
        </label>
        <label className="conv-row">
          <span>
            <b>Speaking</b>
            <small>note estimée</small>
          </span>
          <select value={speaking} onChange={(e) => setSpeaking(Number(e.target.value))}>
            {HALF_BANDS.map((b) => (
              <option key={b} value={b}>
                {b.toFixed(1)}
              </option>
            ))}
          </select>
          <span />
        </label>
        <div className="conv-total">
          <span>Note globale estimée</span>
          <b>{total.toFixed(1)}</b>
        </div>
        <p className="muted small-note">La note globale est la moyenne des 4 épreuves, arrondie au demi-point le plus proche (6,25 → 6,5 ; 6,75 → 7).</p>
      </section>
    </div>
  )
}
