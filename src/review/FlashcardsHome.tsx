// L'espace Flashcards (dans Révisions) : choix du sens, des paquets, et la liste de toutes les cartes.

import { useMemo, useState } from 'react'
import { IconCards } from '../components/Icons'
import ModuleHeader from '../components/ModuleHeader'
import { UNITS } from '../data/units'
import { ALL_WORDS } from '../data/vocab'
import { SpeakButton } from '../lesson/views'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { normalizeLoose } from '../lib/text'
import { MASTERED_BOX, toggleFavorite, updateSettings, useProgress } from '../store/progress'
import type { FlashDir } from '../store/types'
import { TOOL_CARDS, deckCards, deckTitle, type Deck } from './cards'

const DIRS: { id: FlashDir; label: string }[] = [
  { id: 'en', label: 'Anglais → Français' },
  { id: 'fr', label: 'Français → Anglais' },
  { id: 'audio', label: '🎧 À l’écoute' },
]
const SIZES = [10, 20, 40]
const LEVELS = ['B1', 'B2', 'C1', 'C2'] as const

const TOOLS: { deck: Deck; icon: string; text: string; color: string }[] = [
  { deck: 'colloc', icon: '🧲', text: 'Les mots qui vont ensemble', color: '#36b5ff' },
  { deck: 'upgrade', icon: '🚀', text: 'Remplacer good, bad, big…', color: '#7c5cff' },
  { deck: 'register', icon: '🎩', text: 'Du familier au soutenu', color: '#33b5a5' },
  { deck: 'idioms', icon: '💬', text: 'Pour le Speaking surtout', color: '#ff8fb1' },
  { deck: 'paraphrase', icon: '🔁', text: 'Dire la même chose autrement', color: '#ff9a4d' },
  { deck: 'pron', icon: '👄', text: 'th, h, voyelles longues, -ed', color: '#f0506e' },
  { deck: 'unit:linking', icon: '🔗', text: 'However, whereas, consequently…', color: '#1a8bd1' },
  { deck: 'unit:trends', icon: '📈', text: 'Rise, plummet, sharply… (Task 1)', color: '#2fbf71' },
]

