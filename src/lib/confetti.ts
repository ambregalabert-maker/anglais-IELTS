// Confettis légers dessinés sur un canvas temporaire (pas de bibliothèque).

const COLORS = ['#6c4cf5', '#ff9a4d', '#3ccf7a', '#ffc93c', '#ff5d8f', '#36b5ff']

export function confetti(amount = 120) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const canvas = document.createElement('canvas')
  canvas.className = 'confetti-canvas'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const dpr = window.devicePixelRatio || 1
  const w = window.innerWidth
  const h = window.innerHeight
  canvas.width = w * dpr
  canvas.height = h * dpr
  ctx.scale(dpr, dpr)

  const pieces = Array.from({ length: amount }, () => ({
    x: w / 2 + (Math.random() - 0.5) * w * 0.3,
    y: h * 0.35,
    vx: (Math.random() - 0.5) * 14,
    vy: -Math.random() * 14 - 4,
    size: 6 + Math.random() * 6,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    round: Math.random() < 0.3,
  }))

  const start = performance.now()
  function frame(now: number) {
    const t = now - start
    ctx!.clearRect(0, 0, w, h)
    for (const p of pieces) {
      p.vy += 0.35
      p.vx *= 0.99
      p.x += p.vx
      p.y += p.vy
      p.rot += p.vr
      ctx!.save()
      ctx!.translate(p.x, p.y)
      ctx!.rotate(p.rot)
      ctx!.globalAlpha = Math.max(0, 1 - t / 2600)
      ctx!.fillStyle = p.color
      if (p.round) {
        ctx!.beginPath()
        ctx!.arc(0, 0, p.size / 2, 0, Math.PI * 2)
        ctx!.fill()
      } else {
        ctx!.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
      }
      ctx!.restore()
    }
    if (t < 2600) requestAnimationFrame(frame)
    else canvas.remove()
  }
  requestAnimationFrame(frame)
}
