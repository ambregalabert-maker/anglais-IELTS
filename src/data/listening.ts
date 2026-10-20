// Module Listening : stratégies d'anticipation (pas de faux audios).
// Les formats de questions reprennent ceux du « Listening Practice Test C » des cours.

export const REAL_AUDIO_URL = 'https://computerielts.com/ielts-listening-practice-test/'

// ---------- Prédire le type de réponse ----------
export const ANSWER_TYPES = ['a number', 'a date', 'a time', 'a price', 'a name or place (proper noun)', 'a plural noun', 'a singular noun', 'an adjective', 'a verb'] as const
export type AnswerType = (typeof ANSWER_TYPES)[number]

export interface PredictItem {
  format: string // type de question IELTS
  context: string // titre des notes / du tableau
  gap: string // ligne avec ___
  answer: AnswerType
  why: string
}

export const PREDICT: PredictItem[] = [
  { format: 'Note completion', context: 'NOTES ON SOCIAL PROGRAMME', gap: 'Special trips organised for groups of ___ people', answer: 'a number', why: '« groups of … people » : il faut une quantité, donc un nombre.' },
  { format: 'Note completion', context: 'NOTES ON SOCIAL PROGRAMME', gap: 'To reserve a seat: sign name on the ___ 3 days in advance', answer: 'a singular noun', why: 'Après « the » et avant « 3 days » : un nom au singulier (ex. list, board).' },
  { format: 'Note completion', context: 'NOTES ON SOCIAL PROGRAMME', gap: 'Visit places which have good ___', answer: 'a plural noun', why: '« have good … » sans article : un nom pluriel ou indénombrable (ex. views, shops).' },
  { format: 'Table completion', context: 'WEEKEND TRIPS', gap: 'St Ives · Date: ___ · Seats: 16', answer: 'a date', why: 'Colonne « Date » : une date (ex. 4th February).' },
  { format: 'Table completion', context: 'WEEKEND TRIPS', gap: 'Place: ___ · Date: 3rd March · Optional extra: S.S. Great Britain', answer: 'a name or place (proper noun)', why: 'Colonne « Place » : un nom de ville, donc une majuscule et attention à l’orthographe.' },
  { format: 'Note completion', context: 'FURTHER INFORMATION', gap: 'See the Social Assistant: Jane ___', answer: 'a name or place (proper noun)', why: 'Un prénom suivi d’un trou : le nom de famille, souvent épelé lettre par lettre.' },
  { format: 'Sentence completion', context: 'RIVERSIDE INDUSTRIAL VILLAGE', gap: 'There were over ___ water-powered mills in the area.', answer: 'a number', why: '« over … mills » : un nombre (ex. 100).' },
  { format: 'Sentence completion', context: 'RIVERSIDE INDUSTRIAL VILLAGE', gap: 'The metal industry was established by ___ who lived in the area.', answer: 'a plural noun', why: '« … who lived » sans article : un groupe de personnes, nom pluriel (ex. farmers).' },
  { format: 'Form completion', context: 'LIBRARY MEMBERSHIP FORM', gap: 'Telephone: ___', answer: 'a number', why: 'Numéro de téléphone : écoute les « double » et le « oh » (= zéro).' },
  { format: 'Form completion', context: 'HOTEL BOOKING', gap: 'Price per night: £___', answer: 'a price', why: 'Le symbole £ annonce un prix. Écoute les pièges (« it was 80, but now it’s 75 »).' },
  { format: 'Form completion', context: 'COURSE ENROLMENT', gap: 'Class starts at: ___ p.m.', answer: 'a time', why: '« starts at … p.m. » : une heure.' },
  { format: 'Note completion', context: 'THE URBAN LANDSCAPE', gap: 'Trees can make inland cities more ___', answer: 'an adjective', why: '« more … » : un adjectif (comparatif).' },
  { format: 'Note completion', context: 'THE URBAN LANDSCAPE', gap: 'Trees ___ the wind force', answer: 'a verb', why: 'Entre un sujet (trees) et un complément (the wind force) : un verbe (ex. reduce).' },
  { format: 'Note completion', context: 'THE URBAN LANDSCAPE', gap: 'Trees evaporate water through their ___', answer: 'a plural noun', why: 'Après « their » : un nom, ici pluriel (leaves).' },
  { format: 'Note completion', context: 'THE URBAN LANDSCAPE', gap: 'Trees require a lot of sunlight, water and ___ to grow', answer: 'a singular noun', why: 'Dans une liste de noms indénombrables (sunlight, water) : un nom (ex. space).' },
  { format: 'Form completion', context: 'ACCOMMODATION ENQUIRY', gap: 'Date of arrival: ___', answer: 'a date', why: 'Date : écris-la sous une forme simple (23 March / 23rd March).' },
  { format: 'Table completion', context: 'SPORTS CENTRE', gap: 'Swimming · Day: Monday · Cost: ___', answer: 'a price', why: 'Colonne « Cost » : un prix.' },
  { format: 'Plan / map labelling', context: 'RIVERSIDE VILLAGE PLAN', gap: 'The ___ (building next to the toilets)', answer: 'a singular noun', why: 'Un bâtiment sur un plan : un nom au singulier (ex. café, workshop).' },
  { format: 'Sentence completion', context: 'LECTURE: SLEEP', gap: 'Teenagers need approximately ___ hours of sleep.', answer: 'a number', why: '« … hours » : un nombre.' },
  { format: 'Note completion', context: 'TOUR INFORMATION', gap: 'Wear ___ shoes', answer: 'an adjective', why: 'Avant un nom (shoes) : un adjectif (ex. comfortable).' },
  { format: 'Form completion', context: 'LOST PROPERTY', gap: 'Item lost: a ___ bag', answer: 'an adjective', why: '« a … bag » : un adjectif (couleur, taille, matière).' },
  { format: 'Note completion', context: 'JOB INTERVIEW TIPS', gap: 'Candidates should ___ the company website before the interview.', answer: 'a verb', why: 'Après « should » : un verbe à la base verbale (ex. read, check).' },
]

