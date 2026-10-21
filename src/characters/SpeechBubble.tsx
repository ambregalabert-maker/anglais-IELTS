// Un personnage qui « dit » une phrase en anglais : bulle + voix + bouche qui bouge.

import { useEffect, useState } from 'react'
import { IconSpeaker } from '../components/Icons'
import { speak, stopSpeaking } from '../lib/sound'
import { useProgress } from '../store/progress'
import Character from './Character'
import type { CharacterDef } from './cast'

interface Props {
  character: CharacterDef
  text: string // ce qui est affiché dans la bulle
  spoken?: string // ce qui est prononcé (par défaut : le texte affiché)
  autoPlay?: boolean
  quote?: boolean
}

export default function SpeechBubble({ character, text, spoken, autoPlay = true, quote = false }: Props) {
  const voiceOn = useProgress().settings.voice
  const [talking, setTalking] = useState(false)
  const say = spoken ?? text

  function play() {
    speak(say, { profile: character.voice, onStart: () => setTalking(true), onEnd: () => setTalking(false) })
  }

  useEffect(() => {
    if (!autoPlay || !voiceOn) return
    const t = setTimeout(play, 350)
    return () => {
      clearTimeout(t)
      stopSpeaking()
    }
    // On ne relance la voix que si la phrase change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [say])

  return (
    <div className="speech">
      <button className="speech-char" onClick={voiceOn ? play : undefined} aria-label={`${character.name} : écouter`}>
        <Character id={character.id} size={92} talking={talking} />
        <span className="speech-name" style={{ color: character.color }}>
          {character.name}
        </span>
      </button>
      <div className="speech-bubble" onClick={voiceOn ? play : undefined} role={voiceOn ? 'button' : undefined}>
        {voiceOn && (
          <span className="speech-icon">
            <IconSpeaker size={18} />
          </span>
        )}
        <span lang="en">{quote ? `«\u00a0${text}\u00a0»` : text}</span>
      </div>
    </div>
  )
}
