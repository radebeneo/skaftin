import { EskortHeader } from '@/components/eskort-header'
import { EskortFooter } from '@/components/eskort-footer'
import { MySkaftinHero } from '@/components/myskaftin/hero'
import { MySkaftinExperience } from '@/components/myskaftin/experience'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <EskortHeader cartCount={1} />
      <main id="myskaftin" className="flex-1">
        <MySkaftinHero />
        <section className="mx-auto max-w-3xl px-4 pt-8 text-center">
          <h2 className="font-display text-3xl uppercase leading-none sm:text-4xl">
            Build the perfect week in 3 taps
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm font-semibold text-muted-foreground">
            Tell us what they love, pick a themed menu, and check out with one tidy bundle. We handle the rest.
          </p>
        </section>
        <MySkaftinExperience />
      </main>
      <EskortFooter />
    </div>
  )
}
