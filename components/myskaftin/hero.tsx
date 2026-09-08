import Image from 'next/image'
import { Gift, Star, Clock } from 'lucide-react'

export function MySkaftinHero() {
  return (
    <section className="relative bg-eskort-blue-light text-eskort-ink">
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <h1 className="mt-4 font-gobold text-5xl uppercase leading-[0.9] sm:text-6xl">
            Bye-bye
            <br />
            <span className="inline-block font-eskort-spaza text-[1.75em] text-eskort-red">boring</span>{' '}
            lunchboxes
          </h1>
          <p className="mt-4 max-w-md text-base font-semibold text-eskort-ink/85">
            Beat decision fatigue. Build your kid&apos;s weekly lunchbox kit from Eskort favourites in{' '}
            <span className="text-eskort-red">3 fun steps</span> — fresh themes every month, zero repeats.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 text-sm font-bold">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1.5">
              <Clock className="h-4 w-4 text-eskort-yellow" /> 3 quick steps
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1.5">
              <Gift className="h-4 w-4 text-eskort-yellow" /> Free first-order gift
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1.5">
              <Star className="h-4 w-4 text-eskort-yellow" /> Earn Yummy Points
            </span>
          </div>

          <a
            href="#builder"
            className="mt-7 inline-flex items-center gap-2 rounded-full !bg-eskort-ink px-7 py-4 font-display text-lg uppercase !text-white transition-transform active:scale-95"
          >
            Build my kit
            <Image
              src="/images1/icons/btn-arrow-light.svg"
              alt=""
              width={9}
              height={14}
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <Image
              src="/images/menu-hero.png"
              alt="A colourful Eskort MySkaftin lunchbox packed with viennas, sandwiches and treats"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 448px"
              className="object-contain"
            />
          </div>
          <Image
            src="/images1/lunchbox-legend.svg"
            alt="Lunchbox Legend"
            width={206}
            height={189}
            className="absolute -bottom-16 -left-2 h-auto w-36 drop-shadow-lg sm:-bottom-14 sm:left-2 sm:w-44"
          />
        </div>
      </div>
      <Image
        src="/images1/deco/bg-grundge-blue-light-after.svg"
        alt=""
        width={1920}
        height={26}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-full z-0 h-[26px] w-full object-cover"
      />
    </section>
  )
}
