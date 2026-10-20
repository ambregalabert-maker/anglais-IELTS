// Mode examen : minuteur (40 min Task 2, 20 min Task 1), compteur de mots, puis rapport automatique.

import { useEffect, useRef, useState } from 'react'
import Chart from '../components/Chart'
import { TASK1_CHARTS } from '../data/writing/task1'
import { TASK2_TOPICS } from '../data/writing/topics'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { useStudyTimer } from '../lib/useStudyTimer'
import { toast } from '../store/events'
import { addXp, clearDraft, getProgress, saveDraft, saveEssay } from '../store/progress'
import { analyse, countWords } from './checks'

export default function ExamWriter({ task, id }: { task: 1 | 2; id: string }) {
  const [pickedId] = useState(() => {
    if (id !== 'random') return id
    const list = task === 2 ? TASK2_TOPICS : TASK1_CHARTS
    return list[Math.floor(Math.random() * list.length)].id
  })
  const topic = task === 2 ? TASK2_TOPICS.find((t) => t.id === pickedId) : undefined
  const chart = task === 1 ? TASK1_CHARTS.find((c) => c.id === pickedId) : undefined
  const draftKey = `exam-${task}-${pickedId}`
  const total = task === 2 ? 40 * 60 : 20 * 60
  const min = task === 2 ? 250 : 150

  const [text, setText] = useState(() => getProgress().drafts[draftKey]?.text ?? '')
  const [left, setLeft] = useState(() => Number(getProgress().drafts[draftKey]?.left ?? total))
  const [confirm, setConfirm] = useState(false)
  const submitted = useRef(false)
  const words = countWords(text)

  useStudyTimer(true)

  // Minuteur
  useEffect(() => {
    const t = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  // Brouillon sauvegardé régulièrement (pour ne rien perdre si on ferme la page)
  useEffect(() => {
    const t = setTimeout(() => saveDraft(draftKey, { text, left: String(left) }), 1500)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  useEffect(() => {
    if (left === 0 && !submitted.current) {
      toast('Temps écoulé ! Ton texte est enregistré.', '⏰')
      submit()
    }
    if (left === 5 * 60) toast('Plus que 5 minutes : pense à relire !', '⏳')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left])

  function submit() {
    if (submitted.current) return
    submitted.current = true
    const a = analyse(text, task)
    const recId = saveEssay({ task, topicId: pickedId, mode: 'exam', text, words: a.words, issues: a.issues.length, seconds: total - left })
    clearDraft(draftKey)
    addXp(a.words >= min ? 30 : 15)
    playSound('complete')
    navigate(`/writing/essay/${recId}`)
  }

  if (!topic && !chart) {
    navigate('/writing')
    return null
  }

  const mm = Math.floor(left / 60)
  const ss = String(left % 60).padStart(2, '0')
  const urgent = left < 5 * 60

  return (
    <div className="lesson exam">
      <header className="lesson-top exam-top">
        <button className="lesson-quit" onClick={() => navigate('/writing')} aria-label="Quitter (le brouillon est gardé)">
          ✕
        </button>
        <span className={`exam-timer ${urgent ? 'urgent' : ''}`}>⏱️ {mm}:{ss}</span>
        <span className={`exam-words ${words >= min ? 'ok' : ''}`}>
          {words} / {min} mots
        </span>
      </header>
      <main className="lesson-body exam-body">
        <section className="card">
          <small>Writing Task {task} · {task === 2 ? '40 minutes · 250 mots minimum' : '20 minutes · 150 mots minimum'}</small>
          <p className="question" lang="en">
            {topic?.question ?? chart?.question}
          </p>
          {chart && <Chart chart={chart} />}
        </section>
        <textarea
          className="essay-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={task === 2 ? 'Écris ton essai ici. Saute une ligne entre chaque paragraphe.' : 'Écris ta réponse ici. Introduction, overview, puis détails.'}
          lang="en"
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="sentences"
        />
      </main>
      <footer className="lesson-foot">
        <div className="lesson-foot-inner">
          <button className="btn btn-success btn-block" disabled={words < 20} onClick={() => setConfirm(true)}>
            Terminer et voir le rapport
          </button>
        </div>
      </footer>
      {confirm && (
        <div className="modal-backdrop" onClick={() => setConfirm(false)}>
          <div className="modal pop-in" onClick={(e) => e.stopPropagation()}>
            <h3>Rendre ta copie ?</h3>
            <p className="muted">
              {words < min ? `Attention : ${words} mots seulement, il en faut ${min}.` : `${words} mots, ${mm} min restantes. As-tu relu ?`}
            </p>
            <button className="btn btn-primary btn-block" onClick={submit}>
              Oui, voir le rapport
            </button>
            <button className="btn btn-secondary btn-block" onClick={() => setConfirm(false)}>
              Continuer à écrire
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
