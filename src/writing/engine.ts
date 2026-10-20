// Exercices du module Writing : Task 1 (graphiques) et grammaire du Booklet 2.
// Les clés (t1:…, gram:…) permettent de recréer un exercice raté dans « Mes erreurs ».

import { GRAMMAR } from '../data/writing/grammar'
import { TASK1_CHARTS, type Task1Chart } from '../data/writing/task1'
import type { Cloze } from '../data/vocab/types'
import type { Exercise } from '../lesson/types'
import { sample, shuffle } from '../lib/text'

// ---------- Task 1 ----------

const KIND_NAMES: Record<Task1Chart['kind'], string> = { line: 'line graph', bar: 'bar chart', pie: 'pie chart', table: 'table' }

// Phrases génériques sur les temps en Task 1 (Booklet 2, « How to use the right verb tenses »)
const TENSES: Cloze[] = [
  { s: 'The line graph ___ the percentage of households with internet access.', a: 'shows', opts: ['showed', 'is showing', 'has shown'], why: 'Pour présenter le document : toujours le présent simple.', kind: 'grammar' },
  { s: 'These pie charts ___ how households spent their income.', a: 'illustrate', opts: ['illustrated', 'are illustrating', 'have illustrated'], why: 'Présentation du document : présent simple.', kind: 'grammar' },
  { s: 'In 2005, people ___ more meat than in 1995.', a: 'ate', opts: ['eat', 'have eaten', 'are eating'], why: 'Date passée précise : past simple.', kind: 'grammar' },
  { s: 'Oil prices ___ since 2000, with a peak in 2008.', a: 'have soared', opts: ['soared', 'soar', 'were soaring'], why: 'Tendance qui a commencé dans le passé et continue (since) : present perfect.', kind: 'grammar' },
  { s: 'The consumption of fish ___ between 2002 and 2005.', a: 'fell', opts: ['has fallen', 'falls', 'felt'], why: 'Période passée terminée : past simple (fall, fell, fallen).', kind: 'grammar' },
  { s: 'By 2020, the figure ___ to 96%.', a: 'had risen', opts: ['has risen', 'rises', 'was rising'], why: '« By + date passée » : past perfect (action terminée avant ce moment).', kind: 'grammar' },
  { s: 'The number of visitors is expected to ___ by 2030.', a: 'double', opts: ['doubled', 'doubling', 'doubles'], why: 'Prévision : « is expected to + base verbale ».', kind: 'grammar' },
  { s: 'The table ___ information about international students.', a: 'gives', opts: ['gave', 'is giving', 'has given'], why: 'Présentation du document : présent simple.', kind: 'grammar' },
  { s: 'Overall, internet access ___ in all three countries over the period.', a: 'increased', opts: ['increases', 'has increased', 'is increasing'], why: 'Période passée (2000-2020) : past simple dans l’overview.', kind: 'grammar' },
  { s: 'There ___ a sharp rise in sales in 2010.', a: 'was', opts: ['is', 'were', 'has'], why: '« a sharp rise » est singulier, et 2010 est passé : « there was ».', kind: 'grammar' },
]

type Trend = 'rose sharply' | 'rose steadily' | 'rose slightly' | 'remained stable' | 'fell slightly' | 'fell steadily' | 'fell sharply'
const TRENDS: Trend[] = ['rose sharply', 'rose steadily', 'rose slightly', 'remained stable', 'fell slightly', 'fell steadily', 'fell sharply']

function trendOf(a: number, b: number): Trend {
  const change = a === 0 ? (b > 0 ? 1 : 0) : (b - a) / a
  if (Math.abs(change) < 0.04) return 'remained stable'
  if (change >= 0.6) return 'rose sharply'
  if (change >= 0.15) return 'rose steadily'
  if (change > 0) return 'rose slightly'
  if (change <= -0.4) return 'fell sharply'
  if (change <= -0.15) return 'fell steadily'
  return 'fell slightly'
}