export default function FlashcardsHome() {
  const p = useProgress()
  const { flashDir, flashSize } = p.settings
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'fav' | (typeof LEVELS)[number]>('all')
  const [limit, setLimit] = useState(30)

  const count = (deck: Deck) => deckCards(p, deck).length
  const open = (deck: Deck) => {
    playSound('tap')
    navigate(`/review/cards/${deck}`)
  }

  const list = useMemo(() => {
    const q = normalizeLoose(query)
    return ALL_WORDS.filter(
      (w) =>
        (filter === 'all' || (filter === 'fav' ? p.favorites.includes(w.id) : w.level === filter)) &&
        (!q || normalizeLoose(w.word).includes(q) || normalizeLoose(w.fr).includes(q)),
    )
  }, [query, filter, p.favorites])

  const mine: { deck: Deck; icon: string; text: string }[] = [
    { deck: 'due', icon: '⏰', text: 'Les mots dont c’est le jour' },
    { deck: 'hard', icon: '🔥', text: 'Ceux que tu rates le plus' },
    { deck: 'fav', icon: '⭐', text: 'Les cartes que tu as étoilées' },
    { deck: 'seen', icon: '📚', text: 'Tous les mots déjà travaillés' },
    { deck: 'new', icon: '🌱', text: 'Découvrir de nouveaux mots' },
  ]

  return (
    <div className="page">
      <button className="back-link" onClick={() => navigate('/review')}>
        ← Révisions
      </button>
      <ModuleHeader title="Flashcards" subtitle="Tous tes paquets de cartes, à retourner où tu veux, quand tu veux" color="#ff5d8f" icon={<IconCards size={36} />} />

      <section className="card flash-settings">
        <div className="setting">
          <span>
            <b>Sens des cartes</b>
            <small>{flashDir === 'audio' ? 'Tu entends le mot, tu retrouves son sens' : 'Ce qui est écrit au recto'}</small>
          </span>
          <div className="segmented">
            {DIRS.map((d) => (
              <button key={d.id} className={flashDir === d.id ? 'on' : ''} onClick={() => updateSettings({ flashDir: d.id })}>
                {d.label}
              </button>
            ))}
          </div>
        </div>
        <div className="setting">
          <span>
            <b>Cartes par paquet</b>
          </span>
          <div className="segmented">
            {SIZES.map((n) => (
              <button key={n} className={flashSize === n ? 'on' : ''} onClick={() => updateSettings({ flashSize: n })}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </section>

      <h2 className="section-title">Mes paquets</h2>
      <section className="lab-grid">
        {mine.map((d) => {
          const n = count(d.deck)
          return (
            <button key={d.deck} className="lab-card" style={{ ['--c' as string]: '#ff5d8f' }} disabled={!n} onClick={() => open(d.deck)}>
              <span className="lab-icon">{d.icon}</span>
              <b>{deckTitle(d.deck)}</b>
              <small>{d.text}</small>
              <span className="lab-count">
                {n} carte{n > 1 ? 's' : ''}
              </span>
            </button>
          )
        })}
      </section>

      <h2 className="section-title">Outils IELTS</h2>
      <section className="lab-grid">
        {TOOLS.map((t) => (
          <button key={t.deck} className="lab-card" style={{ ['--c' as string]: t.color }} onClick={() => open(t.deck)}>
            <span className="lab-icon">{t.icon}</span>
            <b>{t.deck === 'unit:linking' ? 'Connecteurs' : t.deck === 'unit:trends' ? 'Tendances' : deckTitle(t.deck)}</b>
            <small>{t.text}</small>
            <span className="lab-count">{t.deck.startsWith('unit:') ? count(t.deck) : TOOL_CARDS[t.deck as keyof typeof TOOL_CARDS].length} cartes</span>
          </button>
        ))}
      </section>

      <h2 className="section-title">Par niveau</h2>
      <section className="chip-row deck-row">
        {LEVELS.map((l) => (
          <button key={l} className="chip deck-chip" onClick={() => open(`level:${l}`)}>
            <span className={`level-tag l-${l}`}>{l}</span> {count(`level:${l}`)} mots
          </button>
        ))}
      </section>

      <h2 className="section-title">Par thème</h2>
      <section className="theme-decks">
        {UNITS.map((u) => {
          const cards = count(`unit:${u.id}`)
          const mastered = ALL_WORDS.filter((w) => w.unitId === u.id && (p.words[w.id]?.box ?? 0) >= MASTERED_BOX).length
          return (
            <button key={u.id} className="theme-deck" style={{ ['--c' as string]: u.color }} onClick={() => open(`unit:${u.id}`)}>
              <span className="grow">
                <b>{u.title}</b>
                <small>
                  {cards} mots · {mastered} maîtrisé{mastered > 1 ? 's' : ''}
                </small>
              </span>
              <span className="theme-deck-bar">
                <span style={{ width: `${cards ? (mastered / cards) * 100 : 0}%` }} />
              </span>
            </button>
          )
        })}
      </section>

      <h2 className="section-title">Toutes les cartes</h2>
      <section className="card glossary">
        <input className="search" placeholder="Chercher un mot (anglais ou français)…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="segmented">
          <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>
            Toutes
          </button>
          <button className={filter === 'fav' ? 'on' : ''} onClick={() => setFilter('fav')}>
            ⭐ ({p.favorites.length})
          </button>
          {LEVELS.map((l) => (
            <button key={l} className={filter === l ? 'on' : ''} onClick={() => setFilter(l)}>
              {l}
            </button>
          ))}
        </div>
        <p className="muted small-note">
          {list.length} carte{list.length > 1 ? 's' : ''} · touche ☆ pour l’ajouter à tes favoris · 👑 = maîtrisé
        </p>
        <div className="glossary-list">
          {list.slice(0, limit).map((w) => {
            const fav = p.favorites.includes(w.id)
            const box = p.words[w.id]?.box ?? 0
            return (
              <div key={w.id} className="card-row">
                <button className={`flash-star small ${fav ? 'on' : ''}`} onClick={() => toggleFavorite(w.id)} aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}>
                  {fav ? '★' : '☆'}
                </button>
                <span className="grow">
                  <b lang="en">{w.word}</b> {box >= MASTERED_BOX && '👑'}
                  <small>{w.fr}</small>
                </span>
                <span className={`level-tag l-${w.level}`}>{w.level}</span>
                <SpeakButton text={w.word} small />
              </div>
            )
          })}
        </div>
        {list.length > limit && (
          <button className="btn btn-secondary btn-block" onClick={() => setLimit(limit + 60)}>
            Voir plus
          </button>
        )}
      </section>
    </div>
  )
}
