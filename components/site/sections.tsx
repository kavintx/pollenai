import { Eyebrow, SectionTitle } from "./logo"

/* ------------------------------------------------------------ marquee */

const MARQUEE = "real shots only ✿ paid per task ♡ your stuff, your call ✿ 10% on every resale ♡ "

export function Marquee() {
  return (
    <div aria-hidden className="relative z-10 overflow-hidden py-4">
      <div className="-mx-10 -rotate-[1.5deg] overflow-hidden border-y-2 border-ink bg-ink py-4 whitespace-nowrap text-lime">
        <div className="mq font-display text-[clamp(22px,2.6vw,28px)] font-bold">
          {[0, 1].map((k) => (
            <span key={k} className="pr-[0.6em]">
              {MARQUEE.repeat(3)}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------- how it works */

const STEPS = [
  { title: "Get a shot list", body: "The app shows what AI companies need right now, like “rainy street at night.” Pay is shown up front.", chip: "bg-lime" },
  { title: "Shoot it for real", body: "Use your phone. Real places, real moments, real noise. The app checks focus and lighting before you upload.", chip: "bg-butter" },
  { title: "We check & match it", body: "Every upload gets a quality check, then goes into datasets for the buyers who asked for it.", chip: "bg-lime" },
  { title: "You get paid", body: "Your cut per approved task, plus 10% more every time that dataset resells. Every payout shows where it came from.", chip: "bg-lime" },
]

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto flex max-w-[1200px] scroll-mt-24 flex-col gap-11 px-5 pt-[clamp(56px,6vw,72px)] pb-[clamp(72px,8vw,96px)]">
      <div data-reveal-stagger className="flex flex-col gap-2.5">
        <Eyebrow>how it works ✿</Eyebrow>
        <SectionTitle>Four easy steps.</SectionTitle>
      </div>
      <ol data-reveal-stagger className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-[22px] p-0">
        {STEPS.map((s, i) => {
          const last = i === STEPS.length - 1
          return (
            <li key={s.title} className={`sticker lift flex flex-col gap-3 rounded-[32px] p-7 ${last ? "bg-ink text-white" : "bg-white"}`}>
              <span className={`grid size-12 place-items-center rounded-full border-2 border-ink font-display text-[22px] font-bold text-ink ${s.chip}`}>
                {i + 1}
              </span>
              <h3 className="m-0 font-display text-2xl font-bold">
                {s.title} {last ? <span className="hb">♡</span> : null}
              </h3>
              <p className="m-0 text-[17px] leading-relaxed">{s.body}</p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

/* ------------------------------------------------------------ the money */

export function Earnings() {
  return (
    <section id="pay" className="relative scroll-mt-20 border-y-2 border-ink bg-ink text-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-14 px-5 py-[clamp(72px,9vw,104px)]">
        <div data-reveal-stagger className="flex min-w-0 flex-[999_1_480px] flex-col gap-[18px]">
          <Eyebrow className="text-lime">
            the money <span className="hb">♡</span>
          </Eyebrow>
          <SectionTitle className="text-[clamp(44px,6vw,84px)] leading-[.98]">
            Get paid once. <span className="text-lime">Then get paid again.</span>
          </SectionTitle>
          <p className="m-0 max-w-[520px] text-xl font-medium">
            Every approved task pays about $1.75–$1.90. When the dataset your shot is in sells again, you get 10% of what that
            task paid you, every time.
          </p>
          <p className="m-0 text-sm font-semibold text-[#cfcfcf]">Rates are estimates until launch and aren&apos;t guaranteed.</p>
        </div>
        <div data-reveal-stagger className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
          <div className="lift lift-on-dark flex flex-col gap-1 rounded-[32px] border-2 border-ink bg-lime p-7 text-ink shadow-[5px_5px_0_#fff]">
            <span className="font-display text-base font-semibold">per approved task</span>
            <span className="font-display text-[clamp(44px,5vw,62px)] leading-[1.05] font-bold">$1.75–$1.90</span>
          </div>
          <div className="lift lift-on-dark flex flex-col gap-2.5 rounded-[32px] border-2 border-ink bg-white px-7 py-[26px] text-ink shadow-[5px_5px_0_#ffde59]">
            <span className="font-display text-base font-semibold">resale royalty, for example ✿</span>
            {[
              ["Task paid", "$1.80"],
              ["Dataset resells", "+$0.18"],
              ["Resells again", "+$0.18"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-lg font-semibold">
                <span>{k}</span>
                <span className="font-extrabold">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------- real shots only */

const PAY_FOR = ["Photos and sound you captured yourself", "Shots from your shot list", "In focus, well lit, subject clearly visible", "Real places, real moments, real noise"]
const NO_PAY = ["Anything AI-generated or AI-edited", "Screenshots, reposts or other people’s content", "Filler: blank walls, ceilings, the floor", "Blurry, dark or near-duplicate shots"]

export function RealShotsOnly() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col gap-10 px-5 py-[clamp(80px,9vw,112px)]">
      <SectionTitle className="text-[clamp(44px,6vw,84px)] leading-[.98]" >
        Real shots only <span className="spin">✿</span>
      </SectionTitle>
      <div data-reveal-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[22px]">
        <div className="sticker lift flex flex-col gap-4 rounded-[32px] bg-white p-8">
          <h3 className="m-0 font-display text-[26px] font-bold">
            We pay for <span className="hb">♡</span>
          </h3>
          <ul className="m-0 flex flex-col gap-2.5 pl-[22px] text-lg font-semibold">
            {PAY_FOR.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="lift flex flex-col gap-4 rounded-[32px] border-2 border-dashed border-ink bg-butter p-8">
          <h3 className="m-0 font-display text-[26px] font-bold">We don&apos;t pay for</h3>
          <ul className="m-0 flex flex-col gap-2.5 pl-[22px] text-lg font-semibold">
            {NO_PAY.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ trust */

const TRUST = [
  { title: "Uploading isn’t selling", body: "You mark exactly which files are up for license." },
  { title: "Plain-English consent", body: "Every upload gets its own consent screen." },
  { title: "Faces & voices are opt-in", body: "Never sold without your explicit yes." },
  { title: "Delete anytime", body: "Remove any file, or your whole account." },
  { title: "See every dollar", body: "Which files sold, what the license paid, what you got." },
]

export function Trust() {
  return (
    <section id="trust" className="mx-auto max-w-[1200px] px-5 pb-[clamp(80px,9vw,112px)]">
      <div data-reveal className="flex flex-col gap-9 rounded-[44px] border-2 border-ink bg-ink p-[clamp(28px,5vw,64px)] text-lime shadow-[8px_8px_0_#fff]">
        <SectionTitle>
          Your stuff. Your call. <span className="hb">♡</span>
        </SectionTitle>
        <div data-reveal-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-[18px]">
          {TRUST.map((t) => (
            <div key={t.title} className="lift lift-on-dark flex flex-col gap-1.5 rounded-[26px] border-2 border-ink bg-white p-[22px] text-ink">
              <h3 className="m-0 font-display text-[21px] font-bold">{t.title}</h3>
              <p className="m-0 text-base font-semibold">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
