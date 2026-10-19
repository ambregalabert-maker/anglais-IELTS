import type { UnitContent } from './types'

// Unité 3 : vocabulaire du cours « Personality », plus des adjectifs de caractère fréquents à l'IELTS.

const SPOKEN = 'Expression idiomatique : excellente à l’oral (Speaking), à éviter dans un essai académique.'

const unit: UnitContent = {
  unitId: 'personality',
  lessons: [
    {
      title: 'Social butterflies',
      words: [
        { word: 'extrovert', pos: 'noun', fr: 'extraverti(e)', frAlt: ['extraverti', 'extravertie', 'extroverti'], def: 'an energetic person who likes the company of others', ex: 'My sister is a real extrovert.', level: 'B2', alt: ['extravert'], note: 'Adjectif : extroverted.' },
        { word: 'introvert', pos: 'noun', fr: 'introverti(e)', frAlt: ['introverti', 'introvertie'], def: 'a quiet person who prefers being alone or with a few people', ex: 'I am an introvert, so I need time alone.', level: 'B2', note: 'Adjectif : introverted.' },
        { word: 'outgoing', pos: 'adjective', fr: 'ouvert, sociable', frAlt: ['sociable', 'ouvert', 'extraverti'], def: 'friendly and enjoying meeting people', ex: 'He is very outgoing and makes friends easily.', level: 'B2' },
        { word: 'reserved', pos: 'adjective', fr: 'réservé', frAlt: ['reserve', 'reservee'], def: 'shy and not showing your feelings easily', ex: 'Most of my friends are a little reserved.', level: 'B2' },
        { word: 'painfully shy', pos: 'adjective phrase', fr: 'extrêmement timide', frAlt: ['tres timide', 'maladivement timide'], def: 'very shy', ex: 'As a child, I was painfully shy.', level: 'C1' },
        { word: 'good company', pos: 'noun phrase', fr: 'de bonne compagnie', frAlt: ['bonne compagnie'], def: 'enjoyable to spend time with', ex: 'I think I am good company.', level: 'B2' },
        { word: 'the life and soul of the party', pos: 'idiom', fr: 'le boute-en-train', frAlt: ['boute en train', "l'ame de la fete", 'le boute-en-train'], def: 'a fun person who is the centre of activity', ex: 'My brother is the life and soul of the party.', level: 'C1', note: SPOKEN },
        { word: 'fun-loving', pos: 'adjective', fr: 'qui aime s’amuser', frAlt: ["qui aime s'amuser", 'joyeux'], def: 'enjoying having fun', ex: 'We are a fun-loving family.', level: 'B2' },
        { word: 'sense of humour', pos: 'noun phrase', fr: 'sens de l’humour', frAlt: ["sens de l'humour", 'humour'], def: 'the ability to understand what is funny', ex: 'She had a great sense of humour.', col: ['a good sense of humour', 'a great sense of humour'], level: 'B1', alt: ['sense of humor'], note: 'Orthographe britannique : humour.' },
        { word: 'sociable', pos: 'adjective', fr: 'sociable', def: 'enjoying spending time with other people', ex: 'My parents are very sociable and often invite friends.', level: 'B2' },
      ],
      cloze: [
        { s: 'My brother is the life and ___ of the party.', a: 'soul', opts: ['heart', 'spirit', 'mind'], why: 'L’expression figée est « the life and soul of the party ».', kind: 'vocab' },
        { s: 'She has a great sense ___ humour.', a: 'of', opts: ['for', 'in', 'with'], why: '« a sense of humour ».', kind: 'grammar' },
        { s: 'I am not ___ shy, just a bit reserved.', a: 'painfully', opts: ['hurtfully', 'badly', 'painly'], why: '« painfully shy » = extrêmement timide.', kind: 'collocation' },
        { s: 'He is very ___: he loves meeting new people.', a: 'outgoing', opts: ['ongoing', 'outgoings', 'going-out'], why: '« outgoing » = sociable, ouvert. « ongoing » = en cours.', kind: 'vocab' },
      ],
      judge: [
        { s: 'She is a very sympathetic person: she is always friendly.', ok: false, fix: 'She is a very nice person: she is always friendly.', why: 'Faux ami : « sympathetic » = compatissant. « Sympathique » = nice / friendly.' },
        { s: 'I am rather an introvert person.', ok: false, fix: 'I am rather introverted. / I am rather an introvert.', why: '« introvert » est un nom. L’adjectif est « introverted ».' },
        { s: 'My brother is the life and soul of the party.', ok: true, why: 'Correct.' },
      ],
      sentences: [
        { en: 'I think I am good company.', fr: 'Je pense que je suis de bonne compagnie.' },
        { en: 'Most of my friends are quite reserved.', fr: 'La plupart de mes amis sont assez réservés.' },
        { en: 'She has a great sense of humour.', fr: 'Elle a beaucoup d’humour.' },
      ],
    },
    {
      title: 'Calm or hot-headed?',
      words: [
        { word: 'easy-going', pos: 'adjective', fr: 'facile à vivre, décontracté', frAlt: ['facile a vivre', 'decontracte', 'cool'], def: 'relaxed and not easily worried', ex: 'She was very calm and easy-going.', level: 'B2' },
        { word: 'laid-back', pos: 'adjective', fr: 'décontracté, cool', frAlt: ['decontracte', 'cool', 'detendu'], def: 'relaxed (= easy-going)', ex: 'Everyone tells me I am quite laid-back.', level: 'B2', note: 'Un peu familier.' },
        { word: 'quick-tempered', pos: 'adjective', fr: 'soupe au lait, colérique', frAlt: ['colerique', 'soupe au lait', 'irritable'], def: 'becoming angry quickly', ex: 'Fair-minded people are rarely quick-tempered.', level: 'C1' },
        { word: 'lose one’s temper', pos: 'idiom', fr: 's’énerver, perdre son calme', frAlt: ["s'enerver", 'perdre son calme', 'se mettre en colere'], def: 'to suddenly become angry', ex: 'Miss Thomas never lost her temper.', level: 'B2', alt: ["lose one's temper", 'lose your temper', 'lost her temper', 'lose his temper'] },
        { word: 'thick-skinned', pos: 'adjective', fr: 'qui a la peau dure', frAlt: ['qui a la peau dure', 'insensible aux critiques'], def: 'not easily affected by criticism', ex: 'Politicians need to be thick-skinned.', level: 'C1' },
        { word: 'sensitive', pos: 'adjective', fr: 'sensible', def: 'easily upset by what people say or do', ex: 'He is very sensitive to criticism.', col: ['sensitive to criticism'], level: 'B2', note: 'Faux ami : « sensible » en anglais = raisonnable.' },
        { word: 'stubborn', pos: 'adjective', fr: 'têtu', frAlt: ['tetu', 'obstine'], def: 'refusing to change your opinion', ex: 'My grandfather is very stubborn.', level: 'B2' },
        { word: 'down-to-earth', pos: 'adjective', fr: 'terre-à-terre, simple', frAlt: ['terre a terre', 'simple', 'pragmatique'], def: 'practical, simple and realistic', ex: 'Despite her success, she is very down-to-earth.', level: 'C1', note: 'En anglais, c’est un compliment.' },
        { word: 'moody', pos: 'adjective', fr: 'lunatique, d’humeur changeante', frAlt: ['lunatique', "d'humeur changeante"], def: 'having moods that change quickly', ex: 'Teenagers are often moody.', level: 'B2' },
      ],
      cloze: [
        { s: 'My teacher never ___ her temper, even with difficult students.', a: 'lost', opts: ['missed', 'dropped', 'broke'], why: 'L’expression est « lose one’s temper ».', kind: 'collocation' },
        { s: 'You need to be ___-skinned to work in politics.', a: 'thick', opts: ['hard', 'strong', 'fat'], why: '« thick-skinned » = qui a la peau dure, peu sensible aux critiques.', kind: 'vocab' },
        { s: 'He is very ___: he never changes his mind.', a: 'stubborn', opts: ['easy-going', 'laid-back', 'flexible'], why: '« stubborn » = têtu.', kind: 'vocab' },
        { s: 'He is very sensitive ___ criticism.', a: 'to', opts: ['at', 'of', 'with'], why: '« sensitive to something ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'He is very susceptible when people criticise him.', ok: false, fix: 'He is very touchy / sensitive when people criticise him.', why: 'Faux ami : « susceptible » en anglais = « vulnérable à » (susceptible to illness).' },
        { s: 'He is very easy-going and rarely gets angry.', ok: true, why: 'Correct.' },
        { s: 'She is a very sensible person: she cries at every film.', ok: false, fix: 'She is a very sensitive person: she cries at every film.', why: 'Faux ami : « sensible » = raisonnable. Sensible (émotif) = « sensitive ».' },
      ],
      sentences: [
        { en: 'My mother is very easy-going.', fr: 'Ma mère est très facile à vivre.' },
        { en: 'He never loses his temper.', fr: 'Il ne s’énerve jamais.' },
        { en: 'You need to be thick-skinned in this job.', fr: 'Il faut avoir la peau dure dans ce métier.' },
      ],
    },
    {
      title: 'Confidence & self',
      words: [
        { word: 'self-confident', pos: 'adjective', fr: 'sûr de soi', frAlt: ['sur de soi', 'confiant'], def: 'believing in your own ability', ex: 'I want my children to be self-confident.', level: 'B2' },
        { word: 'self-assured', pos: 'adjective', fr: 'plein d’assurance', frAlt: ["plein d'assurance", 'sur de soi'], def: 'confident', ex: 'She gave a calm and self-assured presentation.', level: 'C1' },
        { word: 'self-centred', pos: 'adjective', fr: 'égocentrique', frAlt: ['egocentrique', 'egoiste'], def: 'thinking only of yourself', ex: 'I hope my children will not be self-centred.', level: 'B2', alt: ['self-centered'], note: 'Orthographe britannique : centred.' },
        { word: 'self-effacing', pos: 'adjective', fr: 'effacé, modeste', frAlt: ['efface', 'modeste', 'discret'], def: 'not trying to get attention, especially by hiding your skills', ex: 'She was very modest and self-effacing.', level: 'C1' },
        { word: 'hide one’s light under a bushel', pos: 'idiom', fr: 'cacher ses talents', frAlt: ['cacher ses talents'], def: 'to hide your talents and skills', ex: 'She tends to hide her light under a bushel.', level: 'C1', alt: ["hide one's light under a bushel", 'hide her light under a bushel', 'hide your light under a bushel'], note: SPOKEN },
        { word: 'arrogant', pos: 'adjective', fr: 'arrogant', def: 'believing you are better than other people', ex: 'Confidence is good, but he is simply arrogant.', level: 'B2' },
        { word: 'ambitious', pos: 'adjective', fr: 'ambitieux', def: 'having a strong wish to succeed', ex: 'She is very ambitious and wants to run her own company.', level: 'B1' },
        { word: 'take after', pos: 'phrasal verb', fr: 'tenir de (ressembler à un parent)', frAlt: ['tenir de', 'ressembler a'], def: 'to be similar to an older member of your family', ex: 'Everyone tells me I take after my mum.', level: 'B2' },
        { word: 'conscientious', pos: 'adjective', fr: 'consciencieux', def: 'careful to do work well and thoroughly', ex: 'She is a conscientious student who never misses a deadline.', level: 'C1' },
      ],
      cloze: [
        { s: 'Everyone says I take ___ my mother.', a: 'after', opts: ['from', 'of', 'like'], why: '« take after someone » = tenir de quelqu’un.', kind: 'collocation' },
        { s: 'He only thinks about himself: he is very ___.', a: 'self-centred', opts: ['self-effacing', 'self-assured', 'selfless'], why: '« self-centred » = égocentrique.', kind: 'vocab' },
        { s: 'She is so modest that she hides her light under a ___.', a: 'bushel', opts: ['basket', 'table', 'bucket'], why: 'L’expression figée est « hide one’s light under a bushel ».', kind: 'vocab' },
        { s: 'She is a ___ worker: she always checks every detail.', a: 'conscientious', opts: ['conscious', 'consciousness', 'conscience'], why: '« conscientious » = consciencieux. « conscious » = conscient.', kind: 'vocab' },
      ],
      judge: [
        { s: 'She is very self-confidence.', ok: false, fix: 'She is very self-confident.', why: 'Après « very », il faut l’adjectif « self-confident ». Le nom est « self-confidence ».' },
        { s: 'I take after my father: we are both very calm.', ok: true, why: 'Correct.' },
        { s: 'He is very ambitious and wants to become a manager.', ok: true, why: 'Correct.' },
      ],
      sentences: [
        { en: 'I take after my mother.', fr: 'Je tiens de ma mère.' },
        { en: 'Self-confident people face problems more easily.', fr: 'Les gens sûrs d’eux affrontent plus facilement les problèmes.' },
        { en: 'She is very modest and self-effacing.', fr: 'Elle est très modeste et effacée.' },
      ],
    },
    {
      title: 'Values & others',
      words: [
        { word: 'broad-minded', pos: 'adjective', fr: 'ouvert d’esprit', frAlt: ["ouvert d'esprit", 'tolerant'], def: 'willing to accept other views or behaviour', ex: 'She was also very broad-minded.', level: 'C1', note: 'Synonyme : open-minded.' },
        { word: 'narrow-minded', pos: 'adjective', fr: 'étroit d’esprit', frAlt: ["etroit d'esprit", 'borne'], def: 'not willing to accept other views', ex: 'Narrow-minded people are difficult to get on with.', level: 'B2' },
        { word: 'fair-minded', pos: 'adjective', fr: 'impartial, juste', frAlt: ['impartial', 'juste', 'equitable'], def: 'treating people equally', ex: 'A good judge must be fair-minded.', level: 'C1' },
        { word: 'trustworthy', pos: 'adjective', fr: 'digne de confiance', def: 'able to be trusted', ex: 'A good friend should be trustworthy.', level: 'B2' },
        { word: 'two-faced', pos: 'adjective', fr: 'hypocrite', def: 'saying one thing to someone and another when they are not there', ex: 'People who are two-faced can be irritating.', level: 'B2' },
        { word: 'reliable', pos: 'adjective', fr: 'fiable', def: 'able to be depended on', ex: 'My best friend is very reliable.', level: 'B1' },
        { word: 'generous', pos: 'adjective', fr: 'généreux', frAlt: ['genereux'], def: 'happy to give money, time or help', ex: 'My grandparents are very generous with their time.', level: 'B1' },
        { word: 'considerate', pos: 'adjective', fr: 'attentionné, prévenant', frAlt: ['attentionne', 'prevenant', 'respectueux'], def: 'thinking about other people’s feelings', ex: 'It was very considerate of you to call.', level: 'B2', note: 'Faux ami : « considerable » = important (en quantité).' },
        { word: 'put others first', pos: 'phrase', fr: 'faire passer les autres avant soi', frAlt: ['faire passer les autres en premier'], def: 'to think of others before yourself', ex: 'She always put others first.', level: 'B2', alt: ['puts others first', 'put other people first'] },
        { word: 'bend over backwards', pos: 'idiom', fr: 'se mettre en quatre', def: 'to try very hard to help someone', ex: 'She would bend over backwards to help us.', level: 'C1', note: SPOKEN },
      ],
      cloze: [
        { s: 'She would bend over ___ to help her students.', a: 'backwards', opts: ['forwards', 'behind', 'back'], why: 'L’expression est « bend over backwards » (se mettre en quatre).', kind: 'vocab' },
        { s: 'I do not trust him: he is ___.', a: 'two-faced', opts: ['broad-minded', 'fair-minded', 'trustworthy'], why: '« two-faced » = hypocrite.', kind: 'vocab' },
        { s: 'A good teacher is ___-minded and treats every student equally.', a: 'fair', opts: ['narrow', 'absent', 'single'], why: '« fair-minded » = impartial.', kind: 'vocab' },
        { s: 'It was very ___ of you to bring me some soup when I was ill.', a: 'considerate', opts: ['considerable', 'considered', 'consideration'], why: '« considerate » = attentionné. « considerable » = important (quantité).', kind: 'vocab' },
      ],
      judge: [
        { s: 'She is an honest and confident person, so I tell her all my secrets.', ok: false, fix: 'She is an honest and trustworthy person, so I tell her all my secrets.', why: '« confident » = sûr de soi. À qui on peut se confier = « trustworthy ».' },
        { s: 'My best friend is very reliable: I can always count on her.', ok: true, why: 'Correct.' },
        { s: 'He is very comprehensive when I have problems.', ok: false, fix: 'He is very understanding when I have problems.', why: 'Faux ami : « comprehensive » = complet. Compréhensif = « understanding ».' },
      ],
      sentences: [
        { en: 'Relationships are built on trust.', fr: 'Les relations sont fondées sur la confiance.' },
        { en: 'She always puts others first.', fr: 'Elle fait toujours passer les autres avant elle.' },
        { en: 'Narrow-minded people are difficult to get on with.', fr: 'Les gens étroits d’esprit sont difficiles à vivre.' },
      ],
    },
  ],
}

export default unit
