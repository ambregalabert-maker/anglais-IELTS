import type { UnitContent } from './types'

// Thème IELTS : Science & Research.

const unit: UnitContent = {
  unitId: 'science',
  lessons: [
    {
      title: 'Doing science (B2)',
      words: [
        { word: 'experiment', pos: 'noun', fr: 'expérience (scientifique)', frAlt: ['experience', 'experimentation'], def: 'a scientific test to discover something', ex: 'The students carried out an experiment.', col: ['carry out an experiment', 'conduct an experiment'], level: 'B1', note: 'Une expérience vécue = « an experience ».' },
        { word: 'hypothesis', pos: 'noun', fr: 'hypothèse', frAlt: ['hypothese'], def: 'an idea that can be tested', ex: 'The results support our hypothesis.', level: 'C1', note: 'Pluriel : hypotheses.' },
        { word: 'findings', pos: 'noun', fr: 'résultats, conclusions', frAlt: ['resultats', 'conclusions', 'decouvertes'], def: 'the results of research', ex: 'The findings were published in a leading journal.', level: 'C1' },
        { word: 'laboratory', pos: 'noun', fr: 'laboratoire', def: 'a room or building for scientific work', ex: 'The tests were done in a laboratory.', level: 'B1', alt: ['lab'] },
        { word: 'carry out', pos: 'phrasal verb', fr: 'mener, réaliser', frAlt: ['mener', 'realiser', 'effectuer'], def: 'to do a task or piece of research', ex: 'Scientists carry out tests on new drugs.', col: ['carry out research'], level: 'B2' },
        { word: 'evidence', pos: 'noun', fr: 'preuves', frAlt: ['preuve', 'preuves', 'elements'], def: 'facts that show something is true', ex: 'There is strong evidence that smoking causes cancer.', level: 'B2', note: 'Indénombrable.' },
        { word: 'discovery', pos: 'noun', fr: 'découverte', frAlt: ['decouverte'], def: 'finding something for the first time', ex: 'The discovery of penicillin saved millions of lives.', level: 'B1' },
        { word: 'funding', pos: 'noun', fr: 'financement', def: 'money given for a particular purpose', ex: 'Space research requires enormous funding.', col: ['government funding', 'research funding'], level: 'B2' },
        { word: 'animal testing', pos: 'noun', fr: 'expérimentation animale', frAlt: ['experimentation animale', 'tests sur les animaux'], def: 'using animals in scientific experiments', ex: 'Animal testing for cosmetics is banned in the EU.', level: 'B2' },
      ],
      cloze: [
        { s: 'Researchers ___ out a large study on sleep.', a: 'carried', opts: ['made', 'did', 'took'], why: '« carry out a study / research » = mener une étude.', kind: 'collocation' },
        { s: 'There is no scientific ___ that this treatment works.', a: 'evidence', opts: ['evidences', 'evident', 'proves'], why: '« evidence » est indénombrable.', kind: 'grammar' },
        { s: 'The government has cut ___ for scientific research.', a: 'funding', opts: ['funds of', 'founding', 'fondation'], why: '« funding » = financement. « founding » = fondation.', kind: 'vocab' },
      ],
      judge: [
        { s: 'Scientists made an experience to test the vaccine.', ok: false, fix: 'Scientists carried out an experiment to test the vaccine.', why: 'Faux ami : une expérience scientifique = « an experiment ». Et on « carry out / conduct » une expérience.' },
        { s: 'The findings were published in a scientific journal.', ok: true, why: 'Correct.' },
      ],
      sentences: [
        { en: 'The results support our hypothesis.', fr: 'Les résultats confirment notre hypothèse.' },
        { en: 'Space research requires enormous funding.', fr: 'La recherche spatiale exige des financements énormes.' },
      ],
    },
    {
      title: 'Science & society (C1)',
      words: [
        { word: 'genetic engineering', pos: 'noun', fr: 'génie génétique', frAlt: ['genie genetique', 'manipulation genetique'], def: 'changing the genes of living things', ex: 'Genetic engineering could eliminate some diseases.', level: 'C1' },
        { word: 'ethical', pos: 'adjective', fr: 'éthique', frAlt: ['ethique', 'moral'], def: 'connected with what is morally right', ex: 'Cloning raises serious ethical questions.', col: ['ethical concerns', 'ethical dilemma'], level: 'C1' },
        { word: 'peer review', pos: 'noun', fr: 'évaluation par les pairs', frAlt: ['evaluation par les pairs', 'relecture par les pairs'], def: 'checking of research by other experts before publication', ex: 'Peer review ensures the quality of research.', level: 'C2' },
        { word: 'space exploration', pos: 'noun', fr: 'exploration spatiale', def: 'the investigation of space by spacecraft', ex: 'Some argue space exploration is a waste of money.', level: 'B2' },
        { word: 'empirical', pos: 'adjective', fr: 'empirique', def: 'based on observation and experience, not theory', ex: 'The theory lacks empirical evidence.', col: ['empirical evidence', 'empirical data'], level: 'C2' },
        { word: 'clinical trial', pos: 'noun', fr: 'essai clinique', def: 'a test of a new medicine on people', ex: 'The drug is still in clinical trials.', level: 'C1', alt: ['clinical trials'] },
        { word: 'advancement', pos: 'noun', fr: 'progrès, avancée', frAlt: ['progres', 'avancee'], def: 'progress or development', ex: 'Scientific advancement has transformed medicine.', level: 'C1' },
        { word: 'GM crops', pos: 'noun', fr: 'cultures OGM', frAlt: ['cultures ogm', 'ogm'], def: 'genetically modified plants grown for food', ex: 'GM crops could help feed a growing population.', level: 'C1' },
        { word: 'pioneering', pos: 'adjective', fr: 'pionnier, novateur', frAlt: ['pionnier', 'novateur', 'avant-gardiste'], def: 'introducing new ideas for the first time', ex: 'Marie Curie did pioneering work on radioactivity.', level: 'C1' },
      ],
      cloze: [
        { s: 'Human cloning raises serious ___ concerns.', a: 'ethical', opts: ['ethnical', 'etiquette', 'ethic'], why: '« ethical concerns » = préoccupations éthiques. « ethnic » = ethnique.', kind: 'vocab' },
        { s: 'The new vaccine is currently undergoing clinical ___.', a: 'trials', opts: ['trails', 'tries', 'tests of'], why: '« clinical trials » = essais cliniques. « trails » = sentiers.', kind: 'vocab' },
        { s: 'This claim is not supported by ___ evidence.', a: 'empirical', opts: ['imperial', 'empiric of', 'emperor'], why: '« empirical evidence » = preuves empiriques.', kind: 'collocation' },
      ],
      judge: [
        { s: 'Marie Curie did pioneering work on radioactivity.', ok: true, why: 'Correct.' },
        { s: 'Spending money for space exploration is a waste.', ok: false, fix: 'Spending money on space exploration is a waste.', why: '« spend money on something ».' },
      ],
      sentences: [
        { en: 'Cloning raises serious ethical questions.', fr: 'Le clonage soulève de graves questions éthiques.' },
        { en: 'The drug is still in clinical trials.', fr: 'Le médicament est encore en essais cliniques.' },
      ],
    },
    {
      title: 'Essay language (C2)',
      words: [
        { word: 'groundbreaking', pos: 'adjective', fr: 'révolutionnaire, novateur', frAlt: ['revolutionnaire', 'novateur', 'inedit'], def: 'very new and important', ex: 'The team published groundbreaking research on Alzheimer’s.', level: 'C1' },
        { word: 'tamper with', pos: 'phrasal verb', fr: 'trafiquer, toucher à', frAlt: ['trafiquer', 'toucher a', 'alterer'], def: 'to interfere with something in a harmful way', ex: 'Some believe we should not tamper with nature.', level: 'C2' },
        { word: 'contentious', pos: 'adjective', fr: 'controversé', frAlt: ['controverse', 'polemique', 'litigieux'], def: 'causing disagreement', ex: 'Animal testing remains a contentious issue.', col: ['a contentious issue'], level: 'C2' },
        { word: 'yield', pos: 'verb', fr: 'produire, donner (des résultats)', frAlt: ['produire', 'donner', 'rapporter'], def: 'to produce results or a crop', ex: 'The experiment yielded unexpected results.', col: ['yield results'], level: 'C2' },
        { word: 'far-reaching', pos: 'adjective', fr: 'de grande portée', frAlt: ['de grande portee', 'considerable', 'profond'], def: 'having a great influence on many things', ex: 'The discovery had far-reaching consequences.', col: ['far-reaching consequences', 'far-reaching implications'], level: 'C1' },
        { word: 'conclusive', pos: 'adjective', fr: 'concluant, probant', frAlt: ['concluant', 'probant', 'decisif'], def: 'proving something without doubt', ex: 'There is no conclusive proof that the drug is safe.', level: 'C1' },
        { word: 'feasible', pos: 'adjective', fr: 'faisable, réalisable', frAlt: ['faisable', 'realisable'], def: 'possible and practical to do', ex: 'Colonising Mars may one day be feasible.', level: 'C1' },
        { word: 'curiosity-driven', pos: 'adjective', fr: 'motivé par la curiosité (recherche fondamentale)', frAlt: ['motive par la curiosite', 'fondamental'], def: 'done to understand, not for practical use', ex: 'Curiosity-driven research often leads to unexpected applications.', level: 'C2' },
        { word: 'outweigh', pos: 'verb', fr: 'l’emporter sur', frAlt: ["l'emporter sur", 'compenser'], def: 'to be greater or more important than', ex: 'The benefits of vaccines far outweigh the risks.', col: ['far outweigh'], level: 'C1' },
      ],
      cloze: [
        { s: 'In my view, the benefits of research far ___ the costs.', a: 'outweigh', opts: ['overweight', 'outnumber', 'overcome'], why: '« outweigh » = l’emporter sur. Indispensable dans un essai.', kind: 'vocab' },
        { s: 'The experiment ___ surprising results.', a: 'yielded', opts: ['yelled', 'fielded', 'wielded'], why: '« yield results » = donner des résultats.', kind: 'collocation' },
        { s: 'Animal testing remains a highly ___ issue.', a: 'contentious', opts: ['contented', 'conscientious', 'continuous'], why: '« contentious » = controversé.', kind: 'vocab' },
      ],
      judge: [
        { s: 'The discovery had far-reaching consequences.', ok: true, why: 'Correct.' },
        { s: 'In my opinion, the advantages outweigh on the disadvantages.', ok: false, fix: 'In my opinion, the advantages outweigh the disadvantages.', why: '« outweigh » est directement suivi de son complément, sans préposition.' },
      ],
      sentences: [
        { en: 'The benefits far outweigh the risks.', fr: 'Les avantages l’emportent largement sur les risques.' },
        { en: 'Animal testing remains a contentious issue.', fr: 'L’expérimentation animale reste un sujet controversé.' },
      ],
    },
  ],
}

export default unit
