'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

export type DropdownOption = { id: string; label: string; emoji: string; hint?: string }

const TONES = {
  red: {
    open: 'border-eskort-red',
    hover: 'hover:border-eskort-red/50',
    check: 'border-eskort-red bg-eskort-red text-white',
    count: 'bg-eskort-red text-white',
  },
  ink: {
    open: 'border-eskort-ink',
    hover: 'hover:border-eskort-ink/40',
    check: 'border-eskort-ink bg-eskort-ink text-white',
    count: 'bg-eskort-ink text-white',
  },
} as const

/**
 * Dropdown used on Taste & Prep (muncher personality, likes and allergies).
 * Multi mode (default): the list stays open while picking several items.
 * Single mode: picking an item closes the list; picking the selected item again clears it.
 * The list closes on outside click or Escape.
 * Each option gets the id `${optionIdPrefix}-${option.id}` so animations can start from it.
 */
export function MultiSelectDropdown({
  label,
  placeholder,
  options,
  selected,
  onToggle,
  optionIdPrefix,
  tone = 'red',
  single = false,
}: {
  label: string
  placeholder: string
  options: readonly DropdownOption[]
  selected: string[]
  onToggle: (id: string) => void
  optionIdPrefix: string
  tone?: keyof typeof TONES
  single?: boolean
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listId = useId()
  const colors = TONES[tone]

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const selectedOptions = options.filter((o) => selected.includes(o.id))
  const count = selectedOptions.length
  const summary = count === 0 ? placeholder : selectedOptions.map((o) => o.label).join(', ')
  const singleEmoji = single && count === 1 ? selectedOptions[0].emoji : null

  function handlePick(id: string) {
    onToggle(id)
    if (single) {
      setOpen(false)
      triggerRef.current?.focus()
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${label}: ${count === 0 ? 'none selected' : summary}`}
        className={`flex w-full items-center gap-3 rounded-2xl border-2 bg-background px-4 py-3 text-left text-sm font-bold transition-colors ${
          open ? colors.open : `border-border ${colors.hover}`
        }`}
      >
        {singleEmoji && (
          <span aria-hidden="true" className="text-base">{singleEmoji}</span>
        )}
        <span className={`min-w-0 flex-1 truncate ${count === 0 ? 'font-medium text-muted-foreground' : 'text-ink'}`}>
          {summary}
        </span>
        {!single && count > 0 && (
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-black ${colors.count}`}>{count}</span>
        )}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={listId}
          role="listbox"
          aria-multiselectable={!single}
          aria-label={label}
          className="absolute inset-x-0 top-full z-30 mt-2 max-h-72 overflow-y-auto rounded-2xl border-2 border-border bg-card p-1.5 shadow-lg"
        >
          {options.map((o) => {
            const active = selected.includes(o.id)
            return (
              <button
                key={o.id}
                id={`${optionIdPrefix}-${o.id}`}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => handlePick(o.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none ${
                  single && active ? 'bg-muted' : ''
                }`}
              >
                <span aria-hidden="true" className="text-base">{o.emoji}</span>
                <span className="min-w-0 flex-1">
                  <span className="block">{o.label}</span>
                  {o.hint && (
                    <span className="block text-[11px] font-semibold text-muted-foreground">{o.hint}</span>
                  )}
                </span>
                <span
                  aria-hidden="true"
                  className={`grid h-5 w-5 shrink-0 place-items-center border-2 ${single ? 'rounded-full' : 'rounded-md'} ${
                    active ? colors.check : 'border-border'
                  }`}
                >
                  {active && <Check className="h-3 w-3" />}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
