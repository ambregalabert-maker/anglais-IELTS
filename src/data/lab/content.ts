// Vocab Lab : collocations académiques, paraphrases, synonymes par niveau, registre, expressions et orthographe.

import type { Cloze, Word } from '../vocab/types'

// ---------- Collocations académiques (en plus de celles des unités du chemin) ----------
export const COLLOCATIONS: Cloze[] = [
  { s: 'Scientists ___ research into the causes of the disease.', a: 'conducted', opts: ['made', 'did up', 'drove'], why: '« conduct / carry out research ».', kind: 'collocation' },
  { s: 'The campaign aims to ___ awareness of mental health issues.', a: 'raise', opts: ['rise', 'lift up', 'grow'], why: '« raise awareness » = sensibiliser. « rise » ne prend pas de complément.', kind: 'collocation' },
  { s: 'From these results, we can ___ a clear conclusion.', a: 'draw', opts: ['pull', 'make up', 'take out'], why: '« draw a conclusion » = tirer une conclusion.', kind: 'collocation' },
  { s: 'Parents ___ a crucial role in their children’s education.', a: 'play', opts: ['make', 'do', 'have on'], why: '« play a role in » = jouer un rôle dans.', kind: 'collocation' },
  { s: 'Governments must ___ urgent measures to reduce emissions.', a: 'take', opts: ['make', 'do', 'put'], why: '« take measures / take action ».', kind: 'collocation' },
  { s: 'It is difficult to ___ a balance between work and family.', a: 'strike', opts: ['hit on', 'make', 'beat'], why: '« strike a balance » = trouver le juste équilibre.', kind: 'collocation' },
  { s: 'Farmers cannot ___ the growing demand for organic food.', a: 'meet', opts: ['reach', 'fill', 'answer'], why: '« meet demand » = répondre à la demande.', kind: 'collocation' },
  { s: 'The report fails to ___ the issue of rising rents.', a: 'address', opts: ['adress', 'speak', 'answer to'], why: '« address an issue » = traiter un problème. Orthographe : address.', kind: 'collocation' },
  { s: 'After long negotiations, the countries ___ a consensus.', a: 'reached', opts: ['arrived', 'got to on', 'touched'], why: '« reach a consensus / an agreement ».', kind: 'collocation' },
  { s: 'Free courses could help ___ the gap between rich and poor.', a: 'bridge', opts: ['cross', 'close up', 'jump'], why: '« bridge / narrow / close the gap ».', kind: 'collocation' },
  { s: 'The new law ___ a significant impact on road safety.', a: 'had', opts: ['made', 'did', 'gave'], why: '« have an impact on ».', kind: 'collocation' },
  { s: 'Social media can ___ harm to teenagers’ self-esteem.', a: 'do', opts: ['make', 'cause up', 'give'], why: '« do harm / do damage » (ou « cause harm »).', kind: 'collocation' },
  { s: 'Politicians should ___ attention to young voters.', a: 'pay', opts: ['give up', 'make', 'put on'], why: '« pay attention to ».', kind: 'collocation' },
  { s: 'There is a ___ concern about the cost of living.', a: 'growing', opts: ['rising up', 'big', 'tall'], why: '« a growing concern » = une inquiétude croissante.', kind: 'collocation' },
  { s: 'This is a ___ misconception: vaccines do not cause autism.', a: 'common', opts: ['usual', 'ordinary', 'frequent of'], why: '« a common misconception » = une idée reçue répandue.', kind: 'collocation' },
  { s: 'Unemployment has reached a ___ high.', a: 'record', opts: ['recorded', 'historic of', 'top'], why: '« a record high / low » = un niveau record.', kind: 'collocation' },
  { s: 'The policy had ___ consequences for small businesses.', a: 'far-reaching', opts: ['far-going', 'long-reaching', 'wide-going'], why: '« far-reaching consequences » = des conséquences de grande portée.', kind: 'collocation' },
  { s: 'Experts ___ a warning about rising sea levels.', a: 'issued', opts: ['made out', 'gave out of', 'threw'], why: '« issue a warning » = lancer un avertissement.', kind: 'collocation' },
  { s: 'The government has ___ a ban on single-use plastic.', a: 'imposed', opts: ['put on', 'made', 'set off'], why: '« impose a ban on » (ou « introduce a ban »).', kind: 'collocation' },
  { s: 'Older people ___ a significant proportion of the population.', a: 'constitute', opts: ['construct', 'consist', 'make of'], why: '« constitute » = constituer. « consist of » demande « of ».', kind: 'collocation' },
  { s: 'The study ___ light on the causes of obesity.', a: 'sheds', opts: ['throws off', 'puts', 'makes'], why: '« shed / throw light on » = éclairer, faire la lumière sur.', kind: 'collocation' },
  { s: 'Online learning ___ new opportunities for adults.', a: 'opens up', opts: ['opens out', 'makes up', 'turns on'], why: '« open up opportunities ».', kind: 'collocation' },
  { s: 'We should not ___ these risks lightly.', a: 'take', opts: ['make', 'have', 'do'], why: '« take something lightly » = prendre à la légère.', kind: 'collocation' },
  { s: 'This trend is likely to ___ in the coming years.', a: 'continue', opts: ['pursue', 'follow on', 'keep'], why: '« continue » est intransitif ici. « pursue » demande un complément.', kind: 'collocation' },
]

