import type { ReactNode } from 'react'
import { toast } from '../store/events'

interface Props {
  title: string
  subtitle: string
  color: string
  icon: ReactNode
  tryhard?: boolean
}

/** En-tête coloré d'un module, avec le bouton « Mode Tryhard ». */
export default function ModuleHeader({ title, subtitle, color, icon, tryhard = true }: Props) {
  return (
    <section className="module-header" style={{ ['--mod' as string]: color }}>
      <div className="module-header-icon">{icon}</div>
      <div className="module-header-text">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {tryhard && (
        <button className="btn btn-tryhard" onClick={() => toast('Le mode Tryhard arrive à l’étape 7', '💪')}>
          💪 Tryhard
        </button>
      )}
    </section>
  )
}
