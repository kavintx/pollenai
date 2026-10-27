import { cn } from "@/lib/utils"

/** The flower from the Pollen logo (it stands in for the "o"). */
export function Flower({
  className,
  petals = "#1a1a1a",
  center = "#ffde59",
  title,
}: {
  className?: string
  petals?: string
  center?: string
  title?: string
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <g fill={petals}>
        <circle cx="50" cy="22" r="20" />
        <circle cx="76.6" cy="41.3" r="20" />
        <circle cx="66.5" cy="72.7" r="20" />
        <circle cx="33.5" cy="72.7" r="20" />
        <circle cx="23.4" cy="41.3" r="20" />
      </g>
      <circle cx="50" cy="50" r="12" fill={center} />
    </svg>
  )
}

/** 4-point sparkle used as decoration. */
export function Sparkle({ className, fill = "#ffffff" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d="M50 0C55 35 65 45 100 50C65 55 55 65 50 100C45 65 35 55 0 50C35 45 45 35 50 0Z" fill={fill} />
    </svg>
  )
}

/** "Pollen" with the flower as the o, plus the little "ai" pill. */
export function Wordmark({ className, dark = false }: { className?: string; dark?: boolean }) {
  const ink = dark ? "#ffde59" : "#1a1a1a"
  const paper = dark ? "#1a1a1a" : "#ffde59"
  return (
    <span className={cn("lg flex items-start gap-1.5", className)}>
      <span className="font-display text-[34px] leading-none font-bold tracking-[-0.01em]" style={{ color: ink }}>
        P
        <Flower className="mx-[0.02em] inline-block size-[0.78em] align-[-0.05em]" petals={ink} center={paper} />
        llen
      </span>
      <span className="rounded-full px-[9px] py-0.5 font-display text-[13px] leading-[1.3] font-bold" style={{ background: ink, color: paper }}>
        ai
      </span>
    </span>
  )
}

/** Small label above section headings. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("self-start font-display text-lg font-semibold", className)}>{children}</span>
}

export function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("m-0 font-display text-[clamp(40px,5.4vw,76px)] leading-none font-bold tracking-[-0.01em] text-balance", className)}>
      {children}
    </h2>
  )
}
