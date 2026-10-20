// L'affichage de chaque type d'exercice.
// Chaque vue signale la réponse en cours avec `onPending` (ou `onComplete` pour les paires),
// et le lecteur de leçon (LessonPlayer) s'occupe du bouton « Vérifier ».

import { useEffect, useMemo, useRef, useState } from 'react'
import { IconSpeaker } from '../components/Icons'
import { normalize, matchTyped, shuffle } from '../lib/text'
import { playSound, speak } from '../lib/sound'
import { characterFor } from '../characters/cast'
import SpeechBubble from '../characters/SpeechBubble'
import { useProgress } from '../store/progress'
import { analyse, countWords } from '../writing/checks'
import type { ChoiceExercise, FreeExercise, JudgeExercise, MatchExercise, ReorderExercise, TypeExercise } from './types'

export interface Pending {
  correct: boolean
  typo?: boolean // presque juste (faute de frappe)
  given: string
  details?: string[] // remarques à afficher dans le bandeau (mini-rédaction)
}

interface ViewProps<T> {
  ex: T
  locked: boolean // après « Vérifier » : on ne peut plus changer sa réponse
  onPending: (p: Pending | null) => void
}

export function SpeakButton({ text, small = false }: { text: string; small?: boolean }) {
  // Voix coupée dans les réglages : pas de bouton du tout
  const voiceOn = useProgress().settings.voice
  if (!voiceOn) return null
  return (
    <button
      type="button"
      className={`speak-btn ${small ? 'small' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        speak(text)
      }}
      aria-label={`Écouter : ${text}`}
      title="Écouter la prononciation"
    >
      <IconSpeaker size={small ? 18 : 22} />
    </button>
  )
}

/** Affiche une phrase avec son trou (rempli par la réponse choisie si besoin). */
function Sentence({ text, fill, state }: { text: string; fill?: string; state?: 'ok' | 'ko' }) {
  const [before, after] = text.split('___')
  return (
    <p className="ex-sentence">
      {before}
      <span className={`blank ${fill ? 'filled' : ''} ${state ?? ''}`}>{fill || ' '.repeat(8)}</span>
      {after}
    </p>
  )
}

// ---------- QCM ----------

export function ChoiceView({ ex, locked, onPending }: ViewProps<ChoiceExercise>) {
  const [picked, setPicked] = useState<string | null>(null)

  useEffect(() => {
    // Raccourcis clavier 1-4 sur ordinateur
    const onKey = (e: KeyboardEvent) => {
      if (locked || e.target instanceof HTMLInputElement) return
      const i = Number(e.key) - 1
      if (i >= 0 && i < ex.options.length) choose(ex.options[i])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function choose(o: string) {
    if (locked) return
    playSound('tap')
    setPicked(o)
    onPending({ correct: o === ex.answer, given: o })
  }

  const english = ex.speakPrompt && ex.prompt
  return (
    <div className="ex">
      {ex.tag && <span className="ex-tag">{ex.tag}</span>}
      {ex.prompt &&
        (english ? (
          <SpeechBubble character={characterFor(ex.key)} text={ex.prompt} />
        ) : (
          <div className="ex-prompt">
            <span>{ex.prompt}</span>
          </div>
        ))}
      {ex.sentence && (
        <Sentence text={ex.sentence} fill={picked ?? undefined} state={locked ? (picked === ex.answer ? 'ok' : 'ko') : undefined} />
      )}
      <div className={`options ${ex.options.some((o) => o.length > 28) ? 'long' : ''}`}>
        {ex.options.map((o, i) => {
          const state = locked ? (o === ex.answer ? 'right' : o === picked ? 'wrong' : 'dim') : o === picked ? 'picked' : ''
          return (
            <button key={o} className={`option ${state}`} onClick={() => choose(o)} disabled={locked && state === 'dim'}>
              <span className="option-key">{i + 1}</span>
              <span>{o}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ---------- Réponse tapée ----------

export function TypeView({ ex, locked, onPending }: ViewProps<TypeExercise>) {
  const [value, setValue] = useState('')
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => input.current?.focus(), [])

  function change(v: string) {
    setValue(v)
    if (!v.trim()) return onPending(null)
    const squash = (x: string) => (ex.compact ? x.replace(/\s+/g, '') : x)
    const r = matchTyped(squash(v), ex.accepted.map(squash), { ignoreAccents: ex.ignoreAccents })
    // Orthographe / dictée : une faute de frappe compte comme une erreur
    const correct = ex.strict ? r === 'exact' : r !== 'wrong'
    onPending({ correct, typo: !ex.strict && r === 'typo', given: v })
  }

  return (
    <div className="ex">
      {ex.speak && <DictationButton text={ex.speak} />}
      {ex.prompt && (
        <div className="ex-prompt">
          <span>{ex.prompt}</span>
        </div>
      )}
      {ex.sentence && <Sentence text={ex.sentence} />}
      <input
        ref={input}
        className="type-input"
        value={value}
        onChange={(e) => change(e.target.value)}
        readOnly={locked}
        placeholder="Écris ta réponse…"
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        lang="en"
        enterKeyHint="done"
      />
      {ex.hint && <p className="ex-hint">💡 {ex.hint}</p>}
    </div>
  )
}

/** Gros bouton « écouter » pour les dictées (lu automatiquement à l'apparition). */
function DictationButton({ text }: { text: string }) {
  const voiceOn = useProgress().settings.voice
  useEffect(() => {
    if (!voiceOn) return
    const t = setTimeout(() => speak(text), 300)
    return () => clearTimeout(t)
  }, [text, voiceOn])
  if (!voiceOn) return <p className="ex-hint">🔇 Voix coupée : active-la dans ton profil pour faire les dictées. Indice ci-dessous.</p>
  return (
    <div className="dictation">
      <button className="dictation-btn" onClick={() => speak(text)} aria-label="Écouter">
        <IconSpeaker size={34} />
      </button>
      <button className="dictation-slow" onClick={() => speak(text, { profile: { usePreferred: true, rate: 0.65 } })}>
        🐢 Plus lentement
      </button>
    </div>
  )
}

// ---------- Vrai / faux ----------

export function JudgeView({ ex, locked, onPending }: ViewProps<JudgeExercise>) {
  const [picked, setPicked] = useState<boolean | null>(null)
  function choose(v: boolean) {
    if (locked) return
    playSound('tap')
    setPicked(v)
    onPending({ correct: v === ex.ok, given: v ? 'Correcte' : 'Incorrecte' })
  }
  return (
    <div className="ex">
      <SpeechBubble character={characterFor(ex.key)} text={ex.sentence} quote />
      <div className="options two">
        {[true, false].map((v) => {
          const state = locked ? (v === ex.ok ? 'right' : v === picked ? 'wrong' : 'dim') : v === picked ? 'picked' : ''
          return (
            <button key={String(v)} className={`option big ${state}`} onClick={() => choose(v)}>
              <span className="option-emoji">{v ? '👍' : '👎'}</span>
              <span>{v ? 'Correcte' : 'Incorrecte'}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ---------- Remise en ordre ----------

export function ReorderView({ ex, locked, onPending }: ViewProps<ReorderExercise>) {
  const [chosen, setChosen] = useState<number[]>([])

  function update(next: number[]) {
    setChosen(next)
    const given = next.map((i) => ex.tiles[i]).join(' ')
    onPending(next.length ? { correct: normalize(given) === normalize(ex.answer), given } : null)
  }

  return (
    <div className="ex">
      <div className="ex-prompt">
        <span>{ex.prompt}</span>
      </div>
      <div className={`tile-answer ${locked ? 'locked' : ''}`}>
        {chosen.map((i) => (
          <button key={i} className="tile" onClick={() => !locked && update(chosen.filter((c) => c !== i))}>
            {ex.tiles[i]}
          </button>
        ))}
      </div>
      <div className="tile-bank">
        {ex.tiles.map((t, i) => (
          <button
            key={i}
            className={`tile ${chosen.includes(i) ? 'used' : ''}`}
            disabled={chosen.includes(i) || locked}
            onClick={() => {
              playSound('tap')
              update([...chosen, i])
            }}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}

// ---------- Associer les paires ----------

export interface MatchResult {
  wrongIds: string[] // mots sur lesquels tu t'es trompée au moins une fois
}

export function MatchView({ ex, onComplete }: { ex: MatchExercise; onComplete: (r: MatchResult) => void }) {
  const right = useMemo(() => shuffle(ex.pairs), [ex])
  const [selLeft, setSelLeft] = useState<string | null>(null)
  const [selRight, setSelRight] = useState<string | null>(null)
  const [done, setDone] = useState<string[]>([])
  const [flash, setFlash] = useState<string[]>([])
  const wrong = useRef(new Set<string>())

  function attempt(l: string | null, r: string | null) {
    if (!l || !r) return
    if (l === r) {
      playSound('correct')
      const next = [...done, l]
      setDone(next)
      setSelLeft(null)
      setSelRight(null)
      if (next.length === ex.pairs.length) setTimeout(() => onComplete({ wrongIds: [...wrong.current] }), 350)
    } else {
      playSound('wrong')
      wrong.current.add(l)
      wrong.current.add(r)
      setFlash([`l:${l}`, `r:${r}`])
      setTimeout(() => {
        setFlash([])
        setSelLeft(null)
        setSelRight(null)
      }, 500)
    }
  }

  const cls = (side: 'l' | 'r', id: string, selected: string | null) =>
    `option match ${done.includes(id) ? 'done' : ''} ${selected === id ? 'picked' : ''} ${flash.includes(`${side}:${id}`) ? 'wrong shake' : ''}`

  return (
    <div className="ex">
      <div className="match-grid">
        <div className="match-col">
          {ex.pairs.map((p) => (
            <button
              key={p.id}
              lang="en"
              className={cls('l', p.id, selLeft)}
              disabled={done.includes(p.id)}
              onClick={() => {
                speak(p.left)
                setSelLeft(p.id)
                attempt(p.id, selRight)
              }}
            >
              {p.left}
            </button>
          ))}
        </div>
        <div className="match-col">
          {right.map((p) => (
            <button
              key={p.id}
              className={cls('r', p.id, selRight)}
              disabled={done.includes(p.id)}
              onClick={() => {
                playSound('tap')
                setSelRight(p.id)
                attempt(selLeft, p.id)
              }}
            >
              {p.right}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------- Mini-rédaction ----------

export function FreeView({ ex, locked, onPending }: ViewProps<FreeExercise>) {
  const [text, setText] = useState('')
  const words = countWords(text)

  function change(v: string) {
    setText(v)
    if (countWords(v) < 3) return onPending(null)
    const a = analyse(v, ex.task)
    // Seules les vraies fautes comptent (pas les conseils de longueur, faits pour un essai complet)
    const serious = a.issues.filter((i) => i.kind !== 'linking')
    const details = serious.map((i) => `« ${i.text} » : ${i.message}`)
    const enough = countWords(v) >= ex.minWords
    if (!enough) details.unshift(`${countWords(v)} mots : il en faut au moins ${ex.minWords}.`)
    onPending({ correct: enough && serious.length === 0, given: v, details })
  }

  return (
    <div className="ex">
      <div className="ex-prompt">
        <span lang="en">{ex.prompt}</span>
      </div>
      {ex.source && (
        <p className="ex-sentence free-source" lang="en">
          « {ex.source} »
        </p>
      )}
      <textarea className="free-input" rows={6} value={text} onChange={(e) => change(e.target.value)} readOnly={locked} placeholder="Écris en anglais…" lang="en" spellCheck={false} />
      <p className={`ex-hint ${words >= ex.minWords ? 'ok' : ''}`}>
        {words} / {ex.minWords} mots minimum
      </p>
    </div>
  )
}
