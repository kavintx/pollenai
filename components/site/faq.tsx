"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { SectionTitle } from "./logo"

const FAQS = [
  {
    q: "Who buys the data?",
    a: "AI companies and research labs that need real-world photos, video and audio to train and test their models.",
  },
  {
    q: "What do I shoot?",
    a: "Whatever's on your shot list. The app shows what AI companies are asking for right now, so you're not guessing. Everything has to be real and shot by you: no AI-generated images and no filler like blank walls.",
  },
  {
    q: "How much do I earn?",
    a: "About $1.75–$1.90 per approved task, shown up front. Rates are estimates until launch and aren't guaranteed.",
  },
  {
    q: "How does the 10% royalty work?",
    a: "Every time a dataset with your approved shot in it sells again, you get 10% of what that task originally paid you. A $1.80 task earns you another $0.18 on each resale.",
  },
  {
    q: "Is my data safe?",
    a: "You decide what's for sale, file by file. Faces and voices are never sold without your explicit opt-in, and you can delete files or your account anytime.",
  },
  {
    q: "Who can join?",
    a: "Anyone 18+ in the US. One person, one spot.",
  },
  {
    q: "When do you launch?",
    a: "No date yet. We're building it now. Join the waitlist and you'll be the first to know when we open.",
  },
]

export function Faq() {
  const [open, setOpen] = React.useState(0)
  return (
    <section id="faq" className="mx-auto flex max-w-[900px] scroll-mt-24 flex-col gap-6 px-5 pb-[clamp(80px,9vw,112px)]">
      <SectionTitle>Questions?</SectionTitle>
      <div data-reveal-stagger className="flex flex-col gap-3.5">
        {FAQS.map((f, i) => {
          const isOpen = open === i
          const id = `faq-${i}`
          return (
            <div key={f.q} className="lift rounded-[28px] border-2 border-ink bg-white px-[26px]">
              <h3 className="m-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex min-h-18 w-full cursor-pointer items-center justify-between gap-4 py-[18px] text-left font-display text-[clamp(18px,2vw,22px)] font-bold"
                >
                  {f.q}
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink transition-transform duration-300 ease-[cubic-bezier(.34,1.9,.5,1)] ${
                      isOpen ? "rotate-45 bg-ink text-lime" : "bg-lime"
                    }`}
                  >
                    <Plus className="size-4" strokeWidth={3} aria-hidden />
                  </span>
                </button>
              </h3>
              <div id={id} className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="m-0 pr-12 pb-[22px] text-[17px] leading-relaxed font-semibold">{f.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
