import type { UnitContent } from './types'

// Thème IELTS : Technology.

const unit: UnitContent = {
  unitId: 'technology',
  lessons: [
    {
      title: 'Everyday technology (B2)',
      words: [
        { word: 'device', pos: 'noun', fr: 'appareil', def: 'a machine or tool made for a particular purpose', ex: 'Children spend hours on electronic devices.', col: ['electronic devices', 'mobile devices'], level: 'B1' },
        { word: 'screen time', pos: 'noun', fr: 'temps d’écran', frAlt: ["temps d'ecran", "temps passe devant les ecrans"], def: 'the time spent looking at a screen', ex: 'Parents should limit their children’s screen time.', col: ['limit screen time', 'excessive screen time'], level: 'B2' },
        { word: 'user-friendly', pos: 'adjective', fr: 'facile à utiliser, ergonomique', frAlt: ['facile a utiliser', 'ergonomique', 'intuitif'], def: 'easy to use or understand', ex: 'The new app is very user-friendly.', level: 'B2' },
        { word: 'cutting-edge', pos: 'adjective', fr: 'de pointe', def: 'the newest and most advanced', ex: 'The laboratory uses cutting-edge equipment.', col: ['cutting-edge technology'], level: 'C1' },
        { word: 'breakthrough', pos: 'noun', fr: 'percée, avancée majeure', frAlt: ['percee', 'avancee majeure', 'decouverte'], def: 'an important new discovery', ex: 'The vaccine was a major medical breakthrough.', col: ['a major breakthrough', 'make a breakthrough'], level: 'B2' },
        { word: 'outdated', pos: 'adjective', fr: 'dépassé, obsolète', frAlt: ['depasse', 'obsolete', 'perime'], def: 'no longer modern or useful', ex: 'Many schools still use outdated computers.', level: 'B2' },
        { word: 'go online', pos: 'verb phrase', fr: 'se connecter à internet', frAlt: ['se connecter', 'aller sur internet'], def: 'to start using the internet', ex: 'Most people go online several times a day.', level: 'B1' },
        { word: 'rely on', pos: 'phrasal verb', fr: 'dépendre de, compter sur', frAlt: ['dependre de', 'compter sur', 'se fier a'], def: 'to depend on something or someone', ex: 'We increasingly rely on smartphones for everyday tasks.', col: ['rely heavily on'], level: 'B2' },
        { word: 'addictive', pos: 'adjective', fr: 'addictif', def: 'making people want to keep using it', ex: 'Social media apps are designed to be addictive.', col: ['highly addictive'], level: 'B2' },
      ],
      cloze: [
        { s: 'Scientists have made a major ___ in cancer research.', a: 'breakthrough', opts: ['breakdown', 'breakout', 'outbreak'], why: '« breakthrough » = percée. « breakdown » = panne, « outbreak » = épidémie.', kind: 'vocab' },
        { s: 'Doctors recommend that parents ___ their children’s screen time.', a: 'limit', opts: ['low', 'reduce of', 'little'], why: '« limit screen time » = limiter le temps d’écran.', kind: 'collocation' },
        { s: 'Modern society relies heavily ___ technology.', a: 'on', opts: ['of', 'in', 'to'], why: '« rely on » : la préposition est toujours « on ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'The technology have changed the way we communicate.', ok: false, fix: 'Technology has changed the way we communicate.', why: 'Sens général : pas de « the ». Et « technology » est singulier : « has ».' },
        { s: 'Many older people find smartphones difficult to use.', ok: true, why: 'Correct.' },
      ],
      sentences: [
        { en: 'Social media apps are designed to be addictive.', fr: 'Les applis de réseaux sociaux sont conçues pour rendre accro.' },
        { en: 'We rely heavily on our phones.', fr: 'Nous dépendons énormément de nos téléphones.' },
      ],
    },
    {
      title: 'The digital world (C1)',
      words: [
        { word: 'artificial intelligence', pos: 'noun', fr: 'intelligence artificielle', def: 'computer systems that can perform tasks that normally need human intelligence', ex: 'Artificial intelligence could replace many office jobs.', level: 'B2', alt: ['AI'] },
        { word: 'automation', pos: 'noun', fr: 'automatisation', def: 'the use of machines to do work previously done by people', ex: 'Automation has reduced the number of factory jobs.', level: 'C1' },
        { word: 'privacy', pos: 'noun', fr: 'vie privée, confidentialité', frAlt: ['vie privee', 'confidentialite'], def: 'the right to keep your personal information to yourself', ex: 'Many users worry about their online privacy.', col: ['invasion of privacy', 'data privacy'], level: 'B2' },
        { word: 'data breach', pos: 'noun', fr: 'fuite de données', frAlt: ['fuite de donnees', 'violation de donnees'], def: 'an incident in which private data is stolen or exposed', ex: 'The company suffered a massive data breach.', level: 'C1' },
        { word: 'digital divide', pos: 'noun', fr: 'fracture numérique', frAlt: ['fracture numerique'], def: 'the gap between people who have access to technology and those who do not', ex: 'Free internet access could narrow the digital divide.', col: ['bridge the digital divide', 'narrow the digital divide'], level: 'C1' },
        { word: 'misinformation', pos: 'noun', fr: 'désinformation, fausses informations', frAlt: ['desinformation', 'fausses informations', 'infox'], def: 'false information that spreads, often online', ex: 'Misinformation spreads faster than the truth on social media.', level: 'C1', note: 'Indénombrable.' },
        { word: 'innovation', pos: 'noun', fr: 'innovation', def: 'a new idea, method or invention', ex: 'Competition drives innovation.', col: ['technological innovation', 'drive innovation'], level: 'B2' },
        { word: 'surveillance', pos: 'noun', fr: 'surveillance', def: 'careful watching of people, often by the state', ex: 'Facial recognition raises concerns about mass surveillance.', col: ['mass surveillance'], level: 'C1' },
        { word: 'obsolete', pos: 'adjective', fr: 'obsolète', frAlt: ['obsolete', 'depasse'], def: 'no longer used because something newer exists', ex: 'Many traditional skills are becoming obsolete.', col: ['become obsolete'], level: 'C1' },
      ],
      cloze: [
        { s: 'Governments should invest in rural broadband to ___ the digital divide.', a: 'bridge', opts: ['cross', 'build', 'jump'], why: '« bridge / narrow the digital divide » = réduire la fracture numérique.', kind: 'collocation' },
        { s: 'Collecting personal data without consent is an invasion ___ privacy.', a: 'of', opts: ['in', 'on', 'to'], why: '« an invasion of privacy ».', kind: 'grammar' },
        { s: 'Competition between companies ___ innovation.', a: 'drives', opts: ['leads', 'conducts', 'rides'], why: '« drive innovation » = stimuler l’innovation.', kind: 'collocation' },
      ],
      judge: [
        { s: 'Misinformations spread quickly on social media.', ok: false, fix: 'Misinformation spreads quickly on social media.', why: '« misinformation » est indénombrable : pas de « s », verbe au singulier.' },
        { s: 'Automation has made many manual jobs obsolete.', ok: true, why: 'Correct : « make something obsolete ».' },
      ],
      sentences: [
        { en: 'Misinformation spreads quickly online.', fr: 'Les fausses informations se propagent vite en ligne.' },
        { en: 'Automation has reduced the number of factory jobs.', fr: 'L’automatisation a réduit le nombre d’emplois en usine.' },
      ],
    },
    {
      title: 'Essay language (C2)',
      words: [
        { word: 'double-edged sword', pos: 'idiom', fr: 'arme à double tranchant', frAlt: ['arme a double tranchant'], def: 'something that has both advantages and disadvantages', ex: 'Social media is a double-edged sword for teenagers.', level: 'C1', alt: ['a double-edged sword'] },
        { word: 'ubiquitous', pos: 'adjective', fr: 'omniprésent', frAlt: ['omnipresent'], def: 'found everywhere', ex: 'Smartphones have become ubiquitous.', level: 'C2' },
        { word: 'erode', pos: 'verb', fr: 'éroder, affaiblir', frAlt: ['eroder', 'affaiblir', 'saper'], def: 'to gradually weaken or destroy something', ex: 'Constant notifications erode our ability to concentrate.', col: ['erode trust', 'erode privacy'], level: 'C2' },
        { word: 'unprecedented', pos: 'adjective', fr: 'sans précédent', frAlt: ['sans precedent', 'inedit'], def: 'never having happened before', ex: 'The internet has given us unprecedented access to information.', level: 'C1' },
        { word: 'exacerbate', pos: 'verb', fr: 'aggraver, exacerber', frAlt: ['aggraver', 'exacerber'], def: 'to make a problem worse', ex: 'Excessive screen use may exacerbate feelings of loneliness.', level: 'C2' },
        { word: 'harness', pos: 'verb', fr: 'exploiter, tirer parti de', frAlt: ['exploiter', 'tirer parti de', 'maitriser'], def: 'to control and use something for a good purpose', ex: 'Schools should harness technology to personalise learning.', col: ['harness the power of'], level: 'C2' },
        { word: 'tech-savvy', pos: 'adjective', fr: 'à l’aise avec la technologie', frAlt: ["a l'aise avec la technologie", 'calé en technologie'], def: 'knowing a lot about modern technology', ex: 'Younger generations are generally more tech-savvy.', level: 'C1' },
        { word: 'alienation', pos: 'noun', fr: 'aliénation, isolement', frAlt: ['alienation', 'isolement'], def: 'the feeling of being isolated from other people', ex: 'Online life can lead to social alienation.', level: 'C2' },
        { word: 'detrimental', pos: 'adjective', fr: 'nuisible, préjudiciable', frAlt: ['nuisible', 'prejudiciable', 'nefaste'], def: 'causing harm or damage', ex: 'Excessive gaming can be detrimental to health.', col: ['detrimental to', 'a detrimental effect'], level: 'C1' },
      ],
      cloze: [
        { s: 'Too much time online can be ___ to children’s development.', a: 'detrimental', opts: ['determinant', 'deterrent', 'determined'], why: '« detrimental to » = nuisible à.', kind: 'vocab' },
        { s: 'Smartphones are now ___: almost everyone owns one.', a: 'ubiquitous', opts: ['ambiguous', 'unique', 'obvious'], why: '« ubiquitous » = omniprésent. « ambiguous » = ambigu.', kind: 'vocab' },
        { s: 'Social isolation may be ___ by excessive use of social media.', a: 'exacerbated', opts: ['exaggerated', 'executed', 'excavated'], why: '« exacerbate » = aggraver. « exaggerate » = exagérer.', kind: 'vocab' },
      ],
      judge: [
        { s: 'The internet has given people unprecedented access to knowledge.', ok: true, why: 'Correct, et « unprecedented » fait très bonne impression dans un essai.' },
        { s: 'Excessive screen time is detrimental for children.', ok: false, fix: 'Excessive screen time is detrimental to children.', why: 'La préposition est « detrimental to ».' },
      ],
      sentences: [
        { en: 'Social media is a double-edged sword.', fr: 'Les réseaux sociaux sont une arme à double tranchant.' },
        { en: 'Notifications erode our ability to concentrate.', fr: 'Les notifications sapent notre capacité de concentration.' },
      ],
    },
  ],
}

export default unit
