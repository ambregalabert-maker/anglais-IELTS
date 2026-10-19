// Les dessins des personnages (SVG). Tous partagent le même visage (Face) pour des expressions cohérentes.
// Les animations sont dans styles/mascot.css (mêmes classes que Pépin).

import Mascot, { type MascotMood } from '../components/Mascot'
import type { CharacterId } from './cast'

const INK = '#2b2140'

interface FaceProps {
  lx: number // x de l'œil gauche
  rx: number // x de l'œil droit
  ey: number // y des yeux
  my: number // y de la bouche
  er: number // rayon des yeux
  mood: MascotMood
  talking?: boolean
  screen?: boolean // visage sur écran (robot) : yeux lumineux
}

function Face({ lx, rx, ey, my, er, mood, talking, screen }: FaceProps) {
  const ink = screen ? '#7df9ff' : INK
  const cx = (lx + rx) / 2
  const w = (rx - lx) * 0.36
  const closed = mood === 'happy' || mood === 'dance' || mood === 'sleep'

  const eyes = closed ? (
    <g stroke={ink} strokeWidth="3.2" strokeLinecap="round" fill="none">
      {mood === 'sleep' ? (
        <>
          <path d={`M${lx - er * 0.7} ${ey} Q${lx} ${ey + er * 0.45} ${lx + er * 0.7} ${ey}`} />
          <path d={`M${rx - er * 0.7} ${ey} Q${rx} ${ey + er * 0.45} ${rx + er * 0.7} ${ey}`} />
        </>
      ) : (
        <>
          <path d={`M${lx - er * 0.7} ${ey + 2} Q${lx} ${ey - er} ${lx + er * 0.7} ${ey + 2}`} />
          <path d={`M${rx - er * 0.7} ${ey + 2} Q${rx} ${ey - er} ${rx + er * 0.7} ${ey + 2}`} />
        </>
      )}
    </g>
  ) : screen ? (
    <g className="m-eyes" fill={ink}>
      <rect x={lx - er * 0.55} y={ey - er} width={er * 1.1} height={er * 2} rx={er * 0.5} />
      <rect x={rx - er * 0.55} y={ey - er} width={er * 1.1} height={er * 2} rx={er * 0.5} />
    </g>
  ) : (
    <g className="m-eyes">
      <ellipse cx={lx} cy={ey} rx={er} ry={er * 1.1} fill="#fff" />
      <ellipse cx={rx} cy={ey} rx={er} ry={er * 1.1} fill="#fff" />
      <g className={mood === 'think' ? 'm-look-up' : ''}>
        <circle cx={lx + 1} cy={ey + 2} r={er * 0.55} fill={INK} />
        <circle cx={rx + 1} cy={ey + 2} r={er * 0.55} fill={INK} />
        <circle cx={lx + 2.6} cy={ey - 0.4} r={er * 0.2} fill="#fff" />
        <circle cx={rx + 2.6} cy={ey - 0.4} r={er * 0.2} fill="#fff" />
      </g>
    </g>
  )

  const smile = <path d={`M${cx - w} ${my} Q${cx} ${my + w * 0.9} ${cx + w} ${my}`} stroke={ink} strokeWidth="3.2" strokeLinecap="round" fill="none" />
  const open = <path d={`M${cx - w} ${my - 1} Q${cx} ${my + w * 1.5} ${cx + w} ${my - 1} Z`} fill={ink} stroke={ink} strokeWidth="2" strokeLinejoin="round" />

  let mouth
  if (talking) {
    mouth = (
      <g className="m-talk">
        <g className="m-mouth-a">{open}</g>
        <g className="m-mouth-b">
          <ellipse cx={cx} cy={my + 2} rx={w * 0.45} ry={w * 0.25} fill={ink} />
        </g>
      </g>
    )
  } else if (mood === 'happy' || mood === 'dance') mouth = open
  else if (mood === 'sad') mouth = <path d={`M${cx - w * 0.8} ${my + 4} Q${cx} ${my - 2} ${cx + w * 0.8} ${my + 4}`} stroke={ink} strokeWidth="3.2" strokeLinecap="round" fill="none" />
  else if (mood === 'sleep') mouth = <ellipse cx={cx} cy={my + 2} rx="3.5" ry="2.6" fill={ink} />
  else if (mood === 'think') mouth = <path d={`M${cx - w * 0.5} ${my + 2} L${cx + w * 0.5} ${my + 1}`} stroke={ink} strokeWidth="3.2" strokeLinecap="round" />
  else mouth = smile

  return (
    <g>
      {mood === 'sad' && (
        <g stroke={ink} strokeWidth="2.8" strokeLinecap="round">
          <path d={`M${lx - er} ${ey - er * 1.25} L${lx + er * 0.6} ${ey - er * 1.75}`} />
          <path d={`M${rx + er} ${ey - er * 1.25} L${rx - er * 0.6} ${ey - er * 1.75}`} />
        </g>
      )}
      {eyes}
      {!screen && (
        <>
          <ellipse cx={lx - er * 1.1} cy={ey + er * 1.5} rx="5" ry="3" fill="#ff6f8e" opacity="0.4" />
          <ellipse cx={rx + er * 1.1} cy={ey + er * 1.5} rx="5" ry="3" fill="#ff6f8e" opacity="0.4" />
        </>
      )}
      {mouth}
    </g>
  )
}

