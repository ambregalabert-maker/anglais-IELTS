import type { UnitContent } from './types'

// Thème IELTS : Travel & Tourism.

const unit: UnitContent = {
  unitId: 'travel',
  lessons: [
    {
      title: 'Going places (B2)',
      words: [
        { word: 'destination', pos: 'noun', fr: 'destination', def: 'the place someone is travelling to', ex: 'Bali is a popular holiday destination.', col: ['a tourist destination'], level: 'B1' },
        { word: 'sightseeing', pos: 'noun', fr: 'tourisme, visite des sites', frAlt: ['tourisme', 'visite', 'visites touristiques'], def: 'visiting famous places as a tourist', ex: 'We spent the day sightseeing in Rome.', col: ['go sightseeing'], level: 'B1' },
        { word: 'accommodation', pos: 'noun', fr: 'hébergement', frAlt: ['hebergement', 'logement'], def: 'a place to stay', ex: 'The price includes flights and accommodation.', level: 'B2', note: 'cc + mm, et indénombrable en anglais britannique.' },
        { word: 'package holiday', pos: 'noun', fr: 'voyage organisé (tout compris)', frAlt: ['voyage organise', 'sejour tout compris', 'forfait'], def: 'a holiday where travel and hotel are sold together', ex: 'Package holidays are cheaper than booking separately.', level: 'B2' },
        { word: 'off the beaten track', pos: 'idiom', fr: 'hors des sentiers battus', def: 'far from places most tourists visit', ex: 'We stayed in a village off the beaten track.', level: 'C1', note: 'Plutôt à l’oral.' },
        { word: 'jet lag', pos: 'noun', fr: 'décalage horaire (fatigue)', frAlt: ['decalage horaire'], def: 'tiredness after flying across time zones', ex: 'I always suffer from jet lag after flying to Asia.', level: 'B2' },
        { word: 'landmark', pos: 'noun', fr: 'monument, site emblématique', frAlt: ['monument', 'site emblematique', 'point de repere'], def: 'a famous building or place', ex: 'Big Ben is London’s most famous landmark.', level: 'B2' },
        { word: 'itinerary', pos: 'noun', fr: 'itinéraire, programme de voyage', frAlt: ['itineraire', 'programme'], def: 'a detailed plan of a journey', ex: 'Our itinerary includes three cities.', level: 'C1' },
        { word: 'book', pos: 'verb', fr: 'réserver', frAlt: ['reserver'], def: 'to arrange a ticket or room in advance', ex: 'It is cheaper to book flights early.', col: ['book in advance', 'fully booked'], level: 'B1' },
      ],
      cloze: [
        { s: 'It is usually cheaper to book flights ___ advance.', a: 'in', opts: ['on', 'at', 'by'], why: '« in advance » = à l’avance.', kind: 'grammar' },
        { s: 'We decided to go ___ in the old town.', a: 'sightseeing', opts: ['sightseeings', 'sightsee', 'to sightseeing'], why: '« go sightseeing » (go + -ing).', kind: 'grammar' },
        { s: 'Sorry, the hotel is fully ___ this weekend.', a: 'booked', opts: ['reserved of', 'filled up of', 'occupied by'], why: '« fully booked » = complet.', kind: 'collocation' },
      ],
      judge: [
        { s: 'We are looking for an accommodation near the beach.', ok: false, fix: 'We are looking for accommodation near the beach.', why: '« accommodation » est indénombrable : pas de « an ».' },
        { s: 'Big Ben is one of the most famous landmarks in the world.', ok: true, why: 'Correct.' },
      ],
      sentences: [
        { en: 'The price includes flights and accommodation.', fr: 'Le prix comprend les vols et l’hébergement.' },
        { en: 'I always suffer from jet lag.', fr: 'Je souffre toujours du décalage horaire.' },
      ],
    },
    {
      title: 'The tourism industry (C1)',
      words: [
        { word: 'mass tourism', pos: 'noun', fr: 'tourisme de masse', def: 'tourism by very large numbers of people', ex: 'Mass tourism is damaging fragile ecosystems.', level: 'C1' },
        { word: 'overtourism', pos: 'noun', fr: 'surtourisme', def: 'too many tourists visiting a place', ex: 'Venice is struggling with overtourism.', level: 'C1' },
        { word: 'ecotourism', pos: 'noun', fr: 'écotourisme', frAlt: ['ecotourisme'], def: 'tourism that protects nature and local people', ex: 'Ecotourism can fund conservation projects.', level: 'C1' },
        { word: 'heritage site', pos: 'noun', fr: 'site du patrimoine', frAlt: ['site patrimonial', 'site classe'], def: 'a place of historical or cultural importance', ex: 'The temple is a UNESCO World Heritage Site.', level: 'C1' },
        { word: 'local economy', pos: 'noun', fr: 'économie locale', frAlt: ['economie locale'], def: 'the businesses and jobs in a particular area', ex: 'Tourism boosts the local economy.', level: 'B2' },
        { word: 'seasonal', pos: 'adjective', fr: 'saisonnier', def: 'only happening at certain times of the year', ex: 'Many tourism jobs are seasonal and low-paid.', col: ['seasonal work'], level: 'C1' },
        { word: 'influx', pos: 'noun', fr: 'afflux', def: 'a large number of people arriving at once', ex: 'The town cannot cope with the summer influx of visitors.', col: ['an influx of tourists'], level: 'C1' },
        { word: 'souvenir', pos: 'noun', fr: 'souvenir (objet)', frAlt: ['souvenir'], def: 'an object bought to remember a place', ex: 'Tourists buy souvenirs made in factories abroad.', level: 'B1', note: 'Un souvenir (mémoire) = a memory.' },
        { word: 'tourist trap', pos: 'noun', fr: 'piège à touristes', frAlt: ['piege a touristes'], def: 'a place that charges tourists too much', ex: 'The restaurant was a complete tourist trap.', level: 'B2' },
      ],
      cloze: [
        { s: 'Small coastal towns struggle to cope with the summer ___ of tourists.', a: 'influx', opts: ['influence', 'inflow of', 'reflux'], why: '« an influx of tourists » = un afflux de touristes.', kind: 'collocation' },
        { s: 'Tourism provides a major boost ___ the local economy.', a: 'to', opts: ['for of', 'at', 'on'], why: '« a boost to something ».', kind: 'grammar' },
        { s: 'Many jobs in tourism are ___ and poorly paid.', a: 'seasonal', opts: ['seasoned', 'seasonable', 'seasoning'], why: '« seasonal » = saisonnier. « seasoned » = expérimenté.', kind: 'vocab' },
      ],
      judge: [
        { s: 'I have very good souvenirs of my trip to Italy.', ok: false, fix: 'I have very good memories of my trip to Italy.', why: 'Faux ami : un souvenir (mémoire) = a memory. « souvenir » = un objet.' },
        { s: 'Venice is struggling with overtourism.', ok: true, why: 'Correct.' },
      ],
      sentences: [
        { en: 'Tourism boosts the local economy.', fr: 'Le tourisme dynamise l’économie locale.' },
        { en: 'Mass tourism damages fragile ecosystems.', fr: 'Le tourisme de masse abîme les écosystèmes fragiles.' },
      ],
    },
    {
      title: 'Essay language (C2)',
      words: [
        { word: 'broaden your horizons', pos: 'idiom', fr: 'élargir ses horizons', frAlt: ['elargir ses horizons', 'ouvrir son esprit'], def: 'to increase your experience and understanding', ex: 'Travelling abroad can broaden your horizons.', level: 'C1', alt: ['broaden their horizons', 'broaden one’s horizons'] },
        { word: 'commodification', pos: 'noun', fr: 'marchandisation', def: 'treating something as a product to be sold', ex: 'Critics condemn the commodification of local culture.', level: 'C2' },
        { word: 'authentic', pos: 'adjective', fr: 'authentique', def: 'real and not copied', ex: 'Travellers increasingly seek authentic experiences.', level: 'B2' },
        { word: 'detrimental impact', pos: 'noun phrase', fr: 'impact néfaste', frAlt: ['impact nefaste', 'effet negatif'], def: 'a harmful effect', ex: 'Cruise ships have a detrimental impact on coastal waters.', level: 'C1' },
        { word: 'revenue', pos: 'noun', fr: 'recettes, revenus', frAlt: ['recettes', 'revenus', 'chiffre d affaires'], def: 'money received, especially by a government or business', ex: 'Tourism generates significant tax revenue.', col: ['generate revenue', 'tax revenue'], level: 'C1' },
        { word: 'intercultural', pos: 'adjective', fr: 'interculturel', def: 'between different cultures', ex: 'Travel promotes intercultural understanding.', level: 'C1' },
        { word: 'unspoilt', pos: 'adjective', fr: 'préservé, intact', frAlt: ['preserve', 'intact', 'sauvage'], def: 'not changed or damaged by development', ex: 'The island has unspoilt beaches.', level: 'C1', alt: ['unspoiled'] },
        { word: 'ramifications', pos: 'noun', fr: 'répercussions', frAlt: ['repercussions', 'consequences'], def: 'the complicated results of an action', ex: 'Overtourism has serious social ramifications.', level: 'C2' },
        { word: 'impose a tourist tax', pos: 'verb phrase', fr: 'instaurer une taxe de séjour', frAlt: ['instaurer une taxe de sejour', 'imposer une taxe touristique'], def: 'to make visitors pay an extra charge', ex: 'Several cities now impose a tourist tax.', level: 'C1' },
      ],
      cloze: [
        { s: 'Living abroad is a great way to ___ your horizons.', a: 'broaden', opts: ['enlarge', 'widen up', 'expand out'], why: 'L’expression est « broaden your horizons ».', kind: 'collocation' },
        { s: 'Tourism ___ billions in tax revenue every year.', a: 'generates', opts: ['makes up', 'produces of', 'gains up'], why: '« generate revenue » = générer des recettes.', kind: 'collocation' },
        { s: 'The island is famous for its ___ beaches.', a: 'unspoilt', opts: ['unspoken', 'unsolved', 'unsold'], why: '« unspoilt » = préservé, intact.', kind: 'vocab' },
      ],
      judge: [
        { s: 'Travelling abroad broadens young people’s horizons.', ok: true, why: 'Correct.' },
        { s: 'Tourism brings many money to developing countries.', ok: false, fix: 'Tourism brings a lot of money to developing countries.', why: '« money » est indénombrable : « much / a lot of money ».' },
      ],
      sentences: [
        { en: 'Travel can broaden your horizons.', fr: 'Voyager peut élargir tes horizons.' },
        { en: 'Several cities now impose a tourist tax.', fr: 'Plusieurs villes instaurent désormais une taxe de séjour.' },
      ],
    },
  ],
}

export default unit
