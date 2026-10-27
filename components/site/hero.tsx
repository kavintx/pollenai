import { Flower, Sparkle } from "./logo"
import { WaitlistForm } from "./waitlist"

const SHOTS = [
  { tag: "video · 30 sec", pay: "~$1.80", title: "Rainy street at night", chip: "bg-lime" },
  { tag: "audio · 30 sec", pay: "~$1.75", title: "A busy café", chip: "bg-butter" },
  { tag: "photo · 5 shots", pay: "~$1.90", title: "Hands holding a mug", chip: "bg-lime" },
]

export function Hero() {
  return (
    <section id="top" className="relative mx-auto flex max-w-[1200px] flex-wrap items-center gap-14 px-5 pt-[clamp(32px,5vw,56px)] pb-[clamp(64px,8vw,104px)]">
      <Sparkle className="tw absolute top-6 left-[46%] size-11" />
      <Sparkle className="tw absolute bottom-10 left-[2%] size-7 [animation-delay:-1.1s]" fill="#1a1a1a" />

      <div className="relative flex min-w-0 flex-[999_1_520px] animate-rise flex-col gap-6">
        <span className="self-start rounded-full border-2 border-ink bg-white px-4 py-1.5 font-display text-[15px] font-semibold">
          ✿ waitlist open · 18+ · US
        </span>
        <h1 className="m-0 font-display text-[clamp(54px,7.4vw,104px)] leading-[.95] font-bold tracking-[-0.02em] text-balance">
          Your camera roll is worth{" "}
          <span className="rounded-[.3em] bg-ink px-[.16em] text-lime [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
            money
          </span>
          .
        </h1>
        <p className="m-0 max-w-[520px] text-[clamp(18px,1.7vw,21px)] leading-normal font-medium text-pretty">
          Shoot real photos, video and audio from a shot list. AI companies license it. You get paid per task,
          plus a cut every time your dataset sells again.
        </p>
        <div id="join" className="max-w-[560px] scroll-mt-28">
          <WaitlistForm id="hero-email" />
        </div>
        <p className="m-0 text-[15px] font-semibold">No launch date yet. You&apos;ll hear first when we open.</p>
      </div>

      <div className="relative flex min-w-0 flex-[1_1_340px] justify-center">
        <div className="bob relative w-full max-w-[380px] rounded-[44px] border-2 border-ink bg-ink p-3.5 shadow-[8px_8px_0_#1a1a1a]">
          <svg viewBox="0 0 100 100" aria-hidden className="tw absolute -top-8 -right-7 size-16 [animation-duration:3s]">
            <path
              d="M50 88C20 65 4 48 4 30C4 16 15 6 28 6C38 6 46 12 50 20C54 12 62 6 72 6C85 6 96 16 96 30C96 48 80 65 50 88Z"
              fill="#fff"
              stroke="#1a1a1a"
              strokeWidth="5"
            />
          </svg>
          <div className="flex flex-col gap-3 rounded-[32px] bg-cream px-[18px] py-[22px]">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-[27px] font-bold">Shot list</span>
              <span className="font-display text-sm font-semibold">today ✿</span>
            </div>
            {SHOTS.map((s) => (
              <div key={s.title} className="flex flex-col gap-1 rounded-[22px] border-2 border-ink bg-white px-4 py-3.5">
                <div className="flex justify-between gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 font-display text-[13px] font-semibold ${s.chip}`}>{s.tag}</span>
                  <span className="font-display font-bold">{s.pay}</span>
                </div>
                <span className="text-lg font-extrabold">{s.title}</span>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-[22px] border-2 border-ink bg-lime px-4 py-3">
              <span className="text-[15px] font-extrabold">+10% each time it resells</span>
              <Flower className="spin size-[26px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
