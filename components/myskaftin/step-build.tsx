'use client'

import { useState, useEffect, useCallback } from 'react'
import { Sparkles, RefreshCw, Check, Star, Info, ChevronDown, LayoutGrid } from 'lucide-react'
import {
  PRICE_TIERS,
  JUNIOR_MENU_ITEMS,
  JUNIOR_CATEGORIES,
  JUNIOR_CATEGORY_META,
  THEMED_WEEKS,
  WEEKDAYS_5,
  WEEKDAYS_3,
  WEEKLY_MENUS,
  accentBg,
  type JuniorCategory,
  type JuniorMenuItem,
  type DailyLunchbox,
} from './data'
import type { Selection } from './experience'
import {
  generateWeek,
  remixDay,
  analyseVariety,
  computeEmptyScore,
  countFavouriteMatches,
  type RecommendationProfile,
} from '@/lib/recommendation-engine'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getProfile(value: Selection): RecommendationProfile {
  return {
    likes: value.likes,
    dislikes: value.dislikes,
    prep: value.prep,
    days: value.days,
    budget: value.budget,
    personality: value.personality,
    themeId: value.themeId,
  }
}

function getMeal(id: string): JuniorMenuItem | undefined {
  return JUNIOR_MENU_ITEMS.find((m) => m.id === id)
}

// ─── Variety Meter ────────────────────────────────────────────────────────────

function VarietyMeter({ week }: { week: DailyLunchbox[] }) {
  if (week.length === 0) return null
  const result = analyseVariety(week)
  const colours = {
    great: 'bg-brand-green/10 border-brand-green/30 text-brand-green',
    ok: 'bg-eskort-yellow/10 border-eskort-yellow/40 text-eskort-ink',
    repetitive: 'bg-muted border-border text-muted-foreground',
  }
  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border px-3 py-2 text-xs font-bold ${colours[result.score]}`}>
      <span aria-hidden="true">{result.emoji}</span>
      <span className="font-extrabold uppercase tracking-wide">{result.label}</span>
      <span className="font-semibold opacity-80">{result.description}</span>
    </div>
  )
}

// ─── Come-Home-Empty Score ────────────────────────────────────────────────────

function EmptyScore({ week, profile }: { week: DailyLunchbox[]; profile: RecommendationProfile }) {
  if (week.length === 0) return null
  const score = computeEmptyScore(week, profile)
  const colour = score >= 80 ? 'text-brand-green' : score >= 60 ? 'text-eskort-yellow' : 'text-muted-foreground'
  return (
    <div className="flex items-center gap-3 rounded-2xl border-2 border-border bg-background px-4 py-3">
      <div className="text-center">
        <span className={`block font-display text-3xl leading-none ${colour}`}>{score}%</span>
        <span className="block text-[9px] font-black uppercase tracking-wider text-muted-foreground">empty score</span>
      </div>
      <div>
        <span className="block text-sm font-extrabold uppercase">Come-Home-Empty Score</span>
        <span className="block text-xs font-semibold text-muted-foreground">
          Based on {possessiveName(profile)} favourites &amp; personality.
        </span>
      </div>
    </div>
  )
}

function possessiveName(profile: RecommendationProfile): string {
  return 'their'
}

// ─── Daily Lunchbox Card ──────────────────────────────────────────────────────

function DayCard({
  dayEntry,
  profile,
  week,
  onRemix,
}: {
  dayEntry: DailyLunchbox
  profile: RecommendationProfile
  week: DailyLunchbox[]
  onRemix: (day: string, newMealId: string) => void
}) {
  const meal = getMeal(dayEntry.mealId)
  const [remixing, setRemixing] = useState(false)

  function handleRemix() {
    setRemixing(true)
    setTimeout(() => {
      const newId = remixDay(dayEntry.mealId, profile, week)
      onRemix(dayEntry.day, newId)
      setRemixing(false)
    }, 400)
  }

  if (!meal) return null

  return (
    <div className="flex flex-col rounded-[24px] border-2 border-border bg-background p-4 transition-all hover:border-eskort-red/20 hover:shadow-sm">
      {/* Day label */}
      <span className="mb-2 block text-[11px] font-black uppercase tracking-widest text-muted-foreground">
        {dayEntry.day}
      </span>

      {/* Meal emoji + name */}
      <div className="relative mb-2 h-16 w-full">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={meal.id}
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center rounded-2xl text-3xl"
            style={{ background: meal.placeholderBg }}
            aria-label={meal.name}
          >
            <span aria-hidden="true">{meal.emoji === 'ABC' ? '🔡' : meal.emoji}</span>
          </motion.div>
        </AnimatePresence>
      </div>
      <span className="block text-sm font-extrabold leading-tight">{meal.name}</span>

      {/* Sides */}
      <div className="mt-1 flex items-center gap-1" aria-label="Sides">
        {dayEntry.sides.map((s, i) => (
          <span key={i} className="text-base" aria-hidden="true">{s}</span>
        ))}
      </div>

      {/* Reason chip */}
      {dayEntry.reasons[0] && (
        <span className="mt-2 block rounded-lg bg-eskort-blue/8 px-2 py-1 text-[10px] font-bold text-eskort-blue">
          {dayEntry.reasons[0]}
        </span>
      )}

      {/* Eskort product badge */}
      {meal.eskortProduct && (
        <span className="mt-1.5 block text-[10px] font-semibold text-muted-foreground">
          Made with {meal.eskortProduct}
        </span>
      )}

      {/* Remix */}
      <button
        type="button"
        id={`remix-${dayEntry.day}`}
        onClick={handleRemix}
        disabled={remixing}
        aria-label={`Remix ${dayEntry.day}'s lunch`}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-muted-foreground transition-all hover:border-eskort-red hover:text-eskort-red active:scale-95 disabled:opacity-50"
      >
        <RefreshCw className={`h-3 w-3 ${remixing ? 'animate-spin' : ''}`} aria-hidden="true" />
        {remixing ? 'Remixing…' : 'Remix'}
      </button>
    </div>
  )
}

