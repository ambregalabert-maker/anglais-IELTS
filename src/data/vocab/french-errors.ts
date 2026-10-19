import type { UnitContent } from './types'

// Unité 6 : les erreurs typiques des francophones (Booklet 2, « Common vocabulary mistakes »), plus des faux amis fréquents.

const unit: UnitContent = {
  unitId: 'french-errors',
  lessons: [
    {
      title: 'Les pièges du Task 1',
      words: [
        { word: 'undergo', pos: 'verb', fr: 'subir, connaître (une évolution)', frAlt: ['subir', 'connaitre', 'traverser'], def: 'to experience a change or process', ex: 'The trend has undergone a substantial increase.', level: 'C1', alt: ['undergone', 'underwent'], note: 'À utiliser à la place de « know » : jamais « the trend has known an increase ». Irrégulier : undergo, underwent, undergone.' },
        { word: 'experience', pos: 'verb', fr: 'connaître, vivre (une évolution)', frAlt: ['connaitre', 'vivre', 'subir'], def: 'to have something happen to you', ex: 'Many cities experience a rise in pollution in winter.', level: 'B2', note: 'Bonne alternative à « undergo » : « experience a decline ».' },
        { word: 'go from… to', pos: 'phrase', fr: 'passer de… à', frAlt: ['passer de a', 'passer de... a'], def: 'to change from one figure to another', ex: 'The rate went from 5.3% to 7.2%.', level: 'B1', alt: ['go from to', 'go from ... to', 'went from to'], note: 'Jamais « pass from… to… ».' },
        { word: 'there is', pos: 'phrase', fr: 'il y a', frAlt: ['il existe'], def: 'used to say that something exists', ex: 'There is a fluctuation in the figures.', level: 'B1', alt: ['there are'], note: 'Jamais « it exists ». Pluriel : there are.' },
        { word: 'spend time', pos: 'verb phrase', fr: 'passer du temps', def: 'to use time doing something', ex: 'Children spend time playing video games.', col: ['spend time + -ing', 'spend time on something'], level: 'B1', note: 'Jamais « pass time on ». On « spend » du temps comme de l’argent.' },
        { word: 'significant', pos: 'adjective', fr: 'important, significatif (quantité)', frAlt: ['important', 'significatif', 'notable'], def: 'large or important enough to be noticed', ex: 'There was a significant drop in sales.', level: 'B2', note: 'Pour une quantité : significant, substantial, considerable. Jamais « important ».' },
        { word: 'pass an exam', pos: 'verb phrase', fr: 'réussir un examen', frAlt: ['reussir un examen', 'avoir un examen'], def: 'to succeed in an exam', ex: 'I hope to pass an exam like the IELTS on my first attempt.', level: 'B1', note: '« pass » = réussir. Passer un examen = « take / sit an exam ».' },
        { word: 'take an exam', pos: 'verb phrase', fr: 'passer un examen', def: 'to do an exam (without saying if you succeed)', ex: 'I will take an exam in January.', level: 'B1', alt: ['sit an exam'], note: 'En anglais britannique, on dit aussi « sit an exam ».' },
      ],
      cloze: [
        { s: 'I ___ three hours on this essay yesterday.', a: 'spent', opts: ['passed', 'made', 'did'], why: 'On « spend » du temps sur quelque chose, jamais « pass ».', kind: 'vocab' },
        { s: 'The country ___ a period of rapid change in the 1990s.', a: 'underwent', opts: ['knew', 'passed', 'met'], why: '« undergo » (prétérit : underwent) = connaître, traverser. « know » ne s’emploie pas ainsi.', kind: 'vocab' },
        { s: 'I ___ my driving test last week, so now I can drive!', a: 'passed', opts: ['succeeded', 'reached', 'achieved'], why: '« pass a test » = réussir. « succeed » demande « in » : succeed in a test (rare).', kind: 'vocab' },
        { s: '___ are many reasons for this trend.', a: 'There', opts: ['It', 'They exist', 'Exist'], why: '« il y a » = « there is / there are ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'The country has known a period of economic growth.', ok: false, fix: 'The country has experienced a period of economic growth.', why: '« know » ne s’utilise que pour des personnes qu’on connaît. On dit « experience » ou « undergo ».' },
        { s: 'Children spend a lot of time playing video games.', ok: true, why: 'Correct : « spend time + -ing ».' },
        { s: 'I succeeded my exam last summer.', ok: false, fix: 'I passed my exam last summer.', why: 'Réussir un examen = « pass an exam ».' },
      ],
      sentences: [
        { en: 'I spent two hours on my essay.', fr: 'J’ai passé deux heures sur ma rédaction.' },
        { en: 'There are many reasons for this.', fr: 'Il y a de nombreuses raisons à cela.' },
        { en: 'The city has undergone major changes.', fr: 'La ville a connu des changements majeurs.' },
      ],
    },
    {
      title: 'Les noms indénombrables',
      words: [
        { word: 'information', pos: 'uncountable noun', fr: 'information(s), renseignements', frAlt: ['information', 'informations', 'renseignements'], def: 'facts about something (never plural)', ex: 'I need more information about the course.', col: ['a piece of information'], level: 'B1', note: 'Jamais « informations », jamais « an information ».' },
        { word: 'advice', pos: 'uncountable noun', fr: 'conseil(s)', frAlt: ['conseil', 'conseils'], def: 'an opinion about what someone should do', ex: 'My teacher gave me some useful advice.', col: ['a piece of advice', 'give advice'], level: 'B1', note: 'Le verbe est « advise » (avec un s).' },
        { word: 'knowledge', pos: 'uncountable noun', fr: 'connaissance(s)', frAlt: ['connaissance', 'connaissances', 'savoir'], def: 'information and understanding gained through learning', ex: 'Reading improves your knowledge of the world.', col: ['a good knowledge of'], level: 'B2' },
        { word: 'news', pos: 'uncountable noun', fr: 'nouvelle(s), informations', frAlt: ['nouvelle', 'nouvelles', 'actualites', 'informations'], def: 'information about recent events (singular verb)', ex: 'The news is not very good today.', col: ['a piece of news'], level: 'B1', note: 'Se termine par un « s » mais le verbe est au singulier : the news IS.' },
        { word: 'a piece of', pos: 'phrase', fr: 'un(e)… (pour compter un indénombrable)', frAlt: ['un morceau de', 'un'], def: 'used to count uncountable nouns', ex: 'She gave me a piece of advice.', level: 'B1' },
        { word: 'equipment', pos: 'uncountable noun', fr: 'équipement, matériel', frAlt: ['equipement', 'materiel', 'equipements'], def: 'the tools or machines needed for an activity', ex: 'The gym has a lot of modern equipment.', level: 'B2' },
        { word: 'research', pos: 'uncountable noun', fr: 'recherche(s)', frAlt: ['recherche', 'recherches'], def: 'detailed study to discover new facts', ex: 'Recent research shows that exercise improves memory.', col: ['carry out research', 'do research into'], level: 'B2', note: 'Jamais « researches ».' },
        { word: 'homework', pos: 'uncountable noun', fr: 'devoirs', frAlt: ['devoir', 'devoirs'], def: 'work that students do at home', ex: 'I have a lot of homework tonight.', col: ['do homework'], level: 'B1' },
        { word: 'accommodation', pos: 'uncountable noun', fr: 'logement', frAlt: ['logement', 'hebergement'], def: 'a place to live or stay', ex: 'Students often struggle to find accommodation.', level: 'B2', note: 'Orthographe : deux « c » et deux « m ». Indénombrable en anglais britannique.' },
        { word: 'evidence', pos: 'uncountable noun', fr: 'preuve(s)', frAlt: ['preuve', 'preuves', 'elements'], def: 'facts that show something is true', ex: 'There is little evidence that this policy works.', col: ['a piece of evidence'], level: 'B2', note: 'Faux ami : « évidence » (chose évidente) = « obviousness ».' },
      ],
      cloze: [
        { s: 'Can you give me some ___ about the course?', a: 'information', opts: ['informations', 'an information', 'informative'], why: '« information » est indénombrable : pas de « s », pas de « an ».', kind: 'grammar' },
        { s: 'She gave me a good piece of ___.', a: 'advice', opts: ['advices', 'advise', 'adviser'], why: 'Le nom est « advice » (indénombrable). « advise » est le verbe.', kind: 'grammar' },
        { s: 'The news ___ very good today.', a: 'is', opts: ['are', 'were', 'have'], why: '« news » est indénombrable : verbe au singulier.', kind: 'grammar' },
        { s: 'It is very hard to find ___ in London.', a: 'accommodation', opts: ['an accommodation', 'accommodations', 'acommodation'], why: '« accommodation » : indénombrable, et attention à l’orthographe (cc, mm).', kind: 'grammar' },
      ],
      judge: [
        { s: 'Scientists have done a lot of researches on this topic.', ok: false, fix: 'Scientists have done a lot of research on this topic.', why: '« research » est indénombrable.' },
        { s: 'The equipment in this school is very modern.', ok: true, why: 'Correct : « equipment » + verbe au singulier.' },
        { s: 'I have many homeworks tonight.', ok: false, fix: 'I have a lot of homework tonight.', why: '« homework » est indénombrable : « a lot of homework ».' },
      ],
      sentences: [
        { en: 'She gave me a useful piece of advice.', fr: 'Elle m’a donné un conseil utile.' },
        { en: 'The news is not very good.', fr: 'Les nouvelles ne sont pas très bonnes.' },
        { en: 'I need more information about the course.', fr: 'J’ai besoin de plus d’informations sur le cours.' },
      ],
    },
    {
      title: 'Les faux amis',
      words: [
        { word: 'actually', pos: 'adverb', fr: 'en fait, en réalité', frAlt: ['en fait', 'en realite', 'vraiment'], def: 'used to say what is really true', ex: 'I thought it would be hard, but actually it was easy.', level: 'B1', note: 'Faux ami : « actuellement » = currently.' },
        { word: 'currently', pos: 'adverb', fr: 'actuellement', frAlt: ['actuellement', 'en ce moment'], def: 'at the present time', ex: 'She is currently working in a bank.', level: 'B2' },
        { word: 'eventually', pos: 'adverb', fr: 'finalement, à la fin', frAlt: ['finalement', 'a la fin', 'au bout du compte'], def: 'in the end, after a long time', ex: 'After many attempts, she eventually passed her test.', level: 'B2', note: 'Faux ami : « éventuellement » = possibly.' },
        { word: 'sensible', pos: 'adjective', fr: 'raisonnable, sensé', frAlt: ['raisonnable', 'sense', 'sage'], def: 'reasonable and practical', ex: 'Saving money for later is a sensible decision.', level: 'B2', note: 'Faux ami : « sensible » (émotif) = sensitive.' },
        { word: 'attend', pos: 'verb', fr: 'assister à, aller à', frAlt: ['assister a', 'aller a', 'frequenter'], def: 'to go to an event or a place regularly', ex: 'More than 200 people will attend the conference.', col: ['attend a lecture', 'attend school'], level: 'B2', note: 'Faux ami : « attendre » = wait for.' },
        { word: 'training', pos: 'uncountable noun', fr: 'formation', frAlt: ['formation', 'entrainement'], def: 'the process of learning the skills for a job', ex: 'New employees receive two weeks of training.', col: ['a training course', 'job training'], level: 'B2', note: 'Faux ami : « formation » en anglais = la formation d’un nuage, d’une équipe…' },
        { word: 'library', pos: 'noun', fr: 'bibliothèque', frAlt: ['bibliotheque'], def: 'a place where you can borrow books', ex: 'I study at the library every afternoon.', level: 'B1', note: 'Faux ami : une librairie = a bookshop.' },
        { word: 'achieve', pos: 'verb', fr: 'atteindre, réaliser (un objectif)', frAlt: ['atteindre', 'realiser', 'accomplir'], def: 'to succeed in doing something after effort', ex: 'With hard work, you can achieve a band 7.', col: ['achieve a goal', 'achieve success'], level: 'B2' },
        { word: 'assist', pos: 'verb', fr: 'aider, assister (quelqu’un)', frAlt: ['aider', 'assister'], def: 'to help someone', ex: 'Volunteers assist elderly people with their shopping.', level: 'B2', note: 'Assister à (un événement) = attend.' },
      ],
      cloze: [
        { s: 'I thought the film would be boring, but ___ it was great.', a: 'actually', opts: ['currently', 'eventually', 'possibly'], why: '« actually » = en fait.', kind: 'vocab' },
        { s: 'She is ___ working in a bank in Paris.', a: 'currently', opts: ['actually', 'eventually', 'lately'], why: '« currently » = actuellement.', kind: 'vocab' },
        { s: 'After many attempts, she ___ passed her driving test.', a: 'eventually', opts: ['actually', 'possibly', 'currently'], why: '« eventually » = finalement, au bout du compte.', kind: 'vocab' },
        { s: 'I ___ a conference in London last week.', a: 'attended', opts: ['assisted', 'assisted to', 'waited'], why: 'Assister à un événement = « attend ». « assist » = aider.', kind: 'vocab' },
      ],
      judge: [
        { s: 'I bought this novel at the library.', ok: false, fix: 'I bought this novel at the bookshop.', why: 'On achète un livre dans une librairie : « a bookshop ». « library » = bibliothèque.' },
        { s: 'Eventually, we could meet next week if you are free.', ok: false, fix: 'Possibly / Perhaps we could meet next week if you are free.', why: '« eventually » = finalement. Éventuellement = possibly, perhaps.' },
        { s: 'He did a training in marketing.', ok: false, fix: 'He did a training course in marketing.', why: '« training » est indénombrable : « a training course » ou « some training ».' },
      ],
      sentences: [
        { en: 'I am currently living in Lyon.', fr: 'J’habite actuellement à Lyon.' },
        { en: 'She eventually found a job.', fr: 'Elle a fini par trouver un travail.' },
        { en: 'I attended a conference last week.', fr: 'J’ai assisté à une conférence la semaine dernière.' },
      ],
    },
  ],
}

export default unit
