// Fabrique les exercices du Vocab Lab. Chaque exercice a une clé stable (lab:…)
// pour pouvoir être recréé dans « Mes erreurs ».

import { COLLOCATIONS, IDIOMS, PARAPHRASES, REGISTER, SPELLING, UPGRADES, type Idiom } from '../data/lab/content'
import { FAMILIES } from '../data/lab/families'
import { CONTENT } from '../data/vocab'
import type { Cloze } from '../data/vocab/types'
import type { Exercise } from '../lesson/types'
import { sample, shuffle } from '../lib/text'
import type { Difficulty } from '../store/types'

export type LabMode = 'families' | 'collocations' | 'paraphrase' | 'upgrade' | 'register' | 'idioms' | 'spelling' | 'mix'

export interface LabModeInfo {
  id: LabMode
  title: string
  description: string
  icon: string
  color: string
}

export const LAB_MODES: LabModeInfo[] = [
  { id: 'families', title: 'Familles de mots', description: 'decide → decision → decisive → decisively', icon: '🌳', color: '#2fbf71' },
  { id: 'collocations', title: 'Collocations', description: 'Les mots qui vont ensemble : pose a threat, raise awareness…', icon: '🧲', color: '#6c4cf5' },
  { id: 'paraphrase', title: 'Paraphrase', description: 'Reconnaître le même sens dit autrement (Writing et Listening)', icon: '🔁', color: '#36b5ff' },
  { id: 'upgrade', title: 'Synonymes par niveau', description: 'good → beneficial, bad → detrimental…', icon: '📈', color: '#ff9a4d' },
  { id: 'register', title: 'Registre formel', description: 'kids → children, lots of → a great deal of', icon: '🎩', color: '#33b5a5' },
  { id: 'idioms', title: 'Expressions idiomatiques', description: 'Leur sens, et quand les utiliser (oral ou essai)', icon: '💬', color: '#ff5d8f' },
  { id: 'spelling', title: 'Orthographe', description: 'accommodation, environment, government…', icon: '✏️', color: '#e8a400' },
  { id: 'mix', title: 'Mélange', description: 'Un peu de tout, pour réviser', icon: '🎲', color: '#a64cf5' },
]

const SIZE = 12

// Collocations : celles du Lab + toutes celles des unités du chemin
const ALL_COLLOCATIONS: Cloze[] = [
  ...COLLOCATIONS,
  ...Object.values(CONTENT).flatMap((u) => u.lessons.flatMap((l) => (l.cloze ?? []).filter((c) => c.kind === 'collocation'))),
]

// Expressions : celles du Lab + les « idioms » des unités du chemin
const ALL_IDIOMS: Idiom[] = [
  ...IDIOMS,
  ...Object.values(CONTENT).flatMap((u) =>
    u.lessons.flatMap((l) =>
      l.words
        .filter((w) => w.pos === 'idiom' && !IDIOMS.some((i) => i.word === w.word || i.fr === w.fr || i.word.includes(w.word)))
        .map((w) => ({ ...w, register: (w.note?.includes('oral') ? 'spoken' : 'neutral') as Idiom['register'] })),
    ),
  ),
]

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function family(fi: number, ii: number, level: Difficulty): Exercise | null {
  const f = FAMILIES[fi]
  const item = f?.items[ii]
  if (!item) return null
  const key = `lab:fam:${fi}:${ii}`
  const startsSentence = item.s.startsWith('___')
  if (level !== 'normal') {
    return {
      kind: 'type',
      key,
      wordIds: [],
      instruction: 'Écris la bonne forme du mot',
      sentence: item.s,
      hint: `famille de « ${f.root} »`,
      accepted: [item.a],
      answer: item.a,
      explanation: `Famille : ${f.forms.join(' · ')}.`,
    }
  }
  const forms = f.forms.filter((x) => x.toLowerCase() !== item.a.toLowerCase())
  const options = shuffle([item.a, ...sample(forms, 3).map((x) => (startsSentence ? cap(x) : x))])
  return {
    kind: 'choice',
    key,
    wordIds: [],
    instruction: 'Choisis la bonne forme du mot',
    tag: `Famille de « ${f.root} »`,
    sentence: item.s,
    options,
    answer: item.a,
    explanation: `Famille : ${f.forms.join(' · ')}.`,
  }
}

