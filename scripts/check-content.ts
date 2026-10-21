// Vérifie le contenu du chemin : npm run check:content
// Signale les doublons, les phrases à trous mal formées et les exemples qui ne contiennent pas le mot.

import { CONTENT, unitWords } from '../src/data/vocab'
import { UNITS } from '../src/data/units'
import { buildLesson, exerciseFromKey } from '../src/lesson/engine'
import { LAB_MODES, buildLab } from '../src/lab/engine'
import { FAMILIES } from '../src/data/lab/families'
import { buildGrammar, buildTask1Drills } from '../src/writing/engine'
import { GRAMMAR } from '../src/data/writing/grammar'
import { LISTENING_MODES, buildListening } from '../src/listening/engine'
import { TRAPS } from '../src/data/listening'
import { PASSAGES } from '../src/data/reading'
import { LISTENING_SCRIPTS } from '../src/data/listeningScripts'
import { PART2_CARDS } from '../src/data/speaking'
import { ANALYSE_SET } from '../src/data/writing/method'
import { TASK2_TOPICS } from '../src/data/writing/topics'
import { TASK1_CHARTS } from '../src/data/writing/task1'
import { NEURAL_VOICES } from '../src/lib/voices'
import { TOOL_CARDS } from '../src/review/cards'
import type { QuestionSet } from '../src/practice/types'

let problems = 0
const warn = (msg: string) => {
  problems++
  console.log('⚠️ ', msg)
}
let total = 0

for (const unit of Object.values(CONTENT)) {
  const meta = UNITS.find((u) => u.id === unit.unitId)
  if (!meta) warn(`${unit.unitId} : absente de data/units.ts`)
  else if (meta.lessons !== unit.lessons.length) warn(`${unit.unitId} : ${unit.lessons.length} leçons, mais ${meta.lessons} dans data/units.ts`)
  const words = unitWords(unit.unitId)
  total += words.length
  const ids = new Set<string>()
  for (const w of words) {
    if (ids.has(w.id)) warn(`${w.id} : doublon`)
    ids.add(w.id)
    const forms = [w.word, ...(w.alt ?? [])].map((f) => f.toLowerCase())
    if (!forms.some((f) => w.ex.toLowerCase().includes(f))) console.log(`   (info) ${w.id} : l'exemple ne contient pas le mot, pas de phrase à trous`)
  }
  unit.lessons.forEach((l, li) => {
    l.cloze?.forEach((c) => {
      if (!c.s.includes('___')) warn(`${unit.unitId}/${li} cloze sans ___ : ${c.s}`)
      if (c.opts.includes(c.a)) warn(`${unit.unitId}/${li} cloze : la réponse est aussi dans les pièges : ${c.s}`)
    })
    l.judge?.forEach((j) => {
      if (!j.ok && !j.fix) warn(`${unit.unitId}/${li} judge faux sans correction : ${j.s}`)
    })
    for (let k = 0; k < 30; k++) {
      const ex = buildLesson(unit.unitId, li, k % 2 ? 'hard' : 'normal')
      if (ex.length < 10) warn(`${unit.unitId}/${li} : seulement ${ex.length} exercices`)
      for (const e of ex) {
        if (e.kind === 'choice' && new Set(e.options).size !== e.options.length) warn(`${e.key} : options en double ${e.options.join(' | ')}`)
        if (e.kind === 'choice' && e.options.length < 3) warn(`${e.key} : trop peu d'options`)
      }
    }
  })
  for (const d of ['normal', 'hard'] as const) {
    const exam = buildLesson(unit.unitId, 'exam', d)
    if (exam.length < 14) warn(`${unit.unitId}/exam (${d}) : seulement ${exam.length} exercices`)
  }
}

// ---------- Vocab Lab ----------
for (const f of FAMILIES)
  for (const it of f.items) {
    if (!f.forms.some((x) => x.toLowerCase() === it.a.toLowerCase())) warn(`famille ${f.root} : « ${it.a} » absent des formes`)
    if (!it.s.includes('___')) warn(`famille ${f.root} : pas de ___ dans « ${it.s} »`)
  }
let labCount = 0
for (const m of LAB_MODES)
  for (const d of ['normal', 'hard', 'expert'] as const)
    for (let k = 0; k < 15; k++) {
      const exs = buildLab(m.id, d)
      if (exs.length < 10) warn(`lab ${m.id} (${d}) : seulement ${exs.length} exercices`)
      for (const e of exs) {
        labCount++
        if (e.kind === 'choice') {
          if (new Set(e.options).size !== e.options.length) warn(`${e.key} : options en double ${e.options.join(' | ')}`)
          if (!e.options.includes(e.answer)) warn(`${e.key} : réponse absente des options`)
        }
        if (!exerciseFromKey(e.key, d)) warn(`${e.key} : impossible à recréer`)
      }
    }
console.log(`${labCount} exercices du Lab générés et vérifiés.`)

