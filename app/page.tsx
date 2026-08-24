"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { EskortHomepage } from "@/components/eskort-homepage"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <EskortHomepage />
      </main>
      <SiteFooter />
    </div>
  )
}
