import Image from 'next/image'
import { Sparkles, Gift, Star, Clock } from 'lucide-react'

export function MySkaftinHero() {
  return (
    <section className="relative overflow-hidden bg-eskort-blue text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-eskort-yellow px-3 py-1 text-xs font-black uppercase tracking-wide text-eskort-ink">
            <Sparkles className="h-3.5 w-3.5" /> New · Eskort MySkaftin
          </span>
          <h1 className="mt-4 font-display text-5xl uppercase leading-[0.9] sm:text-6xl">
            Bye-bye
            <br />
            <span className="text-eskort-yellow">boring</span> lunchboxes
          </h1>
          <p className="mt-4 max-w-md text-base font-semibold text-white/85">
            Beat decision fatigue. Build your kid&apos;s weekly lunchbox kit from Eskort favourites in{' '}
            <span className="text-eskort-yellow">3 fun steps</span> — fresh themes every month, zero repeats.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 text-sm font-bold">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5">
              <Clock className="h-4 w-4 text-eskort-yellow" /> 3 quick steps
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5">
              <Gift className="h-4 w-4 text-eskort-yellow" /> Free first-order gift
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5">
              <Star className="h-4 w-4 text-eskort-yellow" /> Earn Yummy Points
            </span>
          </div>

          <a
            href="#builder"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-eskort-red px-7 py-4 font-display text-lg uppercase text-white transition-transform active:scale-95"
          >
            Build my kit
          </a>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[2rem] border-4 border-white/20 shadow-2xl">
            <Image
              src="/images/menu-superhero.png"
              alt="A colourful Eskort MySkaftin lunchbox packed with viennas, sandwiches and treats"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>
          <span className="absolute -bottom-3 left-2 rotate-[-6deg] rounded-full bg-eskort-yellow px-4 py-2 font-display text-sm uppercase text-eskort-ink shadow-lg sm:left-6">
            Lunchbox Legend 🏅
          </span>
        </div>
      </div>
    </section>
  )
}
