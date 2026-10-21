// Rapport après un essai : chiffres, conseils, texte surligné, checklist du guide, essai modèle, copie pour correction.

import { useMemo, useState } from 'react'
import Character from '../characters/Character'
import Chart from '../components/Chart'
import { TASK1_CHARTS } from '../data/writing/task1'
import { TASK2_TOPICS } from '../data/writing/topics'
import { formatDuration, formatLongDate } from '../lib/dates'
import { navigate } from '../lib/router'
import { toast } from '../store/events'
import { useProgress } from '../store/progress'
import { ISSUE_LABELS, analyse, type IssueKind } from './checks'
import { copyText, correctionPrompt } from './copy'
import HighlightedText from './HighlightedText'

// La checklist de relecture du guide (étape 9)
const CHECKLIST_T2 = [
  'J’ai répondu à TOUTES les parties de la question',
  'Ma position est claire et cohérente du début à la fin de l’essai',
  'Chaque paragraphe de développement a une seule idée principale',
  'J’ai expliqué mes idées au lieu de seulement les lister',
  'J’ai donné des exemples',
  'Mes paragraphes sont bien séparés',
  'Pas de contractions ni de langage familier',
  'J’ai varié les connecteurs sans en mettre dans chaque phrase',
  'Je n’ai pas répété les mots de la consigne : j’ai paraphrasé',
  'J’ai utilisé au moins 3 phrases complexes (relatives, conditionnelles, passif)',
  'J’ai vérifié l’accord sujet-verbe, les temps, les articles et les pluriels',
  'J’ai vérifié l’orthographe et la ponctuation',
  'Mon essai fait au moins 250 mots',
]
const CHECKLIST_T1 = [
  'Mon introduction reformule la consigne (pas de copie mot pour mot)',
  'J’ai un overview clair (« Overall, … ») sans chiffres précis',
  'J’ai sélectionné les chiffres importants et je les ai comparés',
  'J’ai utilisé les bons temps (présent pour présenter, passé pour les dates passées)',
  'J’ai varié le vocabulaire des tendances (rise, plummet, sharply…)',
  'Je n’ai pas donné mon opinion',
  'Mon texte fait au moins 150 mots',
]

