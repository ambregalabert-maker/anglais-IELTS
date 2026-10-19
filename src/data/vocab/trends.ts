import type { UnitContent } from './types'

// Unité 5 : vocabulaire des tendances du Booklet 2 (Writing Task 1).

const unit: UnitContent = {
  unitId: 'trends',
  lessons: [
    {
      title: 'Going up',
      words: [
        { word: 'increase', pos: 'verb / noun', fr: 'augmenter / une augmentation', frAlt: ['augmenter', 'augmentation', 'hausse'], def: 'to become larger in number or amount', ex: 'The number of students continued to increase.', col: ['a sharp increase in', 'increase by 10%'], level: 'B1' },
        { word: 'rise', pos: 'verb / noun', fr: 'augmenter, monter / une hausse', frAlt: ['augmenter', 'monter', 'hausse'], def: 'to go up', ex: 'Prices began to rise in 2010.', col: ['a steady rise in', 'rise from… to…'], level: 'B1', note: 'Irrégulier : rise, rose, risen. Ne pas confondre avec « raise » (lever quelque chose).' },
        { word: 'climb', pos: 'verb', fr: 'grimper', frAlt: ['grimper', 'monter'], def: 'to go up gradually', ex: 'The figure began to climb after 2012.', level: 'B2' },
        { word: 'grow', pos: 'verb', fr: 'croître, augmenter', frAlt: ['croitre', 'augmenter', 'grandir'], def: 'to increase in size or number', ex: 'The population is expected to grow by 5%.', col: ['growth (noun)'], level: 'B1', note: 'Irrégulier : grow, grew, grown. Nom : growth.' },
        { word: 'jump', pos: 'verb / noun', fr: 'bondir / un bond', frAlt: ['bondir', 'bond', 'faire un bond'], def: 'to increase suddenly by a large amount', ex: 'Sales saw a jump of 40% in one year.', level: 'B2' },
        { word: 'soar', pos: 'verb', fr: 'monter en flèche, s’envoler', frAlt: ['monter en fleche', "s'envoler", 'flamber'], def: 'to rise very quickly to a high level', ex: 'House prices began to soar in the 1990s.', level: 'C1' },
        { word: 'peak', pos: 'noun / verb', fr: 'pic / atteindre un pic', frAlt: ['pic', 'sommet', 'atteindre un pic'], def: 'the highest point', ex: 'Sales reached a peak in 2015.', col: ['reach a peak', 'peak at'], level: 'B2' },
        { word: 'double', pos: 'verb', fr: 'doubler', def: 'to become twice as large', ex: 'The number of visitors will double by 2030.', col: ['triple (×3)'], level: 'B1' },
        { word: 'boom', pos: 'noun', fr: 'boom, forte croissance', frAlt: ['boom', 'essor', 'forte croissance'], def: 'a period of rapid growth', ex: 'There was a boom in online shopping during the pandemic.', level: 'B2' },
      ],
      cloze: [
        { s: 'The number of visitors ___ from 5,000 to 8,000.', a: 'went', opts: ['passed', 'knew', 'made'], why: 'Piège de francophone : on dit « go from… to… », jamais « pass from… to… ».', kind: 'vocab' },
        { s: 'Sales reached a ___ of 2 million in 2015.', a: 'peak', opts: ['pick', 'summit point', 'top-high'], why: '« reach a peak » = atteindre un pic. « pick » = choisir.', kind: 'collocation' },
        { s: 'There was a sharp ___ in unemployment in 2009.', a: 'rise', opts: ['rising', 'rose', 'risen'], why: 'Après « a sharp », il faut le nom : « a rise ».', kind: 'grammar' },
        { s: 'Oil prices have ___ since 2000.', a: 'soared', opts: ['soar', 'soars', 'soaring'], why: 'Present perfect (have + participe passé) : « have soared ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'The trend has known a substantial increase.', ok: false, fix: 'The trend has undergone a substantial increase.', why: 'Piège de francophone : « know » ne s’utilise que pour des personnes. On dit « undergo » ou « experience » une hausse.' },
        { s: 'Unemployment rose sharply in 2009.', ok: true, why: 'Correct : rise, rose, risen.' },
        { s: 'The number of students passed from 200 to 500.', ok: false, fix: 'The number of students went from 200 to 500.', why: '« pass » veut dire réussir (un examen). On dit « go from… to… » ou « rise from… to… ».' },
      ],
      sentences: [
        { en: 'Oil prices have soared since 2000.', fr: 'Les prix du pétrole ont flambé depuis 2000.' },
        { en: 'Sales reached a peak in 2015.', fr: 'Les ventes ont atteint un pic en 2015.' },
        { en: 'The number of visitors doubled.', fr: 'Le nombre de visiteurs a doublé.' },
      ],
    },
    {
      title: 'Going down & staying stable',
      words: [
        { word: 'decrease', pos: 'verb / noun', fr: 'diminuer / une diminution', frAlt: ['diminuer', 'baisser', 'diminution', 'baisse'], def: 'to become smaller in number or amount', ex: 'The number of smokers continued to decrease.', level: 'B1' },
        { word: 'fall', pos: 'verb / noun', fr: 'baisser, chuter / une baisse', frAlt: ['baisser', 'chuter', 'baisse', 'tomber'], def: 'to go down', ex: 'Car sales began to fall in 2008.', level: 'B1', note: 'Irrégulier : fall, fell, fallen. Ne pas confondre avec « feel, felt ».' },
        { word: 'decline', pos: 'verb / noun', fr: 'décliner / un déclin', frAlt: ['decliner', 'declin', 'baisser', 'baisse'], def: 'to become smaller or weaker', ex: 'There was a steady decline in newspaper sales.', level: 'B2' },
        { word: 'drop', pos: 'verb / noun', fr: 'baisser / une baisse', frAlt: ['baisser', 'chuter', 'baisse', 'chute'], def: 'to fall, often suddenly', ex: 'There was a sudden drop in temperature.', level: 'B1' },
        { word: 'plummet', pos: 'verb', fr: 'dégringoler, s’effondrer', frAlt: ['degringoler', "s'effondrer", 'chuter brutalement'], def: 'to fall very quickly and suddenly', ex: 'Share prices began to plummet in 2008.', level: 'C1' },
        { word: 'plunge', pos: 'verb / noun', fr: 'plonger, chuter fortement', frAlt: ['plonger', 'chuter fortement', 'chute'], def: 'to fall suddenly by a large amount', ex: 'Profits are expected to plunge this year.', level: 'C1' },
        { word: 'remain stable', pos: 'verb phrase', fr: 'rester stable', def: 'to stay at the same level', ex: 'The figure was expected to remain stable at 20%.', col: ['remain steady', 'remain constant', 'stay the same'], level: 'B1', alt: ['remain steady', 'remain constant'] },
        { word: 'level off', pos: 'phrasal verb', fr: 'se stabiliser', frAlt: ['se stabiliser'], def: 'to stop rising or falling and stay at the same level', ex: 'Sales started to level off after 2015.', level: 'C1', note: 'Passé britannique : levelled off.' },
        { word: 'fluctuate', pos: 'verb', fr: 'fluctuer', def: 'to go up and down', ex: 'Oil prices tend to fluctuate a lot.', col: ['fluctuate between… and…'], level: 'B2', note: 'Nom : a fluctuation.' },
        { word: 'hit a low', pos: 'verb phrase', fr: 'atteindre un creux', frAlt: ['atteindre son niveau le plus bas', 'atteindre un plancher'], def: 'to reach the lowest point', ex: 'Unemployment hit a low of 3% in 2019.', col: ['reach a low', 'hit a low of'], level: 'C1', alt: ['reach a low'] },
      ],
      cloze: [
        { s: 'The figure ___ steadily between 2005 and 2010.', a: 'fell', opts: ['felt', 'falled', 'feeled'], why: 'Prétérit de « fall » : « fell ». « felt » est le prétérit de « feel » (ressentir).', kind: 'grammar' },
        { s: 'Oil prices ___ throughout the year, going up and down.', a: 'fluctuated', opts: ['floated', 'flickered', 'fluctuation'], why: '« fluctuate » = monter et descendre. Ici, il faut le verbe au passé.', kind: 'vocab' },
        { s: 'After 2015, the number of users ___ off at around 3 million.', a: 'levelled', opts: ['put', 'laid', 'stood'], why: '« level off » = se stabiliser (orthographe britannique : levelled).', kind: 'vocab' },
        { s: 'Newspaper sales went through a slight ___.', a: 'decline', opts: ['declining', 'declined', 'declines'], why: 'Après « a slight », il faut un nom au singulier : « a decline ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'Sales remained steady at 40%.', ok: true, why: 'Correct.' },
        { s: 'The price of oil felt dramatically in 2015.', ok: false, fix: 'The price of oil fell dramatically in 2015.', why: '« fall, fell, fallen ». « felt » vient de « feel ».' },
        { s: 'It exists a fluctuation in the figures.', ok: false, fix: 'There is a fluctuation in the figures.', why: 'Piège de francophone : « il y a » = « there is / there are », jamais « it exists ».' },
      ],
      sentences: [
        { en: 'The figure remained stable for five years.', fr: 'Le chiffre est resté stable pendant cinq ans.' },
        { en: 'Unemployment fluctuated throughout the year.', fr: 'Le chômage a fluctué tout au long de l’année.' },
        { en: 'Sales levelled off after 2015.', fr: 'Les ventes se sont stabilisées après 2015.' },
      ],
    },
    {
      title: 'How much & how fast',
      words: [
        { word: 'sharply', pos: 'adverb', fr: 'fortement, brusquement', frAlt: ['fortement', 'brusquement', 'nettement'], def: 'suddenly and by a large amount', ex: 'Sales increased sharply in 2010.', col: ['a sharp rise (adjective)'], level: 'B2' },
        { word: 'steeply', pos: 'adverb', fr: 'en forte pente, fortement', frAlt: ['fortement', 'en fleche'], def: 'very quickly, like a steep hill', ex: 'Prices rose steeply after the crisis.', level: 'C1' },
        { word: 'dramatically', pos: 'adverb', fr: 'de façon spectaculaire', frAlt: ['de facon spectaculaire', 'considerablement', 'radicalement'], def: 'by a very large amount', ex: 'The number of cars on the road rose dramatically.', level: 'B2', note: 'Ne veut pas dire « dramatiquement » (tristement) : seulement « énormément ».' },
        { word: 'considerably', pos: 'adverb', fr: 'considérablement', frAlt: ['considerablement', 'nettement'], def: 'by a large amount', ex: 'Costs have increased considerably since 2015.', level: 'B2' },
        { word: 'substantial', pos: 'adjective', fr: 'important, considérable (quantité)', frAlt: ['important', 'considerable', 'substantiel'], def: 'large in amount', ex: 'There was a substantial increase in sales.', level: 'B2', note: 'Pour une quantité, jamais « important » : « a substantial / significant / considerable increase ».' },
        { word: 'significantly', pos: 'adverb', fr: 'de manière significative, nettement', frAlt: ['nettement', 'de maniere significative', 'sensiblement'], def: 'by an amount that is large enough to notice', ex: 'The figures for 2003 were significantly higher.', level: 'B2' },
        { word: 'steadily', pos: 'adverb', fr: 'régulièrement, de façon constante', frAlt: ['regulierement', 'de facon constante', 'constamment'], def: 'at a regular, even rate', ex: 'The population grew steadily over the decade.', level: 'B2' },
        { word: 'gradually', pos: 'adverb', fr: 'progressivement', frAlt: ['progressivement', 'graduellement', 'peu a peu'], def: 'slowly, over a long period', ex: 'Prices rose gradually over the decade.', level: 'B1' },
        { word: 'moderately', pos: 'adverb', fr: 'modérément', frAlt: ['moderement'], def: 'by a medium amount', ex: 'Exports grew moderately in the second half.', level: 'B2' },
        { word: 'slightly', pos: 'adverb', fr: 'légèrement', frAlt: ['legerement', 'un peu'], def: 'by a small amount', ex: 'The number of cars fell slightly.', col: ['a slight drop (adjective)'], level: 'B1' },
      ],
      cloze: [
        { s: 'Sales increased ___ in 2010.', a: 'sharply', opts: ['sharp', 'sharpness', 'sharped'], why: 'Après un verbe, il faut un adverbe : « increased sharply ». (a sharp increase = adjectif + nom)', kind: 'grammar' },
        { s: 'There was a ___ increase in prices.', a: 'considerable', opts: ['considerably', 'important', 'consider'], why: 'Avant un nom, un adjectif. Et jamais « important » pour une quantité.', kind: 'grammar' },
        { s: 'The population grew ___ over 50 years, about 1% each year.', a: 'gradually', opts: ['dramatically', 'sharply', 'steeply'], why: 'Une hausse lente et régulière : « gradually » ou « steadily ».', kind: 'vocab' },
        { s: 'Unemployment fell ___, from 5.1% to 5.0%.', a: 'slightly', opts: ['dramatically', 'substantially', 'sharply'], why: 'Une toute petite baisse : « slightly ».', kind: 'vocab' },
      ],
      judge: [
        { s: 'There was an important increase in unemployment.', ok: false, fix: 'There was a substantial increase in unemployment.', why: '« important » = important en qualité, jamais en quantité. On dit « substantial / significant / considerable ».' },
        { s: 'Sales rose slightly in March.', ok: true, why: 'Correct : verbe + adverbe.' },
        { s: 'The number of visitors increased dramatic.', ok: false, fix: 'The number of visitors increased dramatically.', why: 'Après un verbe, il faut l’adverbe en -ly.' },
      ],
      sentences: [
        { en: 'There was a significant increase in sales.', fr: 'Il y a eu une hausse significative des ventes.' },
        { en: 'Prices rose gradually over the decade.', fr: 'Les prix ont augmenté progressivement au cours de la décennie.' },
        { en: 'The number of cars fell slightly.', fr: 'Le nombre de voitures a légèrement baissé.' },
      ],
    },
    {
      title: 'Comparing figures & charts',
      words: [
        { word: 'twice as much as', pos: 'comparison', fr: 'deux fois plus que', frAlt: ['deux fois plus que'], def: 'two times the amount of (uncountable)', ex: 'Women spent twice as much as men on clothes.', level: 'B2', note: 'Indénombrable : as much as. Dénombrable : twice as many… as.' },
        { word: 'half as many as', pos: 'comparison', fr: 'deux fois moins que', frAlt: ['moitie moins que', 'deux fois moins que'], def: 'fifty per cent of the number of (countable)', ex: 'There were half as many visitors as in 2010.', level: 'B2' },
        { word: 'triple', pos: 'verb', fr: 'tripler', def: 'to become three times as large', ex: 'The price of electricity may triple by 2030.', level: 'B2' },
        { word: 'account for', pos: 'phrasal verb', fr: 'représenter (une part)', frAlt: ['representer', 'constituer'], def: 'to form a particular amount of a total', ex: 'Cars account for 60% of all journeys.', level: 'C1' },
        { word: 'proportion', pos: 'noun', fr: 'proportion, part', frAlt: ['proportion', 'part'], def: 'a part of a total', ex: 'The proportion of elderly people is rising.', col: ['a large proportion of', 'the proportion of'], level: 'B2' },
        { word: 'the majority of', pos: 'phrase', fr: 'la majorité de', def: 'more than half of', ex: 'The majority of students live at home.', col: ['the vast majority of'], level: 'B1' },
        { word: 'line graph', pos: 'noun', fr: 'graphique linéaire (courbe)', frAlt: ['graphique lineaire', 'courbe', 'graphique en courbe'], def: 'a chart that shows changes over time with lines', ex: 'The line graph shows changes in oil prices.', level: 'B1' },
        { word: 'bar chart', pos: 'noun', fr: 'diagramme en barres', frAlt: ['diagramme en barres', 'histogramme', 'diagramme en batons'], def: 'a chart that compares amounts with bars', ex: 'The bar chart compares five countries.', level: 'B1' },
        { word: 'pie chart', pos: 'noun', fr: 'diagramme circulaire (camembert)', frAlt: ['camembert', 'diagramme circulaire'], def: 'a circle divided into parts to show proportions', ex: 'The pie chart shows how households spend their money.', level: 'B1' },
        { word: 'table', pos: 'noun', fr: 'tableau', def: 'information arranged in rows and columns', ex: 'The table gives information about rail travel.', level: 'B1' },
      ],
      cloze: [
        { s: 'In 2020, China produced twice as ___ steel as India.', a: 'much', opts: ['many', 'more', 'most'], why: '« steel » est indénombrable : « twice as much… as ».', kind: 'grammar' },
        { s: 'Cars account ___ 60% of all journeys.', a: 'for', opts: ['to', 'of', 'in'], why: '« account for » = représenter.', kind: 'collocation' },
        { s: 'There were ___ cinemas in 2010 than in 1990.', a: 'fewer', opts: ['less', 'lesser', 'few'], why: '« cinemas » est dénombrable : « fewer ». « less » s’emploie avec l’indénombrable.', kind: 'grammar' },
        { s: 'The pie ___ shows how households spend their money.', a: 'chart', opts: ['graphic', 'cake', 'plan'], why: 'Un camembert se dit « a pie chart ».', kind: 'vocab' },
      ],
      judge: [
        { s: 'In 2004, China won nearly twice as many silver medals as the US.', ok: true, why: 'Correct : « medals » est dénombrable, donc « twice as many… as ».' },
        { s: 'There were less people at the concert than last year.', ok: false, fix: 'There were fewer people at the concert than last year.', why: '« people » est dénombrable : « fewer ».' },
        { s: 'The figures for 2003 were significantly higher than those for 2000.', ok: true, why: 'Correct : « significantly » + comparatif.' },
      ],
      sentences: [
        { en: 'This bar chart shows the number of students.', fr: 'Ce diagramme en barres montre le nombre d’étudiants.' },
        { en: 'Women spent twice as much as men.', fr: 'Les femmes ont dépensé deux fois plus que les hommes.' },
        { en: 'Cars account for half of all journeys.', fr: 'Les voitures représentent la moitié de tous les trajets.' },
      ],
    },
  ],
}

export default unit
