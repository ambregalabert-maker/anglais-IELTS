// Effets sonores synthétisés avec la Web Audio API (aucun fichier), puis la voix (plus bas).

import { NARRATOR, audioPath, cleanSpeech, speechId, type NeuralVoice } from './voices'

type SoundName = 'correct' | 'wrong' | 'complete' | 'badge' | 'tap' | 'levelUp'

let ctx: AudioContext | null = null
let enabled = true

export function setSoundEnabled(on: boolean) {
  enabled = on
}

function audio(): AudioContext | null {
  if (!enabled) return null
  try {
    if (!ctx) ctx = new AudioContext()
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function tone(
  ac: AudioContext,
  freq: number,
  start: number,
  duration: number,
  { type = 'sine', gain = 0.18, slideTo }: { type?: OscillatorType; gain?: number; slideTo?: number } = {},
) {
  const t0 = ac.currentTime + start
  const osc = ac.createOscillator()
  const g = ac.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + duration)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.015)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.connect(g).connect(ac.destination)
  osc.start(t0)
  osc.stop(t0 + duration + 0.05)
}

export function playSound(name: SoundName) {
  const ac = audio()
  if (!ac) return
  switch (name) {
    case 'tap':
      tone(ac, 520, 0, 0.06, { type: 'triangle', gain: 0.08 })
      break
    case 'correct':
      tone(ac, 660, 0, 0.12, { type: 'triangle' })
      tone(ac, 990, 0.09, 0.22, { type: 'triangle' })
      break
    case 'wrong':
      tone(ac, 220, 0, 0.18, { type: 'sawtooth', gain: 0.07, slideTo: 160 })
      tone(ac, 165, 0.14, 0.24, { type: 'sawtooth', gain: 0.06, slideTo: 120 })
      break
    case 'complete':
      ;[523, 659, 784, 1047].forEach((f, i) => tone(ac, f, i * 0.11, 0.3, { type: 'triangle' }))
      tone(ac, 1319, 0.48, 0.5, { type: 'sine', gain: 0.12 })
      break
    case 'levelUp':
      ;[392, 523, 659, 784, 1047].forEach((f, i) => tone(ac, f, i * 0.08, 0.25, { type: 'square', gain: 0.06 }))
      break
    case 'badge':
      ;[1047, 1319, 1568, 2093].forEach((f, i) => tone(ac, f, i * 0.07, 0.35, { type: 'sine', gain: 0.1 }))
      break
  }
}

// ---------- Voix (prononciation) ----------
// 1. D'abord les voix neuronales enregistrées à l'avance (public/audio/, voir src/lib/voices.ts) :
//    humaines, identiques sur tous les appareils, disponibles hors ligne une fois écoutées.
// 2. Sinon (texte jamais enregistré, ou réglage « voix de l'appareil ») : la synthèse vocale du navigateur.


export type VoiceEngine = 'neural' | 'device'

const voiceConfig = { enabled: true, voiceURI: null as string | null, rate: 0.9, engine: 'neural' as VoiceEngine }
let voices: SpeechSynthesisVoice[] = []
const voiceListeners = new Set<() => void>()

function loadVoices() {
  if (!('speechSynthesis' in window)) return
  voices = window.speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang))
  voiceListeners.forEach((l) => l())
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices()
  window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
}

// ----- Index des enregistrements : pour chaque texte, les voix disponibles -----
let manifest: Map<string, NeuralVoice[]> | null = null
let manifestPromise: Promise<Map<string, NeuralVoice[]>> | null = null

function loadManifest(): Promise<Map<string, NeuralVoice[]>> {
  if (manifest) return Promise.resolve(manifest)
  manifestPromise ??= fetch('./audio/index.json')
    .then((r) => (r.ok ? r.json() : {}))
    .catch(() => ({}))
    .then((data: { clips?: Record<string, string[]>; tracks?: Record<string, string> }) => {
      const m = new Map<string, NeuralVoice[]>()
      tracks = data.tracks ?? {}
      for (const [voice, ids] of Object.entries(data.clips ?? {}))
        for (const id of ids) {
          const list = m.get(id)
          if (list) list.push(voice as NeuralVoice)
          else m.set(id, [voice as NeuralVoice])
        }
      manifest = m
      return m
    })
  return manifestPromise
}

