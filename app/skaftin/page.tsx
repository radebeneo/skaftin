"use client"

import { SiteFooter } from "@/components/site-footer"
import { MySkaftinHero } from "@/components/myskaftin/hero"
import { MySkaftinExperience } from "@/components/myskaftin/experience"
import { HomepageHeader } from "@/eskort-homepage-new/header"

export default function SkaftinPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HomepageHeader />
      <main className="flex-1">
        <MySkaftinHero />

        <div className="bg-skaftin-cream">
          <section className="mx-auto max-w-7xl px-4 pt-10 text-center sm:px-6 sm:pt-12 lg:px-8">
            <h2 id="skaftin-builder-heading" className="font-display text-3xl uppercase leading-none sm:text-4xl">
            Tell us who we&apos;re packing for
            </h2>
            <p id="skaftin-builder-intro" className="mx-auto mt-2 max-w-xl text-sm font-semibold text-muted-foreground">
            Answer a few quick questions and we&apos;ll pack their week — tweak anything before you order.
            </p>
          </section>

          <MySkaftinExperience />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
