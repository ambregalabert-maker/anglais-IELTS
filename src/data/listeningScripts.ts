// Exercices de Listening avec un vrai enregistrement (dialogues à plusieurs voix et accents).
// L1 à L7 viennent de ta méthode ; L8 à L10 sont des scripts originaux sur le même modèle.
// Chaque script devient une piste audio (voir src/data/speech.ts et scripts/audio/generate.py).

import type { NeuralVoice } from '../lib/voices'
import type { QuestionSet } from '../practice/types'

export interface ScriptLine {
  who: string // nom affiché dans le script
  text: string // ce qui est affiché
  say?: string // ce qui est prononcé, si différent (épellations, par exemple)
}

/** Un plan à étiqueter (Section 2) : des zones avec une lettre, une entrée et le nord. */
export interface PlanSpec {
  kind: 'building' | 'park'
  zones: { key: string; x: number; y: number; w: number; h: number }[]
  paths: { x: number; y: number; w: number; h: number }[] // couloir ou allées
  entrance: { x: number; y: number; label: string }
}

export interface ListeningScript {
  id: string
  code: string // L1, L2…
  title: string
  section: 1 | 2 | 3 | 4
  context: string // en français
  fromGuide?: boolean
  voices: Record<string, NeuralVoice>
  lines: ScriptLine[]
  sets: QuestionSet[]
  plan?: PlanSpec
}

const spell = (word: string) => word.toUpperCase().split('').join(', ')

