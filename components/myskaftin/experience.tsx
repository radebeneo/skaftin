'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Star, Sparkles } from 'lucide-react'
import { PRICE_TIERS, JUNIOR_MENU_ITEMS, type PrepStyle, type GeneratedWeek, type ThemeId, type StickerThemeId } from './data'
import type { PersonalityId } from './data'
import { StepTaste } from './step-taste'
import { StepBuild, getProfile } from './step-build'
import { hasPlan, isCustomPlan } from './plan-summary'
import { generateWeek } from '@/lib/recommendation-engine'
import { StepReview } from './step-review'
import { Confirmation } from './confirmation'
import { LiveSkaftinPreview } from './live-skaftin-preview'
import type { OrderDetails } from './step-order'
import { useRewardsStore } from '@/lib/rewards-store'
import { SkaftinMotionProvider } from './motion-context'
import { MotionConfig } from 'framer-motion'

// ─── Shared wizard state ──────────────────────────────────────────────────────

export type Selection = {
  kidName: string
  days: 3 | 5
  likes: string[]
  dislikes: string[]
  prep: PrepStyle
  tierId: string
  menuId: string | null
  personality: PersonalityId | null
  budget: number
  generatedWeek: GeneratedWeek
  themeId: ThemeId | null
  stickerId: StickerThemeId | null
  customItems: string[]
  isGenerating: boolean
}

const STEPS = [
  { n: 1, title: 'Taste',  full: 'Taste & Prep' },
  { n: 2, title: 'Build',  full: 'Build My Week' },
  { n: 3, title: 'Order',  full: 'Review & Order' },
]

const BASE_POINTS = 320

/** The Taste & Prep answers a week is built from. A change means the week is stale. */
function tasteKey(value: Selection): string {
  return JSON.stringify([value.likes, value.dislikes, value.prep, value.days, value.personality])
}

