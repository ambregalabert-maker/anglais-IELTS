// Mode Tryhard : configuration → séance continue (Pomodoro caché en option) → bilan.

import { useEffect, useRef, useState } from 'react'
import Character from '../characters/Character'
import Mascot from '../components/Mascot'
import ProgressRing from '../components/ProgressRing'
import { WORD_BY_ID } from '../data/vocab'
import ExerciseStage, { type StageAnswer } from '../lesson/ExerciseStage'
import { QuitModal } from '../lesson/LessonPlayer'
import type { Exercise } from '../lesson/types'
import { confetti } from '../lib/confetti'
import { dayKey, formatDuration } from '../lib/dates'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { useStudyTimer } from '../lib/useStudyTimer'
import { toast } from '../store/events'
import { addXp, getProgress, recordAnswer, saveTryhard, updateSettings, useProgress } from '../store/progress'
import type { Difficulty, PomodoroSettings } from '../store/types'
import { TRYHARD_INFO, adaptLevel, nextTryhardExercise, type TryhardModule } from './generators'

const DURATIONS: { label: string; minutes: number | null }[] = [
  { label: '30 min', minutes: 30 },
  { label: '1 h', minutes: 60 },
  { label: '1 h 30', minutes: 90 },
  { label: '2 h', minutes: 120 },
  { label: 'Libre', minutes: null },
]

const XP_BY_LEVEL: Record<Difficulty, number> = { normal: 2, hard: 3, expert: 4 }

interface Config {
  name: string
  minutes: number | null
  pomodoro: PomodoroSettings
}

interface Result {
  correct: boolean
  key: string
  wordIds: string[]
  instruction: string
}

export default function TryhardPage({ module }: { module: TryhardModule }) {
  const [config, setConfig] = useState<Config | null>(null)
  const [summary, setSummary] = useState<SummaryData | null>(null)
  if (summary) return <Summary data={summary} module={module} />
  if (!config) return <Setup module={module} onStart={setConfig} />
  return <Run module={module} config={config} onEnd={setSummary} />
}

// ---------- Configuration ----------

