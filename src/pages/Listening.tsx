import ComingSoon from '../components/ComingSoon'
import { IconHeadphones } from '../components/Icons'
import ModuleHeader from '../components/ModuleHeader'

export default function Listening() {
  return (
    <div className="page">
      <ModuleHeader title="Listening" subtitle="Apprendre à anticiper avant d’écouter" color="#3ccf7a" icon={<IconHeadphones size={36} />} />
      <a className="btn btn-success btn-block" href="https://computerielts.com/ielts-listening-practice-test/" target="_blank" rel="noopener noreferrer">
        🎧 S’entraîner avec de vrais audios
      </a>
      <ComingSoon
        step={6}
        items={[
          'Prédire le type de réponse (nombre, date, nom…)',
          'Repérer les paraphrases et les pièges',
          'Respecter la consigne (NO MORE THAN TWO WORDS…)',
          'Orthographe, nombres et fiche de conseils',
        ]}
      />
    </div>
  )
}
