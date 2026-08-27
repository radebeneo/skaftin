/**
 * Skaftin Recommendation Engine
 * Pure TypeScript — no JSX, no side effects.
 * Deterministic, testable ranking and week-generation logic.
 */

import {
  JUNIOR_MENU_ITEMS,
  MUNCHER_PERSONALITIES,
  SNACK_OPTIONS,
  WEEKDAYS_5,
  WEEKDAYS_3,
  type JuniorMenuItem,
  type DailyLunchbox,
  type GeneratedWeek,
  type DaySlot,
  type PersonalityId,
  type ThemeId,
} from '@/components/myskaftin/data'

// ─── Profile type ─────────────────────────────────────────────────────────────

export type RecommendationProfile = {
  likes: string[]       // LIKE_OPTIONS ids
  dislikes: string[]    // DISLIKE_OPTIONS ids (restrictions / allergens)
  prep: 'prepacked' | 'airfryer'
  days: 3 | 5
  budget: number        // per-day budget in Rand
  personality: PersonalityId | null
  themeId: ThemeId | null
}

// ─── Score a single meal ──────────────────────────────────────────────────────

export type ScoredMeal = JuniorMenuItem & { score: number; reasons: string[] }

export function scoreMeal(
  meal: JuniorMenuItem,
  profile: RecommendationProfile,
): ScoredMeal | null {
  // ── Hard blocks (allergen/exclusion safety) ────────────────────────────────
  for (const restriction of profile.dislikes) {
    if (meal.allergenIds.includes(restriction as never)) {
      return null // hard block — never show this meal
    }
  }

  // ── Hard block: prep style mismatch ──────────────────────────────────────
  if (meal.prepStyle !== 'both' && meal.prepStyle !== profile.prep) {
    return null
  }

  // ── Hard block: over budget ───────────────────────────────────────────────
  if (meal.pricePerDay > profile.budget * 1.1) {
    // Allow 10% over budget grace
    return null
  }

  let score = 10 // base score
  const reasons: string[] = []

  // ── Favourite food match ──────────────────────────────────────────────────
  const matchedLikes = meal.satisfiesLikes.filter((l) => profile.likes.includes(l))
  if (matchedLikes.length > 0) {
    const personalityFavWeight = getPersonalityWeight(profile.personality, 'favouriteMatch')
    score += matchedLikes.length * 3 * personalityFavWeight
    if (matchedLikes.length === 1) {
      reasons.push(`Includes a favourite`)
    } else {
      reasons.push(`Uses ${matchedLikes.length} of their favourites`)
    }
  }

  // ── Personality affinity ──────────────────────────────────────────────────
  if (profile.personality && meal.personalityAffinity.includes(profile.personality)) {
    const personalityWeight = getPersonalityWeight(profile.personality, 'adventure')
    score += 4 * personalityWeight
    const p = MUNCHER_PERSONALITIES.find((p) => p.id === profile.personality)
    if (p) reasons.push(`Great for ${p.name}`)
  }

  // ── Budget fit bonus ──────────────────────────────────────────────────────
  if (meal.pricePerDay <= profile.budget) {
    score += 2
    reasons.push(`Fits your R${profile.budget}/day budget`)
  }

  // ── Theme bonus ───────────────────────────────────────────────────────────
  if (profile.themeId && meal.themeId === profile.themeId) {
    score += 3
    reasons.push(`Part of the themed week`)
  }

  // ── Prep style match bonus ────────────────────────────────────────────────
  if (meal.prepStyle === profile.prep) {
    score += 1
    if (profile.prep === 'prepacked') reasons.push('Ready for Grab & Go')
    else reasons.push('Ready in under 5 minutes')
  }

  return { ...meal, score, reasons: reasons.slice(0, 3) }
}

// ─── Rank all compatible meals ────────────────────────────────────────────────

export function rankMeals(profile: RecommendationProfile): ScoredMeal[] {
  return JUNIOR_MENU_ITEMS
    .map((m) => scoreMeal(m, profile))
    .filter((m): m is ScoredMeal => m !== null)
    .sort((a, b) => b.score - a.score)
}

// ─── Generate a full week ─────────────────────────────────────────────────────

export function generateWeek(profile: RecommendationProfile): GeneratedWeek {
  const days = (profile.days === 5 ? WEEKDAYS_5 : WEEKDAYS_3) as readonly DaySlot[]
  const ranked = rankMeals(profile)

  if (ranked.length === 0) {
    // Fallback: relax budget constraint and return whatever is safe
    const fallback = JUNIOR_MENU_ITEMS.filter((m) => {
      for (const restriction of profile.dislikes) {
        if (m.allergenIds.includes(restriction as never)) return false
      }
      return true
    })
    const fallbackScored = fallback.map((m) => ({ ...m, score: 1, reasons: ['Safe option'] }))
    return buildWeekFromPool(days, fallbackScored, profile)
  }

  return buildWeekFromPool(days, ranked, profile)
}

