// Chrono à rebours (Reading, Speaking).

import { useEffect, useState } from 'react'

export function formatClock(seconds: number): string {
  const s = Math.abs(Math.round(seconds))
  return `${seconds < 0 ? '+' : ''}${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

/** Compte à rebours qu'on peut mettre en pause ; passe en négatif (rouge) quand le temps est écoulé. */
export function useCountdown(totalSeconds: number, running: boolean) {
  const [left, setLeft] = useState(totalSeconds)
  useEffect(() => {
    if (!running) return
    const t = setInterval(() => setLeft((l) => l - 1), 1000)
    return () => clearInterval(t)
  }, [running])
  return [left, setLeft] as const
}