function trendExercise(c: Task1Chart, si: number, from: number, to: number): Exercise | null {
  const s = c.series[si]
  if (!s || c.kind === 'table' || c.kind === 'pie' || c.kind === 'bar') return null
  const a = s.values[from]
  const b = s.values[to]
  const t = trendOf(a, b)
  // Pièges : des tendances « de l'autre côté » ou d'une intensité nettement différente
  const idx = TRENDS.indexOf(t)
  const wrong = shuffle(TRENDS.filter((_, i) => Math.abs(i - idx) >= 2)).slice(0, 3)
  return {
    kind: 'choice',
    key: `t1:trend:${c.id}:${si}:${from}:${to}`,
    wordIds: [],
    chartId: c.id,
    instruction: 'Choisis la tendance qui correspond au graphique',
    sentence: `Between ${c.labels[from]} and ${c.labels[to]}, the figure for ${s.name} ___ (from ${a} to ${b}${c.unit === '%' ? '%' : ` ${c.unit}`}).`,
    options: shuffle([t, ...wrong]),
    answer: t,
    explanation: `De ${a} à ${b} : variation de ${Math.round(((b - a) / Math.max(1, a)) * 100)} %. Repère : sharply (forte), steadily (régulière), slightly (légère).`,
  }
}

const COMPARISONS = [
  'about twice as high as',
  'about three times as high as',
  'about half as high as',
  'significantly higher than',
  'slightly higher than',
  'roughly the same as',
  'slightly lower than',
  'significantly lower than',
]

function compareExercise(c: Task1Chart, si: number, la: number, lb: number): Exercise | null {
  const s = c.series[si]
  if (!s) return null
  const a = s.values[la]
  const b = s.values[lb]
  if (!a || !b || la === lb) return null
  const r = a / b
  let answer: string
  if (r >= 1.85 && r <= 2.2) answer = COMPARISONS[0]
  else if (r >= 2.8 && r <= 3.25) answer = COMPARISONS[1]
  else if (r >= 0.45 && r <= 0.55) answer = COMPARISONS[2]
  else if (r > 1.25) answer = COMPARISONS[3]
  else if (r > 1.04) answer = COMPARISONS[4]
  else if (r >= 0.96) answer = COMPARISONS[5]
  else if (r >= 0.8) answer = COMPARISONS[6]
  else answer = COMPARISONS[7]
  // Pièges : pas deux réponses « dans le même sens » (ex. twice as high / significantly higher)
  const up = (x: string) => x.includes('higher') || x.includes('twice') || x.includes('three times')
  const down = (x: string) => x.includes('lower') || x.includes('half')
  const wrong = sample(COMPARISONS.filter((x) => x !== answer && !(up(answer) && up(x)) && !(down(answer) && down(x))), 3)
  const intro = /^\d{4}$/.test(s.name) ? `In ${s.name}` : `For ${s.name.toLowerCase()}`
  return {
    kind: 'choice',
    key: `t1:cmp:${c.id}:${si}:${la}:${lb}`,
    wordIds: [],
    chartId: c.id,
    instruction: 'Compare les deux valeurs',
    sentence: `${intro}, the figure for ${c.labels[la]} was ___ the figure for ${c.labels[lb]} (${a} vs ${b}).`,
    options: shuffle([answer, ...wrong]),
    answer,
    explanation: `${a} contre ${b} : rapport de ${r.toFixed(2)}. Rappel : twice as high as (×2), half as high as (÷2), significantly / slightly higher than.`,
  }
}

function kindExercise(c: Task1Chart): Exercise {
  return {
    kind: 'choice',
    key: `t1:kind:${c.id}`,
    wordIds: [],
    chartId: c.id,
    instruction: 'Comment appelle-t-on ce document ?',
    sentence: `The ___ shows ${c.noun}.`,
    options: shuffle(Object.values(KIND_NAMES)),
    answer: KIND_NAMES[c.kind],
    explanation: 'line graph = courbes, bar chart = barres, pie chart = camembert, table = tableau.',
  }
}

function overviewExercise(c: Task1Chart): Exercise {
  return {
    kind: 'choice',
    key: `t1:ov:${c.id}`,
    wordIds: [],
    chartId: c.id,
    instruction: 'Quel est le meilleur « overview » ?',
    options: shuffle([c.overview.correct, ...c.overview.wrong]),
    answer: c.overview.correct,
    explanation: 'Un overview résume les grandes tendances, sans chiffres précis. Il est indispensable pour viser 7+.',
  }
}

