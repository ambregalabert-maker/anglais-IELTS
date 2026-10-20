// Vérifications automatiques d'un texte (Task 1 ou Task 2), d'après le guide d'écriture et le Booklet 2.
// Chaque problème a une position dans le texte, pour être surligné.

export type IssueKind = 'contraction' | 'informal' | 'start' | 'ithink' | 'french' | 'linking'

export interface Issue {
  kind: IssueKind
  start: number
  end: number
  text: string
  message: string
}

export interface Analysis {
  words: number
  paragraphs: number
  sentences: number
  issues: Issue[]
  linking: { word: string; count: number }[]
  linkingTotal: number
  linkingSentenceRatio: number // part des phrases qui contiennent un mot de liaison
  advice: string[] // conseils généraux (paragraphes, longueur, liaisons…)
}

export const ISSUE_LABELS: Record<IssueKind, { label: string; color: string }> = {
  contraction: { label: 'Contraction', color: '#f0506e' },
  informal: { label: 'Mot familier', color: '#ff9a4d' },
  start: { label: 'Début de phrase', color: '#e8a400' },
  ithink: { label: '« I think » répété', color: '#a64cf5' },
  french: { label: 'Erreur de francophone', color: '#36b5ff' },
  linking: { label: 'Mot de liaison trop répété', color: '#2fbf71' },
}

const CONTRACTION =
  /\b(?:[A-Za-z]+n['’]t|(?:I|you|we|they|he|she|it|that|there|what|who|here|where|let)['’](?:m|re|s|ve|ll|d))\b/gi

const INFORMAL: [RegExp, string][] = [
  [/\bkids?\b/gi, 'children / young people'],
  [/\blots of\b/gi, 'many / a great deal of'],
  [/\ba lot of\b/gi, 'many / a large number of / a great deal of'],
  [/\bloads of\b/gi, 'a large number of'],
  [/\bstuff\b/gi, 'things → factors / issues / goods'],
  [/\b(?:gonna|wanna|gotta)\b/gi, 'going to / want to / have to'],
  [/\b(?:okay|ok)\b/gi, 'acceptable / satisfactory'],
  [/\bguys\b/gi, 'people'],
  [/\ba bit\b/gi, 'slightly / somewhat'],
  [/\b(?:kind|sort) of\b/gi, 'rather / somewhat'],
  [/\breally\b/gi, 'highly / extremely / particularly'],
  [/\b(?:super|awesome|cool)\b/gi, 'excellent / remarkable'],
  [/\betc\.?/gi, 'such as… (liste précise), ou « and other… »'],
  [/\bget rid of\b/gi, 'eliminate / remove'],
  [/\bnowadays everybody\b/gi, 'the vast majority of people'],
]

// Erreurs typiques des francophones (Booklet 2 + erreurs fréquentes)
const FRENCH: [RegExp, string][] = [
  [/\ban? important (?:increase|rise|growth|decrease|drop|fall|decline|number|amount|quantity|part|proportion)\b/gi, '« important » ne s’emploie pas pour une quantité : substantial / significant / considerable.'],
  [/\bit exists?\b/gi, '« il y a » = there is / there are.'],
  [/\bpass(?:es|ed|ing)? (?:time|(?:\d+|a few|many|several|two|three) (?:hours|days|years|months|weeks|minutes))\b/gi, 'On « spend » du temps (spend time doing), jamais « pass ».'],
  [/\bpass(?:es|ed|ing)? from\b/gi, '« passer de… à… » = go from… to… / rise from… to…'],
  [/\b(?:has|have|had) known (?:an?|the|some) (?:increase|rise|growth|decrease|drop|fall|decline|fluctuation|change)/gi, '« know » est réservé aux personnes : undergo / experience an increase.'],
  [/\b(?:informations|advices|knowledges|researches|equipments|homeworks|evidences|furnitures|accommodations)\b/gi, 'Nom indénombrable : jamais de « s ».'],
  [/\b(?:an information|an advice|a knowledge|an equipment|a research|an evidence|a homework)\b/gi, 'Nom indénombrable : jamais de « a / an » (dire « a piece of… »).'],
  [/\baccording to me\b/gi, '« selon moi » = in my opinion / in my view.'],
  [/\bsince (?:\d+|two|three|four|five|ten|many|several) (?:years|months|days|weeks|decades)\b/gi, 'Pour une durée : « for » (for ten years). « since » + point de départ (since 2010).'],
  [/\bin the same time\b/gi, '« en même temps » = at the same time.'],
  [/\bin the other hand\b/gi, '« d’un autre côté » = on the other hand.'],
  [/\bdespite of\b/gi, '« despite » ou « in spite of », jamais « despite of ».'],
  [/\bthe (?:majority|most) of (?:the )?people thinks?\b/gi, 'Vérifie l’accord : « most people think » (sans « the »).'],
  [/\bactually\b/gi, 'Vérifie : « actually » = en fait. Actuellement = currently.'],
  [/\beventually\b/gi, 'Vérifie : « eventually » = finalement. Éventuellement = possibly.'],
  [/\bmore and more\b/gi, 'Correct, mais souvent répété : variez avec « an increasing number of / increasingly ».'],
]

