// Contenu du module Reading : méthode, gestion du temps, textes d'entraînement et questions.
// Tous les textes sont originaux (pas de copie des tests officiels). Les faits cités ont été vérifiés.

import type { QuestionSet } from '../practice/types'

export interface Paragraph {
  label: string // A, B, C…
  text: string
  gist: string // le sujet du paragraphe en quelques mots (chrono-skimming)
}

export interface Passage {
  id: string
  title: string
  topic: string
  level: 'B2' | 'C1' | 'C2'
  minutes: number // temps conseillé
  fromGuide?: boolean // texte de ta méthode (PDF)
  paragraphs: Paragraph[]
  sets: QuestionSet[]
}

// ---------- Méthode ----------

export const READING_FORMAT = [
  { label: 'Durée', value: '60 min' },
  { label: 'Questions', value: '40' },
  { label: 'Textes', value: '3 (700 à 950 mots)' },
  { label: 'Transfert', value: 'aucun : tu tapes à l’écran' },
]

export const TIME_PLAN = [
  { text: 'Texte 1', minutes: 17, why: 'Le plus facile : prendre de l’avance' },
  { text: 'Texte 2', minutes: 20, why: 'Difficulté moyenne' },
  { text: 'Texte 3', minutes: 23, why: 'Le plus long et le plus argumentatif' },
]

export const FOUR_STEPS = [
  { title: 'Skim (2-3 min)', text: 'Parcourir le titre et les débuts de paragraphes. But : savoir de quoi parle chaque partie.' },
  { title: 'Lire les questions', text: 'Souligner les mots-clés faciles à repérer : noms propres, dates, chiffres.' },
  { title: 'Scan', text: 'Chercher ces mots-clés, ou leurs synonymes, dans le texte.' },
  { title: 'Lire en détail', text: 'Lire les 2-3 phrases autour, puis répondre. 1 min 30 maximum par question : si tu bloques, devine et avance.' },
]

export interface QuestionMethod {
  id: string
  title: string
  what: string
  tip: string
  steps: string[]
}

export const QUESTION_METHODS: QuestionMethod[] = [
  {
    id: 'tfng',
    title: 'True / False / Not Given',
    what: 'Vérifier un fait',
    tip: '« Not Given » = le texte n’en parle pas. N’utilise jamais tes connaissances.',
    steps: [
      'Souligne les mots-clés de l’affirmation, surtout les mots « absolus » : all, always, only, never, most, first.',
      'Trouve le passage correspondant : les questions suivent l’ordre du texte.',
      'Compare phrase à phrase : même sens → True ; sens contraire → False ; le texte ne dit rien sur ce point précis → Not Given.',
      'Erreur classique : répondre False quand le texte n’en parle pas. Si tu ne peux pas prouver le contraire, c’est Not Given.',
    ],
  },
  {
    id: 'ynng',
    title: 'Yes / No / Not Given',
    what: 'Vérifier l’opinion de l’auteur',
    tip: 'Repère les marqueurs d’opinion : it is clear that, unfortunately, the author believes, surprisingly, it seems unlikely, in my view.',
    steps: ['Même logique que True / False / Not Given, mais on vérifie ce que pense l’auteur, pas les faits.', 'Cherche les verbes d’opinion : argue, suggest, claim, believe.'],
  },
  {
    id: 'headings',
    title: 'Matching headings',
    what: 'Un titre par paragraphe',
    tip: 'Fais d’abord les titres faciles. Méfie-toi des titres qui reprennent un mot du paragraphe : c’est souvent un piège.',
    steps: [
      'Lis la liste des titres et souligne le mot principal de chacun.',
      'Pour chaque paragraphe, lis la 1re phrase, la 2e et la dernière, puis résume l’idée en 3-4 mots.',
      'Choisis le titre qui résume tout le paragraphe, pas un détail.',
    ],
  },
  {
    id: 'info',
    title: 'Matching information',
    what: '« Which paragraph contains… »',
    tip: 'Les questions ne suivent pas l’ordre du texte : fais-les en dernier, quand tu connais le texte.',
    steps: [
      'Les questions décrivent un type d’information : « an example of », « a reference to », « a comparison between ». Cherche ce type, pas des mots identiques.',
      'Un paragraphe peut servir plusieurs fois si la consigne le précise.',
    ],
  },
  {
    id: 'features',
    title: 'Matching features',
    what: 'Associer à des personnes ou des dates',
    tip: 'Entoure chaque nom propre de la liste dans le texte avant de lire les affirmations.',
    steps: ['Scanne le texte pour entourer chaque nom de la liste (les chercheurs, par exemple).', 'Lis ce que dit chacun, puis associe aux affirmations.'],
  },
  {
    id: 'endings',
    title: 'Sentence endings',
    what: 'Associer un début et une fin',
    tip: 'Il y a plus de fins que de débuts. La fin doit être correcte grammaticalement ET logiquement.',
    steps: ['Lis le début de phrase, prédis la fin, puis élimine les fins grammaticalement impossibles.', 'Les questions suivent l’ordre du texte.'],
  },
  {
    id: 'summary',
    title: 'Summary, note, table, flow-chart',
    what: 'Compléter avec des mots du texte',
    tip: 'Respecte la limite de mots et copie le mot exactement comme dans le texte, sans changer sa forme.',
    steps: [
      'Vérifie si les mots viennent du texte ou d’une liste fournie (A-H).',
      'Prédis la nature du mot manquant : nom, adjectif, verbe, singulier ou pluriel.',
      'Pour un diagramme ou un flow-chart, l’ordre suit généralement le texte.',
    ],
  },
  {
    id: 'mcq',
    title: 'Multiple choice',
    what: 'Choisir A, B, C ou D',
    tip: 'Une option fausse reprend souvent les mots exacts du texte avec un sens déformé. La bonne réponse est souvent une paraphrase.',
    steps: ['Lis le début de la question (le « stem »), trouve le passage, puis compare chaque option au texte.'],
  },
  {
    id: 'short',
    title: 'Short-answer questions',
    what: 'Réponse courte',
    tip: 'Copie l’orthographe exacte du texte et respecte la limite (ex. NO MORE THAN THREE WORDS).',
    steps: ['Les questions commencent par What, Which, When, How many. Réponds uniquement par les mots demandés.'],
  },
]

