import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { MODULES, type ModuleDef } from '../modules/registry'

/** Navigation : en bas sur téléphone, sur le côté sur ordinateur (géré en CSS). */
export default function NavBar({ active }: { active: ModuleDef }) {
  return (
    <nav className="navbar" aria-label="Navigation principale">
      <div className="nav-brand">
        <span className="nav-brand-dot" /> Pépin <b>IELTS</b>
      </div>
      {MODULES.map((m) => (
        <button
          key={m.id}
          className={`nav-item ${m.id === active.id ? 'active' : ''}`}
          style={{ ['--mod' as string]: m.color }}
          onClick={() => {
            playSound('tap')
            navigate(m.path)
          }}
          aria-current={m.id === active.id ? 'page' : undefined}
        >
          <span className="nav-icon">{m.icon}</span>
          <span className="nav-label">{m.label}</span>
        </button>
      ))}
    </nav>
  )
}
