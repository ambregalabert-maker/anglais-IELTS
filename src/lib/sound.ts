// Sons synthétisés avec la Web Audio API : aucun fichier audio, rien de copié.

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
// Le navigateur charge ses voix en différé : on les écoute arriver, puis on choisit
// toujours la même (celle réglée dans le profil, ou la meilleure voix britannique trouvée).

const voiceConfig = { enabled: true, voiceURI: null as string | null, rate: 0.9 }
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

/** Les voix anglaises disponibles, de la meilleure à la moins bonne. */
export function englishVoices(): SpeechSynthesisVoice[] {
  return [...voices].sort((a, b) => voiceScore(b) - voiceScore(a))
}

export function onVoicesChanged(l: () => void): () => void {
  voiceListeners.add(l)
  return () => voiceListeners.delete(l)
}

export function configureVoice(cfg: { enabled: boolean; voiceURI: string | null; rate: number }) {
  Object.assign(voiceConfig, cfg)
  if (!cfg.enabled && 'speechSynthesis' in window) window.speechSynthesis.cancel()
}

export function isVoiceEnabled(): boolean {
  return voiceConfig.enabled && 'speechSynthesis' in window
}

function currentVoice(): SpeechSynthesisVoice | null {
  if (voiceConfig.voiceURI) {
    const chosen = voices.find((v) => v.voiceURI === voiceConfig.voiceURI)
    if (chosen) return chosen
  }
  return englishVoices()[0] ?? null
}

// Devine si une voix est masculine ou féminine d'après son nom (sert à varier les voix des personnages)
const MALE = /\b(daniel|arthur|oliver|thomas|ryan|george|alex|aaron|fred|gordon|lee|rishi|tom|guy|eric|brian|christopher|james|malcolm|william|liam|noah|male)\b/i
const FEMALE = /\b(kate|serena|martha|stephanie|libby|sonia|maisie|samantha|karen|moira|tessa|fiona|victoria|allison|ava|susan|zira|hazel|jenny|aria|emma|catherine|nicky|amy|olivia|female)\b/i

export type VoiceGender = 'm' | 'f'

export interface VoiceProfile {
  gender?: VoiceGender // voix préférée (si l'appareil en a une)
  pitch?: number // hauteur : 1 = normale
  rate?: number // multiplie la vitesse réglée dans le profil
  usePreferred?: boolean // utiliser la voix choisie dans les réglages
}

function voiceFor(profile: VoiceProfile): SpeechSynthesisVoice | null {
  if (profile.usePreferred || !profile.gender) return currentVoice()
  const re = profile.gender === 'm' ? MALE : FEMALE
  return englishVoices().find((v) => re.test(v.name) && voiceScore(v) > 0) ?? currentVoice()
}

interface SpeakOptions {
  force?: boolean // même si la voix est coupée (bouton « Tester »)
  voiceURI?: string
  profile?: VoiceProfile
  onStart?: () => void
  onEnd?: () => void
}

/** Prononciation d'un mot ou d'une phrase, éventuellement avec la voix d'un personnage. */
export function speak(text: string, { force = false, voiceURI, profile, onStart, onEnd }: SpeakOptions = {}) {
  if (!('speechSynthesis' in window) || (!voiceConfig.enabled && !force)) return
  const synth = window.speechSynthesis
  if (voices.length === 0) loadVoices()
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  const voice = (voiceURI && voices.find((v) => v.voiceURI === voiceURI)) || (profile ? voiceFor(profile) : currentVoice())
  if (voice) u.voice = voice
  u.lang = voice?.lang ?? 'en-GB'
  u.rate = voiceConfig.rate * (profile?.rate ?? 1)
  u.pitch = profile?.pitch ?? 1
  if (onStart) u.onstart = onStart
  if (onEnd) {
    u.onend = onEnd
    u.onerror = onEnd
  }
  synth.speak(u)
}
