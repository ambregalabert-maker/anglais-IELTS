import Character from '../characters/Character'
import { IconCards } from '../components/Icons'
import ModuleHeader from '../components/ModuleHeader'
import { SpeakButton } from '../lesson/views'
import { navigate, useRoute } from '../lib/router'
import { playSound } from '../lib/sound'
import { useProgress } from '../store/progress'
import { boxCounts, dueWords, masteredCount, openMistakes, weakWords } from '../review/data'
import FlashcardsHome from '../review/FlashcardsHome'

// Intervalle avant de revoir un mot, selon sa boîte (doit correspondre à BOX_INTERVALS dans store/progress.ts)
const BOX_LABELS = ['1 jour', '2 jours', '4 jours', '8 jours', '16 jours']
const BOX_COLORS = ['#f0506e', '#ff9a4d', '#ffc93c', '#7ccf4a', '#2fbf71']

export default function Review() {
  const route = useRoute()
  if (route === '/review/flashcards') return <FlashcardsHome />
  return <ReviewHome />
}

/** Bouton d'entrée vers l'espace Flashcards. */
function FlashEntry() {
  return (
    <section className="review-card flash-entry">
      <span className="lab-icon">🃏</span>
      <div className="review-card-text grow">
        <h3>Espace Flashcards</h3>
        <p>Paquets par thème et par niveau, collocations, connecteurs, prononciation, favoris. Dans les deux sens, ou à l’écoute.</p>
      </div>
      <button
        className="btn btn-review"
        onClick={() => {
          playSound('tap')
          navigate('/review/flashcards')
        }}
      >
        Ouvrir
      </button>
    </section>
  )
}

function ReviewHome() {
  const p = useProgress()
  const due = dueWords(p)
  const mistakes = openMistakes(p)
  const seen = Object.keys(p.words).length
  const mastered = masteredCount(p)
  const boxes = boxCounts(p)
  const maxBox = Math.max(1, ...boxes)
  const hard = weakWords(p)
    .filter((w) => (p.words[w.id]?.wrong ?? 0) > 0)
    .slice(0, 8)

  const go = (path: string) => {
    playSound('tap')
    navigate(path)
  }

  if (seen === 0) {
    return (
      <div className="page">
        <ModuleHeader title="Révisions" subtitle="Tes erreurs et tes mots à revoir, au bon moment" color="#ff5d8f" icon={<IconCards size={36} />} />
        <div className="card coming-soon">
          <Character id="nimbus" mood="think" size={96} />
          <div>
            <h3>Rien à réviser pour l’instant</h3>
            <p className="muted">Fais une première leçon sur le chemin : chaque mot que tu travailles arrive ici, et revient au bon moment pour ne pas l’oublier.</p>
            <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => go('/')}>
              Aller au chemin
            </button>
          </div>
        </div>
        <FlashEntry />
      </div>
    )
  }

  return (
    <div className="page">
      <ModuleHeader title="Révisions" subtitle="Tes erreurs et tes mots à revoir, au bon moment" color="#ff5d8f" icon={<IconCards size={36} />} />

      <section className="stats-grid">
        <div className="stat card">
          <span className="stat-icon">⏰</span>
          <b>{due.length}</b>
          <small>à revoir</small>
        </div>
        <div className="stat card">
          <span className="stat-icon">🩹</span>
          <b>{mistakes.length}</b>
          <small>erreurs</small>
        </div>
        <div className="stat card">
          <span className="stat-icon">👑</span>
          <b>
            {mastered}
            <span className="muted stat-of">/{seen}</span>
          </b>
          <small>maîtrisés</small>
        </div>
      </section>

      <section className="review-actions">
        <div className="review-card due">
          <div className="review-card-text">
            <h3>Révision du jour</h3>
            <p>
              {due.length
                ? `${due.length} mot${due.length > 1 ? 's' : ''} à revoir pour ne pas les oublier.`
                : 'Tout est à jour ! Tu peux quand même réviser tes mots les plus fragiles.'}
            </p>
          </div>
          {due.length ? (
            <button className="btn btn-review" onClick={() => go('/review/session/due')}>
              Réviser
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={() => go('/review/session/weak')}>
              Quand même
            </button>
          )}
        </div>
        <div className="review-card mistakes">
          <div className="review-card-text">
            <h3>Mes erreurs</h3>
            <p>{mistakes.length ? `${mistakes.length} exercice${mistakes.length > 1 ? 's' : ''} raté${mistakes.length > 1 ? 's' : ''} à refaire.` : 'Aucune erreur en attente. Bravo !'}</p>
          </div>
          <button className="btn btn-danger" disabled={!mistakes.length} onClick={() => go('/review/session/mistakes')}>
            Corriger
          </button>
        </div>
      </section>

      <FlashEntry />

      <h2 className="section-title">Tes boîtes de mémoire</h2>
      <section className="card">
        <p className="muted">
          Chaque mot réussi monte d’une boîte et revient plus tard. Un mot raté redescend dans la boîte 1. À partir de la boîte 4, il est
          maîtrisé.
        </p>
        <div className="boxes">
          {boxes.map((n, i) => (
            <div key={i} className="box-col">
              <span className="box-count">{n}</span>
              <div className="box-bar" style={{ height: `${8 + (n / maxBox) * 92}%`, background: BOX_COLORS[i] }} />
              <b>Boîte {i + 1}</b>
              <small>{BOX_LABELS[i]}</small>
            </div>
          ))}
        </div>
      </section>

      {hard.length > 0 && (
        <>
          <h2 className="section-title">Tes mots les plus difficiles</h2>
          <section className="card hard-list">
            {hard.map((w) => (
              <div key={w.id} className="hard-row">
                <SpeakButton text={w.word} small />
                <span className="grow">
                  <b lang="en">{w.word}</b>
                  <small>{w.fr}</small>
                </span>
                <span className="hard-count">✕ {p.words[w.id].wrong}</span>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  )
}
