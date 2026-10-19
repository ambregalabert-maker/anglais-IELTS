// Pépin, la mascotte : une petite graine avec une pousse sur la tête.
// Dessinée en SVG, animée en CSS (styles/mascot.css).

export type MascotMood = 'idle' | 'happy' | 'sad' | 'dance' | 'sleep' | 'wave' | 'think'

interface Props {
  mood?: MascotMood
  size?: number
  className?: string
  talking?: boolean // la bouche bouge pendant que la voix parle
}

export default function Mascot({ mood = 'idle', size = 120, className = '', talking = false }: Props) {
  const eyesClosed = mood === 'happy' || mood === 'dance' || mood === 'sleep'
  const armsUp = mood === 'dance'
  return (
    <svg
      className={`mascot mascot--${mood} ${className}`}
      width={size}
      height={size * (130 / 120)}
      viewBox="0 0 120 130"
      role="img"
      aria-label="Pépin, la mascotte"
    >
      <g className="m-all">
        <ellipse className="m-shadow" cx="60" cy="126" rx="34" ry="4" />
        <g className="m-feet">
          <ellipse cx="45" cy="121" rx="11" ry="6" fill="#e9772b" />
          <ellipse cx="75" cy="121" rx="11" ry="6" fill="#e9772b" />
        </g>
        <g className="m-body">
          {/* bras */}
          <g className={`m-arm m-arm-l ${armsUp ? 'up' : ''}`}>
            <ellipse cx="19" cy="88" rx="7" ry="13" fill="#f5842f" transform="rotate(20 19 88)" />
          </g>
          <g className={`m-arm m-arm-r ${armsUp || mood === 'wave' ? 'up' : ''}`}>
            <ellipse cx="101" cy="88" rx="7" ry="13" fill="#f5842f" transform="rotate(-20 101 88)" />
          </g>
          {/* corps */}
          <path
            d="M60 24 C92 24 104 58 102 82 C100 108 82 121 60 121 C38 121 20 108 18 82 C16 58 28 24 60 24 Z"
            fill="#ff9a4d"
          />
          <ellipse cx="60" cy="98" rx="26" ry="19" fill="#ffc28f" opacity="0.75" />
          <path d="M40 34 C34 42 30 52 30 60" stroke="#ffd2ad" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.8" />
          {/* pousse */}
          <g className="m-sprout">
            <path d="M60 26 C60 20 60 16 61 10" stroke="#2fa866" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M61 13 C52 2 38 5 40 14 C46 19 56 18 61 13 Z" fill="#3ccf7a" />
            <path d="M61 11 C71 -1 86 3 83 11 C77 17 67 16 61 11 Z" fill="#52de8c" />
          </g>
          {/* sourcils (déçu / réfléchit) */}
          {mood === 'sad' && (
            <g stroke="#2b2140" strokeWidth="3" strokeLinecap="round">
              <path d="M37 55 L50 50" />
              <path d="M83 55 L70 50" />
            </g>
          )}
          {mood === 'think' && (
            <g stroke="#2b2140" strokeWidth="3" strokeLinecap="round">
              <path d="M37 52 Q44 47 51 51" fill="none" />
              <path d="M70 49 L83 49" />
            </g>
          )}
          {/* yeux */}
          {eyesClosed ? (
            <g stroke="#2b2140" strokeWidth="3.5" strokeLinecap="round" fill="none">
              {mood === 'sleep' ? (
                <>
                  <path d="M38 67 Q45 71 52 67" />
                  <path d="M68 67 Q75 71 82 67" />
                </>
              ) : (
                <>
                  <path d="M38 69 Q45 59 52 69" />
                  <path d="M68 69 Q75 59 82 69" />
                </>
              )}
            </g>
          ) : (
            <g className="m-eyes">
              <ellipse cx="45" cy="66" rx="10" ry="11" fill="#fff" />
              <ellipse cx="75" cy="66" rx="10" ry="11" fill="#fff" />
              <g className={mood === 'think' ? 'm-look-up' : ''}>
                <circle cx="46" cy="68" r="5.5" fill="#2b2140" />
                <circle cx="76" cy="68" r="5.5" fill="#2b2140" />
                <circle cx="48" cy="65.5" r="2" fill="#fff" />
                <circle cx="78" cy="65.5" r="2" fill="#fff" />
              </g>
            </g>
          )}
          {/* joues */}
          <ellipse cx="34" cy="80" rx="6" ry="3.5" fill="#ff6f8e" opacity="0.45" />
          <ellipse cx="86" cy="80" rx="6" ry="3.5" fill="#ff6f8e" opacity="0.45" />
          {/* bouche */}
          {talking ? (
            <g className="m-talk">
              <path className="m-mouth-a" d="M48 81 Q60 97 72 81 Z" fill="#2b2140" stroke="#2b2140" strokeWidth="2" strokeLinejoin="round" />
              <ellipse className="m-mouth-b" cx="60" cy="85" rx="6" ry="3.5" fill="#2b2140" />
            </g>
          ) : mood === 'happy' || mood === 'dance' ? (
            <path d="M48 81 Q60 97 72 81 Z" fill="#2b2140" stroke="#2b2140" strokeWidth="2" strokeLinejoin="round" />
          ) : mood === 'sad' ? (
            <path d="M51 88 Q60 83 69 88" stroke="#2b2140" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          ) : mood === 'sleep' ? (
            <ellipse cx="60" cy="86" rx="4" ry="3" fill="#2b2140" />
          ) : mood === 'think' ? (
            <path d="M54 86 L66 85" stroke="#2b2140" strokeWidth="3.5" strokeLinecap="round" />
          ) : (
            <path d="M50 83 Q60 92 70 83" stroke="#2b2140" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          )}
        </g>
        {mood === 'sleep' && (
          <g className="m-zzz" fill="var(--text-soft)" fontWeight="800" fontFamily="inherit">
            <text x="92" y="36" fontSize="14">z</text>
            <text x="102" y="22" fontSize="11">z</text>
            <text x="110" y="10" fontSize="8">z</text>
          </g>
        )}
        {mood === 'think' && (
          <g className="m-thought" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5">
            <circle cx="96" cy="34" r="3" />
            <circle cx="104" cy="22" r="5" />
          </g>
        )}
      </g>
    </svg>
  )
}