// ---------- Paraphrase : quelle phrase a le même sens ? ----------
export interface Paraphrase {
  original: string
  correct: string
  wrong: string[]
  why: string
}

export const PARAPHRASES: Paraphrase[] = [
  { original: 'The number of people who own cars has risen.', correct: 'Car ownership has increased.', wrong: ['Fewer people now own cars.', 'Cars have become more expensive.'], why: '« car ownership » est la forme nominale de « people who own cars ».' },
  { original: 'Many young people cannot afford to buy a house.', correct: 'Home ownership is out of reach for many young adults.', wrong: ['Young people do not want to buy houses.', 'Houses are bought mainly by young people.'], why: '« out of reach » = inaccessible (financièrement).' },
  { original: 'The museum is closed on Mondays.', correct: 'The museum does not open at the start of the week.', wrong: ['The museum opens only on Mondays.', 'The museum closes early on Mondays.'], why: 'Typique du Listening : la réponse est reformulée.' },
  { original: 'It is essential that governments invest in renewable energy.', correct: 'Investment in green energy is vital.', wrong: ['Governments have invested enough in renewables.', 'Renewable energy is too expensive to develop.'], why: '« essential » ≈ « vital », « renewable » ≈ « green ».' },
  { original: 'Obesity rates have doubled since 1990.', correct: 'Twice as many people are obese today as in 1990.', wrong: ['Obesity has fallen by half since 1990.', 'Obesity was twice as common in 1990.'], why: '« doubled » = « twice as many ».' },
  { original: 'Despite the cost, most people support the project.', correct: 'Although it is expensive, the project has majority support.', wrong: ['Most people oppose the project because of its cost.', 'The project is cheap, so most people support it.'], why: '« despite + nom » = « although + proposition ».' },
  { original: 'The tour lasts approximately two hours.', correct: 'The tour takes around 120 minutes.', wrong: ['The tour starts at two o’clock.', 'There are two tours every hour.'], why: 'Listening : « approximately » = « around », deux heures = 120 minutes.' },
  { original: 'Children who read regularly tend to do better at school.', correct: 'Frequent reading is associated with higher academic achievement.', wrong: ['Children who do well at school stop reading.', 'Reading has no link with school results.'], why: 'Nominalisation : « children who read regularly » → « frequent reading ».' },
  { original: 'The bridge was built to reduce traffic in the town centre.', correct: 'The aim of the bridge was to ease congestion downtown.', wrong: ['The bridge caused more traffic in the centre.', 'The town centre was closed to build the bridge.'], why: '« reduce traffic » ≈ « ease congestion ».' },
  { original: 'Few students chose to study languages.', correct: 'Languages were an unpopular choice among students.', wrong: ['Most students studied several languages.', 'Students were not allowed to study languages.'], why: '« few » = peu (sens négatif). « a few » = quelques-uns (sens positif).' },
  { original: 'The government plans to raise taxes on sugary drinks.', correct: 'Sugary drinks are set to become more heavily taxed.', wrong: ['Taxes on sugary drinks will be removed.', 'The government will ban sugary drinks.'], why: '« be set to » = être sur le point de. « raise taxes » ≈ « more heavily taxed ».' },
  { original: 'Unemployment remained stable throughout the decade.', correct: 'The jobless rate stayed at the same level for ten years.', wrong: ['Unemployment fluctuated over the decade.', 'Unemployment fell steadily over ten years.'], why: '« unemployment » ≈ « jobless rate », « remained stable » ≈ « stayed at the same level ».' },
  { original: 'Applications must be submitted by 5 p.m. on Friday.', correct: 'The deadline for applications is Friday at five in the afternoon.', wrong: ['Applications open on Friday at 5 p.m.', 'You can apply any time after Friday.'], why: 'Listening : « submitted by » = date limite.' },
  { original: 'Older people are more vulnerable to the effects of heatwaves.', correct: 'The elderly are particularly susceptible to extreme heat.', wrong: ['Heatwaves mainly affect young people.', 'Older people enjoy hot weather more.'], why: '« vulnerable to » ≈ « susceptible to ».' },
  { original: 'The scheme was abandoned due to a lack of funding.', correct: 'The project was dropped because there was not enough money.', wrong: ['The scheme received too much funding.', 'The project continued despite funding problems.'], why: '« abandoned » ≈ « dropped », « a lack of funding » ≈ « not enough money ».' },
  { original: 'Most participants found the course useful.', correct: 'The majority of attendees considered the course worthwhile.', wrong: ['Only a few participants liked the course.', 'The course was cancelled after complaints.'], why: '« most » ≈ « the majority of », « useful » ≈ « worthwhile ».' },
  { original: 'Advertising aimed at children should be restricted.', correct: 'There should be limits on marketing that targets young people.', wrong: ['Children should be taught to advertise.', 'All advertising should be banned.'], why: '« aimed at » ≈ « targets », « restricted » ≈ « limits ».' },
  { original: 'This method is far less expensive than the traditional one.', correct: 'This approach is considerably cheaper than the conventional one.', wrong: ['This method costs slightly more.', 'Both methods cost the same.'], why: '« far less expensive » ≈ « considerably cheaper », « traditional » ≈ « conventional ».' },
  { original: 'The library will be refurbished next year.', correct: 'The library is going to be renovated in the coming year.', wrong: ['A new library will be built next year.', 'The library closed last year.'], why: 'Listening : « refurbished » ≈ « renovated ».' },
  { original: 'Exercise reduces the risk of heart disease.', correct: 'Physical activity lowers the likelihood of cardiac problems.', wrong: ['Exercise can cause heart disease.', 'Heart disease prevents people from exercising.'], why: '« reduces the risk » ≈ « lowers the likelihood ».' },
]

