import type { UnitContent } from './types'

// Thème IELTS : Health.

const unit: UnitContent = {
  unitId: 'health',
  lessons: [
    {
      title: 'Healthy living (B2)',
      words: [
        { word: 'balanced diet', pos: 'noun', fr: 'alimentation équilibrée', frAlt: ['alimentation equilibree', 'regime equilibre'], def: 'eating the right amounts of different types of food', ex: 'A balanced diet includes plenty of fruit and vegetables.', col: ['eat a balanced diet', 'maintain a balanced diet'], level: 'B1' },
        { word: 'sedentary', pos: 'adjective', fr: 'sédentaire', frAlt: ['sedentaire'], def: 'involving a lot of sitting and little exercise', ex: 'Office workers often lead a sedentary lifestyle.', col: ['a sedentary lifestyle'], level: 'C1' },
        { word: 'obesity', pos: 'noun', fr: 'obésité', frAlt: ['obesite'], def: 'the condition of being very overweight', ex: 'Childhood obesity has doubled in thirty years.', col: ['childhood obesity', 'obesity rates'], level: 'B2' },
        { word: 'junk food', pos: 'noun', fr: 'malbouffe', frAlt: ['malbouffe', 'nourriture industrielle'], def: 'unhealthy food high in fat, sugar or salt', ex: 'Advertising junk food to children should be banned.', level: 'B1' },
        { word: 'work out', pos: 'phrasal verb', fr: 'faire du sport, s’entraîner', frAlt: ["s'entrainer", 'faire du sport', 'faire de la musculation'], def: 'to exercise to improve fitness', ex: 'I try to work out three times a week.', level: 'B1' },
        { word: 'life expectancy', pos: 'noun', fr: 'espérance de vie', frAlt: ['esperance de vie'], def: 'how long a person is expected to live', ex: 'Life expectancy has risen thanks to better healthcare.', level: 'B2' },
        { word: 'mental health', pos: 'noun', fr: 'santé mentale', frAlt: ['sante mentale'], def: 'a person’s psychological and emotional well-being', ex: 'Social media can affect teenagers’ mental health.', level: 'B2' },
        { word: 'prescription', pos: 'noun', fr: 'ordonnance', def: 'a written order from a doctor for medicine', ex: 'Antibiotics are only available on prescription.', col: ['on prescription', 'prescription drugs'], level: 'B2' },
        { word: 'well-being', pos: 'noun', fr: 'bien-être', frAlt: ['bien etre'], def: 'the state of being healthy and happy', ex: 'Green spaces improve residents’ well-being.', level: 'B2', alt: ['wellbeing'] },
      ],
      cloze: [
        { s: 'Many office workers lead a ___ lifestyle.', a: 'sedentary', opts: ['sedimentary', 'settled', 'seated'], why: '« a sedentary lifestyle » = un mode de vie sédentaire.', kind: 'collocation' },
        { s: 'It is important to ___ a balanced diet.', a: 'eat', opts: ['make', 'do', 'take'], why: 'On « eat / follow / maintain » une alimentation équilibrée.', kind: 'collocation' },
        { s: 'These pills are only available ___ prescription.', a: 'on', opts: ['with', 'by', 'under'], why: '« available on prescription » = sur ordonnance.', kind: 'grammar' },
      ],
      judge: [
        { s: 'Doing sport regularly is good for the health.', ok: false, fix: 'Doing sport regularly is good for your health.', why: 'On dit « good for your health » (ou « good for health »), jamais « good for the health ».' },
        { s: 'Life expectancy has increased significantly over the last century.', ok: true, why: 'Correct.' },
      ],
      sentences: [
        { en: 'Childhood obesity is a growing problem.', fr: 'L’obésité infantile est un problème croissant.' },
        { en: 'I work out three times a week.', fr: 'Je fais du sport trois fois par semaine.' },
      ],
    },
    {
      title: 'Healthcare systems (C1)',
      words: [
        { word: 'healthcare', pos: 'noun', fr: 'soins de santé, système de santé', frAlt: ['soins de sante', 'systeme de sante', 'soins'], def: 'the services that look after people’s health', ex: 'Access to healthcare should be free for everyone.', col: ['universal healthcare', 'access to healthcare'], level: 'B2', alt: ['health care'] },
        { word: 'preventive', pos: 'adjective', fr: 'préventif', frAlt: ['preventif'], def: 'intended to stop illness before it happens', ex: 'Preventive medicine saves money in the long term.', col: ['preventive measures', 'preventive medicine'], level: 'C1', alt: ['preventative'] },
        { word: 'epidemic', pos: 'noun', fr: 'épidémie', frAlt: ['epidemie'], def: 'a disease that spreads quickly among many people', ex: 'Experts describe obesity as a global epidemic.', level: 'C1' },
        { word: 'chronic', pos: 'adjective', fr: 'chronique', def: 'lasting a long time or constantly returning', ex: 'Diabetes is a chronic illness.', col: ['chronic disease', 'chronic pain'], level: 'C1' },
        { word: 'ageing population', pos: 'noun', fr: 'vieillissement de la population', def: 'a population with a growing proportion of older people', ex: 'An ageing population puts pressure on health services.', level: 'C1', alt: ['aging population'], note: 'Orthographe britannique : ageing.' },
        { word: 'side effect', pos: 'noun', fr: 'effet secondaire', def: 'an unwanted effect of a medicine', ex: 'This drug has very few side effects.', level: 'B2', alt: ['side effects'] },
        { word: 'vaccination', pos: 'noun', fr: 'vaccination', def: 'giving someone a vaccine to protect them from a disease', ex: 'Vaccination has eradicated several deadly diseases.', col: ['compulsory vaccination'], level: 'B2' },
        { word: 'waiting list', pos: 'noun', fr: 'liste d’attente', frAlt: ["liste d'attente"], def: 'a list of people waiting for treatment', ex: 'Patients can spend months on a waiting list.', level: 'B2' },
        { word: 'GP', pos: 'noun', fr: 'médecin généraliste', frAlt: ['medecin generaliste', 'generaliste', 'medecin traitant'], def: 'general practitioner: a family doctor (UK)', ex: 'If symptoms continue, see your GP.', level: 'B2' },
      ],
      cloze: [
        { s: 'An ___ population puts pressure on pension and health systems.', a: 'ageing', opts: ['olding', 'aged up', 'oldening'], why: 'L’expression est « an ageing population ».', kind: 'collocation' },
        { s: 'Governments should invest more in ___ medicine rather than expensive treatments.', a: 'preventive', opts: ['preventing', 'prevention', 'prevented'], why: 'Avant un nom, l’adjectif : « preventive medicine ».', kind: 'grammar' },
        { s: 'Asthma is a ___ condition that requires long-term treatment.', a: 'chronic', opts: ['chronical', 'chronicle', 'acute'], why: '« chronic » = chronique. « chronical » n’existe pas.', kind: 'vocab' },
      ],
      judge: [
        { s: 'Universal healthcare should be a basic right.', ok: true, why: 'Correct.' },
        { s: 'I went to the doctor because I had an headache.', ok: false, fix: 'I went to the doctor because I had a headache.', why: '« headache » commence par un son consonne /h/ : « a headache ».' },
      ],
      sentences: [
        { en: 'Prevention is better than cure.', fr: 'Mieux vaut prévenir que guérir.' },
        { en: 'Patients wait months for an operation.', fr: 'Les patients attendent des mois pour une opération.' },
      ],
    },
    {
      title: 'Essay language (C2)',
      words: [
        { word: 'detrimental to health', pos: 'adjective phrase', fr: 'nocif pour la santé', frAlt: ['nocif pour la sante', 'mauvais pour la sante'], def: 'harmful to health', ex: 'Long working hours are detrimental to health.', level: 'C1' },
        { word: 'alleviate', pos: 'verb', fr: 'soulager, atténuer', frAlt: ['soulager', 'attenuer'], def: 'to make pain or a problem less severe', ex: 'Regular exercise can alleviate symptoms of depression.', col: ['alleviate pain', 'alleviate pressure on'], level: 'C2' },
        { word: 'susceptible', pos: 'adjective', fr: 'vulnérable, sujet à', frAlt: ['vulnerable', 'sujet a', 'expose'], def: 'easily affected by something, especially an illness', ex: 'Elderly people are more susceptible to infections.', col: ['susceptible to'], level: 'C2', note: 'Faux ami : « susceptible » (vexé) = touchy.' },
        { word: 'sedentary lifestyle', pos: 'noun phrase', fr: 'mode de vie sédentaire', frAlt: ['mode de vie sedentaire'], def: 'a way of life with very little physical activity', ex: 'A sedentary lifestyle increases the risk of heart disease.', level: 'C1' },
        { word: 'overburdened', pos: 'adjective', fr: 'surchargé, débordé', frAlt: ['surcharge', 'deborde'], def: 'having too much work or too many responsibilities', ex: 'Hospitals are overburdened during the winter months.', level: 'C2' },
        { word: 'rampant', pos: 'adjective', fr: 'galopant, endémique', frAlt: ['galopant', 'endemique', 'incontrole'], def: 'spreading quickly in an uncontrolled way', ex: 'Obesity is rampant in many developed countries.', level: 'C2' },
        { word: 'eradicate', pos: 'verb', fr: 'éradiquer', frAlt: ['eradiquer'], def: 'to destroy something completely', ex: 'Vaccination programmes have eradicated smallpox.', level: 'C1' },
        { word: 'longevity', pos: 'noun', fr: 'longévité', frAlt: ['longevite'], def: 'long life', ex: 'Diet plays a key role in longevity.', level: 'C2' },
        { word: 'the root cause', pos: 'noun phrase', fr: 'la cause profonde', def: 'the basic reason for a problem', ex: 'Poverty is often the root cause of poor health.', level: 'C1', alt: ['root cause'] },
      ],
      cloze: [
        { s: 'Physical activity can ___ symptoms of anxiety.', a: 'alleviate', opts: ['elevate', 'alienate', 'aggravate'], why: '« alleviate » = soulager. « aggravate » = aggraver.', kind: 'vocab' },
        { s: 'Children are particularly ___ to infections.', a: 'susceptible', opts: ['sensible', 'suspicious', 'sustainable'], why: '« susceptible to » = vulnérable à.', kind: 'vocab' },
        { s: 'Rather than treating symptoms, we must address the ___ cause of obesity.', a: 'root', opts: ['route', 'roof', 'rooted'], why: '« the root cause » = la cause profonde.', kind: 'collocation' },
      ],
      judge: [
        { s: 'Hospitals are overburdened, especially in winter.', ok: true, why: 'Correct.' },
        { s: 'He is very susceptible: he gets angry when you criticise him.', ok: false, fix: 'He is very touchy: he gets angry when you criticise him.', why: 'Faux ami : susceptible (vexé) = touchy / oversensitive.' },
      ],
      sentences: [
        { en: 'Poverty is often the root cause of poor health.', fr: 'La pauvreté est souvent la cause profonde d’une mauvaise santé.' },
        { en: 'Exercise can alleviate the symptoms of depression.', fr: 'Le sport peut soulager les symptômes de la dépression.' },
      ],
    },
  ],
}

export default unit
