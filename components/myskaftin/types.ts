'use client'

import { useMemo, useState, useCallback, useEffect } from 'react'
import { Star, Sparkles } from 'lucide-react'
import { PRICE_TIERS, type PrepStyle, type GeneratedWeek, type ThemeId, type StickerThemeId } from './data'
import type { PersonalityId } from './data'
import { useRewardsStore } from '@/lib/rewards-store'

export type Selection = {
  kidName: string
  days: 3 | 5
  likes: string[]
  dislikes: string[]
  prep: PrepStyle
  tierId: string
  menuId: string | null
  personality: PersonalityId | null
  budget: number
  generatedWeek: GeneratedWeek
  themeId: ThemeId | null
  stickerId: StickerThemeId | null
}

const STEPS = [
  { n: 1, title: 'Taste',  full: 'Taste & Prep' },
  { n: 2, title: 'Build',  full: 'Build My Week' },
  { n: 3, title: 'Order',  full: 'Review & Order' },
]

const BASE_POINTS = 320

export type { GeneratedWeek }
