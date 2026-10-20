// Le plan de préparation : phases proportionnelles au temps restant avant l'examen, et tâches du jour.
// Tout est recalculé à partir de la date de début (premier jour d'utilisation) et de la date d'examen.

import { UNITS } from '../data/units'
import { CONTENT } from '../data/vocab'
import { REAL_AUDIO_URL } from '../data/listening'
import { addDays, dayKey, daysBetween, parseDayKey } from '../lib/dates'
import type { Progress } from '../store/types'

export type PhaseId = 'basics' | 'build' | 'exam' | 'final'

export interface Phase {
  id: PhaseId
  title: string
  share: number
  color: string
  summary: string
  focus: string[]
}

export const PHASES: Phase[] = [
  {
    id: 'basics',
    title: 'Les bases',
    share: 0.3,
    color: '#6c4cf5',
    summary: 'Les unités de tes cours, les temps, les mots de liaison et les pièges des francophones.',
    focus: ['Unités 1 à 6 du chemin', 'Grammaire des temps (Booklet 2)', 'Linking words et pièges des francophones', 'Premières stratégies Listening'],
  },
  {
    id: 'build',
    title: 'Construction',
    share: 0.4,
    color: '#36b5ff',
    summary: 'Les 12 thèmes IELTS jusqu’au C2, le Vocab Lab, la Task 2 guidée et la Task 1.',
    focus: ['Thèmes IELTS (B2 → C2)', 'Vocab Lab : collocations, paraphrase, registre', 'Task 2 guidée et Task 1', 'Listening : paraphrases et pièges'],
  },
  {
    id: 'exam',
    title: 'Conditions d’examen',
    share: 0.2,
    color: '#ff9a4d',
    summary: 'Essais chronométrés, vrais tests de Listening et révision intensive des erreurs.',
    focus: ['Task 1 et Task 2 en mode examen', 'Tests complets sur le site de Listening', 'Révision intensive de tes erreurs', 'Séances Tryhard'],
  },
  {
    id: 'final',
    title: 'Dernière ligne droite',
    share: 0.1,
    color: '#2fbf71',
    summary: 'Révisions légères, rien de nouveau, relecture des fiches de conseils.',
    focus: ['Flashcards et révisions légères', 'Relire les essais modèles et la fiche Listening', 'Bien dormir et rester confiante'],
  },
]

export interface PlanInfo {
  start: string
  exam: string
  totalDays: number
  dayIndex: number // 0 = premier jour
  daysLeft: number
  phase: Phase
  phaseRanges: { phase: Phase; from: string; to: string; startDay: number; endDay: number }[]
  finished: boolean
}

export function planInfo(p: Progress, today = dayKey()): PlanInfo {
  const start = p.createdAt <= p.settings.examDate ? p.createdAt : today
  const exam = p.settings.examDate
  const totalDays = Math.max(1, daysBetween(start, exam))
  const dayIndex = Math.max(0, daysBetween(start, today))
  // Durée de chaque phase : proportionnelle, au moins 1 jour chacune quand c'est possible
  const lens = PHASES.map((ph) => Math.round(totalDays * ph.share))
  if (totalDays >= PHASES.length) for (let i = 0; i < lens.length; i++) lens[i] = Math.max(1, lens[i])
  let diff = totalDays - lens.reduce((a, b) => a + b, 0)
  // On ajuste sur la phase la plus longue (« Construction ») pour retomber sur le bon total
  while (diff !== 0) {
    const i = lens.indexOf(Math.max(...lens))
    lens[i] += Math.sign(diff)
    diff -= Math.sign(diff)
  }
  let cursor = 0
  const phaseRanges = PHASES.map((phase, i) => {
    const startDay = cursor
    const endDay = cursor + lens[i] // exclusif
    cursor = endDay
    return { phase, startDay, endDay, from: addDays(start, startDay), to: addDays(start, Math.max(startDay, endDay - 1)) }
  })
  const current = phaseRanges.find((r) => dayIndex >= r.startDay && dayIndex < r.endDay) ?? phaseRanges[phaseRanges.length - 1]
  return { start, exam, totalDays, dayIndex, daysLeft: daysBetween(today, exam), phase: current.phase, phaseRanges, finished: daysBetween(today, exam) < 0 }
}