export default function EssayReport({ id }: { id: string }) {
  const p = useProgress()
  const essay = p.essays.find((e) => e.id === id)
  const [active, setActive] = useState<number | undefined>()
  const [checked, setChecked] = useState<boolean[]>([])
  const [showModel, setShowModel] = useState(false)
  const analysis = useMemo(() => (essay ? analyse(essay.text, essay.task) : null), [essay])

  if (!essay || !analysis) {
    return (
      <div className="lesson">
        <div className="lesson-empty">
          <Character id="earl" mood="think" size={110} />
          <p>Cet essai est introuvable.</p>
          <button className="btn btn-primary" onClick={() => navigate('/writing')}>
            Retour
          </button>
        </div>
      </div>
    )
  }

  const topic = essay.task === 2 ? TASK2_TOPICS.find((t) => t.id === essay.topicId) : undefined
  const chart = essay.task === 1 ? TASK1_CHARTS.find((c) => c.id === essay.topicId) : undefined
  const question = topic?.question ?? chart?.question ?? ''
  const model = topic?.model ?? chart?.model ?? ''
  const min = essay.task === 2 ? 250 : 150
  const counts = analysis.issues.reduce<Partial<Record<IssueKind, number>>>((acc, i) => ({ ...acc, [i.kind]: (acc[i.kind] ?? 0) + 1 }), {})
  const checklist = essay.task === 2 ? CHECKLIST_T2 : CHECKLIST_T1
  const mood = analysis.issues.length === 0 && analysis.words >= min ? 'dance' : analysis.issues.length <= 3 ? 'happy' : 'think'

  async function copy() {
    const ok = await copyText(correctionPrompt(essay!.task, question, essay!.text, analysis!.words))
    toast(ok ? 'Copié ! Colle-le dans une conversation avec Claude.' : 'Impossible de copier automatiquement.', ok ? '📋' : '⚠️')
  }

  return (
    <div className="lesson report">
      <header className="lesson-top">
        <button className="lesson-quit" onClick={() => navigate('/writing')} aria-label="Fermer">
          ✕
        </button>
        <b className="report-title">
          Task {essay.task} · {essay.mode === 'exam' ? 'Mode examen' : 'Parcours guidé'}
        </b>
      </header>
      <main className="lesson-body report-body">
        <div className="report-head">
          <Character id="earl" mood={mood} size={84} />
          <div>
            <h2>{analysis.issues.length === 0 ? 'Aucun problème détecté !' : `${analysis.issues.length} point${analysis.issues.length > 1 ? 's' : ''} à revoir`}</h2>
            <p className="muted">
              {formatLongDate(essay.date)}
              {essay.seconds > 0 && ` · ${formatDuration(essay.seconds)}`}
            </p>
          </div>
        </div>

        <section className="stats-grid">
          <div className={`stat card ${analysis.words < min ? 'bad' : 'good'}`}>
            <span className="stat-icon">📝</span>
            <b>{analysis.words}</b>
            <small>mots (min. {min})</small>
          </div>
          <div className="stat card">
            <span className="stat-icon">¶</span>
            <b>{analysis.paragraphs}</b>
            <small>paragraphes</small>
          </div>
          <div className="stat card">
            <span className="stat-icon">🔗</span>
            <b>{analysis.linking.length}</b>
            <small>liaisons différentes</small>
          </div>
        </section>

        {analysis.advice.length > 0 && (
          <section className="card advice">
            <h3>Conseils</h3>
            <ul>
              {analysis.advice.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="card">
          <h3>Ton texte</h3>
          {analysis.issues.length > 0 && (
            <div className="hl-legend">
              {(Object.keys(counts) as IssueKind[]).map((k) => (
                <span key={k} style={{ ['--hl' as string]: ISSUE_LABELS[k].color }}>
                  <i /> {ISSUE_LABELS[k].label} ({counts[k]})
                </span>
              ))}
            </div>
          )}
          <HighlightedText text={essay.text} issues={analysis.issues} active={active} onSelect={setActive} />
          {analysis.issues.length > 0 && (
            <ol className="issue-list">
              {analysis.issues.map((iss, i) => (
                <li key={i} className={active === i ? 'active' : ''} onClick={() => setActive(i)}>
                  <b style={{ color: ISSUE_LABELS[iss.kind].color }}>« {iss.text} »</b> {iss.message}
                </li>
              ))}
            </ol>
          )}
          {analysis.linking.length > 0 && (
            <p className="muted small-note">
              Mots de liaison : {analysis.linking.map((l) => `${l.word}${l.count > 1 ? ` ×${l.count}` : ''}`).join(', ')}
            </p>
          )}
        </section>

        <section className="card">
          <h3>Checklist de relecture</h3>
          <div className="checklist">
            {checklist.map((c, i) => (
              <label key={c}>
                <input type="checkbox" checked={!!checked[i]} onChange={(e) => setChecked((arr) => Object.assign([...arr], { [i]: e.target.checked }))} />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="card">
          <h3>Le sujet</h3>
          <p className="question" lang="en">
            {question}
          </p>
          {chart && <Chart chart={chart} />}
        </section>

        <section className="card">
          <button className="btn btn-secondary btn-block" onClick={() => setShowModel(!showModel)}>
            {showModel ? 'Masquer l’essai modèle' : '📖 Voir l’essai modèle (band 9)'}
          </button>
          {showModel && (
            <div className="model-essay" lang="en">
              {model.split('\n\n').map((par, i) => (
                <p key={i}>{par}</p>
              ))}
            </div>
          )}
        </section>

        <p className="muted small-note">
          Ces vérifications automatiques repèrent les erreurs fréquentes, mais ne remplacent pas une vraie correction. Pour une note par
          critère, copie ton essai et colle-le à Claude.
        </p>
      </main>
      <footer className="lesson-foot">
        <div className="lesson-foot-inner">
          <button className="btn btn-primary btn-block" onClick={copy}>
            📋 Copier mon essai pour correction
          </button>
        </div>
      </footer>
    </div>
  )
}
