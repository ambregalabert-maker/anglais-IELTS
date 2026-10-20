// Forme des données sauvegardées dans le navigateur.
// Quand on ajoute un champ, on l'ajoute aussi dans DEFAULT_PROGRESS (store/progress.ts) :
// les anciennes sauvegardes sont complétées automatiquement au chargement.

export type ThemePref = 'system' | 'light' | 'dark'
export type Difficulty = 'normal' | 'hard' | 'expert'

export interface Settings {
  examDate: string // AAAA-MM-JJ
  dailyGoalMinutes: number
  sound: boolean // petits effets sonores (juste, faux, badge…)
  voice: boolean // prononciation des mots et des phrases
  voiceURI: string | null // voix choisie (null = la meilleure trouvée automatiquement)
  voiceRate: number // vitesse de la voix
  difficulty: Difficulty
  theme: ThemePref
  pomodoro: PomodoroSettings
}

export interface PomodoroSettings {
  enabled: boolean
  work: number // minutes
  short: number
  long: number
  every: number // pause longue toutes les N séances de travail
}

export interface TryhardRecord {
  name: string
  module: string
  date: string
  seconds: number // temps de travail effectif (hors pauses)
  exercises: number
  accuracy: number
  xp: number
}

export interface DayLog {
  xp: number
  seconds: number
  exercises: number
  correct: number
  activities?: string[] // activités faites ce jour-là (lesson, review, lab…), pour cocher le plan
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

/** Un essai enregistré (mode examen ou parcours guidé). */
export interface EssayRecord {
  id: string
  task: 1 | 2
  topicId: string // sujet Task 2 ou graphique Task 1
  mode: 'exam' | 'guided'
  text: string
  words: number
  issues: number
  seconds: number
  date: string
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
  reviewSessions: number
  essays: EssayRecord[]
  tryhard: TryhardRecord[]
  drafts: Record<string, Record<string, string>> // brouillons (parcours guidé, examen en cours)
  planChecks: Record<string, string[]> // tâches du plan cochées à la main, par jour
  settings: Settings
}