function buildWeekFromPool(
  days: readonly DaySlot[],
  pool: ScoredMeal[],
  profile: RecommendationProfile,
): GeneratedWeek {
  const usedIds = new Set<string>()
  const week: GeneratedWeek = []

  days.forEach((day, index) => {
    // Prefer not repeating meals — find the highest-scored unused one
    let pick = pool.find((m) => !usedIds.has(m.id))
    // If all meals used, reset and allow repeats
    if (!pick) {
      usedIds.clear()
      pick = pool[0]
    }
    if (!pick) return

    usedIds.add(pick.id)

    // Pick 2 safe sides
    const safeSides = SNACK_OPTIONS
      .filter((s) => s.allergens.every((a) => !profile.dislikes.includes(a)))
    const sides = [
      safeSides[index % safeSides.length]?.emoji ?? '🍎',
      safeSides[(index + 2) % safeSides.length]?.emoji ?? '🍪',
    ]

    week.push({
      day,
      mealId: pick.id,
      sides,
      reasons: pick.reasons,
    })
  })

  return week
}

// ─── Remix a single day ───────────────────────────────────────────────────────

export function remixDay(
  currentMealId: string,
  profile: RecommendationProfile,
  existingWeek: GeneratedWeek,
): string {
  const existingIds = new Set(existingWeek.map((d) => d.mealId))
  const ranked = rankMeals(profile)

  // Prefer a meal not already in the week
  const notInWeek = ranked.filter((m) => m.id !== currentMealId && !existingIds.has(m.id))
  if (notInWeek.length > 0) return notInWeek[0].id

  // Fall back: any different compatible meal
  const different = ranked.filter((m) => m.id !== currentMealId)
  if (different.length > 0) return different[0].id

  // Last resort: same meal
  return currentMealId
}

// ─── Variety analysis ─────────────────────────────────────────────────────────

export type VarietyResult = {
  label: string
  emoji: string
  description: string
  score: 'great' | 'ok' | 'repetitive'
}

export function analyseVariety(week: GeneratedWeek): VarietyResult {
  const uniqueMeals = new Set(week.map((d) => d.mealId)).size
  const total = week.length

  if (uniqueMeals === total) {
    return {
      label: 'Great Mix',
      emoji: '🌈',
      description: `${uniqueMeals} different lunches — zero boredom`,
      score: 'great',
    }
  }

  if (uniqueMeals >= total * 0.7) {
    return {
      label: 'Good Variety',
      emoji: '⭐',
      description: `${uniqueMeals} of ${total} days are different`,
      score: 'ok',
    }
  }

  // Find the most repeated
  const counts: Record<string, number> = {}
  week.forEach((d) => { counts[d.mealId] = (counts[d.mealId] ?? 0) + 1 })
  const topId = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
  const topMeal = JUNIOR_MENU_ITEMS.find((m) => m.id === topId?.[0])
  const repeatCount = topId?.[1] ?? 0

  return {
    label: 'A Little Repetitive',
    emoji: '🔁',
    description: topMeal ? `${topMeal.name} appears ${repeatCount} times` : 'Some repeats this week',
    score: 'repetitive',
  }
}

// ─── Come-Home-Empty Score ────────────────────────────────────────────────────

export function computeEmptyScore(week: GeneratedWeek, profile: RecommendationProfile): number {
  if (week.length === 0) return 0

  let total = 0
  week.forEach((day) => {
    const meal = JUNIOR_MENU_ITEMS.find((m) => m.id === day.mealId)
    if (!meal) return

    let dayScore = 50 // base

    // Favourite match
    const matches = meal.satisfiesLikes.filter((l) => profile.likes.includes(l)).length
    dayScore += matches * 10

    // Personality fit
    if (profile.personality && meal.personalityAffinity.includes(profile.personality)) {
      dayScore += 15
    }

    // No restrictions violated (shouldn't happen due to hard block, but double-check)
    const hasRestriction = meal.allergenIds.some((a) => profile.dislikes.includes(a))
    if (hasRestriction) dayScore -= 40

    total += Math.min(100, Math.max(0, dayScore))
  })

  return Math.round(total / week.length)
}

// ─── Preference match count for display ──────────────────────────────────────

export function countFavouriteMatches(week: GeneratedWeek, profile: RecommendationProfile): number {
  const matched = new Set<string>()
  week.forEach((day) => {
    const meal = JUNIOR_MENU_ITEMS.find((m) => m.id === day.mealId)
    meal?.satisfiesLikes.filter((l) => profile.likes.includes(l)).forEach((l) => matched.add(l))
  })
  return matched.size
}

// ─── Helper: get personality weight ──────────────────────────────────────────

function getPersonalityWeight(
  personalityId: PersonalityId | null,
  key: keyof typeof MUNCHER_PERSONALITIES[0]['affinityWeights'],
): number {
  if (!personalityId) return 1
  const p = MUNCHER_PERSONALITIES.find((p) => p.id === personalityId)
  return p?.affinityWeights[key] ?? 1
}