function tenseExercise(i: number): Exercise | null {
  const t = TENSES[i]
  if (!t) return null
  return { kind: 'choice', key: `t1:tense:${i}`, wordIds: [], instruction: 'Choisis le bon temps', tag: 'Temps en Task 1', sentence: t.s, options: shuffle([t.a, ...t.opts]), answer: t.a, explanation: t.why }
}

function randomTask1(): Exercise | null {
  const c = TASK1_CHARTS[Math.floor(Math.random() * TASK1_CHARTS.length)]
  const r = Math.random()
  if (r < 0.1) return kindExercise(c)
  if (r < 0.25) return overviewExercise(c)
  if (r < 0.45) return tenseExercise(Math.floor(Math.random() * TENSES.length))
  if (r < 0.7 && c.kind === 'line') {
    const si = Math.floor(Math.random() * c.series.length)
    const from = Math.floor(Math.random() * (c.labels.length - 1))
    const to = from + 1 + Math.floor(Math.random() * (c.labels.length - from - 1))
    return trendExercise(c, si, from, to)
  }
  const si = Math.floor(Math.random() * c.series.length)
  const [la, lb] = sample(c.labels.map((_, i) => i), 2)
  return compareExercise(c, si, la, lb)
}

export function buildTask1Drills(size = 12): Exercise[] {
  const out: Exercise[] = []
  const seen = new Set<string>()
  for (let i = 0; out.length < size && i < 300; i++) {
    const ex = randomTask1()
    if (ex && !seen.has(ex.key)) {
      seen.add(ex.key)
      out.push(ex)
    }
  }
  return out
}

// ---------- Grammaire ----------

function grammarExercise(ti: number, kind: string, i: number): Exercise | null {
  const g = GRAMMAR[ti]
  if (!g) return null
  if (kind === 'c' && g.cloze[i]) {
    const c = g.cloze[i]
    return { kind: 'choice', key: `gram:${ti}:c:${i}`, wordIds: [], instruction: 'Choisis la bonne forme', tag: g.title, sentence: c.s, options: shuffle([c.a, ...c.opts]), answer: c.a, explanation: c.why }
  }
  if (kind === 'j' && g.judge[i]) {
    const j = g.judge[i]
    return { kind: 'judge', key: `gram:${ti}:j:${i}`, wordIds: [], instruction: 'Cette phrase est-elle correcte ?', sentence: j.s, ok: j.ok, fix: j.fix, explanation: j.why }
  }
  return null
}

export function buildGrammar(topicId: string, size = 12): Exercise[] {
  const topics = topicId === 'mix' ? GRAMMAR.map((_, i) => i) : [GRAMMAR.findIndex((g) => g.id === topicId)].filter((i) => i >= 0)
  const all: Exercise[] = []
  for (const ti of topics) {
    GRAMMAR[ti].cloze.forEach((_, i) => all.push(grammarExercise(ti, 'c', i)!))
    GRAMMAR[ti].judge.forEach((_, i) => all.push(grammarExercise(ti, 'j', i)!))
  }
  return shuffle(all).slice(0, size)
}

/** Un exercice au hasard (Task 1 ou grammaire), pour le mode Tryhard. */
export function randomWritingDrill(): Exercise | null {
  if (Math.random() < 0.5) return randomTask1()
  const ti = Math.floor(Math.random() * GRAMMAR.length)
  const useJudge = Math.random() < 0.3
  const list = useJudge ? GRAMMAR[ti].judge : GRAMMAR[ti].cloze
  return grammarExercise(ti, useJudge ? 'j' : 'c', Math.floor(Math.random() * list.length))
}

/** Recrée un exercice Writing à partir de sa clé. */
export function writingFromKey(key: string): Exercise | null {
  const parts = key.split(':')
  if (parts[0] === 'gram') return grammarExercise(Number(parts[1]), parts[2], Number(parts[3]))
  const c = TASK1_CHARTS.find((x) => x.id === parts[2])
  switch (parts[1]) {
    case 'tense':
      return tenseExercise(Number(parts[2]))
    case 'kind':
      return c ? kindExercise(c) : null
    case 'ov':
      return c ? overviewExercise(c) : null
    case 'trend':
      return c ? trendExercise(c, Number(parts[3]), Number(parts[4]), Number(parts[5])) : null
    case 'cmp':
      return c ? compareExercise(c, Number(parts[3]), Number(parts[4]), Number(parts[5])) : null
  }
  return null
}
