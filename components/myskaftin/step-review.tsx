'use client'

import React, { useEffect, useState } from 'react'
import { MapPin, User, Clock, CheckCircle2, Loader2, Gift, Package } from 'lucide-react'
import { PlanSummary, hasPlan } from './plan-summary'
import Image from 'next/image'
import {
  DELIVERY_SLOTS,
  PRICE_TIERS,
  LIKE_OPTIONS,
  DISLIKE_OPTIONS,
  STICKER_THEMES,
  WEEKDAYS_5,
  WEEKDAYS_3,
  type StickerThemeId,
} from './data'
import type { Selection } from './experience'
import type { OrderDetails } from './step-order'

// ─── StepReview ───────────────────────────────────────────────────────────────

export function StepReview({
  value,
  onChange,
  total,
  onConfirm,
  onBack,
}: {
  value: Selection
  onChange: (patch: Partial<Selection>) => void
  total: number
  onConfirm: (details: OrderDetails) => void
  onBack: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [details, setDetails] = useState({
    fullName: '',
    phone: '',
    street: '',
    suburb: '',
    city: '',
    postalCode: '',
    deliverySlot: '',
  })

  const patch = (key: keyof typeof details, val: string) =>
    setDetails((d) => ({ ...d, [key]: val }))

  const isValid =
    hasPlan(value) &&
    details.fullName.trim() !== '' &&
    details.phone.trim() !== '' &&
    details.street.trim() !== '' &&
    details.suburb.trim() !== '' &&
    details.city.trim() !== '' &&
    details.deliverySlot !== ''

  const tier = PRICE_TIERS.find((t) => t.id === value.tierId) ?? PRICE_TIERS[0]
  const likeLabels = LIKE_OPTIONS.filter((o) => value.likes.includes(o.id)).map((o) => o.label)
  const dislikeLabels = DISLIKE_OPTIONS.filter((o) => value.dislikes.includes(o.id)).map((o) => o.label)

  const days = value.days === 5 ? WEEKDAYS_5 : WEEKDAYS_3
  const childName = value.kidName.trim()
  const possessive = childName ? `${childName}'s` : 'Your'

  function handleConfirm() {
    if (!isValid || loading) return
    setLoading(true)
  }

  useEffect(() => {
    if (!loading) return
    const t1 = setTimeout(() => setProgress(100), 60)
    const t2 = setTimeout(() => {
      const ref = `SKF-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`
      onConfirm({ ...details, orderRef: ref })
    }, 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  /* ── Loading screen ──────────────────────────────────────── */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
        <div className="relative">
          <span className="grid h-24 w-24 place-items-center rounded-full bg-eskort-red shadow-lg shadow-eskort-red/30">
            <Loader2 className="h-11 w-11 animate-spin text-white" />
          </span>
          <span className="absolute inset-0 animate-ping rounded-full bg-eskort-red opacity-20" />
        </div>
        <div>
          <p className="font-display text-3xl uppercase leading-tight">Packing your week…</p>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">
            {childName ? `Getting ${childName}'s Skaftin ready 🎒` : 'Packing your Skaftin kit now 🎒'}
          </p>
        </div>
        <div className="h-2 w-64 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-eskort-red transition-all duration-[2.2s] ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs font-semibold text-muted-foreground">Hang tight — this only takes a moment ✨</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* ── Emotional payoff — week preview ─────────────────────── */}
      <div>
        <h2 className="font-display text-2xl uppercase leading-tight sm:text-3xl">
          {possessive} Skaftin Week
        </h2>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">
          Here&apos;s what we&apos;ve packed. Looking good?
        </p>

        {hasPlan(value) ? (
          <div className="mt-4">
            <PlanSummary value={value} />
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border-2 border-dashed border-border p-5 text-center text-sm font-semibold text-muted-foreground">
            <span className="block text-2xl mb-1" aria-hidden="true">🎒</span>
            Go back to Build My Week to generate {possessive.toLowerCase()} week.
          </div>
        )}
      </div>

      {/* ── First-order gift unlock ──────────────────────────────── */}
      <div className="overflow-hidden rounded-[24px] border-2 border-dashed border-eskort-red bg-eskort-red/5 p-5">
        <div className="flex items-start gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-eskort-red text-white">
            <Gift className="h-7 w-7" />
          </span>
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-eskort-red px-2.5 py-1 text-[11px] font-black uppercase text-white">
              <Gift className="h-3 w-3" aria-hidden="true" /> First-time bonus
            </span>
            <h3 className="mt-2 font-display text-xl uppercase leading-tight">
              Free Magic Skaftin Lunchbox + sticker sheet
            </h3>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">
              Your order qualifies! Choose a sticker theme:
            </p>
          </div>
        </div>

        {/* Sticker theme picker */}
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Choose a sticker theme">
          {STICKER_THEMES.map((t) => {
            const active = value.stickerId === t.id
            return (
              <button
                key={t.id}
                id={`sticker-${t.id}`}
                type="button"
                onClick={() => onChange({ stickerId: active ? null : (t.id as StickerThemeId) })}
                aria-pressed={active}
                aria-label={`${t.name} sticker theme`}
                className={`flex items-center gap-2 rounded-full border-2 px-3.5 py-2 text-sm font-bold transition-all active:scale-95 ${
                  active
                    ? 'border-eskort-red bg-eskort-red text-white'
                    : 'border-border bg-white hover:border-eskort-red/50'
                }`}
              >
                <span aria-hidden="true">{t.emoji}</span>
                {t.name}
              </button>
            )
          })}
        </div>
        {value.stickerId && (
          <p className="mt-2 text-xs font-semibold text-eskort-red">
            {STICKER_THEMES.find((t) => t.id === value.stickerId)?.name} theme selected ✓
          </p>
        )}
      </div>

      {/* ── Cart summary ────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-[24px] border-2 border-border">
        <div className="flex items-center gap-2 bg-ink px-4 py-3 text-white">
          <Package className="h-5 w-5 text-eskort-yellow" aria-hidden="true" />
          <span className="font-display text-base uppercase tracking-wide">
            {possessive} order
          </span>
        </div>
        <div className="space-y-2 px-4 py-4 text-sm font-semibold">
          <CartRow label={`${value.days}-day kit (R${tier.pricePerDay} × ${value.days} days)`} value={`R${total}`} />
          <CartRow label="Free Magic Skaftin + stickers" value="R0" highlight />
          <CartRow label="Delivery" value="FREE" highlight />
          {likeLabels.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {likeLabels.slice(0, 4).map((l) => (
                <span key={l} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-bold text-muted-foreground">{l}</span>
              ))}
              {dislikeLabels.map((l) => (
                <span key={l} className="rounded-full bg-ink/10 px-2.5 py-1 text-[11px] font-bold">{l}</span>
              ))}
            </div>
          )}
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <span className="font-display text-xl uppercase">Total</span>
            <span className="font-display text-2xl text-eskort-red">R{total}</span>
          </div>
        </div>
      </div>

      {/* ── Contact details ──────────────────────────────────────── */}
      <div>
        <SectionLabel icon={User} label="Your contact details" />
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="Full name *" id="order-fullName">
            <input
              id="order-fullName"
              value={details.fullName}
              onChange={(e) => patch('fullName', e.target.value)}
              placeholder="e.g. Thabo Radebe"
              className={inputCls}
              aria-required="true"
            />
          </Field>
          <Field label="WhatsApp number *" id="order-phone">
            <input
              id="order-phone"
              type="tel"
              value={details.phone}
              onChange={(e) => patch('phone', e.target.value)}
              placeholder="e.g. 082 000 0000"
              className={inputCls}
              aria-required="true"
            />
          </Field>
        </div>
      </div>

      {/* ── Delivery address ─────────────────────────────────────── */}
      <div>
        <SectionLabel icon={MapPin} label="Delivery address" />
        <div className="mt-3 space-y-3">
          <Field label="Street address *" id="order-street">
            <input
              id="order-street"
              value={details.street}
              onChange={(e) => patch('street', e.target.value)}
              placeholder="e.g. 12 Eskort Avenue"
              className={inputCls}
              aria-required="true"
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Suburb *" id="order-suburb">
              <input id="order-suburb" value={details.suburb} onChange={(e) => patch('suburb', e.target.value)} placeholder="e.g. Midrand" className={inputCls} aria-required="true" />
            </Field>
            <Field label="City *" id="order-city">
              <input id="order-city" value={details.city} onChange={(e) => patch('city', e.target.value)} placeholder="e.g. Johannesburg" className={inputCls} aria-required="true" />
            </Field>
            <Field label="Postal code" id="order-postal">
              <input id="order-postal" value={details.postalCode} onChange={(e) => patch('postalCode', e.target.value)} placeholder="e.g. 1685" className={inputCls} />
            </Field>
          </div>
        </div>
      </div>

      {/* ── Delivery slot ────────────────────────────────────────── */}
      <div>
        <SectionLabel icon={Clock} label="Choose a delivery slot" />
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {DELIVERY_SLOTS.map((slot) => {
            const active = details.deliverySlot === slot.id
            return (
              <button
                key={slot.id}
                id={`slot-${slot.id}`}
                type="button"
                onClick={() => patch('deliverySlot', slot.id)}
                aria-pressed={active}
                aria-label={`${slot.label}, ${slot.note}${slot.badge ? ` — ${slot.badge}` : ''}`}
                className={`relative rounded-2xl border-2 p-4 text-left transition-all active:scale-[0.97] ${
                  active
                    ? 'border-eskort-red bg-eskort-red/5 shadow-sm'
                    : 'border-border bg-background hover:border-eskort-red/40'
                }`}
              >
                {slot.badge && (
                  <span className="absolute right-3 top-3 rounded-full bg-eskort-yellow px-2 py-0.5 text-[10px] font-black text-ink">
                    {slot.badge}
                  </span>
                )}
                <span className={`block font-display text-sm uppercase leading-tight ${active ? 'text-eskort-red' : ''}`}>
                  {slot.label}
                </span>
                <span className="mt-0.5 block text-xs font-semibold text-muted-foreground">{slot.note}</span>
                {active && <CheckCircle2 className="mt-2 h-4 w-4 text-eskort-red" aria-hidden="true" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="review-back"
            type="button"
            onClick={onBack}
            className="flex shrink-0 items-center gap-2 rounded-full border-2 border-border bg-background px-4 py-2.5 font-display text-sm uppercase transition-colors hover:border-ink sm:px-5 sm:text-base"
            aria-label="Go back to Build My Week"
          >
            ← Back
          </button>
          <button
            id="confirm-place-order"
            type="button"
            onClick={handleConfirm}
            disabled={!isValid}
            className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-eskort-red px-5 py-3 font-display text-sm uppercase text-white shadow-md shadow-eskort-red/25 transition-all active:scale-[0.98] hover:shadow-eskort-red/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none sm:text-base"
            aria-label="Confirm and place your order"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Place Order · R{total}
          </button>
        </div>
        <p className="flex items-center justify-center gap-1.5 text-center text-xs font-semibold text-muted-foreground">
          🔒 Secure checkout · Free delivery · No lock-in · Cancel anytime
        </p>
        {!isValid && (
          <p className="text-center text-xs font-semibold text-muted-foreground" role="status">
            Fill in all required fields to place your order.
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const inputCls =
  'w-full rounded-2xl border-2 border-border bg-background px-4 py-3 text-sm font-semibold outline-none transition-colors placeholder:text-muted-foreground focus:border-eskort-red aria-invalid:border-destructive'

function CartRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? 'font-black text-eskort-red' : 'font-bold'}>{value}</span>
    </div>
  )
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}

function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-eskort-red/10">
        <Icon className="h-4 w-4 text-eskort-red" aria-hidden="true" />
      </span>
      <span className="font-display text-base uppercase tracking-wide">{label}</span>
    </div>
  )
}
