'use client'

import { Star } from 'lucide-react'
import { useRewardsStore, getTier, getNextTierThreshold, TIER_EMOJI, TIER_COLOUR } from '@/lib/rewards-store'

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

export function RewardsPanel() {
  const { stars, tier, nextTier, history } = useRewardsStore()
  const tierColour = TIER_COLOUR[tier]
  const tierEmoji = TIER_EMOJI[tier]

  // Progress bar calculation
  const tiers = [
    { name: 'Bronze', min: 0, max: 200 },
    { name: 'Silver', min: 200, max: 500 },
    { name: 'Gold', min: 500, max: 500 },
  ]
  const currentRange = tiers.find(t => tier === t.name) ?? tiers[0]
  const progress = nextTier
    ? Math.min(100, ((stars - currentRange.min) / (nextTier.threshold - currentRange.min)) * 100)
    : 100

  return (
    <div className="bg-ink rounded-[32px] p-8 sm:p-10 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: tierColour }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-3">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>Skaftin Stars</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              MY REWARDS
            </h2>
          </div>

          {/* Tier badge */}
          <div
            className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl shrink-0"
            style={{ background: `${tierColour}25`, border: `2px solid ${tierColour}60` }}
          >
            <span className="text-2xl" aria-hidden="true">{tierEmoji}</span>
            <span className="text-[10px] font-black uppercase tracking-wider mt-0.5" style={{ color: tierColour }}>
              {tier}
            </span>
          </div>
        </div>

        {/* Star balance */}
        <div className="flex items-end gap-3 mb-6">
          <span className="font-display font-black text-5xl sm:text-6xl text-white leading-none" aria-label={`${stars} Skaftin Stars`}>
            {stars.toLocaleString()}
          </span>
          <div className="pb-2">
            <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
          </div>
        </div>

        {/* Progress to next tier */}
        {nextTier ? (
          <div className="mb-6">
            <div className="flex justify-between text-xs font-bold text-white/70 mb-2">
              <span>{tier}</span>
              <span>{nextTier.next} at {nextTier.threshold} ⭐</span>
            </div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, background: tierColour }}
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${Math.round(progress)}% progress to ${nextTier.next} tier`}
              />
            </div>
            <p className="text-xs text-white/50 mt-1.5">
              {nextTier.threshold - stars} stars to {nextTier.next} {TIER_EMOJI[nextTier.next]}
            </p>
          </div>
        ) : (
          <div className="mb-6 p-3 rounded-xl bg-white/10 border border-amber-400/30">
            <p className="text-sm font-bold text-amber-400">🏆 You&apos;ve reached Gold — the highest tier!</p>
          </div>
        )}

        {/* Earn history */}
        {history.length > 0 && (
          <div className="space-y-2 mb-6">
            <h3 className="text-xs font-black uppercase tracking-wider text-white/50 mb-3">Recent Earnings</h3>
            {history.slice(0, 5).map(event => (
              <div key={event.id} className="flex items-center justify-between py-2 border-b border-white/10">
                <p className="text-sm font-medium text-white/80">{event.label}</p>
                <span className="font-black text-amber-400 text-sm">+{event.stars} ⭐</span>
              </div>
            ))}
          </div>
        )}

        {/* How to earn */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <h3 className="text-xs font-black uppercase tracking-wider text-white/50 mb-3">How to Earn Stars</h3>
          <div className="space-y-2">
            {[
              { label: 'Complete a Skaftin plan', stars: '80–220 ⭐', desc: 'Depends on your chosen tier' },
              { label: 'First sign-up bonus', stars: '50 ⭐', desc: 'One time only' },
              { label: 'Weekly plan streak', stars: '+20 ⭐ bonus', desc: 'Same plan 3 weeks in a row' },
            ].map(item => (
              <div key={item.label} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-white">{item.label}</p>
                  <p className="text-[10px] text-white/40">{item.desc}</p>
                </div>
                <span className="text-xs font-black text-amber-400 shrink-0">{item.stars}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
