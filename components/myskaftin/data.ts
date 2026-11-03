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
  emoji: string
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

// ─── Muncher Personalities ─────────────────────────────────────────────────

export type PersonalityId =
  | 'picky-eater'
  | 'little-adventurer'
  | 'always-hungry'
  | 'snack-grazer'
  | 'sports-kid'
  | 'classic-muncher'

export type MuncherPersonality = {
  id: PersonalityId
  name: string
  emoji: string
  tagline: string
  description: string
  /** Multipliers for scoring: favourite match, variety, portionSize */
  affinityWeights: {
    favouriteMatch: number  // 0–2, how much to weight liked foods
    variety: number         // 0–2, how much to weight meal variety
    portionSize: number     // 0–2, prefer larger combos
    snackCount: number      // 0–2, prefer more snack items
    adventure: number       // 0–2, prefer less-common combos
  }
}

export const MUNCHER_PERSONALITIES: MuncherPersonality[] = [
  {
    id: 'picky-eater',
    name: 'The Picky Eater',
    emoji: '🤔',
    tagline: 'Familiar favourites only',
    description: 'Stick to what they know and love. Safe, trusted flavours every time.',
    affinityWeights: { favouriteMatch: 2, variety: 0.3, portionSize: 1, snackCount: 1, adventure: 0.2 },
  },
  {
    id: 'little-adventurer',
    name: 'The Little Adventurer',
    emoji: '🌍',
    tagline: 'Bring on the new flavours!',
    description: 'Loves trying new things. The more varied and surprising, the better.',
    affinityWeights: { favouriteMatch: 0.8, variety: 2, portionSize: 1, snackCount: 1, adventure: 2 },
  },
  {
    id: 'always-hungry',
    name: 'The Always-Hungry One',
    emoji: '😋',
    tagline: 'More is always more',
    description: 'Comes home with an empty box every single day. Needs filling combos.',
    affinityWeights: { favouriteMatch: 1, variety: 1, portionSize: 2, snackCount: 1.5, adventure: 1 },
  },
  {
    id: 'snack-grazer',
    name: 'The Snack Grazer',
    emoji: '🐿️',
    tagline: 'Many small bites over one big one',
    description: 'Picks at things throughout the day. Loves variety of small items.',
    affinityWeights: { favouriteMatch: 1, variety: 1.5, portionSize: 0.5, snackCount: 2, adventure: 1 },
  },
  {
    id: 'sports-kid',
    name: 'The Sports Kid',
    emoji: '⚽',
    tagline: 'High energy, protein-packed',
    description: 'Active and always on the go. Needs fuel that keeps up with them.',
    affinityWeights: { favouriteMatch: 1, variety: 1, portionSize: 1.8, snackCount: 1, adventure: 1 },
  },
  {
    id: 'classic-muncher',
    name: 'The Classic Muncher',
    emoji: '🥪',
    tagline: 'The OG lunchbox lineup',
    description: 'Happy with the tried-and-true classics. Simple, reliable, satisfying.',
    affinityWeights: { favouriteMatch: 1.5, variety: 0.5, portionSize: 1, snackCount: 1, adventure: 0.3 },
  },
]

// ─── Themed Weeks ─────────────────────────────────────────────────────────────

export type ThemeId = 'space' | 'safari' | 'rainbow' | 'sports' | 'shapes' | 'dino'

export type ThemedWeek = {
  id: ThemeId
  name: string
  emoji: string
  description: string
  colour: string  // Tailwind bg class
  textColour: string
}

export const THEMED_WEEKS: ThemedWeek[] = [
  { id: 'space', name: 'Space Week', emoji: '🚀', description: 'Blast-off lunchboxes for little astronauts', colour: 'bg-eskort-blue', textColour: 'text-white' },
  { id: 'safari', name: 'Safari Week', emoji: '🦁', description: 'Wild animal bites from the Skaftin savanna', colour: 'bg-[#3d8b5f]', textColour: 'text-white' },
  { id: 'rainbow', name: 'Rainbow Week', emoji: '🌈', description: 'A different colour combo every day', colour: 'bg-eskort-yellow', textColour: 'text-ink' },
  { id: 'sports', name: 'Sports Week', emoji: '⚽', description: 'Energy-packed boxes for champion days', colour: 'bg-eskort-red', textColour: 'text-white' },
  { id: 'shapes', name: 'Super Shapes Week', emoji: '⭐', description: 'Stars, hearts, rockets — every shape in the box', colour: 'bg-brand-blue', textColour: 'text-white' },
  { id: 'dino', name: 'Dino Week', emoji: '🦕', description: 'Prehistoric munching for little palaeontologists', colour: 'bg-[#5a7a3a]', textColour: 'text-white' },
]

