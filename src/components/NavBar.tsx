import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { MODULES, type ModuleDef } from '../modules/registry'
import { dueWords, openMistakes } from '../review/data'
import { useProgress } from '../store/progress'

/** Navigation : en bas sur téléphone, sur le côté sur ordinateur (géré en CSS). */
export default function NavBar({ active }: { active: ModuleDef }) {
  const p = useProgress()
  // Pastille rouge sur « Révisions » : mots à revoir + erreurs à corriger
  const badges: Record<string, number> = { review: dueWords(p).length + openMistakes(p).length }
  return (
    <nav className="navbar" aria-label="Navigation principale">
      <div className="nav-brand">
        <span className="nav-brand-dot" /> Pépin <b>IELTS</b>
      </div>
      {MODULES.filter((m) => !m.hidden).map((m) => (
        <button
          key={m.id}
          className={`nav-item ${m.id === active.id ? 'active' : ''} ${m.phone === false ? 'desktop-only' : ''}`}
          style={{ ['--mod' as string]: m.color }}
          onClick={() => {
            playSound('tap')
            navigate(m.path)
          }}
          aria-current={m.id === active.id ? 'page' : undefined}
        >
          <span className="nav-icon">
            {m.icon}
            {badges[m.id] > 0 && <span className="nav-badge">{badges[m.id] > 99 ? '99+' : badges[m.id]}</span>}
          </span>
          <span className="nav-label">
            <span className="label-long">{m.label}</span>
            <span className="label-short">{m.short ?? m.label}</span>
          </span>
        </button>
      ))}
    </nav>
  )
}
