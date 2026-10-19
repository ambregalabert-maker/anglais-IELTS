// Réagit aux événements du store : messages (toasts), confettis, sons et écran « niveau supérieur ».

import { useEffect, useState } from 'react'
import { BADGE_BY_ID } from '../data/badges'
import { confetti } from '../lib/confetti'
import { playSound } from '../lib/sound'
import { onEvent } from '../store/events'
import Mascot from './Mascot'

interface Toast {
  id: number
  icon?: string
  text: string
  sub?: string
}

let nextId = 1

export default function Celebrations() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [levelUp, setLevelUp] = useState<number | null>(null)

  useEffect(() => {
    const push = (t: Omit<Toast, 'id'>) => {
      const id = nextId++
      setToasts((list) => [...list, { ...t, id }])
      setTimeout(() => setToasts((list) => list.filter((x) => x.id !== id)), 3800)
    }
    return onEvent((e) => {
      switch (e.type) {
        case 'toast':
          push({ icon: e.icon, text: e.text })
          break
        case 'streak':
          push({ icon: '🔥', text: e.days === 1 ? 'Série lancée : 1 jour !' : `Série : ${e.days} jours d’affilée !` })
          break
        case 'goalReached':
          playSound('complete')
          confetti(80)
          push({ icon: '🎯', text: 'Objectif du jour atteint, bravo !' })
          break
        case 'badge': {
          const b = BADGE_BY_ID[e.id]
          if (!b) break
          playSound('badge')
          confetti(60)
          push({ icon: b.icon, text: `Nouveau badge : ${b.title}`, sub: b.description })
          break
        }
        case 'levelUp':
          playSound('levelUp')
          confetti(160)
          setLevelUp(e.level)
          break
      }
    })
  }, [])

  return (
    <>
      <div className="toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            {t.icon && <span className="toast-icon">{t.icon}</span>}
            <span>
              <b>{t.text}</b>
              {t.sub && <small>{t.sub}</small>}
            </span>
          </div>
        ))}
      </div>
      {levelUp !== null && (
        <div className="modal-backdrop" onClick={() => setLevelUp(null)}>
          <div className="modal pop-in" onClick={(e) => e.stopPropagation()}>
            <Mascot mood="dance" size={130} />
            <h2>Niveau {levelUp} !</h2>
            <p>Tu progresses à vue d’œil. Continue comme ça !</p>
            <button className="btn btn-primary btn-block" onClick={() => setLevelUp(null)}>
              Continuer
            </button>
          </div>
        </div>
      )}
    </>
  )
}
