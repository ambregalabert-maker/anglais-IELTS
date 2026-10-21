// Grammaire du Booklet 2 : rappels de cours + exercices (phrases à trous et vrai/faux).

import type { Cloze, Judge } from '../vocab/types'

export interface GrammarTopic {
  id: string
  title: string
  icon: string
  rules: string[] // rappel de cours (affiché avant les exercices)
  cloze: Cloze[]
  judge: Judge[]
}

export const GRAMMAR: GrammarTopic[] = [
  {
    id: 'past-perfect',
    title: 'Past simple vs present perfect',
    icon: '⏳',
    rules: [
      'Past simple (did, went, saw) : action terminée à un moment précis du passé. Il répond à « When? ». Mots-clés : yesterday, last week, in 2010, ago.',
      'Present perfect (have/has + participe passé) : lien avec le présent. Jamais avec une date passée précise.',
      'Action commencée dans le passé et qui continue : « I have known Julie for ten years ». Mots-clés : for, since.',
      'Expérience de vie, sans dire quand : « My brother has been to Mexico three times ». Mots-clés : ever, never, already.',
      'Résultat présent : « I have lost my keys! » (je ne peux pas rentrer). Mot-clé : just. Action attendue : « Have you finished yet? »',
      'Période non terminée (this week, today) : present perfect. Période terminée (last week, yesterday) : past simple.',
    ],
    cloze: [
      { s: 'I ___ John last week.', a: 'saw', opts: ['have seen', 'have saw', 'see'], why: '« last week » = période terminée : past simple.', kind: 'grammar' },
      { s: 'I ___ Julie for ten years, and we are still friends.', a: 'have known', opts: ['knew', 'know', 'am knowing'], why: 'Action qui continue avec « for » : present perfect.', kind: 'grammar' },
      { s: 'My brother ___ to Mexico three times.', a: 'has been', opts: ['went', 'was', 'has gone'], why: 'Expérience de vie sans date : present perfect. « has gone » voudrait dire qu’il y est encore.', kind: 'grammar' },
      { s: 'My great-grandmother ___ to Mexico three times. She passed away last year.', a: 'went', opts: ['has been', 'has gone', 'goes'], why: 'La personne est décédée : action terminée, past simple.', kind: 'grammar' },
      { s: 'Oh no! I ___ my keys. I can’t get into the house.', a: 'have lost', opts: ['lost', 'was losing', 'had lost'], why: 'Résultat dans le présent : present perfect.', kind: 'grammar' },
      { s: 'Have you finished your homework ___?', a: 'yet', opts: ['already', 'just', 'since'], why: 'Action attendue, dans une question : « yet » en fin de phrase.', kind: 'grammar' },
      { s: 'The company was founded ___ 1998.', a: 'in', opts: ['since', 'for', 'ago'], why: 'Date précise : « in 1998 » avec le past simple.', kind: 'grammar' },
      { s: 'Prices ___ steadily since 2015.', a: 'have risen', opts: ['rose', 'rise', 'were rising'], why: '« since 2015 » : tendance qui continue jusqu’à maintenant, present perfect.', kind: 'grammar' },
      { s: 'I ___ three cups of coffee today.', a: 'have had', opts: ['had', 'have', 'was having'], why: '« today » = période non terminée : present perfect.', kind: 'grammar' },
      { s: 'When ___ you start learning English?', a: 'did', opts: ['have', 'do', 'has'], why: 'Question « When? » : toujours le past simple.', kind: 'grammar' },
    ],
    judge: [
      { s: 'I have visited London in 2019.', ok: false, fix: 'I visited London in 2019.', why: 'Jamais de present perfect avec une date passée précise.' },
      { s: 'They have just arrested the thief.', ok: true, why: 'Correct : résultat présent, avec « just ».' },
      { s: 'I live here since 2015.', ok: false, fix: 'I have lived here since 2015.', why: 'Avec « since », le present perfect est obligatoire (erreur très fréquente des francophones).' },
      { s: 'Did you ever eat sushi?', ok: false, fix: 'Have you ever eaten sushi?', why: 'Expérience de vie avec « ever » : present perfect (en anglais britannique).' },
    ],
  },
  {
    id: 'past-continuous',
    title: 'Past continuous',
    icon: '🎬',
    rules: [
      'Forme : was/were + verbe-ing.',
      'Action en cours à un moment précis du passé : « At this time yesterday, I was doing my homework. »',
      'Deux actions longues en même temps : « While I was riding my bike, my brother was playing football. »',
      'Action longue interrompue par une action courte : la longue au past continuous, la courte au past simple. « Bob burnt his hand when he was cooking. » Mots-clés : when, while.',
      'Actions qui se suivent : past simple pour toutes. « We had breakfast, then we went to the store. »',
      'Les verbes d’état (know, like, want, believe…) ne se mettent pas à la forme continue.',
    ],
    cloze: [
      { s: 'At this time yesterday, I ___ my homework.', a: 'was doing', opts: ['did', 'have done', 'was do'], why: 'Action en cours à un moment précis du passé.', kind: 'grammar' },
      { s: 'While I was working in the garden, I ___ my back.', a: 'hurt', opts: ['was hurting', 'have hurt', 'hurted'], why: 'Action courte qui interrompt : past simple (hurt, hurt, hurt).', kind: 'grammar' },
      { s: 'Bob burnt his hand when he ___ dinner.', a: 'was cooking', opts: ['cooked', 'has cooked', 'cooks'], why: 'Action longue en cours : past continuous.', kind: 'grammar' },
      { s: 'While my sister was reading, my parents ___ TV.', a: 'were watching', opts: ['watched', 'was watching', 'have watched'], why: 'Deux actions longues simultanées. Sujet pluriel : « were ».', kind: 'grammar' },
      { s: 'We had breakfast, then we ___ ready and went to the shops.', a: 'got', opts: ['were getting', 'have got', 'get'], why: 'Actions successives : past simple.', kind: 'grammar' },
      { s: 'The phone rang ___ I was having a shower.', a: 'while', opts: ['during', 'since', 'for'], why: '« while » + proposition. « during » + nom.', kind: 'grammar' },
    ],
    judge: [
      { s: 'I was knowing the answer, but I didn’t say anything.', ok: false, fix: 'I knew the answer, but I didn’t say anything.', why: '« know » est un verbe d’état : pas de forme en -ing.' },
      { s: 'It was raining when we left the cinema.', ok: true, why: 'Correct : action longue (raining) + action courte (left).' },
      { s: 'When I arrived, they were having dinner.', ok: true, why: 'Correct.' },
    ],
  },
  {
    id: 'pp-continuous',
    title: 'Present perfect continuous',
    icon: '🔄',
    rules: [
      'Forme : have/has + been + verbe-ing. Il répond à « How long? ».',
      'Activité qui vient de s’arrêter, avec un lien avec maintenant : « It has been raining. The ground is wet. »',
      'Insiste sur la durée : « She has been painting the wall for two hours. » (qu’elle ait fini ou non)',
      'Le present perfect simple insiste sur le résultat : « She has painted the wall. It looks great. »',
      'Souvent avec for et since.',
    ],
    cloze: [
      { s: 'You look exhausted! You ___ very hard.', a: 'have been working', opts: ['worked', 'are working since', 'work'], why: 'Activité récente avec un résultat visible : present perfect continuous.', kind: 'grammar' },
      { s: 'She ___ since the age of six.', a: 'has been swimming', opts: ['swims', 'is swimming', 'swam'], why: 'Action répétée depuis une date : present perfect continuous (+ since).', kind: 'grammar' },
      { s: 'How long ___ you been learning English?', a: 'have', opts: ['are', 'did', 'do'], why: '« How long have you been + -ing? »', kind: 'grammar' },
      { s: 'She has painted the wall. It ___ great now.', a: 'looks', opts: ['has been looking', 'is looking since', 'looked'], why: 'Résultat présent, verbe d’état : présent simple.', kind: 'grammar' },
      { s: 'I ___ for the bus for forty minutes!', a: 'have been waiting', opts: ['wait', 'am waiting', 'waited since'], why: 'Durée jusqu’à maintenant (+ for) : present perfect continuous.', kind: 'grammar' },
    ],
    judge: [
      { s: 'I am learning English for three years.', ok: false, fix: 'I have been learning English for three years.', why: 'Durée jusqu’à maintenant : present perfect continuous, jamais le présent.' },
      { s: 'It has been raining all morning.', ok: true, why: 'Correct.' },
      { s: 'I have been writing three essays this week.', ok: false, fix: 'I have written three essays this week.', why: 'On compte un résultat (three essays) : present perfect simple.' },
    ],
  },
  {
    id: 'comparatives',
    title: 'Comparatifs et superlatifs',
    icon: '📏',
    rules: [
      'Une syllabe : -er / -est (tall, taller, tallest). Voyelle + consonne : on double (big, bigger, biggest).',
      'Deux syllabes en -y : -ier / -iest (happy, happier). La plupart des autres : more / most (careful, more careful).',
      'Trois syllabes ou plus : more / most (important, more important).',
      'Irréguliers : good → better → best ; bad → worse → worst ; far → farther ; little → less → least.',
      'Pour nuancer : much / far / a lot / slightly / considerably / significantly + comparatif.',
      'Dénombrable : more / fewer / as many as. Indénombrable : more / less / as much as. Twice as many / half as much…',
    ],
    cloze: [
      { s: 'This year’s results are ___ than last year’s.', a: 'better', opts: ['more good', 'gooder', 'best'], why: '« good » est irrégulier : better.', kind: 'grammar' },
      { s: 'It was the ___ day of the year.', a: 'hottest', opts: ['hotest', 'most hot', 'hotter'], why: 'Voyelle + consonne : on double le t (hottest).', kind: 'grammar' },
      { s: 'The new system is ___ efficient than the old one.', a: 'more', opts: ['much', 'most', 'very'], why: '« efficient » a trois syllabes : more efficient.', kind: 'grammar' },
      { s: 'The figures for 2003 were ___ higher than those for 2000.', a: 'significantly', opts: ['significant', 'very', 'more'], why: 'Nuancer un comparatif : significantly / considerably / much higher.', kind: 'grammar' },
      { s: 'There were ___ cars on the road in 1950.', a: 'fewer', opts: ['less', 'lesser', 'little'], why: '« cars » est dénombrable : fewer.', kind: 'grammar' },
      { s: 'People today drink ___ water than they used to.', a: 'less', opts: ['fewer', 'few', 'lesser'], why: '« water » est indénombrable : less.', kind: 'grammar' },
      { s: 'In 2004, China won nearly twice ___ many medals as the US.', a: 'as', opts: ['so', 'more', 'than'], why: 'Structure : twice as many… as.', kind: 'grammar' },
      { s: 'My sister is ___ than me.', a: 'busier', opts: ['more busy', 'busyer', 'busiest'], why: 'Deux syllabes en -y : busier.', kind: 'grammar' },
      { s: 'This is ___ important issue of our time.', a: 'the most', opts: ['the more', 'most', 'the much'], why: 'Superlatif : the most + adjectif long.', kind: 'grammar' },
      { s: 'The situation is getting ___.', a: 'worse', opts: ['badder', 'more bad', 'worst'], why: '« bad » est irrégulier : worse (comparatif), worst (superlatif).', kind: 'grammar' },
    ],
    judge: [
      { s: 'London is more expensive than Manchester.', ok: true, why: 'Correct.' },
      { s: 'This is the more beautiful city I have ever visited.', ok: false, fix: 'This is the most beautiful city I have ever visited.', why: 'Superlatif : the most.' },
      { s: 'Today I have twice as much money as you.', ok: true, why: 'Correct : « money » est indénombrable, donc « as much as ».' },
      { s: 'There is not as many water in the pond as before.', ok: false, fix: 'There is not as much water in the pond as before.', why: '« water » est indénombrable : as much.' },
    ],
  },
  {
    id: 'too-enough',
    title: 'Too, enough, as… as',
    icon: '⚖️',
    rules: [
      '« too » + adjectif/adverbe = trop : « You are too smart for your own good! »',
      '« too much » + indénombrable, « too many » + dénombrable : « too much coffee », « too many cars ».',
      '« enough » = assez. Il se place APRÈS l’adjectif ou l’adverbe, mais AVANT le nom : « calm enough », « enough money ».',
      '« as + adjectif + as » = aussi… que : « as low as 65% ». Négatif : « not as… as ».',
    ],
    cloze: [
      { s: 'Do you think you drink too ___ coffee?', a: 'much', opts: ['many', 'lot', 'more'], why: '« coffee » est indénombrable : too much.', kind: 'grammar' },
      { s: 'There are too ___ cars in the city centre.', a: 'many', opts: ['much', 'lot of', 'more'], why: '« cars » est dénombrable : too many.', kind: 'grammar' },
      { s: 'He is not old ___ to vote.', a: 'enough', opts: ['too', 'so', 'as'], why: '« enough » se place après l’adjectif : old enough.', kind: 'grammar' },
      { s: 'Did you have ___ money for the trip?', a: 'enough', opts: ['too', 'so much', 'as'], why: '« enough » se place avant le nom : enough money.', kind: 'grammar' },
      { s: 'The test was ___ difficult for most students.', a: 'too', opts: ['enough', 'too much', 'as'], why: '« too » + adjectif = trop difficile.', kind: 'grammar' },
      { s: 'One study found their accuracy to be as low ___ 65%.', a: 'as', opts: ['than', 'that', 'like'], why: 'Structure « as… as ».', kind: 'grammar' },
    ],
    judge: [
      { s: 'She is enough tall to play basketball.', ok: false, fix: 'She is tall enough to play basketball.', why: '« enough » se place après l’adjectif.' },
      { s: 'There are not as many people doing sport at school as there used to be.', ok: true, why: 'Correct : « people » est dénombrable, donc « as many ».' },
      { s: 'This bag is too much heavy.', ok: false, fix: 'This bag is too heavy.', why: 'Devant un adjectif seul : « too », pas « too much ».' },
    ],
  },
  // Exercices W5 et W6 de ta « Méthode IELTS »
  {
    id: 'french-errors',
    title: 'Erreurs typiques des francophones',
    icon: '🇫🇷',
    rules: [
      '« agree » est un verbe : I agree (jamais « I am agree »).',
      '« information », « advice », « research », « equipment » sont indénombrables : pas de -s, et « more information », pas « more informations ».',
      '« depend on » : toujours avec « on » (« It depends on the situation »).',
      '« people » est un pluriel : people live, people are.',
      '« since » + date : present perfect (« has increased since 2010 »).',
      '« On the other hand », pas « In the other hand ». « children », pas « childrens ».',
      'Comparatif des adjectifs courts : easier, bigger (pas « more easy »).',
    ],
    cloze: [
      { s: 'I ___ with this opinion.', a: 'agree', opts: ['am agree', 'am agreeing', 'agreed with me'], why: '« agree » est un verbe : I agree.', kind: 'grammar' },
      { s: 'The government must give more ___ to citizens.', a: 'information', opts: ['informations', 'an information', 'informations’'], why: '« information » est indénombrable : jamais de -s.', kind: 'grammar' },
      { s: 'It depends ___ the situation.', a: 'on', opts: ['of', 'from', 'to'], why: 'On dit toujours « depend on ».', kind: 'grammar' },
      { s: 'People who ___ in cities have more opportunities.', a: 'live', opts: ['lives', 'is living', 'has lived'], why: '« people » est un pluriel : people live.', kind: 'grammar' },
      { s: 'Since 2010, the number of cars ___ a lot.', a: 'has increased', opts: ['increased', 'increases', 'is increasing'], why: '« since 2010 » : present perfect.', kind: 'grammar' },
      { s: '___ the other hand, there are some disadvantages.', a: 'On', opts: ['In', 'At', 'By'], why: 'L’expression est « On the other hand ».', kind: 'grammar' },
      { s: 'The ___ should do more sport.', a: 'children', opts: ['childrens', 'childs', 'child'], why: '« children » est déjà un pluriel.', kind: 'grammar' },
      { s: 'It is ___ to work at home.', a: 'easier', opts: ['more easy', 'more easier', 'easyer'], why: 'Adjectif court en -y : easy → easier.', kind: 'grammar' },
      { s: 'Students need good ___ before choosing a university.', a: 'advice', opts: ['advices', 'an advice', 'advise'], why: '« advice » (nom) est indénombrable ; « advise » est le verbe.', kind: 'grammar' },
      { s: 'More ___ is needed on the effects of social media.', a: 'research', opts: ['researches', 'a research', 'researchs'], why: '« research » est indénombrable.', kind: 'grammar' },
    ],
    judge: [
      { s: 'I am agree with this opinion.', ok: false, fix: 'I agree with this opinion.', why: '« agree » est un verbe : pas de « am ».' },
      { s: 'The government must give more informations to citizens.', ok: false, fix: 'The government must give more information to citizens.', why: '« information » est indénombrable.' },
      { s: 'It depends of the situation.', ok: false, fix: 'It depends on the situation.', why: 'depend on.' },
      { s: 'People who lives in cities have more opportunities.', ok: false, fix: 'People who live in cities have more opportunities.', why: '« people » est un pluriel.' },
      { s: 'Since 2010, the number of cars increased a lot.', ok: false, fix: 'Since 2010, the number of cars has increased a lot.', why: 'Avec « since », present perfect.' },
      { s: 'In the other hand, there are some disadvantages.', ok: false, fix: 'On the other hand, there are some disadvantages.', why: '« On the other hand ».' },
      { s: 'The childrens should do more sport.', ok: false, fix: 'The children should do more sport.', why: '« children » est déjà un pluriel.' },
      { s: 'It is more easy to work at home.', ok: false, fix: 'It is easier to work at home.', why: 'easy → easier.' },
      { s: 'Many people now rely on public transport.', ok: true, why: 'Correct : « people » + verbe au pluriel, « rely on ».' },
    ],
  },
  {
    id: 'connectors',
    title: 'Connecteurs',
    icon: '🔗',
    rules: [
      'However / Nevertheless : contraste entre deux phrases (en début de phrase, suivi d’une virgule).',
      'Whereas / while : contraste à l’intérieur d’une même phrase (« Cities offer more jobs, whereas rural areas… »).',
      'As a result / Consequently / Therefore : conséquence.',
      'Furthermore / Moreover / In addition : ajouter une idée.',
      'For instance / For example : donner un exemple. Entre virgules au milieu d’une phrase.',
      'Varie-les, sans en mettre dans chaque phrase : un connecteur toutes les deux ou trois phrases suffit.',
    ],
    cloze: [
      { s: 'Many people work longer hours. ___, they have less time for their families.', a: 'As a result', opts: ['However', 'For instance', 'Whereas'], why: 'Conséquence : As a result.', kind: 'grammar' },
      { s: 'Cities offer more jobs, ___ rural areas often have a lower cost of living.', a: 'whereas', opts: ['furthermore', 'as a result', 'for instance'], why: 'Contraste dans la même phrase : whereas.', kind: 'grammar' },
      { s: 'Exercise improves physical health. ___, it can reduce stress.', a: 'Furthermore', opts: ['However', 'Whereas', 'Consequently'], why: 'On ajoute un argument : Furthermore.', kind: 'grammar' },
      { s: 'Some countries have banned plastic bags. Kenya, ___, introduced a strict ban in 2017.', a: 'for instance', opts: ['however', 'whereas', 'as a result'], why: 'Un exemple, entre virgules : for instance.', kind: 'grammar' },
      { s: 'Online learning is flexible. ___, some students miss face-to-face contact.', a: 'However', opts: ['Furthermore', 'As a result', 'For instance'], why: 'Contraste entre deux phrases : However.', kind: 'grammar' },
      { s: 'Public transport is cheap. ___, it is often overcrowded at peak times.', a: 'Nevertheless', opts: ['Moreover', 'Therefore', 'For example'], why: 'Contraste : Nevertheless (plus soutenu que « But »).', kind: 'grammar' },
      { s: 'Fuel prices rose sharply. ___, many people started cycling to work.', a: 'Consequently', opts: ['Moreover', 'Whereas', 'In contrast'], why: 'Conséquence : Consequently.', kind: 'grammar' },
      { s: 'Older people often prefer newspapers, ___ younger people get their news online.', a: 'while', opts: ['moreover', 'therefore', 'for example'], why: 'Contraste dans la même phrase : while (= whereas).', kind: 'grammar' },
      { s: 'Tourism creates jobs. ___, it brings money to local businesses.', a: 'In addition', opts: ['However', 'Whereas', 'Nevertheless'], why: 'Ajout : In addition.', kind: 'grammar' },
      { s: 'Sales fell in 2020. ___, they recovered quickly the following year.', a: 'However', opts: ['Therefore', 'Moreover', 'For instance'], why: 'Contraste : However.', kind: 'grammar' },
    ],
    judge: [
      { s: 'Cities are expensive. Whereas, the countryside is cheaper.', ok: false, fix: 'Cities are expensive, whereas the countryside is cheaper.', why: '« whereas » relie deux idées dans une même phrase ; entre deux phrases, utilise « However » ou « In contrast ».' },
      { s: 'Moreover, furthermore, the cost of living is rising.', ok: false, fix: 'Furthermore, the cost of living is rising.', why: 'Un seul connecteur à la fois.' },
      { s: 'Prices rose. As a result, demand fell.', ok: true, why: 'Correct : conséquence, avec une virgule après le connecteur.' },
      { s: 'Some cities, for instance Amsterdam, have excellent cycle lanes.', ok: true, why: 'Correct : l’exemple est placé entre virgules.' },
    ],
  },
]
