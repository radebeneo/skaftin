"use client"

import { Gift, Flame, Star, Trophy, Check } from "lucide-react"

export const REWARD_TIERS = [
  { stars: 10, label: "Free fruit add-on", icon: Gift },
  { stars: 25, label: "Free Kiddos Tonkies pack", icon: Gift },
  { stars: 50, label: "R100 off your week", icon: Gift },
  { stars: 100, label: "Lunchbox Legend status", icon: Trophy },
]

export function LoyaltyPanel({
  stars,
  streak,
}: {
  stars: number
  streak: number
}) {
  const maxTier = REWARD_TIERS[REWARD_TIERS.length - 1].stars
  const nextTier = REWARD_TIERS.find((t) => t.stars > stars)
  const progressPct = Math.min(100, Math.round((stars / maxTier) * 100))

  return (
    <section
      id="loyalty"
      aria-labelledby="loyalty-heading"
      className="mx-auto max-w-6xl px-4 py-12"
    >
      <div className="overflow-hidden rounded-3xl bg-ink text-white">
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold uppercase tracking-widest text-ink">
              <Star className="h-3.5 w-3.5 fill-ink" aria-hidden="true" /> Skaftin Stars
            </span>
            <h2
              id="loyalty-heading"
              className="mt-4 font-display text-4xl leading-none sm:text-5xl"
            >
              Keep the streak, stack the rewards
            </h2>
            <p className="mt-3 max-w-md text-sm font-medium text-white/70 leading-relaxed">
              Every week you order a Skaftin you earn 5 stars and grow your
              streak. Miss a week and the streak resets — so the whole family
              stays in the habit of stress-free lunches.
            </p>

            <div className="mt-6 flex gap-4">
              <div className="rounded-2xl bg-white/10 px-5 py-4">
                <div className="flex items-center gap-2 font-display text-4xl text-brand-yellow">
                  <Star className="h-7 w-7 fill-brand-yellow" aria-hidden="true" />
                  {stars}
                </div>
                <div className="mt-1 text-xs font-semibold text-white/60">
                  Stars earned
                </div>
              </div>
              <div className="rounded-2xl bg-white/10 px-5 py-4">
                <div className="flex items-center gap-2 font-display text-4xl text-brand-red">
                  <Flame className="h-7 w-7" aria-hidden="true" />
                  {streak}
                </div>
                <div className="mt-1 text-xs font-semibold text-white/60">
                  Week streak
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold text-white/70">
                <span>Progress</span>
                {nextTier ? (
                  <span>
                    {nextTier.stars - stars} stars to {nextTier.label}
                  </span>
                ) : (
                  <span>Max tier unlocked — you legend!</span>
                )}
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-brand-yellow transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          <ul className="grid content-start gap-3">
            {REWARD_TIERS.map((tier) => {
              const unlocked = stars >= tier.stars
              const Icon = unlocked ? Check : tier.icon
              return (
                <li
                  key={tier.stars}
                  className={`flex items-center gap-4 rounded-2xl border p-4 transition-colors ${
                    unlocked
                      ? "border-brand-yellow/40 bg-brand-yellow/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${
                      unlocked ? "bg-brand-yellow text-ink" : "bg-white/10 text-white/70"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <div className="font-bold">{tier.label}</div>
                    <div className="text-xs font-semibold text-white/60">
                      {tier.stars} stars
                    </div>
                  </div>
                  {unlocked && (
                    <span className="rounded-full bg-brand-green px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                      Unlocked
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
