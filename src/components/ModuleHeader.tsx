import type { ReactNode } from 'react'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'

interface Props {
  title: string
  subtitle: string
  color: string
  icon: ReactNode
  tryhard?: string // module du mode Tryhard (home, vocab, writing, listening) ; absent = pas de bouton
}

/** En-tête coloré d'un module, avec le bouton « Mode Tryhard ». */
export default function ModuleHeader({ title, subtitle, color, icon, tryhard }: Props) {
  return (
    <section className="module-header" style={{ ['--mod' as string]: color }}>
      <div className="module-header-icon">{icon}</div>
      <div className="module-header-text">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {tryhard && (
        <button
          className="btn btn-tryhard"
          onClick={() => {
            playSound('tap')
            navigate(`/tryhard/${tryhard}`)
          }}
        >
          💪 Tryhard
        </button>
      )}
    </section>
  )
}
