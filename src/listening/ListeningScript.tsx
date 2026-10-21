// Un exercice de Listening avec son enregistrement : une seule écoute (comme à l'examen) ou mode entraînement,
// puis correction et réécoute avec le script.

import { useEffect, useRef, useState } from 'react'
import Character from '../characters/Character'
import { SCRIPT_BY_ID, scriptTrackId, type ListeningScript as Script, type PlanSpec } from '../data/listeningScripts'
import { NEURAL_VOICES } from '../lib/voices'
import QuestionSetView from '../practice/QuestionSetView'
import { navigate } from '../lib/router'
import { speak, stopSpeaking, trackUrl } from '../lib/sound'
import { useStudyTimer } from '../lib/useStudyTimer'
import { recordPractice, useProgress } from '../store/progress'

export default function ListeningScript({ id }: { id: string }) {
  const script = SCRIPT_BY_ID[id]
  const [checked, setChecked] = useState(false)
  useStudyTimer(true)

  if (!script) {
    return (
      <div className="lesson">
        <div className="lesson-empty">
          <Character id="nimbus" mood="think" size={110} />
          <p>Cet exercice n’existe pas.</p>
          <button className="btn btn-primary" onClick={() => navigate('/listening')}>
            Retour
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="lesson reading" style={{ ['--unit' as string]: '#3ccf7a' }}>
      <header className="lesson-top">
        <button className="lesson-quit" onClick={() => navigate('/listening')} aria-label="Quitter">
          ✕
        </button>
        <div className="reading-title">
          <b>
            {script.code} · {script.title}
          </b>
          <small>
            Section {script.section} · {script.context}
          </small>
        </div>
      </header>
      <main className="lesson-body skim-body">
        <TrackPlayer script={script} unlocked={checked} />
        {script.plan && <PlanView plan={script.plan} />}
        {script.sets.map((s) => (
          <QuestionSetView
            key={s.id}
            set={s}
            onChecked={(r) => {
              setChecked(true)
              recordPractice(`lis:${script.id}:${s.id}`, r.score, r.total, 'listening')
            }}
          />
        ))}
        {checked && <Transcript script={script} />}
      </main>
    </div>
  )
}

/** Lecteur : une seule écoute en mode examen ; contrôles complets en entraînement ou après la correction. */
function TrackPlayer({ script, unlocked }: { script: Script; unlocked: boolean }) {
  const voiceOn = useProgress().settings.voice
  const [url, setUrl] = useState<string | null | undefined>(undefined)
  const [training, setTraining] = useState(false)
  const [state, setState] = useState<'idle' | 'playing' | 'done'>('idle')
  const [ratio, setRatio] = useState(0)
  const audio = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    let alive = true
    trackUrl(scriptTrackId(script)).then((u) => alive && setUrl(u))
    return () => {
      alive = false
      stopSpeaking()
    }
  }, [script])

  const free = training || unlocked

  function playOnce() {
    if (url && audio.current) {
      void audio.current.play()
      setState('playing')
      return
    }
    // Pas d'enregistrement : on enchaîne les répliques avec la voix de l'appareil
    setState('playing')
    const next = (i: number) => {
      if (i >= script.lines.length) return setState('done')
      const l = script.lines[i]
      speak(l.say ?? l.text, { force: true, voice: script.voices[l.who], onEnd: () => next(i + 1) })
    }
    next(0)
  }

  if (!voiceOn) return <p className="qset-tip">🔇 La voix est coupée : active-la dans ton profil pour écouter l’enregistrement.</p>

  return (
    <section className="track card">
      <div className="track-voices">
        {Object.entries(script.voices).map(([who, v]) => (
          <span key={who} className="chip">
            {who} · {NEURAL_VOICES[v].accent}
          </span>
        ))}
      </div>
      {url && <audio ref={audio} src={url} preload="auto" controls={free} onTimeUpdate={(e) => setRatio(e.currentTarget.currentTime / (e.currentTarget.duration || 1))} onEnded={() => setState('done')} />}
      {!free && (
        <>
          {state === 'idle' && (
            <button className="btn btn-primary btn-block" onClick={playOnce} disabled={url === undefined}>
              ▶ Écouter (une seule fois, comme à l’examen)
            </button>
          )}
          {state === 'playing' && (
            <div className="track-bar" aria-label="Lecture en cours">
              <span style={{ width: `${url ? ratio * 100 : 50}%` }} />
            </div>
          )}
          {state === 'done' && <p className="qset-tip">Écoute terminée. Vérifie tes réponses : tu pourras réécouter avec le script après la correction.</p>}
          <p className="qset-tip">💡 Lis d’abord les questions et prédis le type de chaque réponse.</p>
        </>
      )}
      {!unlocked && (
        <label className="track-mode">
          <input type="checkbox" checked={training} onChange={(e) => setTraining(e.target.checked)} /> Mode entraînement (pause et réécoute autorisées)
        </label>
      )}
      {free && !url && (
        <button className="btn btn-secondary" onClick={playOnce}>
          ▶ Écouter
        </button>
      )}
    </section>
  )
}

function Transcript({ script }: { script: Script }) {
  return (
    <section className="card transcript" lang="en">
      <h3>Script</h3>
      {script.lines.map((l, i) => (
        <p key={i}>
          {Object.keys(script.voices).length > 1 && <b>{l.who}: </b>}
          {l.text}
        </p>
      ))}
      <p className="muted small-note">Réécoute en suivant le script : repère où se trouve chaque réponse, et comment la question l’a reformulée.</p>
    </section>
  )
}

/** Le plan à étiqueter (bâtiment ou parc), dessiné à partir des zones du script. */
export function PlanView({ plan }: { plan: PlanSpec }) {
  return (
    <figure className="floor-plan card">
      <svg viewBox="0 0 300 275" role="img" aria-label="Plan à étiqueter">
        <rect x="5" y="5" width="290" height="240" rx={plan.kind === 'park' ? 24 : 6} className={plan.kind === 'park' ? 'plan-park' : 'plan-wall'} />
        {plan.paths.map((p, i) => (
          <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} className="plan-path" />
        ))}
        {plan.zones.map((z) => (
          <g key={z.key}>
            <rect x={z.x} y={z.y} width={z.w} height={z.h} rx={plan.kind === 'park' ? 14 : 3} className="plan-zone" />
            <text x={z.x + z.w / 2} y={z.y + z.h / 2 + 7} textAnchor="middle" className="plan-letter">
              {z.key}
            </text>
          </g>
        ))}
        <path d={`M${plan.entrance.x} ${plan.entrance.y - 2} l-8 12 h16 z`} className="plan-arrow" />
        <text x={plan.entrance.x} y={272} textAnchor="middle" className="plan-label">
          {plan.entrance.label} (you are here)
        </text>
        <g transform="translate(280 258)">
          <path d="M0 -14 l6 12 h-12 z" className="plan-arrow" />
          <text y="12" textAnchor="middle" className="plan-label">
            N
          </text>
        </g>
      </svg>
    </figure>
  )
}
