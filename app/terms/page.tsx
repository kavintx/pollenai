import type { Metadata } from "next"
import { SiteHeader } from "@/components/site/header"
import { SiteFooter } from "@/components/site/footer"

export const metadata: Metadata = {
  title: "Terms of Service — Pollen",
  description: "The terms for using the Pollen app and website.",
}

const LAST_UPDATED = "October 26, 2026"
const COMPANY = "PollenAI LLC"
const CONTACT = "contact@usepollen.ai"

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. Who we are",
    body: (
      <>
        <p>
          Pollen (&ldquo;Pollen,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) is operated by {COMPANY}, a Texas limited
          liability company. Pollen is an app that pays people to capture photos and audio recordings, and licenses
          approved uploads to companies that use them to train and evaluate AI models.
        </p>
        <p>
          These terms cover the Pollen app, the website at usepollen.ai and the waitlist. By creating an account,
          uploading anything or using the site, you agree to them. If you don&apos;t agree, please don&apos;t use
          Pollen.
        </p>
      </>
    ),
  },
  {
    title: "2. Who can use Pollen",
    body: (
      <ul>
        <li>
          You must be at least 18 years old, or the age of majority where you live if that is higher. We check your
          date of birth when you sign up.
        </li>
        <li>You need a phone number that can receive text messages; we use it to sign you in.</li>
        <li>One account per person. Don&apos;t create accounts for anyone else or share yours.</li>
        <li>Some tasks are only available in certain countries.</li>
      </ul>
    ),
  },
  {
    title: "3. Tasks and uploads",
    body: (
      <>
        <p>
          Each task in the app says what to capture, how much each approved upload pays, and how many uploads one person
          can send. Everything you upload must be:
        </p>
        <ul>
          <li>captured by you, in real life, with the Pollen app;</li>
          <li>not generated or materially altered with AI, not copied, downloaded or photographed off a screen;</li>
          <li>not something you&apos;ve uploaded to Pollen before;</li>
          <li>something you have the right to license — no one else&apos;s copyrighted work, and nothing illegal;</li>
          <li>free of other people&apos;s personal information (documents, screens, addresses, license plates).</li>
        </ul>
        <p>
          <strong>Faces and voices.</strong> If an upload shows a recognisable face or contains a recognisable voice
          (yours or anyone else&apos;s), you must say so when you upload it, turn on that option in your profile, and
          have the permission of every recognisable person in it. Never include anyone under 18.
        </p>
      </>
    ),
  },
  {
    title: "4. Review",
    body: (
      <p>
        We review every upload before paying for it. Review is partly automatic: we check for duplicates, basic quality
        (focus, lighting, silence, length) and, using an AI model, whether it matches the task. Clear passes are
        approved automatically, clear failures are declined with a reason, and anything uncertain is checked by a
        person. A declined upload isn&apos;t paid or licensed, is deleted, and you can try again with a new one. Our
        decision on whether an upload meets a task&apos;s requirements is final, but if you think we got it wrong,
        email us.
      </p>
    ),
  },
  {
    title: "5. The license you give us",
    body: (
      <>
        <p>
          You keep ownership of what you upload. For each approved upload, you give {COMPANY} a worldwide,
          royalty-bearing (as described in section 6), non-exclusive, transferable and sublicensable license to store,
          copy, edit, annotate, combine with other data, and license or sell it to third parties — mainly companies that
          use it to train, test and improve AI and machine-learning systems — and to let them do the same for those
          purposes.
        </p>
        <p>
          You can delete an upload in the app at any time until it is included in a dataset delivered to a buyer.
          Once a dataset has been delivered, the license for the uploads in it can&apos;t be withdrawn, because the
          buyer has already received it. The license ends for anything we haven&apos;t delivered when you delete it or
          your account.
        </p>
        <p>
          Datasets don&apos;t include your name, phone number or date of birth. Each contributor appears only as a random
          ID that is different in every dataset, and we remove camera metadata (such as EXIF, which can include
          location) from photos before delivery.
        </p>
      </>
    ),
  },
  {
    title: "6. Pay",
    body: (
      <ul>
        <li>
          Each approved upload pays the amount shown on its task when you upload it. Uploads waiting for review show as
          &ldquo;in review&rdquo; and aren&apos;t paid until they&apos;re approved.
        </li>
        <li>
          <strong>Resale share:</strong> every time we license a dataset that contains your approved uploads, you get
          10% of what those uploads originally paid you, added to your wallet.
        </li>
        <li>
          If you delete an upload that has already been paid, its pay is taken back out of your wallet. If you&apos;ve
          already cashed it out, you can&apos;t delete it in the app — email us.
        </li>
        <li>
          Pay for uploads that turn out to break these terms (for example duplicates, stolen or AI-made content) can be
          reversed, even after approval.
        </li>
        <li>
          Your balance is a record of what we owe you, not a bank account. It earns no interest and has no value outside
          Pollen until you cash it out.
        </li>
      </ul>
    ),
  },
  {
    title: "7. Cashing out",
    body: (
      <ul>
        <li>The minimum cash-out is $25. Earnings are held for 5 days after you request a cash-out as a fraud check.</li>
        <li>
          Cash-outs are paid to your bank through Stripe. To receive them, you set up a Stripe Express account on
          Stripe&apos;s own page, which collects your identity and bank details — Pollen never sees your bank details.
          By doing this you also agree to the{" "}
          <a href="https://stripe.com/connect-account/legal" target="_blank" rel="noopener noreferrer">
            Stripe Connected Account Agreement
          </a>
          .
        </li>
        <li>
          If a payout fails (for example because of wrong bank details), the money goes back to your Pollen wallet.
        </li>
        <li>
          You&apos;re responsible for any taxes on what you earn. We or Stripe may ask for tax information and issue
          tax forms where the law requires it.
        </li>
      </ul>
    ),
  },
  {
    title: "8. What's not allowed",
    body: (
      <ul>
        <li>Faking uploads, uploading the same thing twice, or using bots, emulators or modified versions of the app.</li>
        <li>Using more than one account, or someone else&apos;s.</li>
        <li>Uploading anything that shows people without their permission, anyone under 18, nudity or anything illegal.</li>
        <li>Trying to get around review, limits, holds or security, or scraping or overloading our systems.</li>
      </ul>
    ),
  },
  {
    title: "9. Ending your account",
    body: (
      <>
        <p>
          You can delete your account in the app (Profile → Delete account). Cash out anything you want to keep first.
          Uploads that haven&apos;t been delivered to a buyer are deleted with it.
        </p>
        <p>
          We can suspend or close an account that breaks these terms. If we close an account for fraud, we can keep
          any balance earned through the fraud. Otherwise we&apos;ll pay out what you&apos;ve legitimately earned
          (above the minimum) once any hold ends.
        </p>
      </>
    ),
  },
  {
    title: "10. The waitlist",
    body: (
      <ul>
        <li>Joining the waitlist is free and doesn&apos;t guarantee access, a launch date or any feature.</li>
        <li>Only sign up yourself, with your own name and email. No fake or bulk signups.</li>
        <li>We may email you about Pollen&apos;s launch. Every email includes a way to unsubscribe.</li>
      </ul>
    ),
  },
  {
    title: "11. No promises about earnings",
    body: (
      <p>
        Tasks, pay rates and how often datasets are resold depend on what buyers want, and change over time. We
        don&apos;t promise any amount of work, earnings or resale income.
      </p>
    ),
  },
  {
    title: "12. Our stuff",
    body: (
      <p>
        The Pollen name, logo, app, site design and text belong to {COMPANY}. Don&apos;t copy our branding or pass
        yourself off as Pollen.
      </p>
    ),
  },
  {
    title: "13. Disclaimers and limits",
    body: (
      <>
        <p>
          Pollen is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any kind, to the
          extent the law allows. We don&apos;t promise the app or site will always be available or error-free.
        </p>
        <p>
          To the extent the law allows, {COMPANY} won&apos;t be liable for indirect, incidental, special or
          consequential damages, and our total liability for any claim relating to Pollen is limited to the greater of
          $50 or the amount we paid you in the 12 months before the claim. This doesn&apos;t limit what we owe you for
          approved uploads. Some places don&apos;t allow these limits, so they may not apply to you.
        </p>
        <p>
          You agree to cover {COMPANY}&apos;s losses from claims by others caused by content you uploaded in breach of
          these terms (for example, uploading someone&apos;s photo without their permission).
        </p>
      </>
    ),
  },
  {
    title: "14. Changes",
    body: (
      <p>
        We may update these terms. When we do, we&apos;ll change the date at the top, and for significant changes
        we&apos;ll tell you in the app or by email before they take effect. Changes don&apos;t affect pay for uploads
        approved before they take effect. Continuing to use Pollen after a change means you accept it.
      </p>
    ),
  },
  {
    title: "15. Governing law",
    body: (
      <p>
        These terms are governed by the laws of the State of Texas, without regard to its conflict-of-law rules. Any
        dispute will be handled in the state or federal courts located in Texas, unless the law where you live says
        otherwise.
      </p>
    ),
  },
  {
    title: "16. Contact",
    body: (
      <p>
        Questions about these terms? Email {CONTACT}. Our <a href="/privacy">Privacy Policy</a> explains what data we
        collect and how to delete it.
      </p>
    ),
  },
]

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="px-3 py-3">
        <article className="mx-auto max-w-[860px] rounded-[36px] bg-white px-[clamp(20px,5vw,64px)] py-[clamp(36px,6vw,72px)]">
          <span className="rounded-full bg-lime px-3 py-1.5 font-mono text-xs tracking-[.08em] text-ink-2 uppercase">
            Last updated {LAST_UPDATED}
          </span>
          <h1 className="wide mt-5 mb-4 font-display text-[clamp(40px,7vw,72px)] leading-[.95] font-black tracking-[-0.04em] text-ink">
            Terms of Service
          </h1>
          <p className="m-0 text-lg leading-relaxed text-moss">
            The short version: Pollen is 18+. You get paid for each approved upload, plus 10% of that pay every time a
            dataset with your work is resold. Only upload real things you shot yourself. You keep ownership, can delete
            anything not yet sold, and cash out to your bank through Stripe from $25.
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