export const LISTENING_SCRIPTS: ListeningScript[] = [
  {
    id: 'l1-swimming',
    code: 'L1',
    title: 'Joining a swimming club',
    section: 1,
    context: 'Une inscription au téléphone : formulaire à compléter.',
    fromGuide: true,
    voices: { Receptionist: 'daniel', Caller: 'emma' },
    lines: [
      { who: 'Receptionist', text: 'Good morning, Riverside Sports Centre. How can I help?' },
      { who: 'Caller', text: 'Hi, I’d like to join the swimming club.' },
      { who: 'Receptionist', text: 'Sure. Can I take your name?' },
      { who: 'Caller', text: 'It’s Laura Pemberton. P-E-M-B-E-R-T-O-N.', say: `It's Laura Pemberton. ${spell('Pemberton')}.` },
      { who: 'Receptionist', text: 'And your date of birth?' },
      { who: 'Caller', text: 'The 14th of March, 1998.' },
      { who: 'Receptionist', text: 'What’s your address?' },
      { who: 'Caller', text: '27 Mill Lane… sorry, 72 Mill Lane, Bristol.', say: '27 Mill Lane... sorry, 72 Mill Lane, Bristol.' },
      { who: 'Receptionist', text: 'Which membership would you like? Monthly is £35, annual is £320.' },
      { who: 'Caller', text: 'Monthly, please. I’m not sure I’ll stay a whole year.' },
      { who: 'Receptionist', text: 'And how did you hear about us?' },
      { who: 'Caller', text: 'From a leaflet at the library.' },
    ],
    sets: [
      {
        id: 'q',
        title: 'Form completion',
        type: 'gap',
        instruction: 'Complete the form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
        tip: 'Avant d’écouter, note le type de chaque réponse : nom, date, nombre, mot.',
        intro: 'Riverside Sports Centre: swimming club',
        items: [
          { q: 'Surname: ___', answer: 'Pemberton' },
          { q: 'Date of birth: ___', answer: '14 March 1998', accepted: ['14th March 1998', 'March 14 1998', 'March 14th 1998', '14/03/1998', '14.03.1998', '14 March, 1998', 'the 14th of March 1998'] },
          { q: 'Address: ___ Mill Lane', answer: '72', why: 'Piège : elle dit d’abord 27, puis se corrige.' },
          { q: 'Membership type: ___', answer: 'monthly' },
          { q: 'Monthly fee: £___', answer: '35' },
          { q: 'Heard about the club from: a ___', answer: 'leaflet' },
        ],
      },
    ],
  },
  {
    id: 'l2-gardens',
    code: 'L2',
    title: 'A project on urban gardens',
    section: 3,
    context: 'Deux étudiants choisissent leur méthode de recherche.',
    fromGuide: true,
    voices: { Tom: 'george', Amira: 'isabella' },
    lines: [
      { who: 'Tom', text: 'So, for our project on urban gardens, should we survey residents or interview the council?' },
      { who: 'Amira', text: 'Surveys take too long to analyse. And the council already published its figures.' },
      { who: 'Tom', text: 'True. What about visiting three gardens and talking to volunteers?' },
      { who: 'Amira', text: 'That’s the most useful. We’d get real opinions, not just numbers.' },
    ],
    sets: [
      {
        id: 'q',
        title: 'Multiple choice',
        type: 'mcq',
        instruction: 'Choose the correct letter, A, B or C.',
        tip: 'Les trois options sont souvent toutes citées : les mauvaises sont rejetées.',
        items: [
          {
            q: 'What do the students decide to do?',
            options: [
              { key: 'A', text: 'survey local residents' },
              { key: 'B', text: 'interview council staff' },
              { key: 'C', text: 'visit gardens and speak to volunteers' },
            ],
            answer: 'C',
            why: 'A et B sont mentionnés puis rejetés : c’est le piège classique du QCM.',
          },
        ],
      },
    ],
  },
  {
    id: 'l3-centre',
    code: 'L3',
    title: 'Northfield Community Centre',
    section: 2,
    context: 'Une visite guidée : place les pièces sur le plan.',
    fromGuide: true,
    voices: { Guide: 'lewis' },
    lines: [
      {
        who: 'Guide',
        text: 'Welcome to the Northfield Community Centre. You’re standing at the main entrance. As you walk in, the first room on your left is the reception, where you can collect your badge. Directly opposite reception, on your right, is the café. Carry on down the corridor and the next room on the right, just past the café, is the library. Across from the library you’ll find the art studio. At the far end of the corridor there are two rooms: the gym is in the left-hand corner, and the meeting room is next to it, in the right-hand corner.',
      },
    ],
    plan: {
      kind: 'building',
      zones: [
        { key: 'A', x: 20, y: 160, w: 95, h: 70 },
        { key: 'B', x: 20, y: 80, w: 95, h: 70 },
        { key: 'C', x: 185, y: 160, w: 95, h: 70 },
        { key: 'D', x: 185, y: 80, w: 95, h: 70 },
        { key: 'E', x: 20, y: 10, w: 125, h: 60 },
        { key: 'F', x: 155, y: 10, w: 125, h: 60 },
      ],
      paths: [{ x: 125, y: 70, w: 50, h: 170 }],
      entrance: { x: 150, y: 250, label: 'Main entrance' },
    },
    sets: [
      {
        id: 'q',
        title: 'Plan labelling',
        type: 'match',
        instruction: 'Label the plan. Write the correct letter, A-F, next to each room.',
        tip: 'Repère l’entrée et imagine que tu marches avec le guide : chaque pièce part de la précédente.',
        options: ['A', 'B', 'C', 'D', 'E', 'F'].map((k) => ({ key: k, text: `Room ${k}` })),
        items: [
          { q: 'reception', answer: 'A', why: '« the first room on your left ».' },
          { q: 'café', answer: 'C', why: '« Directly opposite reception, on your right ».' },
          { q: 'library', answer: 'D', why: '« the next room on the right, just past the café ».' },
          { q: 'art studio', answer: 'B', why: '« Across from the library ».' },
          { q: 'gym', answer: 'E', why: '« in the left-hand corner » au fond.' },
          { q: 'meeting room', answer: 'F', why: '« next to it, in the right-hand corner ».' },
        ],
      },
    ],
  },
  {
    id: 'l4-presentation',
    code: 'L4',
    title: 'Planning a presentation',
    section: 3,
    context: 'Trois étudiants et leur professeur se répartissent les tâches.',
    fromGuide: true,
    voices: { Lecturer: 'lewis', Jake: 'michael', Mei: 'lily', Sofia: 'heart' },
    lines: [
      { who: 'Lecturer', text: 'So, who’s doing what for the presentation?' },
      { who: 'Jake', text: 'I’ll handle the slides. I’m the only one who knows the software well.' },
      { who: 'Mei', text: 'I’d rather not speak first, but I’m happy to do the research on costs.' },
      { who: 'Sofia', text: 'Then I’ll introduce the topic. I don’t mind talking in front of people.' },
      { who: 'Lecturer', text: 'And the questions at the end?' },
      { who: 'Jake', text: 'Mei, you know the data best, so you should answer those.' },
      { who: 'Mei', text: 'Fine, as long as Sofia helps.' },
    ],
    sets: [
      {
        id: 'q',
        title: 'Matching',
        type: 'match',
        instruction: 'What will each student do? Choose the correct letter, A-E.',
        tip: 'Mémorise les options avant d’écouter : elles seront reformulées. Deux options ne servent pas.',
        options: [
          { key: 'A', text: 'design the slides' },
          { key: 'B', text: 'give the introduction' },
          { key: 'C', text: 'answer audience questions' },
          { key: 'D', text: 'write the conclusion' },
          { key: 'E', text: 'book the room' },
        ],
        items: [
          { q: 'Jake', answer: 'A', why: '« I’ll handle the slides ».' },
          { q: 'Mei', answer: 'C', why: 'Elle fait aussi la recherche, mais la tâche proposée ici est C.' },
          { q: 'Sofia', answer: 'B', why: '« I’ll introduce the topic ». D et E ne sont jamais mentionnés.' },
        ],
      },
    ],
  },
  {
    id: 'l5-bicycle',
    code: 'L5',
    title: 'A short history of the bicycle',
    section: 4,
    context: 'Un cours magistral : notes à compléter.',
    fromGuide: true,
    voices: { Lecturer: 'george' },
    lines: [
      {
        who: 'Lecturer',
        text: 'Today I want to look at the history of the bicycle. The first machine, built in Germany in 1817, had no pedals at all. Riders pushed themselves along with their feet, which is why it was sometimes called a running machine. Pedals were added in the 1860s, but these early bicycles were extremely uncomfortable, mainly because the wheels were made of wood and iron. The real breakthrough came in the 1880s with the safety bicycle, which had two wheels of the same size and a chain. Then, in 1888, air-filled tyres were introduced, and cycling quickly became popular, especially among women, for whom it offered a new kind of independence.',
      },
    ],
    sets: [
      {
        id: 'q',
        title: 'Note completion',
        type: 'gap',
        instruction: 'Complete the notes. Write ONE WORD ONLY for each answer.',
        tip: 'Section 4 : un seul locuteur, sans pause. Les dates servent de repères.',
        wordLimit: 1,
        items: [
          { q: 'First machine (1817): no ___', answer: 'pedals' },
          { q: '1860s bicycles: uncomfortable because wheels made of wood and ___', answer: 'iron' },
          { q: '1880s safety bicycle: wheels of equal size and a ___', answer: 'chain' },
          { q: '1888: tyres filled with ___', answer: 'air' },
          { q: 'Cycling gave women more ___', answer: 'independence' },
        ],
      },
    ],
  },
  {
    id: 'l6-tour',
    code: 'L6',
    title: 'A guided tour',
    section: 2,
    context: 'Les consignes d’une guide avant une visite.',
    fromGuide: true,
    voices: { Guide: 'isabella' },
    lines: [
      {
        who: 'Guide',
        text: 'The tour lasts about two hours. Please wear comfortable shoes, as we’ll be walking on old stone paths. You don’t need to bring water; we’ll stop at a café halfway. Photography is allowed everywhere except inside the chapel. And unfortunately, the tower is closed this month for repairs.',
      },
    ],
    sets: [
      {
        id: 'q',
        title: 'Multiple choice (TWO answers)',
        type: 'mcq2',
        instruction: 'Which TWO pieces of advice does the guide give? Choose TWO letters, A-E.',
        tip: 'L’ordre des deux réponses n’a pas d’importance. Barre les options exclues au fur et à mesure.',
        items: [
          {
            q: 'Which TWO pieces of advice does the guide give?',
            options: [
              { key: 'A', text: 'bring a bottle of water' },
              { key: 'B', text: 'wear suitable footwear' },
              { key: 'C', text: 'avoid taking photos in the chapel' },
              { key: 'D', text: 'visit the tower first' },
              { key: 'E', text: 'arrive early' },
            ],
            answer: ['B', 'C'],
            why: '« comfortable shoes » = suitable footwear ; « except inside the chapel ». L’eau n’est pas nécessaire et la tour est fermée.',
          },
        ],
      },
    ],
  },
  {
    id: 'l7-dictation',
    code: 'L7',
    title: 'Chiffres et épellation',
    section: 1,
    context: 'Huit phrases courtes : écris exactement ce que tu entends.',
    fromGuide: true,
    voices: { Speaker: 'heart' },
    lines: [
      { who: 'Speaker', text: 'One. My phone number is oh-seven-seven, double four, five-six-two, nine-oh-one.', say: 'Number one. My phone number is oh seven seven, double four, five six two, nine oh one.' },
      { who: 'Speaker', text: 'Two. The postcode is B-S-eight, three-Q-T.', say: 'Number two. The postcode is B, S, eight, three, Q, T.' },
      { who: 'Speaker', text: 'Three. It costs fifteen pounds fifty.', say: 'Number three. It costs fifteen pounds fifty.' },
      { who: 'Speaker', text: 'Four. We’re open from the thirtieth of June.', say: 'Number four. We’re open from the thirtieth of June.' },
      { who: 'Speaker', text: 'Five. The reference is X-J, four-seven-nine.', say: 'Number five. The reference is X, J, four, seven, nine.' },
      { who: 'Speaker', text: 'Six. My surname is Whitcombe: W-H-I-T-C-O-M-B-E.', say: `Number six. My surname is Whitcombe. ${spell('Whitcombe')}.` },
      { who: 'Speaker', text: 'Seven. About sixty per cent of students agreed.', say: 'Number seven. About sixty per cent of students agreed.' },
      { who: 'Speaker', text: 'Eight. The flight leaves at quarter to eight.', say: 'Number eight. The flight leaves at quarter to eight.' },
    ],
    sets: [
      {
        id: 'q',
        title: 'Dictée',
        type: 'gap',
        instruction: 'Write what you hear, using numbers where possible.',
        tip: '« oh » = 0, « double four » = 44. Les majuscules ne comptent pas, l’orthographe oui.',
        items: [
          { q: 'Phone number: ___', answer: '07744 562 901', accepted: ['07744562901', '07744 562901', '0774 4562 901'] },
          { q: 'Postcode: ___', answer: 'BS8 3QT', accepted: ['BS83QT'] },
          { q: 'Price: ___', answer: '£15.50', accepted: ['15.50', '£15,50', '15,50'] },
          { q: 'Opening date: ___', answer: '30 June', accepted: ['30th June', 'June 30', 'June 30th', 'the 30th of June', '30/06'] },
          { q: 'Reference: ___', answer: 'XJ479', accepted: ['XJ 479'] },
          { q: 'Surname: ___', answer: 'Whitcombe' },
          { q: 'Students who agreed: ___', answer: '60%', accepted: ['60 %', '60', 'sixty per cent', '60 per cent'] },
          { q: 'Flight time: ___', answer: '7.45', accepted: ['7:45', '07.45', '07:45', '19.45', '19:45'] },
        ],
      },
    ],
  },
  {
    id: 'l8-cookery',
    code: 'L8',
    title: 'Booking a cookery class',
    section: 1,
    context: 'Une réservation au téléphone, avec une correction et une épellation.',
    voices: { Receptionist: 'heart', Caller: 'daniel' },
    lines: [
      { who: 'Receptionist', text: 'Good afternoon, Greenfield Cookery School. How can I help you?' },
      { who: 'Caller', text: 'Hello. I’d like to book a place on one of your weekend classes.' },
      { who: 'Receptionist', text: 'Of course. Could I have your name, please?' },
      { who: 'Caller', text: 'Yes, it’s Oliver Gill. That’s G-I, double L.', say: 'Yes, it’s Oliver Gill. That’s G, I, double L.' },
      { who: 'Receptionist', text: 'Thank you. And a contact number?' },
      { who: 'Caller', text: 'It’s oh-seven-nine, double three, four-eight-one, six-oh-two.', say: 'It’s oh seven nine, double three, four eight one, six oh two.' },
      { who: 'Receptionist', text: 'Which class are you interested in?' },
      { who: 'Caller', text: 'The Italian one, on Saturday the ninth… oh no, sorry, I mean Sunday the tenth.' },
      { who: 'Receptionist', text: 'Sunday the tenth, Italian cooking. How many people will there be?' },
      { who: 'Caller', text: 'Two of us: me and my sister. She’s vegetarian, by the way.' },
      { who: 'Receptionist', text: 'That’s no problem at all. The class costs £45 per person, so that’s £90 in total.' },
      { who: 'Caller', text: 'Great. And is there anywhere to park?' },
      { who: 'Receptionist', text: 'There’s no car park, I’m afraid, but there’s a bus stop right outside the school.' },
    ],
    sets: [
      {
        id: 'q',
        title: 'Form completion',
        type: 'gap',
        instruction: 'Complete the form. Write ONE WORD AND/OR A NUMBER for each answer.',
        tip: 'Méfie-toi des corrections (« oh no, sorry ») : la bonne réponse vient après.',
        intro: 'Greenfield Cookery School: booking form',
        wordLimit: 1,
        items: [
          { q: 'Name: Oliver ___', answer: 'Gill' },
          { q: 'Phone: ___', answer: '07933481602', accepted: ['07933 481 602', '07933 481602'], why: 'Écris les chiffres sans espaces ou en groupes : les deux sont acceptés.' },
          { q: 'Class: ___ cooking', answer: 'Italian' },
          { q: 'Date: Sunday ___', answer: '10th', accepted: ['10', 'the 10th'], why: 'Piège : « Saturday the ninth » est corrigé.' },
          { q: 'Special diet: ___', answer: 'vegetarian' },
          { q: 'Total price: £___', answer: '90', why: '£45 par personne, mais on demande le total.' },
          { q: 'Getting there: take the ___', answer: 'bus' },
        ],
      },
    ],
  },
  {
    id: 'l9-park',
    code: 'L9',
    title: 'Riverside Park',
    section: 2,
    context: 'Une annonce d’accueil : place les lieux sur le plan du parc.',
    voices: { Guide: 'emma' },
    lines: [
      {
        who: 'Guide',
        text: 'Welcome to Riverside Park. As you come in through the main gate, the café is immediately on your right. Opposite the café, on the other side of the main path, is the rose garden, which is at its best in June. If you walk straight ahead to the end of the main path, you’ll reach the lake. The children’s playground is to the left of the lake, in the north-west corner of the park. And if you need the toilets, they’re next to the café, just behind it as you walk up the path.',
      },
    ],
    plan: {
      kind: 'park',
      zones: [
        { key: 'A', x: 15, y: 15, w: 80, h: 60 },
        { key: 'B', x: 110, y: 10, w: 80, h: 55 },
        { key: 'C', x: 205, y: 15, w: 80, h: 60 },
        { key: 'D', x: 180, y: 110, w: 85, h: 50 },
        { key: 'E', x: 35, y: 175, w: 85, h: 55 },
        { key: 'F', x: 180, y: 175, w: 85, h: 55 },
      ],
      paths: [{ x: 135, y: 65, w: 30, h: 175 }],
      entrance: { x: 150, y: 250, label: 'Main gate' },
    },
    sets: [
      {
        id: 'q',
        title: 'Map labelling',
        type: 'match',
        instruction: 'Label the map. Write the correct letter, A-F. One letter is not used.',
        tip: 'Vocabulaire clé : opposite, immediately on your right, to the left of, just behind.',
        options: ['A', 'B', 'C', 'D', 'E', 'F'].map((k) => ({ key: k, text: `Place ${k}` })),
        items: [
          { q: 'café', answer: 'F', why: '« immediately on your right » en entrant.' },
          { q: 'rose garden', answer: 'E', why: '« Opposite the café, on the other side of the main path ».' },
          { q: 'lake', answer: 'B', why: '« straight ahead to the end of the main path ».' },
          { q: 'children’s playground', answer: 'A', why: '« to the left of the lake, in the north-west corner ».' },
          { q: 'toilets', answer: 'D', why: '« next to the café, just behind it as you walk up the path ».' },
        ],
      },
    ],
  },
  {
    id: 'l10-heat',
    code: 'L10',
    title: 'Urban heat islands',
    section: 4,
    context: 'Un cours magistral : causes, conséquences et solutions.',
    voices: { Lecturer: 'lily' },
    lines: [
      {
        who: 'Lecturer',
        text: 'Good morning. Today I’d like to talk about a phenomenon known as the urban heat island. Put simply, cities are often warmer than the countryside around them, sometimes by as much as five degrees, and the difference is usually greatest at night. There are several reasons for this. First, materials such as concrete and asphalt absorb heat during the day and release it slowly after sunset. Second, cities have fewer trees, so there is less shade, and less cooling from plants releasing water into the air. A third factor is waste heat from cars, air conditioners and factories.',
      },
      {
        who: 'Lecturer',
        text: 'Now, let’s turn to the consequences. Higher temperatures increase the demand for electricity, mainly for air conditioning, and this can put pressure on the power network during heatwaves. More seriously, extreme heat is dangerous for health, particularly for elderly people who live alone.',
      },
      {
        who: 'Lecturer',
        text: 'Finally, what can be done? One of the simplest solutions is to paint roofs white, because light surfaces reflect sunlight instead of absorbing it. Cities are also planting more trees and creating green roofs. In Paris, for example, a number of school playgrounds have been turned into shaded gardens, which are open to local residents during heatwaves.',
      },
    ],
    sets: [
      {
        id: 'q',
        title: 'Note completion',
        type: 'gap',
        instruction: 'Complete the notes. Write ONE WORD ONLY for each answer.',
        tip: 'Les annonces du professeur (« Now, let’s turn to… », « Finally ») marquent les parties des notes.',
        wordLimit: 1,
        intro: 'Urban heat islands',
        items: [
          { q: 'Cities up to 5°C warmer, especially at ___', answer: 'night' },
          { q: 'Causes: concrete and ___ absorb heat during the day', answer: 'asphalt' },
          { q: 'Fewer trees, so less ___', answer: 'shade' },
          { q: 'Waste heat from cars, air conditioners and ___', answer: 'factories' },
          { q: 'Consequences: greater demand for ___', answer: 'electricity' },
          { q: 'Health risk, especially for ___ people living alone', answer: 'elderly', accepted: ['old', 'older'] },
          { q: 'Solutions: paint roofs ___', answer: 'white' },
          { q: 'Paris: school ___ turned into shaded gardens', answer: 'playgrounds' },
        ],
      },
    ],
  },
]

export const SCRIPT_BY_ID: Record<string, ListeningScript> = Object.fromEntries(LISTENING_SCRIPTS.map((s) => [s.id, s]))

export const scriptTrackId = (s: ListeningScript) => `lis-${s.id}`