// ---------- Synonymes par niveau : remplacer un mot trop simple ----------
export interface Upgrade {
  basic: string
  s: string // phrase avec le mot simple entre crochets [ ]
  a: string // meilleur remplacement dans ce contexte
  opts: string[] // remplacements qui ne conviennent pas ici
  why: string
}

export const UPGRADES: Upgrade[] = [
  { basic: 'good', s: 'Regular exercise has a [good] effect on mental health.', a: 'beneficial', opts: ['tasty', 'skilful', 'kind-hearted'], why: 'good → positive → beneficial (C1). « beneficial effect » est une collocation académique.' },
  { basic: 'bad', s: 'Pollution has a [bad] impact on children’s health.', a: 'detrimental', opts: ['naughty', 'rotten', 'evil'], why: 'bad → negative → harmful → detrimental (C2).' },
  { basic: 'big', s: 'Unemployment is a [big] problem in the region.', a: 'major', opts: ['tall', 'fat', 'wide'], why: 'big → major / significant / serious. « tall » = grand de taille.' },
  { basic: 'important', s: 'Teachers play an [important] role in society.', a: 'pivotal', opts: ['substantial', 'heavy', 'massive'], why: 'important → crucial → pivotal (C2). « substantial » = important en quantité.' },
  { basic: 'show', s: 'The graph [shows] a steady rise in sales.', a: 'illustrates', opts: ['exhibits', 'performs', 'displays off'], why: 'show → illustrate / depict / reveal. Très utile en Task 1.' },
  { basic: 'think', s: 'Many experts [think] that the policy will fail.', a: 'maintain', opts: ['ponder', 'imagine', 'dream'], why: 'think → believe → maintain / contend (C1-C2) : affirmer une opinion.' },
  { basic: 'a lot of', s: 'The project requires [a lot of] money.', a: 'a substantial amount of', opts: ['a large number of', 'many', 'plenty'], why: '« money » est indénombrable : « a substantial amount of ». « a large number of » est pour le dénombrable.' },
  { basic: 'get', s: 'Students can [get] valuable experience abroad.', a: 'gain', opts: ['win', 'earn up', 'catch'], why: 'get → obtain / gain / acquire. « gain experience ».' },
  { basic: 'help', s: 'Volunteers [help] elderly people with their shopping.', a: 'assist', opts: ['attend', 'aid off', 'serve up'], why: 'help → assist / support. Attention : « attend » = assister à.' },
  { basic: 'need', s: 'Cities [need] better public transport.', a: 'require', opts: ['request', 'require of', 'acquire'], why: 'need → require. « request » = demander.' },
  { basic: 'make worse', s: 'Social media can [make] loneliness [worse].', a: 'exacerbate', opts: ['exaggerate', 'excavate', 'exhilarate'], why: 'make worse → aggravate → exacerbate (C2).' },
  { basic: 'go up', s: 'House prices continued to [go up].', a: 'rise', opts: ['raise', 'arise', 'rose'], why: 'go up → rise / increase / climb. « raise » est transitif (raise prices).' },
  { basic: 'problem', s: 'Housing is a serious [problem] for young people.', a: 'issue', opts: ['trouble of', 'matter of', 'fault'], why: 'problem → issue / challenge / concern.' },
  { basic: 'change', s: 'The internet has completely [changed] the way we work.', a: 'transformed', opts: ['exchanged', 'swapped', 'converted to'], why: 'change → alter → transform / revolutionise.' },
  { basic: 'very', s: 'This is a [very] difficult decision.', a: 'particularly', opts: ['too much', 'hugely of', 'so much'], why: 'very → extremely / particularly / exceptionally.' },
  { basic: 'enough', s: 'There is not [enough] evidence to support this claim.', a: 'sufficient', opts: ['efficient', 'significant', 'proficient'], why: 'enough → sufficient. « efficient » = efficace.' },
  { basic: 'start', s: 'The government will [start] a new campaign.', a: 'launch', opts: ['throw', 'release up', 'boot'], why: 'start → begin → launch / initiate (une campagne, un produit).' },
  { basic: 'stop', s: 'We must [stop] the spread of misinformation.', a: 'curb', opts: ['curve', 'cure', 'curl'], why: 'stop → limit → curb (C2).' },
  { basic: 'obvious', s: 'It is [obvious] that action is needed.', a: 'evident', opts: ['evidence', 'visible of', 'apparent of'], why: 'obvious → clear → evident.' },
  { basic: 'old', s: 'The town has many [old] buildings.', a: 'historic', opts: ['elderly', 'aged', 'ancient of'], why: 'Pour un bâtiment : historic / period. « elderly » ne s’emploie que pour des personnes.' },
  { basic: 'old people', s: 'Many [old people] live alone.', a: 'elderly people', opts: ['ancient people', 'aged persons', 'oldies'], why: 'old people → elderly people / older adults / senior citizens (plus respectueux).' },
  { basic: 'keep', s: 'It is vital to [keep] traditional crafts.', a: 'preserve', opts: ['reserve', 'conserve of', 'deserve'], why: 'keep → maintain → preserve.' },
  { basic: 'everywhere', s: 'Smartphones are now [everywhere].', a: 'ubiquitous', opts: ['ambiguous', 'universal of', 'unanimous'], why: 'everywhere → widespread → ubiquitous (C2).' },
  { basic: 'more and more', s: '[More and more] people work from home.', a: 'An increasing number of', opts: ['An increasing amount of', 'A big quantity of', 'Lots more'], why: '« people » est dénombrable : « an increasing number of ».' },
]

