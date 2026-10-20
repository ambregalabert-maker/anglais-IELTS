// Fabrique les exercices d'une leçon à partir du contenu (mots + exercices écrits à la main).
// Chaque leçon est un peu différente à chaque fois : les exercices et les options sont tirés au hasard.

import { CONTENT, WORD_BY_ID, wordId, type WordRef } from '../data/vocab'
import type { Cloze, Judge, Sentence } from '../data/vocab/types'
import { escapeRegExp, normalizeLoose, sample, shuffle } from '../lib/text'
import { labFromKey } from '../lab/engine'
import type { Difficulty } from '../store/types'
import type { ChoiceExercise, Exercise, JudgeExercise, MatchExercise, ReorderExercise, TypeExercise } from './types'

const LESSON_SIZE = 12
const EXAM_SIZE = 15

// ---------- Aides ----------

/** Toutes les traductions françaises d'un mot, pour éviter deux bonnes réponses possibles dans un QCM. */
function frSet(w: WordRef): Set<string> {
  const parts = [w.fr, ...(w.frAlt ?? [])].flatMap((f) => f.replace(/\(.*?\)/g, '').split(/[,/]/))
  return new Set(parts.map((p) => normalizeLoose(p)).filter(Boolean))
}

function overlaps(a: WordRef, b: WordRef): boolean {
  if (normalizeLoose(a.word) === normalizeLoose(b.word)) return true
  const sa = frSet(a)
  for (const x of frSet(b)) if (sa.has(x)) return true
  return false
}

/** Des mots « pièges » pour un QCM : différents de la réponse, sans traduction commune. */
function distractors(target: WordRef, pool: WordRef[], n: number): WordRef[] {
  const others = shuffle(pool.filter((w) => w.id !== target.id && !overlaps(w, target)))
  const chosen: WordRef[] = []
  for (const w of others) {
    if (chosen.length >= n) break
    if (chosen.every((c) => !overlaps(c, w))) chosen.push(w)
  }
  return chosen
}

/** Trouve le mot (ou une de ses variantes) dans l'exemple, pour en faire une phrase à trous. */
function findInExample(w: WordRef): { sentence: string; form: string } | null {
  for (const form of [w.word, ...(w.alt ?? [])]) {
    if (/[…]|\.\.\./.test(form)) continue
    const re = new RegExp(`(^|[^A-Za-z-])(${escapeRegExp(form)})(?=[^A-Za-z-]|$)`, 'i')
    const m = w.ex.match(re)
    if (m && m.index !== undefined) {
      const start = m.index + m[1].length
      return { sentence: w.ex.slice(0, start) + '___' + w.ex.slice(start + m[2].length), form: m[2] }
    }
  }
  return null
}

function wordExplanation(w: WordRef): string {
  return `${w.word} : ${w.fr} (“${w.def}”).${w.note ? ` ${w.note}` : ''}`
}

// ---------- Générateurs par type ----------

function defToWord(w: WordRef, pool: WordRef[]): ChoiceExercise {
  return {
    kind: 'choice',
    key: `w:${w.id}:def`,
    wordIds: [w.id],
    instruction: 'Quel mot correspond à cette définition ?',
    prompt: w.def,
    options: shuffle([w.word, ...distractors(w, pool, 3).map((d) => d.word)]),
    answer: w.word,
    explanation: wordExplanation(w),
  }
}

function wordToFr(w: WordRef, pool: WordRef[]): ChoiceExercise {
  return {
    kind: 'choice',
    key: `w:${w.id}:fr`,
    wordIds: [w.id],
    instruction: 'Quelle est la bonne traduction ?',
    prompt: w.word,
    speakPrompt: true,
    options: shuffle([w.fr, ...distractors(w, pool, 3).map((d) => d.fr)]),
    answer: w.fr,
    explanation: wordExplanation(w),
  }
}

function frToWord(w: WordRef, pool: WordRef[]): ChoiceExercise {
  return {
    kind: 'choice',
    key: `w:${w.id}:en`,
    wordIds: [w.id],
    instruction: 'Comment dit-on en anglais ?',
    prompt: w.fr,
    options: shuffle([w.word, ...distractors(w, pool, 3).map((d) => d.word)]),
    answer: w.word,
    explanation: wordExplanation(w),
  }
}

function exampleBank(w: WordRef, pool: WordRef[]): ChoiceExercise | null {
  const found = findInExample(w)
  if (!found) return null
  return {
    kind: 'choice',
    key: `w:${w.id}:bank`,
    wordIds: [w.id],
    instruction: 'Complète la phrase',
    sentence: found.sentence,
    options: shuffle([found.form, ...distractors(w, pool, 3).map((d) => d.word)]),
    answer: found.form,
    explanation: wordExplanation(w),
  }
}

