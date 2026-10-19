import ComingSoon from '../components/ComingSoon'
import { IconPen } from '../components/Icons'
import ModuleHeader from '../components/ModuleHeader'

export default function Writing() {
  return (
    <div className="page">
      <ModuleHeader title="Writing" subtitle="Task 1, Task 2 et grammaire, avec ta méthode en 9 étapes" color="#ff9a4d" icon={<IconPen size={36} />} />
      <ComingSoon
        step={5}
        items={[
          'Task 2 guidée pas à pas (ta méthode de cours)',
          'Mode examen 40 min avec vérifications automatiques',
          'Task 1 : graphiques et vocabulaire des tendances',
          'Grammaire du Booklet 2',
        ]}
      />
    </div>
  )
}
