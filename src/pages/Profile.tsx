import { useRef, useState } from 'react'
import { IconUser } from '../components/Icons'
import Mascot, { type MascotMood } from '../components/Mascot'
import ModuleHeader from '../components/ModuleHeader'
import { BADGES } from '../data/badges'
import { formatDuration, formatLongDate } from '../lib/dates'
import { levelInfo } from '../lib/levels'
import { playSound } from '../lib/sound'
import { toast } from '../store/events'
import { addXp, exportProgress, importProgress, resetProgress, updateSettings, useProgress } from '../store/progress'
import type { ThemePref } from '../store/types'

const GOALS = [10, 15, 20, 30, 45, 60]
const THEMES: { id: ThemePref; label: string }[] = [
  { id: 'system', label: 'Auto' },
  { id: 'light', label: 'Clair' },
  { id: 'dark', label: 'Sombre' },
]
const MOODS: { id: MascotMood; label: string }[] = [
  { id: 'idle', label: 'Normal' },
  { id: 'happy', label: 'Contente' },
  { id: 'sad', label: 'Encourage' },
  { id: 'dance', label: 'Danse' },
  { id: 'wave', label: 'Coucou' },
  { id: 'think', label: 'Réfléchit' },
  { id: 'sleep', label: 'Dort' },
]

export default function Profile() {
  const p = useProgress()
  const lvl = levelInfo(p.xp)
  const fileRef = useRef<HTMLInputElement>(null)
  const [mood, setMood] = useState<MascotMood>('happy')

  const days = Object.values(p.days)
  const totalSeconds = days.reduce((s, d) => s + d.seconds, 0)
  const exercises = days.reduce((s, d) => s + d.exercises, 0)
  const correct = days.reduce((s, d) => s + d.correct, 0)

  function download() {
    const blob = new Blob([exportProgress()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `pepin-ielts-progression-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    toast('Progression exportée', '💾')
  }

  async function onImport(file: File | undefined) {
    if (!file) return
    const ok = importProgress(await file.text())
    toast(ok ? 'Progression importée !' : 'Fichier non reconnu', ok ? '✅' : '⚠️')
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="page">
      <ModuleHeader title="Profil & progrès" subtitle="Tes statistiques, tes badges et tes réglages" color="#6c4cf5" icon={<IconUser size={36} />} tryhard={false} />

      <section className="card level-card">
        <div className="level-badge">{lvl.level}</div>
        <div className="grow">
          <b>Niveau {lvl.level}</b>
          <div className="bar">
            <div className="bar-fill" style={{ width: `${lvl.ratio * 100}%` }} />
          </div>
          <small>
            {lvl.intoLevel} / {lvl.needed} XP avant le niveau {lvl.level + 1}
          </small>
        </div>
      </section>

      <section className="stats-grid">
        <Stat icon="🔥" value={p.streak.current} label="jours de série" />
        <Stat icon="🏆" value={p.streak.best} label="meilleure série" />
        <Stat icon="⚡" value={p.xp} label="XP au total" />
        <Stat icon="⏱️" value={formatDuration(totalSeconds)} label="de travail" />
        <Stat icon="✏️" value={exercises} label="exercices" />
        <Stat icon="🎯" value={exercises ? `${Math.round((correct / exercises) * 100)}%` : '–'} label="de précision" />
      </section>

      <h2 className="section-title">Badges</h2>
      <section className="badges-grid">
        {BADGES.map((b) => {
          const earned = p.badges[b.id]
          return (
            <div key={b.id} className={`badge ${earned ? 'earned' : ''}`} title={b.description}>
              <span className="badge-icon">{b.icon}</span>
              <b>{b.title}</b>
              <small>{earned ? `Obtenu le ${formatLongDate(earned)}` : b.description}</small>
            </div>
          )
        })}
      </section>

      <h2 className="section-title">Réglages</h2>
      <section className="card settings">
        <label className="setting">
          <span>
            <b>Date de l’examen</b>
            <small>Le compte à rebours et le plan se basent dessus</small>
          </span>
          <input
            type="date"
            value={p.settings.examDate}
            onChange={(e) => e.target.value && updateSettings({ examDate: e.target.value })}
          />
        </label>
        <div className="setting">
          <span>
            <b>Objectif du jour</b>
            <small>Minutes de travail par jour</small>
          </span>
          <div className="segmented">
            {GOALS.map((g) => (
              <button key={g} className={p.settings.dailyGoalMinutes === g ? 'on' : ''} onClick={() => updateSettings({ dailyGoalMinutes: g })}>
                {g}
              </button>
            ))}
          </div>
        </div>
        <div className="setting">
          <span>
            <b>Thème</b>
            <small>Auto = comme ton téléphone</small>
          </span>
          <div className="segmented">
            {THEMES.map((t) => (
              <button key={t.id} className={p.settings.theme === t.id ? 'on' : ''} onClick={() => updateSettings({ theme: t.id })}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <label className="setting">
          <span>
            <b>Sons</b>
            <small>Bonne réponse, erreur, badges…</small>
          </span>
          <input type="checkbox" className="switch" checked={p.settings.sound} onChange={(e) => updateSettings({ sound: e.target.checked })} />
        </label>
      </section>

      <h2 className="section-title">Sauvegarde</h2>
      <section className="card">
        <p className="muted">
          Ta progression est enregistrée dans ce navigateur. Exporte-la de temps en temps pour ne rien perdre, ou pour la
          transférer sur un autre appareil.
        </p>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={download}>
            💾 Exporter
          </button>
          <button className="btn btn-secondary" onClick={() => fileRef.current?.click()}>
            📂 Importer
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => onImport(e.target.files?.[0])} />
          <button
            className="btn btn-danger"
            onClick={() => {
              if (confirm('Effacer toute ta progression ? (Tes réglages sont gardés.) Pense à exporter avant.')) {
                resetProgress()
                toast('Progression remise à zéro', '🧹')
              }
            }}
          >
            Réinitialiser
          </button>
        </div>
      </section>

      <h2 className="section-title">Aperçu de l’étape 1</h2>
      <section className="card preview">
        <p className="muted">Zone de test, retirée à la fin : les humeurs de Pépin et les sons.</p>
        <div className="preview-mascot">
          <Mascot mood={mood} size={120} />
        </div>
        <div className="chip-row">
          {MOODS.map((m) => (
            <button key={m.id} className={`chip ${mood === m.id ? 'on' : ''}`} onClick={() => setMood(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
        <div className="chip-row">
          <button className="chip" onClick={() => playSound('correct')}>✅ Juste</button>
          <button className="chip" onClick={() => playSound('wrong')}>❌ Faux</button>
          <button className="chip" onClick={() => playSound('complete')}>🎉 Fin de leçon</button>
          <button className="chip" onClick={() => playSound('badge')}>🏅 Badge</button>
          <button className="chip" onClick={() => addXp(25)}>⚡ +25 XP (test)</button>
        </div>
      </section>
    </div>
  )
}

function Stat({ icon, value, label }: { icon: string; value: string | number; label: string }) {
  return (
    <div className="stat card">
      <span className="stat-icon">{icon}</span>
      <b>{value}</b>
      <small>{label}</small>
    </div>
  )
}
