// Briques communes du Speaking : l'examinateur qui pose la question, l'enregistreur avec son chrono,
// et le lecteur des réponses modèles.

import { useEffect, useState } from 'react'
import { IconSpeaker } from '../components/Icons'
import { EXAMINER } from '../data/speech'
import { speak, stopSpeaking, trackUrl } from '../lib/sound'
import type { NeuralVoice } from '../lib/voices'
import { useProgress } from '../store/progress'
import { useRecorder } from './useRecorder'

/** La question de l'examinateur, lue automatiquement. */
export function ExaminerQuestion({ text, autoPlay = true }: { text: string; autoPlay?: boolean }) {
  const voiceOn = useProgress().settings.voice
  useEffect(() => {
    if (!autoPlay || !voiceOn) return
    const t = setTimeout(() => speak(text, { voice: EXAMINER }), 300)
    return () => {
      clearTimeout(t)
      stopSpeaking()
    }
  }, [text, autoPlay, voiceOn])
  return (
    <div className="examiner">
      <span className="examiner-badge">Examinateur</span>
      <p lang="en">{text}</p>
      {voiceOn && (
        <button className="speak-btn small" onClick={() => speak(text, { voice: EXAMINER })} aria-label="Réécouter la question">
          <IconSpeaker size={18} />
        </button>
      )}
    </div>
  )
}

/** Un texte lu par une voix enregistrée (réponse modèle, phrase utile…). */
export function SpokenText({ text, voice }: { text: string; voice: NeuralVoice }) {
  const voiceOn = useProgress().settings.voice
  return (
    <p className="spoken" lang="en">
      {voiceOn && (
        <button className="speak-btn small" onClick={() => speak(text, { voice })} aria-label="Écouter">
          <IconSpeaker size={18} />
        </button>
      )}
      <span>{text}</span>
    </p>
  )
}

/** Lecteur d'une piste enregistrée (réponse modèle de Part 2 ou 3). */
export function ModelTrack({ id }: { id: string }) {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    void trackUrl(id).then(setUrl)
  }, [id])
  if (!url) return null
  return <audio className="model-audio" src={url} controls preload="none" />
}

/** Enregistrer sa réponse avec un chrono ; à la fin, on peut se réécouter. */
export function RecordBox({ seconds, onDone, autoStart = false }: { seconds: number; onDone?: () => void; autoStart?: boolean }) {
  const r = useRecorder()
  const [left, setLeft] = useState(seconds)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    if (left <= 0) {
      setRunning(false)
      r.stop()
      onDone?.()
      return
    }
    const t = setTimeout(() => setLeft((l) => l - 1), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, left])

  function start() {
    stopSpeaking()
    setLeft(seconds)
    setRunning(true)
    void r.start()
  }
  function stop() {
    setRunning(false)
    r.stop()
    onDone?.()
  }

  useEffect(() => {
    if (autoStart) start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const noMic = r.state === 'denied' || r.state === 'unsupported'
  return (
    <div className="record-box">
      <div className="record-row">
        {running ? (
          <button className="btn btn-danger" onClick={stop}>
            ■ Terminer
          </button>
        ) : (
          <button className="btn btn-primary" onClick={start}>
            {noMic ? '⏱ Lancer le chrono' : r.url ? '● Recommencer' : '● Enregistrer ma réponse'}
          </button>
        )}
        <span className={`record-clock ${running ? 'on' : ''} ${running && left <= 10 ? 'low' : ''}`}>
          {running && r.state === 'recording' && <span className="rec-dot" />}
          {Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}
        </span>
      </div>
      {r.url && <audio src={r.url} controls className="record-audio" />}
      {noMic && <p className="qset-tip">🎙️ Micro indisponible ou refusé : réponds quand même à voix haute avec le chrono. (Tu peux autoriser le micro dans les réglages du navigateur.)</p>}
    </div>
  )
}

/** Petite liste de cases à cocher pour s'auto-évaluer. */
export function SelfCheck({ items, value, onChange }: { items: string[]; value: boolean[]; onChange: (v: boolean[]) => void }) {
  return (
    <ul className="self-check">
      {items.map((it, i) => (
        <li key={it}>
          <label>
            <input type="checkbox" checked={!!value[i]} onChange={(e) => onChange(items.map((_, j) => (j === i ? e.target.checked : !!value[j])))} />
            <span>{it}</span>
          </label>
        </li>
      ))}
    </ul>
  )
}
