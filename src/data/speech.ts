// Tout ce qui est lu à voix haute en dehors des exercices : modèles de Speaking, dialogues du Listening…
// scripts/audio-texts.ts lit ces listes pour savoir quoi enregistrer.

import type { NeuralVoice } from '../lib/voices'
import { LISTENING_SCRIPTS, scriptTrackId } from './listeningScripts'
import { DEVELOP, PARAPHRASE_WORDS, PART1_QUESTIONS, PART2_CARDS, PART3_MODEL, PRONUNCIATION, TIME_FILLERS, WEAK_STRONG, pronSay, pronWords, speakingTrackId } from './speaking'

export interface SpeechLine {
  voice: NeuralVoice
  text: string
}

/** Une piste audio : plusieurs répliques assemblées en un seul fichier (audio/tracks/<id>.mp3). */
export interface Track {
  id: string
  lines: SpeechLine[]
}

/** Les voix du Speaking : l'examinateur et la candidate des réponses modèles. */
export const EXAMINER: NeuralVoice = 'lewis'
export const CANDIDATE: NeuralVoice = 'isabella'

export const EXTRA_SPEECH: SpeechLine[] = [
  ...PART1_QUESTIONS.flatMap((p) => [{ voice: EXAMINER, text: p.q }, ...(p.model ? [{ voice: CANDIDATE, text: p.model }] : [])]),
  ...DEVELOP.flatMap((p) => [{ voice: EXAMINER, text: p.q }, { voice: CANDIDATE, text: p.short ?? '' }, { voice: CANDIDATE, text: p.model ?? '' }]),
  ...PARAPHRASE_WORDS.flatMap((w) => [{ voice: 'emma' as const, text: w.word }, { voice: CANDIDATE, text: w.model }]),
  ...PRONUNCIATION.flatMap((g) => g.pairs.flatMap(pronWords).map((w) => ({ voice: 'emma' as const, text: w.toLowerCase() }))),
  ...PRONUNCIATION.flatMap((g) => g.pairs.map((pair) => ({ voice: 'emma' as const, text: pronSay(pair) }))),
  ...TIME_FILLERS.map((t) => ({ voice: CANDIDATE, text: t })),
  { voice: EXAMINER, text: WEAK_STRONG.q },
  { voice: CANDIDATE, text: WEAK_STRONG.weak },
  { voice: CANDIDATE, text: WEAK_STRONG.strong },
  ...PART2_CARDS.flatMap((c) => c.part3.map((q) => ({ voice: EXAMINER, text: q }))),
  { voice: EXAMINER, text: PART3_MODEL.q },
]
export const TRACKS: Track[] = [
  ...PART2_CARDS.filter((c) => c.model).map((c) => ({ id: speakingTrackId('card', c.id), lines: (c.model ?? []).map((text) => ({ voice: CANDIDATE, text })) })),
  { id: speakingTrackId('part3', 'skills'), lines: [{ voice: CANDIDATE, text: PART3_MODEL.a }] },
  ...LISTENING_SCRIPTS.map((s) => ({ id: scriptTrackId(s), lines: s.lines.map((l) => ({ voice: s.voices[l.who], text: l.say ?? l.text })) })),
]