function NumberChoice({ label, value, options, onChange }: { label: string; value: number; options: number[]; onChange: (n: number) => void }) {
  return (
    <div className="setting">
      <span>
        <b>{label}</b>
      </span>
      <div className="segmented">
        {options.map((o) => (
          <button key={o} className={value === o ? 'on' : ''} onClick={() => onChange(o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

function Setup({ module, onStart }: { module: TryhardModule; onStart: (c: Config) => void }) {
  const p = useProgress()
  const info = TRYHARD_INFO[module]
  const [name, setName] = useState('')
  const [minutes, setMinutes] = useState<number | null>(60)
  const pomo = p.settings.pomodoro
  const setPomo = (patch: Partial<PomodoroSettings>) => updateSettings({ pomodoro: { ...pomo, ...patch } })
  const history = p.tryhard.filter((t) => t.module === module).slice(0, 4)

  return (
    <div className="lesson tryhard" style={{ ['--th' as string]: info.color }}>
      <header className="lesson-top">
        <button className="lesson-quit" onClick={() => navigate(info.exitPath)} aria-label="Retour">
          ✕
        </button>
        <b className="grow">💪 Mode Tryhard</b>
      </header>
      <main className="lesson-body tryhard-setup">
        <div className="tryhard-hero">
          <Character id="bolt" mood="dance" size={96} />
          <div>
            <h1>{info.title}</h1>
            <p className="muted">{info.description}</p>
          </div>
        </div>

        <label className="guide-field">
          <span>Nom de la séance</span>
          <input className="search" value={name} onChange={(e) => setName(e.target.value)} placeholder="ex. Grosse révision vocabulaire" maxLength={60} />
        </label>

        <div className="guide-field">
          <span>Durée totale</span>
          <div className="chip-row guide-language">
            {DURATIONS.map((d) => (
              <button key={d.label} className={`chip ${minutes === d.minutes ? 'on' : ''}`} onClick={() => setMinutes(d.minutes)}>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <section className="card settings">
          <label className="setting">
            <span>
              <b>🍅 Pomodoro</b>
              <small>Pauses régulières, minuteur discret dans un coin</small>
            </span>
            <input type="checkbox" className="switch" checked={pomo.enabled} onChange={(e) => setPomo({ enabled: e.target.checked })} />
          </label>
          {pomo.enabled && (
            <>
              <NumberChoice label="Travail (min)" value={pomo.work} options={[20, 25, 30, 45, 50]} onChange={(n) => setPomo({ work: n })} />
              <NumberChoice label="Pause courte (min)" value={pomo.short} options={[3, 5, 10]} onChange={(n) => setPomo({ short: n })} />
              <NumberChoice label="Pause longue (min)" value={pomo.long} options={[15, 20, 30]} onChange={(n) => setPomo({ long: n })} />
              <NumberChoice label="Pause longue toutes les" value={pomo.every} options={[2, 3, 4]} onChange={(n) => setPomo({ every: n })} />
            </>
          )}
        </section>

        {history.length > 0 && (
          <section className="card">
            <h3>Tes dernières séances</h3>
            {history.map((h, i) => (
              <p key={i} className="muted small-note">
                {h.name} · {formatDuration(h.seconds)} · {h.exercises} exercices · {Math.round(h.accuracy * 100)} %
              </p>
            ))}
          </section>
        )}
      </main>
      <footer className="lesson-foot">
        <div className="lesson-foot-inner">
          <button
            className="btn btn-tryhard btn-block big"
            onClick={() => {
              playSound('levelUp')
              onStart({ name: name.trim() || info.title, minutes, pomodoro: { ...pomo } })
            }}
          >
            C’est parti !
          </button>
        </div>
      </footer>
    </div>
  )
}

// ---------- Séance ----------

interface SummaryData {
  name: string
  workedSeconds: number
  exercises: number
  correct: number
  xp: number
  learned: number
  weakWords: { word: string; fr: string; count: number }[]
  weakTypes: { label: string; wrong: number; total: number }[]
}

function Run({ module, config, onEnd }: { module: TryhardModule; config: Config; onEnd: (s: SummaryData) => void }) {
  const info = TRYHARD_INFO[module]
  const baseLevel = getProgress().settings.difficulty
  const startedAt = useRef(Date.now())
  const [now, setNow] = useState(Date.now())
  const results = useRef<Result[]>([])
  const retryQueue = useRef<{ ex: Exercise; dueAt: number }[]>([])
  const [count, setCount] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [xp, setXp] = useState(0)
  const [combo, setCombo] = useState(0)
  const [current, setCurrent] = useState<{ ex: Exercise; retry: boolean; id: number } | null>(null)
  const [quit, setQuit] = useState(false)
  const [showTimer, setShowTimer] = useState(false)

  // Pomodoro
  const pomo = config.pomodoro
  const [phase, setPhase] = useState<'work' | 'break'>('work')
  const [phaseStart, setPhaseStart] = useState(Date.now())
  const [cycles, setCycles] = useState(0)
  const [breakLong, setBreakLong] = useState(false)
  const worked = useRef(0)
  const lastTick = useRef(Date.now())

  useStudyTimer(phase === 'work')

  useEffect(() => {
    const t = setInterval(() => {
      const n = Date.now()
      if (phase === 'work') worked.current += n - lastTick.current
      lastTick.current = n
      setNow(n)
    }, 1000)
    return () => clearInterval(t)
  }, [phase])

  const recent = results.current.slice(-10)
  const recentAcc = recent.length ? recent.filter((r) => r.correct).length / recent.length : 1
  const level = adaptLevel(baseLevel, recentAcc, results.current.length)

  function pickNext() {
    const n = results.current.length
    const due = retryQueue.current.findIndex((r) => r.dueAt <= n)
    if (due >= 0) {
      const [r] = retryQueue.current.splice(due, 1)
      setCurrent({ ex: r.ex, retry: true, id: n + Math.random() })
      return
    }
    const ex = nextTryhardExercise(module, getProgress(), level)
    if (ex) setCurrent({ ex, retry: false, id: n + Math.random() })
  }

  useEffect(() => {
    pickNext()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const phaseMinutes = phase === 'work' ? pomo.work : breakLong ? pomo.long : pomo.short
  const phaseLeft = Math.max(0, phaseStart + phaseMinutes * 60_000 - now)
  const totalLeft = config.minutes ? Math.max(0, startedAt.current + config.minutes * 60_000 - now) : null
  const workDone = pomo.enabled && phase === 'work' && phaseLeft === 0
  const timeUp = totalLeft === 0

  // Fin de pause : petit son pour prévenir
  useEffect(() => {
    if (phase === 'break' && phaseLeft === 0) playSound('badge')
  }, [phase, phaseLeft])

  function answered(a: StageAnswer) {
    if (!current) return
    const ex = current.ex
    const earned = a.correct && !current.retry ? XP_BY_LEVEL[level] : 0
    const track = ex.kind !== 'free'
    if (a.perWord) a.perWord.forEach((w, i) => recordAnswer({ key: `w:${w.id}:match`, wordIds: [w.id], correct: w.correct, xp: i === 0 ? earned : 0 }))
    else recordAnswer({ key: ex.key, wordIds: ex.wordIds, correct: a.correct, xp: earned, trackMistake: track })
    results.current.push({ correct: a.correct, key: ex.key, wordIds: a.perWord ? a.perWord.filter((w) => !w.correct).map((w) => w.id) : ex.wordIds, instruction: ex.instruction })
    setCount((c) => c + 1)
    setXp((x) => x + earned)
    if (a.correct) {
      setCorrect((c) => c + 1)
      const nc = combo + 1
      setCombo(nc)
      if (nc % 10 === 0) {
        addXp(5)
        setXp((x) => x + 5)
        toast(`Série de ${nc} bonnes réponses ! +5 XP`, '🔥')
      }
    } else {
      setCombo(0)
      // L'exercice raté revient quelques questions plus tard (une seule fois)
      if (!current.retry && ex.kind !== 'match' && ex.kind !== 'free') retryQueue.current.push({ ex, dueAt: results.current.length + 4 })
    }
  }

  function finish() {
    const res = results.current
    const wrongWords: Record<string, number> = {}
    for (const r of res) if (!r.correct) for (const id of r.wordIds) wrongWords[id] = (wrongWords[id] ?? 0) + 1
    const types: Record<string, { wrong: number; total: number }> = {}
    for (const r of res) {
      types[r.instruction] ??= { wrong: 0, total: 0 }
      types[r.instruction].total++
      if (!r.correct) types[r.instruction].wrong++
    }
    const learned = new Set(res.filter((r) => r.correct).flatMap((r) => r.wordIds)).size
    const data: SummaryData = {
      name: config.name,
      workedSeconds: Math.round(worked.current / 1000),
      exercises: res.length,
      correct: res.filter((r) => r.correct).length,
      xp: xp + 20,
      learned,
      weakWords: Object.entries(wrongWords)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([id, n]) => ({ word: WORD_BY_ID[id]?.word ?? id, fr: WORD_BY_ID[id]?.fr ?? '', count: n })),
      weakTypes: Object.entries(types)
        .filter(([, t]) => t.wrong > 0)
        .map(([label, t]) => ({ label, ...t }))
        .sort((a, b) => b.wrong / b.total - a.wrong / a.total)
        .slice(0, 4),
    }
    addXp(20)
    saveTryhard({ name: data.name, module, date: dayKey(), seconds: data.workedSeconds, exercises: data.exercises, accuracy: data.exercises ? data.correct / data.exercises : 0, xp: data.xp })
    playSound('complete')
    confetti(160)
    onEnd(data)
  }

  function next() {
    if (timeUp) return finish()
    if (workDone) {
      const c = cycles + 1
      setCycles(c)
      setBreakLong(c % pomo.every === 0)
      setPhase('break')
      setPhaseStart(Date.now())
      setCurrent(null)
      return
    }
    pickNext()
  }

  function resume() {
    playSound('tap')
    setPhase('work')
    setPhaseStart(Date.now())
    lastTick.current = Date.now()
    pickNext()
  }

  const acc = count ? Math.round((correct / count) * 100) : 0
  // Petit cercle discret : la séance Pomodoro en cours, ou la durée totale
  const ringRatio = pomo.enabled ? 1 - phaseLeft / (phaseMinutes * 60_000) : config.minutes ? 1 - (totalLeft ?? 0) / (config.minutes * 60_000) : 0
  const ringLabel = pomo.enabled
    ? `${phase === 'work' ? 'Travail' : 'Pause'} : ${formatClock(phaseLeft)} restantes`
    : totalLeft !== null
      ? `Séance : ${formatClock(totalLeft)} restantes`
      : `Séance libre : ${formatClock(now - startedAt.current)}`

  return (
    <div className="lesson tryhard" style={{ ['--th' as string]: info.color, ['--unit' as string]: info.color }}>
      <header className="lesson-top tryhard-top">
        <button className="lesson-quit" onClick={() => setQuit(true)} aria-label="Quitter">
          ✕
        </button>
        <div className="live-stats">
          <span title="XP gagnée">⚡ {xp}</span>
          <span title="Exercices">✏️ {count}</span>
          <span title="Précision">🎯 {acc}%</span>
          {combo >= 3 && <span className="combo">🔥 {combo}</span>}
        </div>
        <button className="pomo-ring" onClick={() => setShowTimer(!showTimer)} aria-label="Afficher le temps restant">
          <ProgressRing ratio={ringRatio} size={30} stroke={4} color={phase === 'break' ? 'var(--success)' : 'var(--th)'} />
        </button>
        {showTimer && (
          <div className="pomo-pop" onClick={() => setShowTimer(false)}>
            {ringLabel}
            {pomo.enabled && <small>Séance {cycles + (phase === 'work' ? 1 : 0)} · niveau {level}</small>}
            {!pomo.enabled && <small>Niveau adapté : {level}</small>}
          </div>
        )}
      </header>

      {phase === 'break' ? (
        <main className="lesson-body break-screen">
          <Mascot mood="sleep" size={150} />
          <h1>{breakLong ? 'Grande pause !' : 'Petite pause'}</h1>
          <p className="break-clock">{formatClock(phaseLeft)}</p>
          <p className="muted">Lève-toi, bois un verre d’eau, regarde au loin. Ton cerveau range ce que tu viens d’apprendre.</p>
          <button className={`btn btn-block ${phaseLeft === 0 ? 'btn-success' : 'btn-secondary'}`} onClick={resume}>
            {phaseLeft === 0 ? 'Reprendre !' : 'Passer la pause'}
          </button>
        </main>
      ) : current ? (
        <ExerciseStage key={current.id} ex={current.ex} retry={current.retry} paused={quit} onAnswer={answered} onContinue={next} />
      ) : (
        <div className="lesson-empty">
          <Mascot mood="think" size={100} />
        </div>
      )}

      {(timeUp || config.minutes === null) && phase === 'work' && (
        <button className={`tryhard-finish ${timeUp ? 'pulse' : ''}`} onClick={finish}>
          {timeUp ? '⏰ Temps écoulé : voir le bilan' : 'Terminer la séance'}
        </button>
      )}

      {quit && (
        <QuitModal
          exitPath={info.exitPath}
          onStay={() => setQuit(false)}
          message="Tes réponses et ton XP sont gardées, mais tu n’auras pas le bilan. Utilise plutôt « Terminer la séance » pour le voir."
        />
      )}
    </div>
  )
}

function formatClock(ms: number): string {
  const s = Math.round(ms / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = String(s % 60).padStart(2, '0')
  return h ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`
}

// ---------- Bilan ----------

function Summary({ data, module }: { data: SummaryData; module: TryhardModule }) {
  const info = TRYHARD_INFO[module]
  const acc = data.exercises ? Math.round((data.correct / data.exercises) * 100) : 0
  return (
    <div className="lesson lesson-end tryhard-summary" style={{ ['--th' as string]: info.color }}>
      <div className="end-cast">
        <Character id="bolt" mood="dance" size={110} />
        <Mascot mood="dance" size={130} />
      </div>
      <h1>Séance terminée !</h1>
      <p className="muted">{data.name}</p>
      {data.workedSeconds >= 3600 && <p className="mastered-msg">💪 Badge Tryhard débloqué : plus d’une heure de travail !</p>}
      <div className="end-stats wide">
        <div className="end-stat time">
          <small>Temps de travail</small>
          <b>⏱️ {formatDuration(data.workedSeconds)}</b>
        </div>
        <div className="end-stat xp">
          <small>XP</small>
          <b>⚡ {data.xp}</b>
        </div>
        <div className="end-stat acc">
          <small>Précision</small>
          <b>🎯 {acc}%</b>
        </div>
        <div className="end-stat time">
          <small>Exercices</small>
          <b>✏️ {data.exercises}</b>
        </div>
        <div className="end-stat acc">
          <small>Mots réussis</small>
          <b>📚 {data.learned}</b>
        </div>
      </div>
      {(data.weakWords.length > 0 || data.weakTypes.length > 0) && (
        <section className="card weak-points">
          <h3>Tes points faibles</h3>
          {data.weakTypes.map((t) => (
            <p key={t.label}>
              • {t.label} : {t.wrong} erreur{t.wrong > 1 ? 's' : ''} sur {t.total}
            </p>
          ))}
          {data.weakWords.length > 0 && (
            <p className="weak-words" lang="en">
              {data.weakWords.map((w) => `${w.word} (${w.fr})`).join(' · ')}
            </p>
          )}
          <small>Ils t’attendent dans Révisions → Mes erreurs.</small>
        </section>
      )}
      <button className="btn btn-primary btn-block end-btn" onClick={() => navigate(info.exitPath)}>
        Continuer
      </button>
    </div>
  )
}
