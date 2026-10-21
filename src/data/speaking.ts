// Contenu du module Speaking (méthode, questions, cartes Part 2, modèles, prononciation).
// Tous les textes sont originaux.

export interface PronGroup {
  title: string
  tip: string
  pairs: string[]
}

/** Paires difficiles pour les francophones (exercice S7). */
export const PRONUNCIATION: PronGroup[] = [
  { title: 'Le « h » aspiré', tip: 'Souffle comme sur une vitre froide : le « h » s’entend.', pairs: ['hear / ear', 'hate / eight', 'hill / ill', 'heat / eat', 'hold / old', 'hair / air'] },
  { title: 'Le « th »', tip: 'Le bout de la langue entre les dents, puis souffle.', pairs: ['think / sink', 'three / free', 'they / day', 'thought / sort', 'clothes / close', 'breathe / breeze'] },
  { title: 'Voyelles longues et courtes', tip: 'Le son long dure deux fois plus longtemps et la bouche est plus tendue.', pairs: ['ship / sheep', 'full / fool', 'live / leave', 'bit / beat', 'pull / pool', 'fill / feel'] },
  { title: 'Accent tonique', tip: 'L’accent change de place selon le mot : la syllabe accentuée est plus longue et plus forte.', pairs: ['PHOtograph / phoTOgraphy / photoGRAphic', 'ECOnomy / ecoNOMic', 'deVELop / deVELopment', 'POlitics / poLItical', 'CONtrast (noun) / conTRAST (verb)'] },
  { title: 'La terminaison -ed', tip: 'Trois sons : /t/, /d/ ou /ɪd/. On ne dit « ède » qu’après t ou d.', pairs: ['worked / played / wanted', 'stopped / opened / needed', 'watched / lived / decided', 'laughed / cleaned / started'] },
]

// ---------- Format et critères ----------

export const SPEAKING_PARTS = [
  { part: 'Part 1', time: '4-5 min', format: 'Questions sur toi : travail, études, ville, loisirs', goal: '2-3 phrases : réponse + raison + exemple' },
  { part: 'Part 2', time: '3-4 min', format: 'Carte sujet, 1 min de préparation, parler 1-2 min', goal: 'Tenir les 2 minutes en couvrant tous les points' },
  { part: 'Part 3', time: '4-5 min', format: 'Discussion abstraite liée à la Part 2', goal: 'Opinion développée, comparaison, nuance' },
]

export const SPEAKING_CRITERIA = [
  { name: 'Fluency & Coherence', up: 'Parler sans longues pauses, relier les idées (because, so, actually, on top of that)', down: 'Hésitations longues, répétitions, idées sans lien' },
  { name: 'Lexical Resource', up: 'Mots précis, expressions idiomatiques naturelles, paraphraser un mot oublié', down: 'Vocabulaire de base répété (good, nice, thing)' },
  { name: 'Grammatical Range & Accuracy', up: 'Mélange de temps, conditionnels, relatives, peu d’erreurs', down: 'Phrases toutes simples, erreurs fréquentes de temps' },
  { name: 'Pronunciation', up: 'Accent tonique juste, intonation, mots clairs', down: 'Mots incompréhensibles, intonation plate' },
]

export const SPEAKING_METHOD = [
  { title: 'Part 1 : la formule A-R-E', text: 'Answer (réponse directe), Reason (pourquoi), Example (un détail). Pas de « yes » seul, pas de monologue.' },
  { title: 'Part 2 : 1 minute de préparation', text: 'Note 4-5 mots-clés (pas de phrases) : qui/quoi, quand, comment, pourquoi c’est important. Raconte au passé, finis sur un ressenti.' },
  { title: 'Part 3 : développer', text: 'Donne ton avis, explique-le, compare (passé / présent, jeunes / âgés, pays), nuance (« it depends on… »).' },
  { title: 'Gagner du temps naturellement', text: '« That’s an interesting question… », « Let me think about that for a second. »' },
  { title: 'Se corriger', text: 'Sans paniquer. Demander de répéter la question est autorisé.' },
  { title: 'Éviter les réponses apprises par cœur', text: 'Les examinateurs les repèrent et elles n’aident pas la note.' },
]

export const PART1_THEMES = 'études ou travail, ville natale, logement, loisirs, musique, lecture, sport, nourriture, météo, transports, téléphone, réseaux sociaux, amis, week-ends, vacances, shopping, fêtes'