if (typeof window !== 'undefined') {
  // On charge l'index dès que le site est prêt, pour que la première écoute soit immédiate
  window.addEventListener('load', () => setTimeout(() => void loadManifest(), 800))
}

let tracks: Record<string, string> = {}

/** L'adresse d'une piste audio enregistrée (dialogue du Listening, modèle de Speaking…), ou null. */
export async function trackUrl(id: string): Promise<string | null> {
  await loadManifest()
  return tracks[id] ? `./audio/${tracks[id]}` : null
}

/** Le fichier à jouer pour ce texte (la voix voulue si elle existe, sinon une autre voix enregistrée). */
function recordingFor(text: string, wanted: NeuralVoice): string | null {
  const list = manifest?.get(speechId(text))
  if (!list?.length) return null
  return audioPath(text, list.includes(wanted) ? wanted : list[0])
}

/** Vrai si ce texte a été enregistré (une fois l'index chargé). */
export function hasRecording(text: string): boolean {
  return !!manifest?.get(speechId(text))?.length
}

// Un seul lecteur audio, réutilisé : sur iPhone, il est « débloqué » une fois au premier toucher.
let player: HTMLAudioElement | null = null
function getPlayer(): HTMLAudioElement {
  if (!player) {
    player = new Audio()
    player.preload = 'auto'
  }
  return player
}
if (typeof window !== 'undefined') {
  const unlock = () => {
    const a = getPlayer()
    if (!a.src) {
      a.src = 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjYwLjE2LjEwMAAAAAAAAAAAAAAA//OEwAAAAAAAAAAAAEluZm8AAAAPAAAABwAAA2AAVVVVVVVVVVVVVVVVVVVxcXFxcXFxcXFxcXFxcY6Ojo6Ojo6Ojo6Ojo6Oqqqqqqqqqqqqqqqqqqqqx8fHx8fHx8fHx8fHx8fj4+Pj4+Pj4+Pj4+Pj4///////////////////AAAAAExhdmM2MC4zMQAAAAAAAAAAAAAAACQEIAAAAAAAAANgmVBi7QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//NExAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMu//NExFMAAANIAAAAADEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMu//NExKYAAANIAAAAADEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMu//NExKwAAANIAAAAADEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMu//NExKwAAANIAAAAADEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NExKwAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NExKwAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
      a.play().then(() => a.pause()).catch(() => {})
    }
    window.removeEventListener('pointerdown', unlock)
  }
  window.addEventListener('pointerdown', unlock)
}

// Voix gadget ou robotiques présentes sur Apple, à ne jamais choisir automatiquement
const NOVELTY = /albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley|ralph|fred|junior|kathy|princess|deranged|hysterical|eloquence/i

/** Note de qualité d'une voix : plus c'est haut, mieux c'est. */
export function voiceScore(v: SpeechSynthesisVoice): number {
  const name = v.name.toLowerCase()
  let s = 0
  if (/en[-_]gb/i.test(v.lang)) s += 50
  else if (/en[-_](ie|au|nz)/i.test(v.lang)) s += 25
  else s += 15
  if (/premium|enhanced|neural|natural|online \(natural\)/.test(name)) s += 40
  if (/siri/.test(name)) s += 30
  if (/daniel|kate|serena|arthur|martha|oliver|stephanie|libby|sonia|ryan|maisie|thomas/.test(name)) s += 12
  if (v.localService) s += 8
  if (/google/.test(name)) s -= 15
  if (NOVELTY.test(name)) s -= 100
  return s
}

/** Les voix anglaises de l'appareil, de la meilleure à la moins bonne. */
export function englishVoices(): SpeechSynthesisVoice[] {
  return [...voices].sort((a, b) => voiceScore(b) - voiceScore(a))
}

export function onVoicesChanged(l: () => void): () => void {
  voiceListeners.add(l)
  return () => voiceListeners.delete(l)
}

export function configureVoice(cfg: { enabled: boolean; voiceURI: string | null; rate: number; engine: VoiceEngine }) {
  Object.assign(voiceConfig, cfg)
  if (!cfg.enabled) stopSpeaking()
}

function currentVoice(): SpeechSynthesisVoice | null {
  if (voiceConfig.voiceURI) {
    const chosen = voices.find((v) => v.voiceURI === voiceConfig.voiceURI)
    if (chosen) return chosen
  }
  return englishVoices()[0] ?? null
}

