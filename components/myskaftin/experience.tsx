'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { PRICE_TIERS, type PrepStyle } from './data'
import { StepTaste } from './step-taste'
import { StepMenu } from './step-menu'
import { StepCheckout } from './step-checkout'
import { StepOrder, type OrderDetails } from './step-order'
import { Confirmation } from './confirmation'

export type Selection = {
  kidName: string
  days: 3 | 5
  likes: string[]
  dislikes: string[]
  prep: PrepStyle
  tierId: string
  menuId: string | null
}

const STEPS = [
  { n: 1, title: 'Taste',    full: 'Taste & Prep' },
  { n: 2, title: 'Pack',     full: 'Budget & Menu' },
  { n: 3, title: 'Cart',     full: 'Cart & Rewards' },
  { n: 4, title: 'Confirm',  full: 'Your Details' },
]

const BASE_POINTS = 320

export function MySkaftinExperience() {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)

  const [value, setValue] = useState<Selection>({
    kidName: '',
    days: 5,
    likes: ['viennas', 'cheese'],
    dislikes: [],
    prep: 'prepacked',
    tierId: 'family',
    menuId: null,
  })

  const onChange = (patch: Partial<Selection>) => setValue((v) => ({ ...v, ...patch }))

  const earned = useMemo(
    () => PRICE_TIERS.find((t) => t.id === value.tierId)?.points ?? 0,
    [value.tierId],
  )
  const totalPoints = BASE_POINTS + earned
  const tier = PRICE_TIERS.find((t) => t.id === value.tierId) ?? PRICE_TIERS[0]
  const total = tier.pricePerDay * value.days

  // step 2 requires a menu to be chosen
  const canContinue = step === 2 ? value.menuId !== null : true

  function handleOrderConfirmed(details: OrderDetails) {
    setOrderDetails(details)
    setDone(true)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function restart() {
    setStep(1)
    setDone(false)
    setOrderDetails(null)
    setValue({
      kidName: '',
      days: 5,
      likes: ['viennas', 'cheese'],
      dislikes: [],
      prep: 'prepacked',
      tierId: 'family',
      menuId: null,
    })
  }

  /* ── Confirmation screen ──────────────────────────────────── */
  if (done && orderDetails) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Confirmation
          value={value}
          totalPoints={totalPoints}
          orderDetails={orderDetails}
          onRestart={restart}
        />
      </div>
    )
  }

  /* ── Wizard ───────────────────────────────────────────────── */
  return (
    <div className="mx-auto max-w-3xl px-4 py-8" id="builder">
      {/* Stepper */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => {
            const active = step === s.n
            const complete = step > s.n
            return (
              <div key={s.n} className="flex flex-1 items-center">
                <div className="flex items-center gap-2">
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-base transition-colors ${
                      active
                        ? 'bg-eskort-red text-white'
                        : complete
                          ? 'bg-eskort-blue text-white'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {s.n}
                  </span>
                  <span
                    className={`text-sm font-extrabold uppercase tracking-wide ${
                      active ? 'text-eskort-red' : complete ? 'text-eskort-blue' : 'text-muted-foreground'
                    }`}
                  >
                    <span className="hidden sm:inline">{s.full}</span>
                    <span className="sm:hidden">{s.title}</span>
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`mx-2 h-1 flex-1 rounded-full ${step > s.n ? 'bg-eskort-blue' : 'bg-muted'}`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="rounded-3xl border-2 border-border bg-card p-4 sm:p-6">
        {step === 1 && <StepTaste value={value} onChange={onChange} />}
        {step === 2 && <StepMenu value={value} onChange={onChange} />}
        {step === 3 && <StepCheckout value={value} />}
        {step === 4 && (
          <StepOrder
            defaultName={value.kidName}
            total={total}
            onConfirm={handleOrderConfirmed}
          />
        )}
      </div>

      {/* Nav — hidden on step 4 (StepOrder manages its own CTA) */}
      {step < 4 && (
        <div className="mt-5 flex items-center gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 rounded-full border-2 border-border bg-background px-5 py-3.5 font-display text-base uppercase transition-colors hover:border-eskort-ink"
            >
              <ArrowLeft className="h-5 w-5" /> Back
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep((s) => s + 1)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-eskort-red px-6 py-3.5 font-display text-lg uppercase text-white transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === 2 && !canContinue ? 'Pick a menu to continue' : 'Continue'}
              {canContinue && <ArrowRight className="h-5 w-5" />}
            </button>
          ) : (
            /* step === 3 — advance to step 4 (order details) */
            <button
              id="place-order-btn"
              type="button"
              onClick={() => setStep(4)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-eskort-red px-6 py-3.5 font-display text-lg uppercase text-white shadow-lg shadow-eskort-red/25 transition-all active:scale-[0.98] hover:shadow-eskort-red/40"
            >
              <Star className="h-5 w-5 fill-white" /> Place order · get free gift
            </button>
          )}
        </div>
      )}
    </div>
  )
}