function collocation(i: number, level: Difficulty): Exercise | null {
  const c = ALL_COLLOCATIONS[i]
  if (!c) return null
  const key = `lab:col:${i}`
  if (level === 'expert' && !c.a.includes(' ')) {
    return { kind: 'type', key, wordIds: [], instruction: 'Complète la collocation', sentence: c.s, hint: 'Un seul mot', accepted: [c.a], answer: c.a, explanation: c.why }
  }
  return { kind: 'choice', key, wordIds: [], instruction: 'Trouve la bonne collocation', tag: 'Collocation', sentence: c.s, options: shuffle([c.a, ...c.opts]), answer: c.a, explanation: c.why }
}

function paraphrase(i: number): Exercise | null {
  const p = PARAPHRASES[i]
  if (!p) return null
  return {
    kind: 'choice',
    key: `lab:para:${i}`,
    wordIds: [],
    instruction: 'Quelle phrase a le même sens ?',
    prompt: p.original,
    speakPrompt: true,
    options: shuffle([p.correct, ...p.wrong]),
    answer: p.correct,
    explanation: p.why,
  }
}

function upgrade(i: number): Exercise | null {
  const u = UPGRADES[i]
  if (!u) return null
  // [mot] ou [mot] … [suite] : on remplace la première partie par le trou et on retire les crochets restants
  let first = true
  const sentence = u.s.replace(/\[[^\]]*\]/g, () => {
    if (first) {
      first = false
      return '___'
    }
    return ''
  }).replace(/\s+([.,])/g, '$1').replace(/\s{2,}/g, ' ')
  return {
    kind: 'choice',
    key: `lab:up:${i}`,
    wordIds: [],
    instruction: 'Remplace le mot simple par un mot plus précis',
    tag: `Au lieu de « ${u.basic} »`,
    sentence,
    options: shuffle([u.a, ...u.opts]),
    answer: u.a,
    explanation: u.why,
  }
}

function register(i: number): Exercise | null {
  const r = REGISTER[i]
  if (!r) return null
  return {
    kind: 'choice',
    key: `lab:reg:${i}`,
    wordIds: [],
    instruction: 'Choisis la version adaptée à un essai',
    tag: `Familier : « ${r.informal} »`,
    sentence: r.s,
    options: shuffle([r.a, ...r.opts]),
    answer: r.a,
    explanation: r.why,
  }
}

function idiom(i: number, variant: string): Exercise | null {
  const w = ALL_IDIOMS[i]
  if (!w) return null
  const key = `lab:idm:${variant}:${i}`
  // Pièges : d'autres expressions, avec des traductions toutes différentes
  const others = ALL_IDIOMS.filter((o, idx, all) => o.word !== w.word && o.fr !== w.fr && all.findIndex((x) => x.fr === o.fr) === idx)
  const why = `${w.word} : ${w.fr} (“${w.def}”). ${w.register === 'spoken' ? 'À garder pour l’oral (Speaking).' : 'Acceptable aussi dans un essai.'}`
  if (variant === 'essay') {
    return {
      kind: 'judge',
      key,
      wordIds: [],
      instruction: 'Peut-on l’utiliser dans un essai académique ?',
      sentence: w.ex,
      ok: w.register === 'neutral',
      explanation: why,
    }
  }
  if (variant === 'fr') {
    return {
      kind: 'choice',
      key,
      wordIds: [],
      instruction: 'Que veut dire cette expression ?',
      prompt: w.word,
      speakPrompt: true,
      options: shuffle([w.fr, ...sample(others, 3).map((o) => o.fr)]),
      answer: w.fr,
      explanation: why,
    }
  }
  return {
    kind: 'choice',
    key,
    wordIds: [],
    instruction: 'Quelle expression correspond ?',
    prompt: w.def,
    options: shuffle([w.word, ...sample(others, 3).map((o) => o.word)]),
    answer: w.word,
    explanation: why,
  }
}

