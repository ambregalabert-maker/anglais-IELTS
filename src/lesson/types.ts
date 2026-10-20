// Les différents types d'exercices qu'une leçon peut contenir.

interface Base {
  key: string // identifiant stable de l'exercice (suivi des erreurs)
  wordIds: string[] // mots travaillés
  instruction: string // consigne en français
  explanation?: string // affichée après une erreur
  chartId?: string // graphique Task 1 à afficher au-dessus de l'exercice
}

/** QCM : choisir le bon mot, la bonne définition, la bonne traduction, ou compléter une phrase. */
export interface ChoiceExercise extends Base {
  kind: 'choice'
  prompt?: string // texte principal (mot, définition, phrase française…)
  speakPrompt?: boolean // le prompt est en anglais : bouton 🔊
  sentence?: string // phrase avec un trou « ___ » à compléter
  options: string[]
  answer: string
  tag?: string // petite étiquette (ex. « Collocation »)
}

/** Réponse à taper au clavier. */
export interface TypeExercise extends Base {
  kind: 'type'
  prompt?: string
  sentence?: string // phrase avec un trou
  hint?: string
  accepted: string[]
  answer: string // réponse affichée si c'est faux
  ignoreAccents?: boolean
  speak?: string // texte lu à voix haute (dictée) : la réponse n'est pas affichée
  strict?: boolean // orthographe : aucune faute de frappe tolérée
}

/** Associer 5 paires. */
export interface MatchExercise extends Base {
  kind: 'match'
  pairs: { id: string; left: string; right: string }[]
}

/** Remettre une phrase dans l'ordre en tapant sur les mots. */
export interface ReorderExercise extends Base {
  kind: 'reorder'
  prompt: string // phrase française à traduire
  tiles: string[]
  answer: string
}

/** Vrai ou faux : « Cette phrase est-elle correcte ? » */
export interface JudgeExercise extends Base {
  kind: 'judge'
  sentence: string
  ok: boolean
  fix?: string
}

export type Exercise = ChoiceExercise | TypeExercise | MatchExercise | ReorderExercise | JudgeExercise
