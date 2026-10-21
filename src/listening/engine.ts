// Exercices du module Listening. Clés « lis:… » pour les retrouver dans « Mes erreurs ».
// Les dictées sont générées au hasard (pas besoin de les recréer à l'identique).

import { ANSWER_TYPES, LIMITS, MONTHS, PREDICT, SPOTS, STREETS, SURNAMES, TRAPS, type AnswerType } from '../data/listening'
import type { Exercise } from '../lesson/types'
import { sample, shuffle } from '../lib/text'

export type ListeningMode = 'predict' | 'spot' | 'traps' | 'limits' | 'dictation' | 'mix'

export const LISTENING_MODES: { id: ListeningMode; title: string; description: string; icon: string; color: string }[] = [
  { id: 'predict', title: 'Prédire la réponse', description: 'Nombre, date, nom propre, pluriel… avant même d’écouter', icon: '🔮', color: '#6c4cf5' },
  { id: 'spot', title: 'Repérer la paraphrase', description: 'La question dit X, l’audio le dit autrement', icon: '🔍', color: '#36b5ff' },
  { id: 'traps', title: 'Éviter les pièges', description: '« Tuesday… oh sorry, Thursday » : la réponse corrigée', icon: '🪤', color: '#ff5d8f' },
  { id: 'limits', title: 'Respecter la consigne', description: 'NO MORE THAN TWO WORDS AND/OR A NUMBER', icon: '📏', color: '#e8a400' },
  { id: 'dictation', title: 'Dictées : noms et nombres', description: 'Noms épelés, téléphones, dates, prix, heures', icon: '🎧', color: '#2fbf71' },
  { id: 'mix', title: 'Mélange', description: 'Un peu de tout', icon: '🎲', color: '#a64cf5' },
]

const TYPE_FR: Record<AnswerType, string> = {
  'a number': 'un nombre',
  'a date': 'une date',
  'a time': 'une heure',
  'a price': 'un prix',
  'a name or place (proper noun)': 'un nom propre (personne, lieu)',
  'a plural noun': 'un nom au pluriel',
  'a singular noun': 'un nom au singulier',
  'an adjective': 'un adjectif',
  'a verb': 'un verbe',
}
const NUMERIC: AnswerType[] = ['a number', 'a date', 'a time', 'a price']

function predict(i: number): Exercise | null {
  const p = PREDICT[i]
  if (!p) return null
  // Pièges : pas deux réponses « numériques » proches (ex. nombre / prix) pour éviter l'ambiguïté
  const pool = ANSWER_TYPES.filter((t) => t !== p.answer && !(NUMERIC.includes(p.answer) && NUMERIC.includes(t)))
  const options = shuffle([p.answer, ...sample(pool, 3)]).map((t) => TYPE_FR[t])
  return {
    kind: 'choice',
    key: `lis:pred:${i}`,
    wordIds: [],
    instruction: 'Quel type de réponse faut-il ?',
    tag: `${p.format} · ${p.context}`,
    sentence: p.gap,
    options,
    answer: TYPE_FR[p.answer],
    explanation: p.why,
  }
}

function spot(i: number): Exercise | null {
  const s = SPOTS[i]
  if (!s) return null
  return {
    kind: 'choice',
    key: `lis:spot:${i}`,
    wordIds: [],
    instruction: 'Quelle phrase de l’audio répond à la question ?',
    prompt: s.question,
    speakPrompt: true,
    options: shuffle(s.transcript),
    answer: s.transcript[s.answer],
    explanation: s.why,
  }
}

function trap(i: number): Exercise | null {
  const t = TRAPS[i]
  if (!t) return null
  return {
    kind: 'choice',
    key: `lis:trap:${i}`,
    wordIds: [],
    instruction: 'Écoute bien jusqu’au bout : quelle est la réponse ?',
    prompt: t.transcript,
    speakPrompt: true,
    sentence: t.gap,
    options: shuffle(t.options),
    answer: t.answer,
    explanation: t.why,
  }
}

function limit(i: number): Exercise | null {
  const l = LIMITS[i]
  if (!l) return null
  return {
    kind: 'judge',
    key: `lis:lim:${i}`,
    wordIds: [],
    instruction: `Consigne : ${l.instruction}. Cette réponse est-elle valide ?`,
    sentence: l.answer,
    ok: l.valid,
    explanation: l.why,
  }
}

// ---------- Dictées générées ----------

const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)]
const rand = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1))

function ordinal(n: number): string {
  if (n % 10 === 1 && n !== 11) return `${n}st`
  if (n % 10 === 2 && n !== 12) return `${n}nd`
  if (n % 10 === 3 && n !== 13) return `${n}rd`
  return `${n}th`
}

function spokenDigits(digits: string): string {
  // « oh » pour zéro, « double » pour deux chiffres identiques, comme à l'examen
  const out: string[] = []
  for (let i = 0; i < digits.length; i++) {
    const d = digits[i] === '0' ? 'oh' : digits[i]
    if (digits[i + 1] === digits[i]) {
      out.push(`double ${d}`)
      i++
    } else out.push(d)
  }
  return out.join(' ')
}

type DictKind = 'name' | 'phone' | 'date' | 'price' | 'time' | 'address'
const DICT_KINDS: DictKind[] = ['name', 'phone', 'date', 'price', 'time', 'address']

// Numéros de téléphone fixes (toujours les mêmes) : chaque dictée a son enregistrement audio
const PHONES = Array.from({ length: 40 }, (_, i) => {
  let x = 1234567 + i * 7919
  return `07${Array.from({ length: 9 }, () => ((x = (x * 1103515245 + 12345) % 2147483648), Math.floor(x / 65536) % 10)).join('')}`
})
const HOUSE_NUMBERS = [2, 7, 12, 14, 19, 23, 28, 31, 36, 40, 47, 52, 58, 63, 71, 76, 84, 90, 105, 118]
const PENCE = [0, 25, 50, 75, 99]

