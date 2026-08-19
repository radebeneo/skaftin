"use client"

import { useMemo, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Smile,
  Sparkles,
  ThumbsDown,
  Utensils,
  Wallet,
} from "lucide-react"
import {
  BUDGET,
  budgetTier,
  buildPlan,
  DISLIKE_OPTIONS,
  FORMAT_OPTIONS,
  LIKE_OPTIONS,
  type FormatChoice,
  type ProductKind,
  type SkaftinPlan,
} from "@/lib/skaftin-data"
import { SkaftinPlanView } from "@/components/skaftin-plan"

const STEPS = [
  { id: "basics", label: "Basics", icon: Smile },
  { id: "taste", label: "Taste", icon: Heart },
  { id: "format", label: "Prep", icon: Utensils },
] as const

const PLAN_STEP = STEPS.length // index of the plan reveal

const AGE_BANDS = [
  { id: "little", label: "Little", note: "3–6 yrs" },
  { id: "junior", label: "Junior", note: "7–10 yrs" },
  { id: "big", label: "Big kid", note: "11–13 yrs" },
]

export function SkaftinWizard({
  onConfirmWeek,
}: {
  onConfirmWeek: () => void
}) {
  const [step, setStep] = useState(0)
  const [kidName, setKidName] = useState("")
  const [ageBand, setAgeBand] = useState<string | null>(null)
  const [budget, setBudget] = useState(BUDGET.default)
  const [likes, setLikes] = useState<ProductKind[]>([])
  const [dislikes, setDislikes] = useState<string[]>([])
  const [format, setFormat] = useState<FormatChoice | null>(null)
  const [plan, setPlan] = useState<SkaftinPlan | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  const tier = useMemo(() => budgetTier(budget), [budget])

  function toggle<T>(list: T[], value: T): T[] {
    return list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value]
  }

  const canContinue =
    (step === 0 && ageBand !== null) ||
    step === 1 ||
    (step === 2 && format !== null)

  function next() {
    if (step === PLAN_STEP - 1) {
      setPlan(buildPlan({ budget, likes, dislikes, format: format! }))
      setStep(PLAN_STEP)
      return
    }
    setStep((s) => Math.min(s + 1, PLAN_STEP - 1))
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0))
  }

  function restart() {
    setStep(0)
    setKidName("")
    setAgeBand(null)
    setBudget(BUDGET.default)
    setLikes([])
    setDislikes([])
    setFormat(null)
    setPlan(null)
    setConfirmed(false)
  }

  function confirmWeek() {
    if (confirmed) return
    setConfirmed(true)
    onConfirmWeek()
  }

  return (
    <section id="builder" aria-labelledby="builder-heading" className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-panel px-3 py-1 text-xs font-bold uppercase tracking-widest text-ink/70">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> The lunchbox builder
        </span>
        <h2 id="builder-heading" className="mt-3 font-display text-3xl leading-none text-foreground sm:text-5xl text-balance">
          Build the week in 3 easy steps
        </h2>
      </div>

      {/* Progress */}
      <ol className="mx-auto mb-8 flex max-w-3xl items-center gap-2">
        {STEPS.map((s, i) => {
          const active = i === step
          const done = i < step
          const Icon = done ? Check : s.icon
          return (
            <li key={s.id} className="flex flex-1 items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full border-2 transition-colors ${
                    active
                      ? "border-brand-red bg-brand-red text-brand-yellow"
                      : done
                        ? "border-brand-green bg-brand-green text-white"
                        : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className={`hidden text-xs font-bold sm:block ${active ? "text-foreground font-extrabold" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span className={`h-1 flex-1 rounded-full ${done ? "bg-brand-green" : "bg-ink/10"}`} />
              )}
            </li>
          )
        })}
      </ol>

      <div className="rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-8">
        {/* STEP 0 — Basics (kid + budget) */}
        {step === 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <StepHeading
              kicker="First up"
              title="Who & how much?"
              sub="Tell us who we're packing for and what you'd like to spend on 5 days of lunches."
            />
            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              {/* Kid */}
              <div>
                <div className="max-w-md">
                  <label htmlFor="kidName" className="text-sm font-bold text-card-foreground">
                    Kid&apos;s name <span className="font-medium text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    id="kidName"
                    value={kidName}
                    onChange={(e) => setKidName(e.target.value)}
                    placeholder="e.g. Lesedi"
                    className="mt-2 w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none transition-colors focus:border-brand-red placeholder:text-muted-foreground"
                  />
                </div>
                <p className="mt-6 text-sm font-bold text-card-foreground">How old are they?</p>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {AGE_BANDS.map((band) => {
                    const active = ageBand === band.id
                    return (
                      <button
                        key={band.id}
                        type="button"
                        onClick={() => setAgeBand(band.id)}
                    className={`rounded-2xl border-2 p-3 text-center transition-all sm:p-4 ${
                      active
                        ? "border-brand-red bg-brand-red/5 -translate-y-0.5"
                        : "border-border hover:border-foreground/25"
                    }`}
                  >
                    <div className="font-display text-lg text-card-foreground sm:text-xl">{band.label}</div>
                    <div className="text-[11px] font-semibold text-muted-foreground sm:text-xs">{band.note}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Budget */}
              <div className="rounded-2xl bg-panel/60 p-5">
                <p className="text-sm font-bold text-card-foreground">Weekly budget</p>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <div>
                    <div className="font-display text-4xl text-card-foreground sm:text-5xl">R{budget}</div>
                    <div className="text-xs font-semibold text-muted-foreground sm:text-sm">
                      ≈ R{Math.round(budget / 5)} per school day
                    </div>
                  </div>
                  <div className="rounded-full bg-brand-yellow-soft px-3 py-2 text-right sm:px-4">
                    <div className="font-display text-base text-ink sm:text-lg">{tier.label}</div>
                    <div className="text-[11px] font-semibold text-ink/70 sm:text-xs">{tier.note}</div>
                  </div>
                </div>
                <input
                  type="range"
                  min={BUDGET.min}
                  max={BUDGET.max}
                  step={BUDGET.step}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="mt-6 w-full accent-brand-red"
                  aria-label="Weekly budget in Rand"
                />
                <div className="mt-1 flex justify-between text-xs font-semibold text-muted-foreground">
                  <span>R{BUDGET.min}</span>
                  <span>R{BUDGET.max}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1 — Taste */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <StepHeading
              kicker="The fun part"
              title="What do they love?"
              sub="Tap everything they'd be happy to see. Pick as many as you like."
            />
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {LIKE_OPTIONS.map((opt) => {
                const active = likes.includes(opt.id)
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setLikes((l) => toggle(l, opt.id))}
                    aria-pressed={active}
                    className={`group relative overflow-hidden rounded-2xl border-2 p-3 text-left transition-all ${
                      active ? "border-brand-red bg-brand-red/5 -translate-y-0.5" : "border-border hover:border-foreground/25"
                    }`}
                  >
                    <div className="overflow-hidden rounded-xl bg-panel">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={opt.image || "/placeholder.svg"}
                        alt=""
                        className="h-20 w-full object-cover"
                        width={160}
                        height={120}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-1">
                      <span className="text-sm font-bold leading-tight text-card-foreground">{opt.label}</span>
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors ${
                          active ? "bg-brand-red text-brand-yellow" : "bg-panel text-transparent"
                        }`}
                      >
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            <p className="mt-8 flex items-center gap-2 text-sm font-bold text-card-foreground">
              <ThumbsDown className="h-4 w-4 text-brand-red" aria-hidden="true" /> Any no-ways?
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {DISLIKE_OPTIONS.map((opt) => {
                const active = dislikes.includes(opt.id)
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDislikes((d) => toggle(d, opt.id))}
                    aria-pressed={active}
                    className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? "border-brand-red bg-brand-red text-white"
                        : "border-border text-card-foreground hover:border-foreground/30"
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 2 — Format */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <StepHeading
              kicker="Almost there"
              title="How do you want to prep?"
              sub="Pick the style that fits your mornings best."
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {FORMAT_OPTIONS.map((opt) => {
                const active = format === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFormat(opt.id)}
                    aria-pressed={active}
                    className={`flex flex-col rounded-2xl border-2 p-5 text-left transition-all ${
                      active ? "border-brand-red bg-brand-red/5 -translate-y-0.5" : "border-border hover:border-foreground/25"
                    }`}
                  >
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full ${
                        active ? "bg-brand-red text-brand-yellow" : "bg-panel text-ink"
                      }`}
                    >
                      <Utensils className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="mt-3 font-display text-xl text-card-foreground">{opt.title}</span>
                    <span className="mt-1 text-sm font-medium text-muted-foreground leading-snug">
                      {opt.description}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 3 — Plan */}
        {step === PLAN_STEP && plan && (
          <SkaftinPlanView
            plan={plan}
            kidName={kidName}
            format={format!}
            confirmed={confirmed}
            onConfirm={confirmWeek}
            onRestart={restart}
          />
        )}

        {/* Nav */}
        {step < PLAN_STEP && (
          <div className="sticky bottom-0 z-10 -mx-4 -mb-4 mt-6 flex items-center justify-between gap-3 rounded-b-3xl border-t border-border bg-card/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:mb-0 sm:mt-8 sm:rounded-none sm:bg-transparent sm:py-0 sm:pt-6 sm:backdrop-blur-none">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-card-foreground transition-colors hover:bg-panel hover:text-ink disabled:invisible"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </button>
            <span className="text-xs font-semibold text-muted-foreground">
              Step {step + 1} of {STEPS.length}
            </span>
            <button
              type="button"
              onClick={next}
              disabled={!canContinue}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              {step === PLAN_STEP - 1 ? (
                <>
                  Build my Skaftin <Sparkles className="h-4 w-4" aria-hidden="true" />
                </>
              ) : (
                <>
                  Next <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function StepHeading({
  kicker,
  title,
  sub,
}: {
  kicker: string
  title: string
  sub: string
}) {
  return (
    <div>
      <span className="text-xs font-bold uppercase tracking-widest text-brand-red">{kicker}</span>
      <h3 className="mt-1 font-display text-3xl leading-none text-card-foreground sm:text-4xl">{title}</h3>
      <p className="mt-2 text-sm font-medium text-muted-foreground">{sub}</p>
    </div>
  )
}
