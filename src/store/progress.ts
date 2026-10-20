// La progression : chargée depuis le navigateur (localStorage), modifiée par des « actions »,
// puis resauvegardée automatiquement. Les composants la lisent avec useProgress().

import { useSyncExternalStore } from 'react'
import { BADGES, BADGE_BY_ID } from '../data/badges'
import { addDays, dayKey, daysBetween } from '../lib/dates'
import { levelInfo } from '../lib/levels'
import { emit } from './events'
import type { DayLog, EssayRecord, Progress, Settings, TryhardRecord, WordStat } from './types'

const STORAGE_KEY = 'pepin-ielts-progress'
const MAX_FREEZES = 2
// Intervalle (en jours) avant de revoir un mot, selon sa boîte de Leitner
const BOX_INTERVALS = [0, 1, 2, 4, 8, 16]
export const MASTERED_BOX = 4

export const DEFAULT_PROGRESS: Progress = {
  version: 1,
  createdAt: dayKey(),
  xp: 0,
  days: {},
  streak: { current: 0, best: 0, lastActiveDay: null, freezes: 0, frozenDays: [] },
  badges: {},
  lessons: {},
  words: {},
  mistakes: {},
  reviewSessions: 0,
  essays: [],
  tryhard: [],
  drafts: {},
  settings: { examDate: '2027-01-01', dailyGoalMinutes: 20, sound: true, voice: true, voiceURI: null, voiceRate: 0.9, difficulty: 'normal', theme: 'system', pomodoro: { enabled: false, work: 25, short: 5, long: 15, every: 4 } },
}

const EMPTY_DAY: DayLog = { xp: 0, seconds: 0, exercises: 0, correct: 0 }

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

/** Complète une sauvegarde (éventuellement ancienne) avec les valeurs par défaut. */
function withDefaults<T>(defaults: T, saved: unknown): T {
  if (!isObject(defaults) || !isObject(saved)) return (saved ?? defaults) as T
  const out: Record<string, unknown> = { ...saved }
  for (const [k, v] of Object.entries(defaults)) {
    // Les dictionnaires vides par défaut (days, lessons…) sont repris tels quels
    if (isObject(v) && Object.keys(v).length > 0) out[k] = withDefaults(v, saved[k])
    else if (!(k in saved)) out[k] = v
  }
  return out as T
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return withDefaults(DEFAULT_PROGRESS, JSON.parse(raw))
  } catch {
    /* navigation privée ou stockage bloqué : on repart de zéro */
  }
  return structuredClone(DEFAULT_PROGRESS)
}

let state: Progress = load()
const listeners = new Set<() => void>()

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* ignore */
  }
}

function set(next: Progress) {
  state = next
  save()
  listeners.forEach((l) => l())
}

/** Modifie une copie de l'état puis l'enregistre. */
function update(fn: (draft: Progress) => void) {
  const draft = structuredClone(state)
  fn(draft)
  checkBadges(draft)
  set(draft)
}

export function getProgress(): Progress {
  return state
}

export function useProgress(): Progress {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => state,
  )
}

function today(draft: Progress): DayLog {
  const key = dayKey()
  draft.days[key] ??= { ...EMPTY_DAY }
  return draft.days[key]
}

// ---------- Série de jours ----------

/** À l'ouverture : si des jours ont été manqués, on utilise des gels de série ou on remet à zéro. */
export function checkStreakOnOpen() {
  const { lastActiveDay, current, freezes } = state.streak
  if (!lastActiveDay || current === 0) return
  const yesterday = addDays(dayKey(), -1)
  const missed = daysBetween(lastActiveDay, yesterday)
  if (missed <= 0) return
  update((d) => {
    if (freezes >= missed) {
      d.streak.freezes -= missed
      for (let i = 1; i <= missed; i++) d.streak.frozenDays.push(addDays(lastActiveDay, i))
      d.streak.lastActiveDay = yesterday
      emit({ type: 'toast', icon: '🧊', text: `${missed > 1 ? `${missed} gels utilisés` : 'Gel de série utilisé'} : ta série est sauvée !` })
    } else {
      d.streak.current = 0
      d.streak.freezes = 0
    }
  })
}

function touchStreak(d: Progress) {
  const key = dayKey()
  if (d.streak.lastActiveDay === key) return
  const continues = d.streak.lastActiveDay === addDays(key, -1)
  d.streak.current = continues ? d.streak.current + 1 : 1
  d.streak.lastActiveDay = key
  d.streak.best = Math.max(d.streak.best, d.streak.current)
  emit({ type: 'streak', days: d.streak.current })
  // Un gel de série offert tous les 7 jours d'affilée
  if (d.streak.current % 7 === 0 && d.streak.freezes < MAX_FREEZES) {
    d.streak.freezes++
    emit({ type: 'toast', icon: '🧊', text: 'Tu as gagné un gel de série !' })
  }
}

// ---------- Actions ----------

/**
 * Enregistre une réponse : statistiques du jour, XP, série, et suivi des mots / erreurs.
 * `key` identifie l'exercice (pour « Mes erreurs »), `wordIds` les mots travaillés.
 */
