// Mode Tryhard : génère des exercices en continu, adaptés à ton niveau et à tes erreurs.

import { REGISTER } from '../data/lab/content'
import { ALL_WORDS, CONTENT, WORD_BY_ID, type WordRef } from '../data/vocab'
import { TASK1_CHARTS } from '../data/writing/task1'
import { TASK2_TOPICS } from '../data/writing/topics'
import { randomLabExercise } from '../lab/engine'
import { exerciseFromKey, reviewExercise } from '../lesson/engine'
import type { Exercise, FreeExercise } from '../lesson/types'
import { randomListeningExercise } from '../listening/engine'
import { dayKey } from '../lib/dates'
import type { Difficulty, Progress } from '../store/types'
import { randomWritingDrill } from '../writing/engine'

export type TryhardModule = 'home' | 'vocab' | 'writing' | 'listening'

export const TRYHARD_INFO: Record<TryhardModule, { title: string; description: string; color: string; exitPath: string }> = {
  home: { title: 'Tryhard Vocabulaire', description: 'Tes erreurs, tes mots à revoir et de nouveaux mots du chemin, en continu.', color: '#6c4cf5', exitPath: '/' },
  vocab: { title: 'Tryhard Vocab Lab', description: 'Familles, collocations, paraphrases, registre, expressions et orthographe, sans fin.', color: '#36b5ff', exitPath: '/vocab' },
  writing: { title: 'Tryhard Writing', description: 'Grammaire, Task 1, registre formel, pièges, et mini-rédactions (introductions, conclusions, overviews).', color: '#ff9a4d', exitPath: '/writing' },
  listening: { title: 'Tryhard Listening', description: 'Prédictions, paraphrases, pièges, consignes et dictées en rafale.', color: '#3ccf7a', exitPath: '/listening' },
}

const LEVELS: Difficulty[] = ['normal', 'hard', 'expert']

/** Niveau ajusté selon ta précision récente : on simplifie si ça coince, on corse si tout passe. */
export function adaptLevel(base: Difficulty, recentAccuracy: number, answered: number): Difficulty {
  const i = LEVELS.indexOf(base)
  if (answered < 6) return base
  if (recentAccuracy < 0.6) return LEVELS[Math.max(0, i - 1)]
  if (recentAccuracy > 0.88) return LEVELS[Math.min(LEVELS.length - 1, i + 1)]
  return base
}

function pick<T>(arr: readonly T[]): T | undefined {
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined
}

function weighted<T extends string>(weights: Record<T, number>): T {
  const entries = Object.entries(weights) as [T, number][]
  let r = Math.random() * entries.reduce((n, [, w]) => n + w, 0)
  for (const [k, w] of entries) {
    if ((r -= w) <= 0) return k
  }
  return entries[0][0]
}

// ---------- Vocabulaire du chemin ----------

function wordPools(p: Progress) {
  const today = dayKey()
  const stats = Object.entries(p.words).filter(([id]) => WORD_BY_ID[id])
  const mistakes = stats.filter(([, w]) => w.wrong > 0 && w.box <= 2).map(([id]) => WORD_BY_ID[id])
  const due = stats.filter(([, w]) => w.due <= today).map(([id]) => WORD_BY_ID[id])
  // Nouveaux mots : les premiers mots pas encore vus, dans l'ordre du chemin
  const fresh = ALL_WORDS.filter((w) => !p.words[w.id]).slice(0, 15)
  return { mistakes, due, fresh }
}

function pathItemKeys(p: Progress): string[] {
  // Exercices écrits à la main (collocations, vrai/faux) des unités déjà commencées, ou de la première unité
  const started = new Set(Object.keys(p.words).map((id) => id.split('/')[0]))
  const units = Object.values(CONTENT).filter((u) => started.has(u.unitId))
  const list = units.length ? units : [Object.values(CONTENT)[0]]
  return list.flatMap((u) =>
    u.lessons.flatMap((l, li) => [
      ...(l.cloze ?? []).map((_, i) => `${u.unitId}:${li}:cloze:${i}`),
      ...(l.judge ?? []).map((_, i) => `${u.unitId}:${li}:judge:${i}`),
    ]),
  )
}

function vocabExercise(p: Progress, level: Difficulty): Exercise | null {
  const { mistakes, due, fresh } = wordPools(p)
  const kind = weighted({ mistakes: mistakes.length ? 30 : 0, due: due.length ? 25 : 0, fresh: fresh.length ? 30 : 0, item: 15 })
  if (kind === 'item') {
    const key = pick(pathItemKeys(p))
    return key ? exerciseFromKey(key, level) : null
  }
  const w: WordRef | undefined = pick(kind === 'mistakes' ? mistakes : kind === 'due' ? due : fresh)
  return w ? reviewExercise(w, p.words[w.id]?.box ?? 0, level) : null
}

