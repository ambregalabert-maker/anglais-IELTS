// Vocab Lab : familles de mots. Pour chaque famille, les formes existantes et des phrases à compléter.
// `a` doit être une des formes de la famille.

export interface WordFamily {
  root: string
  forms: string[] // toutes les formes (servent d'options)
  items: { s: string; a: string }[]
}

export const FAMILIES: WordFamily[] = [
  { root: 'decide', forms: ['decide', 'decision', 'decisive', 'decisively'], items: [
    { s: 'The committee will announce its ___ tomorrow.', a: 'decision' },
    { s: 'Strong leaders act ___ in a crisis.', a: 'decisively' },
    { s: 'This was a ___ moment in the country’s history.', a: 'decisive' },
  ] },
  { root: 'economy', forms: ['economy', 'economic', 'economical', 'economist', 'economically'], items: [
    { s: 'Tourism contributes to ___ growth.', a: 'economic' },
    { s: 'Small cars are more ___ to run.', a: 'economical' },
    { s: 'The project is not ___ viable.', a: 'economically' },
  ] },
  { root: 'benefit', forms: ['benefit', 'beneficial', 'beneficiary', 'beneficially'], items: [
    { s: 'Regular exercise is ___ for mental health.', a: 'beneficial' },
    { s: 'Students are the main ___ of the new scheme.', a: 'beneficiary' },
    { s: 'The ___ of free education are clear.', a: 'benefit' },
  ] },
  { root: 'society', forms: ['society', 'social', 'socially', 'sociable', 'socialise'], items: [
    { s: 'Unemployment can lead to ___ problems.', a: 'social' },
    { s: 'Children need time to ___ with others.', a: 'socialise' },
    { s: 'Some behaviours are no longer ___ acceptable.', a: 'socially' },
  ] },
  { root: 'responsible', forms: ['responsible', 'responsibility', 'responsibly', 'irresponsible'], items: [
    { s: 'Parents have a ___ to protect their children.', a: 'responsibility' },
    { s: 'Tourists should behave ___ in natural areas.', a: 'responsibly' },
    { s: 'It is ___ to drive after drinking.', a: 'irresponsible' },
  ] },
  { root: 'environment', forms: ['environment', 'environmental', 'environmentally', 'environmentalist'], items: [
    { s: 'Plastic causes serious ___ damage.', a: 'environmental' },
    { s: 'We need more ___ friendly transport.', a: 'environmentally' },
    { s: 'The ___ campaigned against the new airport.', a: 'environmentalist' },
  ] },
  { root: 'compete', forms: ['compete', 'competition', 'competitive', 'competitor', 'competitively'], items: [
    { s: 'Online shops ___ with traditional stores.', a: 'compete' },
    { s: 'The job market is extremely ___.', a: 'competitive' },
    { s: '___ between companies keeps prices low.', a: 'Competition' },
  ] },
  { root: 'develop', forms: ['develop', 'development', 'developing', 'developed', 'developer'], items: [
    { s: 'Sustainable ___ is a global priority.', a: 'development' },
    { s: 'Many ___ countries lack clean water.', a: 'developing' },
    { s: '___ nations should help poorer ones.', a: 'Developed' },
  ] },
  { root: 'success', forms: ['success', 'succeed', 'successful', 'successfully'], items: [
    { s: 'Hard work is the key to ___.', a: 'success' },
    { s: 'She ___ completed her degree.', a: 'successfully' },
    { s: 'Few start-ups ___ in their first year.', a: 'succeed' },
  ] },
  { root: 'rely', forms: ['rely', 'reliable', 'reliability', 'reliance', 'reliably'], items: [
    { s: 'Our growing ___ on technology is worrying.', a: 'reliance' },
    { s: 'Public transport must be cheap and ___.', a: 'reliable' },
    { s: 'The ___ of the data has been questioned.', a: 'reliability' },
  ] },
  { root: 'politics', forms: ['politics', 'political', 'politician', 'politically', 'policy'], items: [
    { s: 'The government introduced a new housing ___.', a: 'policy' },
    { s: 'Many young people are not interested in ___.', a: 'politics' },
    { s: 'The ___ promised to lower taxes.', a: 'politician' },
  ] },
  { root: 'effect', forms: ['effect', 'effective', 'effectively', 'effectiveness', 'affect'], items: [
    { s: 'Pollution can ___ children’s health.', a: 'affect' },
    { s: 'Advertising has a strong ___ on children.', a: 'effect' },
    { s: 'The ___ of the campaign is hard to measure.', a: 'effectiveness' },
  ] },
  { root: 'know', forms: ['know', 'knowledge', 'knowledgeable', 'known', 'unknown'], items: [
    { s: 'Reading broadens your general ___.', a: 'knowledge' },
    { s: 'The guide was very ___ about local history.', a: 'knowledgeable' },
    { s: 'The cause of the disease remains ___.', a: 'unknown' },
  ] },
  { root: 'able', forms: ['able', 'ability', 'enable', 'unable', 'disabled'], items: [
    { s: 'Technology can ___ disabled people to work from home.', a: 'enable' },
    { s: 'Many workers are ___ to afford housing.', a: 'unable' },
    { s: 'Reading ___ develops early in childhood.', a: 'ability' },
  ] },
  { root: 'pollute', forms: ['pollute', 'pollution', 'pollutant', 'polluted', 'polluter'], items: [
    { s: 'Carbon monoxide is a dangerous ___.', a: 'pollutant' },
    { s: 'The river is heavily ___.', a: 'polluted' },
    { s: 'The ___ should pay for the damage.', a: 'polluter' },
  ] },
  { root: 'educate', forms: ['educate', 'education', 'educational', 'educated', 'educator'], items: [
    { s: 'Museums can be highly ___.', a: 'educational' },
    { s: 'We must ___ young people about money.', a: 'educate' },
    { s: 'A well-___ workforce attracts investment.', a: 'educated' },
  ] },
  { root: 'employ', forms: ['employ', 'employment', 'employer', 'employee', 'unemployed', 'unemployment'], items: [
    { s: 'The factory will ___ 300 people.', a: 'employ' },
    { s: '___ rose sharply during the recession.', a: 'Unemployment' },
    { s: 'A good ___ invests in its staff.', a: 'employer' },
  ] },
  { root: 'significant', forms: ['significant', 'significance', 'significantly', 'insignificant', 'signify'], items: [
    { s: 'Prices have risen ___ since 2010.', a: 'significantly' },
    { s: 'The discovery is of great historical ___.', a: 'significance' },
    { s: 'The difference between the two groups was ___.', a: 'insignificant' },
  ] },
  { root: 'argue', forms: ['argue', 'argument', 'argumentative', 'arguably'], items: [
    { s: 'Some people ___ that zoos are cruel.', a: 'argue' },
    { s: 'This is ___ the most important issue of our time.', a: 'arguably' },
    { s: 'There is a strong ___ for free healthcare.', a: 'argument' },
  ] },
  { root: 'sustain', forms: ['sustain', 'sustainable', 'sustainability', 'unsustainable', 'sustainably'], items: [
    { s: 'Current levels of consumption are ___.', a: 'unsustainable' },
    { s: 'Companies are under pressure to improve ___.', a: 'sustainability' },
    { s: 'Fish should be caught ___.', a: 'sustainably' },
  ] },
  { root: 'access', forms: ['access', 'accessible', 'accessibility', 'inaccessible'], items: [
    { s: 'Everyone should have ___ to clean water.', a: 'access' },
    { s: 'Public buildings must be ___ to wheelchair users.', a: 'accessible' },
    { s: 'Many rural areas remain ___ in winter.', a: 'inaccessible' },
  ] },
  { root: 'create', forms: ['create', 'creation', 'creative', 'creativity', 'creator'], items: [
    { s: 'Schools should encourage ___.', a: 'creativity' },
    { s: 'The scheme led to the ___ of 5,000 jobs.', a: 'creation' },
    { s: 'Art lessons help children become more ___.', a: 'creative' },
  ] },
  { root: 'industry', forms: ['industry', 'industrial', 'industrialised', 'industrious', 'industrialisation'], items: [
    { s: 'The ___ revolution began in Britain.', a: 'industrial' },
    { s: '___ countries produce most emissions.', a: 'Industrialised' },
    { s: 'Rapid ___ transformed China’s economy.', a: 'industrialisation' },
  ] },
  { root: 'prevent', forms: ['prevent', 'prevention', 'preventive', 'preventable'], items: [
    { s: 'Most of these deaths are ___.', a: 'preventable' },
    { s: '___ is better than cure.', a: 'Prevention' },
    { s: 'Vaccines ___ the spread of disease.', a: 'prevent' },
  ] },
]
