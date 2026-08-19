'use client'

import Image from 'next/image'
import { Check, Sparkles, Star, Flame, Snowflake } from 'lucide-react'
import { PRICE_TIERS, WEEKLY_MENUS, accentBg } from './data'
import type { Selection } from './experience'

export function StepMenu({
  value,
  onChange,
}: {
  value: Selection
  onChange: (patch: Partial<Selection>) => void
}) {
  // Menus that respect the chosen prep style show first & matched.
  const menus = [...WEEKLY_MENUS].sort(
    (a, b) => Number(b.prep === value.prep) - Number(a.prep === value.prep),
  )

  return (
    <div className="space-y-8">
      {/* Price range */}
      <div>
        <h3 className="mb-1 font-display text-xl uppercase tracking-wide">Pick your budget</h3>
        <p className="mb-3 text-sm font-semibold text-muted-foreground">Per day, per kid — you&apos;re in control.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {PRICE_TIERS.map((t) => {
            const active = value.tierId === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onChange({ tierId: t.id })}
                className={`relative rounded-3xl border-2 p-4 text-left transition-all active:scale-[0.98] ${
                  active
                    ? 'border-eskort-yellow bg-eskort-yellow text-eskort-ink shadow-md'
                    : 'border-border bg-background hover:border-eskort-yellow'
                }`}
              >
                {active && (
                  <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-eskort-ink text-white">
                    <Check className="h-4 w-4" />
                  </span>
                )}
                <span className="block font-display text-base uppercase leading-tight">{t.name}</span>
                <span className="mt-1 block text-xs font-semibold opacity-70">{t.tagline}</span>
                <span className="mt-3 block font-display text-3xl leading-none">R{t.pricePerDay}</span>
                <span className="text-xs font-bold opacity-70">per day</span>
                <span className="mt-2 flex items-center gap-1 text-xs font-extrabold text-eskort-red">
                  <Star className="h-3.5 w-3.5 fill-eskort-red" /> +{t.points} Yummy Points
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Curated weekly menu */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-eskort-red" />
          <h3 className="font-display text-xl uppercase tracking-wide">This month&apos;s curated menus</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {menus.map((m) => {
            const active = value.menuId === m.id
            const matched = m.prep === value.prep
            const PrepIcon = m.prep === 'airfryer' ? Flame : Snowflake
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onChange({ menuId: m.id })}
                className={`group overflow-hidden rounded-3xl border-2 text-left transition-all active:scale-[0.99] ${
                  active ? 'border-eskort-red shadow-lg' : 'border-border hover:border-eskort-red/50'
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={m.image || '/placeholder.svg'}
                    alt={`${m.name} lunchbox`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white ${accentBg[m.accent]}`}
                  >
                    {m.theme}
                  </span>
                  {matched && (
                    <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-black text-eskort-ink">
                      <PrepIcon className="h-3.5 w-3.5" /> Your prep
                    </span>
                  )}
                  {active && (
                    <span className="absolute inset-0 flex items-center justify-center bg-eskort-red/25">
                      <span className="flex items-center gap-1.5 rounded-full bg-eskort-red px-4 py-2 font-display text-sm uppercase text-white">
                        <Check className="h-4 w-4" /> Selected
                      </span>
                    </span>
                  )}
                </div>
                <div className="bg-background p-4">
                  <span className="font-display text-lg uppercase leading-tight">{m.name}</span>
                  <p className="mt-1 text-sm font-semibold text-muted-foreground">{m.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {m.highlights.map((h) => (
                      <span key={h} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
