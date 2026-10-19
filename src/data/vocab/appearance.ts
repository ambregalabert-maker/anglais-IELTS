import type { UnitContent } from './types'

// Unité 2 : vocabulaire du cours « Physical Appearance » (orthographe britannique), plus quelques mots utiles.

const SPOKEN = 'Expression familière : très bien à l’oral (Speaking), à éviter dans un essai.'

const unit: UnitContent = {
  unitId: 'appearance',
  lessons: [
    {
      title: 'Hair & face',
      words: [
        { word: 'cropped hair', pos: 'noun phrase', fr: 'cheveux coupés très court', frAlt: ['cheveux tres courts', 'cheveux courts'], def: 'very short hair', ex: 'My brother has short cropped hair.', level: 'B2' },
        { word: 'fair hair', pos: 'noun phrase', fr: 'cheveux blonds / clairs', frAlt: ['cheveux blonds', 'cheveux clairs'], def: 'light-coloured hair', ex: 'She has long fair hair and blue eyes.', level: 'B1' },
        { word: 'shoulder-length hair', pos: 'noun phrase', fr: 'cheveux mi-longs', frAlt: ['cheveux aux epaules', 'cheveux mi longs'], def: 'hair that comes down to the shoulders and no further', ex: 'She has shoulder-length hair.', level: 'B2' },
        { word: 'thick hair', pos: 'noun phrase', fr: 'cheveux épais', frAlt: ['cheveux epais'], def: 'a lot of hair', ex: 'Her friendly face is framed by thick hair.', level: 'B1' },
        { word: 'dishevelled hair', pos: 'noun phrase', fr: 'cheveux en bataille', frAlt: ['cheveux decoiffes', 'cheveux en desordre'], def: 'untidy hair', ex: 'He arrived late, with dishevelled hair.', level: 'C1', alt: ['disheveled hair'], note: 'Orthographe britannique : dishevelled (deux « l »).' },
        { word: 'curly hair', pos: 'noun phrase', fr: 'cheveux bouclés', frAlt: ['cheveux boucles', 'cheveux frises'], def: 'hair that forms curls', ex: 'Both of my sisters have curly hair.', level: 'B1' },
        { word: 'pointed face', pos: 'noun phrase', fr: 'visage pointu / fin', frAlt: ['visage pointu', 'visage fin'], def: 'the opposite of a round face', ex: 'He has quite a pointed face.', level: 'B2' },
        { word: 'complexion', pos: 'noun', fr: 'teint', def: 'the natural colour and texture of your skin', ex: 'She has a lovely complexion.', col: ['a pale complexion', 'a clear complexion'], level: 'C1' },
        { word: 'fair-skinned', pos: 'adjective', fr: 'à la peau claire', frAlt: ['a la peau claire', 'peau claire'], def: 'having light skin', ex: 'He is quite fair-skinned compared to me.', level: 'B2' },
        { word: 'freckles', pos: 'noun', fr: 'taches de rousseur', def: 'small brown spots on the skin, often on the face', ex: 'She has red hair and freckles.', level: 'B2' },
      ],
      cloze: [
        { s: 'She has long, ___ hair that is hard to brush.', a: 'thick', opts: ['fat', 'heavy', 'large'], why: 'Des cheveux épais = « thick hair ».', kind: 'collocation' },
        { s: 'My sister has ___ hair: it comes down to her shoulders.', a: 'shoulder-length', opts: ['shoulder-long', 'shoulder-size', 'length-shoulder'], why: 'On dit « shoulder-length hair ».', kind: 'vocab' },
        { s: 'She has a lovely ___: her skin is clear and smooth.', a: 'complexion', opts: ['complexity', 'complex', 'compliment'], why: '« complexion » = le teint. « complexity » = la complexité.', kind: 'vocab' },
        { s: 'He woke up late and went out with ___ hair.', a: 'dishevelled', opts: ['cropped', 'fair', 'thick'], why: '« dishevelled » = en bataille, décoiffé.', kind: 'vocab' },
      ],
      judge: [
        { s: 'She has long blond hairs.', ok: false, fix: 'She has long blonde hair.', why: 'Les cheveux sur la tête : « hair » est indénombrable (pas de « s »). « a hair » = un seul cheveu.' },
        { s: 'He has a pointed face and short cropped hair.', ok: true, why: 'Correct.' },
        { s: 'My brother has red hair and freckles.', ok: true, why: 'Correct : « freckles » est au pluriel (taches de rousseur).' },
      ],
      sentences: [
        { en: 'She has shoulder-length fair hair.', fr: 'Elle a les cheveux blonds mi-longs.' },
        { en: 'My brother has short cropped hair.', fr: 'Mon frère a les cheveux coupés très court.' },
        { en: 'She has a lovely complexion.', fr: 'Elle a un très joli teint.' },
      ],
    },
    {
      title: 'Body & build',
      words: [
        { word: 'medium height', pos: 'noun phrase', fr: 'taille moyenne', def: 'average height', ex: 'My best friend is of medium height.', col: ['of medium height'], level: 'B1' },
        { word: 'slim figure', pos: 'noun phrase', fr: 'silhouette mince', frAlt: ['mince', 'silhouette fine'], def: 'an attractively thin body', ex: 'She has a slim figure.', level: 'B1' },
        { word: 'slender figure', pos: 'noun phrase', fr: 'silhouette élancée', frAlt: ['silhouette elancee', 'elancee'], def: 'a body that is tall and slim', ex: 'The dancer has a slender figure.', level: 'C1' },
        { word: 'well-built', pos: 'adjective', fr: 'bien bâti, costaud', frAlt: ['bien bati', 'costaud', 'muscle'], def: 'muscular and strong', ex: 'He still does a lot of exercise and is quite well-built.', level: 'B2' },
        { word: 'overweight', pos: 'adjective', fr: 'en surpoids', def: 'weighing more than is considered healthy', ex: 'She is a little overweight, but not too much.', level: 'B2', note: 'Plus poli que « fat ».' },
        { word: 'stocky', pos: 'adjective', fr: 'trapu', def: 'short, wide and strong', ex: 'The rugby player was short and stocky.', level: 'C1' },
        { word: 'lose one’s figure', pos: 'idiom', fr: 'perdre la ligne', def: 'to have a body that is no longer slim and toned', ex: 'Many people lose their figure as they get older.', level: 'C1', alt: ["lose one's figure", 'lose your figure', 'lose their figure'] },
        { word: 'tanned', pos: 'adjective', fr: 'bronzé', frAlt: ['bronze'], def: 'having darker skin after time in the sun', ex: 'She came back from holiday looking very tanned.', level: 'B2' },
        { word: 'wear glasses', pos: 'verb phrase', fr: 'porter des lunettes', def: 'to use spectacles to see better', ex: 'My aunt has to wear glasses to read.', level: 'B1' },
      ],
      cloze: [
        { s: 'He goes to the gym every day and is very ___.', a: 'well-built', opts: ['good-built', 'well-made', 'big-built'], why: '« well-built » = bien bâti, musclé.', kind: 'vocab' },
        { s: 'She is neither tall nor short: she is of ___ height.', a: 'medium', opts: ['middle', 'normal', 'mean'], why: 'On dit « of medium height » (ou « of average height »).', kind: 'collocation' },
        { s: 'Does your sister ___ glasses?', a: 'wear', opts: ['carry', 'put', 'bring'], why: 'On « wear » des lunettes, des vêtements, du maquillage.', kind: 'collocation' },
        { s: 'After two weeks at the beach, he looked very ___.', a: 'tanned', opts: ['tired', 'stocky', 'slender'], why: '« tanned » = bronzé.', kind: 'vocab' },
      ],
      judge: [
        { s: 'She is tall of 1.70 m.', ok: false, fix: 'She is 1.70 m tall.', why: 'En anglais, la mesure vient avant l’adjectif : « 1.70 m tall ».' },
        { s: 'She has a slim figure and wears glasses.', ok: true, why: 'Correct.' },
        { s: 'He wears glasses since he was ten.', ok: false, fix: 'He has worn glasses since he was ten.', why: 'Avec « since », on utilise le present perfect : « has worn ».' },
      ],
      sentences: [
        { en: 'He is quite well-built and of medium height.', fr: 'Il est plutôt costaud et de taille moyenne.' },
        { en: 'She has a slim figure.', fr: 'Elle a une silhouette mince.' },
        { en: 'My best friend wears glasses.', fr: 'Ma meilleure amie porte des lunettes.' },
      ],
    },
    {
      title: 'Age',
      words: [
        { word: 'middle-aged', pos: 'adjective', fr: 'd’âge mûr', frAlt: ["d'age mur", "d'age moyen", 'quinquagenaire'], def: 'approximately between 45 and 65 years old', ex: 'My aunt is middle-aged but very energetic.', level: 'B2' },
        { word: 'in her thirties', pos: 'phrase', fr: 'dans la trentaine', def: 'between 30 and 39 years old', ex: 'My teacher is in her thirties.', level: 'B1', alt: ['in his thirties', 'in their thirties'], note: 'On peut dire aussi « in her 30s », « in his 60s »…' },
        { word: 'getting on a bit', pos: 'idiom', fr: 'qui commence à prendre de l’âge', frAlt: ["qui prend de l'age", "commencer a vieillir"], def: 'becoming old', ex: 'My father is getting on a bit, but he is still active.', level: 'C1', note: SPOKEN },
        { word: 'look young for your age', pos: 'phrase', fr: 'faire jeune pour son âge', frAlt: ['faire jeune pour son age', 'paraitre jeune pour son age'], def: 'to look younger than you are', ex: 'You really look young for your age.', level: 'B2', alt: ['look young for his age', 'look young for her age'] },
        { word: 'youthful appearance', pos: 'noun phrase', fr: 'air jeune', frAlt: ['apparence jeune', 'allure jeune'], def: 'a young look', ex: 'She is middle-aged but has a very youthful appearance.', level: 'C1' },
        { word: 'go grey', pos: 'verb phrase', fr: 'grisonner, avoir des cheveux blancs', frAlt: ['grisonner', 'avoir des cheveux blancs'], def: 'to have hair that is turning grey', ex: 'We all go grey eventually.', level: 'B2', alt: ['go gray'] },
        { word: 'hard of hearing', pos: 'adjective phrase', fr: 'dur d’oreille', frAlt: ["dur d'oreille", 'malentendant'], def: 'finding it difficult to hear', ex: 'My grandfather is a little hard of hearing.', level: 'C1' },
        { word: 'grow old gracefully', pos: 'idiom', fr: 'bien vieillir (avec sérénité)', frAlt: ['bien vieillir', 'vieillir avec grace'], def: 'to accept getting older in a calm and positive way', ex: 'I think we should simply grow old gracefully.', level: 'C1' },
        { word: 'wrinkles', pos: 'noun', fr: 'rides', def: 'lines on the skin that appear with age', ex: 'My grandmother has lots of wrinkles around her eyes.', level: 'B2' },
        { word: 'bald', pos: 'adjective', fr: 'chauve', def: 'having little or no hair on your head', ex: 'My uncle started going bald in his twenties.', col: ['go bald'], level: 'B2' },
      ],
      cloze: [
        { s: 'My grandmother is starting to ___ grey.', a: 'go', opts: ['make', 'do', 'come'], why: 'On dit « go grey » ou « turn grey ».', kind: 'collocation' },
        { s: 'My grandfather is a little hard of ___.', a: 'hearing', opts: ['listening', 'ear', 'hear'], why: 'L’expression est figée : « hard of hearing ».', kind: 'vocab' },
        { s: 'He looks young ___ his age.', a: 'for', opts: ['of', 'at', 'to'], why: '« look young for your age ».', kind: 'grammar' },
        { s: 'She is in ___ forties.', a: 'her', opts: ['the', 'a', 'its'], why: 'On utilise le possessif : « in her forties », « in his sixties ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'My grandmother has 80 years.', ok: false, fix: 'My grandmother is 80 (years old).', why: 'Piège de francophone : l’âge s’exprime avec « to be », jamais avec « have ».' },
        { s: 'My father is in his 60s, but he looks very young for his age.', ok: true, why: 'Correct.' },
        { s: 'My uncle is becoming bald.', ok: false, fix: 'My uncle is going bald.', why: 'Pour un changement d’apparence, on dit « go bald », « go grey ».' },
      ],
      sentences: [
        { en: 'My father looks very young for his age.', fr: 'Mon père fait très jeune pour son âge.' },
        { en: 'My aunt is middle-aged.', fr: 'Ma tante est d’âge mûr.' },
        { en: 'We all go grey eventually.', fr: 'Nous finissons tous par avoir des cheveux blancs.' },
      ],
    },
    {
      title: 'Style & looks',
      words: [
        { word: 'good-looking', pos: 'adjective', fr: 'beau, séduisant', frAlt: ['beau', 'belle', 'seduisant'], def: 'attractive', ex: 'He is a very good-looking actor.', level: 'B1' },
        { word: 'scruffy', pos: 'adjective', fr: 'négligé, débraillé', frAlt: ['neglige', 'debraille'], def: 'dressed untidily', ex: 'You should not go out looking scruffy.', level: 'B2' },
        { word: 'well turned-out', pos: 'adjective', fr: 'soigné, élégant', frAlt: ['soigne', 'elegant', 'bien habille'], def: 'looking smart and neat', ex: 'She is always well turned-out.', level: 'C1', alt: ['well-turned-out', 'well turned out'] },
        { word: 'smart', pos: 'adjective', fr: 'élégant, chic (vêtements)', frAlt: ['elegant', 'chic', 'bien habille'], def: 'clean, tidy and well dressed', ex: 'You need to look smart for a job interview.', level: 'B1', note: 'En anglais britannique, « smart » veut aussi dire « élégant », pas seulement « intelligent ».' },
        { word: 'get done up', pos: 'phrasal verb', fr: 'se mettre sur son trente-et-un', frAlt: ['se faire beau', 'se pomponner'], def: 'to dress smartly', ex: 'Some people get done up just to go to the shops.', level: 'C1', note: SPOKEN },
        { word: 'dressed up to the nines', pos: 'idiom', fr: 'tiré à quatre épingles', frAlt: ['tire a quatre epingles', 'sur son trente et un'], def: 'dressed very smartly or glamorously', ex: 'She arrived at the party dressed up to the nines.', level: 'C1', note: SPOKEN },
        { word: 'never a hair out of place', pos: 'idiom', fr: 'toujours impeccablement coiffé', frAlt: ['toujours impeccable', 'jamais un cheveu qui depasse'], def: 'with perfectly styled hair', ex: 'She always looks perfect, with never a hair out of place.', level: 'C1' },
        { word: 'make-up', pos: 'noun', fr: 'maquillage', def: 'cosmetics put on the face', ex: 'She never wears make-up at work.', col: ['wear make-up', 'put on make-up'], level: 'B1', alt: ['makeup', 'make up'], note: 'Indénombrable : « wear make-up », jamais « a make-up ».' },
        { word: 'bear a striking resemblance', pos: 'idiom', fr: 'ressembler de façon frappante', frAlt: ['ressembler enormement', 'ressembler beaucoup'], def: 'to look very similar to someone', ex: 'Twins often bear a striking resemblance to each other.', level: 'C1' },
      ],
      cloze: [
        { s: 'He always looks ___: his clothes are old and untidy.', a: 'scruffy', opts: ['smart', 'well turned-out', 'good-looking'], why: '« scruffy » = négligé, débraillé.', kind: 'vocab' },
        { s: 'She ___ a striking resemblance to her mother.', a: 'bears', opts: ['carries', 'wears', 'holds'], why: 'L’expression est « bear a striking resemblance to ».', kind: 'collocation' },
        { s: 'Everyone at the wedding was dressed up to the ___.', a: 'nines', opts: ['tens', 'sevens', 'nine'], why: 'L’expression figée est « dressed up to the nines ».', kind: 'vocab' },
        { s: 'You should dress ___ for a job interview.', a: 'smartly', opts: ['scruffy', 'smart', 'smartness'], why: 'Après le verbe « dress », il faut un adverbe : « smartly ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'She always wears a make-up.', ok: false, fix: 'She always wears make-up.', why: '« make-up » est indénombrable : pas de « a ».' },
        { s: 'She looks like to her mother.', ok: false, fix: 'She looks like her mother.', why: '« look like » est directement suivi du nom, sans « to ».' },
        { s: 'He was dressed up to the nines for the wedding.', ok: true, why: 'Correct, mais c’est une expression familière : plutôt pour l’oral.' },
      ],
      sentences: [
        { en: 'She is always well turned-out.', fr: 'Elle est toujours très soignée.' },
        { en: 'You should not go out looking scruffy.', fr: 'Tu ne devrais pas sortir habillé de façon négligée.' },
        { en: 'She bears a striking resemblance to her sister.', fr: 'Elle ressemble énormément à sa sœur.' },
      ],
    },
  ],
}

export default unit
