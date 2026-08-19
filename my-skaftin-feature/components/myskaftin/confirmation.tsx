'use client'

import Image from 'next/image'
import { CheckCircle2, Gift, Star, Clock, Bell, CalendarHeart, RotateCcw } from 'lucide-react'
import { PRICE_TIERS, RECIPE_CARDS, WEEKLY_MENUS } from './data'
import type { Selection } from './experience'

export function Confirmation({
  value,
  totalPoints,
  onRestart,
}: {
  value: Selection
  totalPoints: number
  onRestart: () => void
}) {
  const tier = PRICE_TIERS.find((t) => t.id === value.tierId) ?? PRICE_TIERS[0]
  const menu = WEEKLY_MENUS.find((m) => m.id === value.menuId) ?? null
  const earned = tier.points
  const cards = value.prep === 'airfryer' ? RECIPE_CARDS : RECIPE_CARDS.filter((c) => c.method === 'No Cook').concat(RECIPE_CARDS.filter((c) => c.method !== 'No Cook'))

  return (
    <div className="space-y-6">
      {/* Success hero */}
      <div className="rounded-3xl bg-eskort-blue p-6 text-center text-white">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/15">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h2 className="mt-4 font-display text-3xl uppercase leading-none">Skaftin sorted!</h2>
        <p className="mx-auto mt-2 max-w-md text-sm font-semibold text-white/85">
          {value.kidName ? `${value.kidName}'s` : 'Your'} {value.days}-day {menu?.name ?? 'MySkaftin'} kit is on the way.
          Lunchbox boredom: officially cancelled.
        </p>
      </div>

      {/* Gift badge */}
      <div className="flex flex-col items-center gap-4 rounded-3xl border-2 border-dashed border-eskort-red p-5 text-center sm:flex-row sm:text-left">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-muted">
          <Image src="/images/gift-lunchbox.png" alt="Free Eskort Magic Skaftin and stickers" fill sizes="112px" className="object-cover" />
        </div>
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-eskort-red px-3 py-1 text-[11px] font-black uppercase text-white">
            <Gift className="h-3.5 w-3.5" /> Free gift included
          </span>
          <h3 className="mt-2 font-display text-xl uppercase leading-tight">Your Hero Skaftin has landed</h3>
          <p className="text-sm font-semibold text-muted-foreground">
            A limited-edition Magic Lunchbox + sticker pack — the ultimate playground badge of honour. 🦸
          </p>
        </div>
      </div>

      {/* Yummy points balance */}
      <div className="flex items-center justify-between gap-4 rounded-3xl bg-eskort-yellow p-5 text-eskort-ink">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-eskort-ink text-eskort-yellow">
            <Star className="h-6 w-6 fill-eskort-yellow" />
          </span>
          <div>
            <span className="block text-xs font-extrabold uppercase tracking-wide opacity-70">Yummy Points balance</span>
            <span className="font-display text-3xl leading-none">{totalPoints}</span>
          </div>
        </div>
        <span className="rounded-full bg-eskort-ink px-3 py-1.5 text-xs font-black text-eskort-yellow">
          +{earned} this order
        </span>
      </div>

      {/* Recipe cards */}
      <div>
        <h3 className="mb-3 font-display text-xl uppercase tracking-wide">Quick prep guides ⚡</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {cards.map((c) => (
            <div key={c.id} className="rounded-3xl border-2 border-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl" aria-hidden>
                  {c.emoji}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-black text-eskort-blue">
                  <Clock className="h-3.5 w-3.5" /> {c.time}
                </span>
              </div>
              <h4 className="mt-3 font-display text-base uppercase leading-tight">{c.title}</h4>
              <span className="text-[11px] font-black uppercase tracking-wide text-eskort-red">{c.method}</span>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">{c.steps}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Thursday nudge + theme teaser */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-3xl bg-muted p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-eskort-red text-white">
            <Bell className="h-5 w-5" />
          </span>
          <div>
            <span className="block font-display text-base uppercase leading-tight">Thursday reorder nudge</span>
            <span className="text-sm font-semibold text-muted-foreground">
              We&apos;ll WhatsApp you every Thursday: &quot;Running low on Yums? Refill before the weekend.&quot;
            </span>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-3xl bg-muted p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-eskort-blue text-white">
            <CalendarHeart className="h-5 w-5" />
          </span>
          <div>
            <span className="block font-display text-base uppercase leading-tight">Next month: Safari Adventure 🦁</span>
            <span className="text-sm font-semibold text-muted-foreground">
              A fresh themed menu drops monthly so lunch never gets boring.
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-eskort-ink px-6 py-4 font-display text-lg uppercase text-white transition-transform active:scale-[0.98]"
      >
        <RotateCcw className="h-5 w-5" /> Build another kit
      </button>
    </div>
  )
}
