// Flashcards : la carte se retourne, puis « Je savais » / « Je ne savais pas ».
// Les cartes ratées reviennent une fois à la fin du paquet. Les cartes « mot » font avancer la répétition espacée.

import { useEffect, useState } from 'react'
import Character from '../characters/Character'
import { characterFor } from '../characters/cast'
import { SessionEndScreen } from '../lesson/LessonPlayer'
import { SpeakButton } from '../lesson/views'
import { IconSpeaker } from '../components/Icons'
import { confetti } from '../lib/confetti'
import { navigate } from '../lib/router'
import { playSound, speak } from '../lib/sound'
import { shuffle } from '../lib/text'
import { useStudyTimer } from '../lib/useStudyTimer'
import { addXp, completeReview, getProgress, logActivity, recordAnswer, toggleFavorite, useProgress } from '../store/progress'
import { deckCards, deckTitle, isTranslationDeck, type Card, type Deck } from './cards'

const EXIT = '/review/flashcards'

export default function Flashcards({ deck }: { deck: Deck }) {
  const p = useProgress()
  const [cards, setCards] = useState<{ c: Card; again: boolean }[]>(() => {
    const { flashSize } = getProgress().settings
    const all = deckCards(getProgress(), deck)
    // Mots à revoir : les plus urgents d'abord ; ailleurs : tirage au hasard
    const picked = deck === 'due' || deck === 'hard' ? shuffle(all.slice(0, flashSize)) : shuffle(all).slice(0, flashSize)
    return picked.map((c) => ({ c, again: false }))
  })
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(0)
  const [xp, setXp] = useState(0)
  const [start] = useState(() => Date.now())
  const [done, setDone] = useState<null | { seconds: number; accuracy: number }>(null)
  const total = cards.filter((c) => !c.again).length
  const dir = isTranslationDeck(deck) ? p.settings.flashDir : 'recall'

  useStudyTimer(!done)

  const card = cards[pos]

  // Lecture : à l'apparition de la carte (anglais au recto), sinon quand on la retourne
  useEffect(() => {
    if (!card) return
    if (!flipped && (dir === 'en' || dir === 'audio')) speak(card.c.say ?? card.c.en)
    if (flipped && (dir === 'fr' || dir === 'recall')) speak(card.c.say ?? card.c.en)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, flipped])

  function answer(knew: boolean) {
    const c = card.c
    const earned = knew && !card.again ? 1 : 0
    if (c.wordId) recordAnswer({ key: `w:${c.wordId}:flash`, wordIds: [c.wordId], correct: knew, xp: earned, trackMistake: false })
    else recordAnswer({ key: `card:${c.id}`, wordIds: [], correct: knew, xp: earned, trackMistake: false })
    setXp((x) => x + earned)
    playSound(knew ? 'correct' : 'wrong')
    if (knew && !card.again) setKnown((k) => k + 1)
    const next = knew || card.again ? cards : [...cards, { c, again: true }]
    setCards(next)
    setFlipped(false)
    if (pos + 1 < next.length) setPos(pos + 1)
    else {
      completeReview()
      logActivity('review', 'flashcards')
      addXp(5)
      setXp((x) => x + 5)
      playSound('complete')
      confetti(100)
      setDone({ seconds: (Date.now() - start) / 1000, accuracy: total ? (known + (knew && !card.again ? 1 : 0)) / total : 1 })
    }
  }

  if (done) {
    const pct = Math.round(done.accuracy * 100)
    return (
      <SessionEndScreen
        title="Paquet terminé !"
        message={`Tu connaissais ${pct}% des cartes du premier coup.`}
        bonus={5}
        accuracy={done.accuracy}
        seconds={done.seconds}
        xp={xp}
        exitPath={EXIT}
      />
    )
  }

  if (!card) {
    return (
      <div className="lesson">
        <div className="lesson-empty">
          <Character id="nimbus" mood="think" size={110} />
          <p>Ce paquet est vide pour l’instant.</p>
          <button className="btn btn-primary" onClick={() => navigate(EXIT)}>
            Retour
          </button>
        </div>
      </div>
    )
  }

  const c = card.c
  const guide = characterFor(c.id)
  const fav = p.favorites.includes(c.id)
  return (
    <div className="lesson" style={{ ['--unit' as string]: '#ff5d8f' }}>
      <header className="lesson-top">
        <button className="lesson-quit" onClick={() => navigate(EXIT)} aria-label="Quitter">
          ✕
        </button>
        <div className="lesson-bar">
          <div className="lesson-bar-fill" style={{ width: `${(pos / cards.length) * 100}%` }} />
        </div>
        <span className="deck-count">
          {pos + 1}/{cards.length}
        </span>
      </header>
      <main className="lesson-body flash-body">
        <p className="muted flash-deck">{deckTitle(deck)}</p>
        <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => !flipped && setFlipped(true)}>
          <div className="flash-face flash-front">
            {card.again && <span className="retry-tag">↻ À revoir</span>}
            <Character id={guide.id} mood="think" size={70} />
            {dir === 'en' && (
              <>
                <h2 lang="en">{c.en}</h2>
                {c.pos && <small>{c.pos}</small>}
                <SpeakButton text={c.en} />
              </>
            )}
            {dir === 'fr' && (
              <>
                <h2 className="flash-fr-front">{c.fr}</h2>
                {c.pos && <small>{c.pos} · en anglais ?</small>}
              </>
            )}
            {dir === 'audio' && (
              <button
                className="dictation-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  speak(c.say ?? c.en)
                }}
                aria-label="Réécouter"
              >
                <IconSpeaker size={34} />
              </button>
            )}
            {dir === 'recall' && (
              <p className="flash-cue" lang="en">
                {c.cue}
              </p>
            )}
            <p className="flash-tap">{dir === 'audio' ? 'Qu’as-tu entendu ? Touche la carte pour vérifier' : 'Touche la carte pour la retourner'}</p>
          </div>
          <div className="flash-face flash-back">
            <button
              className={`flash-star ${fav ? 'on' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(c.id)
              }}
              aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              {fav ? '★' : '☆'}
            </button>
            <h2 lang="en">
              {c.en} <SpeakButton text={c.say ?? c.en} small />
            </h2>
            {c.fr && <p className="flash-fr">{c.fr}</p>}
            {c.def && (
              <p className="flash-def" lang="en">
                {c.def}
              </p>
            )}
            {c.ex && (
              <p className="flash-ex" lang="en">
                « {c.ex} » <SpeakButton text={c.ex} small />
              </p>
            )}
            {c.col && c.col.length > 0 && (
              <p className="flash-col" lang="en">
                {c.col.join(' · ')}
              </p>
            )}
            {c.note && <p className="flash-note">💡 {c.note}</p>}
          </div>
        </div>
      </main>
      <footer className="lesson-foot">
        <div className="lesson-foot-inner">
          {flipped ? (
            <div className="flash-buttons">
              <button className="btn btn-danger" onClick={() => answer(false)}>
                Je ne savais pas
              </button>
              <button className="btn btn-success" onClick={() => answer(true)}>
                Je savais
              </button>
            </div>
          ) : (
            <button className="btn btn-primary btn-block" onClick={() => setFlipped(true)}>
              Retourner la carte
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}
