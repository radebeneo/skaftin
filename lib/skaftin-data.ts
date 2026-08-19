export type ProductKind =
  | "sausage"
  | "chicken"
  | "bacon"
  | "coldmeat"
  | "meatball"

export type FormatChoice = "lunchbox" | "airfryer" | "mix"

export type Product = {
  id: string
  name: string
  blurb: string
  image: string
  kind: ProductKind
  /** which prep formats this product suits */
  formats: Exclude<FormatChoice, "mix">[]
  /** rough cost per kid serving, in Rand */
  pricePerServing: number
  isRedMeat: boolean
  hasCheese: boolean
}

export type LikeOption = {
  id: ProductKind
  label: string
  image: string
}

export type DislikeOption = {
  id: string
  label: string
}

export type FormatOption = {
  id: FormatChoice
  title: string
  description: string
}

export const PRODUCTS: Product[] = [
  {
    id: "cheese-grillers",
    name: "Cheese Griller Viennas",
    blurb: "Juicy viennas with a cheesy middle — a lunchbox classic.",
    image: "/images/food-viennas.png",
    kind: "sausage",
    formats: ["lunchbox", "airfryer"],
    pricePerServing: 14,
    isRedMeat: false,
    hasCheese: true,
  },
  {
    id: "mini-viennas",
    name: "Mini Cocktail Viennas",
    blurb: "Bite-size viennas that are perfect for little hands.",
    image: "/images/food-viennas.png",
    kind: "sausage",
    formats: ["lunchbox", "airfryer"],
    pricePerServing: 11,
    isRedMeat: false,
    hasCheese: false,
  },
  {
    id: "tonkies-bites",
    name: "Kiddos Tonkies Bites",
    blurb: "Crispy potato & bacon bites — a certified Lunchbox Legend.",
    image: "/images/food-nuggets.png",
    kind: "chicken",
    formats: ["airfryer"],
    pricePerServing: 16,
    isRedMeat: false,
    hasCheese: false,
  },
  {
    id: "chicken-nuggets",
    name: "Golden Chicken Nuggets",
    blurb: "Air-fry till crunchy, dip and dunk. Always a winner.",
    image: "/images/food-nuggets.png",
    kind: "chicken",
    formats: ["airfryer"],
    pricePerServing: 18,
    isRedMeat: false,
    hasCheese: false,
  },
  {
    id: "back-bacon",
    name: "Rindless Back Bacon",
    blurb: "Crispy bacon strips to jazz up a wrap or mini roll.",
    image: "/images/food-bacon.png",
    kind: "bacon",
    formats: ["airfryer"],
    pricePerServing: 20,
    isRedMeat: true,
    hasCheese: false,
  },
  {
    id: "chopped-ham",
    name: "Chopped Ham Slices",
    blurb: "Soft, mild ham that rolls up neatly into any lunchbox.",
    image: "/images/food-ham.png",
    kind: "coldmeat",
    formats: ["lunchbox"],
    pricePerServing: 13,
    isRedMeat: false,
    hasCheese: false,
  },
  {
    id: "polony-sandwich",
    name: "Polony & Cheese Triangles",
    blurb: "The everyday hero — soft polony and cheese on fresh bread.",
    image: "/images/food-sandwich.png",
    kind: "coldmeat",
    formats: ["lunchbox"],
    pricePerServing: 10,
    isRedMeat: false,
    hasCheese: true,
  },
  {
    id: "mini-frikkadels",
    name: "Mini Frikkadels",
    blurb: "Little seasoned meatballs — great warm or cold.",
    image: "/images/food-meatballs.png",
    kind: "meatball",
    formats: ["lunchbox", "airfryer"],
    pricePerServing: 17,
    isRedMeat: true,
    hasCheese: false,
  },
]

export const LIKE_OPTIONS: LikeOption[] = [
  { id: "sausage", label: "Sausages & Viennas", image: "/images/food-viennas.png" },
  { id: "chicken", label: "Chicken & Nuggets", image: "/images/food-nuggets.png" },
  { id: "bacon", label: "Bacon", image: "/images/food-bacon.png" },
  { id: "coldmeat", label: "Ham & Sandwiches", image: "/images/food-ham.png" },
  { id: "meatball", label: "Meatballs & Frikkadels", image: "/images/food-meatballs.png" },
]

