// Vérifie le contenu du chemin : npm run check:content
// Signale les doublons, les phrases à trous mal formées et les exemples qui ne contiennent pas le mot.

import { CONTENT, unitWords } from '../src/data/vocab'
import { UNITS } from '../src/data/units'
import { buildLesson } from '../src/lesson/engine'

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

console.log(`\n${total} mots dans ${Object.keys(CONTENT).length} unités. ${problems} problème(s).`)
process.exit(problems ? 1 : 0)