// ---------- Writing ----------
let wCount = 0
for (let k = 0; k < 60; k++) {
  for (const e of [...buildTask1Drills(), ...buildGrammar(GRAMMAR[k % GRAMMAR.length].id), ...buildGrammar('mix')]) {
    wCount++
    if (e.kind === 'choice') {
      if (new Set(e.options).size !== e.options.length) warn(`${e.key} : options en double ${e.options.join(' | ')}`)
      if (!e.options.includes(e.answer)) warn(`${e.key} : réponse absente`)
      if (e.options.length < 3) warn(`${e.key} : trop peu d'options`)
    }
    if (!exerciseFromKey(e.key, 'normal')) warn(`${e.key} : impossible à recréer`)
  }
}
console.log(`${wCount} exercices Writing générés et vérifiés.`)

// ---------- Listening ----------
for (const t of TRAPS) if (!t.options.includes(t.answer)) warn(`piège « ${t.gap} » : réponse absente des options`)
let lCount = 0
for (const m of LISTENING_MODES)
  for (let k = 0; k < 40; k++)
    for (const e of buildListening(m.id)) {
      lCount++
      if (e.kind === 'choice') {
        if (new Set(e.options).size !== e.options.length) warn(`${e.key} : options en double`)
        if (!e.options.includes(e.answer)) warn(`${e.key} : réponse absente`)
      }
      if (e.kind === 'type' && !e.accepted.length) warn(`${e.key} : aucune réponse acceptée`)
      if (!exerciseFromKey(e.key, 'normal')) warn(`${e.key} : impossible à recréer`)
    }
console.log(`${lCount} exercices Listening générés et vérifiés.`)

// ---------- Séries de questions (Reading, Listening, Writing) ----------
function checkSet(where: string, set: QuestionSet) {
  if (!set.items.length) warn(`${where} : série vide`)
  set.items.forEach((it, i) => {
    const tag = `${where} q${i + 1}`
    const opts = (it.options ?? set.options ?? []).map((o) => o.key)
    if (new Set(opts).size !== opts.length) warn(`${tag} : lettres d'options en double`)
    if (set.type === 'tfng' && !['True', 'False', 'Not Given'].includes(it.answer as string)) warn(`${tag} : réponse TFNG invalide`)
    if (set.type === 'ynng' && !['Yes', 'No', 'Not Given'].includes(it.answer as string)) warn(`${tag} : réponse YNNG invalide`)
    if ((set.type === 'match' || set.type === 'mcq') && !opts.includes(it.answer as string)) warn(`${tag} : réponse absente des options`)
    if (set.type === 'mcq2' && (!Array.isArray(it.answer) || it.answer.length !== 2 || it.answer.some((a) => !opts.includes(a)))) warn(`${tag} : il faut deux réponses parmi les options`)
    if (set.type === 'gap' && (typeof it.answer !== 'string' || !it.answer.trim())) warn(`${tag} : réponse vide`)
  })
}
let setCount = 0
for (const p of PASSAGES) {
  const labels = p.paragraphs.map((x) => x.label)
  if (new Set(labels).size !== labels.length) warn(`texte ${p.id} : paragraphes en double`)
  for (const s of p.sets) {
    checkSet(`reading ${p.id}/${s.id}`, s)
    setCount++
  }
}
for (const sc of LISTENING_SCRIPTS) {
  for (const l of sc.lines) if (!sc.voices[l.who] || !NEURAL_VOICES[sc.voices[l.who]]) warn(`listening ${sc.id} : pas de voix pour « ${l.who} »`)
  for (const s of sc.sets) {
    checkSet(`listening ${sc.id}/${s.id}`, s)
    setCount++
  }
  if (sc.plan) for (const it of sc.sets[0].items) if (!sc.plan.zones.some((z) => z.key === it.answer)) warn(`listening ${sc.id} : la zone ${it.answer} n'est pas sur le plan`)
}
checkSet('writing w3', ANALYSE_SET)
console.log(`${setCount + 1} séries de questions vérifiées.`)

// ---------- Writing, Speaking, flashcards ----------
for (const t of TASK2_TOPICS) if (t.model.split(/\s+/).length < 250) warn(`essai modèle ${t.id} : moins de 250 mots`)
for (const c of TASK1_CHARTS) if (c.model.split(/\s+/).length < 150) warn(`modèle Task 1 ${c.id} : moins de 150 mots`)
for (const c of PART2_CARDS) if (c.points.length < 3 || !c.part3.length) warn(`carte Part 2 ${c.id} : incomplète`)
const cardIds = Object.values(TOOL_CARDS).flat().map((c) => c.id)
if (new Set(cardIds).size !== cardIds.length) warn('flashcards : identifiants en double')

console.log(`\n${total} mots dans ${Object.keys(CONTENT).length} unités. ${problems} problème(s).`)
process.exit(problems ? 1 : 0)
