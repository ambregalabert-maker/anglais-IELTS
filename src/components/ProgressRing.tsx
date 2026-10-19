import type { ReactNode } from 'react'

interface Props {
  ratio: number
  size?: number
  stroke?: number
  color?: string
  track?: string
  children?: ReactNode
}

/** Anneau qui se remplit (objectif du jour, Pomodoro…). */
export default function ProgressRing({ ratio, size = 44, stroke = 5, color = 'var(--primary)', track = 'var(--track)', children }: Props) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const clamped = Math.max(0, Math.min(1, ratio))
  return (
    <span className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle
          className="ring-value"
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - clamped)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {children && <span className="ring-content">{children}</span>}
    </span>
  )
}
