'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Check, Sparkles, Star, Flame, Snowflake, LayoutGrid, ChevronDown } from 'lucide-react'
import {
  PRICE_TIERS, WEEKLY_MENUS, accentBg,
  JUNIOR_MENU_ITEMS, JUNIOR_CATEGORIES, JUNIOR_CATEGORY_META,
  type JuniorCategory, type JuniorMenuItem
} from './data'
import type { Selection } from './experience'

// ─── Placeholder image for junior items ────────────────────────────────────────
function JuniorItemPlaceholder({ item, selected }: { item: JuniorMenuItem; selected: boolean }) {
  return (
    <div
      className={`relative aspect-square w-full rounded-2xl flex flex-col items-center justify-center gap-2 transition-all border-2 ${
        selected ? 'border-eskort-red' : 'border-transparent'
      }`}
      style={{ background: item.placeholderBg }}
    >
      {/* ABC emoji fix — render as text */}
      <span className="text-3xl leading-none" aria-hidden="true">
        {item.emoji === 'ABC' ? '🔡' : item.emoji}
      </span>
      <span className="text-[10px] font-black text-ink text-center leading-tight px-2 max-w-full truncate">
        {item.name}
      </span>
      <div className="flex items-center gap-1 text-[9px] font-bold text-ink/50">
        <span>{item.ageRange}</span>
        <span>·</span>
        <span>{item.prepTime}</span>
      </div>
      {selected && (
        <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-eskort-red text-white rounded-full flex items-center justify-center">
          <Check className="h-3 w-3" />
        </span>
      )}
    </div>
  )
}

