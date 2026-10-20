// Parcours guidé Writing Task 2 : les 9 étapes du guide d'écriture, une par écran.
// Le brouillon est sauvegardé automatiquement à chaque modification.

import { useEffect, useState } from 'react'
import Character from '../characters/Character'
import { TASK2_TOPICS, TASK2_TYPES } from '../data/writing/topics'
import { navigate } from '../lib/router'
import { playSound } from '../lib/sound'
import { useStudyTimer } from '../lib/useStudyTimer'
import { toast } from '../store/events'
import { addXp, getProgress, saveDraft, saveEssay } from '../store/progress'
import { analyse, countWords } from './checks'
import { copyText, correctionPrompt } from './copy'

type Fields = Record<string, string>

const POSITIONS = ['I completely agree', 'I mostly agree', 'I partly agree', 'I mostly disagree', 'I completely disagree']

interface Step {
  title: string
  intro: string[]
  example?: string
  fields: { key: string; label: string; rows?: number; placeholder?: string }[]
  language?: string[]
}

const STEPS: Step[] = [
  {
    title: '1. Comprendre la question',
    intro: [
      'Repère les MOTS-CLÉS (le sujet) et les mots de CONSIGNE (agree or disagree, discuss both views, advantages and disadvantages…).',
      'Regarde les LIMITES : TOUS les étudiants ? CERTAINS ? TOUJOURS ? PARFOIS ?',
      'Pour chaque mot-clé important, trouve un ou deux synonymes sans changer le sens.',
    ],
    example: 'university students → students in higher education ; study a foreign language → learn another language.',
    fields: [
      { key: 'topic', label: 'Topic : de quoi parle l’essai ?', rows: 2 },
      { key: 'instruction', label: 'Instruction : que dois-tu faire ?', rows: 2 },
      { key: 'limits', label: 'Limites (all / some / always…)', rows: 2 },
      { key: 'synonyms', label: 'Mots-clés + synonymes', rows: 3 },
    ],
  },
  {
    title: '2. Choisir ta position',
    intro: [
      'Tu dois connaître ta position AVANT d’écrire : complètement d’accord, en partie, pas du tout…',
      'Attention : ne la donne PAS dans l’introduction. Garde ton opinion finale pour la conclusion.',
    ],
    fields: [{ key: 'position', label: 'Ma position', rows: 2 }],
  },
  {
    title: '3. Choisir deux idées principales',
    intro: ['Décide de quoi parleront tes deux paragraphes de développement. Deux idées claires qui répondent à la question. Pas besoin d’un long brainstorming.'],
    fields: [
      { key: 'idea1', label: 'Idée du paragraphe 1', rows: 2 },
      { key: 'idea2', label: 'Idée du paragraphe 2', rows: 2 },
    ],
  },
  {
    title: '4. Faire un plan en 4 paragraphes',
    intro: [
      '1. Introduction : présenter les deux côtés + thèse simple et neutre.',
      '2. Paragraphe 1 : idée principale + explication + exemple.',
      '3. Paragraphe 2 : idée principale + explication + exemple.',
      '4. Conclusion : 3 phrases (résumé + opinion + ouverture vers l’avenir).',
      'Une structure claire est plus sûre qu’une structure compliquée.',
    ],
    fields: [{ key: 'plan', label: 'Mon plan (en notes)', rows: 6 }],
  },
  {
    title: '5. Écrire l’introduction',
    intro: [
      'Environ 3 phrases. Simple et clair. Pas encore de raisons détaillées.',
      'Phrases 1-2 : présente les deux côtés (« Many people believe that… However, some would say that… »), avec tes synonymes de l’étape 1.',
      'Phrase 3 : une thèse SIMPLE et NEUTRE, obligatoirement en dernière phrase. Pas d’opinion ici !',
    ],
    example:
      'Many people believe that all university students should learn another language. However, some would say that this should remain a personal choice. This essay will examine both sides of this issue.',
    fields: [{ key: 'intro', label: 'Mon introduction', rows: 6 }],
  },
  {
    title: '6. Paragraphe de développement 1',
    intro: [
      'Suis le schéma : TOPIC SENTENCE → EXPLAIN → EXAMPLE → LINK / RESULT.',
      'Topic sentence : l’idée principale. Explain : pourquoi c’est vrai ou important. Example : un exemple réaliste (pas besoin de statistique). Link : la conséquence, ou le lien avec la question.',
    ],
    language: ['One important reason is that…', 'This is because…', 'For example,…', 'Therefore,…', 'As a result,…'],
    fields: [{ key: 'body1', label: 'Mon paragraphe 1', rows: 9 }],
  },
  {
    title: '7. Paragraphe de développement 2',
    intro: ['Même schéma, mais une idée DIFFÉRENTE. Ne répète pas le paragraphe 1 avec d’autres mots.'],
    language: ['However,…', 'Nevertheless,…', 'On the other hand,…', 'Although…', 'While…'],
    fields: [{ key: 'body2', label: 'Mon paragraphe 2', rows: 9 }],
  },
  {
    title: '8. Écrire la conclusion',
    intro: [
      'Exactement 3 phrases. Pas de nouvel argument ni de nouvel exemple.',
      'Phrase 1, résumé : « In conclusion, / To conclude, / In closing, » + les idées principales.',
      'Phrase 2, ton opinion : « In my opinion, / I believe that… / In my view, ».',
      'Phrase 3, ouverture : « In future, the situation will / could / should… ».',
    ],
    example:
      'To conclude, studying another language can improve both employment opportunities and intercultural understanding. In my opinion, university students should therefore be encouraged to learn a foreign language. In future, universities could offer more flexible language courses so that students can choose a programme that suits their needs.',
    fields: [{ key: 'conclusion', label: 'Ma conclusion', rows: 6 }],
  },
  {
    title: '9. Relire ton essai',
    intro: ['Les 3 à 5 dernières minutes : relis avec la checklist. Voici ton essai assemblé et les vérifications automatiques.'],
    fields: [],
  },
]

function sentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).filter((s) => countWords(s) > 1)
}

/** Petites vérifications en direct, selon l'étape. */
function liveTips(step: number, f: Fields): string[] {
  const tips: string[] = []
  if (step === 4 && f.intro) {
    const s = sentences(f.intro)
    const last = s[s.length - 1] ?? ''
    if (s.length > 4) tips.push(`${s.length} phrases : vise environ 3 phrases.`)
    if (!/\bthis essay will\b/i.test(last)) tips.push('La dernière phrase doit être ta thèse neutre : « This essay will examine both sides of this issue. »')
    if (/\b(?:I think|in my (?:opinion|view)|I believe|I agree|I disagree)\b/i.test(f.intro)) tips.push('Pas d’opinion dans l’introduction : garde-la pour la conclusion.')
  }
  if ((step === 5 || step === 6) && (f.body1 || f.body2)) {
    const text = step === 5 ? f.body1 : f.body2
    if (text) {
      const n = countWords(text)
      if (n < 70) tips.push(`${n} mots : un paragraphe de développement fait plutôt 80 à 110 mots.`)
      if (!/\b(?:for example|for instance|such as)\b/i.test(text)) tips.push('Pas d’exemple repéré : ajoute « For example, … ».')
    }
  }
  if (step === 7 && f.conclusion) {
    const s = sentences(f.conclusion)
    if (s.length !== 3) tips.push(`${s.length} phrase(s) : ton guide demande exactement 3 phrases.`)
    if (!/^(?:in conclusion|to conclude|in closing|to sum up)/i.test(f.conclusion.trim())) tips.push('Commence par « In conclusion, » / « To conclude, » / « In closing, ».')
    if (!/\b(?:in my (?:opinion|view)|I believe|I think)\b/i.test(f.conclusion)) tips.push('Ton opinion n’apparaît pas : « In my opinion, … ».')
    if (!/\bin (?:the )?future\b/i.test(f.conclusion)) tips.push('Termine par une phrase tournée vers l’avenir : « In future, … ».')
  }
  return tips
}

function assembleEssay(f: Fields): string {
  return [f.intro, f.body1, f.body2, f.conclusion].map((x) => (x ?? '').trim()).filter(Boolean).join('\n\n')
}