// ---------- Tâches du jour ----------

export interface PlanTask {
  id: string
  icon: string
  title: string
  detail: string
  minutes: string
  path?: string // route interne
  href?: string // lien externe
  doneWith: string[] // activités qui cochent la tâche automatiquement
}

/** La prochaine leçon conseillée selon la phase. */
function nextLesson(p: Progress, phase: PhaseId): { path: string; label: string } | null {
  const courseUnits = UNITS.slice(0, 6)
  const themeUnits = UNITS.slice(6)
  const order = phase === 'basics' ? [...courseUnits, ...themeUnits] : [...themeUnits, ...courseUnits]
  for (const u of order) {
    const content = CONTENT[u.id]
    if (!content) continue
    for (let i = 0; i < content.lessons.length; i++) {
      if (!p.lessons[`${u.id}-${i + 1}`]?.completed) return { path: `/lesson/${u.id}/${i}`, label: `${u.title} · ${content.lessons[i].title}` }
    }
    if (!p.lessons[`${u.id}-exam`]?.completed) return { path: `/lesson/${u.id}/exam`, label: `${u.title} · évaluation` }
  }
  return null
}

const DAY_NAMES = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']

/** L'activité du jour, qui tourne sur la semaine et change selon la phase. */
function activityOfDay(phase: PhaseId, weekday: number): PlanTask {
  const t = (id: string, icon: string, title: string, detail: string, path: string | undefined, doneWith: string[], href?: string): PlanTask => ({ id: `act-${id}`, icon, title, detail, minutes: '5-10 min', path, href, doneWith })
  const plans: Record<PhaseId, PlanTask[]> = {
    basics: [
      t('bilan', '📊', 'Mini-bilan de la semaine', 'Regarde tes progrès et corrige tes erreurs', '/review/session/mistakes', ['mistakes']),
      t('lab', '🧪', 'Vocab Lab : familles de mots', 'decide → decision → decisive…', '/lab/families', ['lab']),
      t('task1', '📈', 'Task 1 : exercices', 'Tendances, comparaisons, temps', '/writing/task1', ['task1', 'writing']),
      t('listening', '🎧', 'Listening : prédire la réponse', 'Anticiper avant d’écouter', '/listening/predict', ['listening']),
      t('lab2', '🧲', 'Vocab Lab : collocations', 'Les mots qui vont ensemble', '/lab/collocations', ['lab']),
      t('task2', '✍️', 'Task 2 : parcours guidé', 'Une ou deux étapes de ta méthode', '/writing', ['task2', 'writing']),
      t('grammar', '🧩', 'Grammaire et erreurs', 'Les temps du Booklet 2', '/writing/grammar/mix', ['grammar', 'writing', 'mistakes']),
    ],
    build: [
      t('bilan', '📊', 'Mini-bilan de la semaine', 'Corrige tes erreurs de la semaine', '/review/session/mistakes', ['mistakes']),
      t('lab', '🔁', 'Vocab Lab : paraphrase', 'Dire la même chose autrement', '/lab/paraphrase', ['lab']),
      t('task1', '📈', 'Task 1 : exercices', 'Graphiques et overview', '/writing/task1', ['task1', 'writing']),
      t('listening', '🪤', 'Listening : pièges et paraphrases', 'Les distracteurs de l’examen', '/listening/mix', ['listening']),
      t('lab2', '📈', 'Vocab Lab : synonymes et registre', 'good → beneficial, kids → children', '/lab/upgrade', ['lab']),
      t('task2', '✍️', 'Task 2 : parcours guidé', 'Un essai complet en 9 étapes', '/writing', ['task2', 'writing']),
      t('grammar', '🧩', 'Grammaire et erreurs', 'Comparatifs, temps, too / enough', '/writing/grammar/mix', ['grammar', 'writing', 'mistakes']),
    ],
    exam: [
      t('mock', '🏁', 'Examen blanc Writing', 'Task 1 (20 min) puis Task 2 (40 min)', '/writing/exam/1/random', ['task1-exam', 'task2-exam']),
      t('t2', '⏱️', 'Task 2 en mode examen', '40 minutes, 250 mots', '/writing/exam/2/random', ['task2-exam']),
      t('t1', '📊', 'Task 1 en mode examen', '20 minutes, 150 mots', '/writing/exam/1/random', ['task1-exam']),
      t('real', '🎧', 'Un vrai test de Listening', 'Test complet sur computerielts.com', undefined, ['real-audio'], REAL_AUDIO_URL),
      t('lab', '🎲', 'Vocab Lab : mélange', 'Tout réviser', '/lab/mix', ['lab']),
      t('t2b', '⏱️', 'Task 2 en mode examen', 'Un nouveau sujet', '/writing/exam/2/random', ['task2-exam']),
      t('mistakes', '🩹', 'Révision intensive des erreurs', 'Toutes tes erreurs en attente', '/review/session/mistakes', ['mistakes']),
    ],
    final: [
      t('rest', '🌿', 'Révision légère', 'Quelques flashcards, puis repos', '/review/cards/hard', ['review']),
      t('cards', '🃏', 'Flashcards : mots difficiles', 'Sans pression', '/review/cards/hard', ['review']),
      t('tips', '📋', 'Relire la fiche Listening', 'Les conseils avant le test', '/listening', ['listening', 'real-audio']),
      t('review', '🔁', 'Révisions du jour', 'Les mots à revoir', '/review/session/weak', ['review']),
      t('cards2', '🃏', 'Flashcards : tous tes mots', 'Survol rapide', '/review/cards/seen', ['review']),
      t('models', '📖', 'Relire des essais modèles', 'Ouvre un ancien essai et son modèle', '/writing', ['writing']),
      t('mistakes', '🩹', 'Dernières erreurs', 'Un dernier passage, sans stress', '/review/session/mistakes', ['mistakes']),
    ],
  }
  return plans[phase][weekday]
}

