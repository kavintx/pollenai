import PolaroidLineCarousel, { type Slide } from "@/components/ui/polaroid-line-carousel"
import { Eyebrow, SectionTitle } from "./logo"

// Real camera-roll shots (public/carousel). Add more by dropping a .jpg in that folder and a line here.
const SLIDES: Slide[] = [
  { image: "/carousel/sky.jpg", title: "Cotton-candy sky", caption: "The sunset you stopped the car for.", alt: "Pink and purple sunset over a tree-lined suburban street" },
  { image: "/carousel/street.jpg", title: "Street spotting", caption: "Cars, curbs and city blocks — everyday street scenes.", alt: "A black sedan turning on a sunny downtown street" },
  { image: "/carousel/bridge.jpg", title: "Bridge at dusk", caption: "Traffic, skylines, the commute home.", alt: "Cars heading toward a steel suspension bridge tower at dusk" },
  { image: "/carousel/haul.jpg", title: "Late-night haul", caption: "The weird stuff you see on the highway.", alt: "A car carrier loaded with small white kei trucks on a highway at night" },
  { image: "/carousel/build.jpg", title: "The build", caption: "Your setup, your projects, your stuff.", alt: "A custom gaming PC with red-lit fans in a glass case" },
]

export function OnTheLine() {
  return (
    <section id="line" className="scroll-mt-20 pt-[clamp(72px,9vw,112px)]" aria-labelledby="on-the-line">
      <div data-reveal-stagger className="mx-auto flex max-w-[1200px] flex-col gap-2.5 px-5">
        <Eyebrow>your camera roll ✿</Eyebrow>
        <SectionTitle>
          <span id="on-the-line">Every shot could earn.</span>
        </SectionTitle>
        <p className="m-0 max-w-[560px] text-lg font-semibold">
          Drag the line. Skies, streets, the drive home, your setup. The everyday stuff already on your phone is exactly what
          Pollen pays for.
        </p>
      </div>
      <div data-reveal>
        <PolaroidLineCarousel
          slides={SLIDES}
          height="clamp(560px, 50vw, 680px)"
          cardWidth={280}
          swing={1.4}
          background="transparent"
          ink="#1a1a1a"
          string="#1a1a1a"
          ariaLabel="Example photos you could sell"
        />
      </div>
    </section>
  )
}
