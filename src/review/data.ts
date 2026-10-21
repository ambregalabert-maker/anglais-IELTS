// Ce que les révisions doivent proposer : mots à revoir, erreurs à corriger, mots difficiles.

import { WORD_BY_ID, type WordRef } from '../data/vocab'
import { dayKey } from '../lib/dates'
import { MASTERED_BOX } from '../store/progress'
import type { Progress } from '../store/types'

export const SESSION_SIZE = 15

/** Mots dont la date de révision est arrivée, les moins bien connus d'abord. */
export function dueWords(p: Progress): WordRef[] {
  const today = dayKey()
  return Object.entries(p.words)
    .filter(([id, w]) => w.due <= today && WORD_BY_ID[id])
    .sort(([, a], [, b]) => a.box - b.box || a.due.localeCompare(b.due))
    .map(([id]) => WORD_BY_ID[id])
}

/** Mots déjà vus, du plus raté au mieux connu. */
export function weakWords(p: Progress): WordRef[] {
  return Object.entries(p.words)
    .filter(([id]) => WORD_BY_ID[id])
    .sort(([, a], [, b]) => b.wrong - b.correct * 0.5 - (a.wrong - a.correct * 0.5) || a.box - b.box)
    .map(([id]) => WORD_BY_ID[id])
}

/** Erreurs pas encore corrigées, les plus récentes et les plus fréquentes d'abord. */
export function openMistakes(p: Progress): string[] {
  return Object.entries(p.mistakes)
    .filter(([, m]) => !m.resolved)
    .sort(([, a], [, b]) => b.lastWrong.localeCompare(a.lastWrong) || b.wrong - a.wrong)
    .map(([key]) => key)
}

export function masteredCount(p: Progress): number {
  return Object.values(p.words).filter((w) => w.box >= MASTERED_BOX).length
}

/** Nombre de mots dans chaque boîte (1 à 5). */
export function boxCounts(p: Progress): number[] {
  const counts = [0, 0, 0, 0, 0]
  for (const w of Object.values(p.words)) if (w.box >= 1) counts[Math.min(5, w.box) - 1]++
  return counts
}