export const PART1_TECHNIQUES = [
  'Réponds directement à la question dans la 1re phrase.',
  'Ajoute une raison ou un détail personnel (formule A-R-E).',
  'Varie les débuts : « Actually… », « To be honest… », « I’d say… », « It depends, really… ».',
  'Utilise le bon temps : « Did you… as a child? » = passé ; « Would you like to… » = conditionnel.',
  'Vise 15 à 25 secondes par réponse.',
]

export const WEAK_STRONG = {
  q: 'Do you like cooking?',
  weak: 'Yes, I like cooking. It’s nice.',
  strong: 'Yes, I really enjoy it, especially at weekends when I have more time. I’ve recently started making Indian curries, which are quite challenging because of all the spices, but it’s very satisfying when they turn out well.',
}

export const TIME_FILLERS = [
  'That’s a difficult question to answer.',
  'I’ve never really thought about it, but…',
  'Generally speaking…',
  'It depends on the person.',
  'To some extent…',
  'That’s an interesting question.',
  'Let me think about that for a second.',
]

// ---------- Part 1 ----------

export interface Prompt {
  id: string
  q: string // question de l'examinateur
  short?: string // S4 : la réponse trop courte à développer
  model?: string // réponse modèle
}

export const PART1_QUESTIONS: Prompt[] = [
  { id: 'p1-mornings', q: 'Do you prefer mornings or evenings?', model: 'I’d say I’m definitely a morning person. I feel much more focused before lunch, so I try to do my hardest tasks early. At weekends, I love going for a run before the streets get busy.' },
  { id: 'p1-music', q: 'What kind of music do you listen to?', model: 'Mostly indie and a bit of jazz, to be honest. I usually put something calm on when I’m studying, because lyrics distract me. But on the way to the gym, I need something much more energetic.' },
  { id: 'p1-hometown', q: 'Is your hometown a good place for young people?', model: 'In some ways, yes. There are plenty of cafés and a big park where people meet up. The downside is that there aren’t many jobs, so a lot of my friends have moved to bigger cities after university.' },
  { id: 'p1-transport', q: 'How often do you use public transport?', model: 'Almost every day, actually. I take the tram to university because parking in the city centre is a nightmare. It’s not always on time, but at least I can read on the way.' },
  { id: 'p1-sport', q: 'Did you enjoy sport at school?', model: 'Not really, if I’m honest. I was quite shy, and team sports made me nervous. It was only later, when I discovered swimming, that I started to enjoy exercising.' },
  { id: 'p1-study', q: 'Do you work or are you a student?', model: 'I’m a student at the moment. I’m in my second year of a degree in international business, which I chose because I’d love to work abroad one day.' },
  { id: 'p1-home', q: 'What do you like most about the place where you live?', model: 'I think it’s the light. My flat faces south, so it’s really bright, even in winter. It makes a huge difference to my mood, especially when I’m working from home.' },
  { id: 'p1-reading', q: 'Do you read books for pleasure?', model: 'Yes, although not as much as I’d like. I tend to read crime novels on holiday, because I can finish one in a couple of days. During term time, I’m usually too tired in the evenings.' },
  { id: 'p1-weather', q: 'What kind of weather do you like?', model: 'I love those crisp, sunny days in autumn when it’s cold but bright. Hot weather isn’t really my thing, because I can’t concentrate when it’s above thirty degrees.' },
  { id: 'p1-phone', q: 'How much time do you spend on your phone?', model: 'Probably too much, to be honest. My screen-time report says about four hours a day, mostly messaging and music. I’ve started leaving it in another room when I study, and it really helps.' },
  { id: 'p1-friends', q: 'Do you prefer spending time with one friend or with a group?', model: 'It depends, really. With one close friend, you can have a proper conversation. But for something like a birthday, I love being in a big group, because the atmosphere is more fun.' },
  { id: 'p1-weekends', q: 'What did you do last weekend?', model: 'Nothing very exciting, actually. On Saturday I caught up on some coursework, and on Sunday I went to my grandparents’ for lunch. My grandmother made her famous apple tart, so it was worth the trip.' },
  { id: 'p1-food', q: 'Is there any food you didn’t like as a child but enjoy now?', model: 'Definitely mushrooms. As a child I refused to eat them because of the texture. Now I cook them all the time, especially in risotto.' },
  { id: 'p1-shopping', q: 'Do you prefer shopping online or in shops?', model: 'For most things, online, because it saves a lot of time. But for clothes I still prefer going to a shop, since I like trying things on before I buy them.' },
  { id: 'p1-holidays', q: 'Would you like to travel more in the future?', model: 'Absolutely. I’d love to spend a few months in South America, partly to improve my Spanish. I’d probably travel by bus and train, so I could see more of each country.' },
  { id: 'p1-social', q: 'Do you use social media a lot?', model: 'Less than I used to. I deleted a couple of apps last year, because I realised I was scrolling without really enjoying it. Now I mainly use it to keep in touch with friends who live abroad.' },
]

