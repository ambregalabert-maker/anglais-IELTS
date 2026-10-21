// Séries de questions « comme à l'examen » (Reading et Listening) : un texte ou un enregistrement,
// puis des questions de différents types, corrigées d'un coup avec l'explication de chaque piège.

export type QuestionType =
  | 'tfng' // True / False / Not Given
  | 'ynng' // Yes / No / Not Given
  | 'match' // headings, matching information / features, sentence endings, plan : une lettre par question
  | 'mcq' // QCM : une réponse par question
  | 'mcq2' // QCM : deux réponses (Choose TWO letters)
  | 'gap' // formulaire, notes, résumé, short answer : on tape la réponse

export interface Option {
  key: string // A, B, i, ii…
  text: string
}

export interface Item {
  q: string // l'affirmation, la question, ou le texte autour du blanc (« ___ » marque le blanc)
  answer: string | string[] // réponse (clé de l'option, ou texte) ; mcq2 : deux clés
  accepted?: string[] // gap : autres réponses acceptées
  options?: Option[] // mcq : options propres à la question
  why?: string // explication (en français)
}

export interface QuestionSet {
  id: string
  title: string // ex. « Matching headings »
  type: QuestionType
  instruction: string // consigne en anglais, comme à l'examen
  tip?: string // rappel de méthode (français)
  options?: Option[] // match : la liste commune (titres, paragraphes, fins de phrases…)
  intro?: string // gap : titre du formulaire ou du résumé
  wordLimit?: number // gap : nombre maximum de mots
  items: Item[]
}

export const TYPE_LABELS: Record<QuestionType, string> = {
  tfng: 'True / False / Not Given',
  ynng: 'Yes / No / Not Given',
  match: 'Matching',
  mcq: 'Multiple choice',
  mcq2: 'Multiple choice (2 réponses)',
  gap: 'Completion',
}