export function recordAnswer({
  key,
  wordIds,
  correct,
  xp,
  trackMistake = true,
}: {
  key: string
  wordIds: string[]
  correct: boolean
  xp: number
  trackMistake?: boolean // false pour les flashcards (pas d'exercice à refaire)
}) {
  update((d) => {
    const t = today(d)
    t.exercises++
    if (correct) t.correct++
    addXpTo(d, xp)
    touchStreak(d)
    const now = dayKey()
    for (const id of wordIds) {
      const w: WordStat = d.words[id] ?? { seen: 0, correct: 0, wrong: 0, box: 0, due: now, lastSeen: now }
      w.seen++
      w.lastSeen = now
      if (correct) {
        w.correct++
        // On ne monte que d'une boîte par jour, pour que la répétition reste espacée
        if (w.due <= now) w.box = Math.min(5, w.box + 1)
      } else {
        w.wrong++
        w.box = 1
      }
      w.due = addDays(now, BOX_INTERVALS[w.box])
      d.words[id] = w
    }
    const m = d.mistakes[key]
    if (!trackMistake) return
    if (!correct) d.mistakes[key] = { wrong: (m?.wrong ?? 0) + 1, lastWrong: now, resolved: false }
    else if (m) m.resolved = true
  })
}

/** Erreur impossible à recréer (contenu modifié) : on la retire de la liste. */
export function resolveMistake(key: string) {
  update((d) => {
    if (d.mistakes[key]) d.mistakes[key].resolved = true
  })
}

/** Une séance de révision ou de flashcards terminée. */
export function completeReview() {
  update((d) => {
    d.reviewSessions++
  })
}

// ---------- Tryhard ----------

export function saveTryhard(r: TryhardRecord) {
  update((d) => {
    d.tryhard = [r, ...d.tryhard].slice(0, 30)
    if (r.seconds >= 3600) awardTo(d, 'tryhard-60')
  })
}

// ---------- Writing ----------

export function saveEssay(e: Omit<EssayRecord, 'id' | 'date'>): string {
  const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
  update((d) => {
    d.essays.unshift({ ...e, id, date: dayKey() })
    if (e.task === 2 && e.words >= 250) awardTo(d, 'essay-250')
  })
  return id
}

export function deleteEssay(id: string) {
  update((d) => {
    d.essays = d.essays.filter((e) => e.id !== id)
  })
}

export function saveDraft(key: string, fields: Record<string, string>) {
  update((d) => {
    d.drafts[key] = fields
  })
}

export function clearDraft(key: string) {
  update((d) => {
    delete d.drafts[key]
  })
}

export function addXp(amount: number) {
  update((d) => {
    addXpTo(d, amount)
    touchStreak(d)
  })
}

function addXpTo(d: Progress, amount: number) {
  if (amount <= 0) return
  const before = levelInfo(d.xp).level
  d.xp += amount
  today(d).xp += amount
  const after = levelInfo(d.xp).level
  if (after > before) emit({ type: 'levelUp', level: after })
}

/** Ajoute du temps de travail effectif (compte pour l'objectif du jour). */
export function addStudyTime(seconds: number) {
  if (seconds <= 0) return
  const goal = state.settings.dailyGoalMinutes * 60
  const before = state.days[dayKey()]?.seconds ?? 0
  update((d) => {
    today(d).seconds += seconds
  })
  if (before < goal && before + seconds >= goal) emit({ type: 'goalReached' })
}

export function completeLesson(id: string, accuracy: number) {
  update((d) => {
    const prev = d.lessons[id] ?? { completed: false, mastered: false, bestAccuracy: 0, timesCompleted: 0 }
    d.lessons[id] = {
      completed: true,
      // « maîtrisée » = refaite une deuxième fois (ou plus) sans erreur
      mastered: prev.mastered || (prev.completed && accuracy === 1),
      bestAccuracy: Math.max(prev.bestAccuracy, accuracy),
      timesCompleted: prev.timesCompleted + 1,
    }
    if (accuracy === 1) awardTo(d, 'perfect')
  })
}

export function awardBadge(id: string) {
  update((d) => awardTo(d, id))
}

function awardTo(d: Progress, id: string) {
  if (d.badges[id] || !BADGE_BY_ID[id]) return
  d.badges[id] = dayKey()
  emit({ type: 'badge', id })
}

function checkBadges(d: Progress) {
  for (const b of BADGES) if (b.auto && !d.badges[b.id] && b.auto(d)) awardTo(d, b.id)
}

export function updateSettings(patch: Partial<Settings>) {
  update((d) => {
    d.settings = { ...d.settings, ...patch }
  })
}

// ---------- Export / import ----------

export function exportProgress(): string {
  return JSON.stringify({ app: 'pepin-ielts', exportedAt: new Date().toISOString(), progress: state }, null, 2)
}

export function importProgress(json: string): boolean {
  try {
    const parsed = JSON.parse(json)
    const data = isObject(parsed) && 'progress' in parsed ? parsed.progress : parsed
    if (!isObject(data) || typeof data.xp !== 'number' || !isObject(data.settings)) return false
    set(withDefaults(DEFAULT_PROGRESS, data))
    return true
  } catch {
    return false
  }
}

export function resetProgress() {
  set({ ...structuredClone(DEFAULT_PROGRESS), settings: state.settings })
}
