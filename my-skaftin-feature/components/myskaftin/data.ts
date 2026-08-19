import type { LucideIcon } from 'lucide-react'
import {
  Beef,
  Croissant,
  Apple,
  Cookie,
  Sandwich,
  Drumstick,
  Flame,
  Milk,
  Wheat,
  Nut,
  Salad,
  Cherry,
} from 'lucide-react'

export type PrepStyle = 'prepacked' | 'airfryer'

export type TasteOption = {
  id: string
  label: string
  icon: LucideIcon
}

export type PriceTier = {
  id: string
  name: string
  tagline: string
  pricePerDay: number
  points: number
}

export type WeeklyMenu = {
  id: string
  name: string
  theme: string
  image: string
  blurb: string
  highlights: string[]
  prep: PrepStyle
  accent: 'red' | 'yellow' | 'blue' | 'green'
}

export const LIKE_OPTIONS: TasteOption[] = [
  { id: 'viennas', label: 'Viennas', icon: Beef },
  { id: 'bacon', label: 'Bacon', icon: Flame },
  { id: 'cheese', label: 'Cheese', icon: Cookie },
  { id: 'ham', label: 'Ham & Polony', icon: Sandwich },
  { id: 'nuggets', label: 'Nuggets', icon: Drumstick },
  { id: 'sausage', label: 'Sausage Rolls', icon: Croissant },
  { id: 'fruit', label: 'Fruit', icon: Apple },
  { id: 'crackers', label: 'Crackers', icon: Cherry },
]

export const DISLIKE_OPTIONS: TasteOption[] = [
  { id: 'no-spicy', label: 'No Spicy', icon: Flame },
  { id: 'no-tomato', label: 'No Tomato', icon: Cherry },
  { id: 'no-nuts', label: 'Nut Free', icon: Nut },
  { id: 'no-gluten', label: 'Gluten Free', icon: Wheat },
  { id: 'no-dairy', label: 'Dairy Free', icon: Milk },
  { id: 'no-green', label: 'No Veggies', icon: Salad },
]

export const PRICE_TIERS: PriceTier[] = [
  {
    id: 'everyday',
    name: 'Everyday Muncher',
    tagline: 'Simple, tasty, budget-friendly',
    pricePerDay: 32,
    points: 80,
  },
  {
    id: 'family',
    name: 'Family Favourite',
    tagline: 'The crowd-pleaser combo',
    pricePerDay: 45,
    points: 140,
  },
  {
    id: 'legend',
    name: 'Lunchbox Legend',
    tagline: 'Premium picks, extra treats',
    pricePerDay: 62,
    points: 220,
  },
]

export const WEEKLY_MENUS: WeeklyMenu[] = [
  {
    id: 'superhero',
    name: 'Superhero Week',
    theme: 'Theme of the Month',
    image: '/images/menu-superhero.png',
    blurb: 'Star-shaped sarmies, cocktail viennas & power-up snacks to save the day.',
    highlights: ['Star sandwiches', 'Cocktail viennas', 'Cheese cubes', 'Fruit & treat'],
    prep: 'prepacked',
    accent: 'red',
  },
  {
    id: 'safari',
    name: 'Safari Adventure',
    theme: 'Fan Favourite',
    image: '/images/menu-safari.png',
    blurb: 'Animal-shaped bites, mini sausages & crunchy veggies for little explorers.',
    highlights: ['Animal sandwiches', 'Mini sausages', 'Ham rolls', 'Carrot & cucumber'],
    prep: 'prepacked',
    accent: 'green',
  },
  {
    id: 'classic',
    name: 'Classic Champions',
    theme: 'Always a Winner',
    image: '/images/menu-classic.png',
    blurb: 'The trusty ham, cheese & vienna combo that never gets old (but never gets boring).',
    highlights: ['Ham & cheese sarmie', 'Cocktail viennas', 'Bacon bits', 'Apple & grapes'],
    prep: 'prepacked',
    accent: 'blue',
  },
  {
    id: 'airfryer',
    name: 'Air Fryer Power-Ups',
    theme: 'Hot & Crispy',
    image: '/images/menu-airfryer.png',
    blurb: 'Crispy nuggets & bites, ready in minutes — just pop in the air fryer at home.',
    highlights: ['Golden nuggets', 'Crumbed bites', 'Sausage rolls', 'Dip & cheese'],
    prep: 'airfryer',
    accent: 'yellow',
  },
]

export const RECIPE_CARDS: {
  id: string
  title: string
  time: string
  method: string
  steps: string
  icon: LucideIcon
}[] = [
  {
    id: 'nuggets',
    title: 'Crispy Nugget Bites',
    time: '3 mins',
    method: 'Air Fryer',
    steps: 'Air fry at 180°C for 3 minutes until golden. Cool slightly, then pack.',
    icon: Drumstick,
  },
  {
    id: 'viennas',
    title: 'Cocktail Vienna Skewers',
    time: '2 mins',
    method: 'No Cook',
    steps: 'Thread viennas & cheese onto a kid-safe pick. Straight into the box!',
    icon: Beef,
  },
  {
    id: 'sausage',
    title: 'Golden Sausage Rolls',
    time: '5 mins',
    method: 'Air Fryer',
    steps: 'Air fry at 180°C for 5 minutes. Let cool before packing for crunch.',
    icon: Croissant,
  },
]

export const accentBg: Record<WeeklyMenu['accent'], string> = {
  red: 'bg-eskort-red',
  yellow: 'bg-eskort-yellow',
  blue: 'bg-eskort-blue',
  green: 'bg-[#3d8b5f]',
}

export const accentText: Record<WeeklyMenu['accent'], string> = {
  red: 'text-eskort-red',
  yellow: 'text-eskort-yellow',
  blue: 'text-eskort-blue',
  green: 'text-[#3d8b5f]',
}