export function todayTasks(p: Progress, today = dayKey()): { tasks: PlanTask[]; weekdayName: string } {
  const info = planInfo(p, today)
  const weekday = parseDayKey(today).getDay()
  const lesson = nextLesson(p, info.phase.id)
  const tasks: PlanTask[] = []
  if (info.phase.id !== 'final') {
    tasks.push({
      id: 'lesson',
      icon: '🌱',
      title: 'Une leçon du chemin',
      detail: lesson?.label ?? 'Toutes les leçons sont faites : refais-en une en mode Expert !',
      minutes: '5-10 min',
      path: lesson?.path ?? '/',
      doneWith: ['lesson'],
    })
  }
  tasks.push({ id: 'review', icon: '🔁', title: 'Révisions', detail: 'Tes mots à revoir (répétition espacée)', minutes: '5 min', path: '/review', doneWith: ['review', 'mistakes'] })
  tasks.push(activityOfDay(info.phase.id, weekday))
  return { tasks, weekdayName: DAY_NAMES[weekday] }
}

export function isTaskDone(p: Progress, task: PlanTask, today = dayKey()): boolean {
  const acts = p.days[today]?.activities ?? []
  return task.doneWith.some((a) => acts.includes(a)) || (p.planChecks[today] ?? []).includes(task.id)
}

/** Statistiques des 7 derniers jours (pour le mini-bilan du dimanche). */
export function weekStats(p: Progress, today = dayKey()) {
  let seconds = 0
  let xp = 0
  let exercises = 0
  let correct = 0
  let activeDays = 0
  for (let i = 0; i < 7; i++) {
    const d = p.days[addDays(today, -i)]
    if (!d) continue
    seconds += d.seconds
    xp += d.xp
    exercises += d.exercises
    correct += d.correct
    if (d.xp > 0 || d.seconds > 0) activeDays++
  }
  return { seconds, xp, exercises, accuracy: exercises ? correct / exercises : 0, activeDays }
}