function exampleType(w: WordRef, level: Difficulty): TypeExercise | null {
  const found = findInExample(w)
  if (!found) return null
  return {
    kind: 'type',
    key: `w:${w.id}:type`,
    wordIds: [w.id],
    instruction: 'Écris le mot qui manque',
    sentence: found.sentence,
    // Expert : indice uniquement en anglais (la définition), comme un vrai locuteur
    hint: level === 'expert' ? w.def : level === 'hard' ? w.fr : `${w.fr} · commence par « ${found.form.slice(0, 1)} »`,
    accepted: [found.form],
    answer: found.form,
    explanation: wordExplanation(w),
  }
}

function translateType(w: WordRef, level: Difficulty): TypeExercise {
  return {
    kind: 'type',
    key: `w:${w.id}:write`,
    wordIds: [w.id],
    instruction: 'Écris en anglais',
    prompt: w.fr,
    hint: level === 'expert' ? undefined : level === 'hard' ? w.pos : `${w.pos} · commence par « ${w.word.slice(0, 1)} »`,
    accepted: [w.word, ...(w.alt ?? [])],
    answer: w.word,
    explanation: wordExplanation(w),
  }
}

function match(words: WordRef[], key: string): MatchExercise | null {
  const chosen: WordRef[] = []
  for (const w of shuffle(words)) {
    if (chosen.length >= 5) break
    if (chosen.every((c) => !overlaps(c, w))) chosen.push(w)
  }
  if (chosen.length < 4) return null
  return {
    kind: 'match',
    key,
    wordIds: chosen.map((w) => w.id),
    instruction: 'Associe chaque mot à sa traduction',
    pairs: chosen.map((w) => ({ id: w.id, left: w.word, right: w.fr })),
  }
}

function cloze(c: Cloze, key: string, wordIds: string[]): ChoiceExercise {
  return {
    kind: 'choice',
    key,
    wordIds,
    instruction: c.kind === 'collocation' ? 'Trouve la bonne collocation' : c.kind === 'grammar' ? 'Choisis la bonne forme' : 'Choisis le bon mot',
    tag: c.kind === 'collocation' ? 'Collocation' : c.kind === 'grammar' ? 'Grammaire' : undefined,
    sentence: c.s,
    options: shuffle([c.a, ...c.opts]),
    answer: c.a,
    explanation: c.why,
  }
}

function judge(j: Judge, key: string): JudgeExercise {
  return { kind: 'judge', key, wordIds: [], instruction: 'Cette phrase est-elle correcte ?', sentence: j.s, ok: j.ok, fix: j.fix, explanation: j.why }
}

function tokens(s: string): string[] {
  return s
    .replace(/[.,!?;:]+(?=\s|$)/g, '')
    .split(/\s+/)
    .filter(Boolean)
}

function reorder(s: Sentence, others: Sentence[], key: string, decoyCount: number): ReorderExercise {
  const own = tokens(s.en)
  const ownLower = new Set(own.map((t) => t.toLowerCase()))
  const extra = shuffle(others.flatMap((o) => tokens(o.en)).filter((t) => !ownLower.has(t.toLowerCase()) && t.length > 2))
  const decoys = [...new Set(extra)].slice(0, decoyCount)
  return {
    kind: 'reorder',
    key,
    wordIds: [],
    instruction: 'Traduis cette phrase',
    prompt: s.fr,
    tiles: shuffle([...own, ...decoys]),
    answer: s.en,
  }
}

function sentenceToFr(s: Sentence, others: Sentence[], key: string): ChoiceExercise | null {
  const wrong = sample(others.filter((o) => o.fr !== s.fr), 2).map((o) => o.fr)
  if (wrong.length < 2) return null
  return {
    kind: 'choice',
    key,
    wordIds: [],
    instruction: 'Quelle est la bonne traduction ?',
    prompt: s.en,
    speakPrompt: true,
    options: shuffle([s.fr, ...wrong]),
    answer: s.fr,
  }
}

// ---------- Assemblage d'une leçon ----------

interface Pools {
  unitId: string
  words: WordRef[] // mots travaillés dans cette leçon
  pool: WordRef[] // mots de toute l'unité (pour les options pièges)
  cloze: { item: Cloze; key: string }[]
  judge: { item: Judge; key: string }[]
  sentences: { item: Sentence; key: string }[]
  allSentences: Sentence[]
}