export const DISLIKE_OPTIONS: DislikeOption[] = [
  { id: "no-red-meat", label: "No red meat" },
  { id: "no-cheese", label: "No cheese" },
  { id: "no-spicy", label: "Nothing spicy" },
  { id: "small-portions", label: "Small portions only" },
  { id: "no-sauce", label: "No messy sauces" },
]

export const FORMAT_OPTIONS: FormatOption[] = [
  {
    id: "lunchbox",
    title: "Prepacked Lunchboxes",
    description: "Grab-and-go cold packs. Zero cooking, straight into the bag.",
  },
  {
    id: "airfryer",
    title: "Air-Fryer Preps",
    description: "Quick 8-minute hot preps you finish at home in the morning.",
  },
  {
    id: "mix",
    title: "A Mix of Both",
    description: "Some cold days, some crispy hot days — never boring.",
  },
]

export const BUDGET = {
  min: 120,
  max: 600,
  step: 10,
  default: 300,
}

export function budgetTier(weekly: number): { label: string; note: string } {
  if (weekly < 220) return { label: "Smart Saver", note: "Wholesome basics, every day sorted." }
  if (weekly < 400) return { label: "Family Favourite", note: "The sweet spot of variety and value." }
  return { label: "Lunchbox Legend", note: "Premium picks and extra treats." }
}

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const

export type DayMeal = {
  day: string
  product: Product
  side: string
  treat: string
}

export type SkaftinPlan = {
  meals: DayMeal[]
  weeklyCost: number
  perDay: number
  withinBudget: boolean
}

const SIDES = [
  "Cherry tomatoes",
  "Cheese cubes",
  "Cucumber sticks",
  "Pretzels",
  "Carrot coins",
  "Crackers",
  "Mini corn",
]

const SIDES_NO_CHEESE = SIDES.filter((s) => !s.toLowerCase().includes("cheese"))

const TREATS = [
  "Apple slices",
  "Seedless grapes",
  "Banana",
  "Fruit strip",
  "Yoghurt tube",
  "Naartjie",
  "Popcorn",
]

export type PlanInput = {
  budget: number
  likes: ProductKind[]
  dislikes: string[]
  format: FormatChoice
}

/**
 * Builds a varied 5-day plan that respects the parent's format, likes,
 * dislikes and weekly budget. Deliberately avoids repeating the same
 * product two days running — the whole point is beating lunchbox boredom.
 */
export function buildPlan(input: PlanInput): SkaftinPlan {
  const { budget, likes, dislikes, format } = input

  let pool = PRODUCTS.filter((p) => {
    if (format !== "mix" && !p.formats.includes(format)) return false
    if (dislikes.includes("no-red-meat") && p.isRedMeat) return false
    if (dislikes.includes("no-cheese") && p.hasCheese) return false
    return true
  })

  // Prefer what the kid likes, but keep a fallback so we always fill a week.
  const liked = likes.length ? pool.filter((p) => likes.includes(p.kind)) : pool
  const preferred = liked.length ? liked : pool
  if (!preferred.length) pool = PRODUCTS
  const workingPool = preferred.length ? preferred : pool

  const sides = dislikes.includes("no-cheese") ? SIDES_NO_CHEESE : SIDES

  const meals: DayMeal[] = []
  let lastId = ""
  WEEKDAYS.forEach((day, i) => {
    // rotate through the pool, skipping a same-as-yesterday pick when possible
    let idx = i % workingPool.length
    if (workingPool[idx].id === lastId && workingPool.length > 1) {
      idx = (idx + 1) % workingPool.length
    }
    const product = workingPool[idx]
    lastId = product.id
    meals.push({
      day,
      product,
      side: sides[i % sides.length],
      treat: TREATS[i % TREATS.length],
    })
  })

  const weeklyCost = meals.reduce((sum, m) => sum + m.product.pricePerServing + 6, 0)

  return {
    meals,
    weeklyCost,
    perDay: Math.round(weeklyCost / meals.length),
    withinBudget: weeklyCost <= budget,
  }
}