// ─── Weekly Strip ─────────────────────────────────────────────────────────────

function WeeklyStrip({
  week,
  profile,
  onRemix,
}: {
  week: DailyLunchbox[]
  profile: RecommendationProfile
  onRemix: (day: string, newMealId: string) => void
}) {
  if (week.length === 0) return null
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${week.length}, minmax(0, 1fr))` }}
      role="list"
      aria-label="Weekly lunchbox plan"
    >
      {week.map((entry) => (
        <div key={entry.day} role="listitem">
          <DayCard dayEntry={entry} profile={profile} week={week} onRemix={onRemix} />
        </div>
      ))}
    </div>
  )
}

// ─── Budget Selector ──────────────────────────────────────────────────────────

const BUDGET_PRESETS = [
  { value: 32, label: 'R32', sublabel: 'Everyday' },
  { value: 45, label: 'R45', sublabel: 'Family' },
  { value: 62, label: 'R62', sublabel: 'Legend' },
]

function BudgetSelector({
  value,
  days,
  onChange,
}: {
  value: number
  days: 3 | 5
  onChange: (v: number) => void
}) {
  const weekly = value * days
  return (
    <div>
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="block text-[11px] font-black uppercase tracking-widest text-muted-foreground">
            Daily budget
          </span>
          <span className="font-display text-3xl leading-none text-ink">
            R{value}<span className="text-base font-semibold text-muted-foreground">/day</span>
          </span>
        </div>
        <span className="text-sm font-bold text-muted-foreground sm:text-right">R{weekly} total/week</span>
      </div>

      {/* Preset tiles */}
      <div className="grid grid-cols-3 gap-2">
        {BUDGET_PRESETS.map((p) => {
          const tier = PRICE_TIERS.find((t) => t.pricePerDay === p.value)
          const active = value === p.value
          return (
            <button
              key={p.value}
              id={`budget-${p.value}`}
              type="button"
              onClick={() => onChange(p.value)}
              aria-pressed={active}
              aria-label={`${p.sublabel} budget: ${p.label} per day`}
              className={`rounded-2xl border-2 px-3 py-3 text-left transition-all active:scale-[0.97] ${
                active
                  ? 'border-eskort-yellow bg-eskort-yellow text-ink shadow-sm'
                  : 'border-border bg-background hover:border-eskort-yellow/60'
              }`}
            >
              <span className="block font-display text-xl leading-none">{p.label}</span>
              <span className={`block text-xs font-bold ${active ? 'text-ink/70' : 'text-muted-foreground'}`}>
                {p.sublabel}
              </span>
              {tier && (
                <span className="mt-1 flex items-center gap-0.5 text-[10px] font-extrabold text-eskort-red">
                  <Star className="h-3 w-3 fill-eskort-red" aria-hidden="true" />
                  +{tier.points} pts
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── BYO Junior Item Placeholder ─────────────────────────────────────────────

function JuniorItemCard({ item, selected, onToggle }: { item: JuniorMenuItem; selected: boolean; onToggle: () => void }) {
  return (
    <button
      id={`junior-item-${item.id}`}
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      aria-label={`${item.name}${selected ? ' (selected)' : ''}`}
      className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eskort-red rounded-2xl transition hover:scale-[1.02] active:scale-[0.98]"
    >
      <div
        className={`relative aspect-square w-full rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all border-2 ${
          selected ? 'border-eskort-red' : 'border-transparent'
        }`}
        style={{ background: item.placeholderBg }}
      >
        <span className="text-3xl leading-none" aria-hidden="true">
          {item.emoji === 'ABC' ? '🔡' : item.emoji}
        </span>
        <span className="text-[10px] font-black text-ink text-center leading-tight px-2 max-w-full">
          {item.name}
        </span>
        <div className="flex items-center gap-1 text-[9px] font-bold text-ink/50">
          <span>{item.ageRange}</span>
          <span>·</span>
          <span>{item.prepTime}</span>
        </div>
        {selected && (
          <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-eskort-red text-white rounded-full flex items-center justify-center">
            <Check className="h-3 w-3" aria-hidden="true" />
          </span>
        )}
      </div>
    </button>
  )
}

// ─── Main StepBuild ───────────────────────────────────────────────────────────

export function StepBuild({
  value,
  onChange,
}: {
  value: Selection
  onChange: (patch: Partial<Selection>) => void
}) {
  const [generating, setGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<'recommended' | 'themed' | 'buildown'>('recommended')
  const [activeCategory, setActiveCategory] = useState<JuniorCategory>('Shaped Foods')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const profile = getProfile(value)
  const childName = value.kidName.trim()
  const nameLabel = childName || 'your child'
  const possessive = childName ? `${childName}'s` : "their"

  const days = value.days === 5 ? WEEKDAYS_5 : WEEKDAYS_3

  function handleSurpriseMe() {
    setGenerating(true)
    onChange({ isGenerating: true })
    setTimeout(() => {
      const week = generateWeek(profile)
      onChange({ generatedWeek: week, menuId: 'generated', isGenerating: false })
      setGenerating(false)
    }, 600)
  }

  function handleRemix(day: string, newMealId: string) {
    const updatedWeek = value.generatedWeek.map((d) =>
      d.day === day
        ? { ...d, mealId: newMealId, reasons: JUNIOR_MENU_ITEMS.find((m) => m.id === newMealId)?.satisfiesLikes.filter(l => value.likes.includes(l)).length
            ? [`Uses a favourite`]
            : ['Alternative pick'] }
        : d
    )
    onChange({ generatedWeek: updatedWeek })
  }

  function toggleJuniorItem(id: string) {
    const newItems = value.customItems.includes(id)
      ? value.customItems.filter((x) => x !== id)
      : [...value.customItems, id]
    onChange({ customItems: newItems, menuId: `custom-${id}` })
  }

  const categoryItems = JUNIOR_MENU_ITEMS.filter((i) => {
    if (i.category !== activeCategory) return false
    // Filter by restrictions
    for (const r of value.dislikes) {
      if (i.allergenIds.includes(r as never)) return false
    }
    return true
  })

  const favouriteMatches = countFavouriteMatches(value.generatedWeek, profile)
  const totalBudget = value.budget * value.days
  const weekTotal = (PRICE_TIERS.find((t) => t.pricePerDay === value.budget)?.pricePerDay ?? value.budget) * value.days

  return (
    <div className="space-y-8">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div>
        <h2 className="font-display text-2xl uppercase leading-tight sm:text-3xl">
          {childName ? `Let's build ${childName}'s week` : "Let's build their week"}
        </h2>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">
          We&apos;ll pick the meals — you can remix anything you want.
        </p>
      </div>

      {/* ── Budget ──────────────────────────────────────────────── */}
      <div>
        <h3 className="mb-4 font-display text-xl uppercase tracking-wide">Your daily budget</h3>
        <BudgetSelector
          value={value.budget}
          days={value.days}
          onChange={(b) => {
            // Map budget to nearest tier
            const nearest = PRICE_TIERS.reduce((prev, curr) =>
              Math.abs(curr.pricePerDay - b) < Math.abs(prev.pricePerDay - b) ? curr : prev
            )
            onChange({ budget: b, tierId: nearest.id })
          }}
        />
      </div>

      {/* ── Surprise Me / Build It For Me ───────────────────────── */}
      <div>
        <button
          id="surprise-me-btn"
          type="button"
          onClick={handleSurpriseMe}
          disabled={generating}
          aria-label={`Generate a complete ${value.days}-day lunchbox week`}
          className="relative flex w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-[24px] bg-eskort-ink px-4 py-5 text-center font-display text-lg uppercase text-white shadow-lg transition-all active:scale-[0.98] hover:shadow-xl disabled:opacity-70 sm:flex-row sm:gap-3 sm:px-6 sm:text-xl"
        >
          <span className="text-eskort-yellow" aria-hidden="true">
            {generating ? (
              <span className="inline-block animate-spin">✦</span>
            ) : (
              '✨'
            )}
          </span>
          {generating ? `Packing ${possessive} week…` : `Build it for me`}
          {!generating && (
            <span className="text-xs font-semibold normal-case text-white/60 sm:ml-1 sm:text-sm">
              — perfect {value.days}-day week
            </span>
          )}
        </button>

        {value.generatedWeek.length > 0 && (
          <div className="mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-eskort-red" aria-hidden="true" />
            {favouriteMatches > 0
              ? `Uses ${favouriteMatches} of ${nameLabel}'s favourites`
              : 'Safe choices within your restrictions'}
          </div>
        )}
      </div>

      {/* ── Generated week ──────────────────────────────────────── */}
      {value.generatedWeek.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl uppercase tracking-wide">
              {possessive.charAt(0).toUpperCase() + possessive.slice(1)} week
            </h3>
            <VarietyMeter week={value.generatedWeek} />
          </div>

          {/* On mobile: horizontal scroll; on sm+: grid */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:overflow-visible sm:mx-0 sm:px-0">
            <div className="flex gap-3 sm:hidden" style={{ minWidth: `${value.days * 140}px` }}>
              {value.generatedWeek.map((entry) => (
                <div key={entry.day} className="w-[130px] shrink-0">
                  <DayCard dayEntry={entry} profile={profile} week={value.generatedWeek} onRemix={handleRemix} />
                </div>
              ))}
            </div>
            <div className="hidden gap-3 sm:grid sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
              {value.generatedWeek.map((entry) => (
                <DayCard key={entry.day} dayEntry={entry} profile={profile} week={value.generatedWeek} onRemix={handleRemix} />
              ))}
            </div>
          </div>

          <EmptyScore week={value.generatedWeek} profile={profile} />
        </div>
      )}

      {/* ── Or choose a themed / curated week ──────────────────── */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground px-3">
            or choose
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Tab bar */}
        <div className="mb-5 grid w-full grid-cols-1 gap-1 rounded-2xl bg-muted/60 p-1 sm:grid-cols-3">
          {(
            [
              { id: 'recommended', label: '⭐ Curated Weeks' },
              { id: 'themed', label: '🎨 Themed Drops' },
              { id: 'buildown', label: '🧱 Build Your Own' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
              className={`rounded-xl px-3.5 py-2 text-xs font-extrabold transition ${
                activeTab === tab.id ? 'bg-white text-ink shadow-sm' : 'text-muted-foreground hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Curated Weekly Plans ──────────────────────────────── */}
        {activeTab === 'recommended' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {[...WEEKLY_MENUS]
              .sort((a, b) => Number(b.prep === value.prep) - Number(a.prep === value.prep))
              .map((m) => {
                const active = value.menuId === m.id
                const matched = m.prep === value.prep
                return (
                  <button
                    key={m.id}
                    id={`menu-weekly-${m.id}`}
                    type="button"
                    onClick={() => onChange({ menuId: m.id })}
                    aria-pressed={active}
                    aria-label={`${m.name}: ${m.blurb}`}
                    className={`group overflow-hidden rounded-[24px] border-2 text-left transition-all active:scale-[0.99] ${
                      active ? 'border-eskort-red shadow-lg' : 'border-border hover:border-eskort-red/40'
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                      <Image
                        src={m.image || '/placeholder.svg'}
                        alt={`${m.name} lunchbox`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white ${accentBg[m.accent]}`}>
                        {m.theme}
                      </span>
                      {matched && (
                        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-black text-ink">
                          ✓ Your prep
                        </span>
                      )}
                      {active && (
                        <span className="absolute inset-0 flex items-center justify-center bg-eskort-red/25">
                          <span className="flex items-center gap-1.5 rounded-full bg-eskort-red px-4 py-2 font-display text-sm uppercase text-white">
                            <Check className="h-4 w-4" aria-hidden="true" /> Selected
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="bg-background p-4">
                      <span className="font-display text-lg uppercase leading-tight">{m.name}</span>
                      <p className="mt-1 text-sm font-semibold text-muted-foreground">{m.blurb}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {m.highlights.map((h) => (
                          <span key={h} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-bold text-muted-foreground">{h}</span>
                        ))}
                      </div>
                    </div>
                  </button>
                )
              })}
          </div>
        )}

        {/* ── Themed week drops ─────────────────────────────────── */}
        {activeTab === 'themed' && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {THEMED_WEEKS.map((t) => {
              const active = value.themeId === t.id
              return (
                <button
                  key={t.id}
                  id={`theme-${t.id}`}
                  type="button"
                  onClick={() => onChange({ themeId: active ? null : t.id })}
                  aria-pressed={active}
                  aria-label={`${t.name}: ${t.description}`}
                  className={`relative flex flex-col items-center gap-2 rounded-[24px] border-2 p-4 text-center transition-all active:scale-[0.97] ${
                    active ? 'border-eskort-red ring-2 ring-eskort-red/20' : 'border-border hover:border-eskort-red/40'
                  }`}
                >
                  {active && (
                    <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-eskort-red text-white">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                  )}
                  <span className="text-3xl leading-none" aria-hidden="true">{t.emoji}</span>
                  <span className="font-display text-sm uppercase leading-tight">{t.name}</span>
                  <span className="text-[11px] font-semibold text-muted-foreground leading-snug">{t.description}</span>
                </button>
              )
            })}
          </div>
        )}

        {/* ── Build Your Own ────────────────────────────────────── */}
        {activeTab === 'buildown' && (
          <div className="space-y-5">
            <p className="text-sm font-semibold text-muted-foreground">
              Handpick items for {nameLabel}&apos;s box. Restricted items are hidden.
              {value.customItems.length > 0 && (
                <span className="ml-2 font-black text-eskort-red">
                  {value.customItems.length} item{value.customItems.length !== 1 ? 's' : ''} selected
                </span>
              )}
            </p>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {JUNIOR_CATEGORIES.map((cat) => {
                const meta = JUNIOR_CATEGORY_META[cat]
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    id={`junior-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isActive}
                    className={`flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-xs font-extrabold transition ${
                      isActive
                        ? 'border-ink bg-ink text-white'
                        : 'border-border text-muted-foreground hover:border-ink hover:text-ink'
                    }`}
                  >
                    <span aria-hidden="true">{meta.emoji}</span>
                    <span>{cat}</span>
                  </button>
                )
              })}
            </div>

            {/* Category info */}
            <div
              className="rounded-xl px-4 py-3 text-sm font-bold text-ink"
              style={{ background: JUNIOR_CATEGORY_META[activeCategory].colour }}
            >
              {JUNIOR_CATEGORY_META[activeCategory].emoji} {JUNIOR_CATEGORY_META[activeCategory].description}
            </div>

            {/* Items grid */}
            {categoryItems.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-border p-6 text-center text-sm font-semibold text-muted-foreground">
                All items in this category are excluded by your dietary restrictions.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {categoryItems.map((item) => {
                  const selected = value.customItems.includes(item.id)
                  return (
                    <div key={item.id} className="space-y-1">
                      <JuniorItemCard
                        item={item}
                        selected={selected}
                        onToggle={() => toggleJuniorItem(item.id)}
                      />
                      <button
                        id={`junior-info-${item.id}`}
                        type="button"
                        onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                        aria-expanded={expandedItem === item.id}
                        aria-label={`${expandedItem === item.id ? 'Hide' : 'Show'} details for ${item.name}`}
                        className="flex w-full items-center justify-between px-1 text-[10px] font-bold text-muted-foreground hover:text-ink transition"
                      >
                        <span>About</span>
                        <ChevronDown className={`h-3 w-3 transition-transform ${expandedItem === item.id ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>
                      {expandedItem === item.id && (
                        <div className="rounded-xl border border-border bg-muted/50 px-3 py-2 text-[10px] font-medium text-muted-foreground leading-relaxed">
                          {item.description}
                          {item.eskortProduct && (
                            <span className="mt-1 block font-bold text-eskort-red">Made with {item.eskortProduct}</span>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* Selected picks summary */}
            {value.customItems.length > 0 && (
              <div className="rounded-2xl border border-border bg-muted/40 p-4">
                <h4 className="mb-2 text-xs font-black uppercase tracking-wider">
                  Your Picks ({value.customItems.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {value.customItems.map((id) => {
                    const item = JUNIOR_MENU_ITEMS.find((i) => i.id === id)
                    if (!item) return null
                    return (
                      <span
                        key={id}
                        className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-ink"
                        style={{ background: item.placeholderBg }}
                      >
                        <span aria-hidden="true">{item.emoji === 'ABC' ? '🔡' : item.emoji}</span>
                        {item.name}
                        <button
                          id={`remove-pick-${id}`}
                          type="button"
                          onClick={() => toggleJuniorItem(id)}
                          aria-label={`Remove ${item.name}`}
                          className="ml-1 opacity-60 hover:opacity-100 text-xs font-black leading-none"
                        >
                          ×
                        </button>
                      </span>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
