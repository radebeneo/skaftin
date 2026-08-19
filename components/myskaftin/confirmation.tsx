'use client'

import Image from 'next/image'
import { CheckCircle2, Gift, Star, Clock, Bell, CalendarHeart, RotateCcw, MapPin, MessageCircle, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { PRICE_TIERS, RECIPE_CARDS, WEEKLY_MENUS } from './data'
import type { Selection } from './experience'
import type { OrderDetails } from './step-order'

export function Confirmation({
  value,
  totalPoints,
  orderDetails,
  onRestart,
}: {
  value: Selection
  totalPoints: number
  orderDetails: OrderDetails
  onRestart: () => void
}) {
  const [copied, setCopied] = useState(false)

  const tier = PRICE_TIERS.find((t) => t.id === value.tierId) ?? PRICE_TIERS[0]
  const menu = WEEKLY_MENUS.find((m) => m.id === value.menuId) ?? null
  const earned = tier.points
  const cards =
    value.prep === 'airfryer'
      ? RECIPE_CARDS
      : RECIPE_CARDS.filter((c) => c.method === 'No Cook').concat(
          RECIPE_CARDS.filter((c) => c.method !== 'No Cook'),
        )

  // Derive a human-readable slot label
  const slotLabel =
    orderDetails.deliverySlot === 'tomorrow-am'
      ? 'Tomorrow, 8 am – 12 pm'
      : orderDetails.deliverySlot === 'tomorrow-pm'
        ? 'Tomorrow, 1 pm – 5 pm'
        : 'End of week (Friday)'

  function copyRef() {
    navigator.clipboard.writeText(orderDetails.orderRef).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function openWhatsApp() {
    const text = encodeURIComponent(
      `Hi Eskort! 🎒 My MySkaftin order ref is *${orderDetails.orderRef}*.\n` +
        `Delivering to: ${orderDetails.suburb}, ${orderDetails.city}.\n` +
        `Slot: ${slotLabel}.\n` +
        `Can't wait! 🔴`,
    )
    window.open(`https://wa.me/27800000000?text=${text}`, '_blank')
  }

  return (
    <div className="space-y-6">
      {/* ── Success hero ─────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-eskort-blue p-6 text-center text-white">
        {/* subtle pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        />
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/15">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h2 className="mt-4 font-display text-3xl uppercase leading-none">Skaftin sorted!</h2>
        <p className="mx-auto mt-2 max-w-md text-sm font-semibold text-white/85">
          {value.kidName ? `${value.kidName}'s` : 'Your'} {value.days}-day{' '}
          {menu?.name ?? 'MySkaftin'} kit is on the way.{' '}
          Lunchbox boredom: officially cancelled. 🎉
        </p>

        {/* Order ref */}
        <button
          id="copy-order-ref"
          type="button"
          onClick={copyRef}
          className="mx-auto mt-4 flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors hover:bg-white/25"
        >
          <span>Order ref: {orderDetails.orderRef}</span>
          {copied ? (
            <Check className="h-3.5 w-3.5 text-eskort-yellow" />
          ) : (
            <Copy className="h-3.5 w-3.5 opacity-70" />
          )}
        </button>
      </div>

      {/* ── Delivery summary card ─────────────────────────────── */}
      <div className="rounded-3xl border-2 border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-eskort-blue/10">
            <MapPin className="h-4 w-4 text-eskort-blue" />
          </span>
          <span className="font-display text-base uppercase tracking-wide">Delivery details</span>
        </div>
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <DetailRow label="Name" value={orderDetails.fullName} />
          <DetailRow label="WhatsApp" value={orderDetails.phone} />
          <DetailRow
            label="Address"
            value={`${orderDetails.street}, ${orderDetails.suburb}, ${orderDetails.city}${orderDetails.postalCode ? ` ${orderDetails.postalCode}` : ''}`}
          />
          <div className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
              Slot
            </span>
            <span className="flex items-center gap-1.5 font-bold text-eskort-blue">
              <Clock className="h-3.5 w-3.5" />
              {slotLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ── Gift badge ───────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-4 rounded-3xl border-2 border-dashed border-eskort-red p-5 text-center sm:flex-row sm:text-left">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-muted">
          <Image
            src="/images/gift-lunchbox.png"
            alt="Free Eskort Magic Skaftin lunchbox and sticker set"
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-eskort-red px-3 py-1 text-[11px] font-black uppercase text-white">
            <Gift className="h-3.5 w-3.5" /> Free gift included
          </span>
          <h3 className="mt-2 font-display text-xl uppercase leading-tight">
            Your Hero Skaftin has landed
          </h3>
          <p className="text-sm font-semibold text-muted-foreground">
            A limited-edition Magic Lunchbox + sticker pack — the ultimate playground badge of
            honour. 🦸
          </p>
        </div>
      </div>

      {/* ── Yummy points ─────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 rounded-3xl bg-eskort-yellow p-5 text-eskort-ink">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-eskort-ink text-eskort-yellow">
            <Star className="h-6 w-6 fill-eskort-yellow" />
          </span>
          <div>
            <span className="block text-xs font-extrabold uppercase tracking-wide opacity-70">
              Yummy Points balance
            </span>
            <span className="font-display text-3xl leading-none">{totalPoints}</span>
          </div>
        </div>
        <span className="rounded-full bg-eskort-ink px-3 py-1.5 text-xs font-black text-eskort-yellow">
          +{earned} this order
        </span>
      </div>

      {/* ── Recipe cards ─────────────────────────────────────── */}
      <div>
        <h3 className="mb-3 font-display text-xl uppercase tracking-wide">Quick prep guides ⚡</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {cards.map((c) => (
            <div key={c.id} className="rounded-3xl border-2 border-border p-4">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-muted" aria-hidden>
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-black text-eskort-blue">
                  <Clock className="h-3.5 w-3.5" /> {c.time}
                </span>
              </div>
              <h4 className="mt-3 font-display text-base uppercase leading-tight">{c.title}</h4>
              <span className="text-[11px] font-black uppercase tracking-wide text-eskort-red">
                {c.method}
              </span>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">{c.steps}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Nudge cards ──────────────────────────────────────── */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-3xl bg-muted p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-eskort-red text-white">
            <Bell className="h-5 w-5" />
          </span>
          <div>
            <span className="block font-display text-base uppercase leading-tight">
              Thursday reorder nudge
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
              We&apos;ll WhatsApp you every Thursday: &quot;Running low on Yums? Refill before the
              weekend.&quot;
            </span>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-3xl bg-muted p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-eskort-blue text-white">
            <CalendarHeart className="h-5 w-5" />
          </span>
          <div>
            <span className="block font-display text-base uppercase leading-tight">
              Next month: Safari Adventure 🦁
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
              A fresh themed menu drops monthly so lunch never gets boring.
            </span>
          </div>
        </div>
      </div>

      {/* ── Action buttons ───────────────────────────────────── */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* WhatsApp CTA */}
        <button
          id="whatsapp-share-btn"
          type="button"
          onClick={openWhatsApp}
          className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-display text-lg uppercase text-white shadow-lg shadow-[#25D366]/25 transition-all active:scale-[0.98] hover:shadow-[#25D366]/40"
        >
          <MessageCircle className="h-5 w-5 fill-white" /> WhatsApp my order
        </button>

        {/* Restart */}
        <button
          id="build-another-kit-btn"
          type="button"
          onClick={onRestart}
          className="flex items-center justify-center gap-2 rounded-full bg-eskort-ink px-6 py-4 font-display text-lg uppercase text-white transition-transform active:scale-[0.98]"
        >
          <RotateCcw className="h-5 w-5" /> Build another kit
        </button>
      </div>
    </div>
  )
}

/* ── Helpers ────────────────────────────────────────────────── */

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 shrink-0 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="font-bold">{value}</span>
    </div>
  )
}