function spelling(i: number, variant: string): Exercise | null {
  const sp = SPELLING[i]
  if (!sp) return null
  const key = `lab:spl:${variant}:${i}`
  if (variant === 'dictation') {
    return {
      kind: 'type',
      key,
      wordIds: [],
      instruction: 'Écoute et écris le mot',
      speak: sp.word,
      prompt: sp.fr,
      accepted: [sp.word],
      answer: sp.word,
      strict: true,
      explanation: `Orthographe : ${sp.word} (et non ${sp.wrong[0]}).`,
    }
  }
  return {
    kind: 'choice',
    key,
    wordIds: [],
    instruction: 'Quelle est la bonne orthographe ?',
    prompt: sp.fr,
    options: shuffle([sp.word, ...sp.wrong]),
    answer: sp.word,
    explanation: `Retiens : ${sp.word}.`,
  }
}

/** Recrée un exercice du Lab à partir de sa clé (« Mes erreurs »). */
export function labFromKey(key: string, level: Difficulty): Exercise | null {
  const [, kind, a, b] = key.split(':')
  switch (kind) {
    case 'fam':
      return family(Number(a), Number(b), level)
    case 'col':
      return collocation(Number(a), level)
    case 'para':
      return paraphrase(Number(a))
    case 'up':
      return upgrade(Number(a))
    case 'reg':
      return register(Number(a))
    case 'idm':
      return idiom(Number(b), a)
    case 'spl':
      return spelling(Number(b), a)
  }
  return null
}

function randomOf(mode: Exclude<LabMode, 'mix'>, level: Difficulty): Exercise | null {
  const r = (n: number) => Math.floor(Math.random() * n)
  switch (mode) {
    case 'families': {
      const fi = r(FAMILIES.length)
      return family(fi, r(FAMILIES[fi].items.length), level)
    }
    case 'collocations':
      return collocation(r(ALL_COLLOCATIONS.length), level)
    case 'paraphrase':
      return paraphrase(r(PARAPHRASES.length))
    case 'upgrade':
      return upgrade(r(UPGRADES.length))
    case 'register':
      return register(r(REGISTER.length))
    case 'idioms':
      return idiom(r(ALL_IDIOMS.length), ['essay', 'fr', 'def'][r(3)])
    case 'spelling':
      return spelling(r(SPELLING.length), level === 'normal' ? (Math.random() < 0.3 ? 'dictation' : 'choice') : 'dictation')
  }
}

const SIMPLE_MODES: Exclude<LabMode, 'mix'>[] = ['families', 'collocations', 'paraphrase', 'upgrade', 'register', 'idioms', 'spelling']

/** Un exercice du Lab au hasard (sert aussi au mode Tryhard). */
export function randomLabExercise(level: Difficulty, mode: LabMode = 'mix'): Exercise | null {
  const m = mode === 'mix' ? SIMPLE_MODES[Math.floor(Math.random() * SIMPLE_MODES.length)] : mode
  return randomOf(m, level)
}

export function buildLab(mode: LabMode, level: Difficulty): Exercise[] {
  const out: Exercise[] = []
  const seen = new Set<string>()
  for (let tries = 0; out.length < SIZE && tries < 200; tries++) {
    const ex = randomLabExercise(level, mode)
    if (ex && !seen.has(ex.key)) {
      seen.add(ex.key)
      out.push(ex)
    }
  }
  return out
}

export const LAB_COUNTS = {
  families: FAMILIES.reduce((n, f) => n + f.items.length, 0),
  collocations: ALL_COLLOCATIONS.length,
  paraphrase: PARAPHRASES.length,
  upgrade: UPGRADES.length,
  register: REGISTER.length,
  idioms: ALL_IDIOMS.length,
  spelling: SPELLING.length,
}
