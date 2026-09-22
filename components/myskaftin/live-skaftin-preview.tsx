'use client'

import React, { useState, useEffect } from 'react'
import { Snowflake, Flame, Info, Lock, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Selection } from './experience'
import { buildWeekFromSelection, FOOD_METADATA, type LunchboxDay } from '@/lib/skaftin-data'
import { JUNIOR_MENU_ITEMS } from './data'

function FoodItem({ id }: { id: string }) {
  const meta = FOOD_METADATA[id]
  const juniorItem = JUNIOR_MENU_ITEMS.find(i => i.id === id)

  if (meta) {
    if (meta.image) {
      return (
        <div className={`relative flex aspect-square flex-col items-center justify-center rounded-2xl ${meta.placeholderBg} p-2 text-center transition-all group`}>
          <img 
            src={meta.image} 
            alt={meta.label} 
            className="h-4/5 w-4/5 object-contain drop-shadow-md transition-transform group-hover:-translate-y-1 group-hover:scale-105" 
            loading="lazy"
          />
        </div>
      )
    }
    return (
      <div className={`flex aspect-square flex-col items-center justify-center rounded-2xl ${meta.placeholderBg} p-2 text-center transition-all`}>
        <span className="mb-1 text-3xl leading-none" aria-hidden="true">{meta.emoji}</span>
        <span className="text-[10px] font-bold uppercase leading-tight text-ink">{meta.label}</span>
      </div>
    )
  }

  if (juniorItem) {
    return (
      <div className="flex aspect-square flex-col items-center justify-center rounded-2xl p-2 text-center transition-all" style={{ background: juniorItem.placeholderBg }}>
        <span className="mb-1 text-3xl leading-none" aria-hidden="true">{juniorItem.emoji === 'ABC' ? '🔡' : juniorItem.emoji}</span>
        <span className="text-[10px] font-bold uppercase leading-tight text-ink max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-1">{juniorItem.name}</span>
      </div>
    )
  }

  if (id.startsWith('emoji-')) {
    const emoji = id.replace('emoji-', '')
    return (
      <div className="flex aspect-square flex-col items-center justify-center rounded-2xl bg-muted/50 p-2 text-center transition-all">
        <span className="mb-1 text-3xl leading-none" aria-hidden="true">{emoji}</span>
      </div>
    )
  }

  return null
}

