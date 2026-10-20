// Les unités du chemin de vocabulaire (accueil), dans l'ordre : de B1 jusqu'au C2.
// Le contenu des leçons (mots, exercices) est dans data/vocab/ (un fichier par unité).
// Thèmes IELTS : leçon 1 = B2, leçon 2 = C1, leçon 3 = C2 (langue de l'essai).

export interface UnitMeta {
  id: string
  title: string
  description: string
  color: string // couleur principale de l'unité
  shade: string // couleur plus foncée (bord 3D des boutons)
  lessons: number // nombre de leçons, sans compter l'évaluation finale
  fromCourse: boolean // vient de tes cours (sinon : thème IELTS ajouté)
}

export const UNITS: UnitMeta[] = [
  { id: 'growing-up', title: 'Growing Up & Everyday Life', description: 'Enfance, argent, responsabilités, indépendance', color: '#6c4cf5', shade: '#4d32c4', lessons: 4, fromCourse: true },
  { id: 'appearance', title: 'Physical Appearance', description: 'Décrire l’apparence et le style de quelqu’un', color: '#ff7a45', shade: '#d4562a', lessons: 4, fromCourse: true },
  { id: 'personality', title: 'Personality', description: 'Caractère, qualités, défauts et expressions', color: '#ff5d8f', shade: '#cf3a6a', lessons: 4, fromCourse: true },
  { id: 'linking', title: 'Linking Words', description: 'Relier ses idées : addition, contraste, conséquence…', color: '#36b5ff', shade: '#1a8bd1', lessons: 4, fromCourse: true },
  { id: 'trends', title: 'Trends & Task 1', description: 'Décrire des graphiques : rise, plummet, sharply…', color: '#2fbf71', shade: '#1f9455', lessons: 4, fromCourse: true },
  { id: 'french-errors', title: 'Pièges des francophones', description: 'important ≠ substantial, pass ≠ spend, informations…', color: '#e8a400', shade: '#b37e00', lessons: 3, fromCourse: true },
  { id: 'education', title: 'Education', description: 'Systèmes scolaires, université, apprentissage', color: '#7c5cff', shade: '#5a3bd9', lessons: 3, fromCourse: false },
  { id: 'work', title: 'Work & Careers', description: 'Emploi, carrière, monde du travail', color: '#00a8a8', shade: '#007f80', lessons: 3, fromCourse: false },
  { id: 'technology', title: 'Technology', description: 'Innovation, internet, intelligence artificielle', color: '#4c6ef5', shade: '#3150cc', lessons: 3, fromCourse: false },
  { id: 'environment', title: 'Environment', description: 'Climat, pollution, ressources, solutions', color: '#2fa866', shade: '#1f7d4a', lessons: 3, fromCourse: false },
  { id: 'health', title: 'Health', description: 'Santé, mode de vie, système de soins', color: '#f0506e', shade: '#c23250', lessons: 3, fromCourse: false },
  { id: 'cities', title: 'Cities & Urbanisation', description: 'Villes, logement, transports, croissance urbaine', color: '#8e7cc3', shade: '#6a589f', lessons: 3, fromCourse: false },
  { id: 'media', title: 'Media & Advertising', description: 'Presse, réseaux sociaux, publicité', color: '#ff8c1a', shade: '#d26a00', lessons: 3, fromCourse: false },
  { id: 'crime', title: 'Crime & Law', description: 'Délinquance, justice, prévention', color: '#5c6b8a', shade: '#3f4c69', lessons: 3, fromCourse: false },
  { id: 'globalisation', title: 'Globalisation', description: 'Échanges, cultures, économie mondiale', color: '#14a3c7', shade: '#0b7d9a', lessons: 3, fromCourse: false },
  { id: 'science', title: 'Science & Research', description: 'Recherche, découvertes, éthique', color: '#a64cf5', shade: '#7f2ccc', lessons: 3, fromCourse: false },
  { id: 'travel', title: 'Travel & Tourism', description: 'Voyage, tourisme de masse, patrimoine', color: '#1fb5a0', shade: '#128a79', lessons: 3, fromCourse: false },
  { id: 'family', title: 'Family & Society', description: 'Famille, générations, évolution de la société', color: '#e05a9c', shade: '#b43a77', lessons: 3, fromCourse: false },
]
