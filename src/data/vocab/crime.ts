import type { UnitContent } from './types'

// Thème IELTS : Crime & Law.

const unit: UnitContent = {
  unitId: 'crime',
  lessons: [
    {
      title: 'Crime & punishment (B2)',
      words: [
        { word: 'commit a crime', pos: 'verb phrase', fr: 'commettre un crime / délit', frAlt: ['commettre un crime', 'commettre un delit'], def: 'to do something illegal', ex: 'Young people who commit a crime need support, not just punishment.', level: 'B2' },
        { word: 'offender', pos: 'noun', fr: 'délinquant, auteur d’une infraction', frAlt: ['delinquant', "auteur d'une infraction", 'contrevenant'], def: 'a person who has committed a crime', ex: 'Young offenders should be offered education in prison.', col: ['young offenders', 'repeat offenders'], level: 'C1' },
        { word: 'sentence', pos: 'noun / verb', fr: 'peine / condamner', frAlt: ['peine', 'condamner', 'condamnation'], def: 'the punishment given by a judge', ex: 'He received a five-year prison sentence.', col: ['a prison sentence', 'a life sentence'], level: 'B2' },
        { word: 'imprisonment', pos: 'noun', fr: 'emprisonnement', def: 'the state of being kept in prison', ex: 'Imprisonment does not always reduce crime.', level: 'C1' },
        { word: 'burglary', pos: 'noun', fr: 'cambriolage', def: 'entering a building illegally to steal', ex: 'Burglary rates have fallen thanks to better locks.', level: 'B2' },
        { word: 'fine', pos: 'noun / verb', fr: 'amende / mettre une amende', frAlt: ['amende', 'mettre une amende'], def: 'money paid as a punishment', ex: 'He had to pay a fine for speeding.', col: ['pay a fine', 'a heavy fine'], level: 'B1' },
        { word: 'witness', pos: 'noun', fr: 'témoin', frAlt: ['temoin'], def: 'a person who sees a crime happen', ex: 'The police are looking for witnesses.', level: 'B2' },
        { word: 'law-abiding', pos: 'adjective', fr: 'respectueux des lois', frAlt: ['respectueux de la loi', 'honnete'], def: 'obeying the law', ex: 'Most citizens are law-abiding.', level: 'C1' },
        { word: 'deter', pos: 'verb', fr: 'dissuader', def: 'to make someone decide not to do something', ex: 'Harsh punishments do not necessarily deter criminals.', col: ['deter crime'], level: 'C1' },
      ],
      cloze: [
        { s: 'Young people who ___ minor crimes should do community service.', a: 'commit', opts: ['make', 'do', 'perform'], why: 'La collocation est « commit a crime ».', kind: 'collocation' },
        { s: 'He was given a ten-year prison ___.', a: 'sentence', opts: ['phrase', 'penalty of', 'pain'], why: '« a prison sentence » = une peine de prison.', kind: 'vocab' },
        { s: 'Tougher penalties may ___ people from drink-driving.', a: 'deter', opts: ['detain', 'defer', 'detect'], why: '« deter somebody from doing » = dissuader quelqu’un de faire.', kind: 'vocab' },
      ],
      judge: [
        { s: 'He made a crime when he was young.', ok: false, fix: 'He committed a crime when he was young.', why: 'On « commit » un crime.' },
        { s: 'Most citizens are law-abiding.', ok: true, why: 'Correct.' },
      ],
      sentences: [
        { en: 'He had to pay a heavy fine.', fr: 'Il a dû payer une lourde amende.' },
        { en: 'Prison does not always deter criminals.', fr: 'La prison ne dissuade pas toujours les criminels.' },
      ],
    },
    {
      title: 'Justice & prevention (C1)',
      words: [
        { word: 'rehabilitation', pos: 'noun', fr: 'réinsertion', frAlt: ['reinsertion', 'rehabilitation'], def: 'helping criminals return to normal life', ex: 'Prisons should focus on rehabilitation rather than punishment.', level: 'C1' },
        { word: 'reoffend', pos: 'verb', fr: 'récidiver', frAlt: ['recidiver'], def: 'to commit another crime after being punished', ex: 'Many prisoners reoffend within a year of release.', col: ['reoffending rates'], level: 'C1' },
        { word: 'community service', pos: 'noun', fr: 'travaux d’intérêt général', frAlt: ["travaux d'interet general", 'tig'], def: 'unpaid work for the community instead of prison', ex: 'Minor offenders could do community service.', level: 'C1' },
        { word: 'juvenile delinquency', pos: 'noun', fr: 'délinquance juvénile', frAlt: ['delinquance juvenile'], def: 'crime committed by young people', ex: 'Poverty is linked to juvenile delinquency.', level: 'C1' },
        { word: 'death penalty', pos: 'noun', fr: 'peine de mort', def: 'punishment by death', ex: 'Most European countries have abolished the death penalty.', level: 'B2', alt: ['capital punishment'] },
        { word: 'surveillance cameras', pos: 'noun', fr: 'caméras de surveillance', frAlt: ['cameras de surveillance', 'videosurveillance'], def: 'cameras that record public places', ex: 'Surveillance cameras may reduce street crime.', level: 'B2', alt: ['CCTV'] },
        { word: 'law enforcement', pos: 'noun', fr: 'forces de l’ordre', frAlt: ["forces de l'ordre", 'police', 'application de la loi'], def: 'the police and others who make people obey the law', ex: 'Law enforcement agencies need more resources.', level: 'C1' },
        { word: 'petty crime', pos: 'noun', fr: 'petite délinquance', frAlt: ['petite delinquance', 'petits delits'], def: 'minor crimes such as small thefts', ex: 'Petty crime is common in tourist areas.', level: 'C1' },
        { word: 'root out', pos: 'phrasal verb', fr: 'éradiquer, débusquer', frAlt: ['eradiquer', 'debusquer', 'eliminer'], def: 'to find and get rid of something bad', ex: 'The new unit aims to root out corruption.', level: 'C2' },
      ],
      cloze: [
        { s: 'Education in prison reduces the likelihood that inmates will ___.', a: 'reoffend', opts: ['reoffence', 're-crime', 'redo'], why: '« reoffend » = récidiver.', kind: 'vocab' },
        { s: 'Prisons should focus ___ rehabilitation.', a: 'on', opts: ['in', 'at', 'to'], why: '« focus on something ».', kind: 'grammar' },
        { s: 'Many countries have ___ the death penalty.', a: 'abolished', opts: ['abandoned off', 'cancelled', 'deleted'], why: '« abolish the death penalty » = abolir la peine de mort.', kind: 'collocation' },
      ],
      judge: [
        { s: 'Rehabilitation programmes can lower reoffending rates.', ok: true, why: 'Correct. « programme » : orthographe britannique.' },
        { s: 'The criminality has increased in the city.', ok: false, fix: 'Crime has increased in the city.', why: 'En anglais, la criminalité = « crime » (indénombrable, sans « the »).' },
      ],
      sentences: [
        { en: 'Prisons should focus on rehabilitation.', fr: 'Les prisons devraient se concentrer sur la réinsertion.' },
        { en: 'Many prisoners reoffend after their release.', fr: 'Beaucoup de détenus récidivent après leur libération.' },
      ],
    },
    {
      title: 'Essay language (C2)',
      words: [
        { word: 'deterrent', pos: 'noun', fr: 'moyen de dissuasion', frAlt: ['moyen de dissuasion', 'dissuasion'], def: 'something that makes people decide not to act', ex: 'There is little evidence that the death penalty is an effective deterrent.', col: ['an effective deterrent', 'act as a deterrent'], level: 'C1' },
        { word: 'punitive', pos: 'adjective', fr: 'punitif, répressif', frAlt: ['punitif', 'repressif'], def: 'intended as punishment', ex: 'Purely punitive measures rarely solve the problem.', level: 'C2' },
        { word: 'lenient', pos: 'adjective', fr: 'clément, indulgent', frAlt: ['clement', 'indulgent'], def: 'not as strict as expected', ex: 'Some people believe judges are too lenient.', col: ['a lenient sentence'], level: 'C2' },
        { word: 'recidivism', pos: 'noun', fr: 'récidive', frAlt: ['recidive'], def: 'the tendency of criminals to commit crimes again', ex: 'Education programmes lower recidivism.', level: 'C2' },
        { word: 'tackle the underlying causes', pos: 'verb phrase', fr: 's’attaquer aux causes profondes', frAlt: ["s'attaquer aux causes profondes"], def: 'to deal with the real reasons behind a problem', ex: 'To reduce crime, governments must tackle the underlying causes, such as poverty.', level: 'C1' },
        { word: 'disproportionate', pos: 'adjective', fr: 'disproportionné', frAlt: ['disproportionne'], def: 'too large or too small compared with something else', ex: 'The sentence was disproportionate to the crime.', level: 'C2' },
        { word: 'impunity', pos: 'noun', fr: 'impunité', frAlt: ['impunite'], def: 'freedom from punishment', ex: 'Corrupt officials should not act with impunity.', col: ['with impunity'], level: 'C2' },
        { word: 'heinous', pos: 'adjective', fr: 'odieux, atroce', frAlt: ['odieux', 'atroce', 'abominable'], def: 'extremely evil', ex: 'He was convicted of a heinous crime.', level: 'C2' },
        { word: 'reintegrate', pos: 'verb', fr: 'réinsérer', frAlt: ['reinserer', 'reintegrer'], def: 'to help someone become part of society again', ex: 'Ex-prisoners need jobs to reintegrate into society.', col: ['reintegrate into society'], level: 'C1' },
      ],
      cloze: [
        { s: 'Critics argue that sentences for white-collar crime are too ___.', a: 'lenient', opts: ['leniency', 'lean', 'leaning'], why: '« lenient » = clément.', kind: 'vocab' },
        { s: 'Harsh sentences do not always act ___ a deterrent.', a: 'as', opts: ['like', 'for', 'to'], why: '« act as a deterrent » = avoir un effet dissuasif.', kind: 'collocation' },
        { s: 'Former prisoners often struggle to reintegrate ___ society.', a: 'into', opts: ['to', 'in', 'at'], why: '« reintegrate into society ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'Corrupt officials too often act with impunity.', ok: true, why: 'Correct.' },
        { s: 'Capital punishment is an efficient dissuasion.', ok: false, fix: 'Capital punishment is an effective deterrent.', why: '« dissuasion » est rare en anglais : on dit « a deterrent ». Et « effective » (qui marche) plutôt que « efficient » (qui ne gaspille pas).' },
      ],
      sentences: [
        { en: 'The sentence was disproportionate to the crime.', fr: 'La peine était disproportionnée par rapport au crime.' },
        { en: 'Ex-prisoners need jobs to reintegrate into society.', fr: 'Les anciens détenus ont besoin d’un emploi pour se réinsérer.' },
      ],
    },
  ],
}

export default unit
