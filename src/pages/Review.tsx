import ComingSoon from '../components/ComingSoon'
import { IconCards } from '../components/Icons'
import ModuleHeader from '../components/ModuleHeader'

export default function Review() {
  return (
    <div className="page">
      <ModuleHeader title="Révisions" subtitle="Tes erreurs et tes mots à revoir, au bon moment" color="#ff5d8f" icon={<IconCards size={36} />} tryhard={false} />
      <ComingSoon
        step={3}
        items={['Répétition espacée (boîtes de Leitner)', 'Séance « Mes erreurs »', 'Flashcards qui se retournent']}
      />
    </div>
  )
}
