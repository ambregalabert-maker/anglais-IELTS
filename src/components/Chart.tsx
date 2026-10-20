// Graphiques Task 1 dessinés en SVG (courbes, barres, camemberts) ou en tableau.

import type { Task1Chart } from '../data/writing/task1'

const COLORS = ['#6c4cf5', '#ff9a4d', '#2fbf71', '#36b5ff', '#ff5d8f']

function niceMax(v: number): number {
  const p = Math.pow(10, Math.floor(Math.log10(v)))
  for (const m of [1, 2, 2.5, 5, 10]) if (m * p >= v) return m * p
  return 10 * p
}

function Legend({ names }: { names: string[] }) {
  return (
    <div className="chart-legend">
      {names.map((n, i) => (
        <span key={n}>
          <i style={{ background: COLORS[i % COLORS.length] }} />
          {n}
        </span>
      ))}
    </div>
  )
}

function LineChart({ c }: { c: Task1Chart }) {
  const W = 340
  const H = 210
  const L = 38
  const B = 26
  const max = niceMax(Math.max(...c.series.flatMap((s) => s.values)))
  const x = (i: number) => L + (i * (W - L - 12)) / (c.labels.length - 1)
  const y = (v: number) => H - B - (v / max) * (H - B - 12)
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label={c.title}>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={L} x2={W - 8} y1={y(t)} y2={y(t)} className="chart-grid" />
          <text x={L - 6} y={y(t) + 4} className="chart-tick" textAnchor="end">
            {t}
          </text>
        </g>
      ))}
      {c.labels.map((l, i) => (
        <text key={l} x={x(i)} y={H - 8} className="chart-tick" textAnchor="middle">
          {l}
        </text>
      ))}
      {c.series.map((s, si) => (
        <g key={s.name}>
          <polyline points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')} fill="none" stroke={COLORS[si]} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          {s.values.map((v, i) => (
            <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill={COLORS[si]} />
          ))}
        </g>
      ))}
    </svg>
  )
}

function BarChart({ c }: { c: Task1Chart }) {
  const W = 340
  const H = 210
  const L = 34
  const B = 26
  const max = niceMax(Math.max(...c.series.flatMap((s) => s.values)))
  const groupW = (W - L - 8) / c.labels.length
  const barW = Math.min(22, (groupW - 10) / c.series.length)
  const y = (v: number) => H - B - (v / max) * (H - B - 12)
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label={c.title}>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={L} x2={W - 8} y1={y(t)} y2={y(t)} className="chart-grid" />
          <text x={L - 6} y={y(t) + 4} className="chart-tick" textAnchor="end">
            {t}
          </text>
        </g>
      ))}
      {c.labels.map((l, li) => {
        const gx = L + li * groupW + (groupW - barW * c.series.length) / 2
        return (
          <g key={l}>
            {c.series.map((s, si) => (
              <rect key={s.name} x={gx + si * barW} y={y(s.values[li])} width={barW - 2} height={H - B - y(s.values[li])} rx="3" fill={COLORS[si]} />
            ))}
            <text x={L + li * groupW + groupW / 2} y={H - 8} className="chart-tick" textAnchor="middle">
              {l}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function Pie({ values, labels, title }: { values: number[]; labels: string[]; title: string }) {
  const total = values.reduce((a, b) => a + b, 0)
  let angle = -Math.PI / 2
  const R = 62
  const cx = 75
  const cy = 75
  return (
    <figure className="pie">
      <svg viewBox="0 0 150 150" className="chart-pie" role="img" aria-label={title}>
        {values.map((v, i) => {
          const a0 = angle
          const a1 = angle + (v / total) * Math.PI * 2
          angle = a1
          const large = a1 - a0 > Math.PI ? 1 : 0
          const mid = (a0 + a1) / 2
          return (
            <g key={labels[i]}>
              <path
                d={`M${cx} ${cy} L${cx + R * Math.cos(a0)} ${cy + R * Math.sin(a0)} A${R} ${R} 0 ${large} 1 ${cx + R * Math.cos(a1)} ${cy + R * Math.sin(a1)} Z`}
                fill={COLORS[i % COLORS.length]}
                stroke="var(--surface)"
                strokeWidth="2"
              />
              <text x={cx + R * 0.65 * Math.cos(mid)} y={cy + R * 0.65 * Math.sin(mid) + 4} textAnchor="middle" className="pie-label">
                {v}%
              </text>
            </g>
          )
        })}
      </svg>
      <figcaption>{title}</figcaption>
    </figure>
  )
}

export default function Chart({ chart }: { chart: Task1Chart }) {
  return (
    <div className="chart">
      <p className="chart-title">{chart.title}</p>
      {chart.kind === 'line' && <LineChart c={chart} />}
      {chart.kind === 'bar' && <BarChart c={chart} />}
      {chart.kind === 'pie' && (
        <div className="pies">
          {chart.series.map((s) => (
            <Pie key={s.name} values={s.values} labels={chart.labels} title={s.name} />
          ))}
        </div>
      )}
      {chart.kind === 'table' && (
        <table className="chart-table">
          <thead>
            <tr>
              <th />
              {chart.series.map((s) => (
                <th key={s.name}>{s.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chart.labels.map((l, i) => (
              <tr key={l}>
                <th>{l}</th>
                {chart.series.map((s) => (
                  <td key={s.name}>{s.values[i].toLocaleString('en-GB')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {chart.kind !== 'table' && <Legend names={chart.kind === 'pie' ? chart.labels : chart.series.map((s) => s.name)} />}
    </div>
  )
}
