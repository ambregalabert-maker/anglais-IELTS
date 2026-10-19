// La liste des modules du site. Pour ajouter un module plus tard (ex. Speaking) :
// créer sa page dans src/pages/, puis ajouter une entrée ici. La navigation se met à jour toute seule.

import type { ComponentType, ReactNode } from 'react'
import { IconCards, IconFlask, IconHeadphones, IconPath, IconPen, IconUser } from '../components/Icons'
import Home from '../pages/Home'
import Listening from '../pages/Listening'
import Profile from '../pages/Profile'
import Review from '../pages/Review'
import VocabLab from '../pages/VocabLab'
import Writing from '../pages/Writing'

export interface ModuleDef {
  id: string
  path: string
  label: string
  icon: ReactNode
  color: string
  page: ComponentType
  tryhard: boolean // le module propose un mode Tryhard
}

export const MODULES: ModuleDef[] = [
  { id: 'home', path: '/', label: 'Chemin', icon: <IconPath />, color: '#6c4cf5', page: Home, tryhard: true },
  { id: 'vocab', path: '/vocab', label: 'Vocab Lab', icon: <IconFlask />, color: '#36b5ff', page: VocabLab, tryhard: true },
  { id: 'writing', path: '/writing', label: 'Writing', icon: <IconPen />, color: '#ff9a4d', page: Writing, tryhard: true },
  { id: 'listening', path: '/listening', label: 'Listening', icon: <IconHeadphones />, color: '#3ccf7a', page: Listening, tryhard: true },
  { id: 'review', path: '/review', label: 'Révisions', icon: <IconCards />, color: '#ff5d8f', page: Review, tryhard: false },
  { id: 'profile', path: '/profile', label: 'Profil', icon: <IconUser />, color: '#6c4cf5', page: Profile, tryhard: false },
]

export function findModule(route: string): ModuleDef {
  const base = '/' + (route.split('/')[1] ?? '')
  return MODULES.find((m) => m.path === base) ?? MODULES[0]
}
