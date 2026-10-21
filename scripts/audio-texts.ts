// Liste toutes les phrases que le site prononce, avec la voix de chacune : npm run audio:texts
// Le résultat (scripts/audio/texts.json) sert au script Python scripts/audio/generate.py, qui enregistre
// les fichiers dans public/audio/. Une phrase absente de cette liste est lue par la voix de l'appareil.

import { mkdirSync, writeFileSync } from 'node:fs'
import { CAST, characterFor } from '../src/characters/cast'
import { ALL_WORDS, CONTENT } from '../src/data/vocab'
import { LAB_MODES, buildLab } from '../src/lab/engine'
import type { Exercise } from '../src/lesson/types'
import { buildLesson } from '../src/lesson/engine'
import { allDictations, LISTENING_MODES, buildListening } from '../src/listening/engine'
import { GRAMMAR } from '../src/data/writing/grammar'
import { buildGrammar, buildTask1Drills } from '../src/writing/engine'
import { NARRATOR, cleanSpeech, speechId, type NeuralVoice } from '../src/lib/voices'
import { EXTRA_SPEECH, TRACKS } from '../src/data/speech'

const clips = new Map<string, { id: string; voice: NeuralVoice; text: string }>()
function add(text: string | undefined, voice: NeuralVoice = NARRATOR) {
  if (!text) return
  const clean = cleanSpeech(text)
  if (!clean || clean.includes('___') || !/[a-z]/i.test(clean)) return
  const id = speechId(clean)
  clips.set(`${voice}:${id}`, { id, voice, text: clean })
}

/** Ce qu'un exercice fait prononcer (mêmes règles que lesson/views.tsx et ExerciseStage.tsx). */
function fromExercise(e: Exercise) {
  const who = characterFor(e.key).voice.neural
  switch (e.kind) {
    case 'choice':
      if (e.speakPrompt) add(e.prompt, who)
      else add(e.answer)
      break
    case 'judge':
      add(e.sentence, who)
      if (!e.ok) add(e.fix)
      break
    case 'type':
      add(e.speak)
      add(e.answer)
      break
    case 'reorder':
      add(e.answer)
      break
    case 'match':
      e.pairs.forEach((p) => add(p.left))
      break
  }
}

// Mots et exemples
for (const w of ALL_WORDS) {
  add(w.word)
  add(w.ex)
}
// Phrases des personnages
for (const c of CAST) add(c.catchphrase, c.voice.neural)
add('Hello! I am preparing for the IELTS exam.')

// Tous les exercices générés (plusieurs tirages pour couvrir les variantes)
for (const unit of Object.values(CONTENT))
  for (let li = 0; li < unit.lessons.length; li++)
    for (let k = 0; k < 120; k++) buildLesson(unit.unitId, li, (['normal', 'hard', 'expert'] as const)[k % 3]).forEach(fromExercise)
for (const unit of Object.values(CONTENT)) for (let k = 0; k < 60; k++) buildLesson(unit.unitId, 'exam', k % 2 ? 'hard' : 'expert').forEach(fromExercise)
for (const m of LAB_MODES) for (const d of ['normal', 'hard', 'expert'] as const) for (let k = 0; k < 100; k++) buildLab(m.id, d).forEach(fromExercise)
for (let k = 0; k < 80; k++) [...buildTask1Drills(), ...buildGrammar(GRAMMAR[k % GRAMMAR.length].id)].forEach(fromExercise)
for (const m of LISTENING_MODES) if (m.id !== 'dictation') for (let k = 0; k < 60; k++) buildListening(m.id).forEach(fromExercise)
allDictations().forEach(fromExercise)

// Contenus des modules Reading, Speaking, Listening (phrases et modèles lus à voix haute)
for (const s of EXTRA_SPEECH) add(s.text, s.voice)

const byVoice: Record<string, number> = {}
for (const c of clips.values()) byVoice[c.voice] = (byVoice[c.voice] ?? 0) + 1

mkdirSync('scripts/audio', { recursive: true })
writeFileSync(
  'scripts/audio/texts.json',
  JSON.stringify({ clips: [...clips.values()].sort((a, b) => (a.voice + a.id).localeCompare(b.voice + b.id)), tracks: TRACKS }, null, 1),
)
console.log(`${clips.size} phrases, ${TRACKS.length} pistes audio`, byVoice)