function Zzz() {
  return (
    <g className="m-zzz" fill="var(--text-soft)" fontWeight="800">
      <text x="94" y="36" fontSize="14">z</text>
      <text x="104" y="22" fontSize="11">z</text>
      <text x="112" y="10" fontSize="8">z</text>
    </g>
  )
}

function Shadow() {
  return <ellipse className="m-shadow" cx="60" cy="126" rx="32" ry="4" />
}

// ---------- Earl Grey, la théière ----------
function Earl({ mood, talking }: { mood: MascotMood; talking?: boolean }) {
  return (
    <g className="m-all">
      <Shadow />
      <ellipse cx="46" cy="120" rx="9" ry="5" fill="#23897c" />
      <ellipse cx="74" cy="120" rx="9" ry="5" fill="#23897c" />
      <g className="m-body">
        <path d="M27 72 C8 70 8 106 30 102" stroke="#23897c" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M91 92 C102 88 106 74 112 64 L118 68 C113 82 108 96 94 104 Z" fill="#2aa596" />
        <ellipse cx="60" cy="88" rx="36" ry="32" fill="#33b5a5" />
        <path d="M33 72 C38 62 46 58 54 57" stroke="#7fe0d3" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
        <path d="M27 101 Q60 110 93 101 L91 106 Q60 115 29 106 Z" fill="#ffd166" />
        <g className="m-sprout">
          <ellipse cx="60" cy="58" rx="27" ry="7" fill="#23897c" />
          <path d="M38 58 Q60 36 82 58 Z" fill="#33b5a5" />
          <circle cx="60" cy="42" r="5" fill="#ffd166" />
        </g>
        <Face lx={48} rx={72} ey={80} my={99} er={8} mood={mood} talking={talking} />
        {/* moustache */}
        <path d="M60 92 C55 88 47 88 44 93 C48 92 52 95 60 94 C68 95 72 92 76 93 C73 88 65 88 60 92 Z" fill="#7a4b2a" />
        {/* monocle */}
        {mood !== 'happy' && mood !== 'dance' && mood !== 'sleep' && (
          <>
            <circle cx="72" cy="80" r="11" stroke="#ffd166" strokeWidth="2.5" fill="none" />
            <path d="M82 85 Q88 96 84 106" stroke="#ffd166" strokeWidth="1.5" fill="none" />
          </>
        )}
      </g>
      {mood === 'sleep' && <Zzz />}
      {(mood === 'happy' || mood === 'dance' || mood === 'idle') && (
        <g className="m-steam" stroke="var(--text-soft)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5">
          <path d="M114 58 C110 52 118 48 114 42" />
          <path d="M120 54 C117 49 123 46 120 40" />
        </g>
      )}
    </g>
  )
}

// ---------- Mia, la chatte au casque ----------
function Mia({ mood, talking }: { mood: MascotMood; talking?: boolean }) {
  const armsUp = mood === 'dance'
  return (
    <g className="m-all">
      <Shadow />
      <path className="m-tail" d="M88 110 C114 108 114 80 102 78" stroke="#e5658f" strokeWidth="8" fill="none" strokeLinecap="round" />
      <g className="m-body">
        <path d="M31 62 L27 26 L54 44 Z" fill="#ff8fb1" />
        <path d="M89 62 L93 26 L66 44 Z" fill="#ff8fb1" />
        <path d="M33 54 L31 34 L47 45 Z" fill="#ffd0df" />
        <path d="M87 54 L89 34 L73 45 Z" fill="#ffd0df" />
        <g className={`m-arm m-arm-l ${armsUp ? 'up' : ''}`} style={{ transformOrigin: '30px 92px' }}>
          <ellipse cx="27" cy="102" rx="7" ry="11" fill="#e5658f" transform="rotate(15 27 102)" />
        </g>
        <g className={`m-arm m-arm-r ${armsUp || mood === 'wave' ? 'up' : ''}`} style={{ transformOrigin: '90px 92px' }}>
          <ellipse cx="93" cy="102" rx="7" ry="11" fill="#e5658f" transform="rotate(-15 93 102)" />
        </g>
        <ellipse cx="60" cy="84" rx="37" ry="37" fill="#ff8fb1" />
        <ellipse cx="60" cy="102" rx="22" ry="16" fill="#ffd0df" opacity="0.85" />
        <path d="M22 72 C22 22 98 22 98 72" stroke="#6c4cf5" strokeWidth="6" fill="none" strokeLinecap="round" />
        <rect x="15" y="64" width="14" height="24" rx="6" fill="#6c4cf5" />
        <rect x="91" y="64" width="14" height="24" rx="6" fill="#6c4cf5" />
        <Face lx={47} rx={73} ey={76} my={92} er={8.5} mood={mood} talking={talking} />
        <path d="M57 86 L63 86 L60 89.5 Z" fill="#c9346a" />
        <g stroke="#c9346a" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
          <path d="M36 88 L24 86" />
          <path d="M36 92 L25 94" />
          <path d="M84 88 L96 86" />
          <path d="M84 92 L95 94" />
        </g>
      </g>
      {mood === 'sleep' && <Zzz />}
    </g>
  )
}

