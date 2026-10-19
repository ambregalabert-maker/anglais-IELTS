// Forme des données sauvegardées dans le navigateur.
// Quand on ajoute un champ, on l'ajoute aussi dans DEFAULT_PROGRESS (store/progress.ts) :
// les anciennes sauvegardes sont complétées automatiquement au chargement.

export type ThemePref = 'system' | 'light' | 'dark'
export type Difficulty = 'normal' | 'hard'

export interface Settings {
  examDate: string // AAAA-MM-JJ
  dailyGoalMinutes: number
  sound: boolean // petits effets sonores (juste, faux, badge…)
  voice: boolean // prononciation des mots et des phrases
  voiceURI: string | null // voix choisie (null = la meilleure trouvée automatiquement)
  voiceRate: number // vitesse de la voix
  difficulty: Difficulty
  theme: ThemePref
}

export interface DayLog {
  xp: number
  seconds: number
  exercises: number
  correct: number
}

export interface LessonProgress {
  completed: boolean
  mastered: boolean
  bestAccuracy: number
  timesCompleted: number
}

export interface StreakState {
  current: number
  best: number
  lastActiveDay: string | null
  freezes: number
  frozenDays: string[]
}

/** Suivi d'un mot (boîtes de Leitner : 0 = nouveau, 5 = maîtrisé). */
export interface WordStat {
  seen: number
  correct: number
  wrong: number
  box: number
  due: string // date à laquelle le mot doit revenir en révision
  lastSeen: string
}

/** Un exercice raté (identifié par une clé stable), pour la séance « Mes erreurs ». */
export interface MistakeStat {
  wrong: number
  lastWrong: string
  resolved: boolean // repassé juste depuis
}

export interface Progress {
  version: 1
  createdAt: string
  xp: number
  days: Record<string, DayLog>
  streak: StreakState
  badges: Record<string, string> // id → date d'obtention
  lessons: Record<string, LessonProgress>
  words: Record<string, WordStat>
  mistakes: Record<string, MistakeStat>
  settings: Settings
}