// ─── Sticker Themes ───────────────────────────────────────────────────────────

export type StickerThemeId = 'space' | 'safari' | 'shapes' | 'dino' | 'rainbow' | 'sport'

export type StickerTheme = {
  id: StickerThemeId
  name: string
  emoji: string
}

export const STICKER_THEMES: StickerTheme[] = [
  { id: 'space', name: 'Space', emoji: '🚀' },
  { id: 'safari', name: 'Safari', emoji: '🦁' },
  { id: 'shapes', name: 'Shapes', emoji: '⭐' },
  { id: 'dino', name: 'Dinosaurs', emoji: '🦕' },
  { id: 'rainbow', name: 'Rainbow', emoji: '🌈' },
  { id: 'sport', name: 'Sport', emoji: '⚽' },
]

// ─── Junior Menu Item Types ───────────────────────────────────────────────────

export type JuniorCategory =
  | 'Shaped Foods'
  | 'Alphabets'
  | 'Animal-Shaped'
  | 'Lunchables'
  | 'Classic Junior'

/** Which LIKE_OPTIONS ids this meal satisfies */
export type LikeId = 'viennas' | 'bacon' | 'cheese' | 'ham' | 'nuggets' | 'sausage' | 'fruit' | 'crackers' | 'wiggles' | 'yoghurt'

/** Which DISLIKE_OPTIONS ids exclude this meal */
export type AllergenId = 'no-spicy' | 'no-tomato' | 'no-nuts' | 'no-gluten' | 'no-dairy' | 'no-green'

export type JuniorMenuItem = {
  id: string
  name: string
  category: JuniorCategory
  emoji: string
  description: string
  ageRange: string
  prepTime: string
  /** prep style this item suits */
  prepStyle: PrepStyle | 'both'
  /** Tailwind bg class or hex */
  placeholderBg: string // Tailwind bg class or hex
  /** which LIKE_OPTIONS ids this meal satisfies (for recommendation scoring) */
  satisfiesLikes: LikeId[]
  /** which DISLIKE_OPTIONS ids (restrictions) exclude this meal */
  allergenIds: AllergenId[]
  /** per-serving price used for budget scoring */
  pricePerDay: number
  /** Skaftin Stars awarded */
  points: number
  /** personality affinities: which personalities love this item */
  personalityAffinity: PersonalityId[]
  /** optional theme association */
  themeId?: ThemeId
  /** Eskort product this item uses */
  eskortProduct?: string
}

// ─── Taste options ────────────────────────────────────────────────────────────

export const LIKE_OPTIONS: TasteOption[] = [
  { id: 'viennas', label: 'Viennas', icon: Beef, emoji: '🌭' },
  { id: 'bacon', label: 'Bacon', icon: Flame, emoji: '🥓' },
  { id: 'cheese', label: 'Cheese', icon: Cookie, emoji: '🧀' },
  { id: 'ham', label: 'Ham & Polony', icon: Sandwich, emoji: '🥪' },
  { id: 'nuggets', label: 'Nuggets', icon: Drumstick, emoji: '🍗' },
  { id: 'sausage', label: 'Sausage Rolls', icon: Croissant, emoji: '🥐' },
  { id: 'fruit', label: 'Fruit', icon: Apple, emoji: '🍎' },
  { id: 'crackers', label: 'Crackers', icon: Cherry, emoji: '🍪' },
  { id: 'wiggles', label: 'Wiggles', icon: Cookie, emoji: '🌀' },
  { id: 'yoghurt', label: 'Yoghurt', icon: Milk, emoji: '🥣' },
]

