import type { UnitContent } from './types'

// Thème IELTS : Cities & Urbanisation.

const unit: UnitContent = {
  unitId: 'cities',
  lessons: [
    {
      title: 'City life (B2)',
      words: [
        { word: 'traffic congestion', pos: 'noun', fr: 'embouteillages', frAlt: ['embouteillages', 'congestion du trafic', 'bouchons'], def: 'too many vehicles on the roads', ex: 'Traffic congestion costs the economy billions.', level: 'B2' },
        { word: 'public transport', pos: 'noun', fr: 'transports en commun', def: 'buses, trains and trams available to everyone', ex: 'Cities should invest more in public transport.', level: 'B1', note: 'Américain : public transportation.' },
        { word: 'suburbs', pos: 'noun', fr: 'banlieue (résidentielle)', frAlt: ['banlieue', 'peripherie'], def: 'residential areas on the edge of a city', ex: 'Many families move to the suburbs for more space.', level: 'B2', note: 'Pas forcément péjoratif, contrairement à « banlieue ».' },
        { word: 'affordable housing', pos: 'noun', fr: 'logements abordables', frAlt: ['logement abordable', 'logements a prix abordable'], def: 'homes that people on average incomes can pay for', ex: 'There is a severe shortage of affordable housing.', level: 'B2' },
        { word: 'pedestrian', pos: 'noun', fr: 'piéton', frAlt: ['pieton'], def: 'a person walking in the street', ex: 'The city centre has been made safe for pedestrians.', col: ['pedestrian zone', 'pedestrianise (verb)'], level: 'B2' },
        { word: 'cost of living', pos: 'noun', fr: 'coût de la vie', frAlt: ['cout de la vie'], def: 'the amount of money needed for basic needs', ex: 'The cost of living in London is extremely high.', level: 'B2' },
        { word: 'overcrowded', pos: 'adjective', fr: 'surpeuplé, bondé', frAlt: ['surpeuple', 'bonde'], def: 'containing too many people', ex: 'Trains are overcrowded during rush hour.', level: 'B2' },
        { word: 'rush hour', pos: 'noun', fr: 'heure de pointe', def: 'the busy time when people travel to and from work', ex: 'Avoid driving during rush hour.', level: 'B1' },
        { word: 'green space', pos: 'noun', fr: 'espace vert', def: 'an area of grass and trees in a town', ex: 'Green spaces improve the quality of urban life.', level: 'B2', alt: ['green spaces'] },
      ],
      cloze: [
        { s: 'There is a severe ___ of affordable housing in big cities.', a: 'shortage', opts: ['lack of', 'shortness', 'missing'], why: '« a shortage of » = une pénurie de.', kind: 'collocation' },
        { s: 'The roads are always jammed during ___ hour.', a: 'rush', opts: ['peak of', 'busy', 'point'], why: '« rush hour » = heure de pointe.', kind: 'vocab' },
        { s: 'Many young families move ___ the suburbs.', a: 'to', opts: ['in', 'at', 'into to'], why: '« move to the suburbs ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'Living in the city centre is more expensive than living in the suburbs.', ok: true, why: 'Correct.' },
        { s: 'There is too much cars in city centres.', ok: false, fix: 'There are too many cars in city centres.', why: '« cars » est dénombrable et pluriel : « there are too many ».' },
      ],
      sentences: [
        { en: 'The cost of living is very high in London.', fr: 'Le coût de la vie est très élevé à Londres.' },
        { en: 'Trains are overcrowded during rush hour.', fr: 'Les trains sont bondés aux heures de pointe.' },
      ],
    },
    {
      title: 'Urban planning (C1)',
      words: [
        { word: 'urbanisation', pos: 'noun', fr: 'urbanisation', def: 'the movement of people from the countryside to cities', ex: 'Rapid urbanisation creates serious housing problems.', level: 'C1', alt: ['urbanization'] },
        { word: 'infrastructure', pos: 'noun', fr: 'infrastructures', def: 'basic systems such as roads, water and electricity', ex: 'The city’s infrastructure cannot cope with its growth.', col: ['invest in infrastructure'], level: 'C1', note: 'Indénombrable en anglais.' },
        { word: 'urban sprawl', pos: 'noun', fr: 'étalement urbain', frAlt: ['etalement urbain'], def: 'the uncontrolled spread of a city into the countryside', ex: 'Urban sprawl destroys farmland and increases car use.', level: 'C1' },
        { word: 'high-rise', pos: 'adjective / noun', fr: 'tour, immeuble de grande hauteur', frAlt: ['tour', 'grand immeuble', 'immeuble de grande hauteur'], def: 'a very tall building with many floors', ex: 'High-rise buildings make better use of limited land.', level: 'C1' },
        { word: 'regeneration', pos: 'noun', fr: 'réhabilitation, rénovation urbaine', frAlt: ['rehabilitation', 'renovation urbaine', 'regeneration'], def: 'improving a run-down area', ex: 'The regeneration of the docks attracted new businesses.', col: ['urban regeneration'], level: 'C1' },
        { word: 'run-down', pos: 'adjective', fr: 'délabré', frAlt: ['delabre', 'decrepit'], def: 'in poor condition because nobody has looked after it', ex: 'The old town centre is quite run-down.', level: 'C1' },
        { word: 'amenities', pos: 'noun', fr: 'équipements, commodités', frAlt: ['equipements', 'commodites', 'services'], def: 'useful facilities such as shops, parks or libraries', ex: 'Rural areas often lack basic amenities.', col: ['local amenities'], level: 'C1' },
        { word: 'rural', pos: 'adjective', fr: 'rural', def: 'related to the countryside', ex: 'Young people are leaving rural areas.', col: ['rural areas', 'rural exodus'], level: 'B2' },
        { word: 'gentrification', pos: 'noun', fr: 'gentrification, embourgeoisement', frAlt: ['gentrification', 'embourgeoisement'], def: 'the process of a poor area becoming wealthier and more expensive', ex: 'Gentrification often forces long-term residents out.', level: 'C2' },
      ],
      cloze: [
        { s: 'Many villages lack basic ___ such as a doctor or a post office.', a: 'amenities', opts: ['amenagements', 'amusements', 'commodities'], why: '« amenities » = équipements et services de proximité.', kind: 'vocab' },
        { s: 'Uncontrolled urban ___ swallows up farmland.', a: 'sprawl', opts: ['spread out', 'spray', 'sprawling of'], why: '« urban sprawl » = étalement urbain.', kind: 'collocation' },
        { s: 'The government plans to invest heavily ___ infrastructure.', a: 'in', opts: ['on', 'into to', 'for'], why: '« invest in something ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'The city needs new infrastructures.', ok: false, fix: 'The city needs new infrastructure.', why: '« infrastructure » est généralement indénombrable en anglais.' },
        { s: 'Gentrification has pushed up rents in many neighbourhoods.', ok: true, why: 'Correct. « neighbourhood » : orthographe britannique.' },
      ],
      sentences: [
        { en: 'Rapid urbanisation creates housing problems.', fr: 'L’urbanisation rapide crée des problèmes de logement.' },
        { en: 'Rural areas often lack basic amenities.', fr: 'Les zones rurales manquent souvent de services de base.' },
      ],
    },
    {
      title: 'Essay language (C2)',
      words: [
        { word: 'densely populated', pos: 'adjective phrase', fr: 'densément peuplé', frAlt: ['densement peuple', 'tres peuple'], def: 'with a lot of people living in a small area', ex: 'Hong Kong is one of the most densely populated cities in the world.', level: 'C1' },
        { word: 'alleviate congestion', pos: 'verb phrase', fr: 'désengorger, réduire les embouteillages', frAlt: ['desengorger', 'reduire les embouteillages'], def: 'to reduce traffic jams', ex: 'A congestion charge could alleviate congestion in the city centre.', level: 'C2' },
        { word: 'pedestrianise', pos: 'verb', fr: 'rendre piéton', frAlt: ['rendre pieton', 'pietonniser'], def: 'to close a street to traffic so only people on foot can use it', ex: 'Several cities have chosen to pedestrianise their historic centres.', level: 'C2', alt: ['pedestrianize'] },
        { word: 'exodus', pos: 'noun', fr: 'exode', def: 'a situation in which many people leave a place at the same time', ex: 'The rural exodus has emptied many villages.', col: ['rural exodus', 'mass exodus'], level: 'C2' },
        { word: 'liveable', pos: 'adjective', fr: 'où il fait bon vivre', frAlt: ['ou il fait bon vivre', 'agreable a vivre', 'vivable'], def: 'pleasant to live in', ex: 'Vienna is often ranked the most liveable city in the world.', level: 'C1', alt: ['livable'] },
        { word: 'soaring property prices', pos: 'noun phrase', fr: 'flambée des prix de l’immobilier', frAlt: ["flambee des prix de l'immobilier", 'flambee de l immobilier'], def: 'house prices that are rising very fast', ex: 'Soaring property prices have priced young people out of the city.', level: 'C1' },
        { word: 'priced out', pos: 'phrasal verb', fr: 'exclu par les prix', frAlt: ['exclu par les prix', 'chasse par les prix'], def: 'unable to live somewhere because it has become too expensive', ex: 'Key workers are being priced out of central London.', level: 'C2' },
        { word: 'congestion charge', pos: 'noun', fr: 'péage urbain', frAlt: ['peage urbain'], def: 'a fee drivers pay to enter a city centre', ex: 'London introduced a congestion charge in 2003.', level: 'C1' },
        { word: 'strain', pos: 'noun', fr: 'pression, tension', frAlt: ['pression', 'tension', 'charge'], def: 'pressure caused by too much demand', ex: 'Population growth puts a strain on public services.', col: ['put a strain on'], level: 'C1' },
      ],
      cloze: [
        { s: 'Rapid population growth puts a ___ on public services.', a: 'strain', opts: ['strait', 'stress of', 'strength'], why: '« put a strain on » = mettre sous pression.', kind: 'collocation' },
        { s: 'Many young people are being priced ___ of the housing market.', a: 'out', opts: ['off', 'away', 'down'], why: '« be priced out (of) » = être exclu à cause des prix.', kind: 'collocation' },
        { s: 'Tokyo is one of the most ___ populated cities in the world.', a: 'densely', opts: ['dense', 'densly', 'heavily of'], why: 'Adverbe avant un participe : « densely populated ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'A congestion charge could alleviate congestion in the city centre.', ok: true, why: 'Correct.' },
        { s: 'Vienna is the most liveable city of the world.', ok: false, fix: 'Vienna is the most liveable city in the world.', why: 'Avec un superlatif et un lieu, on dit « in the world ».' },
      ],
      sentences: [
        { en: 'Population growth puts a strain on public services.', fr: 'La croissance démographique met les services publics sous pression.' },
        { en: 'Young people are priced out of the city.', fr: 'Les jeunes sont chassés de la ville par les prix.' },
      ],
    },
  ],
}

export default unit