// ---------- S4 : développer une réponse ----------

export const DEVELOP: Prompt[] = [
  { id: 'dv-hometown', q: 'Do you like your hometown?', short: 'Yes.', model: 'Yes, I do, mainly because it’s small enough to feel friendly. You can walk everywhere, and you always bump into someone you know. The only drawback is that it’s quite quiet in the evenings.' },
  { id: 'dv-books', q: 'Do you read books?', short: 'Not really.', model: 'Not as much as I’d like to, to be honest. During the week I’m usually too tired in the evenings, so I tend to watch series instead. But on holiday I always take a novel with me, and I can easily finish two or three.' },
  { id: 'dv-weekends', q: 'What do you do at weekends?', short: 'I see friends.', model: 'I usually meet up with friends, often for brunch on Saturday. In the afternoon we sometimes go to an exhibition or just walk by the river. Sundays are more relaxed: I mostly catch up on sleep and prepare for the week.' },
  { id: 'dv-abroad', q: 'Would you like to live abroad?', short: 'Maybe.', model: 'Maybe, at least for a few years. I think living in another country would push me out of my comfort zone and help me become fluent in English. Having said that, I’d miss my family, so I don’t think I’d stay forever.' },
  { id: 'dv-social', q: 'Do you use social media a lot?', short: 'Yes, every day.', model: 'Yes, every day, probably more than I should. I mainly use it to follow news and to stay in touch with friends who live in other cities. I’ve recently turned off notifications, though, because they were constantly interrupting my work.' },
  { id: 'dv-cook', q: 'Do you cook?', short: 'Sometimes.', model: 'Sometimes, mostly at weekends when I have more time. I’m not an expert, but I can make a decent curry and a few pasta dishes. Cooking for friends is my favourite part, because it turns a meal into an event.' },
  { id: 'dv-sport', q: 'Do you do any sport?', short: 'I run.', model: 'Yes, I go running two or three times a week. I started during my exams, because it helped me clear my head. Now I’m training for a ten-kilometre race next spring.' },
  { id: 'dv-music', q: 'Can you play a musical instrument?', short: 'No.', model: 'Unfortunately not. I had piano lessons as a child, but I gave up after a year because I hated practising. I really regret it now, so I might take it up again one day.' },
  { id: 'dv-morning', q: 'Are you a morning person?', short: 'No.', model: 'Not at all, I’m afraid. I find it really hard to get up before eight, and I need at least two coffees before I can think clearly. I’m much more productive late in the evening, when everything is quiet.' },
  { id: 'dv-city', q: 'Do you prefer the city or the countryside?', short: 'The city.', model: 'The city, without a doubt, at least at this stage of my life. There’s so much going on, from concerts to new restaurants. That said, I love escaping to the countryside for a weekend when I need to slow down.' },
]

// ---------- S5 : paraphraser un mot oublié ----------

export const PARAPHRASE_WORDS: { word: string; model: string }[] = [
  { word: 'a lawnmower', model: 'the machine you use to cut the grass in a garden' },
  { word: 'a landlord', model: 'the person you pay rent to' },
  { word: 'a traffic jam', model: 'when there are so many cars that nobody can move' },
  { word: 'a deadline', model: 'the date by which you must finish something' },
  { word: 'a commute', model: 'the journey you make every day to work or school' },
  { word: 'a receipt', model: 'the piece of paper the shop gives you to prove that you paid' },
  { word: 'a colleague', model: 'someone you work with, in the same company' },
  { word: 'a kettle', model: 'the thing you use in the kitchen to boil water for tea' },
  { word: 'a scholarship', model: 'money that a university gives you so that you can study without paying fees' },
  { word: 'to procrastinate', model: 'to keep putting off something you should be doing, usually because you don’t feel like it' },
]

