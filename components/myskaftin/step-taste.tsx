'use client'

import { Check, Snowflake, Flame } from 'lucide-react'
import { DISLIKE_OPTIONS, LIKE_OPTIONS, type PrepStyle } from './data'
import type { Selection } from './experience'

export function StepTaste({
  value,
  onChange,
}: {
  value: Selection
  onChange: (patch: Partial<Selection>) => void
}) {
  const toggle = (key: 'likes' | 'dislikes', id: string) => {
    const list = value[key]
    onChange({
      [key]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
    } as Partial<Selection>)
  }

  return (
    <div className="space-y-8">
      {/* Kid + days */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
            Who&apos;s munching?
          </span>
          <input
            value={value.kidName}
            onChange={(e) => onChange({ kidName: e.target.value })}
            placeholder="Your kid's name"
            className="w-full rounded-2xl border-2 border-border bg-background px-4 py-3 text-base font-bold outline-none transition-colors placeholder:font-semibold placeholder:text-muted-foreground focus:border-eskort-red"
          />
        </label>

        <div>
          <span className="mb-2 block text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
            How many days?
          </span>
          <div className="grid grid-cols-2 gap-2">
            {([3, 5] as const).map((d) => {
              const active = value.days === d
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => onChange({ days: d })}
                  className={`rounded-2xl border-2 px-4 py-3 text-left transition-all active:scale-[0.98] ${
                    active
                      ? 'border-eskort-red bg-eskort-red text-white'
                      : 'border-border bg-background hover:border-eskort-red/50'
                  }`}
                >
                  <span className="block font-display text-2xl leading-none">{d}-DAY</span>
                  <span className={`text-xs font-bold ${active ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {d === 5 ? 'Full school week' : 'Half week'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Likes */}
      <div>
        <h3 className="mb-1 font-display text-xl uppercase tracking-wide">Yes please!</h3>
        <p className="mb-3 text-sm font-semibold text-muted-foreground">
          Tap everything {value.kidName || 'your kid'} loves.
        </p>
        <div className="flex flex-wrap gap-2">
          {LIKE_OPTIONS.map((o) => {
            const active = value.likes.includes(o.id)
            const Icon = o.icon
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => toggle('likes', o.id)}
                className={`flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-bold transition-all active:scale-95 ${
                  active
                    ? 'border-eskort-red bg-eskort-red text-white shadow-sm'
                    : 'border-border bg-background hover:border-eskort-red/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {o.label}
                {active && <Check className="h-4 w-4" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Dislikes */}
      <div>
        <h3 className="mb-1 font-display text-xl uppercase tracking-wide">No thanks / allergies</h3>
        <p className="mb-3 text-sm font-semibold text-muted-foreground">
          We&apos;ll keep these out of the box.
        </p>
        <div className="flex flex-wrap gap-2">
          {DISLIKE_OPTIONS.map((o) => {
            const active = value.dislikes.includes(o.id)
            const Icon = o.icon
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => toggle('dislikes', o.id)}
                className={`flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-bold transition-all active:scale-95 ${
                  active
                    ? 'border-eskort-ink bg-eskort-ink text-white'
                    : 'border-border bg-background hover:border-eskort-ink/40'
                }`}
              >
                <Icon className="h-4 w-4" />
                {o.label}
                {active && <Check className="h-4 w-4" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Prep style */}
      <div>
        <h3 className="mb-1 font-display text-xl uppercase tracking-wide">How should we prep it?</h3>
        <p className="mb-3 text-sm font-semibold text-muted-foreground">Pick the style that fits your mornings.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              {
                id: 'prepacked' as PrepStyle,
                icon: Snowflake,
                title: 'Grab & Go',
                desc: 'Chilled, pre-packed boxes. Zero prep — just grab and pack.',
              },
              {
                id: 'airfryer' as PrepStyle,
                icon: Flame,
                title: 'Air Fryer Preps',
                desc: 'Crispy hot bites ready in minutes with quick recipe cards.',
              },
            ]
          ).map((p) => {
            const active = value.prep === p.id
            const Icon = p.icon
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onChange({ prep: p.id })}
                className={`flex items-start gap-3 rounded-3xl border-2 p-4 text-left transition-all active:scale-[0.98] ${
                  active ? 'border-eskort-blue bg-eskort-blue text-white' : 'border-border bg-background hover:border-eskort-blue/50'
                }`}
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
                    active ? 'bg-white/15' : 'bg-muted'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-eskort-blue'}`} />
                </span>
                <span>
                  <span className="block font-display text-lg uppercase leading-tight">{p.title}</span>
                  <span className={`text-xs font-semibold ${active ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {p.desc}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
