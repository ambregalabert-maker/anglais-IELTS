import type { UnitContent } from './types'

// Thème IELTS : Education. Leçon 1 = B2, leçon 2 = C1, leçon 3 = C2 / langue de l'essai.

const unit: UnitContent = {
  unitId: 'education',
  lessons: [
    {
      title: 'Schools & universities (B2)',
      words: [
        { word: 'curriculum', pos: 'noun', fr: 'programme scolaire', def: 'the subjects that are taught in a school or course', ex: 'Coding should be part of the national curriculum.', col: ['the national curriculum', 'broaden the curriculum'], level: 'B2', note: 'Pluriel : curricula (ou curriculums).' },
        { word: 'tuition fees', pos: 'noun', fr: 'frais de scolarité', frAlt: ['frais d’inscription', "frais d'inscription"], def: 'the money students pay to study at a university', ex: 'Many students take out loans to pay their tuition fees.', col: ['abolish tuition fees', 'high tuition fees'], level: 'B2' },
        { word: 'compulsory', pos: 'adjective', fr: 'obligatoire', def: 'required by law or by a rule', ex: 'Education is compulsory until the age of sixteen.', col: ['compulsory education', 'make something compulsory'], level: 'B2' },
        { word: 'higher education', pos: 'noun', fr: 'enseignement supérieur', frAlt: ['enseignement superieur', 'etudes superieures'], def: 'education at a university or college', ex: 'Access to higher education has expanded rapidly.', col: ['access to higher education', 'go into higher education'], level: 'B2' },
        { word: 'vocational', pos: 'adjective', fr: 'professionnel (formation)', frAlt: ['professionnel', 'professionnalisant'], def: 'teaching the skills needed for a particular job', ex: 'Vocational courses prepare students for skilled trades.', col: ['vocational training', 'vocational qualifications'], level: 'B2' },
        { word: 'assessment', pos: 'noun', fr: 'évaluation', frAlt: ['evaluation'], def: 'the process of judging a student’s work or ability', ex: 'Continuous assessment reduces exam stress.', col: ['continuous assessment', 'formal assessment'], level: 'B2' },
        { word: 'literacy', pos: 'noun', fr: 'alphabétisation, capacité à lire et écrire', frAlt: ['alphabetisation', 'maitrise de la lecture'], def: 'the ability to read and write', ex: 'Literacy rates have risen in most developing countries.', col: ['literacy rates', 'digital literacy'], level: 'B2' },
        { word: 'drop out', pos: 'phrasal verb', fr: 'abandonner (ses études)', frAlt: ['abandonner', 'decrocher', 'abandonner ses etudes'], def: 'to leave school or university before finishing', ex: 'Some students drop out because of financial problems.', col: ['drop out of school', 'a dropout (noun)'], level: 'B2' },
        { word: 'academic performance', pos: 'noun phrase', fr: 'résultats scolaires', frAlt: ['resultats scolaires', 'reussite scolaire'], def: 'how well a student does at school', ex: 'Lack of sleep can harm academic performance.', col: ['improve academic performance'], level: 'B2' },
      ],
      cloze: [
        { s: 'Many argue that university education should be free, and that governments should ___ tuition fees.', a: 'abolish', opts: ['cancel out', 'delete', 'remove off'], why: '« abolish » = supprimer (une loi, un système, des frais).', kind: 'collocation' },
        { s: 'Students are assessed throughout the year through ___ assessment.', a: 'continuous', opts: ['continual', 'constant', 'permanent'], why: 'La collocation figée est « continuous assessment » (contrôle continu).', kind: 'collocation' },
        { s: 'In many countries, education is ___ until the age of sixteen.', a: 'compulsory', opts: ['obliged', 'forced', 'compulsive'], why: '« compulsory » = obligatoire. « compulsive » = compulsif (un menteur compulsif).', kind: 'vocab' },
      ],
      judge: [
        { s: 'Many students drop out of university in their first year.', ok: true, why: 'Correct : « drop out of » + lieu.' },
        { s: 'Students must make an assessment at the end of the year.', ok: false, fix: 'Students must take an assessment at the end of the year.', why: 'Un élève « takes / sits » une évaluation. Le professeur « carries out / conducts » l’évaluation.' },
      ],
      sentences: [
        { en: 'Education is compulsory until the age of sixteen.', fr: 'L’école est obligatoire jusqu’à seize ans.' },
        { en: 'Many students cannot afford tuition fees.', fr: 'Beaucoup d’étudiants n’ont pas les moyens de payer les frais de scolarité.' },
      ],
    },
    {
      title: 'Learning & skills (C1)',
      words: [
        { word: 'rote learning', pos: 'noun', fr: 'apprentissage par cœur', frAlt: ['apprentissage par coeur', 'par coeur'], def: 'learning by repeating facts without understanding them', ex: 'Rote learning may help pass exams but not develop understanding.', level: 'C1' },
        { word: 'critical thinking', pos: 'noun', fr: 'esprit critique', def: 'the ability to analyse information and form your own judgement', ex: 'Schools should place more emphasis on critical thinking.', col: ['develop critical thinking skills'], level: 'C1' },
        { word: 'extracurricular', pos: 'adjective', fr: 'extrascolaire', def: 'done in addition to normal school lessons', ex: 'Extracurricular activities help students build confidence.', col: ['extracurricular activities'], level: 'C1' },
        { word: 'lifelong learning', pos: 'noun', fr: 'formation tout au long de la vie', frAlt: ['formation continue', 'apprentissage tout au long de la vie'], def: 'continuing to learn throughout your life', ex: 'In a changing economy, lifelong learning is essential.', level: 'C1' },
        { word: 'numeracy', pos: 'noun', fr: 'compétences en calcul', frAlt: ['competences en calcul', 'calcul', 'numeratie'], def: 'the ability to understand and work with numbers', ex: 'Primary schools focus on literacy and numeracy.', level: 'C1' },
        { word: 'attainment', pos: 'noun', fr: 'niveau atteint, réussite', frAlt: ['reussite', 'niveau atteint', 'resultats'], def: 'the level of success a student reaches', ex: 'There is a strong link between income and educational attainment.', col: ['educational attainment', 'the attainment gap'], level: 'C1' },
        { word: 'mixed-ability', pos: 'adjective', fr: 'hétérogène (classe)', frAlt: ['heterogene', 'de niveaux melanges'], def: 'containing students of different levels', ex: 'Teaching mixed-ability classes requires careful planning.', col: ['mixed-ability classes'], level: 'C1' },
        { word: 'distance learning', pos: 'noun', fr: 'enseignement à distance', frAlt: ['enseignement a distance', 'cours a distance'], def: 'studying from home, usually online', ex: 'Distance learning gives adults more flexibility.', level: 'C1' },
        { word: 'well-rounded', pos: 'adjective', fr: 'complet, équilibré (personne)', frAlt: ['complet', 'equilibre', 'polyvalent'], def: 'having a wide range of skills and experiences', ex: 'Universities look for well-rounded applicants.', col: ['a well-rounded education'], level: 'C1' },
      ],
      cloze: [
        { s: 'Schools should place greater ___ on critical thinking.', a: 'emphasis', opts: ['accent', 'insist', 'focusing'], why: '« place emphasis on » = mettre l’accent sur. (« accent » = accent de prononciation)', kind: 'collocation' },
        { s: 'Children from wealthier families tend to achieve higher educational ___.', a: 'attainment', opts: ['attendance', 'attention', 'attachment'], why: '« educational attainment » = niveau de réussite scolaire.', kind: 'vocab' },
        { s: 'Memorising facts without understanding them is known as ___ learning.', a: 'rote', opts: ['root', 'route', 'rot'], why: '« rote learning » = apprentissage par cœur. Attention aux homophones « root » et « route ».', kind: 'vocab' },
      ],
      judge: [
        { s: 'Extracurricular activities help children to develop social skills.', ok: true, why: 'Correct.' },
        { s: 'Universities should teach students to think critical.', ok: false, fix: 'Universities should teach students to think critically.', why: 'Après le verbe « think », il faut l’adverbe « critically ».' },
      ],
      sentences: [
        { en: 'Schools should encourage critical thinking.', fr: 'Les écoles devraient encourager l’esprit critique.' },
        { en: 'Lifelong learning is essential in a changing world.', fr: 'Se former tout au long de la vie est essentiel dans un monde qui change.' },
      ],
    },
    {
      title: 'Essay language (C2)',
      words: [
        { word: 'foster', pos: 'verb', fr: 'favoriser, encourager', frAlt: ['favoriser', 'encourager', 'developper'], def: 'to encourage something to develop', ex: 'Group projects foster cooperation between students.', col: ['foster creativity', 'foster a sense of community'], level: 'C1' },
        { word: 'stifle', pos: 'verb', fr: 'étouffer, brider', frAlt: ['etouffer', 'brider'], def: 'to prevent something from developing', ex: 'An overloaded timetable can stifle creativity.', col: ['stifle creativity', 'stifle innovation'], level: 'C2' },
        { word: 'holistic', pos: 'adjective', fr: 'global, holistique', frAlt: ['global', 'holistique'], def: 'dealing with the whole person or situation, not just parts', ex: 'A holistic approach to education values emotional as well as academic growth.', col: ['a holistic approach'], level: 'C2' },
        { word: 'equip', pos: 'verb', fr: 'doter, préparer', frAlt: ['doter', 'preparer', 'equiper'], def: 'to give someone the skills they need', ex: 'Schools must equip young people with digital skills.', col: ['equip somebody with skills'], level: 'C1' },
        { word: 'a level playing field', pos: 'idiom', fr: 'l’égalité des chances', frAlt: ["l'egalite des chances", 'egalite des chances', 'conditions equitables'], def: 'a situation in which everyone has the same chance', ex: 'Free tuition would create a level playing field for poorer students.', level: 'C2', alt: ['level playing field'], note: 'Expression idiomatique acceptée dans un essai.' },
        { word: 'inculcate', pos: 'verb', fr: 'inculquer', def: 'to fix ideas or values in someone’s mind by repetition', ex: 'Parents try to inculcate good values in their children.', col: ['inculcate values in somebody'], level: 'C2' },
        { word: 'cognitive', pos: 'adjective', fr: 'cognitif', def: 'connected with thinking and mental processes', ex: 'Learning a language has clear cognitive benefits.', col: ['cognitive development', 'cognitive skills'], level: 'C1' },
        { word: 'disparity', pos: 'noun', fr: 'disparité, inégalité', frAlt: ['disparite', 'inegalite', 'ecart'], def: 'a large and often unfair difference', ex: 'There is a wide disparity between rural and urban schools.', col: ['a wide disparity', 'regional disparities'], level: 'C2' },
        { word: 'underfunded', pos: 'adjective', fr: 'sous-financé', frAlt: ['sous finance'], def: 'not given enough money', ex: 'Many state schools remain chronically underfunded.', col: ['chronically underfunded'], level: 'C1' },
      ],
      cloze: [
        { s: 'Excessive testing may ___ creativity rather than encourage it.', a: 'stifle', opts: ['stiffen', 'stuff', 'stimulate'], why: '« stifle » = étouffer, brider. « stimulate » dirait le contraire.', kind: 'vocab' },
        { s: 'Schools have a duty to equip students ___ the skills they need for the workplace.', a: 'with', opts: ['of', 'by', 'for'], why: '« equip somebody with something ».', kind: 'grammar' },
        { s: 'There is a wide ___ between the resources of private and state schools.', a: 'disparity', opts: ['disparition', 'despair', 'dispersion'], why: '« disparity » = écart, inégalité. « disparition » n’existe pas en anglais (= disappearance).', kind: 'vocab' },
      ],
      judge: [
        { s: 'Free university education would create a level playing field.', ok: true, why: 'Correct et très naturel dans un essai.' },
        { s: 'Teachers should inculcate their students good manners.', ok: false, fix: 'Teachers should inculcate good manners in their students.', why: 'La construction est « inculcate something in somebody ».' },
      ],
      sentences: [
        { en: 'Group work fosters cooperation between students.', fr: 'Le travail de groupe favorise la coopération entre élèves.' },
        { en: 'Many state schools are chronically underfunded.', fr: 'Beaucoup d’écoles publiques sont chroniquement sous-financées.' },
      ],
    },
  ],
}

export default unit
