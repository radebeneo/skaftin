"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { EskortHomepage } from "@/components/eskort-homepage"

export default function Page() {
  const [stars, setStars] = useState(15)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader stars={stars} />
      <main className="flex-1">
        <EskortHomepage />
      </main>
      <SiteFooter />
    </div>
  )
}
