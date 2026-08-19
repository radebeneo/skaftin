'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { PRICE_TIERS, type PrepStyle } from './data'
import { StepTaste } from './step-taste'
import { StepMenu } from './step-menu'
import { StepCheckout } from './step-checkout'
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
  { n: 1, title: 'Taste', full: "Taste & Prep" },
  { n: 2, title: 'Pack', full: 'Budget & Menu' },
  { n: 3, title: 'Checkout', full: 'Cart & Rewards' },
]

const BASE_POINTS = 320

export function MySkaftinExperience() {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
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

  const canContinue = step === 1 ? true : step === 2 ? value.menuId !== null : true

  if (done) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Confirmation
          value={value}
          totalPoints={totalPoints}
          onRestart={() => {
            setDone(false)
            setStep(1)
          }}
        />
      </div>
    )
  }

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
                  <div className={`mx-2 h-1 flex-1 rounded-full ${step > s.n ? 'bg-eskort-blue' : 'bg-muted'}`} />
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
      </div>

      {/* Nav */}
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
          <button
            type="button"
            onClick={() => {
              setDone(true)
              if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-eskort-red px-6 py-3.5 font-display text-lg uppercase text-white transition-transform active:scale-[0.98]"
          >
            <Star className="h-5 w-5 fill-white" /> Place order · get free gift
          </button>
        )}
      </div>
    </div>
  )
}