export default function Task2Guided({ topicId }: { topicId: string }) {
  const topic = TASK2_TOPICS.find((t) => t.id === topicId) ?? TASK2_TOPICS[0]
  const draftKey = `guided-${topic.id}`
  const [fields, setFields] = useState<Fields>(() => getProgress().drafts[draftKey] ?? {})
  const [step, setStep] = useState(() => Number(getProgress().drafts[draftKey]?._step ?? 0))

  useStudyTimer(true)

  useEffect(() => {
    const t = setTimeout(() => saveDraft(draftKey, { ...fields, _step: String(step) }), 800)
    return () => clearTimeout(t)
  }, [fields, step, draftKey])

  const s = STEPS[step]
  const set = (k: string, v: string) => setFields((f) => ({ ...f, [k]: v }))
  const essay = assembleEssay(fields)
  const analysis = step === 8 ? analyse(essay, 2) : null
  const tips = liveTips(step, fields)

  function go(n: number) {
    playSound('tap')
    setStep(Math.max(0, Math.min(STEPS.length - 1, n)))
    window.scrollTo(0, 0)
  }

  function finish() {
    const a = analyse(essay, 2)
    const id = saveEssay({ task: 2, topicId: topic.id, mode: 'guided', text: essay, words: a.words, issues: a.issues.length, seconds: 0 })
    addXp(25)
    playSound('complete')
    navigate(`/writing/essay/${id}`)
  }

  return (
    <div className="lesson guided">
      <header className="lesson-top">
        <button className="lesson-quit" onClick={() => navigate('/writing')} aria-label="Quitter (le brouillon est gardé)">
          ✕
        </button>
        <div className="stepper">
          {STEPS.map((_, i) => (
            <button key={i} className={`step-dot ${i === step ? 'on' : ''} ${i < step ? 'done' : ''}`} onClick={() => go(i)} aria-label={`Étape ${i + 1}`}>
              {i + 1}
            </button>
          ))}
        </div>
      </header>
      <main className="lesson-body guided-body" key={step}>
        <section className="card question-card">
          <small>
            {TASK2_TYPES[topic.type]} · {topic.theme}
          </small>
          <p className="question" lang="en">
            {topic.question}
          </p>
        </section>

        <div className="lesson-head">
          <Character id="earl" mood={tips.length ? 'think' : 'idle'} size={60} />
          <h2>{s.title}</h2>
        </div>
        <ul className="guide-intro">
          {s.intro.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {s.example && (
          <div className="guide-example" lang="en">
            <small>Exemple du guide</small>
            {s.example}
          </div>
        )}
        {s.language && (
          <div className="chip-row guide-language">
            {s.language.map((l) => (
              <span key={l} className="chip static" lang="en">
                {l}
              </span>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="chip-row guide-language">
            {POSITIONS.map((pos) => (
              <button key={pos} className={`chip ${fields.position === pos ? 'on' : ''}`} onClick={() => set('position', pos)}>
                {pos}
              </button>
            ))}
          </div>
        )}

        {s.fields.map((f) => (
          <label key={f.key} className="guide-field">
            <span>
              {f.label}
              {['intro', 'body1', 'body2', 'conclusion'].includes(f.key) && <small> · {countWords(fields[f.key] ?? '')} mots</small>}
            </span>
            <textarea rows={f.rows ?? 3} value={fields[f.key] ?? ''} onChange={(e) => set(f.key, e.target.value)} lang="en" spellCheck={false} placeholder={f.placeholder} />
          </label>
        ))}

        {tips.length > 0 && (
          <div className="card advice">
            {tips.map((t) => (
              <p key={t}>💡 {t}</p>
            ))}
          </div>
        )}

        {step === 8 && analysis && (
          <>
            <div className="card">
              <h3>Ton essai ({analysis.words} mots)</h3>
              <div className="model-essay" lang="en">
                {essay ? essay.split('\n\n').map((p, i) => <p key={i}>{p}</p>) : <p className="muted">Ton essai est vide : remplis les étapes 5 à 8.</p>}
              </div>
            </div>
            {analysis.advice.length > 0 && (
              <div className="card advice">
                {analysis.advice.map((a) => (
                  <p key={a}>💡 {a}</p>
                ))}
              </div>
            )}
            <p className="muted small-note">
              {analysis.issues.length} point(s) détecté(s) automatiquement : tu les verras surlignés dans le rapport, avec la checklist complète.
            </p>
          </>
        )}
      </main>
      <footer className="lesson-foot">
        <div className="lesson-foot-inner guided-nav">
          <button className="btn btn-secondary" disabled={step === 0} onClick={() => go(step - 1)}>
            ←
          </button>
          {step < STEPS.length - 1 ? (
            <button className="btn btn-primary grow" onClick={() => go(step + 1)}>
              Étape suivante
            </button>
          ) : (
            <>
              <button
                className="btn btn-secondary"
                disabled={!essay}
                onClick={async () => {
                  const ok = await copyText(correctionPrompt(2, topic.question, essay, countWords(essay)))
                  toast(ok ? 'Copié pour correction !' : 'Copie impossible', ok ? '📋' : '⚠️')
                }}
              >
                📋
              </button>
              <button className="btn btn-success grow" disabled={countWords(essay) < 50} onClick={finish}>
                Enregistrer et voir le rapport
              </button>
            </>
          )}
        </div>
      </footer>
    </div>
  )
}