// ─── StepMenu ─────────────────────────────────────────────────────────────────
export function StepMenu({
  value,
  onChange,
}: {
  value: Selection
  onChange: (patch: Partial<Selection>) => void
}) {
  const [activeTab, setActiveTab] = useState<'weekly' | 'buildown'>('weekly')
  const [activeCategory, setActiveCategory] = useState<JuniorCategory>('Shaped Foods')
  const [selectedJuniorItems, setSelectedJuniorItems] = useState<string[]>([])
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const menus = [...WEEKLY_MENUS].sort(
    (a, b) => Number(b.prep === value.prep) - Number(a.prep === value.prep),
  )

  const categoryItems = JUNIOR_MENU_ITEMS.filter(i => i.category === activeCategory)

  function toggleJuniorItem(id: string) {
    setSelectedJuniorItems(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
    // Sync selection to parent as a custom menu choice
    onChange({ menuId: `custom-${id}` })
  }

  return (
    <div className="space-y-8">
      {/* Price range */}
      <div>
        <h3 className="mb-1 font-display text-xl uppercase tracking-wide">Pick your budget</h3>
        <p className="mb-3 text-sm font-semibold text-muted-foreground">Per day, per kid — you&apos;re in control.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {PRICE_TIERS.map((t) => {
            const active = value.tierId === t.id
            return (
              <button
                key={t.id}
                id={`tier-btn-${t.id}`}
                type="button"
                onClick={() => onChange({ tierId: t.id })}
                className={`relative rounded-3xl border-2 p-4 text-left transition-all active:scale-[0.98] ${
                  active
                    ? 'border-eskort-yellow bg-eskort-yellow text-eskort-ink shadow-md'
                    : 'border-border bg-background hover:border-eskort-yellow'
                }`}
              >
                {active && (
                  <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-eskort-ink text-white">
                    <Check className="h-4 w-4" />
                  </span>
                )}
                <span className="block font-display text-base uppercase leading-tight">{t.name}</span>
                <span className="mt-1 block text-xs font-semibold opacity-70">{t.tagline}</span>
                <span className="mt-3 block font-display text-3xl leading-none">R{t.pricePerDay}</span>
                <span className="text-xs font-bold opacity-70">per day</span>
                <span className="mt-2 flex items-center gap-1 text-xs font-extrabold text-eskort-red">
                  <Star className="h-3.5 w-3.5 fill-eskort-red" /> +{t.points} Skaftin Stars
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab switcher: Weekly Plans | Build Your Own */}
      <div>
        <div className="flex items-center gap-1 bg-neutral-100 rounded-2xl p-1 mb-6 w-fit">
          <button
            id="menu-tab-weekly"
            onClick={() => setActiveTab('weekly')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-extrabold transition ${
              activeTab === 'weekly' ? 'bg-white text-ink shadow-sm' : 'text-muted-foreground hover:text-ink'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Weekly Plans
          </button>
          <button
            id="menu-tab-buildown"
            onClick={() => setActiveTab('buildown')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-extrabold transition ${
              activeTab === 'buildown' ? 'bg-white text-ink shadow-sm' : 'text-muted-foreground hover:text-ink'
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            Build Your Own
            <span className="bg-eskort-red text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">NEW</span>
          </button>
        </div>

        {/* ── Weekly Plans tab ── */}
        {activeTab === 'weekly' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-eskort-red" />
              <h3 className="font-display text-xl uppercase tracking-wide">This month&apos;s curated menus</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {menus.map((m) => {
                const active = value.menuId === m.id
                const matched = m.prep === value.prep
                const PrepIcon = m.prep === 'airfryer' ? Flame : Snowflake
                return (
                  <button
                    key={m.id}
                    id={`menu-weekly-${m.id}`}
                    type="button"
                    onClick={() => onChange({ menuId: m.id })}
                    className={`group overflow-hidden rounded-3xl border-2 text-left transition-all active:scale-[0.99] ${
                      active ? 'border-eskort-red shadow-lg' : 'border-border hover:border-eskort-red/50'
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
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
                        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-black text-eskort-ink">
                          <PrepIcon className="h-3.5 w-3.5" /> Your prep
                        </span>
                      )}
                      {active && (
                        <span className="absolute inset-0 flex items-center justify-center bg-eskort-red/25">
                          <span className="flex items-center gap-1.5 rounded-full bg-eskort-red px-4 py-2 font-display text-sm uppercase text-white">
                            <Check className="h-4 w-4" /> Selected
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
          </div>
        )}

        {/* ── Build Your Own tab ── */}
        {activeTab === 'buildown' && (
          <div className="space-y-5">
            <div>
              <h3 className="font-display text-xl uppercase tracking-wide mb-1">Build Your Own Lunchbox</h3>
              <p className="text-sm font-semibold text-muted-foreground">
                Pick items from each category to personalise your child&apos;s lunchbox.
                {selectedJuniorItems.length > 0 && (
                  <span className="ml-2 font-black text-eskort-red">
                    {selectedJuniorItems.length} item{selectedJuniorItems.length !== 1 ? 's' : ''} selected
                  </span>
                )}
              </p>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {JUNIOR_CATEGORIES.map(cat => {
                const meta = JUNIOR_CATEGORY_META[cat]
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    id={`junior-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold border-2 transition ${
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

            {/* Category description */}
            <div
              className="px-4 py-3 rounded-xl text-sm font-bold text-ink"
              style={{ background: JUNIOR_CATEGORY_META[activeCategory].colour }}
            >
              {JUNIOR_CATEGORY_META[activeCategory].emoji} {JUNIOR_CATEGORY_META[activeCategory].description}
            </div>

            {/* Items grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {categoryItems.map(item => {
                const selected = selectedJuniorItems.includes(item.id)
                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      id={`junior-item-${item.id}`}
                      type="button"
                      onClick={() => toggleJuniorItem(item.id)}
                      className="w-full text-left focus:outline-none focus:ring-2 focus:ring-eskort-red rounded-2xl transition hover:scale-[1.02] active:scale-[0.98]"
                      aria-pressed={selected}
                      aria-label={`${item.name}${selected ? ' (selected)' : ''}`}
                    >
                      <JuniorItemPlaceholder item={item} selected={selected} />
                    </button>
                    {/* Expand for description */}
                    <button
                      id={`junior-item-info-${item.id}`}
                      onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                      className="w-full flex items-center justify-between px-1 text-[10px] font-bold text-muted-foreground hover:text-ink transition"
                    >
                      <span>About</span>
                      <ChevronDown className={`h-3 w-3 transition-transform ${expandedItem === item.id ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedItem === item.id && (
                      <div className="px-2 py-2 bg-neutral-50 rounded-xl border border-border text-[10px] font-medium text-muted-foreground leading-relaxed">
                        {item.description}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Selected items summary */}
            {selectedJuniorItems.length > 0 && (
              <div className="mt-4 p-4 bg-neutral-50 rounded-2xl border border-border">
                <h4 className="text-xs font-black uppercase tracking-wider text-ink mb-2">
                  Your Picks ({selectedJuniorItems.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJuniorItems.map(id => {
                    const item = JUNIOR_MENU_ITEMS.find(i => i.id === id)
                    if (!item) return null
                    return (
                      <span
                        key={id}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ background: item.placeholderBg, color: '#17140f' }}
                      >
                        <span aria-hidden="true">{item.emoji === 'ABC' ? '🔡' : item.emoji}</span>
                        {item.name}
                        <button
                          id={`remove-pick-${id}`}
                          onClick={() => setSelectedJuniorItems(prev => prev.filter(x => x !== id))}
                          aria-label={`Remove ${item.name}`}
                          className="ml-1 opacity-60 hover:opacity-100 text-xs font-black"
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