// Devine si une voix de l'appareil est masculine ou féminine d'après son nom
const MALE = /\b(daniel|arthur|oliver|thomas|ryan|george|alex|aaron|fred|gordon|lee|rishi|tom|guy|eric|brian|christopher|james|malcolm|william|liam|noah|male)\b/i
const FEMALE = /\b(kate|serena|martha|stephanie|libby|sonia|maisie|samantha|karen|moira|tessa|fiona|victoria|allison|ava|susan|zira|hazel|jenny|aria|emma|catherine|nicky|amy|olivia|female)\b/i

export type VoiceGender = 'm' | 'f'

export interface VoiceProfile {
  neural?: NeuralVoice // voix enregistrée du personnage
  gender?: VoiceGender // repli : voix de l'appareil préférée
  pitch?: number // repli : hauteur (1 = normale)
  rate?: number // repli : multiplie la vitesse réglée dans le profil
  usePreferred?: boolean // repli : utiliser la voix choisie dans les réglages
}

function voiceFor(profile: VoiceProfile): SpeechSynthesisVoice | null {
  if (profile.usePreferred || !profile.gender) return currentVoice()
  const re = profile.gender === 'm' ? MALE : FEMALE
  return englishVoices().find((v) => re.test(v.name) && voiceScore(v) > 0) ?? currentVoice()
}

interface SpeakOptions {
  force?: boolean // même si la voix est coupée (bouton « Tester »)
  voiceURI?: string // forcer une voix de l'appareil
  voice?: NeuralVoice // forcer une voix enregistrée
  profile?: VoiceProfile
  slow?: boolean // plus lentement (dictées)
  onStart?: () => void
  onEnd?: () => void
}

let speakToken = 0
let endCurrent: (() => void) | null = null

/** Arrête la voix en cours (enregistrement ou synthèse). */
export function stopSpeaking() {
  speakToken++
  if (player) player.pause()
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  const end = endCurrent
  endCurrent = null
  end?.()
}

/** Prononciation d'un mot ou d'une phrase, éventuellement avec la voix d'un personnage. */
export function speak(text: string, opts: SpeakOptions = {}) {
  if (!opts.force && !voiceConfig.enabled) return
  stopSpeaking()
  const token = speakToken
  const clean = cleanSpeech(text)
  if (voiceConfig.engine === 'neural' && !opts.voiceURI) {
    const play = () => {
      if (token !== speakToken) return
      const src = recordingFor(clean, opts.voice ?? opts.profile?.neural ?? NARRATOR)
      if (src) playRecording(src, opts)
      else speakDevice(clean, opts)
    }
    if (manifest) play()
    else void loadManifest().then(play)
    return
  }
  speakDevice(clean, opts)
}

function playRecording(src: string, { slow, onStart, onEnd }: SpeakOptions) {
  const a = getPlayer()
  a.src = src
  // Vitesse : 0,9 dans les réglages = vitesse normale de l'enregistrement
  a.playbackRate = (voiceConfig.rate / 0.9) * (slow ? 0.72 : 1)
  a.preservesPitch = true
  const done = () => {
    a.onended = a.onerror = null
    if (endCurrent === done) endCurrent = null
    onEnd?.()
  }
  endCurrent = done
  a.onended = done
  a.onerror = done
  a.play()
    .then(() => onStart?.())
    .catch(done)
}

function speakDevice(text: string, { voiceURI, profile, slow, onStart, onEnd }: SpeakOptions) {
  if (!('speechSynthesis' in window)) return onEnd?.()
  const synth = window.speechSynthesis
  if (voices.length === 0) loadVoices()
  const u = new SpeechSynthesisUtterance(text)
  const voice = (voiceURI && voices.find((v) => v.voiceURI === voiceURI)) || (profile ? voiceFor(profile) : currentVoice())
  if (voice) u.voice = voice
  u.lang = voice?.lang ?? 'en-GB'
  u.rate = voiceConfig.rate * (profile?.rate ?? 1) * (slow ? 0.72 : 1)
  u.pitch = profile?.pitch ?? 1
  if (onStart) u.onstart = onStart
  if (onEnd) {
    const done = () => {
      if (endCurrent === done) endCurrent = null
      onEnd()
    }
    endCurrent = done
    u.onend = done
    u.onerror = done
  }
  synth.speak(u)
}
