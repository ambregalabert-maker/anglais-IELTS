import Mascot from './Mascot'

/** Écran d'attente pour un module pas encore construit. */
export default function ComingSoon({ step, items }: { step: number; items: string[] }) {
  return (
    <div className="card coming-soon">
      <Mascot mood="think" size={96} />
      <div>
        <h3>Bientôt ici (étape {step})</h3>
        <ul>
          {items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