// ---------- Registre : du familier au formel ----------
export interface RegisterItem {
  informal: string
  s: string // phrase formelle avec ___
  a: string
  opts: string[]
  why: string
}

export const REGISTER: RegisterItem[] = [
  { informal: 'kids', s: '___ spend too much time on screens.', a: 'Children', opts: ['Kids', 'Kiddos', 'Childs'], why: '« kids » est familier. « Childs » n’existe pas.' },
  { informal: 'lots of', s: 'The project attracted ___ criticism.', a: 'a great deal of', opts: ['lots of', 'loads of', 'a bunch of'], why: '« a great deal of » + indénombrable, registre soutenu.' },
  { informal: 'so', s: 'Prices rose sharply. ___, demand fell.', a: 'Consequently', opts: ['So', 'And so', 'Then'], why: '« So » en début de phrase est trop familier : « Consequently / Therefore ».' },
  { informal: 'but', s: 'The plan is ambitious. ___, it may be too expensive.', a: 'However', opts: ['But', 'Though', 'Anyway'], why: 'On évite de commencer une phrase par « But » : « However, ».' },
  { informal: 'get rid of', s: 'Governments should ___ unnecessary regulations.', a: 'eliminate', opts: ['get rid of', 'chuck out', 'ditch'], why: 'get rid of → eliminate / remove / abolish.' },
  { informal: 'find out', s: 'Scientists are trying to ___ the cause of the disease.', a: 'determine', opts: ['find out', 'figure out', 'suss out'], why: 'Les verbes à particule familiers ont souvent un équivalent formel : find out → determine / discover.' },
  { informal: 'go up', s: 'Crime rates ___ by 10% last year.', a: 'increased', opts: ['went up', 'shot up', 'jumped up'], why: 'go up → increase / rise.' },
  { informal: 'cut down on', s: 'People should ___ their consumption of sugar.', a: 'reduce', opts: ['cut down on', 'cut back', 'slash down'], why: 'cut down on → reduce.' },
  { informal: 'stuff', s: 'Consumers buy more ___ than they need.', a: 'goods', opts: ['stuff', 'things and stuff', 'loads'], why: '« stuff » est familier : goods / products / possessions.' },
  { informal: 'a bit', s: 'The figures fell ___ in 2019.', a: 'slightly', opts: ['a bit', 'a tad', 'kind of'], why: 'a bit → slightly.' },
  { informal: 'really', s: 'This is a ___ important issue.', a: 'highly', opts: ['really', 'super', 'well'], why: 'really → highly / extremely / particularly.' },
  { informal: 'don’t', s: 'Many people ___ recycle their waste.', a: 'do not', opts: ['don’t', 'dont', 'doesn’t'], why: 'Pas de contractions dans un essai : « do not ».' },
  { informal: 'thing', s: 'Unemployment is a complex ___.', a: 'issue', opts: ['thing', 'stuff', 'deal'], why: '« thing » est trop vague : issue / matter / phenomenon.' },
  { informal: 'nowadays everybody', s: '___ uses a smartphone.', a: 'The vast majority of people', opts: ['Everybody nowadays', 'All the people', 'Everyone and their mum'], why: 'Évitez les généralisations absolues : « the vast majority of people ».' },
  { informal: 'put up with', s: 'Residents should not have to ___ constant noise.', a: 'tolerate', opts: ['put up with', 'stand for it', 'deal'], why: 'put up with → tolerate / endure.' },
  { informal: 'look into', s: 'The government will ___ the causes of the accident.', a: 'investigate', opts: ['look into', 'check out', 'dig into'], why: 'look into → investigate / examine.' },
  { informal: 'big', s: 'Climate change is a ___ threat.', a: 'significant', opts: ['big', 'huge', 'massive'], why: 'big / huge → significant / major / serious.' },
  { informal: 'I think', s: '___, governments should fund public transport.', a: 'In my view', opts: ['I think', 'I reckon', 'If you ask me'], why: '« In my view / I would argue that » dans la conclusion, plutôt que « I think » répété.' },
  { informal: 'like', s: 'Many sports, ___ football and tennis, are expensive.', a: 'such as', opts: ['like', 'kind of like', 'as like'], why: 'Pour donner des exemples dans un essai : « such as ».' },
  { informal: 'okay', s: 'This solution is ___, but not ideal.', a: 'acceptable', opts: ['okay', 'fine-ish', 'alright'], why: 'okay → acceptable / satisfactory.' },
  { informal: 'cheap', s: 'The new scheme is ___ and effective.', a: 'cost-effective', opts: ['cheapo', 'dirt cheap', 'cheapy'], why: '« cheap » peut sembler péjoratif : inexpensive / cost-effective / affordable.' },
  { informal: 'awful', s: 'Living conditions in the camps are ___.', a: 'appalling', opts: ['awful', 'crap', 'pants'], why: 'awful → appalling / dire (soutenu).' },
]

