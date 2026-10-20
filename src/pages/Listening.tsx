import { useState } from 'react'
import { IconHeadphones } from '../components/Icons'
import ModuleHeader from '../components/ModuleHeader'
import Character from '../characters/Character'
import { REAL_AUDIO_URL, TIPS } from '../data/listening'
import { LISTENING_MODES } from '../listening/engine'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { useProgress } from '../store/progress'

export default function Listening() {
  const voiceOn = useProgress().settings.voice
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="page">
      <ModuleHeader title="Listening" subtitle="Apprendre à anticiper avant d’écouter" color="#3ccf7a" icon={<IconHeadphones size={36} />} tryhard="listening" />

      <a className="real-audio" href={REAL_AUDIO_URL} target="_blank" rel="noopener noreferrer" onClick={() => playSound('tap')}>
        <Character id="mia" mood="happy" size={70} />
        <span className="grow">
          <b>S’entraîner avec de vrais audios</b>
          <small>Tests complets sur computerielts.com (nouvel onglet)</small>
        </span>
        <span className="real-audio-arrow">↗</span>
      </a>

      {!voiceOn && <p className="card advice">🔇 La voix est coupée : les phrases ne seront pas lues et les dictées seront impossibles. Active-la dans ton Profil.</p>}

      <h2 className="section-title">Stratégies</h2>
      <section className="lab-grid">
        {LISTENING_MODES.map((m) => (
          <button
            key={m.id}
            className="lab-card"
            style={{ ['--c' as string]: m.color }}
            onClick={() => {
              playSound('tap')
              navigate(`/listening/${m.id}`)
            }}
          >
            <span className="lab-icon">{m.icon}</span>
            <b>{m.title}</b>
            <small>{m.description}</small>
          </button>
        ))}
      </section>

      <h2 className="section-title">Fiche à relire avant chaque test</h2>
      <section className="tips">
        {TIPS.map((t, i) => (
          <div key={t.title} className="card tip-card">
            <button className="tip-head" onClick={() => setOpen(open === i ? null : i)}>
              <b>{t.title}</b>
              <span>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <ul className="guide-intro">
                {t.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    </div>
  )
}
