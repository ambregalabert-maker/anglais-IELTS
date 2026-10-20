import type { UnitContent } from './types'

// Thème IELTS : Family & Society.

const unit: UnitContent = {
  unitId: 'family',
  lessons: [
    {
      title: 'Families today (B2)',
      words: [
        { word: 'nuclear family', pos: 'noun', fr: 'famille nucléaire', frAlt: ['famille nucleaire'], def: 'parents and their children living together', ex: 'The nuclear family is becoming less common.', level: 'B2' },
        { word: 'extended family', pos: 'noun', fr: 'famille élargie', frAlt: ['famille elargie'], def: 'a family including grandparents, aunts, uncles and cousins', ex: 'In many cultures, the extended family lives together.', level: 'B2' },
        { word: 'single parent', pos: 'noun', fr: 'parent isolé', frAlt: ['parent seul', 'famille monoparentale', 'parent isole'], def: 'a parent bringing up a child alone', ex: 'Single parents often face financial difficulties.', col: ['single-parent families'], level: 'B2' },
        { word: 'bring up', pos: 'phrasal verb', fr: 'élever (un enfant)', frAlt: ['elever'], def: 'to care for a child until it is an adult', ex: 'She was brought up by her grandparents.', level: 'B1', alt: ['brought up'] },
        { word: 'generation gap', pos: 'noun', fr: 'fossé des générations', frAlt: ['fosse generationnel', 'fosse des generations'], def: 'differences in attitudes between young and old people', ex: 'Technology has widened the generation gap.', level: 'B2' },
        { word: 'elderly', pos: 'adjective', fr: 'âgé', frAlt: ['age', 'personnes agees', 'vieux'], def: 'old (polite word)', ex: 'More elderly people now live alone.', col: ['the elderly', 'elderly relatives'], level: 'B2' },
        { word: 'sibling', pos: 'noun', fr: 'frère ou sœur', frAlt: ['frere ou soeur', 'fratrie', 'frere', 'soeur'], def: 'a brother or sister', ex: 'I have two siblings.', level: 'B2' },
        { word: 'household chores', pos: 'noun', fr: 'tâches ménagères', frAlt: ['taches menageres'], def: 'regular jobs at home', ex: 'Couples increasingly share household chores.', level: 'B1' },
        { word: 'get on with', pos: 'phrasal verb', fr: 's’entendre avec', frAlt: ["s'entendre avec"], def: 'to have a good relationship with someone', ex: 'I get on with my parents very well.', level: 'B1' },
      ],
      cloze: [
        { s: 'She was brought ___ by her aunt in Scotland.', a: 'up', opts: ['out', 'on', 'in'], why: '« bring up a child » = élever un enfant.', kind: 'collocation' },
        { s: 'Do you get ___ well with your siblings?', a: 'on', opts: ['in', 'along of', 'at'], why: '« get on (well) with somebody ».', kind: 'collocation' },
        { s: 'Technology has ___ the generation gap.', a: 'widened', opts: ['largened', 'grown up', 'broadened up'], why: '« widen / narrow the gap ».', kind: 'collocation' },
      ],
      judge: [
        { s: 'I have two siblings: a brother and a sister.', ok: true, why: 'Correct.' },
        { s: 'My parents educated me to be polite.', ok: false, fix: 'My parents brought me up to be polite.', why: '« educate » = instruire (l’école). Élever un enfant = « bring up / raise ».' },
      ],
      sentences: [
        { en: 'She was brought up by her grandparents.', fr: 'Elle a été élevée par ses grands-parents.' },
        { en: 'Couples increasingly share household chores.', fr: 'Les couples partagent de plus en plus les tâches ménagères.' },
      ],
    },
    {
      title: 'Society & change (C1)',
      words: [
        { word: 'gender roles', pos: 'noun', fr: 'rôles de genre', frAlt: ['roles de genre', 'roles des sexes'], def: 'behaviour expected from men and women in a society', ex: 'Traditional gender roles are changing.', level: 'C1' },
        { word: 'breadwinner', pos: 'noun', fr: 'soutien de famille', def: 'the person who earns the money for the family', ex: 'In many families, both parents are breadwinners.', level: 'C1' },
        { word: 'childcare', pos: 'noun', fr: 'garde d’enfants', frAlt: ["garde d'enfants", 'creche'], def: 'looking after children while parents work', ex: 'The high cost of childcare keeps many mothers at home.', level: 'C1' },
        { word: 'birth rate', pos: 'noun', fr: 'taux de natalité', frAlt: ['taux de natalite', 'natalite'], def: 'the number of births in a year per 1,000 people', ex: 'The birth rate has fallen in most developed countries.', level: 'C1' },
        { word: 'parental leave', pos: 'noun', fr: 'congé parental', frAlt: ['conge parental'], def: 'time off work for parents of a new baby', ex: 'Fathers should be entitled to longer parental leave.', level: 'C1' },
        { word: 'peer pressure', pos: 'noun', fr: 'pression des pairs', frAlt: ['pression sociale'], def: 'influence from people of your own age', ex: 'Peer pressure can lead teenagers to take risks.', level: 'B2' },
        { word: 'role model', pos: 'noun', fr: 'modèle', frAlt: ['modele', 'exemple'], def: 'a person others admire and copy', ex: 'Parents are their children’s first role models.', level: 'B2' },
        { word: 'nursing home', pos: 'noun', fr: 'maison de retraite (EHPAD)', frAlt: ['maison de retraite', 'ehpad'], def: 'a place where elderly people are cared for', ex: 'Many elderly people move into nursing homes.', level: 'B2', alt: ['care home'] },
        { word: 'upbringing', pos: 'noun', fr: 'éducation (familiale)', frAlt: ['education'], def: 'the way a child is raised', ex: 'A stable upbringing shapes a child’s future.', level: 'B2' },
      ],
      cloze: [
        { s: 'In many couples today, both partners are ___.', a: 'breadwinners', opts: ['breadmakers', 'bread earners', 'winners of bread'], why: '« breadwinner » = soutien de famille.', kind: 'vocab' },
        { s: 'The birth ___ has fallen sharply in Japan.', a: 'rate', opts: ['level of', 'ratio of', 'number of'], why: '« the birth rate » = le taux de natalité.', kind: 'collocation' },
        { s: 'Fathers should be entitled ___ paid parental leave.', a: 'to', opts: ['for', 'of', 'at'], why: '« be entitled to something » = avoir droit à.', kind: 'grammar' },
      ],
      judge: [
        { s: 'Traditional gender roles are changing in most societies.', ok: true, why: 'Correct.' },
        { s: 'The old people should live with their children.', ok: false, fix: 'Elderly people should live with their children.', why: 'Sens général : pas de « the ». Et « elderly » est plus poli que « old ».' },
      ],
      sentences: [
        { en: 'The birth rate has fallen in most countries.', fr: 'Le taux de natalité a baissé dans la plupart des pays.' },
        { en: 'Childcare is very expensive.', fr: 'La garde d’enfants coûte très cher.' },
      ],
    },
    {
      title: 'Essay language (C2)',
      words: [
        { word: 'cohesion', pos: 'noun', fr: 'cohésion', frAlt: ['cohesion'], def: 'the state of people working or living well together', ex: 'Shared community events strengthen social cohesion.', col: ['social cohesion'], level: 'C2' },
        { word: 'filial', pos: 'adjective', fr: 'filial', def: 'relating to a son or daughter', ex: 'In some cultures, filial duty requires caring for elderly parents.', col: ['filial duty', 'filial piety'], level: 'C2' },
        { word: 'erode traditional values', pos: 'verb phrase', fr: 'éroder les valeurs traditionnelles', frAlt: ['eroder les valeurs traditionnelles', 'saper les valeurs traditionnelles'], def: 'to gradually weaken traditional beliefs', ex: 'Some argue that individualism erodes traditional values.', level: 'C2' },
        { word: 'individualism', pos: 'noun', fr: 'individualisme', def: 'the belief that individual needs matter most', ex: 'Western societies value individualism.', level: 'C1' },
        { word: 'intergenerational', pos: 'adjective', fr: 'intergénérationnel', frAlt: ['intergenerationnel'], def: 'involving different generations', ex: 'Intergenerational living benefits both young and old.', level: 'C2' },
        { word: 'dependant', pos: 'noun', fr: 'personne à charge', frAlt: ['personne a charge', 'a charge'], def: 'a person who depends on you for money', ex: 'Tax allowances are available for each dependant.', level: 'C2', alt: ['dependent'], note: 'Britannique : « dependant » (nom), « dependent » (adjectif).' },
        { word: 'nurturing', pos: 'adjective', fr: 'bienveillant, épanouissant', frAlt: ['bienveillant', 'epanouissant', 'protecteur'], def: 'caring and helping someone develop', ex: 'Children need a nurturing environment.', col: ['a nurturing environment'], level: 'C1' },
        { word: 'marginalised', pos: 'adjective', fr: 'marginalisé', frAlt: ['marginalise', 'exclu'], def: 'treated as unimportant and pushed to the edge of society', ex: 'Elderly people can become marginalised in a youth-oriented culture.', level: 'C2', alt: ['marginalized'] },
        { word: 'shoulder the burden', pos: 'idiom', fr: 'porter le fardeau, assumer la charge', frAlt: ['porter le fardeau', 'assumer la charge'], def: 'to accept a difficult responsibility', ex: 'Women still shoulder the burden of unpaid care.', level: 'C2' },
      ],
      cloze: [
        { s: 'Women still ___ the burden of caring for elderly relatives.', a: 'shoulder', opts: ['elbow', 'carry on', 'back up'], why: '« shoulder the burden » = porter le fardeau.', kind: 'collocation' },
        { s: 'Community events can strengthen social ___.', a: 'cohesion', opts: ['coherence of', 'adhesion', 'collision'], why: '« social cohesion » = cohésion sociale.', kind: 'collocation' },
        { s: 'Children thrive in a ___ environment.', a: 'nurturing', opts: ['nourishing of', 'natural', 'nursing'], why: '« a nurturing environment » = un environnement bienveillant.', kind: 'collocation' },
      ],
      judge: [
        { s: 'Intergenerational living benefits both young and old.', ok: true, why: 'Correct.' },
        { s: 'Old people are often marginalised in a society obsessed by youth.', ok: false, fix: 'Elderly people are often marginalised in a society obsessed with youth.', why: '« obsessed with » (pas « by »), et « elderly » est plus respectueux.' },
      ],
      sentences: [
        { en: 'Children need a nurturing environment.', fr: 'Les enfants ont besoin d’un environnement bienveillant.' },
        { en: 'Women still shoulder the burden of unpaid care.', fr: 'Les femmes portent encore le fardeau du soin non rémunéré.' },
      ],
    },
  ],
}

export default unit
