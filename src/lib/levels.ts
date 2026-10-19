// Niveaux : chaque niveau demande un peu plus d'XP que le précédent.
// Niveau 1 → 2 : 60 XP, puis +30 XP à chaque niveau.

const BASE = 60
const STEP = 30

export function xpForLevel(level: number): number {
  // XP cumulée nécessaire pour atteindre `level` (le niveau 1 commence à 0)
  const n = level - 1
  return n * BASE + (STEP * n * (n - 1)) / 2
}

export interface LevelInfo {
  level: number
  intoLevel: number
  needed: number
  ratio: number
}

export function levelInfo(xp: number): LevelInfo {
  let level = 1
  while (xpForLevel(level + 1) <= xp) level++
  const start = xpForLevel(level)
  const needed = xpForLevel(level + 1) - start
  const intoLevel = xp - start
  return { level, intoLevel, needed, ratio: intoLevel / needed }
}
