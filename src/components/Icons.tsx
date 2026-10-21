// Icônes dessinées à la main (SVG), colorées comme dans une appli de jeu.

interface IconProps {
  size?: number
}

export function IconPath({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M6 26 C6 18 26 20 26 12 C26 8 22 6 18 6" stroke="#ffc93c" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="1 6" />
      <circle cx="6" cy="26" r="4" fill="#6c4cf5" />
      <circle cx="18" cy="6" r="4" fill="#3ccf7a" />
      <path d="M14 15 l3-3 3 3-3 3z" fill="#ff9a4d" />
    </svg>
  )
}

export function IconFlask({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M12 4h8v2h-1v7l7 11a3 3 0 0 1-2.6 4.5H8.6A3 3 0 0 1 6 24l7-11V6h-1z" fill="#e8e1ff" stroke="#6c4cf5" strokeWidth="2" strokeLinejoin="round" />
      <path d="M8.5 22h15l1.4 2.4a1.5 1.5 0 0 1-1.3 2.3H8.4a1.5 1.5 0 0 1-1.3-2.3z" fill="#36b5ff" />
      <circle cx="14" cy="18" r="1.5" fill="#36b5ff" />
      <circle cx="18" cy="15" r="1" fill="#36b5ff" />
    </svg>
  )
}

export function IconPen({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect x="5" y="4" width="17" height="23" rx="3" fill="#fff4dc" stroke="#ff9a4d" strokeWidth="2" />
      <path d="M9 10h9M9 14h9M9 18h5" stroke="#ff9a4d" strokeWidth="2" strokeLinecap="round" />
      <path d="M26.5 9.5l2 2-10 10-3 1 1-3z" fill="#ff5d8f" stroke="#c9346a" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function IconHeadphones({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M6 19v-3a10 10 0 0 1 20 0v3" stroke="#2fa866" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="4" y="17" width="7" height="10" rx="3" fill="#3ccf7a" />
      <rect x="21" y="17" width="7" height="10" rx="3" fill="#3ccf7a" />
    </svg>
  )
}

export function IconCards({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect x="9" y="4" width="16" height="21" rx="3" fill="#ffd9e5" stroke="#ff5d8f" strokeWidth="2" transform="rotate(10 17 14)" />
      <rect x="6" y="7" width="16" height="21" rx="3" fill="#fff" stroke="#ff5d8f" strokeWidth="2" />
      <path d="M11 16a3 3 0 1 1 3 3v2" stroke="#ff5d8f" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function IconUser({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="13" fill="#e8e1ff" />
      <circle cx="16" cy="13" r="5" fill="#6c4cf5" />
      <path d="M7 25a10 8 0 0 1 18 0" fill="#6c4cf5" />
    </svg>
  )
}

export function IconFlame({ size = 24, active = true }: IconProps & { active?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className={active ? 'flame flame--on' : 'flame'}>
      <path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 1.5-4.5 3-6 0 2 1 3 2 3-1-3 0-6 1-9z" fill={active ? '#ff8a1f' : '#c9c3d6'} />
      <path d="M12 12c.5 2 3 3 3 5.5a3 3 0 0 1-6 0c0-1.5 1-2.5 2-3 0 1 .5 1.5 1 1.5-.5-1.5-.5-3 0-4z" fill={active ? '#ffd23f' : '#e2ddeb'} />
    </svg>
  )
}

export function IconBolt({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M13 2L4 14h6l-1 8 9-12h-6z" fill="#ffc93c" stroke="#e8a400" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function IconSpeaker({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
      <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function IconLock({ size = 26 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <rect x="5" y="10" width="14" height="11" rx="3" fill="currentColor" />
      <path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="2.5" fill="none" />
    </svg>
  )
}

export function IconStar({ size = 30 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.5L12 17.2l-5.9 3.2 1.3-6.5L2.5 9.3l6.6-.8z" fill="currentColor" />
    </svg>
  )
}

export function IconCrown({ size = 30 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z" fill="currentColor" />
    </svg>
  )
}

export function IconCheck({ size = 30 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconTrophy({ size = 30 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M7 3h10v5a5 5 0 0 1-10 0z" fill="currentColor" />
      <path d="M7 5H4a3 3 0 0 0 3 4M17 5h3a3 3 0 0 1-3 4" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M10 13h4v3h2v4H8v-4h2z" fill="currentColor" />
    </svg>
  )
}

export function IconBook({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M4 7c4-2 8-2 12 1v18c-4-3-8-3-12-1z" fill="#c8f1ef" stroke="#00a8a8" strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 7c-4-2-8-2-12 1v18c4-3 8-3 12-1z" fill="#fff" stroke="#00a8a8" strokeWidth="2" strokeLinejoin="round" />
      <path d="M19 13h5M19 17h5" stroke="#00a8a8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconMic({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect x="11" y="3" width="10" height="17" rx="5" fill="#ffc93c" stroke="#d19a00" strokeWidth="2" />
      <path d="M7 15a9 9 0 0 0 18 0M16 24v5M11 29h10" stroke="#d19a00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function IconExam({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect x="6" y="4" width="20" height="25" rx="3" fill="#fff" stroke="#6c4cf5" strokeWidth="2" />
      <rect x="11" y="2" width="10" height="5" rx="2" fill="#6c4cf5" />
      <path d="M10 14l2 2 4-4M10 22l2 2 4-4M19 14h3M19 22h3" stroke="#6c4cf5" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}
