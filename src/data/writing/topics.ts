// Banque de sujets IELTS Writing Task 2, avec un essai modèle pour chacun.
// Les essais modèles suivent la méthode du guide : 4 paragraphes, thèse neutre à la fin de l'introduction,
// opinion seulement dans la conclusion (3 phrases). Paragraphes séparés par une ligne vide.

export type Task2Type = 'opinion' | 'discuss' | 'advantages' | 'problem' | 'double'

export const TASK2_TYPES: Record<Task2Type, string> = {
  opinion: 'Opinion (agree / disagree)',
  discuss: 'Discuss both views',
  advantages: 'Advantages / disadvantages',
  problem: 'Problem / solution',
  double: 'Double question',
}

export interface Task2Topic {
  id: string
  type: Task2Type
  theme: string
  question: string
  model: string
}

export const TASK2_TOPICS: Task2Topic[] = [
  {
    id: 'languages',
    type: 'opinion',
    theme: 'Education',
    question: 'Some people believe that all university students should study a foreign language. To what extent do you agree or disagree?',
    model: `Many people believe that all university students should learn another language. However, some would say that this should remain a personal choice. This essay will examine both sides of this issue.

One important reason to make language study compulsory is that it significantly improves graduates’ employment prospects. In an increasingly globalised economy, companies value employees who can communicate with international clients and partners. For example, an engineering graduate who speaks German or Mandarin is far more likely to be recruited by a multinational firm than a candidate who speaks only one language. Learning a language also develops valuable cognitive skills, such as memory and problem-solving, which benefit students in every discipline. As a result, compulsory language courses would equip students with a skill that directly enhances their careers.

On the other hand, it can be argued that university timetables are already overloaded, and that adding a compulsory language would place an unfair burden on students. Medical or law students, for instance, face an intense workload, and an additional course might reduce the time they can devote to their core subjects. Some students may also lack motivation if they are forced to study a subject they did not choose. Nevertheless, this problem could be mitigated if universities offered flexible options, such as short online modules, rather than demanding full-length courses.

To conclude, studying another language can improve both employment opportunities and intercultural understanding, although it may add to students’ workload. In my opinion, university students should therefore be encouraged, and ideally required, to learn a foreign language. In future, universities could offer more flexible language courses so that students can choose a programme that suits their needs.`,
  },
  {
    id: 'technology-children',
    type: 'discuss',
    theme: 'Technology',
    question: 'Some people think that children should not be allowed to use smartphones until they are teenagers, while others believe that smartphones are useful tools for young children. Discuss both views and give your own opinion.',
    model: `Smartphones have become a ubiquitous part of modern childhood. While some argue that children should be kept away from these devices until adolescence, others maintain that they offer young users valuable benefits. This essay will discuss both views.

Those who favour restrictions point to the detrimental effects of excessive screen time on young children. Research suggests that heavy smartphone use can disrupt sleep, reduce physical activity and impair the ability to concentrate. Moreover, social media platforms are designed to be addictive, and young children lack the maturity to regulate their own use. Consequently, many parents and educators believe that delaying access protects children’s health and allows them to develop social skills through face-to-face interaction. Many paediatricians therefore recommend keeping smartphones out of bedrooms at night.

On the other hand, supporters of early access argue that smartphones can be powerful educational tools. Language-learning applications, interactive maths games and video calls with distant relatives can all enrich a child’s development. Furthermore, a phone allows parents to stay in contact with their children, which can provide reassurance when children travel to school alone. In an emergency, being able to contact a parent immediately can be invaluable. From this perspective, the key issue is not the device itself but how it is used.

In conclusion, smartphones present real risks to young children, but they can also support learning and family communication. In my view, children should only be given access to smartphones under strict parental supervision and with clear time limits. In future, schools and parents could work together to teach children responsible digital habits from an early age.`,
  },
  {
    id: 'remote-work',
    type: 'advantages',
    theme: 'Work',
    question: 'An increasing number of people now work from home rather than in an office. Do the advantages of this trend outweigh the disadvantages?',
    model: `In recent years, remote working has become increasingly common, accelerated by advances in technology and the global pandemic. While this trend offers clear benefits, it also raises some concerns. This essay will examine both the advantages and the disadvantages.

The most significant advantage of working from home is the flexibility it provides. Employees no longer need to spend hours commuting, which saves time and money and reduces stress. This additional time can be devoted to family, exercise or rest, which tends to improve work-life balance. Companies can also benefit, since they need less office space and can recruit talented staff from a much wider geographical area. Furthermore, a reduction in daily commuting lowers traffic congestion and carbon emissions, bringing wider environmental benefits.

Nevertheless, remote working also has notable drawbacks. Many employees report feelings of isolation, as they miss the informal conversations and sense of community that an office provides. In addition, the boundary between professional and private life can become blurred, with some workers finding it difficult to switch off at the end of the day. This can gradually lead to stress and burnout. For younger staff in particular, the lack of direct contact with experienced colleagues may limit opportunities to learn and to climb the career ladder.

To conclude, working from home offers greater flexibility and environmental benefits, although it can lead to isolation and an unhealthy blurring of work and home life. In my opinion, the advantages outweigh the disadvantages, provided that employees maintain regular contact with their teams. In future, a hybrid model combining office and remote work is likely to become the norm.`,
  },
  {
    id: 'obesity',
    type: 'problem',
    theme: 'Health',
    question: 'Obesity rates are rising in many countries. What are the main causes of this problem, and what measures could be taken to solve it?',
    model: `In many parts of the world, the proportion of people who are overweight or obese has increased dramatically over recent decades. This trend poses a serious threat to public health. This essay will examine the main causes of the problem and suggest possible solutions.

One major cause of rising obesity is the widespread availability of cheap, processed food. Products high in sugar, salt and fat are heavily advertised, particularly to children, and are often less expensive than fresh fruit and vegetables. In addition, modern lifestyles have become increasingly sedentary. Many people work at desks, travel by car and spend their free time in front of screens, which means they burn far fewer calories than previous generations. Long working hours also leave many people with little time to cook healthy meals at home.

Several measures could help to address this issue. Firstly, governments could introduce taxes on sugary drinks and use the revenue to subsidise healthy food, as several countries have already done with positive results. Secondly, restrictions on junk food advertising aimed at children would reduce the pressure on families. Finally, urban planning could encourage physical activity by providing safe cycle lanes, parks and sports facilities, making exercise a natural part of daily life.

In conclusion, obesity is largely driven by unhealthy diets and sedentary lifestyles, but it can be tackled through taxation, advertising controls and better urban design. In my view, a combination of these policies is far more effective than relying on individual willpower alone. In future, governments should treat obesity as a public health priority rather than a purely personal matter.`,
  },
  {
    id: 'tourism',
    type: 'double',
    theme: 'Travel',
    question: 'International tourism has increased dramatically in recent decades. Why is this the case? Is it a positive or negative development?',
    model: `Over the past few decades, the number of people travelling abroad for leisure has grown at an unprecedented rate. This essay will explain the reasons for this growth and then consider whether it is a positive or a negative development.

Several factors have contributed to the boom in international tourism. The most important is the emergence of low-cost airlines, which have made foreign travel affordable for millions of ordinary people. At the same time, rising incomes in China, India and other emerging economies have created a vast new middle class eager to explore the world. Moreover, the internet has made it easy to compare prices, book accommodation and discover new destinations, which has removed many of the practical barriers to travel.

The effects of this trend are mixed. On the positive side, tourism generates significant revenue and employment, particularly in developing countries, and it can promote intercultural understanding. On the negative side, mass tourism can damage fragile ecosystems, push up property prices for local residents and contribute to carbon emissions. Cities such as Venice and Barcelona now struggle with overtourism, as huge numbers of visitors overwhelm local infrastructure. In many popular destinations, residents feel that their neighbourhoods have been transformed into theme parks.

To conclude, international tourism has grown mainly because of cheaper flights, rising incomes and online booking, and its consequences are both economic and environmental. In my opinion, it remains a positive development overall, provided that it is carefully managed. In future, measures such as tourist taxes and visitor limits could help ensure that tourism benefits both travellers and host communities.`,
  },
  {
    id: 'crime-prison',
    type: 'opinion',
    theme: 'Crime',
    question: 'Some people believe that the best way to reduce crime is to give longer prison sentences. To what extent do you agree or disagree?',
    model: `Many people believe that longer prison sentences are the most effective way to reduce crime. However, others would say that the causes of crime must be addressed in other ways. This essay will examine both sides of this issue.

Supporters of longer sentences argue that they act as a powerful deterrent. If potential offenders know that they face many years in prison, they may think twice before committing a crime. In addition, keeping dangerous criminals in prison for longer protects the public, since offenders cannot reoffend while they are behind bars. For victims and their families, long sentences may also provide a sense that justice has been served. Long sentences also send a clear message about which behaviour society will not tolerate.

On the other hand, there is considerable evidence that longer sentences do not significantly reduce crime rates. Many crimes are committed impulsively or under the influence of drugs, when offenders do not consider the consequences. Moreover, prisons can become schools of crime, where young offenders learn from more experienced criminals. Rehabilitation programmes, education and job training, by contrast, have been shown to lower reoffending rates, as they help former prisoners reintegrate into society.

In conclusion, longer sentences may protect the public in the short term, but they do little to tackle the underlying causes of crime. In my view, therefore, I largely disagree that they are the best solution, and I believe rehabilitation and prevention deserve far greater investment. In future, governments should focus on education and social support in order to stop people from turning to crime in the first place.`,
  },
  {
    id: 'environment-individual',
    type: 'discuss',
    theme: 'Environment',
    question: 'Some people think that environmental problems are too big for individuals to solve, while others believe that individuals can make a real difference. Discuss both views and give your opinion.',
    model: `Environmental issues such as climate change and plastic pollution are among the greatest challenges facing humanity. While some argue that these problems are too vast for individuals to influence, others believe that personal action matters. This essay will discuss both views.

Those who believe that individuals are powerless point out that the vast majority of emissions are produced by industry, energy companies and transport systems. A single person recycling or cycling to work makes a negligible difference compared with a coal-fired power station. From this perspective, meaningful change can only come from governments and corporations, through regulations, carbon taxes and investment in renewable energy. Indeed, a small number of large corporations are responsible for a significant proportion of global emissions, which suggests that holding them accountable would achieve far more than changing individual habits.

On the other hand, many people argue that individual choices, when multiplied by millions, can have a considerable impact. Consumer demand for eco-friendly products has already pushed companies to reduce packaging and develop electric vehicles. Furthermore, individuals are also voters, and public pressure has played a crucial role in persuading governments to adopt environmental policies. Personal action can therefore create a ripple effect that extends far beyond one household. Small daily habits can also inspire friends and family to follow.

In conclusion, large-scale environmental problems require action by governments and businesses, but individual behaviour also influences markets and political decisions. In my opinion, both levels of action are essential and mutually reinforcing. In future, governments should make sustainable choices easier and cheaper so that every citizen can contribute to protecting the planet.`,
  },
  {
    id: 'city-countryside',
    type: 'advantages',
    theme: 'Cities',
    question: 'More and more people are moving from rural areas to cities. Do the advantages of living in a city outweigh the disadvantages?',
    model: `An increasing number of people are leaving the countryside to settle in urban areas, a trend known as urbanisation. Although city life offers many opportunities, it also has significant downsides. This essay will examine both the advantages and the disadvantages.

The main advantage of living in a city is access to employment and services. Cities concentrate businesses, universities and hospitals, which means that residents have a wider choice of jobs, better educational opportunities and faster access to healthcare. In addition, urban areas offer a rich cultural life, with museums, theatres and restaurants, and efficient public transport often makes owning a car unnecessary. Cities also tend to be more diverse and tolerant, offering opportunities to meet people from many different backgrounds.

However, city life also has serious drawbacks. The cost of living, and housing in particular, is often extremely high, and many young people are priced out of the areas where they work. Moreover, cities tend to suffer from traffic congestion, air pollution and noise, all of which can harm residents’ physical and mental health. Some people also feel isolated in large cities, despite being surrounded by millions of others. Finally, the fast pace of urban life can leave little time for rest.

To conclude, cities offer better jobs, services and cultural opportunities, but they are also expensive, polluted and sometimes lonely places to live. In my view, the advantages outweigh the disadvantages for most young people, although this balance may change as people grow older and start families. In future, investment in affordable housing and green spaces could make cities far more liveable.`,
  },
  {
    id: 'advertising-children',
    type: 'opinion',
    theme: 'Media',
    question: 'Advertising aimed at children should be banned. To what extent do you agree or disagree?',
    model: `Many people believe that advertising targeting children should be prohibited. However, others would say that such a ban would be unnecessary or impossible to enforce. This essay will examine both sides of this issue.

One important argument in favour of a ban is that children are particularly vulnerable to persuasive techniques. Young children often cannot distinguish between entertainment and advertising, and they tend to believe what they see on screen. As a result, advertisements for toys, sweets and fast food can create strong desires and lead to conflict within families. Moreover, the heavy promotion of unhealthy food has been linked to rising rates of childhood obesity. Advertisers also use popular cartoon characters and celebrities, which makes their messages particularly difficult for young viewers to resist.

On the other hand, opponents of a ban argue that it is the responsibility of parents, not governments, to guide their children. Advertising also funds much of the free content that children enjoy, such as television programmes and online videos. In addition, a complete ban would be difficult to enforce in the digital age, as children are exposed to influencer marketing and international websites that national laws cannot easily control. Many parents also argue that children need to learn how to deal with marketing at some point.

To conclude, advertising can exploit children’s vulnerability and encourage unhealthy habits, although a total ban raises practical difficulties. In my opinion, I largely agree that advertising aimed at young children should be banned, particularly for unhealthy food. In future, governments could also introduce stricter rules for online platforms and teach children to recognise marketing techniques.`,
  },
  {
    id: 'elderly-care',
    type: 'discuss',
    theme: 'Family',
    question: 'Some people think that elderly people should live with their families, while others believe they are better cared for in professional care homes. Discuss both views and give your opinion.',
    model: `As populations age, the question of how best to care for elderly people has become increasingly important. While some believe that older people should live with their families, others argue that professional care homes provide better support. This essay will discuss both views.

Those who favour family care emphasise the emotional benefits of living with relatives. Elderly people who remain with their children and grandchildren are less likely to feel lonely or marginalised, and they can continue to play an active role in family life. In many cultures, caring for one’s parents is also regarded as a moral duty. Moreover, intergenerational living can benefit younger family members, who learn from the experience and wisdom of their grandparents.

On the other hand, supporters of care homes point out that many elderly people have complex medical needs that families are not trained to meet. Professional staff can provide round-the-clock care, specialised equipment and immediate medical attention. In addition, modern families often live in small homes and both partners usually work full-time, which makes it extremely difficult to look after a dependent relative. Care homes can also offer social activities with people of the same age. This can reduce the isolation that some elderly people experience at home.

In conclusion, family care offers emotional warmth, while care homes provide professional medical support and relieve the burden on working families. In my view, the best option depends on the health of the individual, and families should keep elderly relatives at home whenever their needs allow. In future, governments could support families with financial assistance and home visits by trained carers.`,
  },
  {
    id: 'space-exploration',
    type: 'opinion',
    theme: 'Science',
    question: 'Some people believe that governments should spend money on space exploration, while others think this money should be spent on problems on Earth. To what extent do you agree that space exploration is a waste of money?',
    model: `Many people believe that the vast sums spent on space exploration would be better used to solve problems on Earth. However, others would say that space research brings important benefits. This essay will examine both sides of this issue.

Critics of space programmes argue that the costs are enormous at a time when millions of people lack food, clean water and healthcare. A single mission to Mars can cost billions of dollars, money that could build hospitals, schools and sanitation systems. From this perspective, exploring distant planets seems a luxury that humanity cannot afford while urgent problems remain unsolved at home. Moreover, some private space projects appear to serve the ambitions of a few billionaires rather than the needs of humanity as a whole.

On the other hand, space research has produced many technologies that improve everyday life. Satellite systems enable weather forecasting, global communication and navigation, while research for space missions has contributed to advances in medical imaging and water purification. Furthermore, satellites play a crucial role in monitoring climate change and natural disasters, which directly helps us to protect the Earth. Space exploration also inspires young people to pursue careers in science and engineering. This inspiration benefits the wider economy.

In conclusion, space exploration is undoubtedly expensive, but it generates scientific, technological and environmental benefits for people on Earth. In my opinion, I therefore disagree that it is a waste of money, although spending should be balanced with investment in urgent social needs. In future, international cooperation could reduce the costs of space programmes and ensure that their benefits are widely shared.`,
  },
  {
    id: 'traffic',
    type: 'problem',
    theme: 'Cities',
    question: 'Traffic congestion is becoming a serious problem in many cities. What are the causes, and what solutions can you suggest?',
    model: `Traffic congestion has become a major problem in cities around the world, causing delays, pollution and stress for millions of commuters. This essay will examine the main causes of this problem and propose some possible solutions.

The primary cause of congestion is the rapid growth in car ownership. As incomes rise, more families can afford a car, and many people prefer the comfort and convenience of driving to using public transport. In addition, poor urban planning has made the problem worse. In many cities, housing is located far from workplaces, and suburbs are poorly connected to the centre, which forces residents to commute long distances by car. In addition, many cities have failed to invest in public transport for decades.

Several measures could help to alleviate congestion. Firstly, governments should invest in fast, reliable and affordable public transport, as people will only leave their cars at home if there is a genuine alternative. Secondly, congestion charges, such as the one introduced in London, can discourage unnecessary journeys into city centres while raising money for transport improvements. Finally, encouraging remote working and building safe cycle lanes would reduce the number of vehicles on the road during rush hour.

In conclusion, congestion is mainly caused by rising car ownership and poor urban planning, but it can be reduced through better public transport, congestion charges and alternative ways of travelling. In my view, investment in public transport is the most effective solution in the long term. In future, cities should be designed so that homes, jobs and services are within easy reach of one another.`,
  },
  {
    id: 'university-free',
    type: 'opinion',
    theme: 'Education',
    question: 'University education should be free for all students. To what extent do you agree or disagree?',
    model: `Many people believe that higher education should be provided free of charge to every student. However, others would say that students should contribute to the cost of their studies. This essay will examine both sides of this issue.

One important argument for free university education is that it creates a level playing field. When tuition fees are high, talented students from low-income families may decide not to apply, fearing years of debt. Free education ensures that access depends on ability rather than wealth. Moreover, society as a whole benefits from a highly educated workforce, as graduates tend to earn more, pay higher taxes and contribute to innovation and economic growth.

On the other hand, critics argue that free tuition places a heavy burden on taxpayers, including those who never attend university. Public funds are limited, and money spent on universities cannot be spent on schools, healthcare or housing. In addition, when education is free, universities may become underfunded and overcrowded, which can reduce the quality of teaching. Some also argue that students who pay fees take their studies more seriously. There is also a fairness issue, as low-paid workers who never attended university would help to fund the education of future high earners.

In conclusion, free higher education promotes equal opportunity and benefits society, although it is costly for taxpayers and may affect teaching quality. In my opinion, I largely agree that university should be free, or at least that fees should be repaid only once graduates earn a reasonable salary. In future, governments could combine public funding with income-based repayment schemes to keep universities both accessible and well-resourced.`,
  },
  {
    id: 'social-media-news',
    type: 'advantages',
    theme: 'Media',
    question: 'Nowadays many people get their news from social media rather than from newspapers or television. Do the advantages of this development outweigh the disadvantages?',
    model: `In recent years, social media has overtaken traditional newspapers and television as the main source of news for many people, particularly the young. This development has both benefits and drawbacks. This essay will examine both the advantages and the disadvantages.

The most obvious advantage of social media is speed and accessibility. News is available instantly and free of charge on a smartphone, and users can follow events as they unfold. Furthermore, social media gives a voice to ordinary people, who can share eyewitness accounts and perspectives that traditional media might ignore. This can make news coverage more diverse and hold powerful institutions accountable. In addition, users can choose the topics that interest them most and receive personalised updates, which encourages young people in particular to follow current affairs.

However, the disadvantages are significant. Unlike professional journalism, content on social media is rarely checked, and misinformation spreads faster than accurate reporting. In addition, algorithms tend to show users content that confirms their existing beliefs, trapping them in echo chambers and contributing to political polarisation. The decline of traditional media has also reduced funding for investigative journalism, which plays a vital role in democratic societies. Many local newspapers have already closed, leaving entire communities without reliable reporting on local issues.

To conclude, social media makes news faster, cheaper and more diverse, but it also spreads misinformation and reinforces existing opinions. In my view, the disadvantages currently outweigh the advantages, as reliable information is essential to a healthy democracy. In future, schools should teach media literacy so that young people can evaluate the reliability of what they read online.`,
  },
  {
    id: 'globalisation-culture',
    type: 'discuss',
    theme: 'Globalisation',
    question: 'Some people believe that globalisation is destroying local cultures, while others think it allows cultures to share and develop. Discuss both views and give your own opinion.',
    model: `Globalisation has connected countries through trade, travel and technology to an unprecedented extent. While some fear that this process is erasing local cultures, others believe that it enables cultures to exchange ideas and evolve. This essay will discuss both views.

Those who see globalisation as a threat point to the dominance of a small number of multinational brands and Western media. The same fast-food chains, clothing stores and Hollywood films can now be found in almost every city, which can lead to the homogenisation of lifestyles. Moreover, many indigenous languages are disappearing as young people adopt English or other dominant languages in order to access education and employment. Traditional crafts and local businesses may also struggle to compete with cheap, mass-produced imports.

On the other hand, supporters of globalisation argue that cultural exchange has always enriched societies. Thanks to the internet and international travel, people can now discover music, cuisine and literature from all over the world, and local traditions can reach a global audience. Korean pop music and Japanese animation, for example, have become internationally popular while remaining distinctly Asian. In this sense, globalisation can strengthen and spread local cultures rather than destroy them. Contact with other cultures can also encourage people to value their own traditions more highly.

In conclusion, globalisation can threaten traditional ways of life, but it also creates opportunities for cultures to share and develop. In my view, the outcome depends largely on whether communities actively preserve their heritage. In future, governments could support local languages, crafts and festivals so that globalisation enriches rather than erodes cultural diversity.`,
  },
  {
    id: 'gap-year',
    type: 'advantages',
    theme: 'Education',
    question: 'Some students take a year off between finishing school and starting university, often to travel or work. Do the advantages of this outweigh the disadvantages?',
    model: `It has become increasingly common for students to take a gap year between school and university, during which they may travel, work or volunteer. This practice has both advantages and disadvantages. This essay will examine both sides.

The main advantage of a gap year is that it allows young people to gain maturity and life experience. Travelling or working abroad forces students to become more independent, manage their own budget and adapt to unfamiliar situations. As a result, many return with greater self-confidence and a clearer idea of what they want to study. In addition, work experience and volunteering can strengthen a student’s university applications and future CV. Volunteering abroad can also develop empathy and an awareness of global issues that is difficult to acquire in a classroom.

Nevertheless, a gap year also has potential drawbacks. Some students lose their study habits and find it difficult to return to academic work after a year away from the classroom. Moreover, travelling abroad can be expensive, which means that gap years are often only available to students from wealthier families. Without a clear plan, a gap year may also become a period of inactivity rather than personal growth. Some students also decide never to start their degree.

To conclude, a gap year can help students mature and gain valuable experience, although it may disrupt their studies and is not affordable for everyone. In my opinion, the advantages outweigh the disadvantages, provided that the year is carefully planned. In future, schools and universities could offer guidance and funding so that more students can benefit from a structured gap year.`,
  },
  {
    id: 'animal-testing',
    type: 'opinion',
    theme: 'Science',
    question: 'Some people think that using animals for medical research is necessary, while others believe it is cruel and should be banned. To what extent do you agree that animal testing should be banned?',
    model: `Many people believe that experiments on animals are essential for medical progress. However, others would say that such testing is cruel and should be prohibited. This essay will examine both sides of this issue.

Supporters of animal testing argue that it has played a crucial role in developing life-saving treatments. Vaccines, antibiotics and surgical techniques have all been tested on animals before being used on humans, and it is difficult to study the effects of a new drug on a whole living organism in any other way. From this perspective, banning animal research could slow down medical progress and put human lives at risk. Strict regulations already exist in many countries to minimise animal suffering and to ensure that animals are used only when no alternative is available.

On the other hand, opponents argue that inflicting pain on animals is morally unacceptable, particularly when alternatives are increasingly available. Computer modelling, laboratory-grown tissue and advanced cell cultures can now replace many animal experiments. These methods are often faster and cheaper. Moreover, results from animal studies do not always apply to humans, since different species can react very differently to the same substance. For this reason, critics claim that animal testing is not only cruel but also scientifically unreliable in many cases.

In conclusion, animal testing has contributed to important medical advances, but it raises serious ethical questions and is increasingly being replaced by alternative methods. In my view, it should not be banned immediately, but it should be strictly limited to essential medical research. In future, greater investment in alternative technologies could make animal experiments unnecessary altogether.`,
  },
  {
    id: 'ageing-population',
    type: 'problem',
    theme: 'Health',
    question: 'In many countries, the proportion of older people is increasing. What problems does this cause, and what can be done to address them?',
    model: `In many developed countries, people are living longer and birth rates are falling, which means that the proportion of elderly people in the population is steadily increasing. This essay will examine the problems caused by an ageing population and suggest some possible solutions.

The most serious problem is the financial strain on public services. As the number of retired people grows, governments must spend more on pensions and healthcare, while the working-age population that pays taxes becomes smaller. In addition, health and care systems may become overburdened, as older people are more likely to suffer from chronic illnesses that require long-term treatment. Many elderly people also experience loneliness, particularly when their families live far away. Furthermore, businesses may face shortages of workers in key sectors such as construction and nursing.

Several measures could help to address these challenges. Firstly, governments could gradually raise the retirement age, reflecting the fact that people now remain healthy for longer. Secondly, encouraging skilled immigration would help to maintain the size of the workforce and support the economy. Finally, investment in preventive healthcare and community programmes could keep older people healthy, active and socially connected for as long as possible. Technology, such as home monitoring devices, could also help older people to live independently.

In conclusion, an ageing population places pressure on pensions, healthcare and social care, but these problems can be eased by later retirement, immigration and preventive policies. In my view, a combination of these measures offers the most sustainable solution. In future, societies should also learn to value the experience of older people and create more opportunities for them to contribute.`,
  },
  {
    id: 'online-shopping',
    type: 'double',
    theme: 'Technology',
    question: 'More and more people are shopping online instead of in shops. Why is this happening? What effects will this have on towns and cities?',
    model: `Online shopping has grown rapidly over the past decade, and many consumers now buy everything from groceries to furniture on the internet. This essay will explain the reasons for this trend and examine its effects on towns and cities.

There are several reasons why online shopping has become so popular. The most important is convenience: customers can compare prices, read reviews and place orders at any time without leaving their homes. In addition, online retailers can often offer lower prices than traditional shops, as they do not have to pay high rents for city-centre premises. The pandemic also accelerated this trend, as millions of people were forced to shop online and many continued afterwards. Online platforms also offer a far wider range of products than any physical shop could display.

This development is having a significant impact on urban areas. Many high streets have experienced a decline, as traditional shops struggle to compete and close down, leaving empty buildings and fewer jobs. At the same time, the increase in home deliveries has added to traffic congestion and pollution in residential areas. However, some cities are responding creatively by turning empty shops into cafés, cultural spaces and housing, which may help town centres to reinvent themselves.

In conclusion, online shopping has grown because of its convenience and lower prices, and it is transforming town centres and increasing delivery traffic. In my view, this trend is irreversible, so cities must adapt rather than resist it. In future, town centres are likely to focus more on experiences, services and community activities than on traditional retail.`,
  },
  {
    id: 'competition-cooperation',
    type: 'discuss',
    theme: 'Education',
    question: 'Some people think that a sense of competition in children should be encouraged, while others believe that children who learn to cooperate become more useful adults. Discuss both views and give your opinion.',
    model: `Parents and educators often disagree about whether children should be encouraged to compete or to cooperate. While some believe that competition prepares children for adult life, others argue that cooperation produces more valuable members of society. This essay will discuss both views.

Those who favour competition argue that it motivates children to work hard and achieve their full potential. Competitive sports, exams and contests teach young people to set goals, persevere and cope with both success and failure. Moreover, adult life is often competitive: candidates compete for university places and jobs, and companies compete for customers. From this perspective, learning to compete at an early age prepares children for the realities of the modern world. Competition can also help talented children to stand out and be recognised.

On the other hand, supporters of cooperation emphasise that most modern workplaces depend on teamwork. Engineers, doctors and researchers rarely work alone; they need to communicate, share ideas and resolve conflicts with colleagues. Children who learn to cooperate develop empathy, communication skills and the ability to compromise, all of which are highly valued by employers. Excessive competition, by contrast, can create anxiety and discourage less confident children. Children who constantly lose may simply give up trying altogether.

In conclusion, competition can motivate children and prepare them for a challenging world, whereas cooperation develops the teamwork and empathy that modern society requires. In my opinion, the two are not mutually exclusive, and schools should foster both in a balanced way. In future, education systems could place greater emphasis on group projects while maintaining healthy forms of competition.`,
  },
  {
    id: 'museums-free',
    type: 'opinion',
    theme: 'Travel',
    question: 'Museums and art galleries should be free for everyone. To what extent do you agree or disagree?',
    model: `Many people believe that museums and art galleries should not charge an entrance fee. However, others would say that visitors should help to pay for these institutions. This essay will examine both sides of this issue.

One important argument for free entry is that culture should be accessible to everyone, regardless of income. Entrance fees can discourage low-income families, students and young people from visiting, even though museums play an important educational role. In the United Kingdom, for example, visitor numbers at national museums rose dramatically after entrance fees were abolished in 2001. Free access can therefore broaden participation and help people to understand their history and heritage. Museums also offer a free, safe and educational space where families can spend time together during school holidays.

On the other hand, museums are expensive to run, as they must maintain buildings, protect valuable collections and pay qualified staff. If entry is free, these costs must be covered by taxpayers, including those who never visit museums, or by private sponsors whose interests may influence exhibitions. Furthermore, a large proportion of visitors to famous museums are international tourists, who could easily afford a reasonable fee. Charging them would generate substantial revenue for conservation work.

To conclude, free entry makes culture accessible to all and encourages education, although it places a financial burden on taxpayers. In my opinion, I largely agree that museums should be free for local residents, while tourists could reasonably be asked to pay. In future, a combination of public funding, donations and charges for special exhibitions could keep museums both accessible and financially sustainable.`,
  },
]
