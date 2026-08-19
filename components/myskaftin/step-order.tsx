'use client'

import { useEffect, useState } from 'react'
import { MapPin, Phone, User, Clock, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'
import { DELIVERY_SLOTS } from './data'

export type OrderDetails = {
  fullName: string
  phone: string
  street: string
  suburb: string
  city: string
  postalCode: string
  deliverySlot: string
  orderRef: string
}

export function StepOrder({
  defaultName,
  total,
  onConfirm,
}: {
  defaultName: string
  total: number
  onConfirm: (details: OrderDetails) => void
}) {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [details, setDetails] = useState({
    fullName: defaultName,
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
    details.fullName.trim() !== '' &&
    details.phone.trim() !== '' &&
    details.street.trim() !== '' &&
    details.suburb.trim() !== '' &&
    details.city.trim() !== '' &&
    details.deliverySlot !== ''

  function handleConfirm() {
    if (!isValid || loading) return
    setLoading(true)
  }

  // Kick off progress bar + fire onConfirm after 2.2 s
  useEffect(() => {
    if (!loading) return
    const t1 = setTimeout(() => setProgress(100), 60)
    const t2 = setTimeout(() => {
      const ref = `SKF-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`
      onConfirm({ ...details, orderRef: ref })
    }, 2400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  /* ── Loading screen ─────────────────────────────────────── */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
        <div className="relative">
          <span className="grid h-24 w-24 place-items-center rounded-full bg-eskort-red shadow-lg shadow-eskort-red/30">
            <Loader2 className="h-11 w-11 animate-spin text-white" />
          </span>
          {/* pulsing ring */}
          <span className="absolute inset-0 animate-ping rounded-full bg-eskort-red opacity-20" />
        </div>

        <div>
          <p className="font-display text-3xl uppercase leading-tight">Processing your order…</p>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">
            Packing your Skaftin kit now 🎒
          </p>
        </div>

        {/* animated progress bar */}
        <div className="h-2 w-64 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-eskort-red transition-all duration-[2.2s] ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs font-semibold text-muted-foreground">
          Hang tight — this only takes a moment ✨
        </p>
      </div>
    )
  }

  /* ── Order details form ─────────────────────────────────── */
  return (
    <div className="space-y-7">
      {/* Order total strip */}
      <div className="flex items-center justify-between rounded-2xl bg-eskort-ink px-5 py-3.5 text-white">
        <div>
          <span className="block text-xs font-black uppercase tracking-widest opacity-60">
            Order total
          </span>
          <span className="font-display text-3xl leading-none text-eskort-yellow">R{total}</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5">
          <ShieldCheck className="h-4 w-4 text-eskort-yellow" />
          <span className="text-xs font-black text-white/90">Secure checkout</span>
        </div>
      </div>

      {/* Contact details */}
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
            />
          </Field>
        </div>
      </div>

      {/* Delivery address */}
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
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Suburb *" id="order-suburb">
              <input
                id="order-suburb"
                value={details.suburb}
                onChange={(e) => patch('suburb', e.target.value)}
                placeholder="e.g. Midrand"
                className={inputCls}
              />
            </Field>
            <Field label="City *" id="order-city">
              <input
                id="order-city"
                value={details.city}
                onChange={(e) => patch('city', e.target.value)}
                placeholder="e.g. Johannesburg"
                className={inputCls}
              />
            </Field>
            <Field label="Postal code" id="order-postal">
              <input
                id="order-postal"
                value={details.postalCode}
                onChange={(e) => patch('postalCode', e.target.value)}
                placeholder="e.g. 1685"
                className={inputCls}
              />
            </Field>
          </div>
        </div>
      </div>

      {/* Delivery slot */}
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
                className={`relative rounded-2xl border-2 p-4 text-left transition-all active:scale-[0.97] ${
                  active
                    ? 'border-eskort-red bg-eskort-red/5 shadow-sm'
                    : 'border-border bg-background hover:border-eskort-red/40'
                }`}
              >
                {slot.badge && (
                  <span className="absolute right-3 top-3 rounded-full bg-eskort-yellow px-2 py-0.5 text-[10px] font-black text-eskort-ink">
                    {slot.badge}
                  </span>
                )}
                <span
                  className={`block font-display text-sm uppercase leading-tight ${
                    active ? 'text-eskort-red' : ''
                  }`}
                >
                  {slot.label}
                </span>
                <span className="mt-0.5 block text-xs font-semibold text-muted-foreground">
                  {slot.note}
                </span>
                {active && (
                  <CheckCircle2 className="mt-2 h-4 w-4 text-eskort-red" aria-hidden="true" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="space-y-3">
        <button
          id="confirm-place-order"
          type="button"
          onClick={handleConfirm}
          disabled={!isValid}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-eskort-red px-6 py-4 font-display text-xl uppercase text-white shadow-lg shadow-eskort-red/25 transition-all active:scale-[0.98] hover:shadow-eskort-red/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          <CheckCircle2 className="h-5 w-5" /> Confirm &amp; Place Order
        </button>
        <p className="flex items-center justify-center gap-1.5 text-center text-xs font-semibold text-muted-foreground">
          🔒 Free delivery · No lock-in · Cancel anytime
        </p>
      </div>
    </div>
  )
}

/* ── Helpers ────────────────────────────────────────────────── */

const inputCls =
  'w-full rounded-2xl border-2 border-border bg-background px-4 py-3 text-sm font-semibold outline-none transition-colors placeholder:text-muted-foreground focus:border-eskort-red'

function Field({
  label,
  id,
  children,
}: {
  label: string
  id: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}

function SectionLabel({
  icon: Icon,
  label,
}: {
  icon: React.ElementType
  label: string
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-eskort-red/10">
        <Icon className="h-4 w-4 text-eskort-red" />
      </span>
      <span className="font-display text-base uppercase tracking-wide">{label}</span>
    </div>
  )
}