// ---------- Expressions idiomatiques supplémentaires ----------
// spoken = plutôt à l'oral ; neutral = acceptable aussi dans un essai.
export interface Idiom extends Word {
  register: 'spoken' | 'neutral'
}

export const IDIOMS: Idiom[] = [
  { word: 'a blessing in disguise', pos: 'idiom', fr: 'un mal pour un bien', def: 'something that seems bad but turns out to be good', ex: 'Losing that job was a blessing in disguise.', level: 'C1', register: 'spoken' },
  { word: 'the tip of the iceberg', pos: 'idiom', fr: 'la partie émergée de l’iceberg', frAlt: ["la partie emergee de l'iceberg"], def: 'a small, visible part of a much larger problem', ex: 'Reported cases are just the tip of the iceberg.', level: 'C1', register: 'neutral' },
  { word: 'a vicious circle', pos: 'idiom', fr: 'un cercle vicieux', def: 'a situation where one problem causes another that makes the first worse', ex: 'Poverty and poor health form a vicious circle.', level: 'C1', register: 'neutral', alt: ['vicious circle'] },
  { word: 'pros and cons', pos: 'idiom', fr: 'le pour et le contre', def: 'advantages and disadvantages', ex: 'We need to weigh up the pros and cons.', level: 'B2', register: 'spoken', note: 'Dans un essai, préférez « advantages and disadvantages ».' },
  { word: 'hit the nail on the head', pos: 'idiom', fr: 'mettre le doigt dessus', def: 'to describe exactly what is causing a problem', ex: 'You hit the nail on the head with that comment.', level: 'C1', register: 'spoken' },
  { word: 'a drop in the ocean', pos: 'idiom', fr: 'une goutte d’eau dans l’océan', frAlt: ["une goutte d'eau dans l'ocean", 'une goutte d eau dans la mer'], def: 'a very small amount compared with what is needed', ex: 'The funding is a drop in the ocean.', level: 'C1', register: 'spoken' },
  { word: 'on the rise', pos: 'phrase', fr: 'en hausse', def: 'increasing', ex: 'Online shopping is on the rise.', level: 'B2', register: 'neutral' },
  { word: 'go hand in hand', pos: 'idiom', fr: 'aller de pair', def: 'to be closely connected', ex: 'Poverty and crime often go hand in hand.', level: 'C1', register: 'neutral' },
  { word: 'cost an arm and a leg', pos: 'idiom', fr: 'coûter les yeux de la tête', frAlt: ['couter les yeux de la tete'], def: 'to be very expensive', ex: 'Renting in London costs an arm and a leg.', level: 'B2', register: 'spoken' },
  { word: 'a double-edged sword', pos: 'idiom', fr: 'une arme à double tranchant', frAlt: ['une arme a double tranchant'], def: 'something with both good and bad effects', ex: 'Tourism is a double-edged sword for small islands.', level: 'C1', register: 'neutral' },
  { word: 'once in a blue moon', pos: 'idiom', fr: 'tous les trente-six du mois', frAlt: ['tous les 36 du mois', 'tres rarement'], def: 'very rarely', ex: 'I only eat fast food once in a blue moon.', level: 'B2', register: 'spoken' },
  { word: 'by and large', pos: 'idiom', fr: 'dans l’ensemble', frAlt: ["dans l'ensemble", 'globalement'], def: 'generally, on the whole', ex: 'By and large, the scheme has been a success.', level: 'C1', register: 'neutral' },
  { word: 'learn the ropes', pos: 'idiom', fr: 'apprendre les ficelles', def: 'to learn how to do a job', ex: 'It took me a month to learn the ropes.', level: 'C1', register: 'spoken' },
  { word: 'a means to an end', pos: 'idiom', fr: 'un moyen d’arriver à ses fins', frAlt: ["un moyen d'arriver a ses fins", 'un moyen et non une fin'], def: 'something done only to achieve something else', ex: 'For many students, a degree is simply a means to an end.', level: 'C1', register: 'neutral' },
  { word: 'take something for granted', pos: 'idiom', fr: 'considérer comme acquis', frAlt: ['considerer comme acquis'], def: 'to not appreciate something you have', ex: 'We often take clean water for granted.', level: 'B2', register: 'neutral', alt: ['take for granted'] },
  { word: 'the bottom line', pos: 'idiom', fr: 'l’essentiel, en fin de compte', frAlt: ["l'essentiel", 'en fin de compte'], def: 'the most important fact', ex: 'The bottom line is that we need more doctors.', level: 'C1', register: 'spoken' },
]

