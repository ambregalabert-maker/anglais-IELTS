// Compte le temps de travail effectif pendant qu'un exercice est ouvert
// (s'arrête quand l'onglet est caché). Ce temps remplit l'objectif du jour.

import { useEffect } from 'react'
import { addStudyTime } from '../store/progress'

const TICK = 10 // secondes

export function useStudyTimer(active = true) {
  useEffect(() => {
    if (!active) return
    let last = Date.now()
    let pending = 0
    const flush = () => {
      if (pending > 0) addStudyTime(pending)
      pending = 0
    }
    const id = window.setInterval(() => {
      const now = Date.now()
      // Si l'onglet était caché, on ne compte pas ce temps-là
      if (document.visibilityState === 'visible') pending += Math.min((now - last) / 1000, TICK * 2)
      last = now
      if (pending >= TICK) flush()
    }, 1000)
    const onHide = () => {
      if (document.visibilityState === 'hidden') flush()
      last = Date.now()
    }
    document.addEventListener('visibilitychange', onHide)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', onHide)
      flush()
    }
  }, [active])
}