export const DISLIKE_OPTIONS: TasteOption[] = [
  { id: 'no-spicy', label: 'No Spicy', icon: Flame, emoji: '🌶️' },
  { id: 'no-tomato', label: 'No Tomato', icon: Cherry, emoji: '🍅' },
  { id: 'no-nuts', label: 'Nut Free', icon: Nut, emoji: '🥜' },
  { id: 'no-gluten', label: 'Gluten Free', icon: Wheat, emoji: '🌾' },
  { id: 'no-dairy', label: 'Dairy Free', icon: Milk, emoji: '🥛' },
  { id: 'no-green', label: 'No Veggies', icon: Salad, emoji: '🥦' },
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
    prepStyle: 'both',
    placeholderBg: '#dbeafe',
    satisfiesLikes: ['ham', 'cheese'],
    allergenIds: ['no-gluten', 'no-dairy'],
    pricePerDay: 28,
    points: 30,
    personalityAffinity: ['picky-eater', 'classic-muncher', 'snack-grazer'],
    themeId: 'shapes',
    eskortProduct: 'Eskort Ham',
  },
  {
    id: 'dino-nuggets',
    name: 'Dinosaur Nuggets',
    category: 'Shaped Foods',
    emoji: '🦕',
    description: 'Crispy crumbed chicken nuggets shaped like dinosaurs. Air fryer ready.',
    ageRange: '2+',
    prepTime: '3 min',
    prepStyle: 'airfryer',
    placeholderBg: '#dcfce7',
    satisfiesLikes: ['nuggets'],
    allergenIds: ['no-gluten'],
    pricePerDay: 35,
    points: 40,
    personalityAffinity: ['little-adventurer', 'always-hungry', 'sports-kid'],
    themeId: 'dino',
    eskortProduct: 'Eskort Chicken Nuggets',
  },
  {
    id: 'heart-ham',
    name: 'Heart-Shaped Ham Bites',
    category: 'Shaped Foods',
    emoji: '❤️',
    description: 'Eskort ham slices cut into heart shapes — a sweet lunchtime surprise.',
    ageRange: '2+',
    prepTime: '3 min',
    prepStyle: 'prepacked',
    placeholderBg: '#fee2e2',
    satisfiesLikes: ['ham'],
    allergenIds: [],
    pricePerDay: 25,
    points: 25,
    personalityAffinity: ['picky-eater', 'snack-grazer', 'classic-muncher'],
    themeId: 'shapes',
    eskortProduct: 'Eskort Ham',
  },
  {
    id: 'rocket-crackers',
    name: 'Rocket Cheese Crackers',
    category: 'Shaped Foods',
    emoji: '🚀',
    description: 'Rocket-shaped crackers with cream cheese spread. Ready to launch into their lunchbox!',
    ageRange: '3+',
    prepTime: '5 min',
    prepStyle: 'prepacked',
    placeholderBg: '#fef3c7',
    satisfiesLikes: ['cheese', 'crackers'],
    allergenIds: ['no-gluten', 'no-dairy'],
    pricePerDay: 22,
    points: 25,
    personalityAffinity: ['snack-grazer', 'little-adventurer'],
    themeId: 'space',
    eskortProduct: 'Eskort Cheese',
  },
  {
    id: 'star-polony',
    name: 'Star Polony Rounds',
    category: 'Shaped Foods',
    emoji: '🌟',
    description: 'Eskort polony cut into star shapes and served with cheese triangles.',
    ageRange: '2+',
    prepTime: '3 min',
    prepStyle: 'prepacked',
    placeholderBg: '#ede9fe',
    satisfiesLikes: ['ham', 'cheese'],
    allergenIds: ['no-dairy'],
    pricePerDay: 20,
    points: 20,
    personalityAffinity: ['picky-eater', 'classic-muncher'],
    themeId: 'shapes',
    eskortProduct: 'Eskort Polony',
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
    prepStyle: 'prepacked',
    placeholderBg: '#fef9c3',
    satisfiesLikes: ['viennas'],
    allergenIds: ['no-gluten', 'no-tomato'],
    pricePerDay: 30,
    points: 30,
    personalityAffinity: ['little-adventurer', 'always-hungry'],
    eskortProduct: 'Eskort Viennas',
  },
  {
    id: 'letter-cookies',
    name: 'Letter-Shaped Savoury Cookies',
    category: 'Alphabets',
    emoji: 'ABC',
    description: 'Cheesy savoury cookies baked in letter shapes — spell your child\'s name!',
    ageRange: '2+',
    prepTime: '15 min',
    prepStyle: 'prepacked',
    placeholderBg: '#e0f2fe',
    satisfiesLikes: ['cheese', 'crackers'],
    allergenIds: ['no-gluten', 'no-dairy'],
    pricePerDay: 18,
    points: 20,
    personalityAffinity: ['snack-grazer', 'little-adventurer'],
    eskortProduct: 'Eskort Cheese',
  },
  {
    id: 'abc-ham-wrap',
    name: 'ABC Ham Wrap',
    category: 'Alphabets',
    emoji: '📝',
    description: 'Tortilla wrap with Eskort ham and cheese, cut into letter-shaped bite pieces.',
    ageRange: '4+',
    prepTime: '5 min',
    prepStyle: 'prepacked',
    placeholderBg: '#fce7f3',
    satisfiesLikes: ['ham', 'cheese'],
    allergenIds: ['no-gluten', 'no-dairy'],
    pricePerDay: 32,
    points: 35,
    personalityAffinity: ['always-hungry', 'classic-muncher'],
    eskortProduct: 'Eskort Ham',
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
    prepStyle: 'prepacked',
    placeholderBg: '#dcfce7',
    satisfiesLikes: ['crackers'],
    allergenIds: ['no-gluten'],
    pricePerDay: 15,
    points: 15,
    personalityAffinity: ['snack-grazer', 'picky-eater'],
    themeId: 'safari',
  },
  {
    id: 'bunny-ham-roll',
    name: 'Bunny Ham Roll',
    category: 'Animal-Shaped',
    emoji: '🐰',
    description: 'Eskort ham and cream cheese rolled up and decorated to look like a bunny face.',
    ageRange: '3+',
    prepTime: '8 min',
    prepStyle: 'prepacked',
    placeholderBg: '#fce7f3',
    satisfiesLikes: ['ham', 'cheese'],
    allergenIds: ['no-dairy'],
    pricePerDay: 28,
    points: 30,
    personalityAffinity: ['little-adventurer', 'picky-eater'],
    themeId: 'safari',
    eskortProduct: 'Eskort Ham',
  },
  {
    id: 'bear-face-sarmie',
    name: 'Bear-Face Sarmie',
    category: 'Animal-Shaped',
    emoji: '🐻',
    description: 'Round bread sarmie with Eskort ham, decorated with olive eyes and a carrot snout.',
    ageRange: '3+',
    prepTime: '8 min',
    prepStyle: 'prepacked',
    placeholderBg: '#fef3c7',
    satisfiesLikes: ['ham'],
    allergenIds: ['no-gluten'],
    pricePerDay: 30,
    points: 35,
    personalityAffinity: ['little-adventurer', 'classic-muncher'],
    themeId: 'safari',
    eskortProduct: 'Eskort Ham',
  },
  {
    id: 'fishy-polony',
    name: 'Fish-Shaped Polony Bites',
    category: 'Animal-Shaped',
    emoji: '🐟',
    description: 'Eskort polony cut into fish shapes with a vegetable stamp. Fun and nutritious.',
    ageRange: '2+',
    prepTime: '4 min',
    prepStyle: 'prepacked',
    placeholderBg: '#e0f2fe',
    satisfiesLikes: ['ham'],
    allergenIds: [],
    pricePerDay: 18,
    points: 20,
    personalityAffinity: ['picky-eater', 'snack-grazer'],
    eskortProduct: 'Eskort Polony',
  },
  {
    id: 'caterpillar-viennas',
    name: 'Caterpillar Vienna Skewers',
    category: 'Animal-Shaped',
    emoji: '🐛',
    description: 'Cocktail viennas and cheese cubes threaded on a pick to make a caterpillar.',
    ageRange: '4+',
    prepTime: '5 min',
    prepStyle: 'prepacked',
    placeholderBg: '#dcfce7',
    satisfiesLikes: ['viennas', 'cheese'],
    allergenIds: ['no-dairy'],
    pricePerDay: 25,
    points: 25,
    personalityAffinity: ['little-adventurer', 'always-hungry'],
    eskortProduct: 'Eskort Cocktail Viennas',
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
    prepStyle: 'prepacked',
    placeholderBg: '#fef9c3',
    satisfiesLikes: ['viennas', 'cheese', 'crackers'],
    allergenIds: ['no-gluten', 'no-dairy'],
    pricePerDay: 32,
    points: 35,
    personalityAffinity: ['snack-grazer', 'picky-eater', 'classic-muncher'],
    eskortProduct: 'Eskort Cocktail Viennas',
  },
  {
    id: 'ham-cheese-crackers',
    name: 'Ham + Cheese + Crackers',
    category: 'Lunchables',
    emoji: '🥪',
    description: 'Eskort ham strips, cheddar cheese squares, and crackers in separate compartments.',
    ageRange: '2+',
    prepTime: '3 min',
    prepStyle: 'prepacked',
    placeholderBg: '#fee2e2',
    satisfiesLikes: ['ham', 'cheese', 'crackers'],
    allergenIds: ['no-gluten', 'no-dairy'],
    pricePerDay: 35,
    points: 40,
    personalityAffinity: ['snack-grazer', 'classic-muncher', 'picky-eater'],
    eskortProduct: 'Eskort Ham',
  },
  {
    id: 'salami-cream-cheese',
    name: 'Salami + Cream Cheese Pack',
    category: 'Lunchables',
    emoji: '🫙',
    description: 'Eskort salami slices with cream cheese and crackers for spreading and stacking.',
    ageRange: '3+',
    prepTime: '3 min',
    prepStyle: 'prepacked',
    placeholderBg: '#ede9fe',
    satisfiesLikes: ['ham', 'cheese', 'crackers'],
    allergenIds: ['no-gluten', 'no-dairy'],
    pricePerDay: 38,
    points: 40,
    personalityAffinity: ['little-adventurer', 'snack-grazer'],
    eskortProduct: 'Eskort Salami',
  },
  {
    id: 'polony-roll-combo',
    name: 'Polony Roll-Up Combo',
    category: 'Lunchables',
    emoji: '🌯',
    description: 'Eskort polony rolled with cream cheese and served with mini crackers and fruit cubes.',
    ageRange: '2+',
    prepTime: '5 min',
    prepStyle: 'prepacked',
    placeholderBg: '#dbeafe',
    satisfiesLikes: ['ham', 'cheese', 'crackers', 'fruit'],
    allergenIds: ['no-dairy'],
    pricePerDay: 30,
    points: 30,
    personalityAffinity: ['always-hungry', 'classic-muncher', 'snack-grazer'],
    eskortProduct: 'Eskort Polony',
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
    prepStyle: 'both',
    placeholderBg: '#fef3c7',
    satisfiesLikes: ['viennas'],
    allergenIds: [],
    pricePerDay: 22,
    points: 20,
    personalityAffinity: ['picky-eater', 'classic-muncher', 'always-hungry'],
    eskortProduct: 'Eskort Cocktail Viennas',
  },
  {
    id: 'polony-roll-ups',
    name: 'Polony Roll-Ups',
    category: 'Classic Junior',
    emoji: '🍖',
    description: 'Eskort polony slices rolled into a tube — classic, simple, and always a winner.',
    ageRange: '1+',
    prepTime: '1 min',
    prepStyle: 'prepacked',
    placeholderBg: '#fee2e2',
    satisfiesLikes: ['ham'],
    allergenIds: [],
    pricePerDay: 18,
    points: 15,
    personalityAffinity: ['picky-eater', 'classic-muncher'],
    eskortProduct: 'Eskort Polony',
  },
  {
    id: 'cheese-twists',
    name: 'Cheese Twist Sticks',
    category: 'Classic Junior',
    emoji: '🧀',
    description: 'Cheesy twist sticks — crunchy and satisfying. Perfect salty snack companion.',
    ageRange: '2+',
    prepTime: '0 min',
    prepStyle: 'prepacked',
    placeholderBg: '#fef9c3',
    satisfiesLikes: ['cheese', 'crackers'],
    allergenIds: ['no-gluten', 'no-dairy'],
    pricePerDay: 12,
    points: 10,
    personalityAffinity: ['snack-grazer', 'picky-eater'],
  },
  {
    id: 'mini-frankfurters',
    name: 'Mini Frankfurters',
    category: 'Classic Junior',
    emoji: '🌭',
    description: 'Small Eskort frankfurters — great for little hands to pick up and enjoy.',
    ageRange: '1+',
    prepTime: '2 min',
    prepStyle: 'both',
    placeholderBg: '#dcfce7',
    satisfiesLikes: ['viennas', 'sausage'],
    allergenIds: [],
    pricePerDay: 25,
    points: 25,
    personalityAffinity: ['always-hungry', 'sports-kid', 'classic-muncher'],
    eskortProduct: 'Eskort Frankfurters',
  },
  {
    id: 'ham-pinwheels',
    name: 'Ham Pinwheels',
    category: 'Classic Junior',
    emoji: '🌀',
    description: 'Eskort ham and cheese rolled in a tortilla and sliced into pinwheel rounds.',
    ageRange: '2+',
    prepTime: '5 min',
    prepStyle: 'prepacked',
    placeholderBg: '#e0f2fe',
    satisfiesLikes: ['ham', 'cheese'],
    allergenIds: ['no-gluten', 'no-dairy'],
    pricePerDay: 28,
    points: 30,
    personalityAffinity: ['little-adventurer', 'snack-grazer'],
    eskortProduct: 'Eskort Ham',
  },
  {
    id: 'sausage-rolls',
    name: 'Mini Sausage Rolls',
    category: 'Classic Junior',
    emoji: '🥐',
    description: 'Flaky pastry wrapped around Eskort sausages. Golden and delicious.',
    ageRange: '2+',
    prepTime: '5 min',
    prepStyle: 'airfryer',
    placeholderBg: '#fef3c7',
    satisfiesLikes: ['sausage', 'viennas'],
    allergenIds: ['no-gluten'],
    pricePerDay: 30,
    points: 30,
    personalityAffinity: ['always-hungry', 'sports-kid', 'classic-muncher'],
    eskortProduct: 'Eskort Sausage Rolls',
  },
  {
    id: 'bacon-bites',
    name: 'Crispy Bacon Bites',
    category: 'Classic Junior',
    emoji: '🥓',
    description: 'Air-fried Eskort bacon pieces — crispy, salty, and always popular.',
    ageRange: '3+',
    prepTime: '4 min',
    prepStyle: 'airfryer',
    placeholderBg: '#fee2e2',
    satisfiesLikes: ['bacon'],
    allergenIds: [],
    pricePerDay: 28,
    points: 25,
    personalityAffinity: ['sports-kid', 'always-hungry'],
    eskortProduct: 'Eskort Bacon',
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

// ─── Daily / Weekly Lunchbox Model ───────────────────────────────────────────

export const WEEKDAYS_5 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const
export const WEEKDAYS_3 = ['Mon', 'Wed', 'Fri'] as const

export type DaySlot = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'

export type DailyLunchbox = {
  day: DaySlot
  mealId: string
  /** emoji side snacks */
  sides: string[]
  /** why this meal was recommended */
  reasons: string[]
}

export type GeneratedWeek = DailyLunchbox[]

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

// ─── Snack options for day fillers ────────────────────────────────────────────

export const SNACK_OPTIONS = [
  { emoji: '🍎', label: 'Apple slices', satisfies: ['fruit'] as LikeId[], allergens: [] as AllergenId[] },
  { emoji: '🍇', label: 'Grapes', satisfies: ['fruit'] as LikeId[], allergens: [] as AllergenId[] },
  { emoji: '🥕', label: 'Carrot sticks', satisfies: [] as LikeId[], allergens: [] as AllergenId[] },
  { emoji: '🧀', label: 'Cheese cubes', satisfies: ['cheese'] as LikeId[], allergens: ['no-dairy'] as AllergenId[] },
  { emoji: '🍪', label: 'Crackers', satisfies: ['crackers'] as LikeId[], allergens: ['no-gluten'] as AllergenId[] },
  { emoji: '🌀', label: 'Wiggles', satisfies: ['wiggles'] as LikeId[], allergens: [] as AllergenId[] },
  { emoji: '🥣', label: 'Yoghurt', satisfies: ['yoghurt'] as LikeId[], allergens: ['no-dairy'] as AllergenId[] },
  { emoji: '🍌', label: 'Banana', satisfies: ['fruit'] as LikeId[], allergens: [] as AllergenId[] },
  { emoji: '🫐', label: 'Blueberries', satisfies: ['fruit'] as LikeId[], allergens: [] as AllergenId[] },
]
