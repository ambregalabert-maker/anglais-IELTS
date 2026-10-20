import type { UnitContent } from './types'

// Thème IELTS : Globalisation.

const unit: UnitContent = {
  unitId: 'globalisation',
  lessons: [
    {
      title: 'A connected world (B2)',
      words: [
        { word: 'globalisation', pos: 'noun', fr: 'mondialisation', def: 'the process of countries becoming more connected through trade and culture', ex: 'Globalisation has lifted millions out of poverty.', level: 'B2', alt: ['globalization'] },
        { word: 'multinational', pos: 'adjective / noun', fr: 'multinationale', frAlt: ['multinationale', 'multinational'], def: 'a company operating in many countries', ex: 'Multinational companies dominate the market.', level: 'B2' },
        { word: 'trade', pos: 'noun / verb', fr: 'commerce, échanges', frAlt: ['commerce', 'echanges', 'commercer'], def: 'the buying and selling of goods between countries', ex: 'International trade has grown dramatically.', col: ['free trade', 'trade agreement'], level: 'B1' },
        { word: 'import', pos: 'verb / noun', fr: 'importer / importation', frAlt: ['importer', 'importation'], def: 'to bring goods into a country to sell', ex: 'The UK imports a lot of its food.', level: 'B1' },
        { word: 'export', pos: 'verb / noun', fr: 'exporter / exportation', frAlt: ['exporter', 'exportation'], def: 'to sell goods to another country', ex: 'China exports electronics all over the world.', level: 'B1' },
        { word: 'cultural identity', pos: 'noun', fr: 'identité culturelle', frAlt: ['identite culturelle'], def: 'the feeling of belonging to a culture', ex: 'Some fear globalisation threatens cultural identity.', level: 'B2' },
        { word: 'developing country', pos: 'noun', fr: 'pays en développement', frAlt: ['pays en developpement', 'pays en voie de developpement'], def: 'a poorer country that is building its economy', ex: 'Many developing countries depend on exports.', level: 'B2', alt: ['developing countries'] },
        { word: 'migration', pos: 'noun', fr: 'migration', def: 'the movement of people from one place to another', ex: 'Economic migration has increased in recent decades.', level: 'B2' },
        { word: 'interconnected', pos: 'adjective', fr: 'interconnecté', frAlt: ['interconnecte', 'interdependant'], def: 'closely linked with each other', ex: 'The world economy is deeply interconnected.', level: 'C1' },
      ],
      cloze: [
        { s: 'The two countries signed a free ___ agreement.', a: 'trade', opts: ['commerce', 'trading of', 'market'], why: '« a free trade agreement » = un accord de libre-échange.', kind: 'collocation' },
        { s: 'Globalisation has ___ millions of people out of poverty.', a: 'lifted', opts: ['risen', 'raised up', 'taken'], why: '« lift people out of poverty » = sortir des gens de la pauvreté.', kind: 'collocation' },
        { s: 'Many developing countries depend heavily ___ exports.', a: 'on', opts: ['of', 'from', 'to'], why: '« depend on ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'The UK imports much of its food from abroad.', ok: true, why: 'Correct.' },
        { s: 'The mondialisation has advantages and disadvantages.', ok: false, fix: 'Globalisation has advantages and disadvantages.', why: 'La mondialisation = « globalisation », et sens général : pas de « the ».' },
      ],
      sentences: [
        { en: 'Globalisation has lifted millions out of poverty.', fr: 'La mondialisation a sorti des millions de personnes de la pauvreté.' },
        { en: 'The world economy is deeply interconnected.', fr: 'L’économie mondiale est profondément interconnectée.' },
      ],
    },
    {
      title: 'Winners & losers (C1)',
      words: [
        { word: 'outsourcing', pos: 'noun', fr: 'externalisation, délocalisation', frAlt: ['externalisation', 'delocalisation', 'sous traitance'], def: 'moving work to another company or country to save money', ex: 'Outsourcing has cost many factory jobs in Europe.', level: 'C1' },
        { word: 'cheap labour', pos: 'noun', fr: 'main-d’œuvre bon marché', frAlt: ["main d'oeuvre bon marche", 'main d oeuvre bon marche'], def: 'workers who are paid very low wages', ex: 'Companies move production to countries with cheap labour.', level: 'C1', alt: ['cheap labor'] },
        { word: 'homogenisation', pos: 'noun', fr: 'uniformisation', def: 'the process of things becoming the same', ex: 'Critics warn of the cultural homogenisation of the world.', level: 'C2', alt: ['homogenization'] },
        { word: 'tariff', pos: 'noun', fr: 'droit de douane', frAlt: ['droits de douane', 'tarif douanier'], def: 'a tax on imported goods', ex: 'The government imposed tariffs on foreign steel.', col: ['impose tariffs on'], level: 'C1' },
        { word: 'inequality', pos: 'noun', fr: 'inégalité', frAlt: ['inegalite', 'inegalites'], def: 'an unfair difference between groups of people', ex: 'Globalisation may increase inequality within countries.', col: ['income inequality'], level: 'B2' },
        { word: 'brain drain', pos: 'noun', fr: 'fuite des cerveaux', def: 'skilled people leaving their country to work abroad', ex: 'Poorer countries suffer from a brain drain of doctors.', level: 'C1' },
        { word: 'free movement', pos: 'noun', fr: 'libre circulation', def: 'the right to travel and work in other countries', ex: 'The EU guarantees the free movement of people.', level: 'C1' },
        { word: 'protectionism', pos: 'noun', fr: 'protectionnisme', def: 'protecting a country’s industries by taxing imports', ex: 'Protectionism is rising again in many countries.', level: 'C1' },
        { word: 'interdependence', pos: 'noun', fr: 'interdépendance', frAlt: ['interdependance'], def: 'depending on each other', ex: 'Economic interdependence can promote peace.', level: 'C1' },
      ],
      cloze: [
        { s: 'Developing nations often suffer from a ___ drain of skilled workers.', a: 'brain', opts: ['mind', 'head', 'skull'], why: '« brain drain » = fuite des cerveaux.', kind: 'collocation' },
        { s: 'The US ___ tariffs on Chinese goods.', a: 'imposed', opts: ['put up of', 'opposed', 'composed'], why: '« impose tariffs on » = imposer des droits de douane sur.', kind: 'collocation' },
        { s: 'Many firms moved production abroad to take advantage ___ cheap labour.', a: 'of', opts: ['from', 'on', 'with'], why: '« take advantage of ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'Outsourcing has led to job losses in manufacturing.', ok: true, why: 'Correct.' },
        { s: 'Globalisation has increased the inequalities between rich and poor.', ok: false, fix: 'Globalisation has increased inequality between rich and poor.', why: 'Sens général : « inequality » (souvent indénombrable), sans « the ».' },
      ],
      sentences: [
        { en: 'Poorer countries suffer from a brain drain.', fr: 'Les pays pauvres souffrent d’une fuite des cerveaux.' },
        { en: 'Protectionism is rising again.', fr: 'Le protectionnisme revient en force.' },
      ],
    },
    {
      title: 'Essay language (C2)',
      words: [
        { word: 'erosion', pos: 'noun', fr: 'érosion, affaiblissement', frAlt: ['erosion', 'affaiblissement', 'disparition progressive'], def: 'the gradual destruction of something', ex: 'Some fear the erosion of local traditions.', col: ['the erosion of cultural identity'], level: 'C2' },
        { word: 'cosmopolitan', pos: 'adjective', fr: 'cosmopolite', def: 'containing people and ideas from many countries', ex: 'London is a truly cosmopolitan city.', level: 'C1' },
        { word: 'reap the benefits', pos: 'idiom', fr: 'récolter les fruits', frAlt: ['recolter les fruits', 'profiter des avantages'], def: 'to get the advantages of something', ex: 'Not everyone has reaped the benefits of globalisation.', level: 'C1' },
        { word: 'disenfranchised', pos: 'adjective', fr: 'laissé-pour-compte, privé de droits', frAlt: ['laisse pour compte', 'prive de droits', 'marginalise'], def: 'feeling powerless and excluded from society', ex: 'Workers in declining industries feel disenfranchised.', level: 'C2' },
        { word: 'exploit', pos: 'verb', fr: 'exploiter', def: 'to use people or resources unfairly for profit', ex: 'Some corporations exploit workers in poorer countries.', level: 'C1' },
        { word: 'a global village', pos: 'noun phrase', fr: 'un village planétaire', frAlt: ['village planetaire', 'un village global'], def: 'the world seen as one community connected by technology', ex: 'The internet has turned the world into a global village.', level: 'C1', alt: ['global village'] },
        { word: 'indigenous', pos: 'adjective', fr: 'autochtone, indigène', frAlt: ['autochtone', 'indigene'], def: 'originally from a particular place', ex: 'Indigenous languages are disappearing at an alarming rate.', level: 'C2' },
        { word: 'counterbalance', pos: 'verb', fr: 'contrebalancer', def: 'to have an equal and opposite effect', ex: 'Economic gains may counterbalance the cultural losses.', level: 'C2' },
        { word: 'trickle down', pos: 'phrasal verb', fr: 'ruisseler', frAlt: ['ruisseler', 'se repercuter'], def: 'to spread gradually from the rich to the poor', ex: 'The wealth created has not trickled down to ordinary workers.', level: 'C2', alt: ['trickled down'] },
      ],
      cloze: [
        { s: 'Not all countries have ___ the benefits of globalisation.', a: 'reaped', opts: ['ripped', 'rapped', 'reached'], why: '« reap the benefits » = récolter les fruits.', kind: 'collocation' },
        { s: 'Wealth does not always ___ down to the poorest members of society.', a: 'trickle', opts: ['tickle', 'trick', 'trigger'], why: '« trickle down » = ruisseler.', kind: 'vocab' },
        { s: 'Many ___ languages are at risk of extinction.', a: 'indigenous', opts: ['indigent', 'ingenious', 'indignant'], why: '« indigenous » = autochtone. « ingenious » = ingénieux.', kind: 'vocab' },
      ],
      judge: [
        { s: 'The internet has turned the world into a global village.', ok: true, why: 'Correct.' },
        { s: 'Globalisation has advantages, however it also has drawbacks.', ok: false, fix: 'Globalisation has advantages; however, it also has drawbacks.', why: '« however » ne relie pas deux propositions avec une virgule : point-virgule (ou point) avant, virgule après.' },
      ],
      sentences: [
        { en: 'Not everyone has reaped the benefits of globalisation.', fr: 'Tout le monde n’a pas profité des avantages de la mondialisation.' },
        { en: 'Indigenous languages are disappearing quickly.', fr: 'Les langues autochtones disparaissent rapidement.' },
      ],
    },
  ],
}

export default unit
