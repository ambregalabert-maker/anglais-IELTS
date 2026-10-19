import type { UnitContent } from './types'

// Unité 1 : vocabulaire du cours « Growing Up & Everyday Life », complété par quelques mots B2.

const unit: UnitContent = {
  unitId: 'growing-up',
  lessons: [
    {
      title: 'Childhood & home',
      words: [
        { word: 'upbringing', pos: 'noun', fr: 'éducation (par les parents)', frAlt: ['education', 'educations'], def: 'the way a child is raised', ex: 'She had a very strict upbringing.', col: ['a strict upbringing', 'a supportive upbringing'], level: 'B2' },
        { word: 'childhood', pos: 'noun', fr: 'enfance', def: 'the time when you are a child', ex: 'I spent my childhood in the countryside.', col: ['during my childhood', 'a happy childhood'], level: 'B1' },
        { word: 'household', pos: 'noun', fr: 'foyer, ménage', frAlt: ['foyer', 'menage'], def: 'the people living together in one home', ex: 'She grew up in a low-income household.', col: ['a low-income household', 'household chores'], level: 'B2' },
        { word: 'supportive', pos: 'adjective', fr: 'qui soutient, encourageant', frAlt: ['encourageant', 'qui soutient', 'bienveillant'], def: 'giving help and encouragement', ex: 'I was lucky to have supportive parents.', col: ['supportive parents', 'a supportive environment'], level: 'B2' },
        { word: 'privileged', pos: 'adjective', fr: 'privilégié', def: 'having more advantages than most people', ex: 'He comes from a privileged background.', col: ['a privileged background', 'feel privileged'], level: 'B2' },
        { word: 'spoilt', pos: 'adjective', fr: 'gâté (enfant)', frAlt: ['gate'], def: 'given too much and not used to limits', ex: 'A spoilt child often finds it hard to accept rules.', col: ['a spoilt child'], level: 'B2', alt: ['spoiled'], note: '« spoilt » est britannique, « spoiled » américain.' },
        { word: 'strict', pos: 'adjective', fr: 'strict, sévère', frAlt: ['strict', 'severe'], def: 'demanding that rules are obeyed', ex: 'My father was quite strict about homework.', col: ['strict parents', 'strict rules'], level: 'B1' },
        { word: 'role model', pos: 'noun', fr: 'modèle (à suivre)', frAlt: ['modele', 'exemple'], def: 'a person you admire and try to copy', ex: 'Older siblings are often seen as a role model.', col: ['a positive role model', 'act as a role model'], level: 'B2' },
        { word: 'adolescence', pos: 'noun', fr: 'adolescence', def: 'the period between childhood and adulthood', ex: 'Adolescence can be a difficult time for many young people.', col: ['during adolescence'], level: 'B2' },
      ],
      cloze: [
        { s: 'She grew up in a ___ household, so money was always tight.', a: 'low-income', opts: ['small-income', 'poor-income', 'low-money'], why: 'On dit « a low-income household » (un foyer à faibles revenus).', kind: 'collocation' },
        { s: 'Footballers are often seen ___ role models for teenagers.', a: 'as', opts: ['like', 'for', 'to'], why: '« to be seen as » = être considéré comme.', kind: 'collocation' },
        { s: '___ my childhood, we moved house three times.', a: 'During', opts: ['While', 'Since', 'For'], why: '« During » + nom (during my childhood). « While » est suivi d’une proposition (while I was a child).', kind: 'grammar' },
        { s: 'My parents were very ___ when I decided to study abroad: they encouraged me.', a: 'supportive', opts: ['spoilt', 'privileged', 'strict'], why: '« supportive » = qui soutient et encourage.', kind: 'vocab' },
      ],
      judge: [
        { s: 'When I was child, I lived in a small town.', ok: false, fix: 'When I was a child, I lived in a small town.', why: 'Il faut l’article : « when I was a child ».' },
        { s: 'I grew up in a household of five persons.', ok: false, fix: 'I grew up in a household of five people.', why: 'Le pluriel courant de « person » est « people ». « Persons » est réservé aux textes juridiques.' },
        { s: 'My grandparents played a big part in my upbringing.', ok: true, why: 'Correct : « play a big part in » = jouer un grand rôle dans.' },
      ],
      sentences: [
        { en: 'My parents were strict but very supportive.', fr: 'Mes parents étaient stricts mais très encourageants.' },
        { en: 'I grew up in a small village.', fr: 'J’ai grandi dans un petit village.' },
        { en: 'My older sister was my role model.', fr: 'Ma grande sœur était mon modèle.' },
      ],
    },
    {
      title: 'Money matters',
      words: [
        { word: 'income', pos: 'noun', fr: 'revenu(s)', frAlt: ['revenu', 'revenus', 'salaire'], def: 'money a person or family receives', ex: 'Their income is too low to rent a flat in the city.', col: ['a high income', 'a low income', 'a source of income'], level: 'B1' },
        { word: 'afford', pos: 'verb', fr: 'avoir les moyens (de)', frAlt: ['se permettre', 'avoir les moyens'], def: 'to have enough money to pay for something', ex: 'Many young people cannot afford to buy a flat.', col: ['can afford to do', 'cannot afford something'], level: 'B1' },
        { word: 'budget', pos: 'noun / verb', fr: 'budget', def: 'a plan for how to spend money', ex: 'Students usually live on a tight budget.', col: ['a tight budget', 'stick to a budget'], level: 'B1' },
        { word: 'save up', pos: 'phrasal verb', fr: 'économiser, mettre de côté', frAlt: ['economiser', 'mettre de cote'], def: 'to keep money so that you can buy something later', ex: 'It took me two years to save up for a car.', col: ['save up for something'], level: 'B1' },
        { word: 'spend wisely', pos: 'phrase', fr: 'dépenser intelligemment', frAlt: ['depenser intelligemment', 'depenser avec sagesse'], def: 'to use money carefully', ex: 'My parents taught me to spend wisely.', level: 'B1' },
        { word: 'waste money', pos: 'phrase', fr: 'gaspiller de l’argent', frAlt: ["gaspiller de l'argent", "gaspiller l'argent"], def: 'to spend money on things you do not need', ex: 'Teenagers often waste money on things they do not need.', col: ['waste money on something'], level: 'B1' },
        { word: 'pocket money', pos: 'noun', fr: 'argent de poche', def: 'money that parents give regularly to a child', ex: 'I used to get pocket money every Saturday.', col: ['get pocket money', 'give pocket money'], level: 'B1' },
        { word: 'make ends meet', pos: 'idiom', fr: 'joindre les deux bouts', def: 'to have just enough money to pay for what you need', ex: 'Many families struggle to make ends meet.', col: ['struggle to make ends meet'], level: 'B2' },
        { word: 'financial pressure', pos: 'noun phrase', fr: 'pression financière', frAlt: ['pression financiere', 'difficultes financieres'], def: 'stress caused by money problems', ex: 'Many students experience financial pressure at university.', col: ['experience financial pressure', 'be under financial pressure'], level: 'B2' },
        { word: 'standard of living', pos: 'noun phrase', fr: 'niveau de vie', def: 'the level of comfort and material goods someone has', ex: 'The country has a high standard of living.', col: ['a high standard of living', 'improve the standard of living'], level: 'B2' },
      ],
      cloze: [
        { s: 'Students usually live on a ___ budget.', a: 'tight', opts: ['narrow', 'thin', 'short'], why: 'La collocation est « a tight budget » (un budget serré).', kind: 'collocation' },
        { s: 'I am saving ___ for a new laptop.', a: 'up', opts: ['on', 'off', 'in'], why: '« save up (for something) » = économiser pour quelque chose.', kind: 'collocation' },
        { s: 'Norway has a very ___ standard of living.', a: 'high', opts: ['big', 'tall', 'strong'], why: 'Un niveau de vie est « high » ou « low ».', kind: 'collocation' },
        { s: 'Young people spend a lot of money ___ clothes.', a: 'on', opts: ['in', 'for', 'at'], why: 'On dit « spend money on something ».', kind: 'grammar' },
        { s: 'We cannot afford ___ on holiday this year.', a: 'to go', opts: ['going', 'go', 'that we go'], why: '« afford » est suivi de « to + verbe » : afford to go.', kind: 'grammar' },
      ],
      judge: [
        { s: 'I can’t afford buying a new car.', ok: false, fix: 'I can’t afford to buy a new car.', why: '« afford » est suivi de « to + verbe ».' },
        { s: 'I passed two years saving up for my car.', ok: false, fix: 'I spent two years saving up for my car.', why: 'Piège de francophone : on « spend » du temps, on ne le « pass » pas.' },
        { s: 'Their family has a low income.', ok: true, why: 'Correct : « a low income » / « a high income ».' },
      ],
      sentences: [
        { en: 'We could not afford to go on holiday.', fr: 'Nous n’avions pas les moyens de partir en vacances.' },
        { en: 'I am saving up for a new phone.', fr: 'J’économise pour un nouveau téléphone.' },
        { en: 'Many families struggle to make ends meet.', fr: 'Beaucoup de familles ont du mal à joindre les deux bouts.' },
      ],
    },
    {
      title: 'Becoming independent',
      words: [
        { word: 'responsibility', pos: 'noun', fr: 'responsabilité', frAlt: ['responsabilite'], def: 'something you are expected to do or take care of', ex: 'You need to take responsibility for your own choices.', col: ['take responsibility for', 'a sense of responsibility'], level: 'B1', note: 'Attention à l’orthographe : responsibility (avec un « i »), pas « responsability ».' },
        { word: 'independent', pos: 'adjective', fr: 'indépendant', frAlt: ['independant', 'autonome'], def: 'able to manage without help', ex: 'Living alone helped me become more independent.', col: ['become more independent', 'financially independent'], level: 'B1' },
        { word: 'self-reliant', pos: 'adjective', fr: 'autonome, qui compte sur soi', frAlt: ['autonome'], def: 'able to depend on yourself', ex: 'Having a part-time job made her more self-reliant.', col: ['a self-reliant person'], level: 'B2' },
        { word: 'household chores', pos: 'noun phrase', fr: 'tâches ménagères', frAlt: ['taches menageres'], def: 'regular jobs at home, like cleaning and washing up', ex: 'I help my parents with the household chores.', col: ['do household chores', 'share household chores'], level: 'B1' },
        { word: 'mature', pos: 'adjective', fr: 'mûr (personne)', frAlt: ['mur', 'mature'], def: 'behaving in a sensible, adult way', ex: 'She is very mature for her age.', col: ['mature for your age', 'emotionally mature'], level: 'B2' },
        { word: 'discipline', pos: 'noun', fr: 'discipline', def: 'the ability to control your behaviour and follow rules', ex: 'Learning a musical instrument requires discipline.', col: ['self-discipline', 'require discipline'], level: 'B2' },
        { word: 'take for granted', pos: 'idiom', fr: 'considérer comme acquis', frAlt: ['considerer comme acquis', 'tenir pour acquis'], def: 'to not appreciate something because you always have it', ex: 'Many children take for granted the comfort their parents provide.', level: 'B2', note: 'Souvent sous la forme « take something for granted ».' },
        { word: 'peer pressure', pos: 'noun', fr: 'pression des pairs (des autres jeunes)', frAlt: ['pression des pairs', 'pression sociale'], def: 'the influence that people of your age have on your behaviour', ex: 'Teenagers often give in to peer pressure.', col: ['give in to peer pressure', 'resist peer pressure'], level: 'B2' },
        { word: 'live within your means', pos: 'idiom', fr: 'vivre selon ses moyens', def: 'to spend no more money than you earn', ex: 'If you live within your means, you never need to borrow money.', level: 'C1' },
      ],
      cloze: [
        { s: 'You should ___ responsibility for your mistakes.', a: 'take', opts: ['make', 'do', 'have'], why: 'La collocation est « take responsibility for ».', kind: 'collocation' },
        { s: 'Living abroad helped me ___ more independent.', a: 'become', opts: ['make', 'do', 'turn'], why: '« become more independent » = devenir plus indépendant.', kind: 'collocation' },
        { s: 'It is hard to resist peer ___ when you are fifteen.', a: 'pressure', opts: ['force', 'stress', 'weight'], why: 'On dit « peer pressure ».', kind: 'collocation' },
        { s: 'Most children are expected to do household ___.', a: 'chores', opts: ['works', 'homeworks', 'choirs'], why: '« household chores » = tâches ménagères. « Homework » est indénombrable : jamais de « s ».', kind: 'vocab' },
      ],
      judge: [
        { s: 'My parents gave me many advices about money.', ok: false, fix: 'My parents gave me a lot of advice about money.', why: '« advice » est indénombrable : pas de « s », pas de « many ».' },
        { s: 'Teenagers should take more responsabilities at home.', ok: false, fix: 'Teenagers should take on more responsibilities at home.', why: 'Orthographe : responsibility. Et on dit « take on responsibilities ».' },
        { s: 'Living alone, I learnt to be more independent.', ok: true, why: 'Correct. « learnt » est la forme britannique de « learned ».' },
      ],
      sentences: [
        { en: 'You must take responsibility for your actions.', fr: 'Tu dois assumer la responsabilité de tes actes.' },
        { en: 'Living alone made me more independent.', fr: 'Vivre seule m’a rendue plus indépendante.' },
        { en: 'I help my parents with the household chores.', fr: 'J’aide mes parents pour les tâches ménagères.' },
      ],
    },
    {
      title: 'Challenges & life skills',
      words: [
        { word: 'cope with', pos: 'verb phrase', fr: 'faire face à, gérer', frAlt: ['faire face a', 'gerer', 'supporter'], def: 'to manage a difficult situation', ex: 'Some students find it hard to cope with stress.', col: ['cope with stress', 'cope with pressure'], level: 'B2' },
        { word: 'deal with', pos: 'verb phrase', fr: 's’occuper de, gérer', frAlt: ["s'occuper de", 'gerer', 'traiter'], def: 'to take action to manage a situation', ex: 'You have to learn to deal with problems on your own.', col: ['deal with difficulties', 'deal with a problem'], level: 'B1' },
        { word: 'overcome', pos: 'verb', fr: 'surmonter', def: 'to successfully get past a problem', ex: 'She managed to overcome her fear of flying.', col: ['overcome challenges', 'overcome a fear'], level: 'B2', note: 'Verbe irrégulier : overcome, overcame, overcome.' },
        { word: 'challenge', pos: 'noun', fr: 'défi', frAlt: ['defi', 'difficulte'], def: 'a difficult situation or task', ex: 'Moving to a new country is a real challenge.', col: ['face a challenge', 'a major challenge'], level: 'B1' },
        { word: 'problem-solving skills', pos: 'noun phrase', fr: 'capacité à résoudre des problèmes', frAlt: ['capacite a resoudre des problemes', 'competences en resolution de problemes'], def: 'the ability to find solutions', ex: 'Part-time jobs help teenagers develop problem-solving skills.', col: ['develop problem-solving skills'], level: 'B2' },
        { word: 'life skills', pos: 'noun phrase', fr: 'compétences pratiques de la vie', frAlt: ['competences de vie', 'competences pratiques'], def: 'practical skills for everyday adult life', ex: 'Cooking and budgeting are essential life skills.', col: ['learn useful life skills', 'essential life skills'], level: 'B2' },
        { word: 'experience', pos: 'noun', fr: 'expérience (vécue)', frAlt: ['experience'], def: 'knowledge gained by doing or living through something', ex: 'Working in a café gave me useful experience.', col: ['gain experience', 'work experience'], level: 'B1', note: '« experience » = expérience vécue. Une expérience scientifique = « an experiment ».' },
        { word: 'resilient', pos: 'adjective', fr: 'résilient, qui rebondit', frAlt: ['resilient', 'qui rebondit'], def: 'able to recover quickly from difficulties', ex: 'Children are often more resilient than adults think.', col: ['emotionally resilient'], level: 'C1' },
        { word: 'setback', pos: 'noun', fr: 'revers, contretemps', frAlt: ['revers', 'contretemps', 'echec'], def: 'a problem that stops progress for a while', ex: 'Failing the exam was a setback, but she tried again.', col: ['suffer a setback', 'a minor setback'], level: 'C1' },
      ],
      cloze: [
        { s: 'She managed to ___ her fear of speaking in public.', a: 'overcome', opts: ['overpass', 'overtake', 'overgo'], why: '« overcome a fear » = surmonter une peur. « Overtake » = doubler (en voiture).', kind: 'vocab' },
        { s: 'It is important to ___ experience before applying for this job.', a: 'gain', opts: ['win', 'make', 'take'], why: 'On dit « gain experience » (acquérir de l’expérience).', kind: 'collocation' },
        { s: 'Group projects help students ___ problem-solving skills.', a: 'develop', opts: ['grow up', 'rise', 'raise'], why: 'On dit « develop skills ».', kind: 'collocation' },
        { s: 'Everyone has to ___ challenges in life.', a: 'face', opts: ['front', 'look', 'see'], why: '« face a challenge » = affronter un défi.', kind: 'collocation' },
        { s: 'How do you cope ___ stress before an exam?', a: 'with', opts: ['at', 'to', 'of'], why: '« cope with » : la préposition est toujours « with ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'She succeeded to overcome her fear.', ok: false, fix: 'She managed to overcome her fear. / She succeeded in overcoming her fear.', why: '« succeed in + -ing », ou « manage to + verbe ».' },
        { s: 'I made a very good experience abroad.', ok: false, fix: 'I had a very good experience abroad.', why: 'On « have » une expérience, on ne la « make » pas.' },
        { s: 'I had to face a lot of challenges during my first year.', ok: true, why: 'Correct : « face a challenge ».' },
      ],
      sentences: [
        { en: 'She managed to overcome her fears.', fr: 'Elle a réussi à surmonter ses peurs.' },
        { en: 'Every challenge is an opportunity to learn.', fr: 'Chaque défi est une occasion d’apprendre.' },
        { en: 'We all have to cope with stress.', fr: 'Nous devons tous gérer le stress.' },
      ],
    },
  ],
}

export default unit