// ---------- Repérer la paraphrase dans une transcription ----------
export interface ParaphraseSpot {
  question: string
  transcript: string[]
  answer: number // index de la phrase qui contient la réponse
  why: string
}

export const SPOTS: ParaphraseSpot[] = [
  { question: 'Why hasn’t Melanie started the assignment?', transcript: ['I’ve been in the library quite a lot this week.', 'The assignment looks really interesting, actually.', 'To be honest, my other course has taken up all my time.', 'I’m sure I’ll manage to finish it.'], answer: 2, why: '« doing work for another course » = « my other course has taken up all my time ».' },
  { question: 'What is a reasonable excuse for an extension?', transcript: ['Bad planning is never accepted, I’m afraid.', 'Clashing deadlines are your own responsibility.', 'If you are unwell or have an accident, we can be flexible.', 'Extensions are usually one week.'], answer: 2, why: '« personal illness or accident » = « if you are unwell or have an accident ».' },
  { question: 'The museum is popular because of its…', transcript: ['It’s quite small compared with the national museums.', 'People mainly come for the collection of old maps.', 'The café is rather expensive.', 'It opened in 1985.'], answer: 1, why: '« popular because of » ≈ « people mainly come for ».' },
  { question: 'How do most students travel to campus?', transcript: ['Some students drive, but parking is limited.', 'The majority of our students cycle in.', 'There is a bus every twenty minutes.', 'A few live close enough to walk.'], answer: 1, why: '« most students » = « the majority of our students ».' },
  { question: 'What does the speaker say about the new sports centre?', transcript: ['It was built on the site of the old cinema.', 'It cost far more than originally planned.', 'Membership is free for students.', 'It’s open seven days a week.'], answer: 1, why: 'Si la question porte sur le coût, « cost far more than planned » = « over budget ».' },
  { question: 'Trees can make cities cooler in summer because they…', transcript: ['Trees are often planted along main roads.', 'Through their leaves, they release water into the air, which lowers the temperature.', 'Buildings can reflect a lot of heat.', 'Parks are popular in summer.'], answer: 1, why: '« make cities cooler » = « lowers the temperature ».' },
  { question: 'The tour guide recommends that visitors…', transcript: ['The tour lasts about two hours.', 'There are toilets near the entrance.', 'I’d strongly advise bringing a waterproof jacket.', 'The gift shop closes at five.'], answer: 2, why: '« recommends » = « I’d strongly advise ».' },
  { question: 'What problem did the researchers have?', transcript: ['We interviewed over two hundred people.', 'Unfortunately, a lot of the questionnaires were never returned.', 'The results were published last year.', 'We were very pleased with the funding.'], answer: 1, why: 'Le problème : « questionnaires were never returned » ≈ « a low response rate ».' },
  { question: 'Why did the company move to a new building?', transcript: ['The old office was in a beautiful area.', 'We simply didn’t have enough room for all our staff.', 'The rent was actually quite reasonable.', 'Most employees live nearby.'], answer: 1, why: '« lack of space » = « didn’t have enough room ».' },
  { question: 'The lecturer says that early humans first used fire for…', transcript: ['Fire was, of course, extremely dangerous.', 'Its earliest use seems to have been for protection against animals.', 'Cooking came much later.', 'The evidence is quite limited.'], answer: 1, why: '« first used » = « earliest use ». Piège : « cooking came much later ».' },
  { question: 'What does the woman dislike about her flat?', transcript: ['It’s in a lovely, quiet street.', 'The kitchen is a good size.', 'What really gets on my nerves is how cold it is in winter.', 'The landlord is very helpful.'], answer: 2, why: '« dislike » = « what really gets on my nerves ».' },
  { question: 'According to the speaker, the festival was a success because…', transcript: ['The weather wasn’t great on Saturday.', 'Ticket prices went up this year.', 'Many more local people attended than in previous years.', 'Parking was a bit of a problem.'], answer: 2, why: '« a success » ≈ « many more people attended ».' },
]

