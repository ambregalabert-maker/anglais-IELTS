import type { UnitContent } from './types'

// Thème IELTS : Work & Careers.

const unit: UnitContent = {
  unitId: 'work',
  lessons: [
    {
      title: 'The world of work (B2)',
      words: [
        { word: 'workload', pos: 'noun', fr: 'charge de travail', def: 'the amount of work a person has to do', ex: 'Teachers complain about their heavy workload.', col: ['a heavy workload', 'reduce the workload'], level: 'B2' },
        { word: 'job security', pos: 'noun', fr: 'sécurité de l’emploi', frAlt: ["securite de l'emploi"], def: 'the knowledge that you will not lose your job', ex: 'Many young people value job security over a high salary.', level: 'B2' },
        { word: 'promotion', pos: 'noun', fr: 'promotion (au travail)', frAlt: ['promotion', 'avancement'], def: 'a move to a higher position at work', ex: 'She got a promotion after only two years.', col: ['get a promotion', 'be up for promotion'], level: 'B1' },
        { word: 'colleague', pos: 'noun', fr: 'collègue', frAlt: ['collegue'], def: 'a person you work with', ex: 'I get on well with my colleagues.', level: 'B1' },
        { word: 'unemployment', pos: 'noun', fr: 'chômage', frAlt: ['chomage'], def: 'the state of not having a job', ex: 'Youth unemployment remains high in southern Europe.', col: ['youth unemployment', 'the unemployment rate'], level: 'B2' },
        { word: 'part-time', pos: 'adjective', fr: 'à temps partiel', frAlt: ['a temps partiel'], def: 'working fewer hours than a full working week', ex: 'Many students have part-time jobs.', col: ['a part-time job', 'work part-time'], level: 'B1' },
        { word: 'apply for', pos: 'phrasal verb', fr: 'postuler à, faire une demande de', frAlt: ['postuler a', 'postuler pour', 'candidater'], def: 'to formally ask for a job or a place', ex: 'She decided to apply for a job in London.', col: ['apply for a job', 'apply for a visa'], level: 'B1' },
        { word: 'work-life balance', pos: 'noun', fr: 'équilibre vie pro / vie perso', frAlt: ['equilibre vie professionnelle vie privee', 'equilibre vie pro vie perso'], def: 'a healthy balance between work and private life', ex: 'Flexible hours can improve work-life balance.', level: 'B2' },
        { word: 'commute', pos: 'verb / noun', fr: 'faire le trajet domicile-travail', frAlt: ['trajet domicile travail', 'faire la navette'], def: 'to travel regularly between home and work', ex: 'Millions of people commute to the city every day.', col: ['a long commute', 'commute to work'], level: 'B2' },
      ],
      cloze: [
        { s: 'Nurses often struggle with a ___ workload.', a: 'heavy', opts: ['big', 'strong', 'fat'], why: 'La collocation naturelle est « a heavy workload ».', kind: 'collocation' },
        { s: 'He was finally ___ a promotion after five years.', a: 'given', opts: ['made', 'done', 'taken'], why: 'On « get » ou « is given » une promotion.', kind: 'collocation' },
        { s: 'I am going to apply ___ a job at the bank.', a: 'for', opts: ['to', 'at', 'on'], why: '« apply for a job » (mais « apply to a company »).', kind: 'grammar' },
      ],
      judge: [
        { s: 'Many people spend two hours a day commuting.', ok: true, why: 'Correct : « spend time + -ing ».' },
        { s: 'My work is very interesting but I have too many works.', ok: false, fix: 'My job is very interesting, but I have too much work.', why: '« work » (le travail à faire) est indénombrable : « too much work ».' },
      ],
      sentences: [
        { en: 'Flexible hours improve work-life balance.', fr: 'Les horaires flexibles améliorent l’équilibre entre vie pro et vie perso.' },
        { en: 'Youth unemployment is a serious problem.', fr: 'Le chômage des jeunes est un problème grave.' },
      ],
    },
    {
      title: 'Careers & the economy (C1)',
      words: [
        { word: 'remote working', pos: 'noun', fr: 'télétravail', frAlt: ['teletravail', 'travail a distance'], def: 'working from home or another place away from the office', ex: 'Remote working became common after the pandemic.', level: 'C1', alt: ['remote work'] },
        { word: 'burnout', pos: 'noun', fr: 'épuisement professionnel', frAlt: ['epuisement professionnel', 'burn-out'], def: 'extreme tiredness caused by working too hard', ex: 'Long hours put employees at risk of burnout.', col: ['suffer from burnout'], level: 'C1' },
        { word: 'job satisfaction', pos: 'noun', fr: 'satisfaction au travail', def: 'the feeling of enjoying your work', ex: 'Job satisfaction matters more than salary for many workers.', level: 'B2' },
        { word: 'labour market', pos: 'noun', fr: 'marché du travail', frAlt: ['marche du travail'], def: 'the supply of people who want work and the jobs available', ex: 'Automation is transforming the labour market.', level: 'C1', alt: ['labor market'], note: 'Orthographe britannique : labour.' },
        { word: 'gig economy', pos: 'noun', fr: 'économie des petits boulots (ubérisation)', frAlt: ['economie des petits boulots', 'uberisation'], def: 'a system of short-term jobs paid per task', ex: 'Delivery drivers in the gig economy lack basic rights.', level: 'C1' },
        { word: 'redundant', pos: 'adjective', fr: 'licencié (économique)', frAlt: ['licencie', 'au chomage'], def: 'having lost your job because it is no longer needed', ex: 'Hundreds of workers were made redundant.', col: ['be made redundant', 'redundancy (noun)'], level: 'C1' },
        { word: 'entrepreneur', pos: 'noun', fr: 'entrepreneur', def: 'someone who starts their own business', ex: 'The government offers loans to young entrepreneurs.', level: 'B2' },
        { word: 'skilled', pos: 'adjective', fr: 'qualifié', frAlt: ['qualifie'], def: 'having the training needed to do a job well', ex: 'There is a shortage of skilled workers in construction.', col: ['skilled workers', 'highly skilled'], level: 'B2' },
        { word: 'productivity', pos: 'noun', fr: 'productivité', frAlt: ['productivite'], def: 'how much work is done in a period of time', ex: 'A four-day week may actually increase productivity.', col: ['boost productivity'], level: 'C1' },
      ],
      cloze: [
        { s: 'Two hundred employees were made ___ when the factory closed.', a: 'redundant', opts: ['redundancy', 'fired out', 'unemployed of'], why: '« be made redundant » = être licencié (économique).', kind: 'collocation' },
        { s: 'Shorter working weeks could ___ productivity.', a: 'boost', opts: ['rise', 'grow up', 'arise'], why: '« boost productivity » = stimuler la productivité. « rise » ne prend pas de complément.', kind: 'collocation' },
        { s: 'There is a serious shortage ___ skilled workers.', a: 'of', opts: ['in', 'for', 'about'], why: '« a shortage of something ».', kind: 'grammar' },
      ],
      judge: [
        { s: 'He was made redundant last year.', ok: true, why: 'Correct.' },
        { s: 'Employees which work remotely are often more productive.', ok: false, fix: 'Employees who work remotely are often more productive.', why: 'Pour des personnes, le pronom relatif est « who » (ou « that »), pas « which ».' },
      ],
      sentences: [
        { en: 'Automation is transforming the labour market.', fr: 'L’automatisation transforme le marché du travail.' },
        { en: 'Long hours can lead to burnout.', fr: 'Les longues journées peuvent mener à l’épuisement professionnel.' },
      ],
    },
    {
      title: 'Essay language (C2)',
      words: [
        { word: 'lucrative', pos: 'adjective', fr: 'lucratif, très rentable', frAlt: ['lucratif', 'rentable'], def: 'producing a lot of money', ex: 'Medicine and law remain lucrative careers.', col: ['a lucrative career', 'a lucrative contract'], level: 'C1' },
        { word: 'menial', pos: 'adjective', fr: 'subalterne, ingrat (travail)', frAlt: ['subalterne', 'ingrat'], def: 'boring, low-status and requiring little skill', ex: 'Robots could take over menial tasks.', col: ['menial tasks', 'menial jobs'], level: 'C2' },
        { word: 'incentive', pos: 'noun', fr: 'incitation, motivation', frAlt: ['incitation', 'motivation', 'prime'], def: 'something that encourages people to do something', ex: 'Bonuses provide an incentive to work harder.', col: ['a financial incentive', 'tax incentives'], level: 'C1' },
        { word: 'exploitative', pos: 'adjective', fr: 'abusif, qui exploite', frAlt: ['abusif', 'qui exploite'], def: 'treating workers unfairly to gain an advantage', ex: 'Some gig economy contracts are frankly exploitative.', level: 'C2' },
        { word: 'disposable income', pos: 'noun', fr: 'revenu disponible', def: 'money left to spend after paying taxes and bills', ex: 'Rising rents reduce people’s disposable income.', level: 'C1' },
        { word: 'meritocratic', pos: 'adjective', fr: 'méritocratique', frAlt: ['meritocratique'], def: 'rewarding people according to their ability and effort', ex: 'A truly meritocratic system rewards talent, not connections.', level: 'C2' },
        { word: 'tedious', pos: 'adjective', fr: 'fastidieux', def: 'boring and continuing for a long time', ex: 'Data entry is a tedious but necessary job.', level: 'C1' },
        { word: 'sought-after', pos: 'adjective', fr: 'recherché, prisé', frAlt: ['recherche', 'prise'], def: 'wanted by many people', ex: 'Programmers are highly sought-after in today’s economy.', col: ['highly sought-after'], level: 'C1' },
        { word: 'climb the career ladder', pos: 'idiom', fr: 'gravir les échelons', frAlt: ['gravir les echelons', 'monter en grade'], def: 'to move to higher positions in your job', ex: 'Women still find it harder to climb the career ladder.', level: 'C1' },
      ],
      cloze: [
        { s: 'Automation may take over ___ tasks, allowing humans to focus on creative work.', a: 'menial', opts: ['mental', 'manual of', 'minimal'], why: '« menial tasks » = tâches ingrates et peu qualifiées.', kind: 'vocab' },
        { s: 'Tax breaks give companies an ___ to invest in green technology.', a: 'incentive', opts: ['incitation', 'intention', 'invention'], why: '« incentive » = incitation. « incitation » n’existe pas dans ce sens en anglais.', kind: 'vocab' },
        { s: 'Data scientists are highly ___ by employers.', a: 'sought after', opts: ['searched for', 'looked', 'wanted after'], why: '« be highly sought after » = être très recherché.', kind: 'collocation' },
      ],
      judge: [
        { s: 'Programming has become a very lucrative career.', ok: true, why: 'Correct.' },
        { s: 'It is difficult for women to climb on the career ladder.', ok: false, fix: 'It is difficult for women to climb the career ladder.', why: '« climb the career ladder » s’emploie sans « on ».' },
      ],
      sentences: [
        { en: 'Bonuses provide an incentive to work harder.', fr: 'Les primes incitent à travailler davantage.' },
        { en: 'Robots could take over menial tasks.', fr: 'Les robots pourraient prendre en charge les tâches ingrates.' },
      ],
    },
  ],
}

export default unit
