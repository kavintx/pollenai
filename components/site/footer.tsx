import { Wordmark } from "./logo"

const INSTAGRAM_URL = "https://www.instagram.com/usepollenai/"
const TIKTOK_URL = "https://www.tiktok.com/@usepollenai"
const EMAIL = "contact@usepollen.ai"

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6 px-5 py-11">
        <a href="/#top" aria-label="Pollen home" className="no-underline">
          <Wordmark dark />
        </a>
        <nav aria-label="Footer" className="flex flex-wrap gap-6 text-base font-bold">
          <a href={`mailto:${EMAIL}`} className="nl text-white hover:text-lime">
            {EMAIL}
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="nl text-white hover:text-lime">
            Instagram
          </a>
          <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="nl text-white hover:text-lime">
            TikTok
          </a>
          <a href="/terms" className="nl text-white hover:text-lime">
            Terms
          </a>
          <a href="/privacy" className="nl text-white hover:text-lime">
            Privacy
          </a>
        </nav>
      </div>
      <div className="mx-auto max-w-[1200px] border-t border-white/15 px-5 py-5 text-[13px] font-semibold text-[#cfcfcf]">
        © {new Date().getFullYear()} PollenAI LLC. All rights reserved.
      </div>
    </footer>
  )
}
