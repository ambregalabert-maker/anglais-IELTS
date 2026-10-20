// Affiche un texte avec ses problèmes surlignés (couleur selon le type).

import { ISSUE_LABELS, type Issue } from './checks'

export default function HighlightedText({ text, issues, active, onSelect }: { text: string; issues: Issue[]; active?: number; onSelect?: (i: number) => void }) {
  const parts: React.ReactNode[] = []
  let pos = 0
  issues.forEach((iss, i) => {
    if (iss.start > pos) parts.push(text.slice(pos, iss.start))
    parts.push(
      <mark
        key={i}
        className={`hl ${active === i ? 'active' : ''}`}
        style={{ ['--hl' as string]: ISSUE_LABELS[iss.kind].color }}
        title={iss.message}
        onClick={() => onSelect?.(i)}
      >
        {text.slice(iss.start, iss.end)}
      </mark>,
    )
    pos = iss.end
  })
  if (pos < text.length) parts.push(text.slice(pos))
  return <div className="hl-text" lang="en">{parts}</div>
}
