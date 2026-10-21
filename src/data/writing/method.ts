// Méthode Writing de ta « Méthode IELTS » : critères, Task 1 par type de document, vocabulaire des tendances,
// structure de la Task 2 par type de sujet, méthode PEEL, et les exercices W3 (analyser) et W4 (reformuler).

import type { QuestionSet } from '../../practice/types'

export const WRITING_CRITERIA = [
  { name: 'Task Achievement (T1) / Task Response (T2)', check: 'Toutes les parties de la consigne sont traitées, position claire en Task 2' },
  { name: 'Coherence & Cohesion', check: 'Paragraphes logiques, connecteurs variés mais pas mécaniques' },
  { name: 'Lexical Resource', check: 'Vocabulaire précis, collocations justes, peu de répétitions' },
  { name: 'Grammatical Range & Accuracy', check: 'Phrases complexes variées et peu d’erreurs' },
]

export const TASK1_STEPS = [
  { title: 'Introduction', text: 'Reformuler la consigne (pas de copie mot à mot).' },
  { title: 'Overview', text: '2 tendances principales, sans chiffres. Sans overview, la note plafonne souvent à 5.' },
  { title: 'Détail 1', text: 'Un groupe de données comparées, avec chiffres.' },
  { title: 'Détail 2', text: 'L’autre groupe.' },
]

export const DOC_TYPES = [
  { doc: 'Line graph', what: 'Tendances, pics, creux, croisements', tense: 'Passé si dates passées ; futur si projections' },
  { doc: 'Bar chart', what: 'Comparaisons entre catégories, plus haut / plus bas', tense: 'Selon les dates' },
  { doc: 'Pie chart', what: 'Proportions, la part la plus grande et la plus petite', tense: 'Présent ou passé' },
  { doc: 'Table', what: 'Regrouper les chiffres, ne pas tout citer', tense: 'Selon les dates' },
  { doc: 'Map', what: 'Changements entre deux dates (construit, remplacé, agrandi)', tense: 'Passif : « was built », « has been replaced »' },
  { doc: 'Process', what: 'Étapes dans l’ordre, du début à la fin', tense: 'Présent passif : « is heated », « are collected »' },
]

export const TREND_VOCAB = [
  { sense: 'Hausse', verbs: 'rise, increase, grow, climb, surge', nouns: 'a rise, an increase, growth', adverbs: 'sharply, significantly, steadily, gradually, slightly' },
  { sense: 'Baisse', verbs: 'fall, decrease, decline, drop, plummet', nouns: 'a fall, a decline, a drop', adverbs: 'dramatically, considerably, marginally' },
  { sense: 'Stabilité', verbs: 'remain stable, level off, stay constant, plateau', nouns: 'a plateau', adverbs: '' },
  { sense: 'Variation', verbs: 'fluctuate', nouns: 'a fluctuation', adverbs: '' },
  { sense: 'Extrêmes', verbs: 'peak at, reach a high of, hit a low of', nouns: 'a peak', adverbs: '' },
]

export const COMPARISON_PHRASES = 'twice as high as, three times more than, slightly lower than, the vast majority, just under a quarter, approximately, roughly, nearly, well over half'
export const PROCESS_PHRASES = 'first, initially, then, after that, once…, subsequently, finally, at the final stage'

export const TASK2_STEPS = [
  { title: 'Analyser (5 min)', text: 'Souligner le sujet, la question exacte, toutes les parties à traiter.' },
  { title: 'Plan (5 min)', text: 'Position + 2 idées, chacune avec une explication et un exemple.' },
  { title: 'Rédiger (25 min)', text: 'Intro (reformulation + position), 2 paragraphes, conclusion.' },
  { title: 'Relire (5 min)', text: 'Accords, articles, temps, pluriels.' },
]

export const TASK2_STRUCTURES = [
  { type: 'Opinion', prompt: 'To what extent do you agree or disagree?', plan: 'Intro + position claire → 2 paragraphes qui la soutiennent (ou 1 concession + 1 argument) → conclusion' },
  { type: 'Discussion', prompt: 'Discuss both views and give your opinion', plan: 'Intro → vue 1 → vue 2 → conclusion avec ton avis (annoncé dès l’intro)' },
  { type: 'Avantages / inconvénients', prompt: 'Do the advantages outweigh the disadvantages?', plan: 'Intro + réponse → avantages → inconvénients → conclusion qui tranche' },
  { type: 'Problème / solution', prompt: 'What are the causes / problems? What solutions…?', plan: 'Intro → causes ou problèmes → solutions → conclusion' },
  { type: 'Question double', prompt: 'Why is this happening? Is it positive or negative?', plan: 'Un paragraphe par question, répondre aux deux' },
]

export const PEEL = [
  { letter: 'P', name: 'Point', text: 'La phrase d’idée principale.' },
  { letter: 'E', name: 'Explain', text: 'Expliquer pourquoi (1-2 phrases).' },
  { letter: 'E', name: 'Example', text: 'Un exemple concret ou une situation plausible.' },
  { letter: 'L', name: 'Link', text: 'Relier au sujet ou à ta position.' },
]

/** Exercice W3 : analyser un sujet avant d'écrire. */
export const ANALYSE_SET: QuestionSet = {
  id: 'w3',
  title: 'Analyser le sujet',
  type: 'mcq',
  instruction: 'Some people believe that working from home benefits both employees and companies. Others think it has more disadvantages. Discuss both views and give your own opinion.',
  tip: 'Erreur n° 1 : ne répondre qu’à une moitié de la question.',
  items: [
    {
      q: 'What type of question is this?',
      options: [
        { key: 'A', text: 'Opinion (agree / disagree)' },
        { key: 'B', text: 'Discussion + opinion' },
        { key: 'C', text: 'Advantages / disadvantages' },
        { key: 'D', text: 'Problem / solution' },
      ],
      answer: 'B',
      why: '« Discuss both views and give your own opinion ».',
    },
    {
      q: 'How many parts do you need to cover?',
      options: [
        { key: 'A', text: 'One: your opinion' },
        { key: 'B', text: 'Two: the two views' },
        { key: 'C', text: 'Three: the positive view, the negative view and your opinion' },
      ],
      answer: 'C',
      why: 'Avis favorable, avis défavorable, et ton opinion personnelle.',
    },
    {
      q: 'Where should your opinion appear?',
      options: [
        { key: 'A', text: 'Only in the conclusion' },
        { key: 'B', text: 'In the introduction and the conclusion' },
        { key: 'C', text: 'Only in the second body paragraph' },
      ],
      answer: 'B',
      why: 'Ta position est annoncée dès l’introduction, puis confirmée dans la conclusion : la grille officielle demande une position claire dans tout l’essai.',
    },
  ],
}

/** Exercice W4 : reformuler sans changer le sens. */
export const REPHRASE = [
  { original: 'Many young people spend too much time on social media.', model: 'A large number of teenagers devote excessive hours to online platforms.' },
  { original: 'The government should invest more in public transport.', model: 'Greater public funding ought to be allocated to buses, trains and trams.' },
  { original: 'Studying abroad has many advantages.', model: 'Pursuing a degree in another country offers a wide range of benefits.' },
  { original: 'Pollution is a big problem in big cities.', model: 'Air quality has become a serious concern in major urban areas.' },
  { original: 'More and more people are working from home.', model: 'The number of employees who work remotely is rising steadily.' },
]
