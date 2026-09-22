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
            <h2 className="font-display text-3xl uppercase leading-none sm:text-4xl">
            Tell us who we&apos;re packing for
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm font-semibold text-muted-foreground">
            We&apos;ll build their perfect week in 3 steps — Taste &amp; Prep, Build My Week, then Review &amp; Order.
            </p>
            {/* 3-step visual indicator */}
            <div className="mx-auto mt-5 grid max-w-2xl grid-cols-3 items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wide text-muted-foreground sm:flex sm:justify-center sm:gap-2 sm:text-xs">
              <span className="flex min-h-11 items-center justify-center rounded-2xl bg-eskort-red px-2 py-2 text-white sm:min-h-0 sm:gap-1.5 sm:rounded-full sm:px-3 sm:py-1.5">
              1 Taste &amp; Prep
              </span>
              <span className="hidden text-border sm:inline">→</span>
              <span className="flex min-h-11 items-center justify-center rounded-2xl bg-muted px-2 py-2 sm:min-h-0 sm:rounded-full sm:px-3 sm:py-1.5">
              2 Build My Week
              </span>
              <span className="hidden text-border sm:inline">→</span>
              <span className="flex min-h-11 items-center justify-center rounded-2xl bg-muted px-2 py-2 sm:min-h-0 sm:rounded-full sm:px-3 sm:py-1.5">
              3 Review &amp; Order
              </span>
            </div>
          </section>

          <MySkaftinExperience />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
