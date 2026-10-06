'use client'

import { useState } from 'react'
import { Check, Snowflake, Flame, Zap } from 'lucide-react'
import {
  DISLIKE_OPTIONS,
  LIKE_OPTIONS,
  MUNCHER_PERSONALITIES,
  type PrepStyle,
  type PersonalityId,
} from './data'
import type { Selection } from './experience'
import { useSkaftinMotion } from './motion-context'
import { FOOD_METADATA } from '@/lib/skaftin-data'

// ─── Muncher Personality Selector ────────────────────────────────────────────

function MuncherPersonalityCard({
  personality,
  selected,
  onSelect,
}: {
  personality: typeof MUNCHER_PERSONALITIES[0]
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      id={`personality-${personality.id}`}
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${personality.name}: ${personality.tagline}`}
      className={`relative flex flex-col items-center gap-2 rounded-[24px] border-2 p-4 text-center transition-all duration-200 active:scale-[0.97] hover:shadow-md ${
        selected
          ? 'border-eskort-red bg-eskort-red/5 shadow-sm shadow-eskort-red/20'
          : 'border-border bg-background hover:border-eskort-red/40'
      }`}
    >
      {selected && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-eskort-red text-white">
          <Check className="h-3 w-3" aria-hidden="true" />
        </span>
      )}
      <span className="text-3xl leading-none" aria-hidden="true">{personality.emoji}</span>
      <span className={`font-display text-sm uppercase leading-tight ${selected ? 'text-eskort-red' : 'text-ink'}`}>
        {personality.name}
      </span>
      <span className="text-[11px] font-semibold leading-snug text-muted-foreground">
        {personality.tagline}
      </span>
    </button>
  )
}

// ─── StepTaste ────────────────────────────────────────────────────────────────

export function StepTaste({
  value,
  onChange,
}: {
  value: Selection
  onChange: (patch: Partial<Selection>) => void
}) {
  const [activeDislike, setActiveDislike] = useState<string | null>(null)
  const { flyItem, announce } = useSkaftinMotion()

  const toggle = async (key: 'likes' | 'dislikes', id: string) => {
    const list = value[key]
    const isAdding = !list.includes(id)
    const next = isAdding ? [...list, id] : list.filter((x) => x !== id)
    
    let patch: Partial<Selection> = { [key]: next }

    if (key === 'likes') {
      const meta = FOOD_METADATA[id]
      if (isAdding && meta) {
        const btn = document.getElementById(`like-${id}`)
        if (btn) flyItem(id, btn, `compartment-${meta.compartment}`)
      } else if (!isAdding && meta) {
        announce(`${meta.label} removed from Skaftin`)
      }
    }
    
    if (key === 'dislikes' && isAdding) {
      setActiveDislike(id)
      setTimeout(() => setActiveDislike(null), 2500)

      // Cascade restrictions
      // 1. Remove conflicting likes
      const CONFLICTS: Record<string, string[]> = {
        'no-dairy': ['cheese', 'yoghurt'],
        'no-gluten': ['crackers', 'sausage', 'nuggets'],
      }
      const conflictingLikes = CONFLICTS[id] || []
      const nextLikes = value.likes.filter((likeId) => {
        if (conflictingLikes.includes(likeId)) {
          const meta = FOOD_METADATA[likeId]
          announce(`${meta?.label || likeId} removed — conflicts with ${DISLIKE_OPTIONS.find(d => d.id === id)?.label}`)
          return false
        }
        return true
      })
      patch.likes = nextLikes

      // 2. Remove conflicting custom items
      const { JUNIOR_MENU_ITEMS } = await import('./data')
      const nextCustomItems = value.customItems.filter((itemId) => {
        const item = JUNIOR_MENU_ITEMS.find((m) => m.id === itemId)
        return !(item && item.allergenIds.includes(id as never))
      })
      patch.customItems = nextCustomItems

      // 3. Update generated week if any meal conflicts
      if (value.generatedWeek.length > 0) {
        const { remixDay } = await import('@/lib/recommendation-engine')
        const tempProfile = {
          likes: nextLikes,
          dislikes: next,
          prep: value.prep,
          days: value.days,
          budget: value.budget,
          personality: value.personality,
          themeId: value.themeId,
        }
        const nextWeek = value.generatedWeek.map((day) => {
          const meal = JUNIOR_MENU_ITEMS.find((m) => m.id === day.mealId)
          if (meal && meal.allergenIds.includes(id as never)) {
            const newMealId = remixDay(day.mealId, tempProfile, value.generatedWeek)
            return { ...day, mealId: newMealId, reasons: ['Substituted for allergy'] }
          }
          return day
        })
        patch.generatedWeek = nextWeek
      }
    }

    onChange(patch)
  }

  const childName = value.kidName.trim()
  const nameLabel = childName || 'your child'
  const possessive = childName ? `${childName}'s` : "your child's"

  // Positive allergy confirmation copy
  const activeDislikeLabel = DISLIKE_OPTIONS.find((d) => d.id === activeDislike)?.label

  return (
    <div className="space-y-10">
      {/* ── Who's munching ──────────────────────────────────── */}
      <div>
        <h2 className="mb-1 font-display text-2xl uppercase leading-tight sm:text-3xl">
          Tell us about the muncher
        </h2>
        <p className="text-sm font-semibold text-muted-foreground">
          The more you share, the better their week gets.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground">
              Who are we packing for?
            </span>
            <input
              id="kid-name-input"
              value={value.kidName}
              onChange={(e) => onChange({ kidName: e.target.value })}
              placeholder="Their name"
              autoComplete="off"
              className="w-full rounded-2xl border-2 border-border bg-background px-4 py-3.5 text-base font-bold outline-none transition-colors placeholder:font-medium placeholder:text-muted-foreground focus:border-eskort-red"
              aria-label="Child's name"
            />
          </label>

          <div>
            <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground">
              How many days?
            </span>
            <div className="grid grid-cols-2 gap-2">
              {([3, 5] as const).map((d) => {
                const active = value.days === d
                return (
                  <button
                    key={d}
                    id={`days-${d}`}
                    type="button"
                    onClick={() => onChange({ days: d })}
                    aria-pressed={active}
                    aria-label={`${d} days — ${d === 5 ? 'Full school week' : 'Half-week helper'}`}
                    className={`rounded-2xl border-2 px-4 py-4 text-left transition-all active:scale-[0.97] ${
                      active
                        ? 'border-eskort-red bg-eskort-red text-white'
                        : 'border-border bg-background hover:border-eskort-red/50'
                    }`}
                  >
                    <span className="block font-display text-2xl leading-none">{d}-DAY</span>
                    <span className={`block text-xs font-bold ${active ? 'text-white/80' : 'text-muted-foreground'}`}>
                      {d === 5 ? 'Full school week' : 'Half-week helper'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Muncher personality ─────────────────────────────── */}
      <div>
        <h3 className="mb-1 font-display text-xl uppercase tracking-wide">
          {childName ? `What kind of muncher is ${childName}?` : 'What kind of muncher are we packing for?'}
        </h3>
        <p className="mb-4 text-sm font-semibold text-muted-foreground">
          Pick the one that fits best — we'll use it to build a better week.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {MUNCHER_PERSONALITIES.map((p) => (
            <MuncherPersonalityCard
              key={p.id}
              personality={p}
              selected={value.personality === p.id}
              onSelect={() =>
                onChange({ personality: value.personality === p.id ? null : (p.id as PersonalityId) })
              }
            />
          ))}
        </div>
        {value.personality && (
          <div className="mt-3 rounded-xl bg-eskort-blue/8 px-4 py-2.5 text-sm font-semibold text-eskort-blue">
            {MUNCHER_PERSONALITIES.find((p) => p.id === value.personality)?.description}
          </div>
        )}
      </div>

      {/* ── Food preferences ──────────────────────────────────── */}
      <div>
        <h3 className="mb-1 font-display text-xl uppercase tracking-wide">
          {childName ? `What does ${childName} love?` : 'Yes please!'}
        </h3>
        <p className="mb-4 text-sm font-semibold text-muted-foreground">
          Tap everything {nameLabel} loves — we'll make sure it's in the box.
        </p>
        <div className="flex flex-wrap gap-2">
          {LIKE_OPTIONS.map((o) => {
            const CONFLICTS: Record<string, string[]> = {
              'no-dairy': ['cheese'],
              'no-gluten': ['crackers', 'sausage', 'nuggets'],
            }
            const isRestricted = value.dislikes.some(d => (CONFLICTS[d] || []).includes(o.id))
            if (isRestricted) return null

            const active = value.likes.includes(o.id)
            return (
              <button
                key={o.id}
                id={`like-${o.id}`}
                type="button"
                onClick={() => toggle('likes', o.id)}
                aria-pressed={active}
                aria-label={`${o.label}${active ? ' (selected)' : ''}`}
                className={`flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-bold transition-all active:scale-95 ${
                  active
                    ? 'border-eskort-red bg-eskort-red text-white shadow-sm'
                    : 'border-border bg-background hover:border-eskort-red/50'
                }`}
              >
                <span aria-hidden="true" className="text-base">{o.emoji}</span>
                {o.label}
                {active && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
              </button>
            )
          })}
        </div>
        {value.likes.length > 0 && (
          <p className="mt-2 text-xs font-semibold text-eskort-red">
            {value.likes.length} favourite{value.likes.length !== 1 ? 's' : ''} selected ✓
          </p>
        )}
      </div>

      {/* ── Allergies & restrictions ──────────────────────────── */}
      <div>
        <h3 className="mb-1 font-display text-xl uppercase tracking-wide">No thanks / allergies</h3>
        <p className="mb-4 text-sm font-semibold text-muted-foreground">
          We'll keep these completely out of {possessive} box.
        </p>

        {/* Allergy confirmation toast */}
        {activeDislikeLabel && (
          <div
            role="status"
            aria-live="polite"
            className="mb-3 flex items-center gap-2 rounded-xl bg-eskort-blue/10 px-4 py-2.5 text-sm font-bold text-eskort-blue"
          >
            <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
            Perfect — we&apos;ll keep {possessive} week {activeDislikeLabel.toLowerCase().replace('no ', '')}-free.
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {DISLIKE_OPTIONS.map((o) => {
            const active = value.dislikes.includes(o.id)
            return (
              <button
                key={o.id}
                id={`dislike-${o.id}`}
                type="button"
                onClick={() => toggle('dislikes', o.id)}
                aria-pressed={active}
                aria-label={`${o.label}${active ? ' (active restriction)' : ''}`}
                className={`flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-bold transition-all active:scale-95 ${
                  active
                    ? 'border-eskort-ink bg-eskort-ink text-white'
                    : 'border-border bg-background hover:border-eskort-ink/40'
                }`}
              >
                <span aria-hidden="true" className="text-base">{o.emoji}</span>
                {o.label}
                {active && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
              </button>
            )
          })}
        </div>

        {value.dislikes.length > 0 && (
          <p className="mt-2 text-xs font-semibold text-muted-foreground">
            {value.dislikes.length} restriction{value.dislikes.length !== 1 ? 's' : ''} set — incompatible meals will be hidden.
          </p>
        )}
      </div>

      {/* ── Preparation style ─────────────────────────────────── */}
      <div>
        <h3 className="mb-1 font-display text-xl uppercase tracking-wide">How should we prep it?</h3>
        <p className="mb-4 text-sm font-semibold text-muted-foreground">
          Pick the style that fits your mornings.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              {
                id: 'prepacked' as PrepStyle,
                icon: Snowflake,
                emoji: '❄️',
                title: 'Grab & Go',
                desc: 'Cold, pre-packed boxes. Zero prep — just grab and pack.',
                badge: 'Most popular',
              },
              {
                id: 'airfryer' as PrepStyle,
                icon: Flame,
                emoji: '🔥',
                title: 'Air Fryer Preps',
                desc: 'Crispy hot bites ready in minutes with quick recipe cards.',
                badge: null,
              },
            ]
          ).map((p) => {
            const active = value.prep === p.id
            const Icon = p.icon
            return (
              <button
                key={p.id}
                id={`prep-${p.id}`}
                type="button"
                onClick={() => onChange({ prep: p.id })}
                aria-pressed={active}
                aria-label={`${p.title}: ${p.desc}`}
                className={`relative flex items-start gap-3 rounded-[24px] border-2 p-5 text-left transition-all active:scale-[0.98] ${
                  active ? 'border-eskort-blue bg-eskort-blue text-white' : 'border-border bg-background hover:border-eskort-blue/50'
                }`}
              >
                {p.badge && (
                  <span className="absolute right-3 top-3 rounded-full bg-eskort-yellow px-2 py-0.5 text-[10px] font-black text-ink">
                    {p.badge}
                  </span>
                )}
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl ${
                    active ? 'bg-white/15' : 'bg-muted'
                  }`}
                  aria-hidden="true"
                >
                  {p.emoji}
                </span>
                <span>
                  <span className="block font-display text-lg uppercase leading-tight">{p.title}</span>
                  <span className={`mt-1 block text-xs font-semibold leading-snug ${active ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {p.desc}
                  </span>
                </span>
                {active && (
                  <span className="absolute bottom-3 right-3">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