function pools(unitId: string, lessonIndexes: number[]): Pools {
  const unit = CONTENT[unitId]
  const all = unit.lessons.flatMap((l, li) => l.words.map((w) => ({ ...w, id: wordId(unitId, w), unitId, lessonIndex: li })))
  const p: Pools = { unitId, words: [], pool: all, cloze: [], judge: [], sentences: [], allSentences: unit.lessons.flatMap((l) => l.sentences ?? []) }
  for (const li of lessonIndexes) {
    const l = unit.lessons[li]
    p.words.push(...all.filter((w) => w.lessonIndex === li))
    l.cloze?.forEach((item, i) => p.cloze.push({ item, key: `${unitId}:${li}:cloze:${i}` }))
    l.judge?.forEach((item, i) => p.judge.push({ item, key: `${unitId}:${li}:judge:${i}` }))
    l.sentences?.forEach((item, i) => p.sentences.push({ item, key: `${unitId}:${li}:sent:${i}` }))
  }
  return p
}

/** Mots de la phrase à trous qui correspondent à des mots de la leçon (pour le suivi). */
function relatedWords(text: string, words: WordRef[]): string[] {
  const t = text.toLowerCase()
  return words.filter((w) => t.includes(w.word.toLowerCase())).map((w) => w.id)
}

type Slot = 'match' | 'def' | 'fr' | 'en' | 'bank' | 'type' | 'write' | 'cloze' | 'judge' | 'reorder' | 'sentFr'

const PLANS: Record<Difficulty, { lesson: Slot[]; exam: Slot[] }> = {
  normal: {
    lesson: ['match', 'fr', 'def', 'bank', 'cloze', 'judge', 'en', 'reorder', 'cloze', 'type', 'sentFr', 'judge', 'write'],
    exam: ['match', 'def', 'fr', 'bank', 'cloze', 'judge', 'en', 'type', 'reorder', 'cloze', 'def', 'judge', 'write', 'sentFr', 'match', 'bank', 'cloze'],
  },
  // Mode difficile : surtout des réponses à produire soi-même (taper, traduire, remettre en ordre)
  hard: {
    lesson: ['bank', 'write', 'cloze', 'type', 'judge', 'reorder', 'write', 'cloze', 'type', 'en', 'judge', 'write', 'reorder'],
    exam: ['write', 'type', 'cloze', 'judge', 'reorder', 'write', 'bank', 'type', 'cloze', 'write', 'judge', 'reorder', 'type', 'en', 'cloze', 'write', 'def'],
  },
  // Mode expert (objectif C2) : presque tout à taper, indices en anglais seulement, plus de pièges
  expert: {
    lesson: ['type', 'write', 'cloze', 'judge', 'reorder', 'type', 'write', 'cloze', 'judge', 'write', 'type', 'reorder', 'write'],
    exam: ['write', 'type', 'cloze', 'judge', 'reorder', 'write', 'type', 'cloze', 'judge', 'write', 'type', 'reorder', 'write', 'cloze', 'type', 'judge', 'write'],
  },
}

const DECOYS: Record<Difficulty, number> = { normal: 2, hard: 4, expert: 5 }

function build(p: Pools, plan: Slot[], size: number, level: Difficulty): Exercise[] {
  const wordQueue = shuffle(p.words)
  let wi = 0
  const nextWord = () => wordQueue[wi++ % wordQueue.length]
  const clozes = shuffle(p.cloze)
  const judges = shuffle(p.judge)
  const sents = shuffle(p.sentences)
  const out: Exercise[] = []
  const used = new Set<string>()

  const make = (slot: Slot): Exercise | null => {
    switch (slot) {
      case 'match':
        return match(sample(p.words, 8), `match:${p.unitId}:${out.length}`)
      case 'def':
        return defToWord(nextWord(), p.pool)
      case 'fr':
        return wordToFr(nextWord(), p.pool)
      case 'en':
        return frToWord(nextWord(), p.pool)
      case 'bank':
        return exampleBank(nextWord(), p.pool)
      case 'type':
        return exampleType(nextWord(), level)
      case 'write':
        return translateType(nextWord(), level)
      case 'cloze': {
        const c = clozes.shift()
        return c ? cloze(c.item, c.key, relatedWords(c.item.s + ' ' + c.item.a, p.pool)) : null
      }
      case 'judge': {
        const j = judges.shift()
        return j ? judge(j.item, j.key) : null
      }
      case 'reorder': {
        const s = sents.shift()
        return s ? reorder(s.item, p.allSentences.filter((o) => o !== s.item), s.key + ':order', DECOYS[level]) : null
      }
      case 'sentFr': {
        const s = sents.shift()
        return s ? sentenceToFr(s.item, p.allSentences.filter((o) => o !== s.item), s.key + ':fr') : null
      }
    }
  }

  for (const slot of plan) {
    if (out.length >= size) break
    // Plusieurs essais : un générateur peut échouer (pas d'exemple exploitable, plus d'items…)
    for (let attempt = 0; attempt < 4; attempt++) {
      const ex = make(attempt < 2 ? slot : attempt === 2 ? 'def' : 'fr')
      if (ex && !used.has(ex.key)) {
        used.add(ex.key)
        out.push(ex)
        break
      }
    }
  }
  return out
}

