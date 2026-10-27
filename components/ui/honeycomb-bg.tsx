"use client"

import * as React from "react"

/*
 * Honeycomb background — a full-viewport hex grid where every cell "breathes"
 * from Pollen yellow to pale butter, the wave rippling out from the centre of the
 * screen. Drawn on a single <canvas>: cells are grouped into phase buckets so each
 * frame is ~30 path fills instead of thousands of animated DOM nodes.
 * Sits behind the page (pointer-events: none).
 */

export type HoneycombBgProps = {
  /** Fill colour at full inhale. */
  green?: string
  /** Resting tint of each cell at full exhale. */
  rest?: string
  /** Colour of the lines between cells. */
  lines?: string
  /** Seconds for one full inhale + exhale. */
  breath?: number
  /** Hex radius in px. */
  size?: number
  /** Gap between cells in px. */
  gap?: number
  /** How strongly the wave lags with distance from the centre (0 = all in sync). */
  ripple?: number
  className?: string
}

const BUCKETS = 32
const FRAME_MS = 1000 / 30

// matches @keyframes hc-breathe: 0 → 1 over 0–45%, hold to 55%, 1 → 0 by 100%, ease-in-out
const ease = (x: number) => x * x * (3 - 2 * x)
const breathe = (p: number) => (p < 0.45 ? ease(p / 0.45) : p < 0.55 ? 1 : ease((1 - p) / 0.45))

export default function HoneycombBg({
  green = "#FFF3B8",
  rest = "#FFDE59",
  lines = "#F2CC3A",
  breath = 2.4,
  size = 34,
  gap = 3,
  ripple = 0.35,
  className,
}: HoneycombBgProps) {
  const ref = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const w = Math.sqrt(3) * size
    const h = 1.5 * size
    const cw = w - gap
    const ch = 2 * size - gap * 1.15

    let restPath = new Path2D()
    let buckets: Path2D[] = []
    let raf = 0
    let last = 0
    let resizeT: ReturnType<typeof setTimeout>

    const hex = (p: Path2D, x: number, y: number) => {
      p.moveTo(x + cw / 2, y)
      p.lineTo(x + cw, y + ch * 0.25)
      p.lineTo(x + cw, y + ch * 0.75)
      p.lineTo(x + cw / 2, y + ch)
      p.lineTo(x, y + ch * 0.75)
      p.lineTo(x, y + ch * 0.25)
      p.closePath()
    }

    const build = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(vw * dpr)
      canvas.height = Math.round(vh * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      restPath = new Path2D()
      buckets = Array.from({ length: BUCKETS }, () => new Path2D())
      const cx = vw / 2
      const cy = vh / 2
      let n = 0
      for (let row = 0, y = -size; y < vh + size; row++, y += h) {
        const off = row & 1 ? w / 2 : 0
        for (let x = -w + off; x < vw + w; x += w) {
          const d = Math.hypot(x - cx, y - cy) / 1000
          const jitter = ((((Math.sin(n++ * 12.9898) * 43758.5453) % 1) + 1) % 1) * 0.02
          const phase = (d * ripple + jitter) % 1
          const left = x - cw / 2
          const top = y - ch / 2
          hex(restPath, left, top)
          hex(buckets[Math.floor(phase * BUCKETS) % BUCKETS], left, top)
        }
      }
    }

    const draw = (now: number) => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      ctx.globalAlpha = 1
      ctx.fillStyle = lines
      ctx.fillRect(0, 0, vw, vh)
      ctx.fillStyle = rest
      ctx.fill(restPath)
      if (reduce) return
      ctx.fillStyle = green
      const t = now / 1000 / breath
      for (let i = 0; i < BUCKETS; i++) {
        // same timing as the old CSS: animation-delay = (phase - 1) * breath
        const p = (((t + 1 - i / BUCKETS) % 1) + 1) % 1
        const a = breathe(p)
        if (a < 0.01) continue
        ctx.globalAlpha = a
        ctx.fill(buckets[i])
      }
      ctx.globalAlpha = 1
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (now - last < FRAME_MS) return
      last = now
      draw(now)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      if (!reduce && document.visibilityState === "visible") raf = requestAnimationFrame(loop)
    }
    const onResize = () => {
      clearTimeout(resizeT)
      resizeT = setTimeout(() => {
        build()
        draw(performance.now())
      }, 150)
    }
    const onVis = () => (document.visibilityState === "visible" ? start() : cancelAnimationFrame(raf))

    build()
    draw(performance.now())
    start()
    window.addEventListener("resize", onResize)
    document.addEventListener("visibilitychange", onVis)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeT)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [green, rest, lines, breath, size, gap, ripple])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={["pointer-events-none fixed inset-0 -z-10 h-full w-full", className].filter(Boolean).join(" ")}
      style={{ background: lines }}
    />
  )
}
