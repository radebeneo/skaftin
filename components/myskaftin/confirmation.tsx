'use client'

import Image from 'next/image'
import { CheckCircle2, Gift, Star, Clock, Bell, CalendarHeart, RotateCcw, MapPin, MessageCircle, Copy, Check, Share2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { PRICE_TIERS, RECIPE_CARDS, WEEKLY_MENUS, JUNIOR_MENU_ITEMS, STICKER_THEMES } from './data'
import type { Selection } from './experience'
import type { OrderDetails } from './step-order'
import { useRewardsStore } from '@/lib/rewards-store'
import { useNotificationsStore } from '@/lib/notifications-store'

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
  const [shared, setShared] = useState(false)
  const { addStars } = useRewardsStore()
  const { addNotification } = useNotificationsStore()

  const tier = PRICE_TIERS.find((t) => t.id === value.tierId) ?? PRICE_TIERS[0]
  const menu = WEEKLY_MENUS.find((m) => m.id === value.menuId) ?? null
  const earned = tier.points
  const childName = value.kidName.trim()
  const possessive = childName ? `${childName}'s` : 'Your'
  const sticker = STICKER_THEMES.find((s) => s.id === value.stickerId)

  const slotLabel =
    orderDetails.deliverySlot === 'tomorrow-am'
      ? 'Tomorrow, 8 am – 12 pm'
      : orderDetails.deliverySlot === 'tomorrow-pm'
        ? 'Tomorrow, 1 pm – 5 pm'
        : 'End of week (Friday)'

  // Award stars and fire notification once on mount
  useEffect(() => {
    addStars(earned, `Skaftin plan — ${tier.name}`)
    addNotification('stars', `+${earned} Skaftin Stars earned! ⭐`, `Your ${tier.name} plan has been confirmed. Stars added to your balance.`)
    addNotification('order', 'Skaftin Plan Confirmed! 🎒', `Order ${orderDetails.orderRef} is confirmed. Delivery: ${slotLabel}.`)
    try {
      const raw = localStorage.getItem('eskort-plans')
      const plans = raw ? JSON.parse(raw) : []
      plans.unshift({ id: orderDetails.orderRef, name: menu?.name ?? tier.name, tier: tier.name, stars: earned, date: Date.now() })
      localStorage.setItem('eskort-plans', JSON.stringify(plans.slice(0, 20)))
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cards = value.prep === 'airfryer'
    ? RECIPE_CARDS
    : RECIPE_CARDS.filter((c) => c.method === 'No Cook').concat(RECIPE_CARDS.filter((c) => c.method !== 'No Cook'))

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

  function shareWeek() {
    const weekText = value.generatedWeek.length > 0
      ? value.generatedWeek.map((d) => {
          const meal = JUNIOR_MENU_ITEMS.find((m) => m.id === d.mealId)
          return `${d.day}: ${meal?.emoji ?? ''} ${meal?.name ?? d.mealId}`
        }).join('\n')
      : `${value.days}-day ${menu?.name ?? tier.name} plan`

    const shareData = {
      title: `${possessive} Skaftin Week`,
      text: `${possessive} Skaftin Week 🎒\n\n${weekText}\n\nBuilt with MySkaftin by Eskort`,
      url: 'https://eskort.co.za/skaftin',
    }

    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share(shareData).then(() => setShared(true)).catch(() => {})
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}`).then(() => {
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Success hero ──────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[32px] bg-eskort-blue p-8 text-center text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          aria-hidden="true"
        />
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/15">
          <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-display text-4xl uppercase leading-none">Your week is packed 🎉</h1>
        <p className="mx-auto mt-3 max-w-md text-sm font-semibold text-white/85">
          {value.days} lunches planned.{' '}
          {value.days === 5 ? 'Five mornings sorted.' : 'Three mornings sorted.'}{' '}
          {childName ? `${childName}'s` : 'Lunchbox'} boredom: officially cancelled.
        </p>

        {/* Order ref */}
        <button
          id="copy-order-ref"
          type="button"
          onClick={copyRef}
          aria-label={`Copy order reference ${orderDetails.orderRef} to clipboard`}
          className="mx-auto mt-4 flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors hover:bg-white/25"
        >
          <span>Ref: {orderDetails.orderRef}</span>
          {copied ? (
            <Check className="h-3.5 w-3.5 text-eskort-yellow" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* ── Week visual summary ──────────────────────────────────── */}
      {value.generatedWeek.length > 0 && (
        <div className="rounded-[24px] border-2 border-border bg-card p-5">
          <h2 className="mb-4 font-display text-lg uppercase tracking-wide">
            {possessive} Skaftin Week
          </h2>
          <div className="overflow-x-auto -mx-2 px-2">
            <div
              className="flex gap-2 pb-1"
              style={{ minWidth: `${value.days * 110}px` }}
            >
              {value.generatedWeek.map((entry) => {
                const meal = JUNIOR_MENU_ITEMS.find((m) => m.id === entry.mealId)
                if (!meal) return null
                return (
                  <div
                    key={entry.day}
                    className="flex flex-col items-center rounded-2xl border border-border bg-background p-3 text-center min-w-[100px]"
                  >
                    <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      {entry.day}
                    </span>
                    <div
                      className="mb-1.5 flex h-10 w-10 items-center justify-center rounded-xl text-xl"
                      style={{ background: meal.placeholderBg }}
                      aria-label={meal.name}
                    >
                      <span aria-hidden="true">{meal.emoji === 'ABC' ? '🔡' : meal.emoji}</span>
                    </div>
                    <span className="block text-[11px] font-bold leading-tight">{meal.name}</span>
                    <div className="mt-1 flex items-center justify-center gap-0.5">
                      {entry.sides.map((s, i) => (
                        <span key={i} className="text-sm" aria-hidden="true">{s}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Delivery summary ─────────────────────────────────────── */}
      <div className="rounded-[24px] border-2 border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-eskort-blue/10">
            <MapPin className="h-4 w-4 text-eskort-blue" aria-hidden="true" />
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
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {slotLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ── Gift reveal ─────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-4 rounded-[24px] border-2 border-dashed border-eskort-red p-5 text-center sm:flex-row sm:text-left">
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
            <Gift className="h-3.5 w-3.5" aria-hidden="true" /> Free gift included
          </span>
          <h3 className="mt-2 font-display text-xl uppercase leading-tight">
            Your Hero Skaftin has landed
          </h3>
          <p className="text-sm font-semibold text-muted-foreground">
            Magic Lunchbox + {sticker ? `${sticker.emoji} ${sticker.name}` : 'custom'} sticker pack — the ultimate playground badge of honour. 🦸
          </p>
        </div>
      </div>

      {/* ── Stars earned ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 rounded-[24px] bg-eskort-yellow px-5 py-5 text-ink">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-eskort-yellow">
            <Star className="h-6 w-6 fill-eskort-yellow" aria-hidden="true" />
          </span>
          <div>
            <span className="block text-xs font-extrabold uppercase tracking-wide opacity-70">
              Skaftin Stars balance
            </span>
            <span className="font-display text-3xl leading-none">{totalPoints}</span>
          </div>
        </div>
        <span className="rounded-full bg-ink px-3 py-1.5 text-xs font-black text-eskort-yellow">
          +{earned} this order
        </span>
      </div>

      {/* ── Quick prep guides ─────────────────────────────────────── */}
      <div>
        <h3 className="mb-3 font-display text-xl uppercase tracking-wide">Quick prep guides ⚡</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {cards.map((c) => (
            <div key={c.id} className="rounded-[24px] border-2 border-border p-4">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-muted" aria-hidden>
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-black text-eskort-blue">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {c.time}
                </span>
              </div>
              <h4 className="mt-3 font-display text-base uppercase leading-tight">{c.title}</h4>
              <span className="text-[11px] font-black uppercase tracking-wide text-eskort-red">{c.method}</span>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">{c.steps}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Nudge cards ───────────────────────────────────────────── */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-[24px] bg-muted p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-eskort-red text-white">
            <Bell className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <span className="block font-display text-base uppercase leading-tight">Thursday reorder nudge</span>
            <span className="text-sm font-semibold text-muted-foreground">
              We&apos;ll WhatsApp you every Thursday: &quot;Running low? Refill before the weekend.&quot;
            </span>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-[24px] bg-muted p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-eskort-blue text-white">
            <CalendarHeart className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <span className="block font-display text-base uppercase leading-tight">Next month: Safari Adventure 🦁</span>
            <span className="text-sm font-semibold text-muted-foreground">
              A fresh themed menu drops monthly so lunch never gets boring.
            </span>
          </div>
        </div>
      </div>

      {/* ── Action buttons ────────────────────────────────────────── */}
      <div className="grid gap-3 sm:grid-cols-3">
        {/* Share week */}
        <button
          id="share-week-btn"
          type="button"
          onClick={shareWeek}
          aria-label="Share your week plan"
          className="flex items-center justify-center gap-2 rounded-full border-2 border-border bg-background px-5 py-4 font-display text-base uppercase transition-all active:scale-[0.98] hover:border-ink"
        >
          {shared ? (
            <><Check className="h-5 w-5 text-brand-green" aria-hidden="true" /> Copied!</>
          ) : (
            <><Share2 className="h-5 w-5" aria-hidden="true" /> Share Week</>
          )}
        </button>

        {/* WhatsApp */}
        <button
          id="whatsapp-share-btn"
          type="button"
          onClick={openWhatsApp}
          aria-label="Share order details on WhatsApp"
          className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-4 font-display text-base uppercase text-white shadow-lg shadow-[#25D366]/25 transition-all active:scale-[0.98] hover:shadow-[#25D366]/40"
        >
          <MessageCircle className="h-5 w-5 fill-white" aria-hidden="true" /> WhatsApp
        </button>

        {/* Restart */}
        <button
          id="build-another-kit-btn"
          type="button"
          onClick={onRestart}
          aria-label="Build another Skaftin kit"
          className="flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 font-display text-base uppercase text-white transition-transform active:scale-[0.98]"
        >
          <RotateCcw className="h-5 w-5" aria-hidden="true" /> Build another
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
