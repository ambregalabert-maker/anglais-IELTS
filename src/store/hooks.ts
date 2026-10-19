// Raccourcis pratiques pour lire la progression dans les pages.

import { useEffect } from 'react'
import { dayKey, daysBetween } from '../lib/dates'
import { configureVoice, setSoundEnabled } from '../lib/sound'
import { useProgress } from './progress'
import type { DayLog } from './types'

const EMPTY: DayLog = { xp: 0, seconds: 0, exercises: 0, correct: 0 }

export function useToday() {
  const p = useProgress()
  const log = p.days[dayKey()] ?? EMPTY
  const goalSeconds = p.settings.dailyGoalMinutes * 60
  return { log, goalSeconds, goalRatio: log.seconds / goalSeconds, minutes: Math.floor(log.seconds / 60) }
}

export function useDaysToExam() {
  const p = useProgress()
  return daysBetween(dayKey(), p.settings.examDate)
}

/** Applique le thème (clair / sombre) et le réglage du son. */
export function useApplySettings() {
  const { theme, sound, voice, voiceURI, voiceRate } = useProgress().settings
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)
  }, [theme])
  useEffect(() => setSoundEnabled(sound), [sound])
  useEffect(() => configureVoice({ enabled: voice, voiceURI, rate: voiceRate }), [voice, voiceURI, voiceRate])
}
