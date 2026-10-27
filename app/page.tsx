import { SiteHeader } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { OnTheLine } from "@/components/site/on-the-line"
import { Earnings, HowItWorks, Marquee, RealShotsOnly, Trust } from "@/components/site/sections"
import { Faq } from "@/components/site/faq"
import { FinalCta } from "@/components/site/final-cta"
import { SiteFooter } from "@/components/site/footer"
import { WaitlistProvider } from "@/components/site/waitlist"
import { ScrollReveal } from "@/components/site/scroll-reveal"

export default function Home() {
  return (
    <WaitlistProvider>
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <OnTheLine />
        <HowItWorks />
        <Earnings />
        <RealShotsOnly />
        <Trust />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <ScrollReveal />
    </WaitlistProvider>
  )
}