const LINKERS = [
  'firstly', 'secondly', 'thirdly', 'finally', 'next', 'moreover', 'furthermore', 'in addition', 'besides', 'as well as',
  'however', 'nevertheless', 'nonetheless', 'although', 'even though', 'despite', 'in spite of', 'whereas', 'while',
  'on the other hand', 'on the one hand', 'instead of', 'in contrast', 'by contrast', 'therefore', 'consequently', 'as a result',
  'as a consequence', 'thus', 'hence', 'due to', 'because of', 'owing to', 'since', 'in order to', 'for example', 'for instance',
  'such as', 'including', 'similarly', 'likewise', 'in comparison', 'compared with', 'compared to', 'in conclusion',
  'to conclude', 'to sum up', 'overall', 'all things considered', 'in my opinion', 'in my view', 'not only',
]

function escape(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function findAll(text: string, re: RegExp): RegExpExecArray[] {
  const out: RegExpExecArray[] = []
  const r = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g')
  let m: RegExpExecArray | null
  while ((m = r.exec(text))) {
    out.push(m)
    if (m[0].length === 0) r.lastIndex++
  }
  return out
}

export function countWords(text: string): number {
  return (text.trim().match(/[A-Za-z0-9’'-]+/g) ?? []).length
}

export function analyse(text: string, task: 1 | 2): Analysis {
  const issues: Issue[] = []
  const add = (kind: IssueKind, m: RegExpExecArray, message: string) =>
    issues.push({ kind, start: m.index, end: m.index + m[0].length, text: m[0], message })

  for (const m of findAll(text, CONTRACTION)) add('contraction', m, `Pas de contractions dans un écrit académique : écris la forme complète.`)
  for (const [re, tip] of INFORMAL) for (const m of findAll(text, re)) add('informal', m, `Trop familier. Préfère : ${tip}.`)
  for (const [re, tip] of FRENCH) for (const m of findAll(text, re)) add('french', m, tip)

  // Phrases qui commencent par And / But / So
  for (const m of findAll(text, /(?:^|[.!?]\s+|\n\s*)(And|But|So)\b/g)) {
    const word = m[1]
    const start = m.index + m[0].length - word.length
    issues.push({
      kind: 'start',
      start,
      end: start + word.length,
      text: word,
      message: word === 'So' ? 'Évite « So » en début de phrase : Therefore / Consequently / As a result.' : word === 'But' ? 'Évite « But » en début de phrase : However, / Nevertheless,' : 'Évite « And » en début de phrase : Furthermore, / In addition,',
    })
  }

  // « I think » répété
  const thinks = findAll(text, /\bI think\b/gi)
  if (thinks.length >= 2)
    thinks.forEach((m) => add('ithink', m, `« I think » apparaît ${thinks.length} fois. Varie : In my view / I would argue that / I believe… (et garde ton avis pour la conclusion).`))

  // Mots de liaison
  const lower = text.toLowerCase()
  const linking: { word: string; count: number }[] = []
  for (const l of LINKERS) {
    const ms = findAll(lower, new RegExp(`\\b${escape(l)}\\b`, 'g'))
    if (ms.length) linking.push({ word: l, count: ms.length })
    if (ms.length >= 3) {
      for (const m of ms.slice(2)) issues.push({ kind: 'linking', start: m.index, end: m.index + l.length, text: text.slice(m.index, m.index + l.length), message: `« ${l} » est utilisé ${ms.length} fois : varie tes mots de liaison.` })
    }
  }
  linking.sort((a, b) => b.count - a.count)

  const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => countWords(s) > 2)
  const withLinker = sentences.filter((s) => LINKERS.some((l) => new RegExp(`\\b${escape(l)}\\b`, 'i').test(s))).length
  const paragraphs = text.split(/\n\s*\n|\n/).filter((p) => p.trim().length > 0).length
  const words = countWords(text)
  const min = task === 2 ? 250 : 150
  const linkingTotal = linking.reduce((n, l) => n + l.count, 0)
  const ratio = sentences.length ? withLinker / sentences.length : 0

  const advice: string[] = []
  if (words < min) advice.push(`Ton texte fait ${words} mots : il en faut au moins ${min}. Un texte trop court est pénalisé.`)
  else if (task === 2 && words > 380) advice.push(`${words} mots : c’est long. Au-delà de 320 mots environ, le risque d’erreurs augmente sans gagner de points.`)
  if (task === 2 && paragraphs < 4) advice.push(`${paragraphs} paragraphe(s) seulement : vise 4 paragraphes (introduction, 2 paragraphes de développement, conclusion).`)
  if (task === 1 && paragraphs < 3) advice.push(`${paragraphs} paragraphe(s) : vise 3 ou 4 paragraphes (introduction, overview, détails).`)
  if (task === 2 && paragraphs > 6) advice.push(`${paragraphs} paragraphes : c’est beaucoup. Regroupe tes idées en 4 ou 5 paragraphes.`)
  if (linkingTotal < 4 && words > 80) advice.push('Peu de mots de liaison : ajoute-en pour relier tes idées (However, Furthermore, As a result…).')
  if (ratio > 0.75 && sentences.length >= 6) advice.push(`Des mots de liaison dans ${Math.round(ratio * 100)} % de tes phrases : c’est trop. Ton guide le dit : n’en mets pas dans chaque phrase.`)
  if (linking.length > 0 && linking.length < 4 && linkingTotal >= 6) advice.push('Tes mots de liaison sont peu variés : essaie d’autres catégories (contraste, conséquence, exemple…).')
  if (task === 1 && !/\boverall\b|\bin general\b|\bit is clear that\b/i.test(text)) advice.push('Pas d’overview repéré : en Task 1, ajoute une phrase de vue d’ensemble (« Overall, … »). C’est indispensable pour dépasser 6.')
  if (task === 2 && !/\b(?:in conclusion|to conclude|in closing|to sum up)\b/i.test(text)) advice.push('Pas de conclusion repérée : commence ton dernier paragraphe par « In conclusion, » / « To conclude, ».')
  if (task === 2 && !/\b(?:in my (?:opinion|view)|i believe|i would argue|i think)\b/i.test(text)) advice.push('Ton avis n’apparaît pas clairement : donne-le dans la conclusion (In my view, …).')

  issues.sort((a, b) => a.start - b.start)
  // On retire les chevauchements (on garde le premier)
  const clean: Issue[] = []
  for (const i of issues) if (!clean.length || i.start >= clean[clean.length - 1].end) clean.push(i)

  return { words, paragraphs, sentences: sentences.length, issues: clean, linking, linkingTotal, linkingSentenceRatio: ratio, advice }
}
