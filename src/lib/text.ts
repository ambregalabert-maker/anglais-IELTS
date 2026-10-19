// Outils pour comparer des réponses tapées avec tolérance.

/** Minuscules, apostrophes uniformes, ponctuation et espaces en trop retirés. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[.,!?;:"()…]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Comme normalize, mais sans accents (pour les réponses en français). */
export function normalizeLoose(s: string): string {
  return normalize(s).normalize('NFD').replace(/[̀-ͯ]/g, '')
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0]
    prev[0] = i
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j]
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1))
      diag = tmp
    }
  }
  return prev[b.length]
}

export type MatchResult = 'exact' | 'typo' | 'wrong'

/**
 * Compare une réponse tapée à une liste de réponses acceptées.
 * « typo » = presque juste (une petite faute de frappe) : compté juste, mais signalé.
 */
export function matchTyped(input: string, accepted: string[], { ignoreAccents = false } = {}): MatchResult {
  const norm = ignoreAccents ? normalizeLoose : normalize
  const given = norm(input)
  if (!given) return 'wrong'
  const targets = accepted.map(norm)
  if (targets.includes(given)) return 'exact'
  for (const target of targets) {
    const tolerance = target.length >= 9 ? 2 : target.length >= 4 ? 1 : 0
    if (levenshtein(given, target) <= tolerance) return 'typo'
  }
  return 'wrong'
}

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function sample<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr).slice(0, n)
}

export function slug(s: string): string {
  return normalizeLoose(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/** Échappe un texte pour l'utiliser dans une expression régulière. */
export function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