// ---------- Bolt, le robot ----------
function Bolt({ mood, talking }: { mood: MascotMood; talking?: boolean }) {
  const armsUp = mood === 'dance'
  return (
    <g className="m-all">
      <Shadow />
      <ellipse cx="46" cy="121" rx="10" ry="5" fill="#5c6b8a" />
      <ellipse cx="74" cy="121" rx="10" ry="5" fill="#5c6b8a" />
      <g className="m-body">
        <g className={`m-arm m-arm-l ${armsUp ? 'up' : ''}`} style={{ transformOrigin: '38px 96px' }}>
          <path d="M38 96 L28 110" stroke="#9aa5bd" strokeWidth="5" strokeLinecap="round" />
          <circle cx="27" cy="112" r="5" fill="#e0a400" />
        </g>
        <g className={`m-arm m-arm-r ${armsUp || mood === 'wave' ? 'up' : ''}`} style={{ transformOrigin: '82px 96px' }}>
          <path d="M82 96 L92 110" stroke="#9aa5bd" strokeWidth="5" strokeLinecap="round" />
          <circle cx="93" cy="112" r="5" fill="#e0a400" />
        </g>
        <rect x="38" y="88" width="44" height="30" rx="9" fill="#e0a400" />
        <circle cx="52" cy="103" r="3" fill="#3ccf7a" />
        <circle cx="60" cy="103" r="3" fill="#ff5d8f" className="m-blink" />
        <circle cx="68" cy="103" r="3" fill="#36b5ff" />
        <g className="m-sprout">
          <path d="M60 34 L60 20" stroke="#9aa5bd" strokeWidth="3" />
          <circle cx="60" cy="17" r="5" fill="#ff5d8f" className="m-blink" />
        </g>
        <rect x="26" y="34" width="68" height="56" rx="16" fill="#ffc93c" />
        <rect x="22" y="52" width="6" height="16" rx="3" fill="#e0a400" />
        <rect x="92" y="52" width="6" height="16" rx="3" fill="#e0a400" />
        <rect x="33" y="42" width="54" height="40" rx="11" fill="#2b2140" />
        <Face lx={49} rx={71} ey={58} my={70} er={6} mood={mood} talking={talking} screen />
      </g>
      {mood === 'sleep' && <Zzz />}
    </g>
  )
}

// ---------- Nimbus, le nuage ----------
function Nimbus({ mood, talking }: { mood: MascotMood; talking?: boolean }) {
  return (
    <g className="m-all">
      <Shadow />
      <g className="m-body m-float">
        {(mood === 'happy' || mood === 'dance') && (
          <g fill="none" strokeWidth="4" opacity="0.9" className="m-rainbow">
            <path d="M30 60 A30 30 0 0 1 90 60" stroke="#ff5d8f" />
            <path d="M36 60 A24 24 0 0 1 84 60" stroke="#ffc93c" />
            <path d="M42 60 A18 18 0 0 1 78 60" stroke="#3ccf7a" />
          </g>
        )}
        <g fill="#8fd3ff">
          <circle cx="40" cy="84" r="22" />
          <circle cx="62" cy="70" r="28" />
          <circle cx="86" cy="86" r="20" />
          <rect x="22" y="84" width="82" height="28" rx="14" />
        </g>
        <path d="M44 62 C50 52 58 48 66 47" stroke="#d8f1ff" strokeWidth="4" strokeLinecap="round" fill="none" />
        <Face lx={52} rx={76} ey={86} my={100} er={7.5} mood={mood} talking={talking} />
        {mood === 'sad' && (
          <g fill="#36b5ff" className="m-rain">
            <path d="M40 116 q-3 5 0 7 q3 -2 0 -7z" />
            <path d="M62 118 q-3 5 0 7 q3 -2 0 -7z" />
            <path d="M84 116 q-3 5 0 7 q3 -2 0 -7z" />
          </g>
        )}
      </g>
      {mood === 'sleep' && <Zzz />}
    </g>
  )
}

interface Props {
  id: CharacterId
  mood?: MascotMood
  size?: number
  talking?: boolean
  className?: string
}

export default function Character({ id, mood = 'idle', size = 120, talking = false, className = '' }: Props) {
  if (id === 'pepin') return <Mascot mood={mood} size={size} talking={talking} className={`${className} ${talking ? 'is-talking' : ''}`} />
  const Body = { earl: Earl, mia: Mia, bolt: Bolt, nimbus: Nimbus }[id]
  return (
    <svg
      className={`mascot mascot--${mood} char--${id} ${talking ? 'is-talking' : ''} ${className}`}
      width={size}
      height={size * (130 / 120)}
      viewBox="0 0 120 130"
      role="img"
      aria-label={id}
    >
      <Body mood={mood} talking={talking} />
    </svg>
  )
}
