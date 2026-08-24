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
  Star,
  Zap,
  Heart,
  Package,
  BookOpen,
  Squirrel,
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

// ─── Junior Menu Item Types ───────────────────────────────────────────────────

export type JuniorCategory =
  | 'Shaped Foods'
  | 'Alphabets'
  | 'Animal-Shaped'
  | 'Lunchables'
  | 'Classic Junior'

export type JuniorMenuItem = {
  id: string
  name: string
  category: JuniorCategory
  emoji: string
  description: string
  ageRange: string
  prepTime: string
  // No image field — uses placeholder div
  placeholderBg: string // Tailwind bg class or hex
}

// ─── Taste options ────────────────────────────────────────────────────────────

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

// ─── Price Tiers ─────────────────────────────────────────────────────────────

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

// ─── Weekly Menus ─────────────────────────────────────────────────────────────

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
    blurb: 'The trusty ham, cheese & vienna combo that never gets old.',
    highlights: ['Ham & cheese sarmie', 'Cocktail viennas', 'Bacon bits', 'Apple & grapes'],
    prep: 'prepacked',
    accent: 'blue',
  },
  {
    id: 'airfryer',
    name: 'Air Fryer Power-Ups',
    theme: 'Hot & Crispy',
    image: '/images/menu-airfryer.png',
    blurb: 'Crispy nuggets & bites, ready in minutes — just pop in the air fryer.',
    highlights: ['Golden nuggets', 'Crumbed bites', 'Sausage rolls', 'Dip & cheese'],
    prep: 'airfryer',
    accent: 'yellow',
  },
]

// ─── Junior Menu Items ────────────────────────────────────────────────────────