// ---------- Part 2 et Part 3 ----------

export interface Part2Card {
  id: string
  theme: string
  title: string
  points: string[]
  explain: string
  part3: string[]
  model?: string[] // réponse modèle (paragraphes)
}

export const PART2_CARDS: Part2Card[] = [
  {
    id: 'skill',
    theme: 'Expérience',
    title: 'Describe a skill you learned that you are proud of.',
    points: ['what the skill is', 'when and how you learned it', 'how difficult it was'],
    explain: 'and explain why you are proud of it.',
    part3: [
      'Which skills do you think are most important for young people today?',
      'Should schools teach practical skills like cooking or repairing things?',
      'Is it easier to learn new skills now than in the past? Why?',
      'Do you think older people find it harder to learn new skills?',
    ],
    model: [
      'I’d like to talk about learning to swim, which might sound simple, but for me it was a real achievement.',
      'I only learned when I was twenty-two. As a child, I’d had a bad experience at a swimming pool, so I always avoided water, even on holiday. But a few years ago, my friends planned a trip to Greece, and I didn’t want to sit on the beach while everyone else was in the sea. So I signed up for adult lessons at my local pool, once a week for about six months.',
      'To be honest, it was much harder than I expected. The technique wasn’t the main problem; it was the fear. For the first few weeks, I couldn’t even put my face in the water without panicking. My instructor was incredibly patient, though. She broke everything down into tiny steps, and gradually I started to relax.',
      'The reason I’m proud of it is that I had to overcome something that had held me back for years. When I finally swam a full length of the pool without stopping, I felt amazing. And in Greece, I swam out to a small island with my friends, which I’d never have imagined possible. It taught me that it’s never too late to learn something new.',
    ],
  },
  {
    id: 'advice',
    theme: 'Personne',
    title: 'Describe a person who gave you good advice.',
    points: ['who this person is', 'when they gave you the advice', 'what the advice was'],
    explain: 'and explain why it was good advice.',
    part3: ['Why do young people often ignore advice?', 'Who gives better advice, friends or family?', 'Is it better to ask for advice online or in person?'],
  },
  {
    id: 'quiet',
    theme: 'Lieu',
    title: 'Describe a quiet place you like to visit.',
    points: ['where it is', 'how often you go there', 'what you do there'],
    explain: 'and explain why you like it.',
    part3: ['Why are cities becoming noisier?', 'Should governments create more green spaces?', 'Do people need more quiet time than in the past?'],
    model: [
      'The place I’d like to describe is a small botanical garden about ten minutes’ walk from my flat. It belongs to the university, but it’s open to the public, and surprisingly few people know about it.',
      'I go there maybe once or twice a week, usually in the late afternoon, when the light is soft and most visitors have left. In spring I tend to sit on a bench near the greenhouse and read, and in winter I just walk around the paths to clear my head after a long day of lectures.',
      'What I like most is the silence. Even though it’s right in the middle of the city, the walls and the trees block out almost all the traffic noise, so all you can hear is birds and the wind. It’s also beautifully kept: every plant has a little label with its Latin name, which I find oddly relaxing to read.',
      'I think I value it so much because my life is quite busy and noisy, with shared accommodation and a part-time job. Spending half an hour there helps me slow down and put things into perspective. So, for me, it’s not just a garden, it’s a kind of reset button.',
    ],
  },
  {
    id: 'useless',
    theme: 'Objet',
    title: 'Describe something you bought that was not useful.',
    points: ['what it was', 'when and where you bought it', 'why you bought it'],
    explain: 'and explain why it was not useful.',
    part3: ['Why do people buy things they don’t need?', 'How does advertising influence us?', 'Are people more careful with money than they used to be?'],
  },
  {
    id: 'celebration',
    theme: 'Événement',
    title: 'Describe a celebration you enjoyed.',
    points: ['what the celebration was', 'where and when it took place', 'who was there'],
    explain: 'and explain why you enjoyed it.',
    part3: ['Are traditional celebrations less important today?', 'Why do people spend so much on weddings?', 'How have celebrations changed in your country?'],
  },
  {
    id: 'wait',
    theme: 'Expérience',
    title: 'Describe a time you had to wait for something.',
    points: ['what you were waiting for', 'where you were', 'how long you waited'],
    explain: 'and explain how you felt while you were waiting.',
    part3: ['Are people less patient than in the past?', 'How has technology changed waiting?', 'In what situations is it important to be patient?'],
  },
  {
    id: 'app',
    theme: 'Média',
    title: 'Describe a website or app you use often.',
    points: ['what it is', 'how you found out about it', 'what you use it for'],
    explain: 'and explain why you use it so often.',
    part3: ['Will apps replace traditional services like banks?', 'Should children have smartphones?', 'What are the risks of relying too much on apps?'],
  },
  {
    id: 'goal',
    theme: 'Projet',
    title: 'Describe a goal you hope to achieve in the future.',
    points: ['what the goal is', 'when you decided on it', 'what you need to do to achieve it'],
    explain: 'and explain why this goal is important to you.',
    part3: ['Is it important to set goals?', 'Do schools put too much pressure on students?', 'Should parents help their children choose their goals?'],
  },
  {
    id: 'outdoor',
    theme: 'Nature',
    title: 'Describe an outdoor activity you tried for the first time.',
    points: ['what the activity was', 'where and when you did it', 'who you did it with'],
    explain: 'and explain how you felt about it.',
    part3: ['Why do some people prefer indoor activities?', 'Should schools organise more outdoor trips?', 'Are outdoor activities more popular than they used to be?'],
  },
]

