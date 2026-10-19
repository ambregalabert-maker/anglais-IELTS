// Format du contenu des unités du chemin. Un fichier par unité dans ce dossier.
//
// Pour ajouter un mot : une ligne dans `words` d'une leçon.
// Pour ajouter un exercice écrit à la main : une ligne dans `cloze`, `judge` ou `sentences`.

export type Level = 'B1' | 'B2' | 'C1'

export interface Word {
  word: string // le mot ou l'expression, tel qu'on doit le taper
  pos: string // nature : noun, verb, adjective, phrasal verb, idiom…
  fr: string // traduction française
  def: string // définition simple en anglais
  ex: string // exemple : doit contenir le mot tel quel (sert aux phrases à trous)
  col?: string[] // collocations utiles
  level: Level
  alt?: string[] // autres réponses acceptées quand on tape le mot (ex. orthographe américaine)
  frAlt?: string[] // autres traductions françaises acceptées
  note?: string // remarque (registre, piège…)
}

/** Phrase à trous écrite à la main (collocations, grammaire…). `___` marque le trou. */
export interface Cloze {
  s: string
  a: string // bonne réponse
  opts: string[] // mauvaises réponses proposées
  why?: string // explication affichée en cas d'erreur
  kind?: 'collocation' | 'grammar' | 'vocab'
}

/** « Cette phrase est-elle correcte ? » */
export interface Judge {
  s: string
  ok: boolean
  fix?: string // version corrigée si la phrase est fausse
  why: string
}

/** Phrase avec sa traduction : sert aux exercices de traduction et de remise en ordre. */
export interface Sentence {
  en: string
  fr: string
}

export interface Lesson {
  title: string
  words: Word[]
  cloze?: Cloze[]
  judge?: Judge[]
  sentences?: Sentence[]
}

export interface UnitContent {
  unitId: string // doit correspondre à un id de data/units.ts
  lessons: Lesson[]
}
