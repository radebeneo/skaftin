import { ArrowRight, Clock, Smile, Star } from "lucide-react"

export function SkaftinHero() {
  return (
    <section className="relative overflow-hidden bg-brand-yellow">
      <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-10 md:grid-cols-2 md:gap-8 md:py-16">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-yellow">
            <Star className="h-3.5 w-3.5 fill-brand-yellow" aria-hidden="true" />
            New · MySkaftin
          </span>

          <h1 className="mt-4 font-display text-4xl leading-[0.95] text-ink text-balance sm:text-6xl md:text-7xl">
            Say bye to boring lunchboxes
          </h1>

          <p className="mt-4 max-w-md text-sm font-medium text-ink/80 leading-relaxed sm:text-base">
            Answer a few fun questions and we&apos;ll build your kid&apos;s
            weekly Skaftin from the Eskort range they love — no more decision
            fatigue, no more repeats.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#builder"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-base font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              Build this week&apos;s Skaftin
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-ink/80">
            <li className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" /> 5 school days sorted
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Smile className="h-4 w-4" aria-hidden="true" /> Kid-approved picks
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4" aria-hidden="true" /> Earn Skaftin Stars
            </li>
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -right-2 -top-3 z-10 rotate-6 rounded-xl border-2 border-ink bg-brand-red px-3 py-1.5 font-display text-sm leading-tight text-brand-yellow shadow-lg">
            Lunchbox
            <br />
            Legend
          </div>
          <div className="overflow-hidden rounded-3xl border-4 border-ink/10 bg-brand-yellow-soft shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-lunchbox.png"
              alt="A colourful kids lunchbox packed with mini viennas, cheese, crackers, sandwich triangles and fruit"
              className="h-full w-full object-cover"
              width={720}
              height={720}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
