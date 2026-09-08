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

        <section className="mx-auto max-w-3xl px-4 pt-8 text-center">
          <h2 className="font-display text-3xl uppercase leading-none sm:text-4xl">
            Tell us who we&apos;re packing for
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm font-semibold text-muted-foreground">
            We&apos;ll build their perfect week in 3 steps — Taste &amp; Prep, Build My Week, then Review &amp; Order.
          </p>
          {/* 3-step visual indicator */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
            <span className="flex items-center gap-1.5 rounded-full bg-eskort-red px-3 py-1.5 text-white">
              1 Taste &amp; Prep
            </span>
            <span className="text-border">→</span>
            <span className="rounded-full bg-muted px-3 py-1.5">
              2 Build My Week
            </span>
            <span className="text-border">→</span>
            <span className="rounded-full bg-muted px-3 py-1.5">
              3 Review &amp; Order
            </span>
          </div>
        </section>

        <MySkaftinExperience />
      </main>
      <SiteFooter />
    </div>
  )
}