// ---------- Les pièges : réponse donnée puis corrigée ----------
export interface Trap {
  gap: string
  transcript: string
  options: string[]
  answer: string
  why: string
}

export const TRAPS: Trap[] = [
  { gap: 'The meeting is on ___.', transcript: 'So the meeting is on Tuesday… oh no, sorry, I tell a lie, it’s Thursday this week.', options: ['Tuesday', 'Thursday', 'Wednesday'], answer: 'Thursday', why: '« sorry, I tell a lie » : la première réponse est corrigée.' },
  { gap: 'Price per night: £___', transcript: 'It used to be eighty pounds a night, but we’ve reduced it to seventy-five this season.', options: ['80', '75', '85'], answer: '75', why: '« used to be » annonce l’ancien prix : la réponse est le nouveau prix.' },
  { gap: 'Surname: ___', transcript: 'My name’s Ann Brown… B-R-O-W-N. Oh, actually, I’ve just got married, so it’s Ann Davies now. D-A-V-I-E-S.', options: ['Brown', 'Davies', 'Davis'], answer: 'Davies', why: 'Elle corrige son nom. Attention aussi à l’orthographe épelée : D-A-V-I-E-S.' },
  { gap: 'The tour leaves at ___ a.m.', transcript: 'Usually the coach leaves at half past eight, but tomorrow it’ll be a quarter to nine because of the roadworks.', options: ['8.30', '8.45', '9.15'], answer: '8.45', why: '« usually… but tomorrow » : c’est l’horaire de demain qui compte. A quarter to nine = 8.45.' },
  { gap: 'Number of people in the group: ___', transcript: 'We’re a group of twelve… well, fourteen if my cousins come, and they’ve just confirmed they will.', options: ['12', '14', '16'], answer: '14', why: 'Le chiffre est mis à jour : les cousins ont confirmé.' },
  { gap: 'Room number: ___', transcript: 'The lecture is in room 316. Oh, wait, there’s a note here: it’s been moved to 361.', options: ['316', '361', '613'], answer: '361', why: '« it’s been moved to » : nouvelle salle. Attention à l’ordre des chiffres.' },
  { gap: 'Preferred day for the class: ___', transcript: 'Monday would be ideal… although I’ve got football on Mondays now. Let’s say Wednesday instead.', options: ['Monday', 'Wednesday', 'Friday'], answer: 'Wednesday', why: '« instead » signale le choix final.' },
  { gap: 'Main problem with the hotel: the ___', transcript: 'The room was a bit small, but honestly that didn’t bother us. What we couldn’t stand was the noise from the street.', options: ['size', 'noise', 'price'], answer: 'noise', why: '« didn’t bother us » élimine la taille. Le vrai problème : « couldn’t stand ».' },
  { gap: 'Postcode: ___', transcript: 'It’s BS8 4TQ… no, sorry, 4TG, G for George.', options: ['BS8 4TQ', 'BS8 4TG', 'BS4 8TG'], answer: 'BS8 4TG', why: 'La correction « no, sorry » et le moyen mnémotechnique « G for George ».' },
  { gap: 'Deposit required: £___', transcript: 'The full fee is two hundred pounds, but you only need to pay a deposit of fifty today.', options: ['200', '50', '150'], answer: '50', why: 'La question porte sur le dépôt (deposit), pas sur le prix total.' },
  { gap: 'The library closes at ___ on Saturdays.', transcript: 'During the week we close at eight, but on Saturdays it’s six o’clock.', options: ['8', '6', '5'], answer: '6', why: 'Deux horaires : la question précise « on Saturdays ».' },
  { gap: 'The speaker’s favourite activity was ___.', transcript: 'Everyone else loved the boat trip, but for me the highlight was definitely the cooking class.', options: ['the boat trip', 'the cooking class', 'the museum'], answer: 'the cooking class', why: '« Everyone else loved… but for me » : l’avis des autres est un piège.' },
]