function SkaftinCompartment({
  label,
  items,
}: {
  label: string
  items: string[]
}) {
  if (items.length === 0) return null

  return (
    <div className="mb-4 last:mb-0" id={`compartment-${label.toLowerCase()}`}>
      <h4 className="mb-2 text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground">{label}</h4>
      <motion.div layout className="grid grid-cols-3 gap-2">
        <AnimatePresence mode="popLayout">
          {items.map((id, index) => (
            <motion.div
              key={`${id}-${index}`}
              layout
              initial={{ scale: 0.5, opacity: 0, y: -20, filter: 'brightness(1.5)' }}
              animate={{ scale: 1, opacity: 1, y: 0, filter: 'brightness(1)' }}
              exit={{ scale: 0.8, opacity: 0, y: -10 }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
            >
              <FoodItem id={id} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function EmptySkaftinState() {
  return (
    <div className="flex h-full min-h-[200px] flex-col items-center justify-center p-8 text-center text-muted-foreground">
      <span className="mb-3 text-5xl opacity-50 grayscale" aria-hidden="true">🍱</span>
      <p className="font-display text-lg uppercase tracking-wide text-ink/50">Your Skaftin is empty</p>
      <p className="mt-1 text-sm font-semibold">Select some favourites to pack it up.</p>
    </div>
  )
}

function GeneratingState() {
  return (
    <div className="flex h-full min-h-[200px] flex-col items-center justify-center p-8 text-center text-ink">
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        className="mb-4 text-5xl"
        aria-hidden="true"
      >
        🍱
      </motion.div>
      <p className="font-display text-lg uppercase tracking-wide">Packing your week...</p>
      <p className="mt-1 text-sm font-semibold text-muted-foreground">Picking the best meals for their Skaftin</p>
    </div>
  )
}

function SkaftinLunchbox({ box }: { box: LunchboxDay }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-1">
        <SkaftinCompartment label="Main" items={box.main} />
        <SkaftinCompartment label="Protein" items={box.protein} />
        <SkaftinCompartment label="Snacks" items={box.snacks} />
        <SkaftinCompartment label="Fruit" items={box.fruit} />
        <SkaftinCompartment label="Extras" items={box.extras} />
      </div>
    </div>
  )
}

type DayKey = 'day1' | 'day2' | 'day3' | 'day4' | 'day5'
const ALL_DAYS: DayKey[] = ['day1', 'day2', 'day3', 'day4', 'day5']

export function LiveSkaftinPreview({ value }: { value: Selection }) {
  const [activeDay, setActiveDay] = useState<DayKey>('day1')
  const [isMobileExpanded, setIsMobileExpanded] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsMobileExpanded(false)
      } else if (currentScrollY < 20) {
        setIsMobileExpanded(true)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  let currentBox: LunchboxDay = { main: [], protein: [], snacks: [], fruit: [], extras: [] }
  const dayIndex = ALL_DAYS.indexOf(activeDay)

  if (value.generatedWeek.length > 0 && value.menuId !== null && !value.menuId.startsWith('custom-')) {
    const dayData = value.generatedWeek[dayIndex] || value.generatedWeek[0]
    currentBox = {
      main: [dayData.mealId],
      protein: [],
      snacks: dayData.sides.map(s => `emoji-${s}`),
      fruit: [],
      extras: [],
    }
  } else if (value.customItems.length > 0) {
    currentBox = {
      main: value.customItems,
      protein: [],
      snacks: [],
      fruit: [],
      extras: [],
    }
  } else {
    const week = buildWeekFromSelection(value.likes, value.dislikes, value.days)
    currentBox = week[activeDay]
  }

  const totalItems = Object.values(currentBox).reduce((acc, items) => acc + items.length, 0)
  const isEmpty = totalItems === 0
  
  const isAirFryer = value.prep === 'airfryer'

  return (
    <div className="flex flex-col gap-4">
      {/* ── Compact Bar (Mobile Only) ── */}
      {!isMobileExpanded && (
        <button 
          type="button"
          onClick={() => {
            setIsMobileExpanded(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex w-full items-center justify-between rounded-full border-2 border-eskort-red bg-background px-4 py-3 shadow-lg lg:hidden transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl leading-none" aria-hidden="true">🍱</span>
            <span className="font-display text-xs uppercase tracking-wide text-ink">
              Your Skaftin <span className="text-muted-foreground">— {totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
            </span>
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-eskort-red">Tap to expand</span>
        </button>
      )}

      {/* ── Full Preview (Hidden on mobile when collapsed) ── */}
      <div className={`${!isMobileExpanded ? 'hidden lg:flex' : 'flex'} flex-col gap-4`}>
        {/* ── Main Preview Card ── */}
        <div className="flex h-full min-h-[320px] flex-col rounded-[32px] border-2 border-border bg-card p-4 shadow-sm sm:p-6 lg:min-h-[400px]">
        <div className="mb-4">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="flex items-center gap-2 font-display text-[16px] uppercase tracking-wide text-ink">
              <span className="block h-2.5 w-2.5 rounded-full border-2 border-brand-green bg-transparent" />
              Live Skaftin Preview
            </h3>
            
            <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-ink">
              {isAirFryer ? (
                <Flame className="h-3.5 w-3.5 text-eskort-red" />
              ) : (
                <Snowflake className="h-3.5 w-3.5 text-eskort-blue" />
              )}
              {isAirFryer ? 'Air Fryer Ready' : 'Chilled & Ready'}
              <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>
          <p className="mt-1 text-xs font-semibold text-muted-foreground">
            Selected foods pop straight into the box.
          </p>
        </div>
        
        <div className="relative flex-1 rounded-2xl border-2 border-dashed border-border bg-background p-3 sm:p-4">
          <AnimatePresence mode="wait">
            {value.isGenerating ? (
              <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <GeneratingState />
              </motion.div>
            ) : isEmpty ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <EmptySkaftinState />
              </motion.div>
            ) : (
              <motion.div key="filled" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <SkaftinLunchbox box={currentBox} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* ── Day Selector Card ── */}
      <div className="rounded-[32px] border-2 border-border bg-card p-4 sm:p-6 shadow-sm">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {ALL_DAYS.slice(0, value.days).map((dayKey, i) => {
            const isActive = activeDay === dayKey
            
            return (
              <button
                key={dayKey}
                type="button"
                onClick={() => setActiveDay(dayKey)}
                className={`relative flex min-w-20 flex-1 flex-col items-center justify-center gap-2 rounded-2xl border-2 p-3 text-center transition-all ${
                  isActive 
                    ? 'border-eskort-red shadow-sm shadow-eskort-red/10 bg-background' 
                    : 'border-border bg-background hover:border-eskort-red/30'
                }`}
              >
                {isActive && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-eskort-red px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-white">
                    Today
                  </span>
                )}
                
                <span className="text-2xl" aria-hidden="true">🍱</span>
                
                <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-ink' : 'text-muted-foreground'}`}>
                  Day {i + 1}
                  {isActive && <Check className="h-3 w-3 text-brand-green" />}
                </span>
              </button>
            )
          })}
          
          <button
            type="button"
            className="relative flex min-w-24 flex-1 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-background p-3 text-center transition-all hover:border-eskort-red/30"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-lg text-muted-foreground">
              +
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Build Your Own
            </span>
          </button>
        </div>
        <p className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
          <span className="text-eskort-yellow">⭐</span>
          {value.days} tasty days ahead! You can customise each day in the next step.
        </p>
      </div>
      </div>
    </div>
  )
}
