// Documents pour IELTS Writing Task 1 (données inventées pour l'entraînement), avec réponse modèle.
// Les graphiques sont dessinés en SVG par components/Chart.tsx.

export type ChartKind = 'line' | 'bar' | 'pie' | 'table'

export interface ChartSeries {
  name: string
  values: number[]
}

export interface Task1Chart {
  id: string
  kind: ChartKind
  title: string
  unit: string // ex. « % », « thousands »
  labels: string[] // abscisses (années, catégories) ou parts du camembert
  series: ChartSeries[] // pour un camembert : une série par camembert (ex. 1980, 2020)
  countable: boolean // les quantités sont-elles dénombrables (students) ou non (money, energy) ?
  noun: string // ce qui est mesuré, pour les phrases générées (ex. « households with internet access »)
  question: string
  overview: { correct: string; wrong: string[] }
  model: string
}

export const TASK1_CHARTS: Task1Chart[] = [
  {
    id: 'internet',
    kind: 'line',
    title: 'Households with internet access (%)',
    unit: '%',
    labels: ['2000', '2005', '2010', '2015', '2020'],
    series: [
      { name: 'UK', values: [25, 55, 73, 86, 96] },
      { name: 'Brazil', values: [3, 13, 27, 51, 71] },
      { name: 'India', values: [1, 2, 7, 15, 43] },
    ],
    countable: true,
    noun: 'the proportion of households with internet access',
    question: 'The line graph shows the percentage of households with internet access in three countries between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    overview: {
      correct: 'Overall, internet access rose in all three countries, with the UK remaining far ahead throughout the period.',
      wrong: ['Overall, internet access in India rose from 1% in 2000 to 43% in 2020.', 'Overall, Brazil had the highest rate of internet access in 2020.'],
    },
    model: `The line graph illustrates the proportion of households with access to the internet in the UK, Brazil and India over a twenty-year period from 2000 to 2020.

Overall, internet access increased substantially in all three countries. The UK had the highest level of access throughout the period, while India consistently had the lowest, despite a dramatic rise in the final five years.

In 2000, a quarter of British households were connected to the internet, compared with just 3% in Brazil and 1% in India. The figure for the UK then climbed rapidly to 73% in 2010, before levelling off at almost universal access, 96%, by 2020.

Brazil experienced steady growth, with access rising from 13% in 2005 to 51% in 2015, and reaching 71% at the end of the period. In India, by contrast, the proportion remained very low until 2010, at only 7%. However, it then grew considerably, almost tripling between 2015 and 2020 to reach 43%, although this was still less than half the British figure.`,
  },
  {
    id: 'leisure',
    kind: 'bar',
    title: 'Average weekly hours spent on leisure activities, by age group',
    unit: 'hours',
    labels: ['16–24', '25–44', '45–64', '65+'],
    series: [
      { name: 'Watching TV', values: [8, 10, 15, 22] },
      { name: 'Social media', values: [18, 11, 6, 2] },
      { name: 'Sport', values: [6, 4, 3, 3] },
    ],
    countable: false,
    noun: 'time spent',
    question: 'The bar chart shows the average number of hours per week that people in different age groups spent on three leisure activities. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    overview: {
      correct: 'Overall, television viewing increased with age, whereas the use of social media declined sharply among older groups.',
      wrong: ['Overall, people aged 16–24 spent 18 hours a week on social media.', 'Overall, all age groups spent the same amount of time on sport.'],
    },
    model: `The bar chart compares the average amount of time that people in four age groups spent each week watching television, using social media and doing sport.

Overall, the time spent watching television rose steadily with age, while social media use followed the opposite pattern. Sport was the least popular of the three activities for every age group.

The youngest group, aged 16 to 24, spent 18 hours a week on social media, more than twice as much time as they spent watching television (8 hours). This figure fell significantly in each subsequent age group, dropping to just 2 hours among those aged 65 and over.

Television viewing, by contrast, increased from 10 hours a week for people aged 25 to 44 to 15 hours for the 45 to 64 group, and reached a peak of 22 hours among the over-65s, making it by far their most common activity. As for sport, young people spent 6 hours a week exercising, while the figure for all other age groups was between 3 and 4 hours.`,
  },
  {
    id: 'spending',
    kind: 'pie',
    title: 'Average household expenditure (%)',
    unit: '%',
    labels: ['Housing', 'Food', 'Transport', 'Leisure', 'Other'],
    series: [
      { name: '1980', values: [20, 32, 14, 9, 25] },
      { name: '2020', values: [34, 15, 17, 18, 16] },
    ],
    countable: false,
    noun: 'the proportion of spending',
    question: 'The pie charts show how the average household in one country spent its income in 1980 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    overview: {
      correct: 'Overall, housing replaced food as the largest area of household spending, and the share devoted to leisure doubled.',
      wrong: ['Overall, households spent 17% of their income on transport in 2020.', 'Overall, the pattern of household spending remained almost unchanged.'],
    },
    model: `The pie charts illustrate the proportion of household income spent on five categories in a particular country in 1980 and 2020.

Overall, there was a significant shift in spending patterns over the forty-year period. Housing replaced food as the largest expense, while the share of income spent on leisure doubled.

In 1980, food accounted for the largest share of household expenditure, at almost a third (32%). By 2020, however, this proportion had more than halved to just 15%. Housing, by contrast, rose from a fifth of spending (20%) to over a third (34%), becoming by far the most important category. This suggests that the cost of accommodation rose much faster than other expenses.

The proportion spent on leisure activities also increased considerably, from 9% to 18%, while transport rose only slightly, from 14% to 17%. Finally, spending on other items fell from a quarter of the total in 1980 to 16% in 2020. As a result, by 2020 housing alone accounted for more than twice the share of food, reversing the situation of forty years earlier.`,
  },
  {
    id: 'students',
    kind: 'table',
    title: 'International students (thousands)',
    unit: 'thousands',
    labels: ['USA', 'UK', 'Australia', 'Canada', 'Germany'],
    series: [
      { name: '2010', values: [690, 370, 270, 140, 180] },
      { name: '2020', values: [1080, 550, 460, 500, 300] },
    ],
    countable: true,
    noun: 'the number of international students',
    question: 'The table shows the number of international students in five countries in 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    overview: {
      correct: 'Overall, the number of international students increased in all five countries, and the USA remained the most popular destination.',
      wrong: ['Overall, Canada had 500,000 international students in 2020.', 'Overall, the number of international students fell in most countries.'],
    },
    model: `The table compares the number of international students in five countries in 2010 and 2020.

Overall, all five countries attracted more international students at the end of the decade than at the beginning. The USA hosted by far the largest number in both years, while Canada experienced the most dramatic growth.

In 2010, the USA had 690,000 international students, almost twice as many as the UK (370,000). By 2020, the American figure had risen to over one million, still roughly double the British total of 550,000. The UK therefore remained the second most popular destination.

Australia and Germany also saw considerable increases, from 270,000 to 460,000 and from 180,000 to 300,000 respectively. The most striking change, however, was in Canada, where the number of international students more than tripled, from 140,000 to 500,000. As a result, Canada overtook both Germany and Australia to become the third most popular destination in 2020.`,
  },
  {
    id: 'fastfood',
    kind: 'line',
    title: 'Fast food eaten by teenagers (grams per week)',
    unit: 'g',
    labels: ['1975', '1980', '1985', '1990', '1995', '2000'],
    series: [
      { name: 'Fish and chips', values: [300, 280, 220, 180, 120, 90] },
      { name: 'Pizza', values: [20, 60, 110, 200, 250, 270] },
      { name: 'Hamburgers', values: [10, 40, 100, 220, 290, 300] },
    ],
    countable: false,
    noun: 'consumption',
    question: 'The line graph shows the amount of three kinds of fast food eaten by teenagers in one country between 1975 and 2000. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    overview: {
      correct: 'Overall, fish and chips became much less popular, whereas consumption of pizza and hamburgers rose dramatically.',
      wrong: ['Overall, teenagers ate 300 grams of hamburgers per week in 2000.', 'Overall, all three types of fast food became less popular.'],
    },
    model: `The line graph illustrates how much fish and chips, pizza and hamburgers teenagers in one country consumed per week between 1975 and 2000.

Overall, there was a clear change in eating habits. Fish and chips went from being the most popular fast food to the least popular, whereas pizza and hamburgers became increasingly common.

In 1975, teenagers ate 300 grams of fish and chips per week, far more than the other two foods, which stood at only 20 grams for pizza and 10 grams for hamburgers. However, over the following 25 years, consumption of fish and chips fell steadily, reaching just 90 grams in 2000, less than a third of its original level.

By contrast, the consumption of hamburgers soared, overtaking fish and chips around 1990 and peaking at 300 grams in 2000. Pizza followed a similar upward trend, rising sharply between 1980 and 1990 before levelling off at around 270 grams at the end of the period.`,
  },
  {
    id: 'electricity',
    kind: 'bar',
    title: 'Sources of electricity (%)',
    unit: '%',
    labels: ['Coal', 'Gas', 'Nuclear', 'Renewables'],
    series: [
      { name: '2000', values: [45, 30, 20, 5] },
      { name: '2020', values: [10, 35, 18, 37] },
    ],
    countable: false,
    noun: 'the share of electricity',
    question: 'The bar chart shows the proportion of electricity produced from four sources in one country in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    overview: {
      correct: 'Overall, coal was largely replaced by renewable energy, which became the leading source of electricity by 2020.',
      wrong: ['Overall, nuclear power produced 18% of electricity in 2020.', 'Overall, coal remained the main source of electricity.'],
    },
    model: `The bar chart compares the percentage of electricity generated from coal, gas, nuclear power and renewable sources in a particular country in 2000 and 2020.

Overall, the energy mix changed dramatically over the twenty-year period. Coal, the dominant source in 2000, became the least significant by 2020, while renewable energy grew to become the largest source of electricity.

In 2000, coal accounted for 45% of electricity production, followed by gas at 30% and nuclear power at 20%. Renewables made up only 5% of the total. Coal was therefore responsible for more electricity than nuclear power and renewables combined.

By 2020, however, the share of coal had plummeted to just 10%. Renewable energy, by contrast, increased more than sevenfold to 37%, overtaking gas, which itself rose slightly to 35%. The proportion generated by nuclear power remained relatively stable, falling marginally from 20% to 18%. As a result, gas and renewables together produced almost three quarters of the country’s electricity in 2020.`,
  },
  {
    id: 'internet-areas',
    kind: 'table',
    title: 'Households with internet access in Country X (%)',
    unit: '%',
    labels: ['Urban areas', 'Rural areas'],
    series: [
      { name: '2000', values: [30, 10] },
      { name: '2010', values: [65, 35] },
      { name: '2020', values: [92, 78] },
    ],
    countable: true,
    noun: 'the proportion of households with internet access',
    question: 'The table shows the percentage of urban and rural households in Country X with internet access in 2000, 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    overview: {
      correct: 'Overall, internet access rose sharply in both areas over the period. Although cities remained ahead throughout, the gap between urban and rural households narrowed considerably.',
      wrong: ['Overall, 92% of urban households had internet access in 2020, compared with 78% in rural areas.', 'Overall, rural households overtook urban households by the end of the period.'],
    },
    model: `The table compares the proportion of homes in towns and in the countryside that had access to the internet in Country X between 2000 and 2020.

Overall, internet access rose sharply in both areas over the period. Although urban households remained ahead throughout, the gap between the two narrowed considerably by the end of the period.

In 2000, 30% of urban homes were connected, compared with only 10% in rural areas. Over the following decade, the urban figure more than doubled to 65%, while the rural percentage rose to just over a third, at 35%. This meant that the gap between the two areas actually widened, from 20 to 30 percentage points.

By 2020, almost all urban households (92%) had internet access. The most dramatic growth, however, occurred in the countryside, where the figure more than doubled again to 78%. Consequently, the difference between them fell from 30 percentage points in 2010 to just 14 points in 2020.`,
  },
]

export function chartById(id: string): Task1Chart | undefined {
  return TASK1_CHARTS.find((c) => c.id === id)
}
