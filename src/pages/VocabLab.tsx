import ComingSoon from '../components/ComingSoon'
import { IconFlask } from '../components/Icons'
import ModuleHeader from '../components/ModuleHeader'

export default function VocabLab() {
  return (
    <div className="page">
      <ModuleHeader title="Vocab Lab" subtitle="Le vocabulaire avancé pour viser 7 en Lexical resource" color="#36b5ff" icon={<IconFlask size={36} />} />
      <ComingSoon
        step={4}
        items={[
          'Familles de mots (decide → decision → decisive)',
          'Collocations (pose a threat, a heavy workload…)',
          'Paraphrase, synonymes par niveau, registre formel',
          'Expressions idiomatiques et orthographe',
        ]}
      />
    </div>
  )
}