/** Les exercices d'une leçon (index 0, 1, 2…) ou de l'évaluation de fin d'unité (`'exam'`). */
export function buildLesson(unitId: string, lesson: number | 'exam', difficulty: Difficulty = 'normal'): Exercise[] {
  const unit = CONTENT[unitId]
  if (!unit) return []
  const plan = PLANS[difficulty]
  if (lesson === 'exam') return build(pools(unitId, unit.lessons.map((_, i) => i)), plan.exam, EXAM_SIZE, difficulty)
  return build(pools(unitId, [lesson]), plan.lesson, LESSON_SIZE, difficulty)
}

// ---------- Révisions ----------

const allPools: Record<string, Pools> = {}
function unitPools(unitId: string): Pools | null {
  const unit = CONTENT[unitId]
  if (!unit) return null
  allPools[unitId] ??= pools(unitId, unit.lessons.map((_, i) => i))
  return allPools[unitId]
}

type WordSlot = 'def' | 'fr' | 'en' | 'bank' | 'type' | 'write'

function wordExercise(w: WordRef, slot: WordSlot, level: Difficulty): Exercise | null {
  const pool = unitPools(w.unitId)?.pool ?? [w]
  switch (slot) {
    case 'def':
      return defToWord(w, pool)
    case 'fr':
      return wordToFr(w, pool)
    case 'en':
      return frToWord(w, pool)
    case 'bank':
      return exampleBank(w, pool)
    case 'type':
      return exampleType(w, level)
    case 'write':
      return translateType(w, level)
  }
}

/**
 * Exercice de révision pour un mot : plus le mot est maîtrisé (boîte haute),
 * plus on demande de le produire soi-même plutôt que de le reconnaître.
 */
export function reviewExercise(w: WordRef, box: number, level: Difficulty): Exercise {
  const production = level === 'expert' ? 0.9 : level === 'hard' ? 0.7 : Math.min(0.8, 0.2 + box * 0.15)
  const order: WordSlot[] =
    Math.random() < production ? shuffle<WordSlot>(['write', 'type']) : shuffle<WordSlot>(['fr', 'def', 'en', 'bank'])
  for (const slot of [...order, 'fr' as WordSlot]) {
    const ex = wordExercise(w, slot, level)
    if (ex) return { ...ex, key: `w:${w.id}:${slot}` }
  }
  return wordToFr(w, [w])
}

/** Recrée un exercice à partir de sa clé (séance « Mes erreurs »). */
export function exerciseFromKey(key: string, level: Difficulty): Exercise | null {
  if (key.startsWith('lab:')) return labFromKey(key, level)
  if (key.startsWith('w:')) {
    const [, id, slot] = key.match(/^w:(.+):([a-z]+)$/) ?? []
    const w = WORD_BY_ID[id]
    if (!w) return null
    const s = (['def', 'fr', 'en', 'bank', 'type', 'write'].includes(slot) ? slot : 'fr') as WordSlot
    return wordExercise(w, s, level) ?? wordToFr(w, unitPools(w.unitId)?.pool ?? [w])
  }
  const [unitId, li, kind, i, variant] = key.split(':')
  const lesson = CONTENT[unitId]?.lessons[Number(li)]
  const p = unitPools(unitId)
  if (!lesson || !p) return null
  const idx = Number(i)
  if (kind === 'cloze' && lesson.cloze?.[idx]) {
    const c = lesson.cloze[idx]
    return cloze(c, key, relatedWords(c.s + ' ' + c.a, p.pool))
  }
  if (kind === 'judge' && lesson.judge?.[idx]) return judge(lesson.judge[idx], key)
  if (kind === 'sent' && lesson.sentences?.[idx]) {
    const s = lesson.sentences[idx]
    const others = p.allSentences.filter((o) => o !== s)
    return variant === 'fr' ? sentenceToFr(s, others, key) : reorder(s, others, key, DECOYS[level])
  }
  return null
}
