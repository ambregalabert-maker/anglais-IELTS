// Forme des données sauvegardées dans le navigateur.
// Quand on ajoute un champ, on l'ajoute aussi dans DEFAULT_PROGRESS (store/progress.ts) :
// les anciennes sauvegardes sont complétées automatiquement au chargement.

export type ThemePref = 'system' | 'light' | 'dark'

export interface Settings {
  examDate: string // AAAA-MM-JJ
  dailyGoalMinutes: number
  sound: boolean
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

export interface Progress {
  version: 1
  createdAt: string
  xp: number
  days: Record<string, DayLog>
  streak: StreakState
  badges: Record<string, string> // id → date d'obtention
  lessons: Record<string, LessonProgress>
  settings: Settings
}
