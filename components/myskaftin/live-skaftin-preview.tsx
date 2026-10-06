'use client'

import { useState, useEffect } from 'react'
import { Snowflake, Flame, Info, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import type { Selection } from './experience'
import { buildWeekFromSelection, FOOD_METADATA, type LunchboxDay } from '@/lib/skaftin-data'
import { JUNIOR_MENU_ITEMS } from './data'

const SANDWICH_PHOTO = '/assets/skaftin/foods/food-sandwich.png'
const LUNCHBOX_IMAGE = '/assets/skaftin/lunchbox/eskort-lunchbox-design-preview.png'
const EMPTY_CLASS = 'flex h-full items-center justify-center rounded-xl bg-background/55 px-2 text-center text-[9px] font-semibold leading-snug text-muted-foreground'

type FoodInfo = { photo?: string; label: string; emoji: string; bg?: string }

const PHOTO_BY_KEYWORD: [RegExp, string][] = [
  [/\b(sarmie|sarmies|sandwich|burger|wrap|roll|pinwheel)\b/i, SANDWICH_PHOTO],
  [/nugget/i, '/assets/skaftin/foods/food-nuggets.png'],
  [/vienna|sausage|spaghetti/i, '/assets/skaftin/foods/food-viennas.png'],
  [/bacon/i, '/assets/skaftin/foods/food-bacon.png'],
  [/meatball|frikkadel/i, '/assets/skaftin/foods/food-meatballs.png'],
  [/\b(ham|polony|salami)\b/i, '/assets/skaftin/foods/food-ham.png'],
]

function getFoodInfo(id: string): FoodInfo {
  const meta = FOOD_METADATA[id]
  const juniorItem = JUNIOR_MENU_ITEMS.find((item) => item.id === id)
  if (id.startsWith('emoji-')) return { label: '', emoji: id.replace('emoji-', '') }

  const label = meta?.label ?? juniorItem?.name ?? ''
  const emoji = meta?.emoji ?? (juniorItem?.emoji === 'ABC' ? '🔡' : juniorItem?.emoji) ?? '🍽️'
  const photo =
    meta?.image?.endsWith('.png')
      ? meta.image
      : PHOTO_BY_KEYWORD.find(([pattern]) => pattern.test(label))?.[1]
  return { photo, label, emoji, bg: juniorItem?.placeholderBg }
}

function FoodTile({ photo, label, emoji, bg, className }: FoodInfo & { className?: string }) {
  if (photo) {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-muted ${className ?? ''}`} role="img" aria-label={label}>
        <img src={photo} alt="" className="h-full w-full object-cover" loading="lazy" />
        {label && (
          <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/70 to-transparent px-2 pb-1 pt-4 text-[10px] font-bold uppercase leading-tight text-white">
            {label}
          </span>
        )}
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl bg-muted/60 p-1 text-center ${className ?? ''}`}
      style={bg ? { background: bg } : undefined}
    >
      <span className="text-3xl leading-none" aria-hidden="true">{emoji}</span>
      {label && <span className="mt-1 max-w-full truncate text-[10px] font-bold uppercase leading-tight text-ink">{label}</span>}
    </div>
  )
}

function getJuniorCompartment(id: string): keyof LunchboxDay {
  const juniorItem = JUNIOR_MENU_ITEMS.find((item) => item.id === id)
  if (!juniorItem) return 'protein'

  const name = juniorItem.name.toLowerCase()
  if (/\b(sarmie|sarmies|sandwich|burger|wrap|roll|pinwheel)\b/.test(name)) return 'main'
  if (/\b(yoghurt|yogurt)\b/.test(name)) return 'extras'
  if (/\b(fruit|apple|grape|banana|blueberr|naartjie)\b/.test(name)) return 'fruit'
  if (/\b(cracker|biscuit|cookie|twist|wiggles|pretzel|popcorn)\b/.test(name)) return 'snacks'
  if (/\b(vienna|nugget|ham|polony|salami|bacon|sausage|meatball)\b/.test(name)) return 'protein'
  return 'protein'
}

function MainCompartment({ items }: { items: string[] }) {
  const labels = items.map((id) => getFoodInfo(id).label).filter(Boolean)

  return (
    <section
      className="absolute left-[13.7%] top-[17.2%] z-10 h-[36.4%] w-[34.9%] overflow-hidden"
      id="compartment-main"
      aria-label="Main compartment"
    >
      {items.length > 0 ? (
        <FoodTile
          photo={SANDWICH_PHOTO}
          label={labels.join(' + ')}
          emoji="🥪"
          className="h-full w-full"
        />
      ) : (
        <p className={EMPTY_CLASS}>Pick ham, cheese or bacon to build your sarmie.</p>
      )}
    </section>
  )
}

