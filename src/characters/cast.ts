// La bande de personnages. Pour en ajouter un : une entrée ici + son dessin dans Character.tsx.

import type { VoiceProfile } from '../lib/sound'

export type CharacterId = 'pepin' | 'earl' | 'mia' | 'bolt' | 'nimbus'

export interface CharacterDef {
  id: CharacterId
  name: string
  role: string
  color: string
  voice: VoiceProfile
  catchphrase: string // phrase d'essai (en anglais)
  bubbles: string[] // petites phrases sur le chemin (en français)
}

export const CAST: CharacterDef[] = [
  {
    id: 'pepin',
    name: 'Pépin',
    role: 'La petite graine qui pousse avec toi jusqu’au C2.',
    color: '#ff9a4d',
    voice: { usePreferred: true },
    catchphrase: 'Hi! I am Pepin. Shall we learn some new words today?',
    bubbles: ['C’est parti !', 'On y va ?', 'Allez, une leçon !'],
  },
  {
    id: 'earl',
    name: 'Earl Grey',
    role: 'Une théière très british, monocle compris. Adore les phrases bien tournées.',
    color: '#33b5a5',
    voice: { gender: 'm', pitch: 0.8, rate: 0.92 },
    catchphrase: 'Good afternoon. A cup of tea and a well-structured essay, perhaps?',
    bubbles: ['Splendid !', 'Un peu de thé ?', 'Jolly good !'],
  },
  {
    id: 'mia',
    name: 'Mia',
    role: 'Une chatte étudiante, casque vissé sur les oreilles. Toujours à fond.',
    color: '#ff8fb1',
    voice: { gender: 'f', pitch: 1.25, rate: 1.05 },
    catchphrase: 'Hey! I love learning new expressions. This is going to be fun!',
    bubbles: ['Trop bien !', 'Let’s go !', 'Tu gères !'],
  },
  {
    id: 'bolt',
    name: 'Bolt',
    role: 'Un petit robot qui calcule tout : tendances, graphiques et pourcentages.',
    color: '#ffc93c',
    voice: { gender: 'm', pitch: 0.55, rate: 0.95 },
    catchphrase: 'Beep. Sales increased sharply. Processing new vocabulary.',
    bubbles: ['Bip bip !', 'Analyse en cours…', '100 % prêt !'],
  },
  {
    id: 'nimbus',
    name: 'Nimbus',
    role: 'Un nuage tout doux. Rêveur, mais il n’oublie jamais un mot.',
    color: '#8fd3ff',
    voice: { gender: 'f', pitch: 1.1, rate: 0.85 },
    catchphrase: 'Hello there. Take a deep breath. We will learn this together.',
    bubbles: ['Tout doux…', 'On respire !', 'Pas à pas.'],
  },
]

export const CHARACTER_BY_ID = Object.fromEntries(CAST.map((c) => [c.id, c])) as Record<CharacterId, CharacterDef>

/** Choisit toujours le même personnage pour un même texte (pour varier sans tout mélanger). */
export function characterFor(seed: string): CharacterDef {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return CAST[h % CAST.length]
}