export const JUNIOR_MENU_ITEMS: JuniorMenuItem[] = [
  // ── Shaped Foods ──────────────────────────────────────────────────────────
  {
    id: 'star-sarmie',
    name: 'Star-Shaped Sarmie',
    category: 'Shaped Foods',
    emoji: '⭐',
    description: 'Ham & cheese sarmie cut into a star shape with a cookie cutter. Kids love them!',
    ageRange: '3+',
    prepTime: '5 min',
    placeholderBg: '#dbeafe',
  },
  {
    id: 'dino-nuggets',
    name: 'Dinosaur Nuggets',
    category: 'Shaped Foods',
    emoji: '🦕',
    description: 'Crispy crumbed chicken nuggets shaped like dinosaurs. Air fryer ready.',
    ageRange: '2+',
    prepTime: '3 min',
    placeholderBg: '#dcfce7',
  },
  {
    id: 'heart-ham',
    name: 'Heart-Shaped Ham Bites',
    category: 'Shaped Foods',
    emoji: '❤️',
    description: 'Eskort ham slices cut into heart shapes — a sweet lunchtime surprise.',
    ageRange: '2+',
    prepTime: '3 min',
    placeholderBg: '#fee2e2',
  },
  {
    id: 'rocket-crackers',
    name: 'Rocket Cheese Crackers',
    category: 'Shaped Foods',
    emoji: '🚀',
    description: 'Rocket-shaped crackers with cream cheese spread. Ready to launch into their lunchbox!',
    ageRange: '3+',
    prepTime: '5 min',
    placeholderBg: '#fef3c7',
  },
  {
    id: 'star-polony',
    name: 'Star Polony Rounds',
    category: 'Shaped Foods',
    emoji: '🌟',
    description: 'Eskort polony cut into star shapes and served with cheese triangles.',
    ageRange: '2+',
    prepTime: '3 min',
    placeholderBg: '#ede9fe',
  },

  // ── Alphabets ─────────────────────────────────────────────────────────────
  {
    id: 'alphabet-spaghetti',
    name: 'Alphabet Vienna Spaghetti',
    category: 'Alphabets',
    emoji: '🔤',
    description: 'Mini alphabet pasta with diced Eskort vienna pieces in a light tomato sauce.',
    ageRange: '3+',
    prepTime: '10 min',
    placeholderBg: '#fef9c3',
  },
  {
    id: 'letter-cookies',
    name: 'Letter-Shaped Savoury Cookies',
    category: 'Alphabets',
    emoji: 'ABC',
    description: 'Cheesy savoury cookies baked in letter shapes — spell your child\'s name!',
    ageRange: '2+',
    prepTime: '15 min',
    placeholderBg: '#e0f2fe',
  },
  {
    id: 'abc-ham-wrap',
    name: 'ABC Ham Wrap',
    category: 'Alphabets',
    emoji: '📝',
    description: 'Tortilla wrap with Eskort ham and cheese, cut into letter-shaped bite pieces.',
    ageRange: '4+',
    prepTime: '5 min',
    placeholderBg: '#fce7f3',
  },

  // ── Animal-Shaped ─────────────────────────────────────────────────────────
  {
    id: 'animal-biscuits',
    name: 'Animal-Shaped Biscuits',
    category: 'Animal-Shaped',
    emoji: '🐘',
    description: 'Savoury biscuits shaped like lions, elephants, and giraffes. Perfect snack pack add-in.',
    ageRange: '2+',
    prepTime: '0 min',
    placeholderBg: '#dcfce7',
  },
  {
    id: 'bunny-ham-roll',
    name: 'Bunny Ham Roll',
    category: 'Animal-Shaped',
    emoji: '🐰',
    description: 'Eskort ham and cream cheese rolled up and decorated to look like a bunny face.',
    ageRange: '3+',
    prepTime: '8 min',
    placeholderBg: '#fce7f3',
  },
  {
    id: 'bear-face-sarmie',
    name: 'Bear-Face Sarmie',
    category: 'Animal-Shaped',
    emoji: '🐻',
    description: 'Round bread sarmie with Eskort ham, decorated with olive eyes and a carrot snout.',
    ageRange: '3+',
    prepTime: '8 min',
    placeholderBg: '#fef3c7',
  },
  {
    id: 'fishy-polony',
    name: 'Fish-Shaped Polony Bites',
    category: 'Animal-Shaped',
    emoji: '🐟',
    description: 'Eskort polony cut into fish shapes with a vegetable stamp. Fun and nutritious.',
    ageRange: '2+',
    prepTime: '4 min',
    placeholderBg: '#e0f2fe',
  },
  {
    id: 'caterpillar-viennas',
    name: 'Caterpillar Vienna Skewers',
    category: 'Animal-Shaped',
    emoji: '🐛',
    description: 'Cocktail viennas and cheese cubes threaded on a pick to make a caterpillar.',
    ageRange: '4+',
    prepTime: '5 min',
    placeholderBg: '#dcfce7',
  },

  // ── Lunchables-Style ─────────────────────────────────────────────────────
  {
    id: 'vienna-cracker-pack',
    name: 'Vienna & Cracker Combo',
    category: 'Lunchables',
    emoji: '🧀',
    description: 'Mini cocktail viennas with buttery crackers and a cheese slice. Build-your-own fun.',
    ageRange: '2+',
    prepTime: '3 min',
    placeholderBg: '#fef9c3',
  },
  {
    id: 'ham-cheese-crackers',
    name: 'Ham + Cheese + Crackers',
    category: 'Lunchables',
    emoji: '🥪',
    description: 'Eskort ham strips, cheddar cheese squares, and crackers in separate compartments.',
    ageRange: '2+',
    prepTime: '3 min',
    placeholderBg: '#fee2e2',
  },
  {
    id: 'salami-cream-cheese',
    name: 'Salami + Cream Cheese Pack',
    category: 'Lunchables',
    emoji: '🫙',
    description: 'Eskort salami slices with cream cheese and crackers for spreading and stacking.',
    ageRange: '3+',
    prepTime: '3 min',
    placeholderBg: '#ede9fe',
  },
  {
    id: 'polony-roll-combo',
    name: 'Polony Roll-Up Combo',
    category: 'Lunchables',
    emoji: '🌯',
    description: 'Eskort polony rolled with cream cheese and served with mini crackers and fruit cubes.',
    ageRange: '2+',
    prepTime: '5 min',
    placeholderBg: '#dbeafe',
  },

  // ── Classic Junior ────────────────────────────────────────────────────────
  {
    id: 'cocktail-viennas-plain',
    name: 'Cocktail Viennas',
    category: 'Classic Junior',
    emoji: '🌭',
    description: 'Eskort cocktail viennas — the original kid favourite. Prepacked and ready to go.',
    ageRange: '1+',
    prepTime: '0 min',
    placeholderBg: '#fef3c7',
  },
  {
    id: 'polony-roll-ups',
    name: 'Polony Roll-Ups',
    category: 'Classic Junior',
    emoji: '🍖',
    description: 'Eskort polony slices rolled into a tube — classic, simple, and always a winner.',
    ageRange: '1+',
    prepTime: '1 min',
    placeholderBg: '#fee2e2',
  },
  {
    id: 'cheese-twists',
    name: 'Cheese Twist Sticks',
    category: 'Classic Junior',
    emoji: '🧀',
    description: 'Cheesy twist sticks — crunchy and satisfying. Perfect salty snack companion.',
    ageRange: '2+',
    prepTime: '0 min',
    placeholderBg: '#fef9c3',
  },
  {
    id: 'mini-frankfurters',
    name: 'Mini Frankfurters',
    category: 'Classic Junior',
    emoji: '🌭',
    description: 'Small Eskort frankfurters — great for little hands to pick up and enjoy.',
    ageRange: '1+',
    prepTime: '2 min',
    placeholderBg: '#dcfce7',
  },
  {
    id: 'ham-pinwheels',
    name: 'Ham Pinwheels',
    category: 'Classic Junior',
    emoji: '🌀',
    description: 'Eskort ham and cheese rolled in a tortilla and sliced into pinwheel rounds.',
    ageRange: '2+',
    prepTime: '5 min',
    placeholderBg: '#e0f2fe',
  },
]

export const JUNIOR_CATEGORIES: JuniorCategory[] = [
  'Shaped Foods',
  'Alphabets',
  'Animal-Shaped',
  'Lunchables',
  'Classic Junior',
]

export const JUNIOR_CATEGORY_META: Record<JuniorCategory, { emoji: string; colour: string; description: string }> = {
  'Shaped Foods': { emoji: '⭐', colour: '#dbeafe', description: 'Fun shapes they\'ll love' },
  'Alphabets': { emoji: '🔤', colour: '#fef9c3', description: 'Learn while they munch' },
  'Animal-Shaped': { emoji: '🐻', colour: '#dcfce7', description: 'Safari in their lunchbox' },
  'Lunchables': { emoji: '🧀', colour: '#fee2e2', description: 'Build-your-own fun packs' },
  'Classic Junior': { emoji: '🌭', colour: '#fef3c7', description: 'Tried & true favourites' },
}

// ─── Recipe Cards ─────────────────────────────────────────────────────────────

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

export type DeliverySlot = {
  id: string
  label: string
  note: string
  badge: string | null
}

export const DELIVERY_SLOTS: DeliverySlot[] = [
  { id: 'tomorrow-am', label: 'Tomorrow morning', note: '8 am – 12 pm', badge: 'Fastest' },
  { id: 'tomorrow-pm', label: 'Tomorrow afternoon', note: '1 pm – 5 pm', badge: null },
  { id: 'end-of-week', label: 'End of week', note: 'Fri, any time', badge: 'Flexible' },
]
