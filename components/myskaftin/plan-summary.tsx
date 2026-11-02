'use client'

import { JUNIOR_MENU_ITEMS, type JuniorMenuItem } from './data'
import type { Selection } from './experience'

// ─── Plan helpers ─────────────────────────────────────────────────────────────

/** True when the parent handpicked items in Build Your Own (same box every day). */
export function isCustomPlan(value: Selection): boolean {
  return value.customItems.length > 0 && (value.menuId?.startsWith('custom-') ?? false)
}

/** True when there is something to order: custom picks or a generated week. */
export function hasPlan(value: Selection): boolean {
  return isCustomPlan(value) || value.generatedWeek.length > 0
}

function getCustomPicks(value: Selection): JuniorMenuItem[] {
  return value.customItems
    .map((id) => JUNIOR_MENU_ITEMS.find((item) => item.id === id))
    .filter((item): item is JuniorMenuItem => item !== undefined)
}

function mealEmoji(meal: JuniorMenuItem): string {
  return meal.emoji === 'ABC' ? '🔡' : meal.emoji
}

/** Plain-text lines describing the plan, used for sharing. */
export function planLines(value: Selection): string[] {
  if (isCustomPlan(value)) {
    return getCustomPicks(value).map((item) => `Every day: ${mealEmoji(item)} ${item.name}`)
  }
  return value.generatedWeek.map((entry) => {
    const meal = JUNIOR_MENU_ITEMS.find((m) => m.id === entry.mealId)
    return `${entry.day}: ${meal ? `${mealEmoji(meal)} ${meal.name}` : entry.mealId}`
  })
}

// ─── PlanSummary ──────────────────────────────────────────────────────────────

/** Read-only summary of the planned week, shared by Review and Confirmation. */
export function PlanSummary({ value }: { value: Selection }) {
  if (isCustomPlan(value)) {
    return (
      <div className="rounded-[20px] border-2 border-border bg-background p-4">
        <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          Packed every day · {value.days} days
        </span>
        <div className="flex flex-wrap gap-2">
          {getCustomPicks(value).map((item) => (
            <span
              key={item.id}
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-ink"
              style={{ background: item.placeholderBg }}
            >
              <span aria-hidden="true">{mealEmoji(item)}</span>
              {item.name}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div
        className="flex gap-2 pb-2 sm:grid"
        style={{
          minWidth: `${value.days * 120}px`,
          gridTemplateColumns: `repeat(${value.days}, minmax(0, 1fr))`,
        }}
      >
        {value.generatedWeek.map((entry) => {
          const meal = JUNIOR_MENU_ITEMS.find((m) => m.id === entry.mealId)
          if (!meal) return null
          return (
            <div key={entry.day} className="flex min-w-[110px] flex-col items-center rounded-[20px] border-2 border-border bg-background p-3 text-center sm:min-w-0">
              <span className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                {entry.day}
              </span>
              <div
                className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                style={{ background: meal.placeholderBg }}
                aria-label={meal.name}
              >
                <span aria-hidden="true">{mealEmoji(meal)}</span>
              </div>
              <span className="block text-[11px] font-bold leading-tight">{meal.name}</span>
              <div className="mt-1 flex items-center justify-center gap-0.5">
                {entry.sides.map((side, i) => (
                  <span key={i} className="text-sm" aria-hidden="true">{side}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