/** Toutes les dictées possibles d'un type (sert aussi à générer l'audio). */
export function dictationsOf(kind: DictKind): Exercise[] {
  const base = { kind: 'type' as const, wordIds: [], instruction: 'Écoute et écris ce que tu entends', strict: true }
  switch (kind) {
    case 'name':
      return SURNAMES.map((n) => ({ ...base, key: `lis:dict:name:${n}`, speak: `My surname is ${n}. That's ${n.toUpperCase().split('').join(', ')}.`, prompt: 'Nom de famille (épelé)', accepted: [n], answer: n, explanation: `Épellation : ${n.toUpperCase().split('').join('-')}.` }))
    case 'phone':
      return PHONES.map((digits) => {
        const spoken = `${spokenDigits(digits.slice(0, 5))}, ${spokenDigits(digits.slice(5))}`
        return { ...base, key: `lis:dict:phone`, speak: `My number is ${spoken}.`, prompt: 'Numéro de téléphone', accepted: [digits], answer: digits, compact: true, explanation: '« oh » = 0, « double 4 » = 44.' }
      })
    case 'date':
      return MONTHS.flatMap((m) =>
        Array.from({ length: 28 }, (_, i) => i + 1).map((d) => ({ ...base, strict: false, key: `lis:dict:date`, speak: `The course starts on the ${ordinal(d)} of ${m}.`, prompt: 'Date', accepted: [`${d} ${m}`, `${ordinal(d)} ${m}`, `${m} ${d}`, `${m} ${ordinal(d)}`, `the ${ordinal(d)} of ${m}`], answer: `${d} ${m}`, explanation: `Écris simplement : ${d} ${m} (ou ${ordinal(d)} ${m}). Attention à l’orthographe du mois.` })),
      )
    case 'price':
      return Array.from({ length: 92 }, (_, i) => i + 4).flatMap((pounds) =>
        PENCE.map((pence) => {
          const value = pence ? `${pounds}.${String(pence).padStart(2, '0')}` : `${pounds}`
          return { ...base, key: `lis:dict:price`, speak: `It costs £${value}.`, prompt: 'Prix (en £)', accepted: [value, `£${value}`, ...(pence ? [] : [`${pounds}.00`, `£${pounds}.00`])], answer: `£${value}`, compact: true, explanation: 'Écris le prix en chiffres.' }
        }),
      )
    case 'time':
      return Array.from({ length: 11 }, (_, i) => i + 1).flatMap((h) =>
        [0, 15, 30, 45].map((m) => {
          const spoken = m === 0 ? `${h} o'clock` : m === 15 ? `a quarter past ${h}` : m === 30 ? `half past ${h}` : `a quarter to ${h + 1}`
          const mm = String(m).padStart(2, '0')
          return { ...base, key: `lis:dict:time`, speak: `The bus leaves at ${spoken}.`, prompt: 'Heure (ex. 7.30)', accepted: [`${h}.${mm}`, `${h}:${mm}`, ...(m === 0 ? [`${h}`, `${h} o'clock`] : [])], answer: `${h}.${mm}`, compact: true, explanation: `« ${spoken} » = ${h}.${mm}.` }
        }),
      )
    case 'address':
      return STREETS.flatMap((st) =>
        HOUSE_NUMBERS.map((num) => ({ ...base, key: `lis:dict:addr`, speak: `The address is ${num} ${st}.`, prompt: 'Adresse', accepted: [`${num} ${st}`], answer: `${num} ${st}`, explanation: 'Majuscules aux noms de rues, et vérifie l’orthographe.' })),
      )
  }
}

export function allDictations(): Exercise[] {
  return DICT_KINDS.flatMap(dictationsOf)
}

function dictation(): Exercise {
  return pick(dictationsOf(pick(DICT_KINDS)))
}

export function listeningFromKey(key: string): Exercise | null {
  const [, kind, a] = key.split(':')
  switch (kind) {
    case 'pred':
      return predict(Number(a))
    case 'spot':
      return spot(Number(a))
    case 'trap':
      return trap(Number(a))
    case 'lim':
      return limit(Number(a))
    case 'dict':
      return dictation()
  }
  return null
}

const SIMPLE: Exclude<ListeningMode, 'mix'>[] = ['predict', 'spot', 'traps', 'limits', 'dictation']

export function randomListeningExercise(mode: ListeningMode = 'mix'): Exercise | null {
  const m = mode === 'mix' ? pick(SIMPLE) : mode
  switch (m) {
    case 'predict':
      return predict(rand(0, PREDICT.length - 1))
    case 'spot':
      return spot(rand(0, SPOTS.length - 1))
    case 'traps':
      return trap(rand(0, TRAPS.length - 1))
    case 'limits':
      return limit(rand(0, LIMITS.length - 1))
    case 'dictation':
      return dictation()
  }
}

export function buildListening(mode: ListeningMode, size = 10): Exercise[] {
  const out: Exercise[] = []
  const seen = new Set<string>()
  for (let i = 0; out.length < size && i < 300; i++) {
    const ex = randomListeningExercise(mode)
    if (!ex) continue
    // Les dictées peuvent se répéter (elles sont différentes à chaque fois)
    const k = ex.key.startsWith('lis:dict') ? `${ex.key}:${i}` : ex.key
    if (!seen.has(k)) {
      seen.add(k)
      out.push(ex)
    }
  }
  return out
}
