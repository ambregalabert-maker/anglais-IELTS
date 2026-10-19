import { dayKey } from '../lib/dates'
import { levelInfo } from '../lib/levels'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { useToday } from '../store/hooks'
import { updateSettings, useProgress } from '../store/progress'
import { IconBolt, IconFlame } from './Icons'
import ProgressRing from './ProgressRing'

/** Barre du haut : série, XP / niveau, objectif du jour, son. */
export default function TopBar() {
  const p = useProgress()
  const { goalRatio, minutes } = useToday()
  const lvl = levelInfo(p.xp)
  const doneToday = p.streak.lastActiveDay === dayKey()
  const muted = !p.settings.sound && !p.settings.voice

  return (
    <header className="topbar">
      <button className="stat-chip" onClick={() => navigate('/profile')} title="Série de jours">
        <IconFlame active={doneToday} />
        <span style={{ color: doneToday ? 'var(--flame)' : 'var(--text-soft)' }}>{p.streak.current}</span>
        {p.streak.freezes > 0 && <span className="freeze" title="Gels de série">🧊{p.streak.freezes}</span>}
      </button>
      <button className="stat-chip" onClick={() => navigate('/profile')} title={`Niveau ${lvl.level}`}>
        <IconBolt />
        <span style={{ color: 'var(--xp)' }}>{p.xp}</span>
        <span className="level-pill">Niv. {lvl.level}</span>
      </button>
      <button className="stat-chip" onClick={() => navigate('/profile')} title="Objectif du jour">
        <ProgressRing ratio={goalRatio} size={30} stroke={4} color={goalRatio >= 1 ? 'var(--success)' : 'var(--primary)'} />
        <span>
          {minutes}/{p.settings.dailyGoalMinutes}
          <small> min</small>
        </span>
      </button>
      <button
        className="icon-btn"
        onClick={() => {
          // Coupe (ou remet) tout : les effets sonores ET la voix
          updateSettings({ sound: muted, voice: muted })
          if (muted) setTimeout(() => playSound('tap'), 0)
        }}
        title={muted ? 'Activer le son' : 'Couper tout le son'}
        aria-label={muted ? 'Activer le son' : 'Couper tout le son'}
      >
        {muted ? '🔇' : '🔊'}
      </button>
    </header>
  )
}
