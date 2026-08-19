"use client"

import { Check, RefreshCw, Snowflake, Flame, Sparkles } from "lucide-react"
import type { SkaftinPlan, FormatChoice } from "@/lib/skaftin-data"

const DAY_STYLES = [
  { cardBg: "bg-brand-yellow-soft", titleText: "text-ink", tagBg: "bg-ink/10", tagText: "text-ink/80", prodText: "text-ink", sideText: "text-ink/70" },
  { cardBg: "bg-brand-blue/15", titleText: "text-card-foreground", tagBg: "bg-background/80", tagText: "text-card-foreground/80", prodText: "text-card-foreground", sideText: "text-muted-foreground" },
  { cardBg: "bg-brand-red/10", titleText: "text-card-foreground", tagBg: "bg-background/80", tagText: "text-card-foreground/80", prodText: "text-card-foreground", sideText: "text-muted-foreground" },
  { cardBg: "bg-brand-green/10", titleText: "text-card-foreground", tagBg: "bg-background/80", tagText: "text-card-foreground/80", prodText: "text-card-foreground", sideText: "text-muted-foreground" },
  { cardBg: "bg-brand-yellow/20", titleText: "text-card-foreground", tagBg: "bg-background/80", tagText: "text-card-foreground/80", prodText: "text-card-foreground", sideText: "text-muted-foreground" },
]

export function SkaftinPlanView({
  plan,
  kidName,
  format,
  confirmed,
  onConfirm,
  onRestart,
}: {
  plan: SkaftinPlan
  kidName: string
  format: FormatChoice
  confirmed: boolean
  onConfirm: () => void
  onRestart: () => void
}) {
  const name = kidName.trim() || "your kid"

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-red px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-yellow">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Fresh plan
          </span>
          <h3 className="mt-3 font-display text-4xl leading-none text-card-foreground sm:text-5xl">
            {name}&apos;s week is sorted
          </h3>
          <p className="mt-2 text-sm font-medium text-muted-foreground">
            Five different lunches — no repeats, so it never gets boring.
          </p>
        </div>

        <div className="rounded-2xl bg-panel px-5 py-3 text-right">
          <div className="font-display text-3xl text-ink">R{plan.weeklyCost}</div>
          <div className="text-xs font-semibold text-muted-foreground">
            per week · about R{plan.perDay}/day
          </div>
          <div
            className={`mt-1 text-xs font-bold ${plan.withinBudget ? "text-brand-green" : "text-brand-red"}`}
          >
            {plan.withinBudget ? "Within your budget" : "Just over — tweak to fit"}
          </div>
        </div>
      </div>

      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {plan.meals.map((meal, i) => {
          const hot = meal.product.formats.includes("airfryer") && format !== "lunchbox"
          const style = DAY_STYLES[i % DAY_STYLES.length]
          return (
            <li
              key={meal.day}
              className={`flex flex-col rounded-2xl border border-border p-4 ${style.cardBg}`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-display text-xl ${style.titleText}`}>{meal.day}</span>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${style.tagBg} ${style.tagText}`}>
                  {hot ? (
                    <>
                      <Flame className="h-3 w-3" aria-hidden="true" /> Hot
                    </>
                  ) : (
                    <>
                      <Snowflake className="h-3 w-3" aria-hidden="true" /> Cold
                    </>
                  )}
                </span>
              </div>
              <div className="mt-3 overflow-hidden rounded-xl bg-background">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={meal.product.image || "/placeholder.svg"}
                  alt={meal.product.name}
                  className="h-24 w-full object-cover"
                  width={220}
                  height={140}
                />
              </div>
              <p className={`mt-3 text-sm font-bold leading-tight ${style.prodText}`}>
                {meal.product.name}
              </p>
              <p className={`mt-1 text-xs leading-snug ${style.sideText}`}>
                + {meal.side} · {meal.treat}
              </p>
            </li>
          )
        })}
      </ol>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onConfirm}
          disabled={confirmed}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {confirmed ? (
            <>
              <Check className="h-5 w-5" aria-hidden="true" /> Order placed — see you next week!
            </>
          ) : (
            <>
              <Check className="h-5 w-5" aria-hidden="true" /> Confirm week &amp; earn 5 stars
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-border px-6 py-3.5 text-base font-bold text-card-foreground transition-colors hover:bg-panel hover:text-ink"
        >
          <RefreshCw className="h-5 w-5" aria-hidden="true" /> Start over
        </button>
      </div>
    </div>
  )
}
