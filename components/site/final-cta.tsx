import { Flower } from "./logo"

export function FinalCta() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 pb-[clamp(64px,8vw,96px)]">
      <div
        data-reveal
        className="flex flex-col items-center gap-[26px] rounded-[44px] border-2 border-ink bg-white px-6 py-[clamp(40px,6vw,80px)] text-center shadow-[8px_8px_0_#1a1a1a]"
      >
        <Flower className="spin size-20" />
        <h2 className="m-0 font-display text-[clamp(48px,7vw,100px)] leading-[.95] font-bold tracking-[-0.01em]">
          Get in line.
          <br />
          Get paid.
        </h2>
        <a
          href="#join"
          className="btn btn-on-dark wig rounded-full border-2 border-ink bg-ink px-9 py-[18px] font-display text-[22px] font-bold text-lime no-underline shadow-[4px_4px_0_#ffde59]"
        >
          Join the waitlist <span className="ar">→</span>
        </a>
      </div>
    </section>
  )
}
