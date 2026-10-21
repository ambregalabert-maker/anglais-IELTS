// Bloc « Aujourd'hui » de l'accueil : phase en cours, tâches du jour à cocher, et frise du plan.

import { useState } from 'react'
import Character from '../characters/Character'
import { dayKey, formatDuration, formatLongDate } from '../lib/dates'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { togglePlanCheck, useProgress } from '../store/progress'
import { isTaskDone, planInfo, todayTasks, weekStats } from './plan'

export default function TodayCard() {
  const p = useProgress()
  const [showPlan, setShowPlan] = useState(false)
  const info = planInfo(p)
  const today = dayKey()
  const { tasks, weekdayName } = todayTasks(p)
  const done = tasks.filter((t) => isTaskDone(p, t)).length
  const allDone = done === tasks.length
  const week = weekStats(p)
  const sunday = weekdayName === 'dimanche'

  if (info.finished) {
    return (
      <section className="card today">
        <div className="today-head">
          <Character id="pepin" mood="dance" size={70} />
          <div>
            <h2>L’examen est passé !</h2>
            <p className="muted">Change la date dans ton profil si tu prépares une nouvelle session.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="card today" style={{ ['--phase' as string]: info.phase.color }}>
      <div className="today-head">
        <div className="grow">
          <small className="phase-tag">
            Phase {info.phaseRanges.findIndex((r) => r.phase.id === info.phase.id) + 1} / 4 · {info.phase.title}
          </small>
          <h2>Aujourd’hui</h2>
          <p className="muted">
            {info.daysLeft === 0 ? 'C’est le jour J : bonne chance, tu es prête !' : `Jour ${info.dayIndex + 1} sur ${info.totalDays}`} · {done}/{tasks.length} tâches
          </p>
        </div>
        <Character id={allDone ? 'mia' : 'pepin'} mood={allDone ? 'dance' : 'wave'} size={64} />
      </div>

      {sunday && (
        <div className="week-recap">
          <b>Ta semaine</b>
          <span>
            ⏱️ {formatDuration(week.seconds)} · ⚡ {week.xp} XP · ✏️ {week.exercises} exercices · 🎯 {Math.round(week.accuracy * 100)} % · 📅 {week.activeDays}/7 jours
          </span>
        </div>
      )}

      <ul className="tasks">
        {tasks.map((t) => {
          const isDone = isTaskDone(p, t)
          return (
            <li key={t.id} className={isDone ? 'done' : ''}>
              <button
                className="task-check"
                aria-label={isDone ? 'Décocher' : 'Cocher'}
                onClick={() => {
                  playSound(isDone ? 'tap' : 'correct')
                  togglePlanCheck(today, t.id)
                }}
              >
                {isDone ? '✓' : ''}
              </button>
              <button
                className="task-body"
                onClick={() => {
                  playSound('tap')
                  if (t.href) window.open(t.href, '_blank', 'noopener')
                  else if (t.path) navigate(t.path)
                }}
              >
                <span className="task-icon">{t.icon}</span>
                <span className="grow">
                  <b>{t.title}</b>
                  <small>
                    {t.detail} · {t.minutes}
                  </small>
                </span>
                <span className="task-go">›</span>
              </button>
            </li>
          )
        })}
      </ul>
      {allDone && <p className="all-done">🎉 Programme du jour terminé ! Tout le reste est du bonus.</p>}

      <button className="plan-toggle" onClick={() => setShowPlan(!showPlan)}>
        {showPlan ? 'Masquer le plan' : 'Voir le plan complet'} {showPlan ? '▲' : '▼'}
      </button>
      {showPlan && (
        <div className="plan">
          <div className="plan-bar">
            {info.phaseRanges.map((r) => (
              <div key={r.phase.id} className="plan-seg" style={{ flex: Math.max(1, r.endDay - r.startDay), background: r.phase.color }} title={r.phase.title} />
            ))}
            <div className="plan-marker" style={{ left: `${Math.min(100, (info.dayIndex / info.totalDays) * 100)}%` }} />
          </div>
          {info.phaseRanges.map((r, i) => (
            <div key={r.phase.id} className={`plan-phase ${r.phase.id === info.phase.id ? 'current' : ''}`} style={{ ['--c' as string]: r.phase.color }}>
              <b>
                {i + 1}. {r.phase.title}
              </b>
              <small>
                {formatLongDate(r.from)} → {formatLongDate(r.to)} · {Math.max(0, r.endDay - r.startDay)} jours
              </small>
              <p>{r.phase.summary}</p>
              <ul>
                {r.phase.focus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
          <p className="muted small-note">Le plan se recalcule si tu changes la date de l’examen (Profil → Réglages).</p>
          <button className="link-btn" onClick={() => navigate('/exam')}>
            📋 Le format de l’examen et ta note estimée
          </button>
        </div>
      )}
    </section>
  )
}
