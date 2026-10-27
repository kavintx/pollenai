import type { Metadata } from "next"
import { SiteHeader } from "@/components/site/header"
import { SiteFooter } from "@/components/site/footer"

export const metadata: Metadata = {
  title: "Privacy Policy — Pollen",
  description: "What personal data Pollen collects, why, who it's shared with, and how to delete it.",
}

const LAST_UPDATED = "October 26, 2026"
const COMPANY = "PollenAI LLC"
const CONTACT = "contact@usepollen.ai"

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. Who we are",
    body: (
      <p>
        Pollen is operated by {COMPANY}, a Texas limited liability company (&ldquo;we,&rdquo; &ldquo;us&rdquo;). This
        policy covers the Pollen app, the website at usepollen.ai and the waitlist. Questions or requests: {CONTACT}.
      </p>
    ),
  },
  {
    title: "2. What we collect",
    body: (
      <>
        <p>
          <strong>Account:</strong> your phone number (to sign you in by text), your name, your date of birth (to
          confirm you&apos;re 18 or older), your country and state or region (some tasks are country-specific), and
          your choices about faces and voices.
        </p>
        <p>
          <strong>Your uploads:</strong> the photos and audio recordings you send, what you told us about them (for
          example whether they contain a face or a voice), when you sent them, and basic technical details such as
          file size, length, and your phone&apos;s platform and OS version.
        </p>
        <p>
          <strong>Consent records:</strong> when you accepted our terms and data license, with the IP address and
          device information at that moment, so we can prove consent to buyers.
        </p>
        <p>
          <strong>Earnings:</strong> your wallet balance, what each upload paid, resale shares and cash-out history.
          Your bank details and ID check are collected by Stripe, not by us; we only receive whether your payout
          account is ready.
        </p>
        <p>
          <strong>Waitlist:</strong> your first name, your email address, your confirmation that you&apos;re 18 or
          older, and when you joined.
        </p>
        <p>
          <strong>What we don&apos;t collect:</strong> we don&apos;t ask for your location, contacts or photo library,
          and we don&apos;t use advertising trackers. The camera and microphone are only used when you tap to capture
          something for a task.
        </p>
      </>
    ),
  },
  {
    title: "3. How we use it",
    body: (
      <ul>
        <li>To run your account, sign you in and keep it secure.</li>
        <li>To review uploads (duplicates, quality and whether they match the task) and pay you for approved ones.</li>
        <li>To build datasets from approved uploads and license them to buyers, as you agreed in our Terms.</li>
        <li>To pay you, pay resale shares and prevent fraud.</li>
        <li>To contact you about your account, uploads and payouts, and (for the waitlist) about Pollen&apos;s launch.</li>
        <li>To meet legal, tax and accounting obligations.</li>
      </ul>
    ),
  },
  {
    title: "4. Datasets we license",
    body: (
      <>
        <p>
          When we license a dataset, the buyer receives the approved uploads in it plus basic details about each one
          (task, file type, length, capture date and technical details). Buyers use them to train, test and improve
          AI and machine-learning systems.
        </p>
        <p>
          Datasets don&apos;t include your name, phone number, date of birth or account details. Each contributor
          appears only as a random ID that is different in every dataset, and we remove camera metadata (such as EXIF,
          which can include location) from photos before delivery. If you chose to upload something that shows your
          face or contains your voice, that is part of the upload itself.
        </p>
      </>
    ),
  },
  {
    title: "5. Who else processes your data",
    body: (
      <>
        <p>We use these service providers, only for running Pollen:</p>
        <ul>
          <li>Twilio — sends sign-in codes by text.</li>
          <li>Stripe — payout accounts, identity checks and bank payouts.</li>
          <li>Cloudflare — stores uploads and datasets.</li>
          <li>Render and Upstash — run our servers, database and background jobs.</li>
          <li>Anthropic — an AI model checks whether uploaded photos match the task. Anthropic doesn&apos;t train its models on this data.</li>
          <li>Supabase and Vercel — run the website and the waitlist.</li>
          <li>Google Workspace — email.</li>
        </ul>
        <p>
          We also share data where the law requires it, to protect people from harm or fraud, or as part of a sale or
          merger of our business (with this policy still applying). We don&apos;t sell your personal information,
          such as your phone number, email or name, to anyone.
        </p>
      </>
    ),
  },
  {
    title: "6. How long we keep it",
    body: (
      <ul>
        <li>Declined uploads are deleted after review.</li>
        <li>Approved uploads are kept until you delete them, or for as long as the datasets they&apos;re in are licensed.</li>
        <li>Account details are kept while your account is open and deleted when you delete it.</li>
        <li>
          Payment, tax and consent records are kept for as long as the law requires (usually up to 7 years), even
          after you delete your account.
        </li>
      </ul>
    ),
  },
  {
    title: "7. Your choices and rights",
    body: (
      <>
        <ul>
          <li>
            <strong>Delete uploads:</strong> Profile → My uploads. You can delete anything not yet delivered to a
            buyer.
          </li>
          <li>
            <strong>Delete your account:</strong> Profile → Delete account. This removes your account and any uploads
            not yet delivered to a buyer.
          </li>
          <li>
            <strong>Faces and voices:</strong> switch these off in your profile at any time to stop new uploads with
            them.
          </li>
          <li>
            <strong>Access or correction:</strong> email {CONTACT} for a copy of your data or to fix something.
          </li>
          <li>
            <strong>Waitlist:</strong> unsubscribe from any email, or ask us to delete your entry.
          </li>
        </ul>
        <p>
          Depending on where you live (for example California, Texas or the EU/UK), you may have further rights, such
          as to know, delete, correct or limit the use of your personal information. We&apos;ll honour these requests
          as the law requires and won&apos;t treat you differently for making them. Uploads already delivered to a
          buyer can&apos;t be recalled.
        </p>
      </>
    ),
  },
  {
    title: "8. Security",
    body: (
      <p>
        Data is encrypted in transit, uploads go straight to private storage through short-lived links, and access to
        personal data is limited to people who need it to run Pollen. No system is perfectly secure; if a breach affects
        you, we&apos;ll tell you as the law requires.
      </p>
    ),
  },
  {
    title: "9. Under 18s",
    body: (
      <p>
        Pollen is only for adults. We don&apos;t knowingly collect data from anyone under 18, and uploads must never
        include anyone under 18. If we learn that an account belongs to someone under 18, we&apos;ll close it and
        delete its data. If you think that&apos;s happened, email us.
      </p>
    ),
  },
  {
    title: "10. Where data is stored",
    body: (
      <p>
        Pollen is run from the United States, and our providers may store data in the US and other countries. Wherever
        it&apos;s stored, it&apos;s protected as this policy describes.
      </p>
    ),
  },
  {
    title: "11. Changes",
    body: (
      <p>
        If we change this policy, we&apos;ll update the date at the top, and for significant changes we&apos;ll tell
        you in the app or by email before they take effect.
      </p>
    ),
  },
  {
    title: "12. Contact",
    body: (
      <p>
        {COMPANY} · {CONTACT}. See also our <a href="/terms">Terms of Service</a>.
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="px-3 py-3">
        <article className="mx-auto max-w-[860px] rounded-[36px] bg-white px-[clamp(20px,5vw,64px)] py-[clamp(36px,6vw,72px)]">
          <span className="rounded-full bg-lime px-3 py-1.5 font-mono text-xs tracking-[.08em] text-ink-2 uppercase">
            Last updated {LAST_UPDATED}
          </span>
          <h1 className="wide mt-5 mb-4 font-display text-[clamp(40px,7vw,72px)] leading-[.95] font-black tracking-[-0.04em] text-ink">
            Privacy Policy
          </h1>
          <p className="m-0 text-lg leading-relaxed text-moss">
            The short version: we collect what we need to sign you in, check you&apos;re 18+, review and pay for your
            uploads, and license approved uploads to AI companies. Datasets never include your name or phone number.
            We don&apos;t sell your personal info, and you can delete unsold uploads or your whole account in the app.
          </p>
          <div className="mt-10 flex flex-col gap-9 text-base leading-relaxed text-ink-2 [&_a]:underline [&_a]:underline-offset-2 [&_li]:pl-1 [&_p]:m-0 [&_p+p]:mt-3 [&_ul]:m-0 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5 [&_ul]:marker:text-leaf">
            {SECTIONS.map((s) => (
              <section key={s.title} className="flex flex-col gap-3">
                <h2 className="m-0 text-xl font-extrabold text-ink">{s.title}</h2>
                {s.body}
              </section>
            ))}
          </div>
        </article>
      </main>
      <div className="h-12" />
      <SiteFooter />
    </>
  )
}
