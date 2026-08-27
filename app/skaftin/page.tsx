"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MySkaftinHero } from "@/components/myskaftin/hero"
import { MySkaftinExperience } from "@/components/myskaftin/experience"

export default function SkaftinPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30 px-4 py-2">
          <div className="mx-auto max-w-6xl flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <Link href="/" className="inline-flex items-center gap-1.5 hover:text-brand-red transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Eskort Shop Online</span>
            </Link>
          </div>
        </div>

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
