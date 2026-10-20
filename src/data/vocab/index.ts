// Point d'entrée du contenu du chemin. Pour ajouter une unité : créer son fichier, puis l'ajouter ici.

import { slug } from '../../lib/text'
import appearance from './appearance'
import frenchErrors from './french-errors'
import growingUp from './growing-up'
import linking from './linking'
import personality from './personality'
import trends from './trends'
import education from './education'
import work from './work'
import technology from './technology'
import environment from './environment'
import health from './health'
import cities from './cities'
import media from './media'
import crime from './crime'
import globalisation from './globalisation'
import science from './science'
import travel from './travel'
import family from './family'
import type { Lesson, UnitContent, Word } from './types'

const ALL: UnitContent[] = [
  growingUp,
  appearance,
  personality,
  linking,
  trends,
  frenchErrors,
  education,
  work,
  technology,
  environment,
  health,
  cities,
  media,
  crime,
  globalisation,
  science,
  travel,
  family,
]

export const CONTENT: Record<string, UnitContent> = Object.fromEntries(ALL.map((u) => [u.unitId, u]))

/** Un mot avec son identifiant stable (sert à suivre ta maîtrise de chaque mot). */
export interface WordRef extends Word {
  id: string
  unitId: string
  lessonIndex: number
}

export function wordId(unitId: string, w: Word): string {
  return `${unitId}/${slug(w.word)}`
}

export function unitWords(unitId: string): WordRef[] {
  const unit = CONTENT[unitId]
  if (!unit) return []
  return unit.lessons.flatMap((l, lessonIndex) => l.words.map((w) => ({ ...w, id: wordId(unitId, w), unitId, lessonIndex })))
}

export const ALL_WORDS: WordRef[] = ALL.flatMap((u) => unitWords(u.unitId))
export const WORD_BY_ID: Record<string, WordRef> = Object.fromEntries(ALL_WORDS.map((w) => [w.id, w]))

export function getLesson(unitId: string, index: number): Lesson | undefined {
  return CONTENT[unitId]?.lessons[index]
}
