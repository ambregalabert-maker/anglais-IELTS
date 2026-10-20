import type { UnitContent } from './types'

// Thème IELTS : Media & Advertising.

const unit: UnitContent = {
  unitId: 'media',
  lessons: [
    {
      title: 'News & social media (B2)',
      words: [
        { word: 'headline', pos: 'noun', fr: 'gros titre', frAlt: ['titre', 'gros titre', 'une'], def: 'the title of a newspaper story', ex: 'The scandal made the headlines for weeks.', col: ['make the headlines', 'hit the headlines'], level: 'B2' },
        { word: 'broadcast', pos: 'verb / noun', fr: 'diffuser / émission', frAlt: ['diffuser', 'emission', 'retransmettre'], def: 'to send out a programme on television or radio', ex: 'The final will be broadcast live.', level: 'B2', note: 'Irrégulier : broadcast, broadcast, broadcast.' },
        { word: 'influencer', pos: 'noun', fr: 'influenceur', def: 'a person who affects what their online followers buy or think', ex: 'Brands pay influencers to promote their products.', level: 'B2' },
        { word: 'go viral', pos: 'verb phrase', fr: 'devenir viral', frAlt: ['faire le buzz'], def: 'to spread very quickly on the internet', ex: 'Her video went viral overnight.', level: 'B2', alt: ['went viral'] },
        { word: 'fake news', pos: 'noun', fr: 'fausses informations', frAlt: ['infox', 'fake news', 'fausses nouvelles'], def: 'false stories presented as real news', ex: 'Fake news can influence elections.', level: 'B2', note: 'Indénombrable : fake news IS.' },
        { word: 'advertisement', pos: 'noun', fr: 'publicité (une pub)', frAlt: ['publicite', 'pub', 'annonce'], def: 'a notice or short film that promotes a product', ex: 'Television advertisements target children.', col: ['an advertisement for', 'advertising (uncountable)'], level: 'B1', alt: ['advert', 'ad'], note: '« advertising » = la publicité en général (indénombrable).' },
        { word: 'target audience', pos: 'noun', fr: 'public cible', def: 'the group of people a message or product is aimed at', ex: 'Teenagers are the main target audience of this campaign.', level: 'B2' },
        { word: 'press', pos: 'noun', fr: 'la presse', frAlt: ['presse'], def: 'newspapers, magazines and journalists', ex: 'Freedom of the press is essential in a democracy.', col: ['freedom of the press', 'the tabloid press'], level: 'B2' },
        { word: 'follower', pos: 'noun', fr: 'abonné', frAlt: ['abonne', 'follower'], def: 'a person who follows an account on social media', ex: 'She has over a million followers.', level: 'B1' },
      ],
      cloze: [
        { s: 'The scandal ___ the headlines across the country.', a: 'hit', opts: ['made up', 'took', 'did'], why: '« hit / make the headlines » = faire la une.', kind: 'collocation' },
        { s: 'Fake news ___ spreading faster than ever.', a: 'is', opts: ['are', 'were', 'have'], why: '« news » est indénombrable : verbe au singulier.', kind: 'grammar' },
        { s: 'Advertising aimed ___ children should be regulated.', a: 'at', opts: ['to', 'for', 'on'], why: '« aimed at » = destiné à.', kind: 'grammar' },
      ],
      judge: [
        { s: 'I saw an interesting publicity on TV.', ok: false, fix: 'I saw an interesting advert on TV.', why: 'Faux ami : « publicity » = médiatisation. Une pub = an advert / an advertisement.' },
        { s: 'The match was broadcast live on national television.', ok: true, why: 'Correct : broadcast est invariable.' },
      ],
      sentences: [
        { en: 'Her video went viral overnight.', fr: 'Sa vidéo est devenue virale du jour au lendemain.' },
        { en: 'Brands pay influencers to promote products.', fr: 'Les marques paient des influenceurs pour promouvoir des produits.' },
      ],
    },
    {
      title: 'Advertising & influence (C1)',
      words: [
        { word: 'consumerism', pos: 'noun', fr: 'consumérisme, société de consommation', frAlt: ['consumerisme', 'societe de consommation'], def: 'the idea that buying more goods is good', ex: 'Advertising fuels consumerism.', level: 'C1' },
        { word: 'persuasive', pos: 'adjective', fr: 'persuasif', def: 'able to make people believe or do something', ex: 'Advertisers use persuasive techniques.', level: 'B2' },
        { word: 'endorse', pos: 'verb', fr: 'promouvoir, soutenir (publiquement)', frAlt: ['promouvoir', 'soutenir', 'cautionner'], def: 'to publicly support a product, often for money', ex: 'Famous athletes endorse sports brands.', col: ['celebrity endorsement'], level: 'C1' },
        { word: 'biased', pos: 'adjective', fr: 'partial, orienté', frAlt: ['partial', 'oriente', 'biaise'], def: 'unfairly favouring one side', ex: 'Some newspapers are clearly biased.', col: ['politically biased'], level: 'C1' },
        { word: 'censorship', pos: 'noun', fr: 'censure', def: 'the control of what people can say or publish', ex: 'Internet censorship is common in authoritarian states.', level: 'C1' },
        { word: 'tabloid', pos: 'noun', fr: 'presse à scandale, tabloïd', frAlt: ['presse a scandale', 'tabloid'], def: 'a popular newspaper with sensational stories', ex: 'The tabloids invaded the actor’s privacy.', level: 'C1' },
        { word: 'manipulate', pos: 'verb', fr: 'manipuler', def: 'to influence someone in a dishonest way', ex: 'Adverts can manipulate children’s desires.', level: 'B2' },
        { word: 'echo chamber', pos: 'noun', fr: 'bulle de filtres, chambre d’écho', frAlt: ["chambre d'echo", 'bulle de filtres'], def: 'a situation where people only hear opinions like their own', ex: 'Algorithms create echo chambers on social media.', level: 'C2' },
        { word: 'impartial', pos: 'adjective', fr: 'impartial', def: 'not supporting one side', ex: 'Public broadcasters must remain impartial.', level: 'C1' },
      ],
      cloze: [
        { s: 'Many sports stars ___ products in exchange for large fees.', a: 'endorse', opts: ['endure', 'enforce', 'endow'], why: '« endorse a product » = promouvoir publiquement un produit.', kind: 'vocab' },
        { s: 'Social media algorithms can trap users in ___ chambers.', a: 'echo', opts: ['eco', 'eggo', 'ego'], why: '« echo chamber » = chambre d’écho / bulle de filtres.', kind: 'vocab' },
        { s: 'Public broadcasters are expected to remain ___.', a: 'impartial', opts: ['partial', 'biased', 'imperial'], why: '« impartial » = neutre.', kind: 'vocab' },
      ],
      judge: [
        { s: 'Advertising encourages consumerism.', ok: true, why: 'Correct : « advertising » au sens général, sans article.' },
        { s: 'This newspaper is very partial: it always supports the government.', ok: false, fix: 'This newspaper is very biased: it always supports the government.', why: 'En anglais, « partial » au sens de partial est rare. On dit « biased ».' },
      ],
      sentences: [
        { en: 'Some newspapers are clearly biased.', fr: 'Certains journaux sont clairement partiaux.' },
        { en: 'Advertising fuels consumerism.', fr: 'La publicité alimente la société de consommation.' },
      ],
    },
    {
      title: 'Essay language (C2)',
      words: [
        { word: 'sensationalism', pos: 'noun', fr: 'sensationnalisme', def: 'presenting news in a shocking way to attract attention', ex: 'Sensationalism undermines serious journalism.', level: 'C2' },
        { word: 'undermine', pos: 'verb', fr: 'saper, affaiblir', frAlt: ['saper', 'affaiblir', 'nuire a'], def: 'to gradually make something weaker', ex: 'Fake news undermines trust in the media.', col: ['undermine trust', 'undermine democracy'], level: 'C1' },
        { word: 'scrutiny', pos: 'noun', fr: 'examen minutieux', frAlt: ['examen minutieux', 'surveillance', 'regard critique'], def: 'careful and detailed examination', ex: 'Politicians are under constant media scrutiny.', col: ['under scrutiny', 'public scrutiny'], level: 'C2' },
        { word: 'gullible', pos: 'adjective', fr: 'crédule, naïf', frAlt: ['credule', 'naif'], def: 'easily tricked into believing something', ex: 'Children are especially gullible consumers.', level: 'C1' },
        { word: 'clickbait', pos: 'noun', fr: 'piège à clics', frAlt: ['piege a clics', 'putaclic'], def: 'online content designed to make people click on it', ex: 'Many news sites rely on clickbait to attract readers.', level: 'C1' },
        { word: 'disseminate', pos: 'verb', fr: 'diffuser, propager', frAlt: ['diffuser', 'propager', 'repandre'], def: 'to spread information widely', ex: 'Social networks disseminate news within seconds.', level: 'C2' },
        { word: 'watchdog', pos: 'noun', fr: 'organe de contrôle, chien de garde', frAlt: ['organe de controle', 'chien de garde', 'regulateur'], def: 'a person or organisation that checks others act legally', ex: 'The press acts as a watchdog over government.', level: 'C2' },
        { word: 'pervasive', pos: 'adjective', fr: 'omniprésent, envahissant', frAlt: ['omnipresent', 'envahissant'], def: 'existing everywhere', ex: 'Advertising has become pervasive in modern life.', level: 'C2' },
        { word: 'accountable', pos: 'adjective', fr: 'responsable (qui doit rendre des comptes)', frAlt: ['responsable', 'redevable'], def: 'responsible for your actions and expected to explain them', ex: 'Tech companies must be held accountable for harmful content.', col: ['hold somebody accountable'], level: 'C1' },
      ],
      cloze: [
        { s: 'Fake news ___ public trust in journalism.', a: 'undermines', opts: ['underlines', 'undergoes', 'understates'], why: '« undermine » = saper. « underline » = souligner.', kind: 'vocab' },
        { s: 'Social media platforms must be held ___ for the content they host.', a: 'accountable', opts: ['countable', 'accounted', 'responsible of'], why: '« hold somebody accountable for » = tenir quelqu’un pour responsable de.', kind: 'collocation' },
        { s: 'Celebrities live under constant media ___.', a: 'scrutiny', opts: ['security', 'screening of', 'scripture'], why: '« under scrutiny » = sous le regard (critique) de.', kind: 'vocab' },
      ],
      judge: [
        { s: 'A free press acts as a watchdog over those in power.', ok: true, why: 'Correct.' },
        { s: 'Advertising has become very pervasive for children.', ok: false, fix: 'Advertising has become pervasive in children’s lives.', why: '« pervasive » décrit ce qui est partout : on dit « pervasive in ».' },
      ],
      sentences: [
        { en: 'Fake news undermines trust in the media.', fr: 'Les fausses informations sapent la confiance dans les médias.' },
        { en: 'Politicians are under constant scrutiny.', fr: 'Les responsables politiques sont constamment scrutés.' },
      ],
    },
  ],
}

export default unit
