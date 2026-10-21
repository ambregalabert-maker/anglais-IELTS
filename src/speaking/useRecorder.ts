// Enregistrement de la voix (micro) pour se réécouter. Rien ne quitte l'appareil : l'audio reste dans la page.

import { useEffect, useRef, useState } from 'react'

export type RecorderState = 'idle' | 'recording' | 'done' | 'denied' | 'unsupported'

export function useRecorder() {
  const supported = typeof window !== 'undefined' && 'MediaRecorder' in window && !!navigator.mediaDevices?.getUserMedia
  const [state, setState] = useState<RecorderState>(supported ? 'idle' : 'unsupported')
  const [url, setUrl] = useState<string | null>(null)
  const rec = useRef<MediaRecorder | null>(null)
  const stream = useRef<MediaStream | null>(null)

  const release = () => {
    stream.current?.getTracks().forEach((t) => t.stop())
    stream.current = null
  }

  useEffect(
    () => () => {
      if (rec.current?.state === 'recording') rec.current.stop()
      release()
    },
    [],
  )
  useEffect(() => () => void (url && URL.revokeObjectURL(url)), [url])

  async function start() {
    if (!supported) return
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: true })
      const chunks: Blob[] = []
      const r = new MediaRecorder(stream.current)
      r.ondataavailable = (e) => e.data.size && chunks.push(e.data)
      r.onstop = () => {
        setUrl(URL.createObjectURL(new Blob(chunks, { type: r.mimeType || 'audio/webm' })))
        setState('done')
        release()
      }
      rec.current = r
      r.start()
      setUrl(null)
      setState('recording')
    } catch {
      release()
      setState('denied')
    }
  }

  function stop() {
    if (rec.current?.state === 'recording') rec.current.stop()
  }

  function reset() {
    setUrl(null)
    setState(supported ? 'idle' : 'unsupported')
  }

  return { state, url, start, stop, reset }
}