export const READING_ROUTINE = [
  'Un texte par jour, chronométré à 20 minutes.',
  'Pour chaque erreur, retrouve la phrase exacte du texte et écris pourquoi ta réponse était fausse.',
  'Tiens un carnet des paraphrases rencontrées (ex. « fell » = « decreased », « pioneers » = « early researchers »).',
  'Lis 2-3 articles par semaine de presse scientifique grand public en anglais.',
]

// ---------- Textes ----------

const HEADINGS_TIP = 'Lis la 1re et la dernière phrase de chaque paragraphe. Il y a des titres en trop.'
const TFNG_TIP = 'Not Given = le texte ne dit rien sur ce point précis. Ne réponds pas False par réflexe.'

export const PASSAGES: Passage[] = [
  {
    id: 'beekeeper',
    title: 'The Return of the Urban Beekeeper',
    topic: 'Environnement',
    level: 'B2',
    minutes: 12,
    fromGuide: true,
    paragraphs: [
      {
        label: 'A',
        gist: 'Les ruches arrivent en ville',
        text: 'In the past two decades, beekeeping has moved from the countryside to the rooftops of major cities. London alone is estimated to host several thousand hives, many on office buildings and hotels. Supporters see this as a simple way to help pollinators, whose numbers have fallen across Europe.',
      },
      {
        label: 'B',
        gist: 'La concurrence pour les fleurs',
        text: 'However, some ecologists are less enthusiastic. They argue that honeybees compete with wild bees for the same flowers. In areas where hives are densely packed, wild species may struggle to find enough nectar. A city can only support a limited number of colonies before food becomes scarce.',
      },
      {
        label: 'C',
        gist: 'Planter des fleurs plutôt que des ruches',
        text: 'For this reason, several cities now encourage residents to plant flowers rather than install hives. Paris, for example, has reduced pesticide use in its parks since 2017 and promotes wildflower meadows along roads. Researchers believe that increasing the food supply benefits all pollinators, not only honeybees.',
      },
      {
        label: 'D',
        gist: 'Les ruches sensibilisent le public',
        text: 'Urban beekeepers, for their part, say that their hives raise public awareness. Schoolchildren who visit a rooftop hive often go home with a new interest in nature. Many beekeepers now combine their hobby with planting projects, so that their bees do not take more than the city can give.',
      },
    ],
    sets: [
      {
        id: 'r1',
        title: 'Matching headings',
        type: 'match',
        instruction: 'Choose the correct heading for paragraphs A-D. There are two extra headings.',
        tip: HEADINGS_TIP,
        options: [
          { key: 'i', text: 'A solution based on food rather than hives' },
          { key: 'ii', text: 'The high cost of keeping bees' },
          { key: 'iii', text: 'A trend that has spread to cities' },
          { key: 'iv', text: 'Educational benefits and a balanced approach' },
          { key: 'v', text: 'Concerns about competition for resources' },
          { key: 'vi', text: 'Honey production in rural areas' },
        ],
        items: [
          { q: 'Paragraph A', answer: 'iii', why: '« has moved from the countryside to the rooftops of major cities » = une tendance qui gagne les villes.' },
          { q: 'Paragraph B', answer: 'v', why: '« compete with wild bees for the same flowers » = concurrence pour les ressources.' },
          { q: 'Paragraph C', answer: 'i', why: '« plant flowers rather than install hives » : la solution passe par la nourriture.' },
          { q: 'Paragraph D', answer: 'iv', why: '« raise public awareness » (éducation) + « combine their hobby with planting projects » (équilibre).' },
        ],
      },
      {
        id: 'r2',
        title: 'True / False / Not Given',
        type: 'tfng',
        instruction: 'Do the following statements agree with the information given in the text?',
        tip: TFNG_TIP,
        items: [
          { q: 'Beekeeping in cities has become more common over the last twenty years.', answer: 'True', why: '« In the past two decades » = over the last twenty years.' },
          { q: 'All ecologists support urban beekeeping.', answer: 'False', why: '« some ecologists are less enthusiastic » contredit « all ».' },
          { q: 'Paris has banned beekeeping on rooftops.', answer: 'Not Given', why: 'Paris a réduit les pesticides ; le texte ne dit rien d’une interdiction.' },
          { q: 'Honey produced in cities tastes better than country honey.', answer: 'Not Given', why: 'Le goût du miel n’est jamais mentionné.' },
          { q: 'Some beekeepers also take part in planting projects.', answer: 'True', why: '« combine their hobby with planting projects ».' },
        ],
      },
      {
        id: 'r3',
        title: 'Summary completion',
        type: 'gap',
        instruction: 'Complete the summary. Use NO MORE THAN TWO WORDS from the text for each answer.',
        tip: 'Copie le mot exactement comme dans le texte.',
        wordLimit: 2,
        items: [
          { q: 'Honeybees and wild bees compete for the same ___.', answer: 'flowers' },
          { q: 'When hives are too dense, wild species may lack ___.', answer: 'nectar', accepted: ['enough nectar'] },
          { q: 'Some cities therefore promote ___ along roads instead of more hives.', answer: 'wildflower meadows', why: '« wildflower meadows along roads ».' },
        ],
      },
    ],
  },
  {
    id: 'sleep',
    title: 'Sleep and the Teenage Brain',
    topic: 'Santé',
    level: 'C1',
    minutes: 15,
    fromGuide: true,
    paragraphs: [
      {
        label: 'A',
        gist: 'Une explication biologique au sommeil tardif',
        text: 'For decades, parents and teachers assumed that teenagers who stayed up late and struggled to get up in the morning were simply lazy. Research carried out since the 1990s suggests a different explanation. During puberty, the body begins to release melatonin, the hormone that makes us feel sleepy, around two hours later than it does in children or adults.',
      },
      {
        label: 'B',
        gist: 'Les cours commencent trop tôt',
        text: 'Dr Mary Carskadon, one of the pioneers in this field, found that most adolescents are not biologically ready to fall asleep before 11 p.m. Yet many schools begin classes before 8 a.m., which means that students regularly get far less than the eight to ten hours of sleep recommended for their age group.',
      },
      {
        label: 'C',
        gist: 'Les conséquences du manque de sommeil',
        text: 'The consequences go beyond tiredness. Studies have linked sleep loss in adolescence to poorer concentration, lower grades and higher rates of anxiety. One study in the United States also found that car accidents involving young drivers fell after a local school district moved its start time later.',
      },
      {
        label: 'D',
        gist: 'Les objections pratiques',
        text: 'Not everyone is convinced that changing school timetables is the answer. Some administrators point out that later start times create problems for bus schedules, after-school sports and parents’ working hours. Others argue that teenagers would simply go to bed even later if they knew they could sleep in.',
      },
      {
        label: 'E',
        gist: 'Les résultats de Seattle',
        text: 'However, the evidence so far suggests that this fear is exaggerated. In a study of schools in Seattle, researchers found that when classes started 55 minutes later, students slept an average of 34 minutes more each night. Attendance also improved. In my view, these results make a strong case for reconsidering how the school day is organised.',
      },
    ],
    sets: [
      {
        id: 'r4',
        title: 'Yes / No / Not Given',
        type: 'ynng',
        instruction: 'Do the following statements agree with the views of the writer?',
        tip: 'On cherche l’opinion de l’auteur : « In my view », « a different explanation », « exaggerated ».',
        items: [
          { q: 'Teenagers who wake up late are not necessarily lazy.', answer: 'Yes', why: 'Paragraphe A : « a different explanation ».' },
          { q: 'Schools should start classes after 10 a.m.', answer: 'Not Given', why: 'Aucune heure précise n’est proposée.' },
          { q: 'The results from Seattle support changing the school timetable.', answer: 'Yes', why: 'Paragraphe E : « a strong case for reconsidering ».' },
        ],
      },
      {
        id: 'r5',
        title: 'Matching information',
        type: 'match',
        instruction: 'Which paragraph contains the following information? Write the correct letter, A-E.',
        tip: 'Cherche un type d’information (une référence, des chiffres…), pas les mêmes mots.',
        options: [
          { key: 'A', text: 'Paragraph A' },
          { key: 'B', text: 'Paragraph B' },
          { key: 'C', text: 'Paragraph C' },
          { key: 'D', text: 'Paragraph D' },
          { key: 'E', text: 'Paragraph E' },
        ],
        items: [
          { q: 'a reference to an effect on road safety', answer: 'C', why: '« car accidents involving young drivers fell ».' },
          { q: 'practical objections to a proposed change', answer: 'D', why: 'Bus, sport, horaires des parents.' },
          { q: 'a biological explanation for late sleeping', answer: 'A', why: 'La mélatonine est libérée plus tard.' },
          { q: 'figures showing an increase in sleep time', answer: 'E', why: '« 34 minutes more each night ».' },
        ],
      },
      {
        id: 'r6',
        title: 'Matching sentence endings',
        type: 'match',
        instruction: 'Complete each sentence with the correct ending, A-D.',
        tip: 'Il y a une fin en trop : D n’est pas dans le texte sous cette forme.',
        options: [
          { key: 'A', text: 'because classes begin too early.' },
          { key: 'B', text: 'would cause difficulties with transport.' },
          { key: 'C', text: 'than in younger children.' },
          { key: 'D', text: 'improve teenagers’ exam results.' },
        ],
        items: [
          { q: 'Melatonin is released later in teenagers…', answer: 'C', why: '« around two hours later than it does in children or adults ».' },
          { q: 'Many students do not get enough sleep…', answer: 'A', why: '« many schools begin classes before 8 a.m. ».' },
          { q: 'Some administrators believe later start times…', answer: 'B', why: '« problems for bus schedules ».' },
        ],
      },
      {
        id: 'r7',
        title: 'Multiple choice',
        type: 'mcq',
        instruction: 'Choose the correct letter, A, B, C or D.',
        tip: 'A reprend « 55 minutes » du texte, mais avec un autre sens : c’est le piège.',
        items: [
          {
            q: 'According to the text, what happened in the Seattle study?',
            options: [
              { key: 'A', text: 'Students went to bed 55 minutes later.' },
              { key: 'B', text: 'Students slept just over half an hour longer.' },
              { key: 'C', text: 'Students’ grades improved immediately.' },
              { key: 'D', text: 'Bus schedules had to be changed.' },
            ],
            answer: 'B',
            why: '34 minutes = just over half an hour. A est un piège (55 minutes = le décalage des cours) ; C et D ne sont pas mentionnés pour Seattle.',
          },
        ],
      },
      {
        id: 'r8',
        title: 'Short answer',
        type: 'gap',
        instruction: 'Answer the questions. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.',
        wordLimit: 3,
        items: [
          { q: 'Which hormone causes sleepiness? ___', answer: 'melatonin' },
          { q: 'How many hours of sleep are recommended for teenagers? ___', answer: 'eight to ten', accepted: ['8-10', '8 to 10', '8–10', 'eight-ten'] },
          { q: 'Apart from sleep time, what improved in Seattle? ___', answer: 'attendance' },
        ],
      },
    ],
  },
  {
    id: 'fashion',
    title: 'The True Cost of Fast Fashion',
    topic: 'Environnement',
    level: 'C1',
    minutes: 20,
    paragraphs: [
      {
        label: 'A',
        gist: 'Plus de vêtements, portés moins longtemps',
        text: 'Over the past twenty years, the way people buy clothes has changed dramatically. Retailers now release new collections every few weeks rather than twice a year, and prices have fallen so far that a T-shirt can cost less than a sandwich. According to industry estimates, global clothing production roughly doubled between 2000 and 2014, while the average number of times a garment is worn before being thrown away fell by more than a third.',
      },
      {
        label: 'B',
        gist: 'L’eau, le pétrole et la pollution',
        text: 'The environmental consequences of this model are considerable. Cotton is a thirsty crop: producing the fibre for a single pair of jeans can require several thousand litres of water, much of it in regions already facing shortages. Synthetic fabrics such as polyester avoid this problem but are made from oil, and each wash releases tiny plastic fibres that eventually reach rivers and oceans. Dyeing and finishing processes add further pressure, as untreated waste water is sometimes released directly into local waterways.',
      },
      {
        label: 'C',
        gist: 'Les ouvriers du textile',
        text: 'The human cost is less visible to consumers but equally serious. Most garments are assembled in countries where labour is cheap and regulation is weak. The collapse of the Rana Plaza factory building in Bangladesh in 2013, which killed more than 1,100 workers, drew worldwide attention to unsafe conditions. Since then, many brands have signed agreements on building safety, although campaigners argue that wages in the sector remain far below what is needed to live decently.',
      },
      {
        label: 'D',
        gist: 'Les limites du recyclage',
        text: 'Recycling is often presented as the solution, yet it is more complicated than it appears. Less than one per cent of the material used to make clothing is currently recycled into new clothing. Many garments are made from blends of fibres that are difficult to separate, and mechanical recycling tends to shorten fibres, producing lower-quality yarn. Much of what is collected in clothing banks in Europe is in fact shipped abroad, where a significant share ends up in landfill.',
      },
      {
        label: 'E',
        gist: 'Acheter moins, garder plus longtemps',
        text: 'For this reason, a growing number of experts believe that the most effective change lies in buying less and keeping clothes for longer. Research by a British charity suggested that extending the active life of a garment by just nine months could reduce its carbon, water and waste footprint by 20 to 30 per cent. Repair services, rental platforms and second-hand marketplaces have expanded rapidly, particularly among younger shoppers.',
      },
      {
        label: 'F',
        gist: 'Les gouvernements commencent à agir',
        text: 'Governments are also beginning to act. France, for instance, has banned the destruction of unsold clothing and requires producers to contribute to the cost of collecting and treating textile waste. Whether such measures will be enough to slow the industry’s growth remains to be seen, but they mark a shift away from relying solely on consumers to make responsible choices.',
      },
    ],
    sets: [
      {
        id: 'f1',
        title: 'Matching headings',
        type: 'match',
        instruction: 'Choose the correct heading for paragraphs A-F. There are two extra headings.',
        tip: HEADINGS_TIP,
        options: [
          { key: 'i', text: 'A recycling system that falls short' },
          { key: 'ii', text: 'Faster production, shorter lives for clothes' },
          { key: 'iii', text: 'The pressure on natural resources' },
          { key: 'iv', text: 'Laws that share responsibility' },
          { key: 'v', text: 'The workers behind cheap clothing' },
          { key: 'vi', text: 'Wearing clothes for longer' },
          { key: 'vii', text: 'Why consumers prefer synthetic fabrics' },
          { key: 'viii', text: 'The rise of luxury brands' },
        ],
        items: [
          { q: 'Paragraph A', answer: 'ii', why: 'Production doublée, vêtements portés moins souvent.' },
          { q: 'Paragraph B', answer: 'iii', why: 'Eau, pétrole, pollution des rivières : les ressources naturelles. vii est un piège : le paragraphe parle du polyester, mais pas de ce que préfèrent les consommateurs.' },
          { q: 'Paragraph C', answer: 'v', why: '« The human cost », Rana Plaza, salaires.' },
          { q: 'Paragraph D', answer: 'i', why: '« Less than one per cent… recycled » : le recyclage ne suffit pas.' },
          { q: 'Paragraph E', answer: 'vi', why: '« keeping clothes for longer ».' },
          { q: 'Paragraph F', answer: 'iv', why: 'La France oblige les producteurs à payer : la responsabilité ne repose plus seulement sur les consommateurs.' },
        ],
      },
      {
        id: 'f2',
        title: 'True / False / Not Given',
        type: 'tfng',
        instruction: 'Do the following statements agree with the information given in the text?',
        tip: TFNG_TIP,
        items: [
          { q: 'Clothing retailers now launch new collections more often than in the past.', answer: 'True', why: '« every few weeks rather than twice a year ».' },
          { q: 'Producing polyester requires more water than producing cotton.', answer: 'False', why: 'Le polyester « avoid[s] this problem » : il évite justement le problème de l’eau.' },
          { q: 'After the Rana Plaza disaster, every clothing brand agreed to improve building safety.', answer: 'False', why: '« many brands », pas toutes.' },
          { q: 'Wages in the clothing sector have doubled since 2013.', answer: 'Not Given', why: 'Le texte dit que les salaires restent trop bas, sans donner leur évolution.' },
          { q: 'Most clothes collected in European clothing banks are turned into new garments in Europe.', answer: 'False', why: 'Une grande partie est « shipped abroad », et moins de 1 % devient de nouveaux vêtements.' },
          { q: 'The growth of second-hand marketplaces has been especially strong among young people.', answer: 'True', why: '« particularly among younger shoppers ».' },
        ],
      },
      {
        id: 'f3',
        title: 'Summary completion',
        type: 'gap',
        instruction: 'Complete the summary. Use NO MORE THAN TWO WORDS from the text for each answer.',
        wordLimit: 2,
        items: [
          { q: 'Recycling is difficult because many garments contain ___ of fibres that are hard to separate.', answer: 'blends' },
          { q: 'Mechanical recycling produces yarn of ___.', answer: 'lower quality', accepted: ['lower-quality'], why: 'Le texte dit « lower-quality yarn » : on garde les mots du texte.' },
          { q: 'France has banned the ___ of unsold clothing.', answer: 'destruction' },
        ],
      },
      {
        id: 'f4',
        title: 'Chasse aux paraphrases',
        type: 'match',
        instruction: 'Match each statement with the phrase from the text that expresses the same idea.',
        tip: 'À l’examen, les questions ne reprennent presque jamais les mots du texte : elles le reformulent.',
        options: [
          { key: 'A', text: 'the average number of times a garment is worn… fell' },
          { key: 'B', text: 'Cotton is a thirsty crop' },
          { key: 'C', text: 'each wash releases tiny plastic fibres' },
          { key: 'D', text: 'drew worldwide attention to unsafe conditions' },
          { key: 'E', text: 'Less than one per cent… is currently recycled into new clothing' },
          { key: 'F', text: 'extending the active life of a garment' },
          { key: 'G', text: 'banned the destruction of unsold clothing' },
          { key: 'H', text: 'Repair services, rental platforms and second-hand marketplaces have expanded' },
        ],
        items: [
          { q: 'Clothes are used fewer times than before.', answer: 'A' },
          { q: 'Growing this plant needs a lot of water.', answer: 'B' },
          { q: 'Laundering synthetic clothes pollutes the sea.', answer: 'C' },
          { q: 'The disaster made people around the world aware of dangerous factories.', answer: 'D' },
          { q: 'Almost no old clothing becomes new clothing.', answer: 'E' },
          { q: 'keeping clothes in use for longer', answer: 'F' },
          { q: 'Shops can no longer get rid of stock they could not sell.', answer: 'G' },
          { q: 'People increasingly mend, borrow or buy used clothes.', answer: 'H' },
        ],
      },
    ],
  },
  {
    id: 'roads',
    title: 'Roads That Outlived an Empire',
    topic: 'Histoire',
    level: 'C1',
    minutes: 20,
    paragraphs: [
      {
        label: 'A',
        gist: 'Un réseau immense, encore utilisé',
        text: 'At its height, the Roman Empire was connected by more than 80,000 kilometres of paved roads, stretching from northern Britain to the Middle East. Many of these routes are still in use today, buried beneath modern roads, and a few original stretches can still be walked. Their survival over two thousand years raises an obvious question: how did Roman engineers build roads that lasted so much longer than many modern ones?',
      },
      {
        label: 'B',
        gist: 'Une construction en couches',
        text: 'The answer lies partly in their construction. A major Roman road was not a single surface but a structure of several layers. Workers first dug a trench down to firm ground, sometimes more than a metre deep. They then filled it with large stones, followed by smaller stones mixed with lime mortar, and finally a layer of fine gravel or sand on which flat paving stones were laid. This layered design spread the weight of traffic and allowed water to drain away, which is the main enemy of any road.',
      },
      {
        label: 'C',
        gist: 'Une surface bombée, des ponts en pierre',
        text: 'The surface itself was carefully shaped. Roads were built with a slight curve, higher in the centre than at the edges, so that rainwater ran off into ditches on either side. In marshy areas, engineers raised the whole road on an embankment, and where rivers had to be crossed, they built stone bridges, several of which are still standing in Spain and France.',
      },
      {
        label: 'D',
        gist: 'Des routes droites pour l’armée',
        text: 'Roman roads were also famous for being straight. Surveyors used a simple instrument called a groma, a vertical staff with two crossed arms from which weights hung, to mark out lines over long distances. Straight routes were not always the easiest to build, but they were the shortest, and speed mattered: the roads were designed first and foremost to move armies and official messengers quickly across the empire.',
      },
      {
        label: 'E',
        gist: 'Un coût humain et un outil de contrôle',
        text: 'Not everyone benefited equally. Building and repairing roads required enormous amounts of labour, much of it provided by soldiers, but also by local communities who were obliged to maintain the sections that passed through their land. Some historians argue that the roads did as much to control conquered peoples as to connect them, since they allowed troops to reach any rebellion within days.',
      },
      {
        label: 'F',
        gist: 'Des effets positifs jusqu’à aujourd’hui',
        text: 'Nevertheless, the long-term effects were largely positive. Merchants, pilgrims and ideas travelled along the same routes as soldiers, and towns grew up at crossroads and river crossings. A study published in 2018 even found that areas of Europe which had a denser network of Roman roads tend to be more economically developed today, suggesting that the investment continued to pay off long after the empire collapsed.',
      },
    ],
    sets: [
      {
        id: 'ro1',
        title: 'Matching information',
        type: 'match',
        instruction: 'Which paragraph contains the following information? Write the correct letter, A-F.',
        tip: 'Ces questions ne suivent pas l’ordre du texte.',
        options: ['A', 'B', 'C', 'D', 'E', 'F'].map((k) => ({ key: k, text: `Paragraph ${k}` })),
        items: [
          { q: 'a description of a tool used to plan routes', answer: 'D', why: 'Le groma.' },
          { q: 'an explanation of how roads were adapted to wet ground', answer: 'C', why: '« In marshy areas… on an embankment ».' },
          { q: 'evidence of an effect that can still be measured today', answer: 'F', why: 'L’étude de 2018 sur le développement économique actuel.' },
          { q: 'a reference to people who were required to work on the roads', answer: 'E', why: '« local communities who were obliged to maintain… ».' },
          { q: 'an estimate of the total length of the network', answer: 'A', why: '« more than 80,000 kilometres ».' },
        ],
      },
      {
        id: 'ro2',
        title: 'Multiple choice',
        type: 'mcq',
        instruction: 'Choose the correct letter, A, B, C or D.',
        items: [
          {
            q: 'According to paragraph B, the main purpose of the layered structure was to',
            options: [
              { key: 'A', text: 'make the road look impressive.' },
              { key: 'B', text: 'reduce the amount of stone needed.' },
              { key: 'C', text: 'spread the weight and let water drain away.' },
              { key: 'D', text: 'allow workers to build faster.' },
            ],
            answer: 'C',
            why: '« This layered design spread the weight of traffic and allowed water to drain away ».',
          },
          {
            q: 'Why were Roman roads usually built in straight lines?',
            options: [
              { key: 'A', text: 'Straight roads were the easiest to build.' },
              { key: 'B', text: 'The groma could only measure straight lines.' },
              { key: 'C', text: 'Armies and messengers needed to travel quickly.' },
              { key: 'D', text: 'Merchants demanded the shortest routes.' },
            ],
            answer: 'C',
            why: 'A est contredit (« not always the easiest to build ») ; les marchands ne sont cités qu’au paragraphe F.',
          },
        ],
      },
      {
        id: 'ro3',
        title: 'Matching sentence endings',
        type: 'match',
        instruction: 'Complete each sentence with the correct ending, A-F.',
        tip: 'Élimine d’abord les fins impossibles grammaticalement ou logiquement.',
        options: [
          { key: 'A', text: 'allowed rainwater to run into ditches.' },
          { key: 'B', text: 'helped the empire keep conquered regions under control.' },
          { key: 'C', text: 'where roads met or crossed rivers.' },
          { key: 'D', text: 'because soldiers refused to repair them.' },
          { key: 'E', text: 'made travel impossible in winter.' },
          { key: 'F', text: 'were mainly used by pilgrims.' },
        ],
        items: [
          { q: 'The curved surface of the roads…', answer: 'A' },
          { q: 'Some historians believe that the roads…', answer: 'B', why: '« did as much to control conquered peoples as to connect them ».' },
          { q: 'New towns often developed…', answer: 'C', why: '« at crossroads and river crossings ».' },
        ],
      },
    ],
  },
  {
    id: 'fourday',
    title: 'Is the Four-Day Week the Future of Work?',
    topic: 'Travail',
    level: 'C1',
    minutes: 20,
    paragraphs: [
      {
        label: 'A',
        gist: 'Un essai britannique surprenant',
        text: 'When a group of British companies agreed in 2022 to let their staff work four days a week for the same pay, many observers expected chaos. Instead, the six-month trial, which involved around 2,900 employees at 61 organisations, produced results that surprised even its organisers. By the end, 56 of the companies had decided to continue, and 18 had made the change permanent.',
      },
      {
        label: 'B',
        gist: 'Le principe 100-80-100',
        text: 'The basic idea is simple: employees keep 100 per cent of their salary and commit to delivering 100 per cent of their output, but in 80 per cent of the time. Supporters argue that much of the traditional working week is wasted on unnecessary meetings and distractions, and that rested employees work more efficiently. In my view, this is the most convincing part of the argument, since it treats productivity rather than hours as the true measure of work.',
      },
      {
        label: 'C',
        gist: 'Moins de stress, plus de temps libre',
        text: 'Dr Helen Marsh, a sociologist who interviewed many of the participants, found that most employees reported lower levels of stress and burnout. She also noted that people used their extra day for exercise, hobbies and family life rather than taking on a second job. Similar results had already been reported in Iceland, where public-sector trials between 2015 and 2019 were widely described as a success.',
      },
      {
        label: 'D',
        gist: 'Une objection : tous les métiers ne s’y prêtent pas',
        text: 'Not everyone is convinced. Professor Daniel Okafor, an economist, points out that the companies which took part volunteered to do so, and were therefore likely to be those best suited to the change. He warns that the model is much harder to apply in hospitals, schools or factories, where much of the work cannot simply be done faster. It is a fair point, but it seems to me an argument for adapting the idea to each sector rather than abandoning it altogether.',
      },
      {
        label: 'E',
        gist: 'L’organisation fait la différence',
        text: 'Others worry about the effect on customers. Sara Lindgren, a management consultant, has observed that some firms solved the problem by organising staff in shifts, so that the office remained open five days a week even though each employee worked only four. She believes that this kind of careful planning, rather than the extra day off itself, explains why some trials succeed and others fail.',
      },
      {
        label: 'F',
        gist: 'Une évolution possible, pas immédiate',
        text: 'It would be unrealistic to expect every organisation to adopt a four-day week in the near future. Yet the evidence so far suggests that the five-day week, which itself only became standard in the twentieth century, is not a law of nature. Unfortunately, the debate is often presented as a choice between productivity and well-being, when the trials show that the two can go together.',
      },
    ],
    sets: [
      {
        id: 'fd1',
        title: 'Yes / No / Not Given',
        type: 'ynng',
        instruction: 'Do the following statements agree with the views of the writer?',
        tip: 'Repère les marqueurs d’opinion : « In my view », « it seems to me », « Unfortunately ».',
        items: [
          { q: 'Productivity is a better measure of work than the number of hours worked.', answer: 'Yes', why: '« it treats productivity rather than hours as the true measure of work » : l’auteur trouve cet argument convaincant.' },
          { q: 'The four-day week should be abandoned in hospitals and schools.', answer: 'No', why: '« an argument for adapting the idea… rather than abandoning it ».' },
          { q: 'All organisations will soon switch to a four-day week.', answer: 'No', why: '« It would be unrealistic to expect every organisation to adopt a four-day week in the near future ».' },
          { q: 'Employees on a four-day week should receive a pay rise.', answer: 'Not Given', why: 'L’auteur ne donne aucun avis sur une augmentation.' },
          { q: 'The debate about the four-day week is often presented in a misleading way.', answer: 'Yes', why: '« Unfortunately, the debate is often presented as a choice… when the trials show that the two can go together ».' },
        ],
      },
      {
        id: 'fd2',
        title: 'Matching features',
        type: 'match',
        instruction: 'Match each statement with the correct person, A-C. You may use any letter more than once.',
        tip: 'Entoure d’abord chaque nom dans le texte.',
        options: [
          { key: 'A', text: 'Helen Marsh' },
          { key: 'B', text: 'Daniel Okafor' },
          { key: 'C', text: 'Sara Lindgren' },
        ],
        items: [
          { q: 'Employees spent their free day on personal activities.', answer: 'A' },
          { q: 'The companies in the trial may not represent the economy as a whole.', answer: 'B', why: '« volunteered… likely to be those best suited ».' },
          { q: 'The way working time is organised matters more than the day off itself.', answer: 'C' },
          { q: 'Some jobs cannot be done more quickly.', answer: 'B', why: '« work cannot simply be done faster ».' },
        ],
      },
      {
        id: 'fd3',
        title: 'Short answer',
        type: 'gap',
        instruction: 'Answer the questions. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.',
        wordLimit: 3,
        items: [
          { q: 'How many organisations took part in the British trial? ___', answer: '61', accepted: ['sixty-one', 'sixty one'] },
          { q: 'In which country were public-sector trials held between 2015 and 2019? ___', answer: 'Iceland' },
          { q: 'What did some firms organise their staff in, so that offices stayed open five days a week? ___', answer: 'shifts' },
          { q: 'In which century did the five-day week become standard? ___', answer: 'the twentieth century', accepted: ['twentieth century', '20th century', 'the 20th century', 'twentieth', '20th'] },
        ],
      },
    ],
  },
  {
    id: 'languages',
    title: 'Saving Languages from Silence',
    topic: 'Société',
    level: 'C2',
    minutes: 23,
    paragraphs: [
      {
        label: 'A',
        gist: 'L’ampleur du problème',
        text: 'Of the roughly 7,000 languages spoken in the world today, around 40 per cent are considered endangered, according to the Ethnologue database. Many have fewer than a thousand speakers, most of them elderly. Some linguists claim that a language disappears roughly every two weeks, although this figure is debated, and the loss usually goes unnoticed outside the community concerned.',
      },
      {
        label: 'B',
        gist: 'Un abandon progressif',
        text: 'The causes are rarely sudden. In most cases, a community gradually shifts towards a dominant language that offers better access to education, jobs and the media. Parents may choose not to pass on their own language, believing that it will hold their children back. Within two or three generations, the original language can survive only in songs, prayers and the memories of the oldest speakers.',
      },
      {
        label: 'C',
        gist: 'Un savoir et une identité menacés',
        text: 'Why should this matter to anyone outside that community? One answer is that every language contains knowledge that exists nowhere else. Indigenous languages often have precise vocabulary for local plants, animals and weather patterns, and researchers in medicine and ecology have used this knowledge to identify useful species. Another answer is that language is closely tied to identity: for many communities, losing their language means losing a connection to their history.',
      },
      {
        label: 'D',
        gist: 'Des langues qui renaissent',
        text: 'Revival is difficult but not impossible. The best-known example is Hebrew, which was used for centuries mainly in religious texts before becoming the everyday language of millions of people in the twentieth century. Welsh is now taught to every schoolchild in Wales and has its own television channel. In New Zealand, “language nests”, pre-schools where children are taught entirely in Māori, have been copied in other countries.',
      },
      {
        label: 'E',
        gist: 'La technologie aide, sans suffire',
        text: 'Technology offers new tools. Linguists now record elderly speakers on video, and communities have created dictionaries, keyboards and even social media groups in their languages. Yet recording a language is not the same as keeping it alive. As one researcher put it, a language survives only if children use it in the playground.',
      },
      {
        label: 'F',
        gist: 'Tout dépend des familles',
        text: 'Ultimately, the future of a language depends on the choices of its speakers. Outside support can provide funding and teaching materials, but it cannot replace the decision of families to speak the language at home. For this reason, the most successful projects are those led by the communities themselves.',
      },
    ],
    sets: [
      {
        id: 'la1',
        title: 'Matching headings',
        type: 'match',
        instruction: 'Choose the correct heading for paragraphs A-F. There are two extra headings.',
        tip: HEADINGS_TIP,
        options: [
          { key: 'i', text: 'A gradual change across generations' },
          { key: 'ii', text: 'The scale of the problem' },
          { key: 'iii', text: 'Knowledge and identity at stake' },
          { key: 'iv', text: 'Languages that have come back' },
          { key: 'v', text: 'Digital help and its limits' },
          { key: 'vi', text: 'The decisive role of families' },
          { key: 'vii', text: 'Why dominant languages are easier to learn' },
          { key: 'viii', text: 'The cost of translation services' },
        ],
        items: [
          { q: 'Paragraph A', answer: 'ii' },
          { q: 'Paragraph B', answer: 'i', why: '« gradually », « within two or three generations ». vii est un piège : le texte parle d’accès à l’emploi, pas de facilité d’apprentissage.' },
          { q: 'Paragraph C', answer: 'iii' },
          { q: 'Paragraph D', answer: 'iv', why: 'L’hébreu, le gallois, le maori.' },
          { q: 'Paragraph E', answer: 'v', why: '« recording a language is not the same as keeping it alive ».' },
          { q: 'Paragraph F', answer: 'vi', why: '« the decision of families to speak the language at home ».' },
        ],
      },
      {
        id: 'la2',
        title: 'True / False / Not Given',
        type: 'tfng',
        instruction: 'Do the following statements agree with the information given in the text?',
        tip: TFNG_TIP,
        items: [
          { q: 'More than half of the world’s languages are endangered.', answer: 'False', why: '« around 40 per cent ».' },
          { q: 'Some parents stop using their language with their children because they see it as a disadvantage.', answer: 'True', why: '« believing that it will hold their children back ».' },
          { q: 'Scientists have developed new medicines thanks to indigenous vocabulary.', answer: 'Not Given', why: 'Le texte dit « identify useful species », pas « développer des médicaments ».' },
          { q: 'Hebrew was spoken as an everyday language throughout the Middle Ages.', answer: 'False', why: '« used for centuries mainly in religious texts ».' },
          { q: 'Language nests were first created in Wales.', answer: 'False', why: 'Ils viennent de Nouvelle-Zélande et ont été copiés ailleurs.' },
          { q: 'Video recordings are enough to keep a language alive.', answer: 'False', why: '« recording a language is not the same as keeping it alive ».' },
        ],
      },
      {
        id: 'la3',
        title: 'Summary completion (liste de mots)',
        type: 'match',
        instruction: 'Complete the summary using the list of words, A-H.',
        tip: 'Les mots de la liste sont souvent des paraphrases du texte.',
        options: [
          { key: 'A', text: 'history' },
          { key: 'B', text: 'opportunities' },
          { key: 'C', text: 'funding' },
          { key: 'D', text: 'led' },
          { key: 'E', text: 'technology' },
          { key: 'F', text: 'recorded' },
          { key: 'G', text: 'schools' },
          { key: 'H', text: 'weather' },
        ],
        items: [
          { q: 'Communities usually move towards a language that offers more ___.', answer: 'B', why: '« better access to education, jobs and the media » = more opportunities.' },
          { q: 'Losing a language can mean losing a link with the community’s ___.', answer: 'A' },
          { q: 'The most successful projects are ___ by the speakers themselves.', answer: 'D', why: '« led by the communities themselves ». F (recorded) est un piège venu du paragraphe E.' },
        ],
      },
    ],
  },
  {
    id: 'stink',
    title: 'The Great Stink of 1858',
    topic: 'Histoire des sciences',
    level: 'B2',
    minutes: 10,
    paragraphs: [
      {
        label: 'A',
        gist: 'L’été où la Tamise a empesté Londres',
        text: 'In the summer of 1858, London experienced what newspapers called “the Great Stink”. For decades, the city’s waste had flowed almost directly into the River Thames, which was also a major source of drinking water. That year, an unusually hot and dry summer lowered the level of the river, and the smell became so strong that the curtains of the Houses of Parliament were soaked in chemicals in an attempt to protect politicians from it.',
      },
      {
        label: 'B',
        gist: 'Une fausse théorie, une vraie décision',
        text: 'At the time, many doctors believed that diseases such as cholera were spread by bad air, known as “miasma”. This theory was wrong, but it had an important consequence: because politicians feared the air itself, they finally agreed to fund a solution. Within weeks, Parliament approved a plan proposed by the engineer Joseph Bazalgette.',
      },
      {
        label: 'C',
        gist: 'Les égouts de Bazalgette',
        text: 'Bazalgette designed a network of large brick sewers that intercepted waste before it reached the river in central London and carried it east, where it was released further downstream. The project took around sixteen years to complete and required more than 300 million bricks. Bazalgette made the main tunnels larger than his calculations required, arguing that the city’s population would continue to grow. His decision proved wise: much of the system is still in use today.',
      },
      {
        label: 'D',
        gist: 'John Snow avait raison trop tôt',
        text: 'Cholera outbreaks in London became much rarer after the sewers were built, although it took several more years for scientists to accept that the disease was carried by contaminated water rather than by air. The physician John Snow had suggested this idea as early as 1854, after tracing many cases to a single public water pump in Soho, but he died in 1858, before his theory was widely accepted.',
      },
    ],
    sets: [
      {
        id: 'st1',
        title: 'TFNG ciblé (10 affirmations)',
        type: 'tfng',
        instruction: 'Do the following statements agree with the information given in the text?',
        tip: 'Pour chaque « Not Given », demande-toi : est-ce que je peux montrer la phrase qui dit le contraire ? Si non, ce n’est pas False.',
        items: [
          { q: 'The Thames provided drinking water for Londoners in the 1850s.', answer: 'True', why: '« also a major source of drinking water ».' },
          { q: 'The summer of 1858 was wetter than usual.', answer: 'False', why: '« an unusually hot and dry summer ».' },
          { q: 'Politicians left London to escape the smell.', answer: 'Not Given', why: 'Le texte parle des rideaux trempés dans des produits chimiques, pas d’un départ. Rien ne le confirme ni ne le contredit.' },
          { q: 'Most doctors in 1858 understood how cholera spread.', answer: 'False', why: 'Beaucoup croyaient au « miasma », une théorie fausse.' },
          { q: 'Fear of bad air helped persuade Parliament to pay for new sewers.', answer: 'True', why: '« because politicians feared the air itself, they finally agreed to fund a solution ».' },
          { q: 'Bazalgette’s plan was approved several years after the Great Stink.', answer: 'False', why: '« Within weeks ».' },
          { q: 'The sewers carried waste away from central London towards the east.', answer: 'True', why: '« carried it east ».' },
          { q: 'Bazalgette’s sewers cost more than any other Victorian project.', answer: 'Not Given', why: 'Le texte donne la durée et le nombre de briques, mais aucun coût ni comparaison.' },
          { q: 'The tunnels were built bigger than the population of the time required.', answer: 'True', why: '« larger than his calculations required… population would continue to grow ».' },
          { q: 'John Snow received an award for his discovery before he died.', answer: 'Not Given', why: 'On sait que sa théorie n’était pas encore acceptée, mais le texte ne parle d’aucun prix. Piège : on est tenté de répondre False par déduction.' },
        ],
      },
    ],
  },
]

export const PASSAGE_BY_ID: Record<string, Passage> = Object.fromEntries(PASSAGES.map((p) => [p.id, p]))

export function passageWords(p: Passage): number {
  return p.paragraphs.reduce((n, x) => n + x.text.split(/\s+/).length, 0)
}
