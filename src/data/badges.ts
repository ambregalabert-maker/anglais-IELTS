// Liste des badges. Pour en ajouter un : une nouvelle entrée ici.
// `auto` : condition vérifiée automatiquement à partir de la progression.
// Sans `auto`, le badge est attribué par le module concerné (ex. premier essai de 250 mots).

import type { Progress } from '../store/types'

export interface BadgeDef {
  id: string
  title: string
  description: string
  icon: string
  auto?: (p: Progress) => boolean
}

const totalSeconds = (p: Progress) => Object.values(p.days).reduce((s, d) => s + d.seconds, 0)
const lessonsDone = (p: Progress) => Object.values(p.lessons).filter((l) => l.completed).length

export const BADGES: BadgeDef[] = [
  { id: 'first-lesson', title: 'Premier pas', description: 'Terminer ta première leçon', icon: '🌱', auto: (p) => lessonsDone(p) >= 1 },
  { id: 'first-unit', title: 'Unité bouclée', description: 'Terminer une unité entière', icon: '🏁' },
  { id: 'streak-3', title: 'Bien lancée', description: '3 jours de suite', icon: '🔥', auto: (p) => p.streak.best >= 3 },
  { id: 'streak-7', title: 'Une semaine !', description: '7 jours de suite', icon: '📅', auto: (p) => p.streak.best >= 7 },
  { id: 'streak-30', title: 'Inarrêtable', description: '30 jours de suite', icon: '🌋', auto: (p) => p.streak.best >= 30 },
  { id: 'level-5', title: 'Niveau 5', description: 'Atteindre le niveau 5', icon: '⭐', auto: (p) => p.xp >= 600 },
  { id: 'level-10', title: 'Niveau 10', description: 'Atteindre le niveau 10', icon: '🌟', auto: (p) => p.xp >= 1620 },
  { id: 'words-100', title: '100 mots', description: 'Maîtriser 100 mots', icon: '📚', auto: (p) => Object.values(p.words).filter((w) => w.box >= 4).length >= 100 },
  { id: 'perfect', title: 'Sans faute', description: 'Finir une leçon sans aucune erreur', icon: '💎' },
  { id: 'essay-250', title: 'Plume d’or', description: 'Écrire un premier essai de 250 mots', icon: '✍️' },
  { id: 'tryhard-60', title: 'Tryhard', description: 'Une séance Tryhard d’une heure', icon: '💪' },
  { id: 'hours-10', title: '10 heures', description: '10 heures de travail au total', icon: '⏳', auto: (p) => totalSeconds(p) >= 36_000 },
]

export const BADGE_BY_ID = Object.fromEntries(BADGES.map((b) => [b.id, b]))
