// La liste des modules du site. Pour ajouter un module :
// créer sa page dans src/pages/, puis ajouter une entrée ici. La navigation se met à jour toute seule.

import { lazy, type ComponentType, type ReactNode } from 'react'
import { IconBook, IconCards, IconExam, IconFlask, IconHeadphones, IconMic, IconPath, IconPen, IconUser } from '../components/Icons'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Review from '../pages/Review'

// Les modules les plus lourds ne sont chargés qu'à leur ouverture (démarrage plus rapide)
const VocabLab = lazy(() => import('../pages/VocabLab'))
const Writing = lazy(() => import('../pages/Writing'))
const Listening = lazy(() => import('../pages/Listening'))
const Reading = lazy(() => import('../pages/Reading'))
const Speaking = lazy(() => import('../pages/Speaking'))
const Exam = lazy(() => import('../pages/Exam'))

export interface ModuleDef {
  id: string
  path: string
  label: string
  icon: ReactNode
  color: string
  page: ComponentType
  short?: string // nom court (barre du bas sur téléphone)
  phone?: false // absent de la barre du bas sur téléphone (accessible depuis la barre du haut)
  hidden?: true // jamais dans la navigation (page ouverte depuis un lien)
}

export const MODULES: ModuleDef[] = [
  { id: 'home', path: '/', label: 'Chemin', icon: <IconPath />, color: '#6c4cf5', page: Home },
  { id: 'vocab', path: '/vocab', label: 'Vocab Lab', short: 'Vocab', icon: <IconFlask />, color: '#36b5ff', page: VocabLab },
  { id: 'reading', path: '/reading', label: 'Reading', icon: <IconBook />, color: '#00a8a8', page: Reading },
  { id: 'writing', path: '/writing', label: 'Writing', icon: <IconPen />, color: '#ff9a4d', page: Writing },
  { id: 'listening', path: '/listening', label: 'Listening', short: 'Listen', icon: <IconHeadphones />, color: '#3ccf7a', page: Listening },
  { id: 'speaking', path: '/speaking', label: 'Speaking', short: 'Speak', icon: <IconMic />, color: '#e8a400', page: Speaking },
  { id: 'review', path: '/review', label: 'Révisions', icon: <IconCards />, color: '#ff5d8f', page: Review },
  { id: 'profile', path: '/profile', label: 'Profil', icon: <IconUser />, color: '#6c4cf5', page: Profile, phone: false },
  { id: 'exam', path: '/exam', label: 'L’examen', icon: <IconExam />, color: '#6c4cf5', page: Exam, hidden: true },
]

export function findModule(route: string): ModuleDef {
  const base = '/' + (route.split('/')[1] ?? '')
  return MODULES.find((m) => m.path === base) ?? MODULES[0]
}