// ---------- Respecter la consigne ----------
export interface LimitItem {
  instruction: string
  answer: string
  valid: boolean
  why: string
}

export const LIMITS: LimitItem[] = [
  { instruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER', answer: 'the old library', valid: false, why: '3 mots (the + old + library). « old library » suffit, car les articles comptent comme des mots.' },
  { instruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER', answer: '15 students', valid: true, why: 'Un nombre + un mot : autorisé.' },
  { instruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER', answer: 'heavy rain', valid: true, why: 'Deux mots : autorisé.' },
  { instruction: 'ONE WORD ONLY', answer: 'leaves', valid: true, why: 'Un seul mot.' },
  { instruction: 'ONE WORD ONLY', answer: 'the leaves', valid: false, why: '« the » compte : 2 mots. Écris seulement « leaves ».' },
  { instruction: 'NO MORE THAN THREE WORDS', answer: 'a large green bag', valid: false, why: '4 mots. « large green bag » suffit.' },
  { instruction: 'NO MORE THAN THREE WORDS', answer: 'environmental protection', valid: true, why: '2 mots : autorisé.' },
  { instruction: 'ONE WORD AND/OR A NUMBER', answer: '£25', valid: true, why: 'Un nombre (avec le symbole) : autorisé.' },
  { instruction: 'ONE WORD AND/OR A NUMBER', answer: 'twenty-five pounds', valid: false, why: '« pounds » est un mot en plus d’un nombre écrit en lettres : écris plutôt « £25 » ou « 25 ».' },
  { instruction: 'NO MORE THAN TWO WORDS', answer: 'well-known artist', valid: true, why: 'Un mot avec trait d’union compte pour un seul mot : 2 mots.' },
  { instruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER', answer: '3rd March', valid: true, why: 'Une date (nombre + mois) : autorisé.' },
  { instruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER', answer: 'in the morning', valid: false, why: '3 mots. Écris « morning » si la phrase contient déjà « in the ».' },
  { instruction: 'ONE WORD ONLY', answer: 'comfortable', valid: true, why: 'Un seul mot (et vérifie l’orthographe : comfortable).' },
  { instruction: 'NO MORE THAN THREE WORDS AND/OR A NUMBER', answer: 'about 200 people', valid: true, why: '2 mots + un nombre : autorisé.' },
  { instruction: 'NO MORE THAN TWO WORDS', answer: 'sunlight and water', valid: false, why: '3 mots (« and » compte).' },
  { instruction: 'ONE WORD ONLY', answer: 'S.S. Great Britain', valid: false, why: 'Plusieurs mots : dans ce cas, la consigne serait différente. Relis toujours la consigne avant d’écouter.' },
]

// ---------- Dictées : noms épelés, numéros, dates, prix ----------
export const SURNAMES = ['Thompson', 'Fitzgerald', 'Harrington', 'Whitaker', 'McAllister', 'Jenkins', 'Davenport', 'Holloway', 'Pembroke', 'Ashworth', 'Gallagher', 'Kowalski', 'Lindqvist', 'Bennett']
export const STREETS = ['Wellington Road', 'Castle Street', 'Hawthorn Avenue', 'Mill Lane', 'Kingsley Close', 'Abbey Grove']
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// ---------- Fiche de conseils ----------
export const TIPS: { title: string; items: string[] }[] = [
  {
    title: 'Avant d’écouter',
    items: [
      'Utilise le temps de lecture : lis TOUTES les questions de la section avant le début de l’audio.',
      'Souligne les mots-clés de chaque question (noms, dates, chiffres, mots négatifs).',
      'Prédis le type de réponse : nombre, date, nom propre, nom pluriel, adjectif…',
      'Anticipe les synonymes : l’audio dira rarement les mots exacts de la question.',
      'Lis la consigne : NO MORE THAN TWO WORDS AND/OR A NUMBER, ONE WORD ONLY…',
    ],
  },
  {
    title: 'Pendant l’écoute',
    items: [
      'Les réponses arrivent dans l’ordre des questions (sauf parfois pour les cartes et plans).',
      'Méfie-toi des corrections : « sorry », « actually », « I mean », « no, wait ».',
      'Les distracteurs : plusieurs chiffres, dates ou noms sont souvent cités, un seul répond à la question.',
      'Si tu rates une réponse, passe tout de suite à la suivante. Ne reste pas bloquée.',
      'Note les mots tels que tu les entends, puis vérifie l’orthographe à la fin.',
    ],
  },
  {
    title: 'À la fin (transfert des réponses)',
    items: [
      'Vérifie l’orthographe : une faute = réponse fausse.',
      'Vérifie la grammaire de la phrase complétée (singulier / pluriel).',
      'Ne laisse jamais de case vide : une réponse au hasard vaut mieux que rien.',
      'Majuscules : sur ordinateur, écrire tout en majuscules évite les erreurs.',
      'Nombres : écris-les en chiffres (15 plutôt que fifteen), c’est plus sûr.',
    ],
  },
  {
    title: 'Pièges classiques',
    items: [
      '« oh » = zéro dans les numéros de téléphone. « double 4 » = 44.',
      '13 / 30, 14 / 40, 15 / 50… : écoute l’accent (thirTEEN contre THIRty).',
      'Les lettres qui se confondent : A / E / I, G / J, B / P / V, M / N.',
      'Les dates : « the third of May » = 3 May. Les heures : « a quarter to nine » = 8.45.',
      'Section 4 (monologue académique) : pas de pause au milieu, garde le rythme.',
    ],
  },
]
