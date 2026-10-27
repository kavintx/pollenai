"use client"

import * as React from "react"
import { Check, Copy, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase, supabaseMissing } from "@/lib/supabase"

type Joined = { name: string; alreadyJoined: boolean }

type WaitlistState = {
  joined: Joined | null
  join: (input: { email: string; name: string }) => Promise<string | null>
}

const WaitlistContext = React.createContext<WaitlistState | null>(null)
const STORAGE_KEY = "pollen-waitlist-v2"
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [joined, setJoined] = React.useState<Joined | null>(null)

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setJoined(JSON.parse(saved))
    } catch {}
  }, [])

  const join = React.useCallback(async ({ email, name }: { email: string; name: string }) => {
    let alreadyJoined = false

    if (supabase) {
      // Insert only — the publishable key can't read the table back, so no .select() here.
      const { error } = await supabase.from("waitlist").insert({ email, name, confirmed_18: true })
      if (error?.code === "23505") alreadyJoined = true // unique email: already on the list
      else if (error) {
        console.error(error)
        return "Something went wrong. Try again in a sec."
      }
    } else if (process.env.NODE_ENV !== "production") {
      console.warn("Supabase env vars missing — waitlist signup simulated locally.")
    } else {
      console.error(`Waitlist not connected: missing ${supabaseMissing.join(" and ")} at build time. Add it in Vercel → Settings → Environment Variables, then redeploy.`)
      return "Signups aren't open yet. Try again soon."
    }

    const result = { name, alreadyJoined }
    setJoined(result)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result))
    } catch {}
    return null
  }, [])

  return <WaitlistContext.Provider value={{ joined, join }}>{children}</WaitlistContext.Provider>
}

export function useWaitlist() {
  const ctx = React.useContext(WaitlistContext)
  if (!ctx) throw new Error("useWaitlist must be used inside <WaitlistProvider>")
  return ctx
}

export function WaitlistCount({ className }: { className?: string }) {
  return <span className={className}>Waitlist is open</span>
}

/** Name + email + 18+ confirmation, or the "You're in" card once joined. */
export function WaitlistForm({ id, className, compact }: { id: string; className?: string; compact?: boolean }) {
  const { joined, join } = useWaitlist()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [is18, setIs18] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  if (joined) return <JoinedCard joined={joined} className={className} compact={compact} />

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const n = name.trim()
    const em = email.trim().toLowerCase()
    if (!n) return setError("Add your name so we know who you are.")
    if (!EMAIL_RE.test(em) || em.length > 254) return setError("Enter a valid email to save your spot.")
    if (!is18) return setError("You need to be 18 or older to join.")
    setPending(true)
    setError(null)
    const err = await join({ email: em, name: n.slice(0, 80) })
    setPending(false)
    if (err) setError(err)
  }

  const clear = () => setError(null)

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <form
        onSubmit={onSubmit}
        noValidate
        className="sticker lift flex flex-col gap-3.5 rounded-[32px] bg-white p-6 shadow-[6px_6px_0_#1a1a1a]"
      >
        <div className="flex flex-wrap gap-3">
          <label htmlFor={id + "-name"} className="flex min-w-0 flex-[1_1_180px] flex-col gap-1.5 font-display text-[15px] font-semibold">
            Name
            <input
              id={id + "-name"}
              type="text"
              autoComplete="given-name"
              placeholder="Your first name"
              maxLength={80}
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                clear()
              }}
              className="min-h-13 rounded-full border-2 border-ink bg-cream px-[18px] font-sans text-[17px] font-semibold text-ink outline-none transition-shadow placeholder:text-[#6b6450] focus:shadow-[3px_3px_0_#1a1a1a]"
            />
          </label>
          <label htmlFor={id} className="flex min-w-0 flex-[2_1_240px] flex-col gap-1.5 font-display text-[15px] font-semibold">
            Email
            <input
              id={id}
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                clear()
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? id + "-error" : undefined}
              className="min-h-13 rounded-full border-2 border-ink bg-cream px-[18px] font-sans text-[17px] font-semibold text-ink outline-none transition-shadow placeholder:text-[#6b6450] focus:shadow-[3px_3px_0_#1a1a1a]"
            />
          </label>
        </div>
        <label className="flex cursor-pointer items-center gap-2.5 text-[15px] font-semibold">
          <input
            type="checkbox"
            checked={is18}
            onChange={(e) => {
              setIs18(e.target.checked)
              clear()
            }}
            className="size-[22px] shrink-0 cursor-pointer accent-ink"
          />
          <span>
            I&apos;m 18+ and agree to the{" "}
            <a href="/terms" className="underline underline-offset-2">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </a>
          </span>
        </label>
        <button
          type="submit"
          disabled={pending}
          className="btn pulse min-h-14 rounded-full border-2 border-ink bg-ink px-6 font-display text-[21px] font-bold text-lime"
        >
          {pending ? <Loader2 className="size-5 animate-spin" aria-hidden /> : null}
          {pending ? "Saving your spot" : (
            <>
              Get in line <span className="hb">♡</span>
            </>
          )}
        </button>
      </form>
      {error ? (
        <p id={id + "-error"} role="alert" className="self-start rounded-full border-2 border-ink bg-white px-4 py-2 text-sm font-extrabold text-[#b42318]">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function JoinedCard({ joined, className, compact }: { joined: Joined; className?: string; compact?: boolean }) {
  const [copied, setCopied] = React.useState(false)
  const [origin, setOrigin] = React.useState(process.env.NEXT_PUBLIC_SITE_URL || "")
  React.useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SITE_URL) setOrigin(window.location.origin)
  }, [])
  const link = origin.replace(/\/$/, "")
  const shown = link.replace(/^https?:\/\//, "")
  const first = joined.name.split(" ")[0]

  const share = async () => {
    try {
      if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ title: "Pollen", text: "Get paid to shoot video, photos and sound — join the Pollen waitlist:", url: link })
        return
      }
      await navigator.clipboard.writeText(link)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  return (
    <div className={cn("sticker flex animate-rise flex-col gap-3.5 rounded-[32px] bg-white p-6 text-left shadow-[6px_6px_0_#1a1a1a]", className)}>
      {!compact ? (
        <div className="flex items-center gap-2 font-display text-base font-semibold">
          <Check className="size-4" strokeWidth={3} aria-hidden />
          {joined.alreadyJoined ? "Already on the list ✿" : "You're in ♡"}
        </div>
      ) : null}
      <p className="m-0 font-display text-[clamp(30px,4.4vw,46px)] leading-none font-bold text-ink">
        {joined.alreadyJoined ? "You're already on the list" : "You're on the list"}
        {first ? (
          <>
            , <span className="rounded-[.3em] bg-ink px-[.14em] text-lime">{first}</span>
          </>
        ) : null}
        .
      </p>
      <p className="m-0 text-base leading-normal font-semibold">
        We&apos;ll email you when it&apos;s your turn. Know someone with a camera roll full of money? Send them Pollen.
      </p>
      {link ? (
        <div className="flex flex-wrap gap-2">
          <div className="flex min-h-13 min-w-0 flex-[999_1_220px] items-center truncate rounded-full border-2 border-ink bg-cream px-5 font-mono text-sm text-ink">
            {shown}
          </div>
          <button
            type="button"
            onClick={share}
            className="btn min-h-13 flex-[1_0_auto] rounded-full border-2 border-ink bg-ink px-6 font-display text-lg font-bold text-lime"
          >
            {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
            {copied ? "Copied" : "Share Pollen"}
          </button>
        </div>
      ) : null}
    </div>
  )
}
