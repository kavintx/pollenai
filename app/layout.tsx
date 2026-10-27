import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import HoneycombBg from "@/components/ui/honeycomb-bg"
import "./globals.css"

// Self-hosted (app/fonts) so builds never depend on reaching Google Fonts.
const fredoka = localFont({ src: "./fonts/fredoka-variable.woff2", variable: "--font-fredoka", weight: "300 700", display: "swap" })
const nunito = localFont({ src: "./fonts/nunito-variable.woff2", variable: "--font-nunito", weight: "200 1000", display: "swap" })
const jetbrains = localFont({ src: "./fonts/jetbrains-mono-500.woff2", variable: "--font-jetbrains", weight: "500", display: "swap" })

export const metadata: Metadata = {
  title: "Pollen — Your camera roll is worth money",
  description:
    "Shoot real photos, video and audio from a shot list. AI companies license it. You get paid per task, plus 10% every time your dataset resells. Join the waitlist.",
  openGraph: {
    title: "Pollen — Your camera roll is worth money.",
    description: "Get paid to shoot real photos, video and audio for AI companies. Join the waitlist.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#ffde59",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} ${jetbrains.variable}`}>
      <body className="overflow-x-hidden">
        <HoneycombBg />
        {children}
      </body>
    </html>
  )
}
