// Les paquets de l'espace Flashcards : mots du chemin (avec répétition espacée), et outils IELTS
// (collocations, registre, expressions…). Une carte « mot » se lit dans les deux sens ;
// une carte « rappel » montre un indice au recto et la réponse au verso.

import { COLLOCATIONS, IDIOMS, PARAPHRASES, REGISTER, UPGRADES } from '../data/lab/content'
import { UNITS } from '../data/units'
import { ALL_WORDS, unitWords, type WordRef } from '../data/vocab'
import type { Level } from '../data/vocab/types'
import { PRONUNCIATION, pronSay } from '../data/speaking'
import { slug } from '../lib/text'
import type { Progress } from '../store/types'
import { dueWords, weakWords } from './data'

export interface Card {
  id: string
  en: string // le mot ou la réponse en anglais
  fr?: string // traduction ou sens
  cue?: string // carte « rappel » : indice affiché au recto
  pos?: string
  def?: string
  ex?: string
  col?: string[]
  note?: string
  wordId?: string // carte liée à un mot du chemin (répétition espacée)
  say?: string // ce qui est prononcé, si différent de `en`
}

export type Deck =
  | 'due'
  | 'hard'
  | 'seen'
  | 'new'
  | 'fav'
  | `unit:${string}`
  | `level:${Level}`
  | 'idioms'
  | 'colloc'
  | 'upgrade'
  | 'register'
  | 'paraphrase'
  | 'pron'

const fromWord = (w: WordRef): Card => ({ id: w.id, en: w.word, fr: w.fr, pos: w.pos, def: w.def, ex: w.ex, col: w.col, note: w.note, wordId: w.id })

const short = (s: string) => slug(s).slice(0, 40)

export const TOOL_CARDS: Record<'idioms' | 'colloc' | 'upgrade' | 'register' | 'paraphrase' | 'pron', Card[]> = {
  idioms: IDIOMS.map((w) => ({ id: `idiom:${short(w.word)}`, en: w.word, fr: w.fr, pos: w.pos, def: w.def, ex: w.ex, note: w.register === 'spoken' ? 'Plutôt à l’oral (Speaking), pas dans un essai.' : w.note })),
  colloc: COLLOCATIONS.map((c) => ({ id: `col:${short(c.s)}`, cue: c.s, en: c.a, ex: c.s.replace('___', c.a), note: c.why })),
  upgrade: UPGRADES.map((u) => ({ id: `up:${short(u.s)}`, cue: `Plus précis que « ${u.basic} » : ${u.s.replace(/\[[^\]]+\]/, '___')}`, en: u.a, ex: u.s.replace(/\[[^\]]+\]/, u.a), note: u.why })),
  register: REGISTER.map((r) => ({ id: `reg:${short(r.s)}`, cue: `Version soutenue de « ${r.informal} » : ${r.s}`, en: r.a, ex: r.s.replace('___', r.a), note: r.why })),
  paraphrase: PARAPHRASES.map((p) => ({ id: `para:${short(p.original)}`, cue: `Reformule : ${p.original}`, en: p.correct, note: p.why })),
  pron: PRONUNCIATION.flatMap((g) => g.pairs.map((pair) => ({ id: `pron:${short(pair)}`, cue: `${g.title} : écoute et répète`, en: pair, say: pronSay(pair), note: g.tip }))),
}

export function deckCards(p: Progress, deck: Deck): Card[] {
  if (deck in TOOL_CARDS) return TOOL_CARDS[deck as keyof typeof TOOL_CARDS]
  if (deck === 'fav') {
    const all = [...ALL_WORDS.map(fromWord), ...Object.values(TOOL_CARDS).flat()]
    return all.filter((c) => p.favorites.includes(c.id))
  }
  return deckWords(p, deck).map(fromWord)
}

function deckWords(p: Progress, deck: Deck): WordRef[] {
  if (deck === 'due') return dueWords(p)
  if (deck === 'hard') return weakWords(p).filter((w) => (p.words[w.id]?.wrong ?? 0) > 0)
  if (deck === 'seen') return ALL_WORDS.filter((w) => p.words[w.id])
  if (deck === 'new') return ALL_WORDS.filter((w) => !p.words[w.id])
  if (deck.startsWith('level:')) return ALL_WORDS.filter((w) => w.level === deck.slice(6))
  if (deck.startsWith('unit:')) return unitWords(deck.slice(5))
  return []
}

/** Vrai si les cartes de ce paquet se lisent dans les deux sens (mot ↔ traduction). */
export function isTranslationDeck(deck: Deck): boolean {
  return !['colloc', 'upgrade', 'register', 'paraphrase', 'pron'].includes(deck)
}

export function deckTitle(deck: Deck): string {
  const titles: Record<string, string> = {
    due: 'Mots à revoir',
    hard: 'Mots difficiles',
    seen: 'Tous mes mots',
    new: 'Mots jamais vus',
    fav: 'Mes favoris',
    idioms: 'Expressions idiomatiques',
    colloc: 'Collocations',
    upgrade: 'Mots plus précis',
    register: 'Registre soutenu',
    paraphrase: 'Paraphrases',
    pron: 'Prononciation',
  }
  if (titles[deck]) return titles[deck]
  if (deck.startsWith('level:')) return `Niveau ${deck.slice(6)}`
  return UNITS.find((u) => u.id === deck.slice(5))?.title ?? 'Paquet'
}