// ---------- Mini-rédactions (Writing) ----------

const INFORMAL_SENTENCES: { s: string; sample: string }[] = [
  { s: 'Kids spend lots of time on their phones, so parents should do something about it.', sample: 'Children spend a great deal of time on their phones; therefore, parents should take action.' },
  { s: 'Loads of people think the government doesn’t care about the environment.', sample: 'Many people believe that the government is not sufficiently concerned about the environment.' },
  { s: 'It’s really obvious that cars are a big problem in cities.', sample: 'It is evident that cars are a major problem in urban areas.' },
  { s: 'Nowadays everybody buys stuff online because it’s cheaper.', sample: 'An increasing number of people now shop online, as it is often less expensive.' },
  { s: 'But tourism also makes things worse for local people.', sample: 'However, tourism can also have a detrimental impact on local residents.' },
  { s: 'Getting a degree is a great way to get a good job.', sample: 'Obtaining a degree significantly improves graduates’ employment prospects.' },
  { s: 'Old people often feel lonely and they don’t get enough help.', sample: 'Elderly people often feel isolated and do not receive sufficient support.' },
  { s: 'So we need to find out why crime is going up.', sample: 'Therefore, it is essential to determine why crime rates are rising.' },
]

function freeTask(): FreeExercise {
  const kind = weighted({ intro: 3, conclusion: 2, formal: 3, overview: 2 })
  if (kind === 'overview') {
    const c = pick(TASK1_CHARTS)!
    return { kind: 'free', key: `free:ov:${c.id}`, wordIds: [], instruction: 'Mini-rédaction : l’overview', chartId: c.id, prompt: 'Write an overview sentence for this chart (start with « Overall, »). No precise figures.', task: 1, minWords: 12, sample: c.overview.correct }
  }
  if (kind === 'formal') {
    const i = Math.floor(Math.random() * INFORMAL_SENTENCES.length)
    const it = INFORMAL_SENTENCES[i]
    return { kind: 'free', key: `free:formal:${i}`, wordIds: [], instruction: 'Mini-rédaction : réécris en anglais académique', prompt: 'Rewrite this sentence in formal, academic English.', source: it.s, task: 2, minWords: 8, sample: it.sample }
  }
  const t = pick(TASK2_TOPICS)!
  const paragraphs = t.model.split('\n\n')
  if (kind === 'intro') {
    return { kind: 'free', key: `free:intro:${t.id}`, wordIds: [], instruction: 'Mini-rédaction : l’introduction', prompt: `Write an introduction (two sides + a neutral thesis, no opinion) for: ${t.question}`, task: 2, minWords: 35, sample: paragraphs[0] }
  }
  return { kind: 'free', key: `free:concl:${t.id}`, wordIds: [], instruction: 'Mini-rédaction : la conclusion en 3 phrases', prompt: `Write a three-sentence conclusion (summary, opinion, future) for: ${t.question}`, task: 2, minWords: 35, sample: paragraphs[paragraphs.length - 1] }
}

function writingExercise(level: Difficulty): Exercise | null {
  const kind = weighted({ free: 15, drill: 40, register: 15, lab: 10, errors: 20 })
  switch (kind) {
    case 'free':
      return freeTask()
    case 'drill':
      return randomWritingDrill()
    case 'register':
      return exerciseFromKey(`lab:reg:${Math.floor(Math.random() * REGISTER.length)}`, level)
    case 'lab':
      return randomLabExercise(level, Math.random() < 0.5 ? 'upgrade' : 'paraphrase')
    case 'errors': {
      const unit = CONTENT['french-errors']
      const li = Math.floor(Math.random() * unit.lessons.length)
      const l = unit.lessons[li]
      const useJudge = Math.random() < 0.5 && l.judge?.length
      const list = useJudge ? l.judge! : (l.cloze ?? [])
      return exerciseFromKey(`french-errors:${li}:${useJudge ? 'judge' : 'cloze'}:${Math.floor(Math.random() * list.length)}`, level)
    }
  }
}

/** Le prochain exercice du flux Tryhard. */
export function nextTryhardExercise(module: TryhardModule, p: Progress, level: Difficulty): Exercise | null {
  for (let tries = 0; tries < 10; tries++) {
    let ex: Exercise | null = null
    if (module === 'home') ex = vocabExercise(p, level)
    else if (module === 'vocab') ex = Math.random() < 0.7 ? randomLabExercise(level) : vocabExercise(p, level)
    else if (module === 'writing') ex = writingExercise(level)
    else ex = randomListeningExercise()
    if (ex) return ex
  }
  return null
}
