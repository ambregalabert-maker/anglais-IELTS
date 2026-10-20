// Flashcards : la carte se retourne, puis « Je savais » / « Je ne savais pas ».
// Les cartes ratées reviennent une fois à la fin du paquet.

import { useEffect, useState } from 'react'
import Character from '../characters/Character'
import { characterFor } from '../characters/cast'
import type { WordRef } from '../data/vocab'
import { SessionEndScreen } from '../lesson/LessonPlayer'
import { SpeakButton } from '../lesson/views'
import { confetti } from '../lib/confetti'
import { navigate } from '../lib/router'
import { playSound, speak } from '../lib/sound'
import { shuffle } from '../lib/text'
import { useStudyTimer } from '../lib/useStudyTimer'
import { addXp, completeReview, getProgress, logActivity, recordAnswer } from '../store/progress'
import { SESSION_SIZE, deckTitle, deckWords, type Deck } from './data'

const DECK_SIZE = SESSION_SIZE + 5

export default function Flashcards({ deck }: { deck: Deck }) {
  const [cards, setCards] = useState<{ w: WordRef; again: boolean }[]>(() =>
    shuffle(deckWords(getProgress(), deck).slice(0, DECK_SIZE * 2))
      .slice(0, DECK_SIZE)
      .map((w) => ({ w, again: false })),
  )
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(0)
  const [xp, setXp] = useState(0)
  const [start] = useState(() => Date.now())
  const [done, setDone] = useState<null | { seconds: number; accuracy: number }>(null)
  const total = cards.filter((c) => !c.again).length

  useStudyTimer(!done)

  const card = cards[pos]

  // Lecture du mot quand une nouvelle carte apparaît
  useEffect(() => {
    if (card && !flipped) speak(card.w.word, { profile: characterFor(card.w.id).voice })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos])

  function answer(knew: boolean) {
    const earned = knew && !card.again ? 1 : 0
    recordAnswer({ key: `w:${card.w.id}:flash`, wordIds: [card.w.id], correct: knew, xp: earned, trackMistake: false })
    setXp((x) => x + earned)
    playSound(knew ? 'correct' : 'wrong')
    if (knew && !card.again) setKnown((k) => k + 1)
    const next = knew || card.again ? cards : [...cards, { w: card.w, again: true }]
    setCards(next)
    setFlipped(false)
    if (pos + 1 < next.length) setPos(pos + 1)
    else {
      completeReview()
      logActivity('review')
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
        exitPath="/review"
      />
    )
  }

  if (!card) {
    return (
      <div className="lesson">
        <div className="lesson-empty">
          <Character id="nimbus" mood="think" size={110} />
          <p>Ce paquet est vide pour l’instant.</p>
          <button className="btn btn-primary" onClick={() => navigate('/review')}>
            Retour
          </button>
        </div>
      </div>
    )
  }

  const w = card.w
  const guide = characterFor(w.id)
  return (
    <div className="lesson" style={{ ['--unit' as string]: '#ff5d8f' }}>
      <header className="lesson-top">
        <button className="lesson-quit" onClick={() => navigate('/review')} aria-label="Quitter">
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
            <h2 lang="en">{w.word}</h2>
            <small>{w.pos}</small>
            <SpeakButton text={w.word} />
            <p className="flash-tap">Touche la carte pour la retourner</p>
          </div>
          <div className="flash-face flash-back">
            <h2 lang="en">{w.word}</h2>
            <p className="flash-fr">{w.fr}</p>
            <p className="flash-def" lang="en">
              {w.def}
            </p>
            <p className="flash-ex" lang="en">
              « {w.ex} » <SpeakButton text={w.ex} small />
            </p>
            {w.col && w.col.length > 0 && (
              <p className="flash-col" lang="en">
                {w.col.join(' · ')}
              </p>
            )}
            {w.note && <p className="flash-note">💡 {w.note}</p>}
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
