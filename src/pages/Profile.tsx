import { useEffect, useRef, useState } from 'react'
import { IconUser } from '../components/Icons'
import { CAST } from '../characters/cast'
import Character from '../characters/Character'
import type { MascotMood } from '../components/Mascot'
import ModuleHeader from '../components/ModuleHeader'
import { BADGES } from '../data/badges'
import { formatDuration, formatLongDate } from '../lib/dates'
import { levelInfo } from '../lib/levels'
import { englishVoices, onVoicesChanged, speak, voiceScore, type VoiceEngine } from '../lib/sound'
import { toast } from '../store/events'
import { exportProgress, importProgress, resetProgress, updateSettings, useProgress } from '../store/progress'
import type { Difficulty, ThemePref } from '../store/types'

const GOALS = [10, 15, 20, 30, 45, 60]
const THEMES: { id: ThemePref; label: string }[] = [
  { id: 'system', label: 'Auto' },
  { id: 'light', label: 'Clair' },
  { id: 'dark', label: 'Sombre' },
]
const DIFFICULTIES: { id: Difficulty; label: string }[] = [
  { id: 'normal', label: 'Normale' },
  { id: 'hard', label: 'Difficile 💪' },
  { id: 'expert', label: 'Expert 🧠' },
]
const RATES = [
  { value: 0.75, label: 'Lente' },
  { value: 0.9, label: 'Normale' },
  { value: 1.05, label: 'Rapide' },
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
  const [mood, setMood] = useState<MascotMood>('idle')
  const [talkingId, setTalkingId] = useState<string | null>(null)

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
      <ModuleHeader title="Profil & progrès" subtitle="Tes statistiques, tes badges et tes réglages" color="#6c4cf5" icon={<IconUser size={36} />} />

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
        <div className="setting">
          <span>
            <b>Difficulté des leçons</b>
            <small>Difficile : surtout des réponses à taper (+50 % d’XP). Expert : tout à produire, indices en anglais seulement (×2 XP)</small>
          </span>
          <div className="segmented">
            {DIFFICULTIES.map((d) => (
              <button key={d.id} className={p.settings.difficulty === d.id ? 'on' : ''} onClick={() => updateSettings({ difficulty: d.id })}>
                {d.label}
              </button>
            ))}
          </div>
        </div>
        <label className="setting">
          <span>
            <b>Effets sonores</b>
            <small>Bonne réponse, erreur, badges…</small>
          </span>
          <input type="checkbox" className="switch" checked={p.settings.sound} onChange={(e) => updateSettings({ sound: e.target.checked })} />
        </label>
        <label className="setting">
          <span>
            <b>Voix</b>
            <small>Prononciation des mots et des phrases</small>
          </span>
          <input type="checkbox" className="switch" checked={p.settings.voice} onChange={(e) => updateSettings({ voice: e.target.checked })} />
        </label>
        {p.settings.voice && <VoiceSettings engine={p.settings.voiceEngine} voiceURI={p.settings.voiceURI} rate={p.settings.voiceRate} />}
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

      <h2 className="section-title">Ta bande</h2>
      <section className="card cast">
        <div className="chip-row">
          {MOODS.map((m) => (
            <button key={m.id} className={`chip ${mood === m.id ? 'on' : ''}`} onClick={() => setMood(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
        <div className="cast-grid">
          {CAST.map((c) => (
            <div key={c.id} className="cast-card" style={{ ['--c' as string]: c.color }}>
              <Character id={c.id} mood={talkingId === c.id ? 'idle' : mood} talking={talkingId === c.id} size={96} />
              <b>{c.name}</b>
              <small>{c.role}</small>
              <button
                className="chip"
                onClick={() =>
                  speak(c.catchphrase, { force: true, profile: c.voice, onStart: () => setTalkingId(c.id), onEnd: () => setTalkingId(null) })
                }
              >
                ▶ Sa voix
              </button>
            </div>
          ))}
        </div>
        <p className="muted small-note">
          Chaque personnage a sa voix britannique enregistrée : Emma pour Pépin, George pour Earl Grey, Isabella pour Mia, Daniel
          pour Bolt et Lily pour Nimbus.
        </p>
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

/** Réglages de la voix : voix humaines enregistrées (par défaut) ou voix de l'appareil. */
function VoiceSettings({ engine, voiceURI, rate }: { engine: VoiceEngine; voiceURI: string | null; rate: number }) {
  const [voices, setVoices] = useState(englishVoices)
  useEffect(() => onVoicesChanged(() => setVoices(englishVoices())), [])
  const best = voices[0]
  const test = (uri?: string) => speak('Hello! I am preparing for the IELTS exam.', { force: true, voiceURI: uri })

  return (
    <div className="voice-settings">
      <div className="setting">
        <span>
          <b>Type de voix</b>
          <small>
            {engine === 'neural'
              ? 'Voix humaines enregistrées : les mêmes sur tous les appareils, et hors ligne une fois écoutées'
              : 'Voix installées sur cet appareil (qualité variable)'}
          </small>
        </span>
        <div className="segmented">
          <button className={engine === 'neural' ? 'on' : ''} onClick={() => updateSettings({ voiceEngine: 'neural' })}>
            Humaines ✨
          </button>
          <button className={engine === 'device' ? 'on' : ''} onClick={() => updateSettings({ voiceEngine: 'device' })}>
            Appareil
          </button>
        </div>
      </div>
      {engine === 'neural' ? (
        <div className="setting">
          <span>
            <b>Voix principale : Emma</b>
            <small>Britannique, comme à l’examen. Chaque personnage a aussi sa propre voix.</small>
          </span>
          <button className="chip" onClick={() => test()}>
            ▶ Tester
          </button>
        </div>
      ) : (
        <div className="setting">
          <span>
            <b>Voix anglaise</b>
            <small>{voices.length ? `${voices.length} voix disponibles sur cet appareil` : 'Aucune voix anglaise trouvée sur cet appareil'}</small>
          </span>
          <div className="voice-pick">
            <select value={voiceURI ?? ''} onChange={(e) => updateSettings({ voiceURI: e.target.value || null })}>
              <option value="">Automatique{best ? ` (${best.name})` : ''}</option>
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {voiceScore(v) >= 80 ? '★ ' : ''}
                  {v.name} · {v.lang}
                </option>
              ))}
            </select>
            <button className="chip" onClick={() => test(voiceURI ?? best?.voiceURI)}>
              ▶ Tester
            </button>
          </div>
        </div>
      )}
      <div className="setting">
        <span>
          <b>Vitesse</b>
        </span>
        <div className="segmented">
          {RATES.map((r) => (
            <button key={r.value} className={rate === r.value ? 'on' : ''} onClick={() => updateSettings({ voiceRate: r.value })}>
              {r.label}
            </button>
          ))}
        </div>
      </div>
      {engine === 'device' && (
        <p className="muted small-note">
          Astuce iPhone : Réglages → Accessibilité → Contenu énoncé → Voix → Anglais (Royaume-Uni) → télécharge une voix « améliorée »
          ou « premium » (ex. Serena, Daniel), puis choisis-la ici (★ = voix de bonne qualité).
        </p>
      )}
    </div>
  )
}
