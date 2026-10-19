// Petit « haut-parleur » d'événements : le store annonce une montée de niveau, un badge…
// et la couche d'affichage (components/Celebrations.tsx) réagit avec sons, confettis et messages.

export type AppEvent =
  | { type: 'levelUp'; level: number }
  | { type: 'badge'; id: string }
  | { type: 'streak'; days: number }
  | { type: 'goalReached' }
  | { type: 'toast'; text: string; icon?: string }

type Listener = (e: AppEvent) => void
const listeners = new Set<Listener>()

export function emit(e: AppEvent) {
  // Différé : on laisse l'état se sauvegarder avant d'afficher quoi que ce soit
  queueMicrotask(() => listeners.forEach((l) => l(e)))
}

export function onEvent(l: Listener): () => void {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function toast(text: string, icon?: string) {
  emit({ type: 'toast', text, icon })
}
