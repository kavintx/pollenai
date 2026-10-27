import { Wordmark } from "./logo"

const LINKS = [
  { href: "/#line", label: "Examples" },
  { href: "/#how", label: "How it works" },
  { href: "/#pay", label: "Pay" },
  { href: "/#faq", label: "FAQ" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b-2 border-ink bg-[rgba(255,222,89,.96)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-3">
        <a href="/#top" aria-label="Pollen home" className="no-underline">
          <Wordmark />
        </a>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-base font-extrabold">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nl hidden text-ink sm:inline-block">
              {l.label}
            </a>
          ))}
          <a
            href="/#join"
            className="btn min-h-11 rounded-full border-2 border-ink bg-ink px-[22px] text-[15px] font-extrabold text-lime no-underline shadow-[3px_3px_0_#1a1a1a]"
          >
            Join the waitlist <span className="hb">♡</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
