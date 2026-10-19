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

/** Prononciation d'un mot ou d'une phrase avec la voix du navigateur (anglais britannique si disponible). */
export function speak(text: string, rate = 0.95) {
  if (!('speechSynthesis' in window)) return
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  const voices = synth.getVoices()
  const voice =
    voices.find((v) => v.lang === 'en-GB') ?? voices.find((v) => v.lang.startsWith('en-')) ?? null
  if (voice) u.voice = voice
  u.lang = voice?.lang ?? 'en-GB'
  u.rate = rate
  synth.speak(u)
}
