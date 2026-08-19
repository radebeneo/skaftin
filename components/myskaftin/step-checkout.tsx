'use client'

import Image from 'next/image'
import { Gift, Star, Package, Sparkles } from 'lucide-react'
import {
  LIKE_OPTIONS,
  DISLIKE_OPTIONS,
  PRICE_TIERS,
  WEEKLY_MENUS,
} from './data'
import type { Selection } from './experience'

export function StepCheckout({ value }: { value: Selection }) {
  const tier = PRICE_TIERS.find((t) => t.id === value.tierId) ?? PRICE_TIERS[0]
  const menu = WEEKLY_MENUS.find((m) => m.id === value.menuId) ?? null
  const total = tier.pricePerDay * value.days
  const points = tier.points

  const likeLabels = LIKE_OPTIONS.filter((o) => value.likes.includes(o.id)).map((o) => o.label)
  const dislikeLabels = DISLIKE_OPTIONS.filter((o) => value.dislikes.includes(o.id)).map((o) => o.label)

  return (
    <div className="space-y-6">
      {/* First-order gift banner */}
      <div className="flex items-center gap-4 rounded-3xl bg-eskort-red p-4 text-white">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15">
          <Gift className="h-7 w-7" />
        </span>
        <div>
          <span className="block font-display text-lg uppercase leading-tight">First-time bonus unlocked!</span>
          <span className="text-sm font-semibold text-white/85">
            Your order qualifies for a FREE Eskort Magic Skaftin lunchbox + custom sticker sheet. 🎉
          </span>
        </div>
      </div>

      {/* Bundled single SKU */}
      <div className="overflow-hidden rounded-3xl border-2 border-border">
        <div className="flex items-center gap-2 bg-eskort-ink px-4 py-3 text-white">
          <Package className="h-5 w-5 text-eskort-yellow" />
          <span className="font-display text-base uppercase tracking-wide">Your bundled cart · 1 item</span>
        </div>

        <div className="flex gap-4 p-4">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-muted">
            <Image
              src={menu?.image || '/images/menu-classic.png'}
              alt="MySkaftin Weekly Rescue Pack"
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-display text-lg uppercase leading-tight">MySkaftin Weekly Rescue Pack</span>
            <p className="text-sm font-semibold text-muted-foreground">
              {value.days}-day {menu ? menu.name : 'custom'} kit ·{' '}
              {value.prep === 'airfryer' ? 'Air Fryer Preps' : 'Grab & Go'}
            </p>
            {value.kidName && (
              <p className="text-sm font-bold text-eskort-red">Curated for {value.kidName}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {likeLabels.slice(0, 4).map((l) => (
                <span key={l} className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold text-muted-foreground">
                  {l}
                </span>
              ))}
              {dislikeLabels.map((l) => (
                <span key={l} className="rounded-full bg-eskort-ink/10 px-2 py-0.5 text-[11px] font-bold text-eskort-ink">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Totals */}
        <div className="space-y-2 border-t border-border px-4 py-4 text-sm font-semibold">
          <Row label={`Weekly kit (R${tier.pricePerDay} × ${value.days} days)`} value={`R${total}`} />
          <Row label="Free Magic Skaftin + stickers" value="R0" highlight />
          <Row label="Delivery" value="FREE" highlight />
          <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
            <span className="font-display text-xl uppercase">Total</span>
            <span className="font-display text-2xl text-eskort-red">R{total}</span>
          </div>
        </div>
      </div>

      {/* Yummy points */}
      <div className="flex items-center gap-4 rounded-3xl bg-eskort-yellow p-4 text-eskort-ink">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-eskort-ink text-eskort-yellow">
          <Star className="h-6 w-6 fill-eskort-yellow" />
        </span>
        <div>
          <span className="block font-display text-lg uppercase leading-tight">You&apos;ll earn +{points} Yummy Points</span>
          <span className="text-sm font-semibold opacity-80">
            Redeem points for discounts, treats & limited-edition boxes.
          </span>
        </div>
      </div>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs font-bold text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-eskort-red" />
        Skip, pause or swap themes anytime. No lock-in.
      </p>
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? 'font-black text-eskort-red' : 'font-bold'}>{value}</span>
    </div>
  )
}
