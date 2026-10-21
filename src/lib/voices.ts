// Les voix neuronales (Kokoro) enregistrées à l'avance dans public/audio/.
// Ce fichier est partagé entre le site et le script qui génère l'audio (scripts/audio-texts.ts) :
// les deux calculent le même nom de fichier pour un même texte et une même voix.

export const NEURAL_VOICES = {
  emma: { id: 'bf_emma', label: 'Emma', accent: 'britannique', lang: 'en-gb' },
  george: { id: 'bm_george', label: 'George', accent: 'britannique', lang: 'en-gb' },
  isabella: { id: 'bf_isabella', label: 'Isabella', accent: 'britannique', lang: 'en-gb' },
  daniel: { id: 'bm_daniel', label: 'Daniel', accent: 'britannique', lang: 'en-gb' },
  lily: { id: 'bf_lily', label: 'Lily', accent: 'britannique', lang: 'en-gb' },
  lewis: { id: 'bm_lewis', label: 'Lewis', accent: 'britannique', lang: 'en-gb' },
  heart: { id: 'af_heart', label: 'Heart', accent: 'américaine', lang: 'en-us' },
  michael: { id: 'am_michael', label: 'Michael', accent: 'américain', lang: 'en-us' },
} as const

export type NeuralVoice = keyof typeof NEURAL_VOICES

/** La voix par défaut (mots, dictées, phrases sans personnage). */
export const NARRATOR: NeuralVoice = 'emma'

/** Texte « nettoyé » : c'est lui qui sert à calculer le nom du fichier. */
export function cleanSpeech(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

// FNV-1a sur les octets UTF-8, calculé deux fois (deux graines) pour un identifiant de 64 bits
function fnv(bytes: Uint8Array, seed: number): number {
  let h = seed >>> 0
  for (const b of bytes) {
    h ^= b
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h >>> 0
}

export function speechId(text: string): string {
  const bytes = new TextEncoder().encode(cleanSpeech(text))
  return fnv(bytes, 0x811c9dc5).toString(16).padStart(8, '0') + fnv(bytes, 0x050c5d1f).toString(16).padStart(8, '0')
}

/** Chemin du fichier audio, relatif à la racine du site. */
export function audioPath(text: string, voice: NeuralVoice): string {
  return `audio/${voice}/${speechId(text)}.mp3`
}