export const PART2_STRUCTURE = [
  { title: 'Intro (10 s)', text: '« I’d like to talk about… »' },
  { title: 'Points 1-3 (80 s)', text: 'Suis l’ordre de la carte, avec des détails : lieu, personnes, sensations, dialogues.' },
  { title: 'Explication (30 s)', text: 'Le « explain why » : la partie la plus importante.' },
  { title: 'Si tu as fini trop tôt', text: 'Ajoute une comparaison (« Compared to… »), une conséquence (« Since then… ») ou un souhait (« I’d love to… »).' },
]

export const PART3_TYPES = [
  { type: 'Opinion', example: 'Do you think…?', formula: 'I’d argue that… mainly because… For example…' },
  { type: 'Comparaison', example: 'How is it different from the past?', formula: 'In the past… whereas nowadays… This is largely due to…' },
  { type: 'Prédiction', example: 'Will this change in the future?', formula: 'I suspect that… although it’s hard to say for sure…' },
  { type: 'Cause / effet', example: 'Why do people…?', formula: 'There are a couple of reasons. Firstly… Another factor is…' },
  { type: 'Solution', example: 'What can governments do?', formula: 'One possible solution would be to… That way…' },
  { type: 'Évaluation', example: 'Is this a good or bad thing?', formula: 'It has pros and cons. On the plus side… On the other hand…' },
]

export const PART3_MODEL = {
  q: 'Is it easier to learn new skills now than in the past?',
  a: 'In many ways, yes. The biggest change is the internet. Nowadays, you can learn almost anything, from playing the guitar to coding, through free online videos and courses, whereas in the past you usually had to find a teacher or pay for classes. That said, I’m not sure it’s easier in every sense. Because there’s so much information, people sometimes jump from one thing to another without really mastering anything. So I’d say access is easier, but staying focused is probably harder than before.',
}

export const SPEAKING_ROUTINE = [
  'Chaque jour, réponds à voix haute à 5 questions de Part 1 en t’enregistrant.',
  'Deux fois par semaine, une carte de Part 2 chronométrée (1 min + 2 min), puis réécoute avec la grille des 4 critères.',
  'Une fois par semaine, une discussion de Part 3 de 5 minutes avec un partenaire.',
  'Note les mots cherchés pendant l’enregistrement, puis apprends-les avec leurs collocations (dans tes flashcards).',
]

/** Pour la prononciation : chaque mot d'une paire, lu séparément (sans les majuscules d'accent tonique). */
export function pronWords(pair: string): string[] {
  return pair
    .replace(/\(.*?\)/g, '')
    .split('/')
    .map((w) => w.trim())
    .filter(Boolean)
}

/** Ce qui est prononcé pour une paire : les mots l'un après l'autre. */
export function pronSay(pair: string): string {
  return pronWords(pair)
    .map((w) => w.toLowerCase())
    .join(', ')
}

export const speakingTrackId = (kind: 'card' | 'part3', id: string) => `speak-${kind}-${id}`