export function MySkaftinExperience() {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const { stars } = useRewardsStore()

  const [value, setValue] = useState<Selection>({
    kidName: '',
    days: 5,
    likes: ['viennas', 'cheese'],
    dislikes: [],
    prep: 'prepacked',
    tierId: 'family',
    menuId: null,
    personality: null,
    budget: 45,
    generatedWeek: [],
    themeId: null,
    stickerId: null,
    customItems: [],
    isGenerating: false,
  })

  const onChange = (patch: Partial<Selection>) => setValue((v) => ({ ...v, ...patch }))

  // Taste answers the current week was built from, recorded when leaving the Build step.
  const [plannedFor, setPlannedFor] = useState<string | null>(null)

  function goToStep(target: number) {
    // Entering Build: have a ready-made week waiting instead of an empty screen.
    // Rebuild only on first entry or when the Taste answers changed, so remixes survive.
    if (step === 1 && target === 2 && (value.generatedWeek.length === 0 || plannedFor !== tasteKey(value))) {
      const customItems = value.customItems.filter((id) => {
        const item = JUNIOR_MENU_ITEMS.find((i) => i.id === id)
        return item ? item.allergenIds.every((allergen) => !value.dislikes.includes(allergen)) : false
      })
      onChange({
        generatedWeek: generateWeek(getProfile(value)),
        customItems,
        menuId: isCustomPlan(value) && customItems.length > 0 ? value.menuId : 'generated',
      })
    }
    if (target === 1 && step > 1) setPlannedFor(tasteKey(value))
    setStep(target)
  }

  const earned = useMemo(
    () => PRICE_TIERS.find((t) => t.id === value.tierId)?.points ?? 0,
    [value.tierId],
  )
  const totalPoints = BASE_POINTS + earned
  const tier = PRICE_TIERS.find((t) => t.id === value.tierId) ?? PRICE_TIERS[0]
  const total = tier.pricePerDay * value.days

  function handleOrderConfirmed(details: OrderDetails) {
    setOrderDetails(details)
    setDone(true)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function restart() {
    setStep(1)
    setDone(false)
    setOrderDetails(null)
    setPlannedFor(null)
    setValue({
      kidName: '',
      days: 5,
      likes: ['viennas', 'cheese'],
      dislikes: [],
      prep: 'prepacked',
      tierId: 'family',
      menuId: null,
      personality: null,
      budget: 45,
      generatedWeek: [],
      themeId: null,
      stickerId: null,
      customItems: [],
      isGenerating: false,
    })
  }

  /* ── Confirmation screen ─────────────────────────────────── */
  if (done && orderDetails) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Confirmation
          value={value}
          totalPoints={totalPoints}
          orderDetails={orderDetails}
          onRestart={restart}
        />
      </div>
    )
  }

  /* ── Wizard ──────────────────────────────────────────────── */
  return (
    <MotionConfig reducedMotion="user">
      <SkaftinMotionProvider>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12" id="builder">
      {/* ── Persistent rewards strip ─────────────────────────── */}
      <div className="mb-6 flex flex-col gap-2 rounded-2xl border border-eskort-yellow/30 bg-eskort-yellow/15 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-2.5">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-eskort-yellow text-eskort-yellow" aria-hidden="true" />
          <span className="text-sm font-extrabold text-ink">
            {stars} <span className="font-semibold text-muted-foreground">Skaftin Stars</span>
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-eskort-red" />
          +{earned} when you complete this order
        </span>
      </div>

      {/* ── Step progress indicator ──────────────────────────── */}
      <div className="mb-8">
        <div className="grid grid-cols-3 items-start gap-2 sm:flex sm:items-center sm:gap-0">
          {STEPS.map((s, i) => {
            const active = step === s.n
            const complete = step > s.n
            return (
              <div key={s.n} className="flex min-w-0 flex-1 items-center">
                <button
                  type="button"
                  disabled={s.n > step}
                  onClick={() => { if (s.n < step) goToStep(s.n) }}
                  aria-label={`Step ${s.n}: ${s.full}${complete ? ' (completed)' : active ? ' (current)' : ''}`}
                  className="flex min-w-0 flex-1 flex-col items-center gap-1.5 text-center disabled:cursor-default sm:flex-row sm:gap-2 sm:text-left"
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-sm font-bold transition-all duration-300 sm:h-10 sm:w-10 sm:text-base ${
                      active
                        ? 'bg-eskort-red text-white shadow-lg shadow-eskort-red/30'
                        : complete
                          ? 'bg-eskort-blue text-white'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {complete ? '✓' : s.n}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold uppercase leading-tight tracking-wide transition-colors sm:text-sm ${
                      active ? 'text-eskort-red' : complete ? 'text-eskort-blue' : 'text-muted-foreground'
                    }`}
                  >
                    <span className="hidden sm:inline">{s.full}</span>
                    <span className="sm:hidden">{s.title}</span>
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className={`mx-3 hidden h-0.5 flex-1 rounded-full transition-all duration-500 sm:block ${step > s.n ? 'bg-eskort-blue' : 'bg-muted'}`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Step content ─────────────────────────────────────── */}
      <div
        className={
          step <= 2
            ? `flex flex-col gap-6 pb-28 lg:grid lg:items-start lg:gap-8 lg:pb-0 xl:gap-10 ${
                // Step 1: form and Sneak Peek share the width equally. Step 2 keeps a wider build column.
                step === 1
                  ? 'lg:grid-cols-2'
                  : 'lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]'
              }`
            : 'mx-auto max-w-4xl pb-28 lg:pb-0'
        }
      >
        <div className="order-2 min-w-0 rounded-[32px] border-2 border-border bg-card p-4 sm:p-6 lg:order-1 xl:p-8">
          {step === 1 && <StepTaste value={value} onChange={onChange} />}
          {step === 2 && <StepBuild value={value} onChange={onChange} />}
          {step === 3 && (
            <StepReview
              value={value}
              onChange={onChange}
              total={total}
              onConfirm={handleOrderConfirmed}
              onBack={() => goToStep(2)}
            />
          )}
        </div>
        {step <= 2 && (
          <div className="order-1 min-w-0 lg:order-2 lg:sticky lg:top-24">
            <LiveSkaftinPreview value={value} step={step} />
          </div>
        )}
      </div>

      {/* ── Navigation ─────────────────────────────────────── */}
      {step < 3 && (
        <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-2 border-t-2 border-border bg-background p-3 sm:gap-3 sm:p-4 lg:static lg:mt-6 lg:border-t-0 lg:bg-transparent lg:p-0">
          {step > 1 && (
            <button
              type="button"
              onClick={() => goToStep(step - 1)}
              className="flex shrink-0 items-center gap-2 rounded-full border-2 border-border bg-background px-4 py-2.5 font-display text-sm uppercase transition-colors hover:border-ink sm:px-5 sm:text-base lg:bg-background"
              aria-label="Go back to previous step"
            >
              ← Back
            </button>
          )}
          <button
            type="button"
            onClick={() => goToStep(step + 1)}
            disabled={step === 2 && (value.isGenerating || !hasPlan(value))}
            className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-eskort-red px-4 py-3 font-display text-sm uppercase text-white shadow-md shadow-eskort-red/25 transition-all active:scale-[0.98] hover:shadow-eskort-red/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:px-6 sm:text-base lg:ml-auto lg:flex-none lg:px-8"
            aria-label={step === 1 ? 'Continue to Build My Week' : 'Continue to Review & Order'}
          >
            {step === 1 ? 'Pack My Week' : 'Review & Order'}
            <Image
              src="/images1/icons/btn-arrow-light.svg"
              alt=""
              width={9}
              height={14}
              aria-hidden="true"
            />
            <span className="hidden">
            <span aria-hidden="true">→</span>
            </span>
          </button>
        </div>
      )}
    </div>
      </SkaftinMotionProvider>
    </MotionConfig>
  )
}
