import Image from 'next/image'

export function MySkaftinHero() {
  return (
    <section className="relative bg-eskort-blue-light text-eskort-ink">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-4 px-4 pb-16 pt-10 sm:gap-8 sm:px-6 sm:py-14 md:grid-cols-2 md:py-16 lg:px-8 lg:py-20 xl:gap-16">
        <div className="relative z-10">
          <h1 className="font-gobold text-5xl uppercase leading-[0.9] sm:text-6xl lg:text-7xl xl:text-8xl">
            <span className="inline-block font-montserrat font-black text-eskort-ink">CAV</span>
            <br />
            <span className="inline-block font-eskort-spaza text-[1.75em] normal-case text-eskort-red">
              iSKHAFTIN!
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-sm font-semibold text-eskort-ink/85 sm:text-base lg:text-lg">
            Beat decision fatigue. Build your kid&apos;s weekly lunchbox kit from Eskort favourites in{' '}
            <span className="text-eskort-red">3 fun steps</span> — fresh themes every month, zero repeats.
          </p>

          <a
            href="#builder"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full !bg-eskort-ink px-7 py-4 font-display text-lg uppercase !text-white transition-transform active:scale-95 sm:w-auto"
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

        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative mx-auto aspect-square w-full">
            <Image
              src="/images/menu-hero.png"
              alt="A colourful Eskort MySkaftin lunchbox packed with viennas, sandwiches and treats"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 576px"
              className="object-contain"
            />
          </div>
          <Image
            src="/images1/lunchbox-legend.svg"
            alt="Lunchbox Legend"
            width={206}
            height={189}
            className="absolute -bottom-12 left-0 h-auto w-32 drop-shadow-lg sm:-bottom-10 sm:w-40 lg:-left-6 lg:w-48"
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
