// Affiche une série de questions (Reading ou Listening) et la corrige d'un coup.
// Après « Vérifier », chaque réponse fausse montre la bonne réponse et l'explication du piège.

import { useState } from 'react'
import { countWords } from '../writing/checks'
import { normalize } from '../lib/text'
import { playSound } from '../lib/sound'
import type { Item, QuestionSet } from './types'

export interface SetResult {
  score: number
  total: number
}

const TFNG = ['True', 'False', 'Not Given']
const YNNG = ['Yes', 'No', 'Not Given']

function isRight(set: QuestionSet, item: Item, given: string | string[] | undefined): boolean {
  if (given === undefined) return false
  if (set.type === 'mcq2') {
    const a = [...(item.answer as string[])].sort().join()
    return Array.isArray(given) && [...given].sort().join() === a
  }
  if (set.type === 'gap') {
    const g = normalize(String(given))
    if (!g) return false
    return [item.answer as string, ...(item.accepted ?? [])].some((a) => normalize(a) === g)
  }
  return given === item.answer
}

function answerText(set: QuestionSet, item: Item): string {
  const keyText = (k: string) => {
    const o = (item.options ?? set.options)?.find((x) => x.key === k)
    return o ? `${k} — ${o.text}` : k
  }
  if (set.type === 'mcq2') return (item.answer as string[]).map(keyText).join(' · ')
  if (set.type === 'match' || set.type === 'mcq') return keyText(item.answer as string)
  return String(item.answer)
}

export default function QuestionSetView({ set, number = 1, onChecked }: { set: QuestionSet; number?: number; onChecked?: (r: SetResult) => void }) {
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [checked, setChecked] = useState(false)
  const [revealed, setRevealed] = useState(false)

  const set1 = (i: number, v: string | string[]) => !checked && setAnswers((a) => ({ ...a, [i]: v }))
  const score = set.items.filter((it, i) => isRight(set, it, answers[i])).length

  function check() {
    setChecked(true)
    playSound(score === set.items.length ? 'complete' : score >= set.items.length / 2 ? 'correct' : 'wrong')
    onChecked?.({ score, total: set.items.length })
  }

  return (
    <section className="qset">
      <header className="qset-head">
        <h3>
          Questions {number}
          {set.items.length > 1 ? `–${number + set.items.length - 1}` : ''} · {set.title}
        </h3>
        <p className="qset-instruction" lang="en">
          {set.instruction}
        </p>
        {set.tip && <p className="qset-tip">💡 {set.tip}</p>}
      </header>

      {set.type === 'match' && set.options && (
        <ul className="qset-options" lang="en">
          {set.options.map((o) => (
            <li key={o.key}>
              <b>{o.key}</b> {o.text}
            </li>
          ))}
        </ul>
      )}
      {set.intro && (
        <p className="qset-intro" lang="en">
          {set.intro}
        </p>
      )}

      <ol className="qset-items" start={number}>
        {set.items.map((it, i) => {
          const given = answers[i]
          const ok = isRight(set, it, given)
          const state = checked ? (ok ? 'ok' : 'ko') : ''
          return (
            <li key={i} className={`qitem ${state}`}>
              <ItemInput set={set} item={it} given={given} locked={checked} onChange={(v) => set1(i, v)} />
              {(checked || revealed) && (
                <div className="qitem-fix">
                  {checked && <span className="qitem-mark">{ok ? '✓' : '✕'}</span>}
                  {(!ok || revealed) && (
                    <span>
                      Réponse : <b lang="en">{answerText(set, it)}</b>
                    </span>
                  )}
                  {it.why && <small>{it.why}</small>}
                  {!ok && set.wordLimit && typeof given === 'string' && countWords(given) > set.wordLimit && (
                    <small>⚠️ Trop de mots : la consigne en autorise {set.wordLimit} au maximum.</small>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ol>

      <div className="qset-foot">
        {checked ? (
          <p className="qset-score">
            {score} / {set.items.length} {score === set.items.length ? '🎉' : ''}
          </p>
        ) : (
          <>
            <button className="btn btn-secondary" onClick={() => setRevealed((r) => !r)}>
              {revealed ? 'Cacher les réponses' : 'Voir les réponses'}
            </button>
            <button className="btn btn-primary" onClick={check} disabled={revealed}>
              Vérifier
            </button>
          </>
        )}
      </div>
    </section>
  )
}

function ItemInput({ set, item, given, locked, onChange }: { set: QuestionSet; item: Item; given: string | string[] | undefined; locked: boolean; onChange: (v: string | string[]) => void }) {
  if (set.type === 'tfng' || set.type === 'ynng') {
    const labels = set.type === 'tfng' ? TFNG : YNNG
    return (
      <div className="qitem-body">
        <p lang="en">{item.q}</p>
        <div className="qchoices">
          {labels.map((l) => (
            <button key={l} className={`qchoice ${given === l ? 'on' : ''} ${locked && item.answer === l ? 'right' : ''}`} disabled={locked} onClick={() => onChange(l)}>
              {l}
            </button>
          ))}
        </div>
      </div>
    )
  }
  if (set.type === 'match') {
    return (
      <div className="qitem-body qitem-row">
        <p lang="en">{item.q}</p>
        <select value={(given as string) ?? ''} disabled={locked} onChange={(e) => onChange(e.target.value)} aria-label={`Réponse : ${item.q}`}>
          <option value="">—</option>
          {set.options?.map((o) => (
            <option key={o.key} value={o.key}>
              {o.key}
            </option>
          ))}
        </select>
      </div>
    )
  }
  if (set.type === 'mcq' || set.type === 'mcq2') {
    const multi = set.type === 'mcq2'
    const picked = multi ? ((given as string[]) ?? []) : [given as string]
    const toggle = (k: string) => {
      if (!multi) return onChange(k)
      const next = picked.includes(k) ? picked.filter((x) => x !== k) : [...picked, k].slice(-2)
      onChange(next)
    }
    return (
      <div className="qitem-body">
        <p lang="en">{item.q}</p>
        <div className="qmcq" lang="en">
          {(item.options ?? set.options ?? []).map((o) => {
            const right = locked && (multi ? (item.answer as string[]).includes(o.key) : item.answer === o.key)
            return (
              <button key={o.key} className={`qmcq-opt ${picked.includes(o.key) ? 'on' : ''} ${right ? 'right' : ''}`} disabled={locked} onClick={() => toggle(o.key)}>
                <b>{o.key}</b> {o.text}
              </button>
            )
          })}
        </div>
      </div>
    )
  }
  // gap : le texte autour du blanc, avec un champ de saisie à la place de « ___ »
  const [before, after = ''] = item.q.split('___')
  return (
    <div className="qitem-body qgap" lang="en">
      <span>{before}</span>
      <input
        value={(given as string) ?? ''}
        disabled={locked}
        onChange={(e) => onChange(e.target.value)}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        aria-label={item.q}
      />
      <span>{after}</span>
    </div>
  )
}
