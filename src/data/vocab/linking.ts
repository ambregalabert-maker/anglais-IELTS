import type { UnitContent } from './types'

// Unité 4 : les mots de liaison du Booklet 2 (sequence, addition, contrast, result, reason, comparison, example, conclusion).
// Ici, « pos » indique la catégorie (sert d'indice), et les exercices insistent sur la construction (+ nom ? + phrase ?).

const unit: UnitContent = {
  unitId: 'linking',
  lessons: [
    {
      title: 'Adding & ordering ideas',
      words: [
        { word: 'firstly', pos: 'sequence', fr: 'premièrement', frAlt: ['premierement', "tout d'abord", 'd abord'], def: 'used to introduce the first point', ex: 'Firstly, online courses are cheaper.', level: 'B1', alt: ['first'] },
        { word: 'next', pos: 'sequence', fr: 'ensuite', frAlt: ['ensuite', 'puis'], def: 'used to introduce the following step', ex: 'Next, the water is heated to 100 degrees.', level: 'B1' },
        { word: 'finally', pos: 'sequence', fr: 'enfin', frAlt: ['enfin', 'finalement'], def: 'used to introduce the last point', ex: 'Finally, the product is packaged and sold.', level: 'B1', note: 'Dans un essai, « finally » introduit le dernier argument, pas la conclusion.' },
        { word: 'in addition', pos: 'addition', fr: 'de plus, en outre', frAlt: ['de plus', 'en outre', 'en plus'], def: 'used to add another point', ex: 'In addition, public transport reduces pollution.', level: 'B1', note: '« in addition to » + nom : in addition to this.' },
        { word: 'furthermore', pos: 'addition', fr: 'de plus, en outre', frAlt: ['de plus', 'en outre', 'par ailleurs'], def: 'used to add a stronger point (formal)', ex: 'Furthermore, the scheme would create new jobs.', level: 'B2' },
        { word: 'moreover', pos: 'addition', fr: 'de plus, qui plus est', frAlt: ['de plus', 'qui plus est', 'en outre'], def: 'used to add an important point (formal)', ex: 'Moreover, many students cannot afford the fees.', level: 'B2' },
        { word: 'as well as', pos: 'addition', fr: 'ainsi que, en plus de', frAlt: ['ainsi que', 'en plus de'], def: 'and also (followed by a noun or -ing)', ex: 'The course teaches writing as well as speaking.', level: 'B1' },
        { word: 'besides', pos: 'addition', fr: 'en plus, d’ailleurs', frAlt: ["d'ailleurs", 'en plus', 'en outre'], def: 'used to add another reason', ex: 'Besides, the city centre is easy to reach by bus.', level: 'B2', note: 'Ne pas confondre avec « beside » (à côté de).' },
        { word: 'not only… but also', pos: 'addition', fr: 'non seulement… mais aussi', frAlt: ['non seulement mais aussi', 'non seulement... mais aussi'], def: 'used to add a second, surprising point', ex: 'Cycling is not only cheap but also good for your health.', level: 'B2', alt: ['not only but also', 'not only... but also'] },
      ],
      cloze: [
        { s: '___, technology saves time. Secondly, it reduces costs.', a: 'Firstly', opts: ['Finally', 'Moreover', 'However'], why: 'Le premier argument : « Firstly » (puis Secondly, Thirdly…).', kind: 'vocab' },
        { s: 'Online courses are cheap. ___, they are very flexible.', a: 'Furthermore', opts: ['However', 'Therefore', 'Although'], why: 'On ajoute un argument dans le même sens : « Furthermore » (= de plus).', kind: 'vocab' },
        { s: 'Cycling is not only cheap ___ also good for the environment.', a: 'but', opts: ['and', 'so', 'yet'], why: 'La structure est « not only… but also ».', kind: 'grammar' },
        { s: 'In addition ___ this, the new law would reduce crime.', a: 'to', opts: ['of', 'at', 'with'], why: '« in addition to » + nom (in addition to this).', kind: 'grammar' },
      ],
      judge: [
        { s: 'Moreover, public transport is cheaper than driving.', ok: true, why: 'Correct, avec une virgule après « Moreover ».' },
        { s: 'In addition of this, it is much faster.', ok: false, fix: 'In addition to this, it is much faster.', why: 'On dit « in addition to », pas « in addition of ».' },
        { s: 'And it is also much cheaper.', ok: false, fix: 'Furthermore, it is also much cheaper.', why: 'Dans un essai académique, on évite de commencer une phrase par « And ».' },
      ],
      sentences: [
        { en: 'Furthermore, it saves a lot of time.', fr: 'De plus, cela fait gagner beaucoup de temps.' },
        { en: 'In addition, it is good for the environment.', fr: 'En outre, c’est bon pour l’environnement.' },
        { en: 'It is not only cheap but also fast.', fr: 'C’est non seulement bon marché mais aussi rapide.' },
      ],
    },
    {
      title: 'Contrast',
      words: [
        { word: 'however', pos: 'contrast', fr: 'cependant, toutefois', frAlt: ['cependant', 'toutefois', 'pourtant'], def: 'used to introduce a contrasting idea (+ comma)', ex: 'However, this is not always the case.', level: 'B1' },
        { word: 'nevertheless', pos: 'contrast', fr: 'néanmoins', frAlt: ['neanmoins', 'toutefois'], def: 'despite what has just been said (formal)', ex: 'The plan is expensive. Nevertheless, it is worth trying.', level: 'B2' },
        { word: 'although', pos: 'contrast', fr: 'bien que, même si', frAlt: ['bien que', 'meme si', 'quoique'], def: 'used before a clause (subject + verb) to show contrast', ex: 'Although it was raining, we went out.', level: 'B1' },
        { word: 'even though', pos: 'contrast', fr: 'même si, alors que', frAlt: ['meme si', 'alors que', 'bien que'], def: 'a stronger form of although (+ clause)', ex: 'She failed even though she had worked hard.', level: 'B2' },
        { word: 'despite', pos: 'contrast', fr: 'malgré', frAlt: ['malgre', 'en depit de'], def: 'used before a noun or -ing form', ex: 'Despite the rain, the match continued.', level: 'B2', note: 'Jamais « despite of ». Jamais suivi d’une proposition.' },
        { word: 'in spite of', pos: 'contrast', fr: 'malgré, en dépit de', frAlt: ['malgre', 'en depit de'], def: 'the same as despite (+ noun or -ing)', ex: 'In spite of being tired, she finished her essay.', level: 'B2' },
        { word: 'whereas', pos: 'contrast', fr: 'alors que, tandis que', frAlt: ['alors que', 'tandis que'], def: 'used to compare two different facts', ex: 'Men spent more on cars, whereas women spent more on clothes.', level: 'B2' },
        { word: 'while', pos: 'contrast', fr: 'alors que, tandis que', frAlt: ['alors que', 'tandis que', 'pendant que'], def: 'used to show contrast between two facts (or: during the time that)', ex: 'Some people prefer cities, while others love the countryside.', level: 'B1' },
        { word: 'on the other hand', pos: 'contrast', fr: 'd’un autre côté, en revanche', frAlt: ["d'un autre cote", 'en revanche', "d'autre part"], def: 'used to give the opposite point of view', ex: 'On the other hand, living in a city can be stressful.', level: 'B1' },
        { word: 'instead of', pos: 'contrast', fr: 'au lieu de', def: 'in place of (+ noun or -ing)', ex: 'More people cycle to work instead of driving.', level: 'B1' },
      ],
      cloze: [
        { s: '___ it was raining, we went for a walk.', a: 'Although', opts: ['Despite', 'However', 'In spite of'], why: 'Suivi d’une proposition (it was raining) : « Although ». « Despite » est suivi d’un nom.', kind: 'grammar' },
        { s: '___ the rain, we went for a walk.', a: 'Despite', opts: ['Although', 'Even though', 'However'], why: 'Suivi d’un nom (the rain) : « Despite ».', kind: 'grammar' },
        { s: 'Cars are convenient. ___, they pollute the air.', a: 'However', opts: ['Although', 'Despite', 'Whereas'], why: 'En début de phrase, suivi d’une virgule : « However ».', kind: 'grammar' },
        { s: 'Some people prefer cities, ___ others prefer the countryside.', a: 'whereas', opts: ['despite', 'however', 'in spite of'], why: '« whereas » relie deux propositions qui s’opposent.', kind: 'grammar' },
        { s: 'More people now work from home ___ commuting to the office.', a: 'instead of', opts: ['instead', 'rather', 'despite'], why: '« instead of » + -ing (instead of commuting).', kind: 'grammar' },
      ],
      judge: [
        { s: 'Despite it was expensive, I bought it.', ok: false, fix: 'Although it was expensive, I bought it. / Despite the cost, I bought it.', why: '« despite » est suivi d’un nom ou d’un -ing, jamais d’une proposition.' },
        { s: 'In spite of being tired, she finished the essay.', ok: true, why: 'Correct : « in spite of » + -ing.' },
        { s: 'Despite of the cost, the project went ahead.', ok: false, fix: 'Despite the cost, the project went ahead.', why: 'On dit « despite » ou « in spite of », mais jamais « despite of ».' },
      ],
      sentences: [
        { en: 'Although it was late, we kept working.', fr: 'Même s’il était tard, nous avons continué à travailler.' },
        { en: 'Despite the rain, the match continued.', fr: 'Malgré la pluie, le match a continué.' },
        { en: 'However, this is not always the case.', fr: 'Cependant, ce n’est pas toujours le cas.' },
      ],
    },
    {
      title: 'Cause & result',
      words: [
        { word: 'therefore', pos: 'result', fr: 'par conséquent, donc', frAlt: ['donc', 'par consequent', "c'est pourquoi"], def: 'for that reason (formal)', ex: 'Therefore, governments should invest in public transport.', level: 'B2', note: 'Remplace « So » en début de phrase dans un essai.' },
        { word: 'consequently', pos: 'result', fr: 'par conséquent', frAlt: ['par consequent', 'en consequence'], def: 'as a result (formal)', ex: 'Consequently, many small shops have closed.', level: 'B2' },
        { word: 'as a result', pos: 'result', fr: 'en conséquence, du coup', frAlt: ['en consequence', 'par consequent', 'du coup'], def: 'because of this', ex: 'As a result, many people lost their jobs.', level: 'B1', note: '« as a result of » + nom.' },
        { word: 'due to', pos: 'reason', fr: 'en raison de, dû à', frAlt: ['en raison de', 'du a', 'a cause de'], def: 'because of (+ noun)', ex: 'The flight was cancelled due to bad weather.', level: 'B2' },
        { word: 'because of', pos: 'reason', fr: 'à cause de', frAlt: ['a cause de', 'en raison de'], def: 'by reason of (+ noun)', ex: 'Many people move to cities because of work.', level: 'B1', note: '« because » + proposition, « because of » + nom.' },
        { word: 'since', pos: 'reason', fr: 'puisque, étant donné que', frAlt: ['puisque', 'etant donne que', 'comme'], def: 'because (+ clause)', ex: 'Since he was tired, he went to bed early.', level: 'B1', note: '« since » veut aussi dire « depuis » (since 2010).' },
        { word: 'in order to', pos: 'reason', fr: 'afin de, pour', frAlt: ['afin de', 'pour'], def: 'with the purpose of (+ verb)', ex: 'She works hard in order to succeed.', level: 'B1' },
        { word: 'thus', pos: 'result', fr: 'ainsi, donc', frAlt: ['ainsi', 'donc'], def: 'as a result (very formal)', ex: 'Fewer cars are on the road, thus reducing pollution.', level: 'C1' },
        { word: 'owing to', pos: 'reason', fr: 'en raison de', frAlt: ['en raison de', 'a cause de'], def: 'because of (+ noun, formal)', ex: 'The event was postponed owing to a lack of funding.', level: 'C1' },
      ],
      cloze: [
        { s: 'The flight was cancelled ___ bad weather.', a: 'due to', opts: ['because', 'so', 'therefore'], why: 'Suivi d’un nom (bad weather) : « due to » ou « because of ».', kind: 'grammar' },
        { s: 'He studied every evening ___ pass the exam.', a: 'in order to', opts: ['for', 'for to', 'in order'], why: 'But + verbe : « in order to » (ou simplement « to »).', kind: 'grammar' },
        { s: 'Prices rose sharply. ___, sales fell.', a: 'As a result', opts: ['Because', 'Due to', 'Although'], why: 'Pour introduire une conséquence en début de phrase : « As a result, ».', kind: 'grammar' },
        { s: '___ he was tired, he went to bed early.', a: 'Since', opts: ['Because of', 'Due to', 'Therefore'], why: 'Suivi d’une proposition (he was tired) : « Since » ou « Because ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'Due to the traffic, I arrived late.', ok: true, why: 'Correct : « due to » + nom.' },
        { s: 'I arrived late because of it was raining.', ok: false, fix: 'I arrived late because it was raining.', why: '« because of » + nom, « because » + proposition.' },
        { s: 'So, governments should invest more in education.', ok: false, fix: 'Therefore, governments should invest more in education.', why: '« So » en début de phrase est trop familier pour un essai : « Therefore » ou « Consequently ».' },
      ],
      sentences: [
        { en: 'As a result, many people lost their jobs.', fr: 'En conséquence, beaucoup de gens ont perdu leur emploi.' },
        { en: 'The match was cancelled due to the storm.', fr: 'Le match a été annulé à cause de la tempête.' },
        { en: 'She works hard in order to succeed.', fr: 'Elle travaille dur pour réussir.' },
      ],
    },
    {
      title: 'Examples, comparison & conclusion',
      words: [
        { word: 'for instance', pos: 'example', fr: 'par exemple', def: 'for example', ex: 'For instance, many students work part-time.', level: 'B1', alt: ['for example'] },
        { word: 'such as', pos: 'example', fr: 'tel(s) que, comme', frAlt: ['tel que', 'tels que', 'comme'], def: 'used before a list of examples (+ noun)', ex: 'Team sports such as football teach cooperation.', level: 'B1' },
        { word: 'including', pos: 'example', fr: 'y compris, dont', frAlt: ['y compris', 'dont', 'notamment'], def: 'used to show that something is part of a group', ex: 'Many countries, including France, have high taxes.', level: 'B2' },
        { word: 'similarly', pos: 'comparison', fr: 'de même', frAlt: ['de meme', 'pareillement', 'de la meme facon'], def: 'in the same way', ex: 'Similarly, adults need regular exercise.', level: 'B2' },
        { word: 'likewise', pos: 'comparison', fr: 'de même, également', frAlt: ['de meme', 'egalement', 'pareillement'], def: 'in the same way (formal)', ex: 'Likewise, older people benefit from learning new skills.', level: 'C1' },
        { word: 'compared with', pos: 'comparison', fr: 'par rapport à, comparé à', frAlt: ['par rapport a', 'compare a', 'en comparaison de'], def: 'when you compare it with', ex: 'Rents are high compared with other cities.', level: 'B2', alt: ['compared to'] },
        { word: 'in conclusion', pos: 'conclusion', fr: 'en conclusion', def: 'used to begin the final paragraph', ex: 'In conclusion, both views have some advantages.', level: 'B1', alt: ['to conclude'] },
        { word: 'to sum up', pos: 'conclusion', fr: 'pour résumer', frAlt: ['pour resumer', 'en resume', 'bref'], def: 'used to give a short summary', ex: 'To sum up, the benefits outweigh the drawbacks.', level: 'B1' },
        { word: 'overall', pos: 'conclusion', fr: 'dans l’ensemble', frAlt: ["dans l'ensemble", 'globalement', 'au total'], def: 'considering everything (very useful in Task 1)', ex: 'Overall, the number of tourists increased.', level: 'B2', note: 'Indispensable en Task 1 pour résumer la tendance générale.' },
        { word: 'all things considered', pos: 'conclusion', fr: 'tout bien considéré', frAlt: ['tout bien considere', 'tout compte fait'], def: 'after thinking about all the facts', ex: 'All things considered, it was a good decision.', level: 'C1' },
      ],
      cloze: [
        { s: 'Team sports, ___ football and basketball, teach cooperation.', a: 'such as', opts: ['like as', 'for instance of', 'as'], why: '« such as » + liste de noms.', kind: 'grammar' },
        { s: '___, the advantages outweigh the disadvantages.', a: 'Overall', opts: ['Moreover', 'For instance', 'Similarly'], why: 'Pour un bilan général : « Overall ».', kind: 'vocab' },
        { s: 'Rents in London are high ___ other cities.', a: 'compared with', opts: ['compared', 'comparing to', 'in comparison'], why: '« compared with/to » + nom (ou « in comparison with »).', kind: 'grammar' },
        { s: 'Children need exercise. ___, adults need regular physical activity.', a: 'Similarly', opts: ['However', 'Therefore', 'Instead'], why: 'On compare deux idées qui vont dans le même sens : « Similarly ».', kind: 'vocab' },
      ],
      judge: [
        { s: 'For example, Japan has an ageing population.', ok: true, why: 'Correct. « ageing » est l’orthographe britannique.' },
        { s: 'Such as, many cities now have bike lanes.', ok: false, fix: 'For example, many cities now have bike lanes.', why: '« such as » ne s’emploie pas seul en début de phrase. On utilise « For example, ».' },
        { s: 'To conclude, both views have some merit.', ok: true, why: 'Correct.' },
      ],
      sentences: [
        { en: 'For instance, many students work part-time.', fr: 'Par exemple, beaucoup d’étudiants travaillent à temps partiel.' },
        { en: 'In conclusion, both views have advantages.', fr: 'En conclusion, les deux points de vue ont des avantages.' },
        { en: 'Overall, the number of tourists increased.', fr: 'Dans l’ensemble, le nombre de touristes a augmenté.' },
      ],
    },
  ],
}

export default unit