// ---------- Orthographe : les mots souvent mal écrits ----------
export interface Spelling {
  word: string
  wrong: string[]
  fr: string
}

export const SPELLING: Spelling[] = [
  { word: 'accommodation', wrong: ['accomodation', 'acommodation', 'accommadation'], fr: 'logement' },
  { word: 'environment', wrong: ['enviroment', 'environement', 'envirnment'], fr: 'environnement' },
  { word: 'government', wrong: ['goverment', 'governement', 'govermnent'], fr: 'gouvernement' },
  { word: 'necessary', wrong: ['neccessary', 'necessery', 'neccesary'], fr: 'nécessaire' },
  { word: 'responsibility', wrong: ['responsability', 'responsibilty', 'responsiblity'], fr: 'responsabilité' },
  { word: 'beginning', wrong: ['begining', 'beggining', 'beginnig'], fr: 'début' },
  { word: 'definitely', wrong: ['definately', 'definitly', 'defenitely'], fr: 'définitivement, sans aucun doute' },
  { word: 'separate', wrong: ['seperate', 'separete', 'saperate'], fr: 'séparé, séparer' },
  { word: 'occurred', wrong: ['occured', 'ocurred', 'occurrred'], fr: 's’est produit' },
  { word: 'recommend', wrong: ['reccomend', 'recomend', 'reccommend'], fr: 'recommander' },
  { word: 'address', wrong: ['adress', 'addres', 'adresse'], fr: 'adresse, traiter (un problème)' },
  { word: 'development', wrong: ['developement', 'devlopment', 'developpment'], fr: 'développement' },
  { word: 'independent', wrong: ['independant', 'indipendent', 'independend'], fr: 'indépendant' },
  { word: 'committee', wrong: ['commitee', 'comittee', 'committe'], fr: 'comité' },
  { word: 'embarrassed', wrong: ['embarassed', 'embarrased', 'embarresed'], fr: 'gêné' },
  { word: 'foreign', wrong: ['foriegn', 'forein', 'foreing'], fr: 'étranger' },
  { word: 'knowledge', wrong: ['knowlege', 'knowledgde', 'knoweldge'], fr: 'connaissances' },
  { word: 'unnecessary', wrong: ['unecessary', 'unneccessary', 'unnecesary'], fr: 'inutile' },
  { word: 'successful', wrong: ['succesful', 'successfull', 'sucessful'], fr: 'qui réussit' },
  { word: 'opportunity', wrong: ['oportunity', 'opportunaty', 'oppurtunity'], fr: 'opportunité, occasion' },
  { word: 'disappear', wrong: ['dissapear', 'disapear', 'dissappear'], fr: 'disparaître' },
  { word: 'technology', wrong: ['tecnology', 'technologie', 'tehnology'], fr: 'technologie' },
  { word: 'advertisement', wrong: ['advertisment', 'advertissement', 'advertisemant'], fr: 'publicité' },
  { word: 'exaggerate', wrong: ['exagerate', 'exxagerate', 'exaggarate'], fr: 'exagérer' },
  { word: 'privilege', wrong: ['priviledge', 'privelege', 'privilige'], fr: 'privilège' },
  { word: 'convenient', wrong: ['convinient', 'conveniant', 'convienient'], fr: 'pratique' },
  { word: 'immediately', wrong: ['immediatly', 'imediately', 'immedietely'], fr: 'immédiatement' },
  { word: 'argument', wrong: ['arguement', 'argumant', 'arguemnt'], fr: 'argument, dispute' },
  { word: 'Wednesday', wrong: ['Wensday', 'Wednsday', 'Wedensday'], fr: 'mercredi' },
  { word: 'February', wrong: ['Febuary', 'Februery', 'Febrary'], fr: 'février' },
  { word: 'library', wrong: ['libary', 'librery', 'liberary'], fr: 'bibliothèque' },
  { word: 'temperature', wrong: ['temprature', 'temperture', 'tempreture'], fr: 'température' },
  { word: 'questionnaire', wrong: ['questionaire', 'questionnair', 'questionnare'], fr: 'questionnaire' },
  { word: 'licence', wrong: ['lisence', 'licens', 'lisense'], fr: 'permis, licence (nom, GB)' },
  { word: 'colleague', wrong: ['collegue', 'colleage', 'coleague'], fr: 'collègue' },
  { word: 'neighbour', wrong: ['neihgbour', 'neighbur', 'nieghbour'], fr: 'voisin (orthographe GB)' },
  { word: 'centre', wrong: ['centr', 'cenre', 'sentre'], fr: 'centre (orthographe GB)' },
  { word: 'programme', wrong: ['programe', 'progamme', 'programmme'], fr: 'programme, émission (GB)' },
  { word: 'calendar', wrong: ['calender', 'calandar', 'calendur'], fr: 'calendrier' },
  { word: 'guarantee', wrong: ['garantee', 'guarentee', 'gaurantee'], fr: 'garantie' },
]
