import type { UnitContent } from './types'

// Thème IELTS : Environment.

const unit: UnitContent = {
  unitId: 'environment',
  lessons: [
    {
      title: 'Our planet (B2)',
      words: [
        { word: 'climate change', pos: 'noun', fr: 'changement climatique', def: 'long-term changes in the Earth’s temperature and weather', ex: 'Climate change is the greatest challenge of our time.', col: ['tackle climate change', 'combat climate change'], level: 'B1' },
        { word: 'pollution', pos: 'noun', fr: 'pollution', def: 'damage to air, water or land caused by harmful substances', ex: 'Air pollution causes thousands of deaths every year.', col: ['air pollution', 'reduce pollution'], level: 'B1' },
        { word: 'greenhouse gas', pos: 'noun', fr: 'gaz à effet de serre', frAlt: ['gaz a effet de serre'], def: 'a gas that traps heat in the atmosphere', ex: 'Cars emit large amounts of greenhouse gas.', col: ['greenhouse gas emissions'], level: 'B2', alt: ['greenhouse gases'] },
        { word: 'recycle', pos: 'verb', fr: 'recycler', def: 'to process used materials so they can be used again', ex: 'Households should recycle glass and plastic.', level: 'B1' },
        { word: 'renewable energy', pos: 'noun', fr: 'énergie renouvelable', frAlt: ['energie renouvelable', 'energies renouvelables'], def: 'energy from sources that do not run out, like wind or sun', ex: 'Investment in renewable energy is increasing.', col: ['switch to renewable energy'], level: 'B2' },
        { word: 'endangered species', pos: 'noun', fr: 'espèce menacée', frAlt: ['espece menacee', 'especes menacees', "espece en voie de disparition"], def: 'animals or plants at risk of disappearing', ex: 'Tigers are an endangered species.', level: 'B2' },
        { word: 'waste', pos: 'noun', fr: 'déchets', frAlt: ['dechets', 'gaspillage'], def: 'things that are thrown away', ex: 'Plastic waste is polluting the oceans.', col: ['plastic waste', 'food waste', 'reduce waste'], level: 'B1' },
        { word: 'carbon footprint', pos: 'noun', fr: 'empreinte carbone', def: 'the amount of carbon dioxide a person or activity produces', ex: 'Flying less is the easiest way to reduce your carbon footprint.', col: ['reduce your carbon footprint'], level: 'B2' },
        { word: 'deforestation', pos: 'noun', fr: 'déforestation', frAlt: ['deforestation'], def: 'the cutting down of large areas of forest', ex: 'Deforestation destroys the habitat of many animals.', level: 'B2' },
      ],
      cloze: [
        { s: 'Governments must act now to ___ climate change.', a: 'tackle', opts: ['attack on', 'fight against of', 'deal'], why: '« tackle / combat climate change » = lutter contre le changement climatique.', kind: 'collocation' },
        { s: 'Eating less meat can help reduce your carbon ___.', a: 'footprint', opts: ['fingerprint', 'footstep', 'trace'], why: '« carbon footprint » = empreinte carbone.', kind: 'vocab' },
        { s: 'Many countries are switching ___ renewable energy.', a: 'to', opts: ['on', 'in', 'for'], why: '« switch to something » = passer à.', kind: 'grammar' },
      ],
      judge: [
        { s: 'The pollution is a big problem in big cities.', ok: false, fix: 'Pollution is a major problem in large cities.', why: 'Sens général : pas de « the ». Et « big » répété : préférez « major » et « large ».' },
        { s: 'Tigers are an endangered species.', ok: true, why: 'Correct : « species » est identique au singulier et au pluriel.' },
      ],
      sentences: [
        { en: 'Plastic waste is polluting the oceans.', fr: 'Les déchets plastiques polluent les océans.' },
        { en: 'We must reduce greenhouse gas emissions.', fr: 'Nous devons réduire les émissions de gaz à effet de serre.' },
      ],
    },
    {
      title: 'Problems & solutions (C1)',
      words: [
        { word: 'emissions', pos: 'noun', fr: 'émissions', frAlt: ['emissions', 'rejets'], def: 'gases sent into the air', ex: 'Industry is responsible for a large share of carbon emissions.', col: ['carbon emissions', 'cut emissions'], level: 'B2' },
        { word: 'fossil fuels', pos: 'noun', fr: 'combustibles fossiles', frAlt: ['energies fossiles'], def: 'fuels such as coal, oil and gas', ex: 'We must phase out fossil fuels.', col: ['phase out fossil fuels', 'dependence on fossil fuels'], level: 'B2' },
        { word: 'sustainable', pos: 'adjective', fr: 'durable', def: 'able to continue without damaging the environment', ex: 'Tourism must become more sustainable.', col: ['sustainable development', 'environmentally sustainable'], level: 'B2' },
        { word: 'biodiversity', pos: 'noun', fr: 'biodiversité', frAlt: ['biodiversite'], def: 'the variety of plants and animals in an area', ex: 'Intensive farming threatens biodiversity.', col: ['loss of biodiversity'], level: 'C1' },
        { word: 'habitat', pos: 'noun', fr: 'habitat (naturel)', frAlt: ['habitat', 'milieu naturel'], def: 'the natural home of an animal or plant', ex: 'Urban expansion destroys natural habitats.', col: ['habitat loss', 'natural habitat'], level: 'C1' },
        { word: 'conservation', pos: 'noun', fr: 'protection, préservation', frAlt: ['protection', 'preservation', 'conservation'], def: 'the protection of nature', ex: 'Conservation projects have saved several species.', col: ['wildlife conservation'], level: 'C1' },
        { word: 'drought', pos: 'noun', fr: 'sécheresse', frAlt: ['secheresse'], def: 'a long period without rain', ex: 'Severe drought has destroyed crops across the region.', col: ['severe drought'], level: 'C1', note: 'Prononciation : /draʊt/ (rime avec « out »).' },
        { word: 'carbon tax', pos: 'noun', fr: 'taxe carbone', def: 'a tax on fuels that produce carbon dioxide', ex: 'A carbon tax would encourage cleaner industries.', level: 'C1' },
        { word: 'single-use plastic', pos: 'noun', fr: 'plastique à usage unique', frAlt: ['plastique a usage unique'], def: 'plastic items used once and then thrown away', ex: 'Several countries have banned single-use plastic.', level: 'C1', alt: ['single-use plastics'] },
      ],
      cloze: [
        { s: 'Most experts agree that we need to ___ out fossil fuels by 2050.', a: 'phase', opts: ['face', 'pass', 'fade'], why: '« phase out » = supprimer progressivement.', kind: 'collocation' },
        { s: 'Developed countries must ___ their carbon emissions drastically.', a: 'cut', opts: ['cut off', 'decrease of', 'low'], why: '« cut emissions » = réduire les émissions.', kind: 'collocation' },
        { s: 'Urban sprawl leads to the loss ___ natural habitats.', a: 'of', opts: ['from', 'for', 'about'], why: '« the loss of something ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'Intensive farming poses a serious threat to biodiversity.', ok: true, why: 'Correct : « pose a threat to » est une excellente collocation.' },
        { s: 'We should develop more durable sources of energy.', ok: false, fix: 'We should develop more sustainable sources of energy.', why: 'Faux ami : « durable » en anglais = solide, résistant. Le développement durable = sustainable.' },
      ],
      sentences: [
        { en: 'We must phase out fossil fuels.', fr: 'Nous devons abandonner progressivement les énergies fossiles.' },
        { en: 'Intensive farming threatens biodiversity.', fr: 'L’agriculture intensive menace la biodiversité.' },
      ],
    },
    {
      title: 'Essay language (C2)',
      words: [
        { word: 'irreversible', pos: 'adjective', fr: 'irréversible', frAlt: ['irreversible'], def: 'impossible to change back', ex: 'Some damage to ecosystems may be irreversible.', level: 'C1' },
        { word: 'mitigate', pos: 'verb', fr: 'atténuer', frAlt: ['attenuer', 'limiter'], def: 'to make something bad less severe', ex: 'Planting trees can help mitigate the effects of climate change.', col: ['mitigate the effects of', 'mitigate risks'], level: 'C2' },
        { word: 'depletion', pos: 'noun', fr: 'épuisement (des ressources)', frAlt: ['epuisement', 'appauvrissement'], def: 'the reduction of something until little is left', ex: 'Overfishing has led to the depletion of fish stocks.', col: ['resource depletion', 'ozone depletion'], level: 'C2' },
        { word: 'pose a threat', pos: 'verb phrase', fr: 'représenter une menace', frAlt: ['representer une menace', 'constituer une menace'], def: 'to be a danger', ex: 'Rising sea levels pose a threat to coastal cities.', col: ['pose a serious threat to'], level: 'C1' },
        { word: 'curb', pos: 'verb', fr: 'freiner, limiter', frAlt: ['freiner', 'limiter', 'restreindre'], def: 'to control or limit something bad', ex: 'Strict laws are needed to curb pollution.', col: ['curb emissions', 'curb consumption'], level: 'C2' },
        { word: 'degradation', pos: 'noun', fr: 'dégradation', frAlt: ['degradation'], def: 'the process of something becoming worse', ex: 'Environmental degradation affects the poorest communities first.', col: ['environmental degradation'], level: 'C1' },
        { word: 'tipping point', pos: 'noun', fr: 'point de bascule, point de non-retour', frAlt: ['point de bascule', 'point de non retour'], def: 'the moment when a small change causes a large, irreversible effect', ex: 'Scientists warn we are approaching a climate tipping point.', level: 'C2' },
        { word: 'eco-friendly', pos: 'adjective', fr: 'écologique, respectueux de l’environnement', frAlt: ['ecologique', "respectueux de l'environnement"], def: 'not harmful to the environment', ex: 'Consumers increasingly choose eco-friendly products.', level: 'B2' },
        { word: 'incentivise', pos: 'verb', fr: 'inciter, encourager (par des avantages)', frAlt: ['inciter', 'encourager'], def: 'to encourage people to do something, often with rewards', ex: 'Governments should incentivise the use of public transport.', level: 'C2', alt: ['incentivize'], note: 'Orthographe britannique : -ise.' },
      ],
      cloze: [
        { s: 'Rising sea levels ___ a serious threat to coastal communities.', a: 'pose', opts: ['put', 'make', 'do'], why: 'La collocation est « pose a threat ».', kind: 'collocation' },
        { s: 'Planting trees can ___ the effects of global warming.', a: 'mitigate', opts: ['militate', 'migrate', 'imitate'], why: '« mitigate » = atténuer.', kind: 'vocab' },
        { s: 'Overfishing has caused the ___ of fish stocks.', a: 'depletion', opts: ['deletion', 'completion', 'repletion'], why: '« depletion » = épuisement.', kind: 'vocab' },
      ],
      judge: [
        { s: 'Strict regulations are needed to curb industrial pollution.', ok: true, why: 'Correct : « curb pollution » est une collocation de niveau C2.' },
        { s: 'Climate change makes a threat to humanity.', ok: false, fix: 'Climate change poses a threat to humanity.', why: 'On dit « pose a threat », pas « make a threat ».' },
      ],
      sentences: [
        { en: 'Rising sea levels pose a threat to coastal cities.', fr: 'La montée des eaux menace les villes côtières.' },
        { en: 'Some environmental damage may be irreversible.', fr: 'Certains dommages environnementaux sont peut-être irréversibles.' },
      ],
    },
  ],
}

export default unit