function SkaftinCompartment({
  label,
  items,
  className,
  emptyMessage,
  round = false,
}: {
  label: string
  items: string[]
  className: string
  emptyMessage: string
  round?: boolean
}) {
  return (
    <section
      className={`absolute z-10 flex min-h-0 flex-col overflow-hidden ${round ? 'rounded-full' : ''} ${className}`}
      id={`compartment-${label.toLowerCase()}`}
      aria-label={`${label} compartment`}
    >
      {items.length > 0 ? (
        <div
          tabIndex={items.length > 1 ? 0 : undefined}
          aria-label={`${label} food items`}
          className={`grid min-h-0 flex-1 auto-rows-min gap-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${items.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} overflow-y-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-eskort-blue`}
        >
          <AnimatePresence mode="popLayout">
            {items.map((id, index) => {
              const info = getFoodInfo(id)
              return (
                <motion.div
                  key={`${id}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <FoodTile {...info} className="aspect-square w-full" />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      ) : (
        <p className={EMPTY_CLASS}>{emptyMessage}</p>
      )}
    </section>
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
    <div className="relative isolate aspect-[1290/952] w-full overflow-hidden">
      <div className="absolute left-[-9.5%] top-[-4.3%] h-[107.5%] w-[119%]">
      <Image
        src={LUNCHBOX_IMAGE}
        alt="Open blue lunchbox with five stainless-steel compartments"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="object-contain"
      />
      <MainCompartment items={box.main} />
      <SkaftinCompartment label="Protein" items={box.protein} className="left-[51.9%] top-[17.2%] h-[36.4%] w-[37.1%]" emptyMessage="Add a protein" />
      <SkaftinCompartment label="Snacks" items={box.snacks} className="left-[13.7%] top-[60.3%] h-[26.5%] w-[34.2%]" emptyMessage="Crackers & bites" />
      <SkaftinCompartment label="Fruit" items={box.fruit} className="left-[51.4%] top-[60.3%] h-[26.5%] w-[37.1%]" emptyMessage="Add some fruit" />
      <SkaftinCompartment label="Extras" items={box.extras} className="left-[42%] top-[44.4%] h-[23.5%] w-[15.9%]" emptyMessage="Extras" round />
            </div>
          </div>
  )
}

type DayKey = 'day1' | 'day2' | 'day3' | 'day4' | 'day5'
const ALL_DAYS: DayKey[] = ['day1', 'day2', 'day3', 'day4', 'day5']

export function LiveSkaftinPreview({ value }: { value: Selection }) {
  const [activeDay, setActiveDay] = useState<DayKey>('day1')

  useEffect(() => {
    if (ALL_DAYS.indexOf(activeDay) >= value.days) setActiveDay('day1')
  }, [activeDay, value.days])
  
  let currentBox: LunchboxDay = { main: [], protein: [], snacks: [], fruit: [], extras: [] }
  const dayIndex = ALL_DAYS.indexOf(activeDay)

  if (value.generatedWeek.length > 0 && value.menuId !== null && !value.menuId.startsWith('custom-')) {
    const dayData = value.generatedWeek[dayIndex] || value.generatedWeek[0]
    currentBox[getJuniorCompartment(dayData.mealId)] = [dayData.mealId]
    dayData.sides.forEach((side) => {
      const compartment = ['🍎', '🍇', '🍌', '🫐'].includes(side)
        ? 'fruit'
        : side === '🥕'
          ? 'extras'
          : 'snacks'
      currentBox[compartment].push(`emoji-${side}`)
    })
  } else if (value.customItems.length > 0) {
    value.customItems.forEach((id) => currentBox[getJuniorCompartment(id)].push(id))
  } else {
    const week = buildWeekFromSelection(value.likes, value.dislikes, value.days)
    currentBox = week[activeDay]
  }

  const isAirFryer = value.prep === 'airfryer'

  return (
    <div className="flex flex-col gap-4">
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
            Build the sandwich, then fill the side compartments.
          </p>
        </div>
        
        <div className="relative w-full rounded-2xl bg-background">
          <AnimatePresence mode="wait">
            {value.isGenerating ? (
              <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 rounded-[28px] bg-background/90">
                <GeneratingState />
              </motion.div>
            ) : (
              <motion.div key="filled" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SkaftinLunchbox box={currentBox} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* ── Day Selector Card ── */}
      <div className="rounded-[32px] border-2 border-border bg-card p-4 sm:p-6 shadow-sm">
        <div
          className="grid gap-2 pb-2"
          style={{ gridTemplateColumns: `repeat(${value.days}, minmax(0, 1fr))` }}
        >
          {ALL_DAYS.slice(0, value.days).map((dayKey, i) => {
            const isActive = activeDay === dayKey
            
            return (
              <button
                key={dayKey}
                type="button"
                onClick={() => setActiveDay(dayKey)}
                className={`relative flex min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border-2 p-2 text-center transition-all sm:p-3 ${
                  isActive 
                    ? 'border-eskort-red shadow-sm shadow-eskort-red/10 bg-background' 
                    : 'border-border bg-background hover:border-eskort-red/30'
                }`}
              >
                <span className="text-2xl" aria-hidden="true">🍱</span>
                
                <span className={`flex items-center gap-1 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-ink' : 'text-muted-foreground'}`}>
                  Day {i + 1}
                  {isActive && <Check className="h-3 w-3 text-brand-green" />}
                </span>
              </button>
            )
          })}
          
        </div>
        <p className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
          <span className="text-eskort-yellow">⭐</span>
          Showing Day {dayIndex + 1} of {value.days}. Choose another day to preview its lunch.
        </p>
      </div>
    </div>
  )
}
